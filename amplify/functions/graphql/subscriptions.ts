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
` as GeneratedSubscription<
  APITypes.OnCreateGardenSubscriptionVariables,
  APITypes.OnCreateGardenSubscription
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
      status
      variety
      __typename
    }
    owner
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreatePlantedPlantRowSubscriptionVariables,
  APITypes.OnCreatePlantedPlantRowSubscription
>;
export const onCreateWorkStep = /* GraphQL */ `subscription OnCreateWorkStep(
  $filter: ModelSubscriptionWorkStepFilterInput
  $owner: String
) {
  onCreateWorkStep(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateWorkStepSubscriptionVariables,
  APITypes.OnCreateWorkStepSubscription
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
` as GeneratedSubscription<
  APITypes.OnDeleteGardenSubscriptionVariables,
  APITypes.OnDeleteGardenSubscription
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
      status
      variety
      __typename
    }
    owner
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeletePlantedPlantRowSubscriptionVariables,
  APITypes.OnDeletePlantedPlantRowSubscription
>;
export const onDeleteWorkStep = /* GraphQL */ `subscription OnDeleteWorkStep(
  $filter: ModelSubscriptionWorkStepFilterInput
  $owner: String
) {
  onDeleteWorkStep(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteWorkStepSubscriptionVariables,
  APITypes.OnDeleteWorkStepSubscription
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
` as GeneratedSubscription<
  APITypes.OnUpdateGardenSubscriptionVariables,
  APITypes.OnUpdateGardenSubscription
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
      status
      variety
      __typename
    }
    owner
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdatePlantedPlantRowSubscriptionVariables,
  APITypes.OnUpdatePlantedPlantRowSubscription
>;
export const onUpdateWorkStep = /* GraphQL */ `subscription OnUpdateWorkStep(
  $filter: ModelSubscriptionWorkStepFilterInput
  $owner: String
) {
  onUpdateWorkStep(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateWorkStepSubscriptionVariables,
  APITypes.OnUpdateWorkStepSubscription
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
