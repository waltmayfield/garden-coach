import { z } from "zod";

import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/data';
import { getAmplifyDataClientConfig } from '@aws-amplify/backend/function/runtime';
import { env } from '$amplify/env/generateGarden';
// import { GraphqlOutput } from '@aws-amplify/backend-output-schemas';

import { AppSyncIdentityCognito, AppSyncIdentityOIDC } from 'aws-lambda';

import { generateGardenPlanSteps } from './graphql/queries';
import { createGarden, updateGarden } from './graphql/mutations';
import { CreateGardenInput, UpdateGardenInput } from "./graphql/API";

import { Schema } from '../data/resource';

import { generateGarden } from '../../utils/amplifyStrucutedOutputs';

export const handler: Schema["generateGarden"]["functionHandler"] = async (event, context) => {
    console.log('event:\n', JSON.stringify(event, null, 2))

    if (event.arguments.gardenId === null) throw new Error("gardenId is required");

    const { resourceConfig, libraryOptions } = await getAmplifyDataClientConfig(env);
    Amplify.configure(resourceConfig, libraryOptions);
    const amplifyClient = generateClient<Schema>();

    // const generatedGarden: Schema["Garden"]["createType"] = await generateGarden(`
    //     I have a two meter by 8 meter garden bed. North is is the direction of the two meter side.
    //     It is in Austin Texas, USA.
    //     My family has three members and I would like as much of our food to come from this garden as possible.
    //     Maximize the yield of vegtables and fill the garden as much as possible.
    //     `)
    
    const generatedGarden: Schema["Garden"]["createType"] = await generateGarden(event.arguments.userInput)
    
    const updateGardenInput: UpdateGardenInput = {
        id: event.arguments.gardenId!,
        ...(generatedGarden as Partial<UpdateGardenInput>)
    }
    // const createGardenResponse = await amplifyClient.graphql({
    //     query: createGarden,
    //     variables: { input: generatedGarden as CreateGardenInput}
    // })

    const updateGardenResponse = await amplifyClient.graphql({
        query: updateGarden,
        variables: { input: updateGardenInput}
    })
    
    console.log('updateGardenResponse:\n', JSON.stringify(updateGardenResponse, null, 2))
    // return updateGardenResponse.data?.updateGarden

    const generateStepsResponse = await amplifyClient.graphql({
        query: generateGardenPlanSteps,
        variables: { gardenId: event.arguments.gardenId }
    })
    
    console.log('generateStepsResponse:\n', JSON.stringify(generateStepsResponse, null, 2))
}