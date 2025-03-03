import * as yaml from 'yaml';

// import { STSClient } from "@aws-sdk/client-sts";
// import { generateClient } from 'aws-amplify/data';
// import { Amplify } from 'aws-amplify';
// import { getAmplifyDataClientConfig } from '@aws-amplify/backend/function/runtime';

// import { Schema } from '@/../amplify/data/resource';
import outputs from '@/../amplify_outputs.json';
import { getDeployedResourceArn, getLambdaEnvironmentVariables, getConfiguredAmplifyClient } from "../utils";

import { updateGarden, createPlannedStep, createGarden } from '../../amplify/functions/graphql/mutations';
import { UpdateGardenInput, CreatePlannedStepInput, CreatePastStepInput } from "../../amplify/functions/graphql/API";

import { createPlannedStepForGarden } from '../../utils/graphqlStatements';
// import { error } from 'console';

// const stsClient = new STSClient();

const stepInputString = `
gardenId: fbd22b85-7b15-42e5-bcc0-d20c991dbacc
step:
  title: Fall Planting
  description: Plant fall crops as summer crops finish
  role: human
  plantRows:
    - species: Kale
      location:
        start:
          x: 0
          y: 0
        end:
          x: 0.5
          y: 8
      plantSpacingInMeters: 0.3
      plantDate: 2025-08-15
      expectedHarvest:
        date: 2025-10-15
        amount: 10
        unit: kg
    - species: Carrots
      location:
        start:
          x: 0.5
          y: 0
        end:
          x: 1
          y: 8
      plantSpacingInMeters: 0.08
      plantDate: 2025-08-15
      expectedHarvest:
        date: 2025-11-15
        amount: 15
        unit: kg
    - species: Winter Spinach
      location:
        start:
          x: 1
          y: 0
        end:
          x: 1.5
          y: 8
      plantSpacingInMeters: 0.15
      plantDate: 2025-09-15
      expectedHarvest:
        date: 2025-11-15
        amount: 6
        unit: kg
        `
const stepInput = yaml.parse(stepInputString)

// console.log("Step input: ", JSON.stringify(stepInput, null, 2))

const main = async () => {
  const rootStackName = outputs.custom.rootStackName
  await getLambdaEnvironmentVariables(await getDeployedResourceArn(rootStackName, 'generateGardenPlanStepslambda'))

  // process.env.AMPLIFY_DATA_GRAPHQL_ENDPOINT = outputs.data.url
  // process.env.AWS_DEFAULT_REGION = outputs.auth.aws_region
  process.env.MODEL_ID = 'anthropic.claude-3-sonnet-20240229-v1:0'

  // const credentials = await stsClient.config.credentials()
  // process.env.AWS_ACCESS_KEY_ID = credentials.accessKeyId
  // process.env.AWS_SECRET_ACCESS_KEY = credentials.secretAccessKey
  // process.env.AWS_SESSION_TOKEN = credentials.sessionToken

  // // const { resourceConfig, libraryOptions } = await getAmplifyDataClientConfig(process.env);
  // // Amplify.configure(resourceConfig, libraryOptions);

  // Amplify.configure(
  //   {
  //     API: {
  //       GraphQL: {
  //         endpoint: process.env.AMPLIFY_DATA_GRAPHQL_ENDPOINT, // replace with your defineData name
  //         region: process.env.AWS_REGION,
  //         defaultAuthMode: 'identityPool'
  //       }
  //     }
  //   },
  //   {
  //     Auth: {
  //       credentialsProvider: {
  //         getCredentialsAndIdentityId: async () => ({
  //           credentials: {
  //             accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
  //             secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  //             sessionToken: process.env.AWS_SESSION_TOKEN!,
  //           },
  //         }),
  //         clearCredentialsAndIdentityId: () => {
  //           /* noop */
  //         },
  //       },
  //     },
  //   }
  // );

  // const amplifyClient = generateClient<Schema>();
  const amplifyClient = await getConfiguredAmplifyClient()

  console.log('Amplify is configured. Generating garden')

  const garden = await amplifyClient.graphql({
    query: createGarden,
    variables: {
      input: {}
    }
  }).catch(
    (error => console.error("Error creating new garden: ", error))
  )

  console.log("Created new garden: ", garden)

  if (!garden || !garden.data.createGarden) throw new Error("Failed to create garden")

  const newStep = await amplifyClient.graphql({
    query: createPlannedStepForGarden,
    variables: {
      input: {
        gardenId: 'a0937300-9c36-46d2-bce8-c906e4d3bba2',//garden.data.createGarden.id,
        step: {
          title: "dummyTitle",//stepInput.title,
          // description: stepInput.description,
          role: "human",
          // plantRows: stepInput.plantRows
          plantRows: [
            {
              "species": "Kale",
              "location": {
                "start": {
                  "x": 0,
                  "y": 0
                },
                "end": {
                  "x": 0.5,
                  "y": 8
                }
              },
              "rowSpacingCm": 30,
              "plantDate": "2025-08-15",
              "harvest": {
                "first": "2025-10-15",
                "amount": 10,
                "unit": "kg"
              }
            }

          ]
        }
      } as CreatePlannedStepInput
    }
  }).catch((error) => console.error("Error creating new step: ", yaml.stringify(error)))
  // .then(
  //     (response) => console.log("Created new step: ", response)
  // ).catch(
  //     (error) => console.error("Error creating new step: ", error)
  // )

  console.log("Created new step: ", yaml.stringify(newStep!.data!.createPlannedStep))
}

main()