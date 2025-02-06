
import { stringify } from 'yaml';
import { HumanMessage, AIMessage, AIMessageChunk, ToolMessage, BaseMessage, MessageContentText } from "@langchain/core/messages";

import * as APITypes from "../amplify/functions/graphql/API";
import { PublishMessageCommandInput } from "./types";

import { getConfiguredAmplifyClient } from "./amplifyUtils";
import { createChatMessage } from "./graphqlStatements";

const amplifyClient = getConfiguredAmplifyClient();

export function getLangChainMessageTextContent(message: HumanMessage | AIMessage | AIMessageChunk | ToolMessage): string | void {
    let messageTextContent: string = ''

    if (typeof message.content === 'string') {
        messageTextContent += message.content
    } else {
        message.content.forEach((contentBlock) => {
            if ((contentBlock as MessageContentText).text !== undefined) messageTextContent += (contentBlock as MessageContentText).text + '\n'
            // else if ((contentBlock as MessageContentImageUrl).image_url !== undefined) messageContent += message.content.text !== undefined
        })
    }

    return messageTextContent

}

export function stringifyLimitStringLength(obj: any, maxLength: number = 200) {
    return stringify(obj, (key, value) => {
        if (typeof value === 'string' && value.length > maxLength) {
            return value.substring(0, maxLength) + '...';
        }
        return value;
    }, 2);
}

export const publishMessage = async (props: PublishMessageCommandInput) => {
    // console.log('chatMessages: ', this.chatMessages)

    const messageTextContent = getLangChainMessageTextContent(props.message)

    let input: APITypes.CreateChatMessageInput = {
        gardenId: props.gardenId,
        content: {
            text: messageTextContent || "AI Message:\n"
        },
        owner: props.owner,
        toolCallId: "",
        toolCalls: "[]",
        toolName: "",
        responseComplete: props.responseComplete || false
    }

    console.log('Message type: ', props.message.getType())

    switch (props.message.getType()) {
        case "ai":
            input = { 
                ...input, 
                role: APITypes.ChatMessageRole.ai, 
                toolCalls: JSON.stringify((props.message as AIMessageChunk).tool_calls) 
            }

            //If the AI message has no tool calls, set responseComplete to true
            if (!(props.message as AIMessageChunk).tool_calls) {
                input = { 
                    ...input, 
                    responseComplete: true
                 }
            }
            break;
        case "tool":
            input = { 
                ...input, 
                role: APITypes.ChatMessageRole.tool, 
                toolCallId: (props.message as ToolMessage).tool_call_id, 
                toolName: (props.message as ToolMessage).name || 'no tool name supplied' }
            break;
    }

    // if (props.message.getType() === "ai") {
    //     input = { 
    //         ...input, 
    //         role: APITypes.ChatMessageRole.ai, 
    //         toolCalls: JSON.stringify((props.message as AIMessageChunk).tool_calls)
    //     }
    // } else if (props.message instanceof ToolMessage) {
    //     input = {
    //         ...input,
    //         role: APITypes.ChatMessageRole.tool,
    //         toolCallId: props.message.tool_call_id,
    //         toolName: props.message.name || 'no tool name supplied'
    //     }
    // }

    console.log('Publishing mesage with input: ', input)

    const publishMessageResponse = await amplifyClient.graphql({
        query: createChatMessage,
        variables: {
            input: input,
        },
    })
        .catch((err: any) => {
            console.error('GraphQL Error: ', err);
        });

    console.log('Publish message response: \n', stringifyLimitStringLength(publishMessageResponse))
}


// const messages: BaseMessage[] = sortedMessagesStartingWithHumanMessage.map((message) => {
//     if (message.role === 'human') {
//         return new HumanMessage({
//             id: message.id,
//             content: message.content,
//         })
//     } else if (message.role === 'ai') {
//         // if (!message.contentBlocks) throw new Error(`No contentBlocks in message: ${message}`);
//         return new AIMessage({
//             content: [{
//                 type: 'text',
//                 text: message.content
//             }],
//             // content: JSON.parse(message.contentBlocks),
//             tool_calls: JSON.parse(message.tool_calls || '[]')
//         })
//     } else {
//         // if (!message.contentBlocks) throw new Error(`No contentBlocks in message: ${message}`);
//         return new ToolMessage({
//             content: message.content,
//             // content: JSON.parse(message.contentBlocks),
//             tool_call_id: message.tool_call_id || "",
//             name: message.tool_name || ""
//         })
//     }
// })