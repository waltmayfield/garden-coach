import { z } from "zod";

import { ChatBedrockConverse } from "@langchain/aws";
import { HumanMessage, AIMessage, ToolMessage, BaseMessage, MessageContentText } from "@langchain/core/messages";
import { ChatPromptTemplate } from "@langchain/core/prompts";

import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/data';
import { getAmplifyDataClientConfig } from '@aws-amplify/backend/function/runtime';
import { env } from '$amplify/env/generateGardenPlanSteps';
// import { GraphqlOutput } from '@aws-amplify/backend-output-schemas';

import { AppSyncIdentityCognito, AppSyncIdentityOIDC } from 'aws-lambda';

import { schema, Schema } from '../data/resource';
import { getGarden } from './graphql/queries';

// import { getGardenPlanSteps } from '@/../utils/amplifyStrucutedOutputs';
import { createGardenPlanSteps } from '../../utils/amplifyStrucutedOutputs';

// // type IsSameType<T, U> = T extends U ? (U extends T ? true : false) : false;

// const XY = z.object({
//     x: z.number(),
//     y: z.number()
// })

// // schema.data.types.PlantRow.fields

// const StepType = z.object({
//     title: z.string(),
//     description: z.string(),
//     role: z.enum(['ai', 'human']),
//     resources: z.array(z.string()),
//     plantRows: z.object({
//         location: z.object({
//             start: XY,
//             end: XY
//         }),
//         species: z.string(),
//         plantSpacingInMeters: z.number(),
//         plantDate: z.date()
//     })
// })

// const StepArrayType= z.object({
//     steps: z.array(StepType)
// })

// export const getGardenPlanSteps = async (garden: Schema["Garden"]["createType"]) => {
//     const gardenStepPlannerModel = new ChatBedrockConverse({
//         model: process.env.MODEL_ID
//     }).withStructuredOutput(StepArrayType,{includeRaw: true})

//     const plannerPrompt = ChatPromptTemplate.fromTemplate(
//         `
//         For the given objective, come up with a simple step by step plan. 
//         This plan should involve individual tasks, that if executed correctly will yield the correct answer.
//         Do not add any superfluous steps. 
//         The result of the final step should be the final answer. Make sure that each step has all the information needed - do not skip steps.
        
//         {objective}
//         `,
//     );

//     const gandenStepLannerWithPrompt = plannerPrompt.pipe(gardenStepPlannerModel);

//     const newPlanSteps = await gandenStepLannerWithPrompt.invoke({
//         objective: garden.objective
//     })

//     return newPlanSteps.parsed
// }

export const handler: Schema["generateGardenPlanSteps"]["functionHandler"] = async (event, context) => {

    const { resourceConfig, libraryOptions } = await getAmplifyDataClientConfig(env);

    Amplify.configure(resourceConfig, libraryOptions);

    const amplifyClient = generateClient<Schema>();

    const garden = await amplifyClient.graphql({
        query: getGarden,
        variables: {
            id: event.arguments.gardenId
        }
    })

    const identity = event.identity;

    if (
        (identity as AppSyncIdentityCognito).sub ||
        (identity as AppSyncIdentityOIDC).sub
    ) {
        const userId = (identity as AppSyncIdentityCognito).sub || (identity as AppSyncIdentityOIDC).sub;
        if (garden.data.getGarden!.owner !== userId) {
            throw new Error(`User ${userId} is not authorized to view garden ${event.arguments.gardenId} with owner ${garden.data.getGarden!.owner}`);
        }
    } else {
        throw new Error('You are not authorized to view this garden');
    }

    

    

    return [];
}