import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import { Schema } from "../amplify/data/resource";
import { Message } from "./types";

// import { generateClient } from "aws-amplify/data";
// import { type Schema } from "@/../amplify/data/resource";
const amplifyClient = generateClient<Schema>();

export const getConfiguredAmplifyClient = () => {
  Amplify.configure(
    {
      API: {
        GraphQL: {
          endpoint: process.env.AMPLIFY_DATA_GRAPHQL_ENDPOINT!, // replace with your defineData name
          region: process.env.AWS_REGION,
          defaultAuthMode: 'identityPool'
        }
      }
    },
    {
      Auth: {
        credentialsProvider: {
          getCredentialsAndIdentityId: async () => ({
            credentials: {
              accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
              secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
              sessionToken: process.env.AWS_SESSION_TOKEN!,
            },
          }),
          clearCredentialsAndIdentityId: () => {
            /* noop */
          },
        },
      },
    }
  );

  const amplifyClient = generateClient<Schema>();

  return amplifyClient;
}


export const combineAndSortMessages = ((arr1: Array<Message>, arr2: Array<Message>) => {
  const combinedMessages = [...arr1, ...arr2]
  const uniqueMessages = combinedMessages.filter((message, index, self) =>
    index === self.findIndex((p) => p.id === message.id)
  );
  return uniqueMessages.sort((a, b) => {
    if (!a.createdAt || !b.createdAt) throw new Error("createdAt is missing")
    return a.createdAt.localeCompare(b.createdAt)
  });
})

export const sendMessage = async (props: {
  gardenId: string,
  newMessage: Schema['ChatMessage']['createType']
}) => {
  const { data: newMessageData } = await amplifyClient.models.ChatMessage.create(props.newMessage)

  if (!props.newMessage.content || !props.newMessage.content.text) throw new Error("content.text is missing")
  const invokeResponse = await amplifyClient.queries.generateGarden({
    gardenId: props.gardenId,
    userInput: props.newMessage.content.text
  })

  console.log('invokeResponse: ', invokeResponse)

  return {
    newMessageData,
    invokeResponse
  }
}