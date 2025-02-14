
import { publishResponseStreamChunk } from '../../amplify/functions/graphql/mutations';
// import { CreateGardenInput } from '../../amplify/functions/graphql/API';
import { AppSyncResolverEvent } from 'aws-lambda';

import { getConfiguredAmplifyClient } from '../utils'

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

    let index = 0;

    const intervalId = setInterval(async () => {
        const publishChunkResponse = await amplifyClient.graphql({
            query: publishResponseStreamChunk,
            variables: {
                index: index,
                chunkText: `${index}`,
                gardenId: '2c13f308-6caa-4595-9655-3da42b36a74a'
            }
        }).catch((err) => {
            if (err instanceof Error) {
                console.log('Error publishing chunk: ', err.message);
            } else {
                console.log('Error publishing chunk: ', err);
            }
        })
        console.log(JSON.stringify(publishChunkResponse, null, 2))
        // .catch((err) => {
        //     if (err  instanceof Error) {
        //         console.log('Error publishing chunk: ', err.message);
        //     }
        // }).then((res) => {
        //     console.log('Published chunk: ', index, ' res: ', JSON.stringify(res, null, 2));
        // })
        // console.log('Published chunk: ', index);
        index++;
    }, 1000);

    // To stop the interval after some time (optional)
    setTimeout(() => clearInterval(intervalId), 30000); // Stops after 10 seconds


}

main()