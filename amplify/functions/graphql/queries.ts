/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const generateGarden = /* GraphQL */ `query GenerateGarden($gardenId: ID!, $userInput: String!) {
  generateGarden(gardenId: $gardenId, userInput: $userInput) {
    success
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GenerateGardenQueryVariables,
  APITypes.GenerateGardenQuery
>;
export const getChatMessage = /* GraphQL */ `query GetChatMessage($id: ID!) {
  getChatMessage(id: $id) {
    content {
      text
      __typename
    }
    contextStepId
    createdAt
    garden {
      createdAt
      id
      name
      objective
      owner
      units
      updatedAt
      __typename
    }
    gardenId
    id
    owner
    responseComplete
    role
    toolCallId
    toolCalls
    toolName
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetChatMessageQueryVariables,
  APITypes.GetChatMessageQuery
>;
export const getDummyModelToAddIamDirective = /* GraphQL */ `query GetDummyModelToAddIamDirective($id: ID!) {
  getDummyModelToAddIamDirective(id: $id) {
    createdAt
    id
    owner
    responseStreamChunk {
      chunkText
      gardenId
      index
      __typename
    }
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetDummyModelToAddIamDirectiveQueryVariables,
  APITypes.GetDummyModelToAddIamDirectiveQuery
>;
export const getGarden = /* GraphQL */ `query GetGarden($id: ID!) {
  getGarden(id: $id) {
    createdAt
    id
    location {
      cityStateAndCountry
      lattitude
      longitude
      __typename
    }
    messages {
      nextToken
      __typename
    }
    name
    northVector {
      x
      y
      __typename
    }
    objective
    owner
    perimeterPoints {
      x
      y
      __typename
    }
    plantedPlantRow {
      nextToken
      __typename
    }
    steps {
      nextToken
      __typename
    }
    units
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetGardenQueryVariables, APITypes.GetGardenQuery>;
export const getPlantedPlantRow = /* GraphQL */ `query GetPlantedPlantRow($id: ID!) {
  getPlantedPlantRow(id: $id) {
    createdAt
    garden {
      createdAt
      id
      name
      objective
      owner
      units
      updatedAt
      __typename
    }
    gardenId
    id
    info {
      perrenial
      plantDate
      rowSpacingCm
      species
      status
      variety
      __typename
    }
    owner
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetPlantedPlantRowQueryVariables,
  APITypes.GetPlantedPlantRowQuery
>;
export const getWorkStep = /* GraphQL */ `query GetWorkStep($id: ID!) {
  getWorkStep(id: $id) {
    createdAt
    date
    description
    garden {
      createdAt
      id
      name
      objective
      owner
      units
      updatedAt
      __typename
    }
    gardenId
    id
    owner
    plantRows {
      perrenial
      plantDate
      rowSpacingCm
      species
      status
      variety
      __typename
    }
    result
    role
    status
    title
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetWorkStepQueryVariables,
  APITypes.GetWorkStepQuery
>;
export const listChatMessageByGardenIdAndCreatedAt = /* GraphQL */ `query ListChatMessageByGardenIdAndCreatedAt(
  $createdAt: ModelStringKeyConditionInput
  $filter: ModelChatMessageFilterInput
  $gardenId: ID!
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listChatMessageByGardenIdAndCreatedAt(
    createdAt: $createdAt
    filter: $filter
    gardenId: $gardenId
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      contextStepId
      createdAt
      gardenId
      id
      owner
      responseComplete
      role
      toolCallId
      toolCalls
      toolName
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListChatMessageByGardenIdAndCreatedAtQueryVariables,
  APITypes.ListChatMessageByGardenIdAndCreatedAtQuery
>;
export const listChatMessages = /* GraphQL */ `query ListChatMessages(
  $filter: ModelChatMessageFilterInput
  $limit: Int
  $nextToken: String
) {
  listChatMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      contextStepId
      createdAt
      gardenId
      id
      owner
      responseComplete
      role
      toolCallId
      toolCalls
      toolName
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListChatMessagesQueryVariables,
  APITypes.ListChatMessagesQuery
>;
export const listDummyModelToAddIamDirectives = /* GraphQL */ `query ListDummyModelToAddIamDirectives(
  $filter: ModelDummyModelToAddIamDirectiveFilterInput
  $limit: Int
  $nextToken: String
) {
  listDummyModelToAddIamDirectives(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      createdAt
      id
      owner
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListDummyModelToAddIamDirectivesQueryVariables,
  APITypes.ListDummyModelToAddIamDirectivesQuery
>;
export const listGardens = /* GraphQL */ `query ListGardens(
  $filter: ModelGardenFilterInput
  $limit: Int
  $nextToken: String
) {
  listGardens(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      createdAt
      id
      name
      objective
      owner
      units
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListGardensQueryVariables,
  APITypes.ListGardensQuery
>;
export const listPlantedPlantRows = /* GraphQL */ `query ListPlantedPlantRows(
  $filter: ModelPlantedPlantRowFilterInput
  $limit: Int
  $nextToken: String
) {
  listPlantedPlantRows(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      createdAt
      gardenId
      id
      owner
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListPlantedPlantRowsQueryVariables,
  APITypes.ListPlantedPlantRowsQuery
>;
export const listWorkSteps = /* GraphQL */ `query ListWorkSteps(
  $filter: ModelWorkStepFilterInput
  $id: ID
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listWorkSteps(
    filter: $filter
    id: $id
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      createdAt
      date
      description
      gardenId
      id
      owner
      result
      role
      status
      title
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListWorkStepsQueryVariables,
  APITypes.ListWorkStepsQuery
>;
