import { z } from "zod";
import { stringify } from "yaml";

import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/data';
import { getAmplifyDataClientConfig } from '@aws-amplify/backend/function/runtime';
import { env } from '$amplify/env/generateGarden';
import { getConfiguredAmplifyClient } from '../../../utils/amplifyUtils';
// import { GraphqlOutput } from '@aws-amplify/backend-output-schemas';

import { ChatBedrockConverse } from "@langchain/aws";
import { HumanMessage, AIMessage, ToolMessage, BaseMessage, MessageContentText, SystemMessage, AIMessageChunk } from "@langchain/core/messages";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { Calculator } from "@langchain/community/tools/calculator";

// import { AppSyncIdentityCognito, AppSyncIdentityOIDC } from 'aws-lambda';

// import { generateGardenPlanSteps } from './graphql/queries';
// import { generateGardenPlanSteps } from '../../../utils/graphqlStatements'
// import { createGarden, updateGarden } from '../graphql/mutations';
import { getGarden, listPlannedSteps } from '../graphql/queries';
// import { CreateGardenInput, UpdateGardenInput } from "../graphql/API";

import { Schema } from '../../data/resource';

// import { generateGarden } from '../../../utils/amplifyStrucutedOutputs';
import { getLangChainMessageTextContent, publishMessage, stringifyLimitStringLength } from '../../../utils/langChainUtils';
import { createGardenInfoToolBuilder, createGardenPlanToolBuilder } from "./toolBox";

export const handler: Schema["generateGarden"]["functionHandler"] = async (event, context) => {
    console.log('event:\n', JSON.stringify(event, null, 2))

    if (event.arguments.gardenId === null) throw new Error("gardenId is required");
    if (!event.identity) throw new Error("Event does not contain identity");
    if (!('sub' in event.identity)) throw new Error("Event does not contain user");

    const amplifyClient = getConfiguredAmplifyClient();

    const { data: garden } = await amplifyClient.graphql({
        query: getGarden,
        variables: { id: event.arguments.gardenId }
    })

    const gardenString = stringify(garden.getGarden)

    const { data: plannedSteps } = await amplifyClient.graphql({
        query: listPlannedSteps,
        variables: { filter: { gardenId: { eq: event.arguments.gardenId } } }
    })

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

    // console.log('agentTools: ', agentTools)

    const agent = createReactAgent({
        llm: agentModel,
        tools: agentTools,
    });

    // console.log('agent:\n', agent)

    try {
        const input = {
            messages: [
                new SystemMessage({
                    content: `
                    You are a helpful garden planner. Update the garden based on the user's request. 
                    Create planned steps to fill the garden over the course of a year. Fill the garden with plants each season.
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

        // const agentResponse = await agent.invoke(input)

        // console.log('agentResponse:\n', stringify(agentResponse))

        const agentEventStream = agent.streamEvents(
            input,
            {
                version: "v2",
            }
        );

        for await (const streamEvent of agentEventStream) {
            switch (streamEvent.event) {
                case "on_chat_model_stream":
                    //Handle token stream event
                    break;
                case "on_tool_end":
                case "on_chat_model_end":
                    const streamChunk = streamEvent.data.output as ToolMessage | AIMessageChunk
                    // const textContent = getLangChainMessageTextContent(streamChunk)
                    console.log('received on chat model end:\n', stringifyLimitStringLength(streamChunk))
                    await publishMessage({
                        gardenId: event.arguments.gardenId,
                        owner: event.identity.sub,
                        message: streamChunk
                    })
                    break

            }

        }


        // for await (
        //     const chunk of await agent.stream(input, {
        //         streamMode: "values",
        //     })
        // ) {
        //     const newMessage: BaseMessage = chunk.messages[chunk.messages.length - 1];

        //     if (!(newMessage instanceof HumanMessage)) {
        //         // await publishMessage(event.arguments.chatSessionId, event.identity.sub, newMessage)
        //         console.log("newMessage: ", stringify(newMessage))
        //     }
        // }

    } catch (error) {
        // console.error("Error generating garden / steps:", JSON.stringify(error, null, 2));
        throw new Error(`Failed to generate garden / steps.\n${JSON.stringify(error, null, 2)}`);
    }
}