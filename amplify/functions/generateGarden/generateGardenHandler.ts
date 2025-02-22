// import { z } from "zod";
import { stringify } from "yaml";

// import { Amplify } from 'aws-amplify';
// import { generateClient } from 'aws-amplify/data';
// import { getAmplifyDataClientConfig } from '@aws-amplify/backend/function/runtime';
// import { env } from '$amplify/env/generateGarden';
import { getConfiguredAmplifyClient } from '../../../utils/amplifyUtils';
import { getWeatherForecast, geocode } from '../../../utils/weather';
// import { GraphqlOutput } from '@aws-amplify/backend-output-schemas';

import { ChatBedrockConverse } from "@langchain/aws";
import { HumanMessage, AIMessage, ToolMessage, BaseMessage, MessageContentText, SystemMessage, AIMessageChunk } from "@langchain/core/messages";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { Calculator } from "@langchain/community/tools/calculator";

// import { AppSyncIdentityCognito, AppSyncIdentityOIDC } from 'aws-lambda';

// import { generateGardenPlanSteps } from './graphql/queries';
// import { publishResponseStreamChunk } from '../../../utils/graphqlStatements'
// import { createGarden, updateGarden } from '../graphql/mutations';
import { getGarden, listPlannedSteps, getPlannedStep } from '../graphql/queries';
import { publishResponseStreamChunk, updateGarden } from "../graphql/mutations";
// import { CreateGardenInput, UpdateGardenInput } from "../graphql/API";

import { Schema } from '../../data/resource';

// import { generateGarden } from '../../../utils/amplifyStrucutedOutputs';
import { getLangChainMessageTextContent, publishMessage, stringifyLimitStringLength } from '../../../utils/langChainUtils';
import { createGardenInfoToolBuilder, createGardenPlanToolBuilder } from "./toolBox";

export const handler: Schema["generateGarden"]["functionHandler"] = async (event, context) => {
    console.log('event:\n', JSON.stringify(event, null, 2))

    try {
        if (event.arguments.gardenId === null) throw new Error("gardenId is required");
        if (!event.identity) throw new Error("Event does not contain identity");
        if (!('sub' in event.identity)) throw new Error("Event does not contain user");

        const amplifyClient = getConfiguredAmplifyClient();

        const { data: { getGarden: garden } } = await amplifyClient.graphql({
            query: getGarden,
            variables: { id: event.arguments.gardenId }
        })

        if (!garden) throw new Error("Failed to fetch garden data");

        // const gardenString = stringify(garden.getGarden)
        const gardenString = stringify({
            name: garden.name,
            location: garden.location,
            perimeterPoints: garden.perimeterPoints
        })

        const { data: plannedSteps } = await amplifyClient.graphql({
            query: listPlannedSteps,
            variables: { filter: { gardenId: { eq: event.arguments.gardenId } } }
        })

        if (!plannedSteps) throw new Error("Failed to fetch planned steps");
        //TODO: Fix this so that it retrieves the step part of the planned steps
        let plannedStepsString = ""

        for (const step of plannedSteps.listPlannedSteps.items) {
            const { data: { getPlannedStep: stepData } } = await amplifyClient.graphql({
                query: getPlannedStep,
                variables: { id: step.id }
            })
            // stepData?.step.
            if (!stepData) throw new Error("Failed to fetch planned step")
            plannedStepsString += stringify({
                title: stepData?.step?.title,
            })
        }

        // const plannedStepsString = plannedSteps.listPlannedSteps.items.map(await (step) => {
        //     const getStepResponse = await amplifyClient.graphql({
        //         query: getPlannedStep,
        //         variables: { id: step.id }
        //     })
        //     if (!getStepResponse) throw new Error("Failed to fetch planned step")

        //     return stringify(step)
        // }).join('\n')

        // if (!garden.location) throw new Error("Garden location is missing");
        // Get the forecast for the garden location
        if (
            garden.location && garden.location.cityStateAndCountry && (
                (typeof garden.location?.lattitude) !== 'number' ||
                (typeof garden.location?.longitude) !== 'number'
            )
        ) {
            console.log("Geocoding garden location: ", garden.location!.cityStateAndCountry)
            const gardenLatLong = await geocode(garden.location!.cityStateAndCountry)
            garden.location!.lattitude = gardenLatLong.lat
            garden.location!.longitude = gardenLatLong.lng

            amplifyClient.graphql({
                query: updateGarden,
                variables: { input: garden }
            }).then(
                (response) => console.log("Updated garden with geocoded location: ", response)
            ).catch(
                (error) => console.error("Error updating garden with geocoded location: ", error)
            )
        }

        let forecastString = "No forecast available"
        if (garden.location && garden.location.lattitude && garden.location.longitude) {
            console.log("Getting forecast for garden location: ", garden.location)
            const forecast = await getWeatherForecast({
                lattitude: garden.location.lattitude,
                longitude: garden.location.longitude
            })
            forecastString = stringify(forecast)
        }

        const agentModel = new ChatBedrockConverse({
            model: process.env.MODEL_ID,
            // temperature: 0
        });

        const agentTools = [
            new Calculator(),
            createGardenInfoToolBuilder({ gardenId: event.arguments.gardenId }),
            createGardenPlanToolBuilder({ gardenId: event.arguments.gardenId, owner: event.identity.sub })
        ]

        const agent = createReactAgent({
            llm: agentModel,
            tools: agentTools,
        });

        let systemMessageContent = `
            You are a helpful garden planner. Update the garden based on the user's request. 
            Try to use all of the available space for each planting step.
            Don't make diagaional rows. Plant rows should be aligned with one of the sides of the garden.
            Response chat message text content should be in markdown format.
            Today's date is ${new Date().toLocaleDateString()}. Recommend planting steps over the next year based on the current garden and user requests.

            If the user wants to update the garden or add planned steps, but hasn't provided enough details, ask for more information.

            <weatherForecast>
            ${forecastString}
            </weatherForecast>

            <currentGardenAttriburtes>
            ${gardenString}
            </currentGardenAttriburtes>

            <currentPlannedSteps>
            ${plannedStepsString}
            </currentPlannedSteps>

        `.replace(/^\s+/gm, '') //This trims the whitespace from the beginning of each line

        const input = {
            messages: [
                new SystemMessage({
                    content: systemMessageContent
                }),
                new HumanMessage({
                    content: event.arguments.userInput
                })
            ]
        }

        console.log('input:\n', stringify(input))

        const agentEventStream = agent.streamEvents(
            input,
            {
                version: "v2",
            }
        );

        let chunkIndex = 0
        for await (const streamEvent of agentEventStream) {
            switch (streamEvent.event) {
                case "on_chat_model_stream":
                    const tokenStreamChunk = streamEvent.data.chunk as AIMessageChunk
                    if (!tokenStreamChunk.content) continue
                    const chunkText = getLangChainMessageTextContent(tokenStreamChunk)
                    process.stdout.write(chunkText || "")
                    const publishChunkResponse = await amplifyClient.graphql({
                        query: publishResponseStreamChunk,
                        variables: {
                            chunkText: chunkText || "",
                            index: chunkIndex++,
                            gardenId: event.arguments.gardenId
                        }
                    })
                    // console.log('published chunk response:\n', JSON.stringify(publishChunkResponse, null, 2))
                    if (publishChunkResponse.errors) console.log('Error publishing response chunk:\n', publishChunkResponse.errors)
                    break;
                case "on_tool_end":
                case "on_chat_model_end":
                    chunkIndex = 0 //reset the stream chunk index
                    const streamChunk = streamEvent.data.output as ToolMessage | AIMessageChunk
                    console.log('received on chat model end:\n', stringifyLimitStringLength(streamChunk))
                    await publishMessage({
                        gardenId: event.arguments.gardenId,
                        owner: event.identity.sub,
                        message: streamChunk
                    })
                    break
            }
        }

    } catch (error) {
        console.error("Error generating garden / steps:", JSON.stringify(error, null, 2));
        if (error instanceof Error) {
            throw new Error(`Failed to generate garden / steps.\n${error.message}`);
        } else {
            throw new Error("Failed to generate garden / steps.\nUnknown error");
        }
    }
}