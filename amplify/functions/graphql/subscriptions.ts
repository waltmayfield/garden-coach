/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateChatMessage = /* GraphQL */ `subscription OnCreateChatMessage(
  $filter: ModelSubscriptionChatMessageFilterInput
  $owner: String
) {
  onCreateChatMessage(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateChatMessageSubscriptionVariables,
  APITypes.OnCreateChatMessageSubscription
>;
export const onCreateDummyModelToAddIamDirective = /* GraphQL */ `subscription OnCreateDummyModelToAddIamDirective(
  $filter: ModelSubscriptionDummyModelToAddIamDirectiveFilterInput
  $owner: String
) {
  onCreateDummyModelToAddIamDirective(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateDummyModelToAddIamDirectiveSubscriptionVariables,
  APITypes.OnCreateDummyModelToAddIamDirectiveSubscription
>;
export const onCreateGarden = /* GraphQL */ `subscription OnCreateGarden(
  $filter: ModelSubscriptionGardenFilterInput
  $owner: String
) {
  onCreateGarden(filter: $filter, owner: $owner) {
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
      units
      updatedAt
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
export const onCreatePlantedPlantRow = /* GraphQL */ `subscription OnCreatePlantedPlantRow(
  $filter: ModelSubscriptionPlantedPlantRowFilterInput
  $owner: String
) {
  onCreatePlantedPlantRow(filter: $filter, owner: $owner) {
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
      variety
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
` as GeneratedSubscription<
  APITypes.OnCreatePlantedPlantRowSubscriptionVariables,
  APITypes.OnCreatePlantedPlantRowSubscription
>;
export const onDeleteChatMessage = /* GraphQL */ `subscription OnDeleteChatMessage(
  $filter: ModelSubscriptionChatMessageFilterInput
  $owner: String
) {
  onDeleteChatMessage(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteChatMessageSubscriptionVariables,
  APITypes.OnDeleteChatMessageSubscription
>;
export const onDeleteDummyModelToAddIamDirective = /* GraphQL */ `subscription OnDeleteDummyModelToAddIamDirective(
  $filter: ModelSubscriptionDummyModelToAddIamDirectiveFilterInput
  $owner: String
) {
  onDeleteDummyModelToAddIamDirective(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteDummyModelToAddIamDirectiveSubscriptionVariables,
  APITypes.OnDeleteDummyModelToAddIamDirectiveSubscription
>;
export const onDeleteGarden = /* GraphQL */ `subscription OnDeleteGarden(
  $filter: ModelSubscriptionGardenFilterInput
  $owner: String
) {
  onDeleteGarden(filter: $filter, owner: $owner) {
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
      units
      updatedAt
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
export const onDeletePlantedPlantRow = /* GraphQL */ `subscription OnDeletePlantedPlantRow(
  $filter: ModelSubscriptionPlantedPlantRowFilterInput
  $owner: String
) {
  onDeletePlantedPlantRow(filter: $filter, owner: $owner) {
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
      variety
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
` as GeneratedSubscription<
  APITypes.OnDeletePlantedPlantRowSubscriptionVariables,
  APITypes.OnDeletePlantedPlantRowSubscription
>;
export const onUpdateChatMessage = /* GraphQL */ `subscription OnUpdateChatMessage(
  $filter: ModelSubscriptionChatMessageFilterInput
  $owner: String
) {
  onUpdateChatMessage(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateChatMessageSubscriptionVariables,
  APITypes.OnUpdateChatMessageSubscription
>;
export const onUpdateDummyModelToAddIamDirective = /* GraphQL */ `subscription OnUpdateDummyModelToAddIamDirective(
  $filter: ModelSubscriptionDummyModelToAddIamDirectiveFilterInput
  $owner: String
) {
  onUpdateDummyModelToAddIamDirective(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateDummyModelToAddIamDirectiveSubscriptionVariables,
  APITypes.OnUpdateDummyModelToAddIamDirectiveSubscription
>;
export const onUpdateGarden = /* GraphQL */ `subscription OnUpdateGarden(
  $filter: ModelSubscriptionGardenFilterInput
  $owner: String
) {
  onUpdateGarden(filter: $filter, owner: $owner) {
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
      units
      updatedAt
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
export const onUpdatePlantedPlantRow = /* GraphQL */ `subscription OnUpdatePlantedPlantRow(
  $filter: ModelSubscriptionPlantedPlantRowFilterInput
  $owner: String
) {
  onUpdatePlantedPlantRow(filter: $filter, owner: $owner) {
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
      variety
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
` as GeneratedSubscription<
  APITypes.OnUpdatePlantedPlantRowSubscriptionVariables,
  APITypes.OnUpdatePlantedPlantRowSubscription
>;
export const recieveResponseStreamChunk = /* GraphQL */ `subscription RecieveResponseStreamChunk($gardenId: String!) {
  recieveResponseStreamChunk(gardenId: $gardenId) {
    chunkText
    gardenId
    index
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.RecieveResponseStreamChunkSubscriptionVariables,
  APITypes.RecieveResponseStreamChunkSubscription
>;
