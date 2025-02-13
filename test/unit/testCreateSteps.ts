
// import { createGarden } from '../../amplify/functions/graphql/mutations';
// import { CreateGardenInput } from '../../amplify/functions/graphql/API';
// import { AppSyncResolverEvent } from 'aws-lambda';

// import { getConfiguredAmplifyClient } from '../utils'
// import { Schema } from '../../amplify/data/resource';

// import { generateGarden, generateGardenPlanSteps } from '../../utils/amplifyStrucutedOutputs';
// import { setAmplifyClientEnvVars } from '../../utils/testUtils';

// import { handler } from '../../tmp/generateGardenPlanStepsHandler'


// const dummyEvent: AppSyncResolverEvent<any> = {
//     arguments: {},
//     identity: {
//         sub: 'user-id',
//         issuer: '',
//         username: 'username',
//         claims: {},
//         sourceIp: [],
//         defaultAuthStrategy: '',
//         groups: []
//     },
//     source: null,
//     request: {
//         headers: {},
//         domainName: ''
//     },
//     prev: null,
//     info: {
//         fieldName: 'fieldName',
//         parentTypeName: 'parentTypeName',
//         variables: {},
//         selectionSetList: [],
//         selectionSetGraphQL: ''
//     },
//     stash: {}
// };

// const main = async () => {
//     await setAmplifyClientEnvVars()
//     const amplifyClient = await getConfiguredAmplifyClient()

//     const newGarden: Schema["Garden"]["createType"] = await generateGarden(`
//     I have a two meter by 8 meter garden bed. North is is the direction of the two meter side.
//     It is in Austin Texas, USA.
//     My family has three members and I would like as much of our food to come from this garden as possible.
//     Maximize the yield of vegtables and fill the garden as much as possible.
//     `)

//     console.log('New Garden: ', newGarden)

//     const garden = await amplifyClient.graphql({
//         query: createGarden,
//         variables: {
//             input: {
//                 ...(newGarden as CreateGardenInput)
//             }
//         }
//     }).catch(
//         (error => console.error("Error creating new garden: ", error))
//     )

//     dummyEvent.arguments.gardenId = garden!.data!.createGarden.id

//     const gardenSteps = await handler(dummyEvent, {} as any, () => { })

//     console.log("GardenSteps: ", gardenSteps)

// }

// main()