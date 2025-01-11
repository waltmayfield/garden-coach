import { Schema } from '../data/resource';

import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/data';
import { getAmplifyDataClientConfig } from '@aws-amplify/backend/function/runtime';
import { env } from '$amplify/env/generateGardenPlanSteps';

import { AppSyncIdentityCognito, AppSyncIdentityOIDC } from 'aws-lambda';

import { getGarden } from './graphql/queries';

const { resourceConfig, libraryOptions } = await getAmplifyDataClientConfig(env);

Amplify.configure(resourceConfig, libraryOptions);

const amplifyClient = generateClient<Schema>();

export const handler: Schema["generateGardenPlanSteps"]["functionHandler"] = async (event, context) => {

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