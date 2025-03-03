import * as APITypes from "../amplify/functions/graphql/API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};


export const createChatMessage = /* GraphQL */ `mutation CreateChatMessage(
  $condition: ModelChatMessageConditionInput
  $input: CreateChatMessageInput!
) {
  createChatMessage(condition: $condition, input: $input) {
    gardenId
    content {
      text
    }
    responseComplete
    toolCallId
    toolName
    toolCalls

    role
    id
    createdAt
    updatedAt
    owner
  }
}
` as GeneratedMutation<
  APITypes.CreateChatMessageMutationVariables,
  APITypes.CreateChatMessageMutation
>;

export const createPlannedStepForGarden = /* GraphQL */ `mutation CreatePlannedStep(
  $condition: ModelPlannedStepConditionInput
  $input: CreatePlannedStepInput!
) {
  createPlannedStep(condition: $condition, input: $input) {
    gardenId
    plannedDate
    step {
      description
      result
      role
      title
      plantRows {
        species
      }
    }
    id
    createdAt
    updatedAt
    owner
  }
}
` as GeneratedMutation<
  APITypes.CreatePlannedStepMutationVariables,
  APITypes.CreatePlannedStepMutation
>;

export const publishResponseStreamChunk = /* GraphQL */ `mutation PublishResponseStreamChunk(
  $chunkText: String!
  $gardenId: String!
  $index: Int!
) {
  publishResponseStreamChunk(
    chunkText: $chunkText
    gardenId: $gardenId
    index: $index
  ) {
    __typename
  }
}
` as GeneratedMutation<
  APITypes.PublishResponseStreamChunkMutationVariables,
  APITypes.PublishResponseStreamChunkMutation
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
      plantRows {
        variety
        species
        plantSpacingInMeters
        plantDate
        perrenial
        harvest {
          amount
          window
          first
          unit
        }
        location {
          end {
            x
            y
          }
          start {
            x
            y
          }
        }
      }
      __typename
    }
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetPlannedStepQueryVariables,
  APITypes.GetPlannedStepQuery & { getPlannedStep: {step: {plantRows: APITypes.PlantRow}} }
>;

export const listPlannedSteps = /* GraphQL */ `query ListPlannedSteps(
  $filter: ModelPlannedStepFilterInput
  $id: ID
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listPlannedSteps(
    filter: $filter
    id: $id
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      id
      createdAt
      owner
      step {
        description
        plantRows {
          location {
            start {
              x
              y
            }
            end {
              x
              y
            }
          }
          harvest {
            amount
            window
            first
            unit
          }
          perrenial
          plantDate
          rowSpacingCm
          species
          variety
        }
        role
        result
        title
      }
      plannedDate
    }
    nextToken
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