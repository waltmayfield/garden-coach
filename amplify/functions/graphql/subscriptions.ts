/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateGarden = /* GraphQL */ `subscription OnCreateGarden(
  $filter: ModelSubscriptionGardenFilterInput
  $owner: String
) {
  onCreateGarden(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateGardenSubscriptionVariables,
  APITypes.OnCreateGardenSubscription
>;
export const onCreatePastStep = /* GraphQL */ `subscription OnCreatePastStep(
  $filter: ModelSubscriptionPastStepFilterInput
  $owner: String
) {
  onCreatePastStep(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreatePastStepSubscriptionVariables,
  APITypes.OnCreatePastStepSubscription
>;
export const onCreatePlannedStep = /* GraphQL */ `subscription OnCreatePlannedStep(
  $filter: ModelSubscriptionPlannedStepFilterInput
  $owner: String
) {
  onCreatePlannedStep(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreatePlannedStepSubscriptionVariables,
  APITypes.OnCreatePlannedStepSubscription
>;
export const onCreatePlantRow = /* GraphQL */ `subscription OnCreatePlantRow(
  $filter: ModelSubscriptionPlantRowFilterInput
  $owner: String
) {
  onCreatePlantRow(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreatePlantRowSubscriptionVariables,
  APITypes.OnCreatePlantRowSubscription
>;
export const onDeleteGarden = /* GraphQL */ `subscription OnDeleteGarden(
  $filter: ModelSubscriptionGardenFilterInput
  $owner: String
) {
  onDeleteGarden(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteGardenSubscriptionVariables,
  APITypes.OnDeleteGardenSubscription
>;
export const onDeletePastStep = /* GraphQL */ `subscription OnDeletePastStep(
  $filter: ModelSubscriptionPastStepFilterInput
  $owner: String
) {
  onDeletePastStep(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeletePastStepSubscriptionVariables,
  APITypes.OnDeletePastStepSubscription
>;
export const onDeletePlannedStep = /* GraphQL */ `subscription OnDeletePlannedStep(
  $filter: ModelSubscriptionPlannedStepFilterInput
  $owner: String
) {
  onDeletePlannedStep(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeletePlannedStepSubscriptionVariables,
  APITypes.OnDeletePlannedStepSubscription
>;
export const onDeletePlantRow = /* GraphQL */ `subscription OnDeletePlantRow(
  $filter: ModelSubscriptionPlantRowFilterInput
  $owner: String
) {
  onDeletePlantRow(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeletePlantRowSubscriptionVariables,
  APITypes.OnDeletePlantRowSubscription
>;
export const onUpdateGarden = /* GraphQL */ `subscription OnUpdateGarden(
  $filter: ModelSubscriptionGardenFilterInput
  $owner: String
) {
  onUpdateGarden(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateGardenSubscriptionVariables,
  APITypes.OnUpdateGardenSubscription
>;
export const onUpdatePastStep = /* GraphQL */ `subscription OnUpdatePastStep(
  $filter: ModelSubscriptionPastStepFilterInput
  $owner: String
) {
  onUpdatePastStep(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdatePastStepSubscriptionVariables,
  APITypes.OnUpdatePastStepSubscription
>;
export const onUpdatePlannedStep = /* GraphQL */ `subscription OnUpdatePlannedStep(
  $filter: ModelSubscriptionPlannedStepFilterInput
  $owner: String
) {
  onUpdatePlannedStep(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdatePlannedStepSubscriptionVariables,
  APITypes.OnUpdatePlannedStepSubscription
>;
export const onUpdatePlantRow = /* GraphQL */ `subscription OnUpdatePlantRow(
  $filter: ModelSubscriptionPlantRowFilterInput
  $owner: String
) {
  onUpdatePlantRow(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdatePlantRowSubscriptionVariables,
  APITypes.OnUpdatePlantRowSubscription
>;
