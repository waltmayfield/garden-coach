
import { generateGarden } from '../../amplify/functions/graphql/queries'
import { createGarden } from '../../amplify/functions/graphql/mutations';
// import { CreateGardenInput } from '../../amplify/functions/graphql/API';
import { AppSyncResolverEvent } from 'aws-lambda';

import { getConfiguredAmplifyClient } from '../utils'
import { Schema } from '../../amplify/data/resource';

// import { generateGardenPlanSteps } from '../../utils/amplifyStrucutedOutputs';
import { setAmplifyClientEnvVars } from '../../utils/testUtils';

import { handler } from '../../amplify/functions/generateGarden/generateGardenHandler'


const dummyEvent: AppSyncResolverEvent<any> = {
    arguments: {},
    identity: {
        sub: 'user-id',
        issuer: '',
        username: 'username',
        claims: {},
        sourceIp: [],
        defaultAuthStrategy: '',
        groups: []
    },
    source: null,
    request: {
        headers: {},
        domainName: ''
    },
    prev: null,
    info: {
        fieldName: 'fieldName',
        parentTypeName: 'parentTypeName',
        variables: {},
        selectionSetList: [],
        selectionSetGraphQL: ''
    },
    stash: {}
};

const main = async () => {
    await setAmplifyClientEnvVars()
    const amplifyClient = await getConfiguredAmplifyClient()

    const garden = await amplifyClient.graphql({
        query: createGarden,
        variables: {
            input: {}
        }
    })

    console.log('Garden: ', garden.data.createGarden)

    dummyEvent.arguments.gardenId = garden!.data!.createGarden.id
    dummyEvent.arguments.userInput = `
        I have a two meter by 8 meter garden bed. North is is the direction of the two meter side.
        It is in Austin Texas, USA.
        My family has three members and I would like as much of our food to come from this garden as possible.
        Maximize the yield of vegtables and fill the garden as much as possible.
        `

    const generateGardenResponse = await handler(dummyEvent, null as any, () => { })

    // const generateGardenResponse = amplifyClient.graphql({
    //     query: generateGarden,
    //     variables: {
    //         gardenId: garden.data.createGarden.id,
    //         userInput: `
    //         I have a two meter by 8 meter garden bed. North is is the direction of the two meter side.
    //         It is in Austin Texas, USA.
    //         My family has three members and I would like as much of our food to come from this garden as possible.
    //         Maximize the yield of vegtables and fill the garden as much as possible.
    //         `
    //     }
    // }).catch(
    //     (error => console.error("Error generating new garden: ", error))
    // )

    console.log('Generated Garden Response: ', generateGardenResponse)

}

main()