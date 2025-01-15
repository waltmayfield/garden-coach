/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const generateGardenPlanSteps = /* GraphQL */ `query GenerateGardenPlanSteps($gardenId: ID!) {
  generateGardenPlanSteps(gardenId: $gardenId) {
    description
    plantRows {
      plantDate
      plantSpacingInMeters
      species
      __typename
    }
    result
    role
    title
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GenerateGardenPlanStepsQueryVariables,
  APITypes.GenerateGardenPlanStepsQuery
>;
export const getChatMessage = /* GraphQL */ `query GetChatMessage($id: ID!) {
  getChatMessage(id: $id) {
    chatSessionId
    content {
      text
      __typename
    }
    createdAt
    id
    owner
    role
    session {
      createdAt
      id
      owner
      updatedAt
      __typename
    }
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetChatMessageQueryVariables,
  APITypes.GetChatMessageQuery
>;
export const getChatSession = /* GraphQL */ `query GetChatSession($id: ID!) {
  getChatSession(id: $id) {
    createdAt
    id
    messages {
      nextToken
      __typename
    }
    owner
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetChatSessionQueryVariables,
  APITypes.GetChatSessionQuery
>;
export const getGarden = /* GraphQL */ `query GetGarden($id: ID!) {
  getGarden(id: $id) {
    createdAt
    id
    name
    objective
    owner
    pastSteps {
      nextToken
      __typename
    }
    perimeterPoints {
      x
      y
      __typename
    }
    plannedSteps {
      nextToken
      __typename
    }
    plantedPlantRow {
      nextToken
      __typename
    }
    units
    updatedAt
    zipCode
    __typename
  }
}
` as GeneratedQuery<APITypes.GetGardenQueryVariables, APITypes.GetGardenQuery>;
export const getPastStep = /* GraphQL */ `query GetPastStep($id: ID!) {
  getPastStep(id: $id) {
    completedDate
    createdAt
    garden {
      createdAt
      id
      name
      objective
      owner
      units
      updatedAt
      zipCode
      __typename
    }
    gardenId
    id
    notes
    owner
    plantRowId
    plantedPlantRow {
      createdAt
      gardenId
      id
      owner
      updatedAt
      __typename
    }
    step {
      description
      result
      role
      title
      __typename
    }
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetPastStepQueryVariables,
  APITypes.GetPastStepQuery
>;
export const getPlannedStep = /* GraphQL */ `query GetPlannedStep($id: ID!) {
  getPlannedStep(id: $id) {
    createdAt
    garden {
      createdAt
      id
      name
      objective
      owner
      units
      updatedAt
      zipCode
      __typename
    }
    gardenId
    id
    owner
    plannedDate
    plantRowId
    plantedPlantRow {
      createdAt
      gardenId
      id
      owner
      updatedAt
      __typename
    }
    step {
      description
      result
      role
      title
      __typename
    }
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetPlannedStepQueryVariables,
  APITypes.GetPlannedStepQuery
>;
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
      zipCode
      __typename
    }
    gardenId
    id
    info {
      plantDate
      plantSpacingInMeters
      species
      __typename
    }
    owner
    pastSteps {
      nextToken
      __typename
    }
    plannedSteps {
      nextToken
      __typename
    }
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetPlantedPlantRowQueryVariables,
  APITypes.GetPlantedPlantRowQuery
>;
export const listChatMessageByChatSessionIdAndCreatedAt = /* GraphQL */ `query ListChatMessageByChatSessionIdAndCreatedAt(
  $chatSessionId: ID!
  $createdAt: ModelStringKeyConditionInput
  $filter: ModelChatMessageFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listChatMessageByChatSessionIdAndCreatedAt(
    chatSessionId: $chatSessionId
    createdAt: $createdAt
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      chatSessionId
      createdAt
      id
      owner
      role
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListChatMessageByChatSessionIdAndCreatedAtQueryVariables,
  APITypes.ListChatMessageByChatSessionIdAndCreatedAtQuery
>;
export const listChatMessages = /* GraphQL */ `query ListChatMessages(
  $filter: ModelChatMessageFilterInput
  $limit: Int
  $nextToken: String
) {
  listChatMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      chatSessionId
      createdAt
      id
      owner
      role
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
export const listChatSessions = /* GraphQL */ `query ListChatSessions(
  $filter: ModelChatSessionFilterInput
  $limit: Int
  $nextToken: String
) {
  listChatSessions(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  APITypes.ListChatSessionsQueryVariables,
  APITypes.ListChatSessionsQuery
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
      zipCode
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
export const listPastSteps = /* GraphQL */ `query ListPastSteps(
  $filter: ModelPastStepFilterInput
  $limit: Int
  $nextToken: String
) {
  listPastSteps(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      completedDate
      createdAt
      gardenId
      id
      notes
      owner
      plantRowId
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListPastStepsQueryVariables,
  APITypes.ListPastStepsQuery
>;
export const listPlannedSteps = /* GraphQL */ `query ListPlannedSteps(
  $filter: ModelPlannedStepFilterInput
  $limit: Int
  $nextToken: String
) {
  listPlannedSteps(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      createdAt
      gardenId
      id
      owner
      plannedDate
      plantRowId
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListPlannedStepsQueryVariables,
  APITypes.ListPlannedStepsQuery
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
