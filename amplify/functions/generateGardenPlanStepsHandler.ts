import { stringify } from 'yaml';

import { geocode } from '../../utils/weather';

import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/data';
import { getAmplifyDataClientConfig } from '@aws-amplify/backend/function/runtime';
import { env } from '$amplify/env/generateGardenPlanSteps';
// import { GraphqlOutput } from '@aws-amplify/backend-output-schemas';

import { AppSyncIdentityCognito, AppSyncIdentityOIDC } from 'aws-lambda';

import { Schema } from '../data/resource';
import { getGarden } from './graphql/queries';
import { updateGarden, createPlannedStep } from './graphql/mutations';
import { UpdateGardenInput, CreatePlannedStepInput } from "./graphql/API";

import { generateGardenPlanSteps } from '../../utils/amplifyStrucutedOutputs';

export const handler: Schema["generateGardenPlanSteps"]["functionHandler"] = async (event, context) => {

    const { resourceConfig, libraryOptions } = await getAmplifyDataClientConfig(env);

    Amplify.configure(resourceConfig, libraryOptions);

    const amplifyClient = generateClient<Schema>();

    const gardenResponse = await amplifyClient.graphql({
        query: getGarden,
        variables: {
            id: event.arguments.gardenId
        }
    })

    // const identity = event.identity;
    // if (
    //     (identity as AppSyncIdentityCognito).sub ||
    //     (identity as AppSyncIdentityOIDC).sub
    // ) {
    //     const userId = (identity as AppSyncIdentityCognito).sub || (identity as AppSyncIdentityOIDC).sub;
    //     if (gardenResponse.data.getGarden!.owner !== userId) {
    //         throw new Error(`User ${userId} is not authorized to view garden ${event.arguments.gardenId} with owner ${gardenResponse.data.getGarden!.owner}`);
    //     }
    // } else {
    //     throw new Error('You are not authorized to view this garden');
    // }

    const garden = gardenResponse.data.getGarden;

    if (!garden) throw new Error(`Garden with id ${event.arguments.gardenId} not found`);
    if (!garden.location.cityStateAndCountry) throw new Error(`Garden with id ${event.arguments.gardenId} has no location`);

    if (
        (typeof garden.location?.lattitude) !== 'number' || 
        (typeof garden.location?.longitude) !== 'number'
    ) {
        console.log("Geocoding garden location: ", garden.location.cityStateAndCountry)
        const gardenLatLong = await geocode(garden.location.cityStateAndCountry)
        garden.location.lattitude = gardenLatLong.lat
        garden.location.longitude = gardenLatLong.lng 
        
        amplifyClient.graphql({
            query: updateGarden,
            variables: { input: garden }
        }).then(
            (response) => console.log("Updated garden with geocoded location: ", response)
        ).catch(
            (error) => console.error("Error updating garden with geocoded location: ", error)
        )
    }

    const newSteps = await generateGardenPlanSteps(garden)
    const firstNewStep: Schema["PlannedStep"]["createType"]["step"] = newSteps.steps[0]
    console.log("New Steps:\n", stringify(newSteps))

    const createNewStepPromises = newSteps.steps.map((step) => {
        return amplifyClient.graphql({
            query: createPlannedStep,
            variables: { input: {
                gardenId: garden.id,
                step: step
             } as CreatePlannedStepInput}
        })
    })

    await Promise.all(createNewStepPromises)

    // return [];
}