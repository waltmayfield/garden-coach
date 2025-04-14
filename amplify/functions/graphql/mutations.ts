/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createChatMessage = /* GraphQL */ `mutation CreateChatMessage(
  $condition: ModelChatMessageConditionInput
  $input: CreateChatMessageInput!
) {
  createChatMessage(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateChatMessageMutationVariables,
  APITypes.CreateChatMessageMutation
>;
export const createDummyModelToAddIamDirective = /* GraphQL */ `mutation CreateDummyModelToAddIamDirective(
  $condition: ModelDummyModelToAddIamDirectiveConditionInput
  $input: CreateDummyModelToAddIamDirectiveInput!
) {
  createDummyModelToAddIamDirective(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateDummyModelToAddIamDirectiveMutationVariables,
  APITypes.CreateDummyModelToAddIamDirectiveMutation
>;
export const createGarden = /* GraphQL */ `mutation CreateGarden(
  $condition: ModelGardenConditionInput
  $input: CreateGardenInput!
) {
  createGarden(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateGardenMutationVariables,
  APITypes.CreateGardenMutation
>;
export const createPlantedPlantRow = /* GraphQL */ `mutation CreatePlantedPlantRow(
  $condition: ModelPlantedPlantRowConditionInput
  $input: CreatePlantedPlantRowInput!
) {
  createPlantedPlantRow(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreatePlantedPlantRowMutationVariables,
  APITypes.CreatePlantedPlantRowMutation
>;
export const createWorkStep = /* GraphQL */ `mutation CreateWorkStep(
  $condition: ModelWorkStepConditionInput
  $input: CreateWorkStepInput!
) {
  createWorkStep(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateWorkStepMutationVariables,
  APITypes.CreateWorkStepMutation
>;
export const deleteChatMessage = /* GraphQL */ `mutation DeleteChatMessage(
  $condition: ModelChatMessageConditionInput
  $input: DeleteChatMessageInput!
) {
  deleteChatMessage(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteChatMessageMutationVariables,
  APITypes.DeleteChatMessageMutation
>;
export const deleteDummyModelToAddIamDirective = /* GraphQL */ `mutation DeleteDummyModelToAddIamDirective(
  $condition: ModelDummyModelToAddIamDirectiveConditionInput
  $input: DeleteDummyModelToAddIamDirectiveInput!
) {
  deleteDummyModelToAddIamDirective(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteDummyModelToAddIamDirectiveMutationVariables,
  APITypes.DeleteDummyModelToAddIamDirectiveMutation
>;
export const deleteGarden = /* GraphQL */ `mutation DeleteGarden(
  $condition: ModelGardenConditionInput
  $input: DeleteGardenInput!
) {
  deleteGarden(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteGardenMutationVariables,
  APITypes.DeleteGardenMutation
>;
export const deletePlantedPlantRow = /* GraphQL */ `mutation DeletePlantedPlantRow(
  $condition: ModelPlantedPlantRowConditionInput
  $input: DeletePlantedPlantRowInput!
) {
  deletePlantedPlantRow(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeletePlantedPlantRowMutationVariables,
  APITypes.DeletePlantedPlantRowMutation
>;
export const deleteWorkStep = /* GraphQL */ `mutation DeleteWorkStep(
  $condition: ModelWorkStepConditionInput
  $input: DeleteWorkStepInput!
) {
  deleteWorkStep(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteWorkStepMutationVariables,
  APITypes.DeleteWorkStepMutation
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
    chunkText
    gardenId
    index
    __typename
  }
}
` as GeneratedMutation<
  APITypes.PublishResponseStreamChunkMutationVariables,
  APITypes.PublishResponseStreamChunkMutation
>;
export const updateChatMessage = /* GraphQL */ `mutation UpdateChatMessage(
  $condition: ModelChatMessageConditionInput
  $input: UpdateChatMessageInput!
) {
  updateChatMessage(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateChatMessageMutationVariables,
  APITypes.UpdateChatMessageMutation
>;
export const updateDummyModelToAddIamDirective = /* GraphQL */ `mutation UpdateDummyModelToAddIamDirective(
  $condition: ModelDummyModelToAddIamDirectiveConditionInput
  $input: UpdateDummyModelToAddIamDirectiveInput!
) {
  updateDummyModelToAddIamDirective(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateDummyModelToAddIamDirectiveMutationVariables,
  APITypes.UpdateDummyModelToAddIamDirectiveMutation
>;
export const updateGarden = /* GraphQL */ `mutation UpdateGarden(
  $condition: ModelGardenConditionInput
  $input: UpdateGardenInput!
) {
  updateGarden(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateGardenMutationVariables,
  APITypes.UpdateGardenMutation
>;
export const updatePlantedPlantRow = /* GraphQL */ `mutation UpdatePlantedPlantRow(
  $condition: ModelPlantedPlantRowConditionInput
  $input: UpdatePlantedPlantRowInput!
) {
  updatePlantedPlantRow(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdatePlantedPlantRowMutationVariables,
  APITypes.UpdatePlantedPlantRowMutation
>;
export const updateWorkStep = /* GraphQL */ `mutation UpdateWorkStep(
  $condition: ModelWorkStepConditionInput
  $input: UpdateWorkStepInput!
) {
  updateWorkStep(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateWorkStepMutationVariables,
  APITypes.UpdateWorkStepMutation
>;
