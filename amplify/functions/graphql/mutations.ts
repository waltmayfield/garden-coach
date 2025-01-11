/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

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
    plantRows {
      nextToken
      __typename
    }
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
      updatedAt
      zipCode
      __typename
    }
    gardenId
    id
    notes
    owner
    plantRow {
      createdAt
      gardenId
      id
      owner
      plantSpacing
      species
      updatedAt
      __typename
    }
    plantRowId
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
      updatedAt
      zipCode
      __typename
    }
    gardenId
    id
    owner
    plannedDate
    plantRow {
      createdAt
      gardenId
      id
      owner
      plantSpacing
      species
      updatedAt
      __typename
    }
    plantRowId
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
export const createPlantRow = /* GraphQL */ `mutation CreatePlantRow(
  $condition: ModelPlantRowConditionInput
  $input: CreatePlantRowInput!
) {
  createPlantRow(condition: $condition, input: $input) {
    createdAt
    garden {
      createdAt
      id
      name
      objective
      owner
      updatedAt
      zipCode
      __typename
    }
    gardenId
    id
    location {
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
    plantSpacing
    species
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreatePlantRowMutationVariables,
  APITypes.CreatePlantRowMutation
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
    plantRows {
      nextToken
      __typename
    }
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
      updatedAt
      zipCode
      __typename
    }
    gardenId
    id
    notes
    owner
    plantRow {
      createdAt
      gardenId
      id
      owner
      plantSpacing
      species
      updatedAt
      __typename
    }
    plantRowId
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
      updatedAt
      zipCode
      __typename
    }
    gardenId
    id
    owner
    plannedDate
    plantRow {
      createdAt
      gardenId
      id
      owner
      plantSpacing
      species
      updatedAt
      __typename
    }
    plantRowId
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
export const deletePlantRow = /* GraphQL */ `mutation DeletePlantRow(
  $condition: ModelPlantRowConditionInput
  $input: DeletePlantRowInput!
) {
  deletePlantRow(condition: $condition, input: $input) {
    createdAt
    garden {
      createdAt
      id
      name
      objective
      owner
      updatedAt
      zipCode
      __typename
    }
    gardenId
    id
    location {
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
    plantSpacing
    species
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeletePlantRowMutationVariables,
  APITypes.DeletePlantRowMutation
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
    plantRows {
      nextToken
      __typename
    }
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
      updatedAt
      zipCode
      __typename
    }
    gardenId
    id
    notes
    owner
    plantRow {
      createdAt
      gardenId
      id
      owner
      plantSpacing
      species
      updatedAt
      __typename
    }
    plantRowId
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
      updatedAt
      zipCode
      __typename
    }
    gardenId
    id
    owner
    plannedDate
    plantRow {
      createdAt
      gardenId
      id
      owner
      plantSpacing
      species
      updatedAt
      __typename
    }
    plantRowId
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
export const updatePlantRow = /* GraphQL */ `mutation UpdatePlantRow(
  $condition: ModelPlantRowConditionInput
  $input: UpdatePlantRowInput!
) {
  updatePlantRow(condition: $condition, input: $input) {
    createdAt
    garden {
      createdAt
      id
      name
      objective
      owner
      updatedAt
      zipCode
      __typename
    }
    gardenId
    id
    location {
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
    plantSpacing
    species
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdatePlantRowMutationVariables,
  APITypes.UpdatePlantRowMutation
>;
