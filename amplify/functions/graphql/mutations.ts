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
` as GeneratedMutation<
  APITypes.CreateChatMessageMutationVariables,
  APITypes.CreateChatMessageMutation
>;
export const createChatSession = /* GraphQL */ `mutation CreateChatSession(
  $condition: ModelChatSessionConditionInput
  $input: CreateChatSessionInput!
) {
  createChatSession(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateChatSessionMutationVariables,
  APITypes.CreateChatSessionMutation
>;
export const createGarden = /* GraphQL */ `mutation CreateGarden(
  $condition: ModelGardenConditionInput
  $input: CreateGardenInput!
) {
  createGarden(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateGardenMutationVariables,
  APITypes.CreateGardenMutation
>;
export const createPastStep = /* GraphQL */ `mutation CreatePastStep(
  $condition: ModelPastStepConditionInput
  $input: CreatePastStepInput!
) {
  createPastStep(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreatePastStepMutationVariables,
  APITypes.CreatePastStepMutation
>;
export const createPlannedStep = /* GraphQL */ `mutation CreatePlannedStep(
  $condition: ModelPlannedStepConditionInput
  $input: CreatePlannedStepInput!
) {
  createPlannedStep(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreatePlannedStepMutationVariables,
  APITypes.CreatePlannedStepMutation
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
` as GeneratedMutation<
  APITypes.CreatePlantedPlantRowMutationVariables,
  APITypes.CreatePlantedPlantRowMutation
>;
export const deleteChatMessage = /* GraphQL */ `mutation DeleteChatMessage(
  $condition: ModelChatMessageConditionInput
  $input: DeleteChatMessageInput!
) {
  deleteChatMessage(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteChatMessageMutationVariables,
  APITypes.DeleteChatMessageMutation
>;
export const deleteChatSession = /* GraphQL */ `mutation DeleteChatSession(
  $condition: ModelChatSessionConditionInput
  $input: DeleteChatSessionInput!
) {
  deleteChatSession(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteChatSessionMutationVariables,
  APITypes.DeleteChatSessionMutation
>;
export const deleteGarden = /* GraphQL */ `mutation DeleteGarden(
  $condition: ModelGardenConditionInput
  $input: DeleteGardenInput!
) {
  deleteGarden(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteGardenMutationVariables,
  APITypes.DeleteGardenMutation
>;
export const deletePastStep = /* GraphQL */ `mutation DeletePastStep(
  $condition: ModelPastStepConditionInput
  $input: DeletePastStepInput!
) {
  deletePastStep(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeletePastStepMutationVariables,
  APITypes.DeletePastStepMutation
>;
export const deletePlannedStep = /* GraphQL */ `mutation DeletePlannedStep(
  $condition: ModelPlannedStepConditionInput
  $input: DeletePlannedStepInput!
) {
  deletePlannedStep(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeletePlannedStepMutationVariables,
  APITypes.DeletePlannedStepMutation
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
` as GeneratedMutation<
  APITypes.DeletePlantedPlantRowMutationVariables,
  APITypes.DeletePlantedPlantRowMutation
>;
export const updateChatMessage = /* GraphQL */ `mutation UpdateChatMessage(
  $condition: ModelChatMessageConditionInput
  $input: UpdateChatMessageInput!
) {
  updateChatMessage(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateChatMessageMutationVariables,
  APITypes.UpdateChatMessageMutation
>;
export const updateChatSession = /* GraphQL */ `mutation UpdateChatSession(
  $condition: ModelChatSessionConditionInput
  $input: UpdateChatSessionInput!
) {
  updateChatSession(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateChatSessionMutationVariables,
  APITypes.UpdateChatSessionMutation
>;
export const updateGarden = /* GraphQL */ `mutation UpdateGarden(
  $condition: ModelGardenConditionInput
  $input: UpdateGardenInput!
) {
  updateGarden(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateGardenMutationVariables,
  APITypes.UpdateGardenMutation
>;
export const updatePastStep = /* GraphQL */ `mutation UpdatePastStep(
  $condition: ModelPastStepConditionInput
  $input: UpdatePastStepInput!
) {
  updatePastStep(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdatePastStepMutationVariables,
  APITypes.UpdatePastStepMutation
>;
export const updatePlannedStep = /* GraphQL */ `mutation UpdatePlannedStep(
  $condition: ModelPlannedStepConditionInput
  $input: UpdatePlannedStepInput!
) {
  updatePlannedStep(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdatePlannedStepMutationVariables,
  APITypes.UpdatePlannedStepMutation
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
` as GeneratedMutation<
  APITypes.UpdatePlantedPlantRowMutationVariables,
  APITypes.UpdatePlantedPlantRowMutation
>;
