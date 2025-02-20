// import { z } from "zod";
import { stringify } from "yaml";

// import { Amplify } from 'aws-amplify';
// import { generateClient } from 'aws-amplify/data';
// import { getAmplifyDataClientConfig } from '@aws-amplify/backend/function/runtime';
// import { env } from '$amplify/env/generateGarden';
import { getConfiguredAmplifyClient } from '../../../utils/amplifyUtils';
// import { GraphqlOutput } from '@aws-amplify/backend-output-schemas';

import { ChatBedrockConverse } from "@langchain/aws";
import { HumanMessage, AIMessage, ToolMessage, BaseMessage, MessageContentText, SystemMessage, AIMessageChunk } from "@langchain/core/messages";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { Calculator } from "@langchain/community/tools/calculator";

// import { AppSyncIdentityCognito, AppSyncIdentityOIDC } from 'aws-lambda';

// import { generateGardenPlanSteps } from './graphql/queries';
// import { publishResponseStreamChunk } from '../../../utils/graphqlStatements'
// import { createGarden, updateGarden } from '../graphql/mutations';
import { getGarden, listPlannedSteps } from '../graphql/queries';
import { publishResponseStreamChunk } from "../graphql/mutations";
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

        const { data: garden } = await amplifyClient.graphql({
            query: getGarden,
            variables: { id: event.arguments.gardenId }
        })

        if (!garden) throw new Error("Failed to fetch garden data");

        // const gardenString = stringify(garden.getGarden)
        const gardenString = stringify({
            name: garden.getGarden?.name,
            location: garden.getGarden?.location,
            perimeterPoints: garden.getGarden?.perimeterPoints
        })

        const { data: plannedSteps } = await amplifyClient.graphql({
            query: listPlannedSteps,
            variables: { filter: { gardenId: { eq: event.arguments.gardenId } } }
        })

        if (!plannedSteps) throw new Error("Failed to fetch planned steps");

        //TODO: Fix this so that it retrieves the step part of the planned steps
        const plannedStepsString = plannedSteps.listPlannedSteps.items.map((step) => stringify(step)).join('\n')

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

        const input = {
            messages: [
                new SystemMessage({
                    content: `
                    You are a helpful garden planner. Update the garden based on the user's request. 
                    Take advantage of all the available space when making a plan.
                    Plant rows should be aligned with one of the sides of the garden.
                    Response chat message text content should be in markdown format.

                    If the user wants to update the garden or add planned steps, but hasn't provided enough details, ask for more information.

                    <currentGardenAttriburtes>
                    ${gardenString}
                    </currentGardenAttriburtes>

                    <currentPlannedSteps>
                    ${plannedStepsString}
                    </currentPlannedSteps>
                    
                    `,
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