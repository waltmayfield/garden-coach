/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type EventInvocationResponse = {
  __typename: "EventInvocationResponse",
  success: boolean,
};

export type ChatMessage = {
  __typename: "ChatMessage",
  content?: ChatMessageContent | null,
  contextStepId?: string | null,
  createdAt?: string | null,
  garden?: Garden | null,
  gardenId?: string | null,
  id: string,
  owner?: string | null,
  responseComplete?: boolean | null,
  role?: ChatMessageRole | null,
  toolCallId?: string | null,
  toolCalls?: string | null,
  toolName?: string | null,
  updatedAt: string,
};

export type ChatMessageContent = {
  __typename: "ChatMessageContent",
  text?: string | null,
};

export type Garden = {
  __typename: "Garden",
  createdAt: string,
  id: string,
  location?: latLongLocation | null,
  messages?: ModelChatMessageConnection | null,
  name?: string | null,
  northVector?: XY | null,
  objective?: string | null,
  owner?: string | null,
  perimeterPoints?:  Array<XY | null > | null,
  plantedPlantRow?: ModelPlantedPlantRowConnection | null,
  steps?: ModelWorkStepConnection | null,
  units?: GardenUnits | null,
  updatedAt: string,
};

export type latLongLocation = {
  __typename: "latLongLocation",
  cityStateAndCountry: string,
  lattitude?: number | null,
  longitude?: number | null,
};

export type ModelChatMessageConnection = {
  __typename: "ModelChatMessageConnection",
  items:  Array<ChatMessage | null >,
  nextToken?: string | null,
};

export type XY = {
  __typename: "XY",
  x: number,
  y: number,
};

export type ModelPlantedPlantRowConnection = {
  __typename: "ModelPlantedPlantRowConnection",
  items:  Array<PlantedPlantRow | null >,
  nextToken?: string | null,
};

export type PlantedPlantRow = {
  __typename: "PlantedPlantRow",
  createdAt: string,
  garden?: Garden | null,
  gardenId?: string | null,
  id: string,
  info?: PlantRow | null,
  owner?: string | null,
  updatedAt: string,
};

export type PlantRow = {
  __typename: "PlantRow",
  harvest?: harvest | null,
  location?: rowLocation | null,
  perrenial?: boolean | null,
  plantDate?: string | null,
  rowSpacingCm?: number | null,
  species?: string | null,
  status?: PlantRowStatus | null,
  variety?: string | null,
};

export type harvest = {
  __typename: "harvest",
  amount?: number | null,
  first?: string | null,
  unit?: string | null,
  window?: number | null,
};

export type rowLocation = {
  __typename: "rowLocation",
  end: XY,
  start: XY,
};

export enum PlantRowStatus {
  failed = "failed",
  flowering = "flowering",
  fruiting = "fruiting",
  germinated = "germinated",
  planned = "planned",
  planted = "planted",
  removed = "removed",
  vegatitative = "vegatitative",
}


export type ModelWorkStepConnection = {
  __typename: "ModelWorkStepConnection",
  items:  Array<WorkStep | null >,
  nextToken?: string | null,
};

export type WorkStep = {
  __typename: "WorkStep",
  createdAt: string,
  date?: string | null,
  description?: string | null,
  garden?: Garden | null,
  gardenId?: string | null,
  id: string,
  owner?: string | null,
  plantRows?:  Array<PlantRow | null > | null,
  result?: string | null,
  role?: WorkStepRole | null,
  status?: WorkStepStatus | null,
  title: string,
  updatedAt: string,
};

export enum WorkStepRole {
  ai = "ai",
  human = "human",
}


export enum WorkStepStatus {
  completed = "completed",
  failed = "failed",
  planned = "planned",
  proposed = "proposed",
  rejected = "rejected",
}


export enum GardenUnits {
  imperial = "imperial",
  metric = "metric",
}


export enum ChatMessageRole {
  ai = "ai",
  human = "human",
  tool = "tool",
}


export type DummyModelToAddIamDirective = {
  __typename: "DummyModelToAddIamDirective",
  createdAt: string,
  id: string,
  owner?: string | null,
  responseStreamChunk?: ResponseStreamChunk | null,
  updatedAt: string,
};

export type ResponseStreamChunk = {
  __typename: "ResponseStreamChunk",
  chunkText: string,
  gardenId: string,
  index: number,
};

export type ModelStringKeyConditionInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
};

export type ModelChatMessageFilterInput = {
  and?: Array< ModelChatMessageFilterInput | null > | null,
  contextStepId?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  gardenId?: ModelIDInput | null,
  id?: ModelIDInput | null,
  not?: ModelChatMessageFilterInput | null,
  or?: Array< ModelChatMessageFilterInput | null > | null,
  owner?: ModelStringInput | null,
  responseComplete?: ModelBooleanInput | null,
  role?: ModelChatMessageRoleInput | null,
  toolCallId?: ModelStringInput | null,
  toolCalls?: ModelStringInput | null,
  toolName?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelStringInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  _null = "_null",
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
}


export type ModelSizeInput = {
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
};

export type ModelIDInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  size?: ModelSizeInput | null,
};

export type ModelBooleanInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  eq?: boolean | null,
  ne?: boolean | null,
};

export type ModelChatMessageRoleInput = {
  eq?: ChatMessageRole | null,
  ne?: ChatMessageRole | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelDummyModelToAddIamDirectiveFilterInput = {
  and?: Array< ModelDummyModelToAddIamDirectiveFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  not?: ModelDummyModelToAddIamDirectiveFilterInput | null,
  or?: Array< ModelDummyModelToAddIamDirectiveFilterInput | null > | null,
  owner?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelDummyModelToAddIamDirectiveConnection = {
  __typename: "ModelDummyModelToAddIamDirectiveConnection",
  items:  Array<DummyModelToAddIamDirective | null >,
  nextToken?: string | null,
};

export type ModelGardenFilterInput = {
  and?: Array< ModelGardenFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  not?: ModelGardenFilterInput | null,
  objective?: ModelStringInput | null,
  or?: Array< ModelGardenFilterInput | null > | null,
  owner?: ModelStringInput | null,
  units?: ModelGardenUnitsInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelGardenUnitsInput = {
  eq?: GardenUnits | null,
  ne?: GardenUnits | null,
};

export type ModelGardenConnection = {
  __typename: "ModelGardenConnection",
  items:  Array<Garden | null >,
  nextToken?: string | null,
};

export type ModelPlantedPlantRowFilterInput = {
  and?: Array< ModelPlantedPlantRowFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  gardenId?: ModelIDInput | null,
  id?: ModelIDInput | null,
  not?: ModelPlantedPlantRowFilterInput | null,
  or?: Array< ModelPlantedPlantRowFilterInput | null > | null,
  owner?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelWorkStepFilterInput = {
  and?: Array< ModelWorkStepFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  date?: ModelStringInput | null,
  description?: ModelStringInput | null,
  gardenId?: ModelIDInput | null,
  id?: ModelIDInput | null,
  not?: ModelWorkStepFilterInput | null,
  or?: Array< ModelWorkStepFilterInput | null > | null,
  owner?: ModelStringInput | null,
  result?: ModelStringInput | null,
  role?: ModelWorkStepRoleInput | null,
  status?: ModelWorkStepStatusInput | null,
  title?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelWorkStepRoleInput = {
  eq?: WorkStepRole | null,
  ne?: WorkStepRole | null,
};

export type ModelWorkStepStatusInput = {
  eq?: WorkStepStatus | null,
  ne?: WorkStepStatus | null,
};

export type ModelChatMessageConditionInput = {
  and?: Array< ModelChatMessageConditionInput | null > | null,
  contextStepId?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  gardenId?: ModelIDInput | null,
  not?: ModelChatMessageConditionInput | null,
  or?: Array< ModelChatMessageConditionInput | null > | null,
  owner?: ModelStringInput | null,
  responseComplete?: ModelBooleanInput | null,
  role?: ModelChatMessageRoleInput | null,
  toolCallId?: ModelStringInput | null,
  toolCalls?: ModelStringInput | null,
  toolName?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateChatMessageInput = {
  content?: ChatMessageContentInput | null,
  contextStepId?: string | null,
  createdAt?: string | null,
  gardenId?: string | null,
  id?: string | null,
  owner?: string | null,
  responseComplete?: boolean | null,
  role?: ChatMessageRole | null,
  toolCallId?: string | null,
  toolCalls?: string | null,
  toolName?: string | null,
};

export type ChatMessageContentInput = {
  text?: string | null,
};

export type ModelDummyModelToAddIamDirectiveConditionInput = {
  and?: Array< ModelDummyModelToAddIamDirectiveConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  not?: ModelDummyModelToAddIamDirectiveConditionInput | null,
  or?: Array< ModelDummyModelToAddIamDirectiveConditionInput | null > | null,
  owner?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateDummyModelToAddIamDirectiveInput = {
  id?: string | null,
  responseStreamChunk?: ResponseStreamChunkInput | null,
};

export type ResponseStreamChunkInput = {
  chunkText: string,
  gardenId: string,
  index: number,
};

export type ModelGardenConditionInput = {
  and?: Array< ModelGardenConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  name?: ModelStringInput | null,
  not?: ModelGardenConditionInput | null,
  objective?: ModelStringInput | null,
  or?: Array< ModelGardenConditionInput | null > | null,
  owner?: ModelStringInput | null,
  units?: ModelGardenUnitsInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateGardenInput = {
  id?: string | null,
  location?: LatLongLocationInput | null,
  name?: string | null,
  northVector?: XYInput | null,
  objective?: string | null,
  perimeterPoints?: Array< XYInput | null > | null,
  units?: GardenUnits | null,
};

export type LatLongLocationInput = {
  cityStateAndCountry: string,
  lattitude?: number | null,
  longitude?: number | null,
};

export type XYInput = {
  x: number,
  y: number,
};

export type ModelPlantedPlantRowConditionInput = {
  and?: Array< ModelPlantedPlantRowConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  gardenId?: ModelIDInput | null,
  not?: ModelPlantedPlantRowConditionInput | null,
  or?: Array< ModelPlantedPlantRowConditionInput | null > | null,
  owner?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreatePlantedPlantRowInput = {
  gardenId?: string | null,
  id?: string | null,
  info?: PlantRowInput | null,
};

export type PlantRowInput = {
  harvest?: HarvestInput | null,
  location?: RowLocationInput | null,
  perrenial?: boolean | null,
  plantDate?: string | null,
  rowSpacingCm?: number | null,
  species?: string | null,
  status?: PlantRowStatus | null,
  variety?: string | null,
};

export type HarvestInput = {
  amount?: number | null,
  first?: string | null,
  unit?: string | null,
  window?: number | null,
};

export type RowLocationInput = {
  end: XYInput,
  start: XYInput,
};

export type ModelWorkStepConditionInput = {
  and?: Array< ModelWorkStepConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  date?: ModelStringInput | null,
  description?: ModelStringInput | null,
  gardenId?: ModelIDInput | null,
  not?: ModelWorkStepConditionInput | null,
  or?: Array< ModelWorkStepConditionInput | null > | null,
  owner?: ModelStringInput | null,
  result?: ModelStringInput | null,
  role?: ModelWorkStepRoleInput | null,
  status?: ModelWorkStepStatusInput | null,
  title?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateWorkStepInput = {
  date?: string | null,
  description?: string | null,
  gardenId?: string | null,
  id?: string | null,
  owner?: string | null,
  plantRows?: Array< PlantRowInput | null > | null,
  result?: string | null,
  role?: WorkStepRole | null,
  status?: WorkStepStatus | null,
  title: string,
};

export type DeleteChatMessageInput = {
  id: string,
};

export type DeleteDummyModelToAddIamDirectiveInput = {
  id: string,
};

export type DeleteGardenInput = {
  id: string,
};

export type DeletePlantedPlantRowInput = {
  id: string,
};

export type DeleteWorkStepInput = {
  id: string,
};

export type UpdateChatMessageInput = {
  content?: ChatMessageContentInput | null,
  contextStepId?: string | null,
  createdAt?: string | null,
  gardenId?: string | null,
  id: string,
  owner?: string | null,
  responseComplete?: boolean | null,
  role?: ChatMessageRole | null,
  toolCallId?: string | null,
  toolCalls?: string | null,
  toolName?: string | null,
};

export type UpdateDummyModelToAddIamDirectiveInput = {
  id: string,
  responseStreamChunk?: ResponseStreamChunkInput | null,
};

export type UpdateGardenInput = {
  id: string,
  location?: LatLongLocationInput | null,
  name?: string | null,
  northVector?: XYInput | null,
  objective?: string | null,
  perimeterPoints?: Array< XYInput | null > | null,
  units?: GardenUnits | null,
};

export type UpdatePlantedPlantRowInput = {
  gardenId?: string | null,
  id: string,
  info?: PlantRowInput | null,
};

export type UpdateWorkStepInput = {
  date?: string | null,
  description?: string | null,
  gardenId?: string | null,
  id: string,
  owner?: string | null,
  plantRows?: Array< PlantRowInput | null > | null,
  result?: string | null,
  role?: WorkStepRole | null,
  status?: WorkStepStatus | null,
  title?: string | null,
};

export type ModelSubscriptionChatMessageFilterInput = {
  and?: Array< ModelSubscriptionChatMessageFilterInput | null > | null,
  contextStepId?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  gardenId?: ModelSubscriptionIDInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionChatMessageFilterInput | null > | null,
  owner?: ModelStringInput | null,
  responseComplete?: ModelSubscriptionBooleanInput | null,
  role?: ModelSubscriptionStringInput | null,
  toolCallId?: ModelSubscriptionStringInput | null,
  toolCalls?: ModelSubscriptionStringInput | null,
  toolName?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionStringInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  in?: Array< string | null > | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionIDInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  in?: Array< string | null > | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionBooleanInput = {
  eq?: boolean | null,
  ne?: boolean | null,
};

export type ModelSubscriptionDummyModelToAddIamDirectiveFilterInput = {
  and?: Array< ModelSubscriptionDummyModelToAddIamDirectiveFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionDummyModelToAddIamDirectiveFilterInput | null > | null,
  owner?: ModelStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionGardenFilterInput = {
  and?: Array< ModelSubscriptionGardenFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  objective?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionGardenFilterInput | null > | null,
  owner?: ModelStringInput | null,
  units?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionPlantedPlantRowFilterInput = {
  and?: Array< ModelSubscriptionPlantedPlantRowFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  gardenId?: ModelSubscriptionIDInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionPlantedPlantRowFilterInput | null > | null,
  owner?: ModelStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionWorkStepFilterInput = {
  and?: Array< ModelSubscriptionWorkStepFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  date?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  gardenId?: ModelSubscriptionIDInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionWorkStepFilterInput | null > | null,
  owner?: ModelStringInput | null,
  result?: ModelSubscriptionStringInput | null,
  role?: ModelSubscriptionStringInput | null,
  status?: ModelSubscriptionStringInput | null,
  title?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type GenerateGardenQueryVariables = {
  gardenId: string,
  userInput: string,
};

export type GenerateGardenQuery = {
  generateGarden?:  {
    __typename: "EventInvocationResponse",
    success: boolean,
  } | null,
};

export type GetChatMessageQueryVariables = {
  id: string,
};

export type GetChatMessageQuery = {
  getChatMessage?:  {
    __typename: "ChatMessage",
    content?:  {
      __typename: "ChatMessageContent",
      text?: string | null,
    } | null,
    contextStepId?: string | null,
    createdAt?: string | null,
    garden?:  {
      __typename: "Garden",
      createdAt: string,
      id: string,
      name?: string | null,
      objective?: string | null,
      owner?: string | null,
      units?: GardenUnits | null,
      updatedAt: string,
    } | null,
    gardenId?: string | null,
    id: string,
    owner?: string | null,
    responseComplete?: boolean | null,
    role?: ChatMessageRole | null,
    toolCallId?: string | null,
    toolCalls?: string | null,
    toolName?: string | null,
    updatedAt: string,
  } | null,
};

export type GetDummyModelToAddIamDirectiveQueryVariables = {
  id: string,
};

export type GetDummyModelToAddIamDirectiveQuery = {
  getDummyModelToAddIamDirective?:  {
    __typename: "DummyModelToAddIamDirective",
    createdAt: string,
    id: string,
    owner?: string | null,
    responseStreamChunk?:  {
      __typename: "ResponseStreamChunk",
      chunkText: string,
      gardenId: string,
      index: number,
    } | null,
    updatedAt: string,
  } | null,
};

export type GetGardenQueryVariables = {
  id: string,
};

export type GetGardenQuery = {
  getGarden?:  {
    __typename: "Garden",
    createdAt: string,
    id: string,
    location?:  {
      __typename: "latLongLocation",
      cityStateAndCountry: string,
      lattitude?: number | null,
      longitude?: number | null,
    } | null,
    messages?:  {
      __typename: "ModelChatMessageConnection",
      nextToken?: string | null,
    } | null,
    name?: string | null,
    northVector?:  {
      __typename: "XY",
      x: number,
      y: number,
    } | null,
    objective?: string | null,
    owner?: string | null,
    perimeterPoints?:  Array< {
      __typename: "XY",
      x: number,
      y: number,
    } | null > | null,
    plantedPlantRow?:  {
      __typename: "ModelPlantedPlantRowConnection",
      nextToken?: string | null,
    } | null,
    steps?:  {
      __typename: "ModelWorkStepConnection",
      nextToken?: string | null,
    } | null,
    units?: GardenUnits | null,
    updatedAt: string,
  } | null,
};

export type GetPlantedPlantRowQueryVariables = {
  id: string,
};

export type GetPlantedPlantRowQuery = {
  getPlantedPlantRow?:  {
    __typename: "PlantedPlantRow",
    createdAt: string,
    garden?:  {
      __typename: "Garden",
      createdAt: string,
      id: string,
      name?: string | null,
      objective?: string | null,
      owner?: string | null,
      units?: GardenUnits | null,
      updatedAt: string,
    } | null,
    gardenId?: string | null,
    id: string,
    info?:  {
      __typename: "PlantRow",
      perrenial?: boolean | null,
      plantDate?: string | null,
      rowSpacingCm?: number | null,
      species?: string | null,
      status?: PlantRowStatus | null,
      variety?: string | null,
    } | null,
    owner?: string | null,
    updatedAt: string,
  } | null,
};

export type GetWorkStepQueryVariables = {
  id: string,
};

export type GetWorkStepQuery = {
  getWorkStep?:  {
    __typename: "WorkStep",
    createdAt: string,
    date?: string | null,
    description?: string | null,
    garden?:  {
      __typename: "Garden",
      createdAt: string,
      id: string,
      name?: string | null,
      objective?: string | null,
      owner?: string | null,
      units?: GardenUnits | null,
      updatedAt: string,
    } | null,
    gardenId?: string | null,
    id: string,
    owner?: string | null,
    plantRows?:  Array< {
      __typename: "PlantRow",
      perrenial?: boolean | null,
      plantDate?: string | null,
      rowSpacingCm?: number | null,
      species?: string | null,
      status?: PlantRowStatus | null,
      variety?: string | null,
    } | null > | null,
    result?: string | null,
    role?: WorkStepRole | null,
    status?: WorkStepStatus | null,
    title: string,
    updatedAt: string,
  } | null,
};

export type ListChatMessageByGardenIdAndCreatedAtQueryVariables = {
  createdAt?: ModelStringKeyConditionInput | null,
  filter?: ModelChatMessageFilterInput | null,
  gardenId: string,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListChatMessageByGardenIdAndCreatedAtQuery = {
  listChatMessageByGardenIdAndCreatedAt?:  {
    __typename: "ModelChatMessageConnection",
    items:  Array< {
      __typename: "ChatMessage",
      contextStepId?: string | null,
      createdAt?: string | null,
      gardenId?: string | null,
      id: string,
      owner?: string | null,
      responseComplete?: boolean | null,
      role?: ChatMessageRole | null,
      toolCallId?: string | null,
      toolCalls?: string | null,
      toolName?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListChatMessagesQueryVariables = {
  filter?: ModelChatMessageFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListChatMessagesQuery = {
  listChatMessages?:  {
    __typename: "ModelChatMessageConnection",
    items:  Array< {
      __typename: "ChatMessage",
      contextStepId?: string | null,
      createdAt?: string | null,
      gardenId?: string | null,
      id: string,
      owner?: string | null,
      responseComplete?: boolean | null,
      role?: ChatMessageRole | null,
      toolCallId?: string | null,
      toolCalls?: string | null,
      toolName?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListDummyModelToAddIamDirectivesQueryVariables = {
  filter?: ModelDummyModelToAddIamDirectiveFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListDummyModelToAddIamDirectivesQuery = {
  listDummyModelToAddIamDirectives?:  {
    __typename: "ModelDummyModelToAddIamDirectiveConnection",
    items:  Array< {
      __typename: "DummyModelToAddIamDirective",
      createdAt: string,
      id: string,
      owner?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListGardensQueryVariables = {
  filter?: ModelGardenFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListGardensQuery = {
  listGardens?:  {
    __typename: "ModelGardenConnection",
    items:  Array< {
      __typename: "Garden",
      createdAt: string,
      id: string,
      name?: string | null,
      objective?: string | null,
      owner?: string | null,
      units?: GardenUnits | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListPlantedPlantRowsQueryVariables = {
  filter?: ModelPlantedPlantRowFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPlantedPlantRowsQuery = {
  listPlantedPlantRows?:  {
    __typename: "ModelPlantedPlantRowConnection",
    items:  Array< {
      __typename: "PlantedPlantRow",
      createdAt: string,
      gardenId?: string | null,
      id: string,
      owner?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListWorkStepsQueryVariables = {
  filter?: ModelWorkStepFilterInput | null,
  id?: string | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListWorkStepsQuery = {
  listWorkSteps?:  {
    __typename: "ModelWorkStepConnection",
    items:  Array< {
      __typename: "WorkStep",
      createdAt: string,
      date?: string | null,
      description?: string | null,
      gardenId?: string | null,
      id: string,
      owner?: string | null,
      result?: string | null,
      role?: WorkStepRole | null,
      status?: WorkStepStatus | null,
      title: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type CreateChatMessageMutationVariables = {
  condition?: ModelChatMessageConditionInput | null,
  input: CreateChatMessageInput,
};

export type CreateChatMessageMutation = {
  createChatMessage?:  {
    __typename: "ChatMessage",
    content?:  {
      __typename: "ChatMessageContent",
      text?: string | null,
    } | null,
    contextStepId?: string | null,
    createdAt?: string | null,
    garden?:  {
      __typename: "Garden",
      createdAt: string,
      id: string,
      name?: string | null,
      objective?: string | null,
      owner?: string | null,
      units?: GardenUnits | null,
      updatedAt: string,
    } | null,
    gardenId?: string | null,
    id: string,
    owner?: string | null,
    responseComplete?: boolean | null,
    role?: ChatMessageRole | null,
    toolCallId?: string | null,
    toolCalls?: string | null,
    toolName?: string | null,
    updatedAt: string,
  } | null,
};

export type CreateDummyModelToAddIamDirectiveMutationVariables = {
  condition?: ModelDummyModelToAddIamDirectiveConditionInput | null,
  input: CreateDummyModelToAddIamDirectiveInput,
};

export type CreateDummyModelToAddIamDirectiveMutation = {
  createDummyModelToAddIamDirective?:  {
    __typename: "DummyModelToAddIamDirective",
    createdAt: string,
    id: string,
    owner?: string | null,
    responseStreamChunk?:  {
      __typename: "ResponseStreamChunk",
      chunkText: string,
      gardenId: string,
      index: number,
    } | null,
    updatedAt: string,
  } | null,
};

export type CreateGardenMutationVariables = {
  condition?: ModelGardenConditionInput | null,
  input: CreateGardenInput,
};

export type CreateGardenMutation = {
  createGarden?:  {
    __typename: "Garden",
    createdAt: string,
    id: string,
    location?:  {
      __typename: "latLongLocation",
      cityStateAndCountry: string,
      lattitude?: number | null,
      longitude?: number | null,
    } | null,
    messages?:  {
      __typename: "ModelChatMessageConnection",
      nextToken?: string | null,
    } | null,
    name?: string | null,
    northVector?:  {
      __typename: "XY",
      x: number,
      y: number,
    } | null,
    objective?: string | null,
    owner?: string | null,
    perimeterPoints?:  Array< {
      __typename: "XY",
      x: number,
      y: number,
    } | null > | null,
    plantedPlantRow?:  {
      __typename: "ModelPlantedPlantRowConnection",
      nextToken?: string | null,
    } | null,
    steps?:  {
      __typename: "ModelWorkStepConnection",
      nextToken?: string | null,
    } | null,
    units?: GardenUnits | null,
    updatedAt: string,
  } | null,
};

export type CreatePlantedPlantRowMutationVariables = {
  condition?: ModelPlantedPlantRowConditionInput | null,
  input: CreatePlantedPlantRowInput,
};

export type CreatePlantedPlantRowMutation = {
  createPlantedPlantRow?:  {
    __typename: "PlantedPlantRow",
    createdAt: string,
    garden?:  {
      __typename: "Garden",
      createdAt: string,
      id: string,
      name?: string | null,
      objective?: string | null,
      owner?: string | null,
      units?: GardenUnits | null,
      updatedAt: string,
    } | null,
    gardenId?: string | null,
    id: string,
    info?:  {
      __typename: "PlantRow",
      perrenial?: boolean | null,
      plantDate?: string | null,
      rowSpacingCm?: number | null,
      species?: string | null,
      status?: PlantRowStatus | null,
      variety?: string | null,
    } | null,
    owner?: string | null,
    updatedAt: string,
  } | null,
};

export type CreateWorkStepMutationVariables = {
  condition?: ModelWorkStepConditionInput | null,
  input: CreateWorkStepInput,
};

export type CreateWorkStepMutation = {
  createWorkStep?:  {
    __typename: "WorkStep",
    createdAt: string,
    date?: string | null,
    description?: string | null,
    garden?:  {
      __typename: "Garden",
      createdAt: string,
      id: string,
      name?: string | null,
      objective?: string | null,
      owner?: string | null,
      units?: GardenUnits | null,
      updatedAt: string,
    } | null,
    gardenId?: string | null,
    id: string,
    owner?: string | null,
    plantRows?:  Array< {
      __typename: "PlantRow",
      perrenial?: boolean | null,
      plantDate?: string | null,
      rowSpacingCm?: number | null,
      species?: string | null,
      status?: PlantRowStatus | null,
      variety?: string | null,
    } | null > | null,
    result?: string | null,
    role?: WorkStepRole | null,
    status?: WorkStepStatus | null,
    title: string,
    updatedAt: string,
  } | null,
};

export type DeleteChatMessageMutationVariables = {
  condition?: ModelChatMessageConditionInput | null,
  input: DeleteChatMessageInput,
};

export type DeleteChatMessageMutation = {
  deleteChatMessage?:  {
    __typename: "ChatMessage",
    content?:  {
      __typename: "ChatMessageContent",
      text?: string | null,
    } | null,
    contextStepId?: string | null,
    createdAt?: string | null,
    garden?:  {
      __typename: "Garden",
      createdAt: string,
      id: string,
      name?: string | null,
      objective?: string | null,
      owner?: string | null,
      units?: GardenUnits | null,
      updatedAt: string,
    } | null,
    gardenId?: string | null,
    id: string,
    owner?: string | null,
    responseComplete?: boolean | null,
    role?: ChatMessageRole | null,
    toolCallId?: string | null,
    toolCalls?: string | null,
    toolName?: string | null,
    updatedAt: string,
  } | null,
};

export type DeleteDummyModelToAddIamDirectiveMutationVariables = {
  condition?: ModelDummyModelToAddIamDirectiveConditionInput | null,
  input: DeleteDummyModelToAddIamDirectiveInput,
};

export type DeleteDummyModelToAddIamDirectiveMutation = {
  deleteDummyModelToAddIamDirective?:  {
    __typename: "DummyModelToAddIamDirective",
    createdAt: string,
    id: string,
    owner?: string | null,
    responseStreamChunk?:  {
      __typename: "ResponseStreamChunk",
      chunkText: string,
      gardenId: string,
      index: number,
    } | null,
    updatedAt: string,
  } | null,
};

export type DeleteGardenMutationVariables = {
  condition?: ModelGardenConditionInput | null,
  input: DeleteGardenInput,
};

export type DeleteGardenMutation = {
  deleteGarden?:  {
    __typename: "Garden",
    createdAt: string,
    id: string,
    location?:  {
      __typename: "latLongLocation",
      cityStateAndCountry: string,
      lattitude?: number | null,
      longitude?: number | null,
    } | null,
    messages?:  {
      __typename: "ModelChatMessageConnection",
      nextToken?: string | null,
    } | null,
    name?: string | null,
    northVector?:  {
      __typename: "XY",
      x: number,
      y: number,
    } | null,
    objective?: string | null,
    owner?: string | null,
    perimeterPoints?:  Array< {
      __typename: "XY",
      x: number,
      y: number,
    } | null > | null,
    plantedPlantRow?:  {
      __typename: "ModelPlantedPlantRowConnection",
      nextToken?: string | null,
    } | null,
    steps?:  {
      __typename: "ModelWorkStepConnection",
      nextToken?: string | null,
    } | null,
    units?: GardenUnits | null,
    updatedAt: string,
  } | null,
};

export type DeletePlantedPlantRowMutationVariables = {
  condition?: ModelPlantedPlantRowConditionInput | null,
  input: DeletePlantedPlantRowInput,
};

export type DeletePlantedPlantRowMutation = {
  deletePlantedPlantRow?:  {
    __typename: "PlantedPlantRow",
    createdAt: string,
    garden?:  {
      __typename: "Garden",
      createdAt: string,
      id: string,
      name?: string | null,
      objective?: string | null,
      owner?: string | null,
      units?: GardenUnits | null,
      updatedAt: string,
    } | null,
    gardenId?: string | null,
    id: string,
    info?:  {
      __typename: "PlantRow",
      perrenial?: boolean | null,
      plantDate?: string | null,
      rowSpacingCm?: number | null,
      species?: string | null,
      status?: PlantRowStatus | null,
      variety?: string | null,
    } | null,
    owner?: string | null,
    updatedAt: string,
  } | null,
};

export type DeleteWorkStepMutationVariables = {
  condition?: ModelWorkStepConditionInput | null,
  input: DeleteWorkStepInput,
};

export type DeleteWorkStepMutation = {
  deleteWorkStep?:  {
    __typename: "WorkStep",
    createdAt: string,
    date?: string | null,
    description?: string | null,
    garden?:  {
      __typename: "Garden",
      createdAt: string,
      id: string,
      name?: string | null,
      objective?: string | null,
      owner?: string | null,
      units?: GardenUnits | null,
      updatedAt: string,
    } | null,
    gardenId?: string | null,
    id: string,
    owner?: string | null,
    plantRows?:  Array< {
      __typename: "PlantRow",
      perrenial?: boolean | null,
      plantDate?: string | null,
      rowSpacingCm?: number | null,
      species?: string | null,
      status?: PlantRowStatus | null,
      variety?: string | null,
    } | null > | null,
    result?: string | null,
    role?: WorkStepRole | null,
    status?: WorkStepStatus | null,
    title: string,
    updatedAt: string,
  } | null,
};

export type PublishResponseStreamChunkMutationVariables = {
  chunkText: string,
  gardenId: string,
  index: number,
};

export type PublishResponseStreamChunkMutation = {
  publishResponseStreamChunk?:  {
    __typename: "ResponseStreamChunk",
    chunkText: string,
    gardenId: string,
    index: number,
  } | null,
};

export type UpdateChatMessageMutationVariables = {
  condition?: ModelChatMessageConditionInput | null,
  input: UpdateChatMessageInput,
};

export type UpdateChatMessageMutation = {
  updateChatMessage?:  {
    __typename: "ChatMessage",
    content?:  {
      __typename: "ChatMessageContent",
      text?: string | null,
    } | null,
    contextStepId?: string | null,
    createdAt?: string | null,
    garden?:  {
      __typename: "Garden",
      createdAt: string,
      id: string,
      name?: string | null,
      objective?: string | null,
      owner?: string | null,
      units?: GardenUnits | null,
      updatedAt: string,
    } | null,
    gardenId?: string | null,
    id: string,
    owner?: string | null,
    responseComplete?: boolean | null,
    role?: ChatMessageRole | null,
    toolCallId?: string | null,
    toolCalls?: string | null,
    toolName?: string | null,
    updatedAt: string,
  } | null,
};

export type UpdateDummyModelToAddIamDirectiveMutationVariables = {
  condition?: ModelDummyModelToAddIamDirectiveConditionInput | null,
  input: UpdateDummyModelToAddIamDirectiveInput,
};

export type UpdateDummyModelToAddIamDirectiveMutation = {
  updateDummyModelToAddIamDirective?:  {
    __typename: "DummyModelToAddIamDirective",
    createdAt: string,
    id: string,
    owner?: string | null,
    responseStreamChunk?:  {
      __typename: "ResponseStreamChunk",
      chunkText: string,
      gardenId: string,
      index: number,
    } | null,
    updatedAt: string,
  } | null,
};

export type UpdateGardenMutationVariables = {
  condition?: ModelGardenConditionInput | null,
  input: UpdateGardenInput,
};

export type UpdateGardenMutation = {
  updateGarden?:  {
    __typename: "Garden",
    createdAt: string,
    id: string,
    location?:  {
      __typename: "latLongLocation",
      cityStateAndCountry: string,
      lattitude?: number | null,
      longitude?: number | null,
    } | null,
    messages?:  {
      __typename: "ModelChatMessageConnection",
      nextToken?: string | null,
    } | null,
    name?: string | null,
    northVector?:  {
      __typename: "XY",
      x: number,
      y: number,
    } | null,
    objective?: string | null,
    owner?: string | null,
    perimeterPoints?:  Array< {
      __typename: "XY",
      x: number,
      y: number,
    } | null > | null,
    plantedPlantRow?:  {
      __typename: "ModelPlantedPlantRowConnection",
      nextToken?: string | null,
    } | null,
    steps?:  {
      __typename: "ModelWorkStepConnection",
      nextToken?: string | null,
    } | null,
    units?: GardenUnits | null,
    updatedAt: string,
  } | null,
};

export type UpdatePlantedPlantRowMutationVariables = {
  condition?: ModelPlantedPlantRowConditionInput | null,
  input: UpdatePlantedPlantRowInput,
};

export type UpdatePlantedPlantRowMutation = {
  updatePlantedPlantRow?:  {
    __typename: "PlantedPlantRow",
    createdAt: string,
    garden?:  {
      __typename: "Garden",
      createdAt: string,
      id: string,
      name?: string | null,
      objective?: string | null,
      owner?: string | null,
      units?: GardenUnits | null,
      updatedAt: string,
    } | null,
    gardenId?: string | null,
    id: string,
    info?:  {
      __typename: "PlantRow",
      perrenial?: boolean | null,
      plantDate?: string | null,
      rowSpacingCm?: number | null,
      species?: string | null,
      status?: PlantRowStatus | null,
      variety?: string | null,
    } | null,
    owner?: string | null,
    updatedAt: string,
  } | null,
};

export type UpdateWorkStepMutationVariables = {
  condition?: ModelWorkStepConditionInput | null,
  input: UpdateWorkStepInput,
};

export type UpdateWorkStepMutation = {
  updateWorkStep?:  {
    __typename: "WorkStep",
    createdAt: string,
    date?: string | null,
    description?: string | null,
    garden?:  {
      __typename: "Garden",
      createdAt: string,
      id: string,
      name?: string | null,
      objective?: string | null,
      owner?: string | null,
      units?: GardenUnits | null,
      updatedAt: string,
    } | null,
    gardenId?: string | null,
    id: string,
    owner?: string | null,
    plantRows?:  Array< {
      __typename: "PlantRow",
      perrenial?: boolean | null,
      plantDate?: string | null,
      rowSpacingCm?: number | null,
      species?: string | null,
      status?: PlantRowStatus | null,
      variety?: string | null,
    } | null > | null,
    result?: string | null,
    role?: WorkStepRole | null,
    status?: WorkStepStatus | null,
    title: string,
    updatedAt: string,
  } | null,
};

export type OnCreateChatMessageSubscriptionVariables = {
  filter?: ModelSubscriptionChatMessageFilterInput | null,
  owner?: string | null,
};

export type OnCreateChatMessageSubscription = {
  onCreateChatMessage?:  {
    __typename: "ChatMessage",
    content?:  {
      __typename: "ChatMessageContent",
      text?: string | null,
    } | null,
    contextStepId?: string | null,
    createdAt?: string | null,
    garden?:  {
      __typename: "Garden",
      createdAt: string,
      id: string,
      name?: string | null,
      objective?: string | null,
      owner?: string | null,
      units?: GardenUnits | null,
      updatedAt: string,
    } | null,
    gardenId?: string | null,
    id: string,
    owner?: string | null,
    responseComplete?: boolean | null,
    role?: ChatMessageRole | null,
    toolCallId?: string | null,
    toolCalls?: string | null,
    toolName?: string | null,
    updatedAt: string,
  } | null,
};

export type OnCreateDummyModelToAddIamDirectiveSubscriptionVariables = {
  filter?: ModelSubscriptionDummyModelToAddIamDirectiveFilterInput | null,
  owner?: string | null,
};

export type OnCreateDummyModelToAddIamDirectiveSubscription = {
  onCreateDummyModelToAddIamDirective?:  {
    __typename: "DummyModelToAddIamDirective",
    createdAt: string,
    id: string,
    owner?: string | null,
    responseStreamChunk?:  {
      __typename: "ResponseStreamChunk",
      chunkText: string,
      gardenId: string,
      index: number,
    } | null,
    updatedAt: string,
  } | null,
};

export type OnCreateGardenSubscriptionVariables = {
  filter?: ModelSubscriptionGardenFilterInput | null,
  owner?: string | null,
};

export type OnCreateGardenSubscription = {
  onCreateGarden?:  {
    __typename: "Garden",
    createdAt: string,
    id: string,
    location?:  {
      __typename: "latLongLocation",
      cityStateAndCountry: string,
      lattitude?: number | null,
      longitude?: number | null,
    } | null,
    messages?:  {
      __typename: "ModelChatMessageConnection",
      nextToken?: string | null,
    } | null,
    name?: string | null,
    northVector?:  {
      __typename: "XY",
      x: number,
      y: number,
    } | null,
    objective?: string | null,
    owner?: string | null,
    perimeterPoints?:  Array< {
      __typename: "XY",
      x: number,
      y: number,
    } | null > | null,
    plantedPlantRow?:  {
      __typename: "ModelPlantedPlantRowConnection",
      nextToken?: string | null,
    } | null,
    steps?:  {
      __typename: "ModelWorkStepConnection",
      nextToken?: string | null,
    } | null,
    units?: GardenUnits | null,
    updatedAt: string,
  } | null,
};

export type OnCreatePlantedPlantRowSubscriptionVariables = {
  filter?: ModelSubscriptionPlantedPlantRowFilterInput | null,
  owner?: string | null,
};

export type OnCreatePlantedPlantRowSubscription = {
  onCreatePlantedPlantRow?:  {
    __typename: "PlantedPlantRow",
    createdAt: string,
    garden?:  {
      __typename: "Garden",
      createdAt: string,
      id: string,
      name?: string | null,
      objective?: string | null,
      owner?: string | null,
      units?: GardenUnits | null,
      updatedAt: string,
    } | null,
    gardenId?: string | null,
    id: string,
    info?:  {
      __typename: "PlantRow",
      perrenial?: boolean | null,
      plantDate?: string | null,
      rowSpacingCm?: number | null,
      species?: string | null,
      status?: PlantRowStatus | null,
      variety?: string | null,
    } | null,
    owner?: string | null,
    updatedAt: string,
  } | null,
};

export type OnCreateWorkStepSubscriptionVariables = {
  filter?: ModelSubscriptionWorkStepFilterInput | null,
  owner?: string | null,
};

export type OnCreateWorkStepSubscription = {
  onCreateWorkStep?:  {
    __typename: "WorkStep",
    createdAt: string,
    date?: string | null,
    description?: string | null,
    garden?:  {
      __typename: "Garden",
      createdAt: string,
      id: string,
      name?: string | null,
      objective?: string | null,
      owner?: string | null,
      units?: GardenUnits | null,
      updatedAt: string,
    } | null,
    gardenId?: string | null,
    id: string,
    owner?: string | null,
    plantRows?:  Array< {
      __typename: "PlantRow",
      perrenial?: boolean | null,
      plantDate?: string | null,
      rowSpacingCm?: number | null,
      species?: string | null,
      status?: PlantRowStatus | null,
      variety?: string | null,
    } | null > | null,
    result?: string | null,
    role?: WorkStepRole | null,
    status?: WorkStepStatus | null,
    title: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteChatMessageSubscriptionVariables = {
  filter?: ModelSubscriptionChatMessageFilterInput | null,
  owner?: string | null,
};

export type OnDeleteChatMessageSubscription = {
  onDeleteChatMessage?:  {
    __typename: "ChatMessage",
    content?:  {
      __typename: "ChatMessageContent",
      text?: string | null,
    } | null,
    contextStepId?: string | null,
    createdAt?: string | null,
    garden?:  {
      __typename: "Garden",
      createdAt: string,
      id: string,
      name?: string | null,
      objective?: string | null,
      owner?: string | null,
      units?: GardenUnits | null,
      updatedAt: string,
    } | null,
    gardenId?: string | null,
    id: string,
    owner?: string | null,
    responseComplete?: boolean | null,
    role?: ChatMessageRole | null,
    toolCallId?: string | null,
    toolCalls?: string | null,
    toolName?: string | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteDummyModelToAddIamDirectiveSubscriptionVariables = {
  filter?: ModelSubscriptionDummyModelToAddIamDirectiveFilterInput | null,
  owner?: string | null,
};

export type OnDeleteDummyModelToAddIamDirectiveSubscription = {
  onDeleteDummyModelToAddIamDirective?:  {
    __typename: "DummyModelToAddIamDirective",
    createdAt: string,
    id: string,
    owner?: string | null,
    responseStreamChunk?:  {
      __typename: "ResponseStreamChunk",
      chunkText: string,
      gardenId: string,
      index: number,
    } | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteGardenSubscriptionVariables = {
  filter?: ModelSubscriptionGardenFilterInput | null,
  owner?: string | null,
};

export type OnDeleteGardenSubscription = {
  onDeleteGarden?:  {
    __typename: "Garden",
    createdAt: string,
    id: string,
    location?:  {
      __typename: "latLongLocation",
      cityStateAndCountry: string,
      lattitude?: number | null,
      longitude?: number | null,
    } | null,
    messages?:  {
      __typename: "ModelChatMessageConnection",
      nextToken?: string | null,
    } | null,
    name?: string | null,
    northVector?:  {
      __typename: "XY",
      x: number,
      y: number,
    } | null,
    objective?: string | null,
    owner?: string | null,
    perimeterPoints?:  Array< {
      __typename: "XY",
      x: number,
      y: number,
    } | null > | null,
    plantedPlantRow?:  {
      __typename: "ModelPlantedPlantRowConnection",
      nextToken?: string | null,
    } | null,
    steps?:  {
      __typename: "ModelWorkStepConnection",
      nextToken?: string | null,
    } | null,
    units?: GardenUnits | null,
    updatedAt: string,
  } | null,
};

export type OnDeletePlantedPlantRowSubscriptionVariables = {
  filter?: ModelSubscriptionPlantedPlantRowFilterInput | null,
  owner?: string | null,
};

export type OnDeletePlantedPlantRowSubscription = {
  onDeletePlantedPlantRow?:  {
    __typename: "PlantedPlantRow",
    createdAt: string,
    garden?:  {
      __typename: "Garden",
      createdAt: string,
      id: string,
      name?: string | null,
      objective?: string | null,
      owner?: string | null,
      units?: GardenUnits | null,
      updatedAt: string,
    } | null,
    gardenId?: string | null,
    id: string,
    info?:  {
      __typename: "PlantRow",
      perrenial?: boolean | null,
      plantDate?: string | null,
      rowSpacingCm?: number | null,
      species?: string | null,
      status?: PlantRowStatus | null,
      variety?: string | null,
    } | null,
    owner?: string | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteWorkStepSubscriptionVariables = {
  filter?: ModelSubscriptionWorkStepFilterInput | null,
  owner?: string | null,
};

export type OnDeleteWorkStepSubscription = {
  onDeleteWorkStep?:  {
    __typename: "WorkStep",
    createdAt: string,
    date?: string | null,
    description?: string | null,
    garden?:  {
      __typename: "Garden",
      createdAt: string,
      id: string,
      name?: string | null,
      objective?: string | null,
      owner?: string | null,
      units?: GardenUnits | null,
      updatedAt: string,
    } | null,
    gardenId?: string | null,
    id: string,
    owner?: string | null,
    plantRows?:  Array< {
      __typename: "PlantRow",
      perrenial?: boolean | null,
      plantDate?: string | null,
      rowSpacingCm?: number | null,
      species?: string | null,
      status?: PlantRowStatus | null,
      variety?: string | null,
    } | null > | null,
    result?: string | null,
    role?: WorkStepRole | null,
    status?: WorkStepStatus | null,
    title: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateChatMessageSubscriptionVariables = {
  filter?: ModelSubscriptionChatMessageFilterInput | null,
  owner?: string | null,
};

export type OnUpdateChatMessageSubscription = {
  onUpdateChatMessage?:  {
    __typename: "ChatMessage",
    content?:  {
      __typename: "ChatMessageContent",
      text?: string | null,
    } | null,
    contextStepId?: string | null,
    createdAt?: string | null,
    garden?:  {
      __typename: "Garden",
      createdAt: string,
      id: string,
      name?: string | null,
      objective?: string | null,
      owner?: string | null,
      units?: GardenUnits | null,
      updatedAt: string,
    } | null,
    gardenId?: string | null,
    id: string,
    owner?: string | null,
    responseComplete?: boolean | null,
    role?: ChatMessageRole | null,
    toolCallId?: string | null,
    toolCalls?: string | null,
    toolName?: string | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateDummyModelToAddIamDirectiveSubscriptionVariables = {
  filter?: ModelSubscriptionDummyModelToAddIamDirectiveFilterInput | null,
  owner?: string | null,
};

export type OnUpdateDummyModelToAddIamDirectiveSubscription = {
  onUpdateDummyModelToAddIamDirective?:  {
    __typename: "DummyModelToAddIamDirective",
    createdAt: string,
    id: string,
    owner?: string | null,
    responseStreamChunk?:  {
      __typename: "ResponseStreamChunk",
      chunkText: string,
      gardenId: string,
      index: number,
    } | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateGardenSubscriptionVariables = {
  filter?: ModelSubscriptionGardenFilterInput | null,
  owner?: string | null,
};

export type OnUpdateGardenSubscription = {
  onUpdateGarden?:  {
    __typename: "Garden",
    createdAt: string,
    id: string,
    location?:  {
      __typename: "latLongLocation",
      cityStateAndCountry: string,
      lattitude?: number | null,
      longitude?: number | null,
    } | null,
    messages?:  {
      __typename: "ModelChatMessageConnection",
      nextToken?: string | null,
    } | null,
    name?: string | null,
    northVector?:  {
      __typename: "XY",
      x: number,
      y: number,
    } | null,
    objective?: string | null,
    owner?: string | null,
    perimeterPoints?:  Array< {
      __typename: "XY",
      x: number,
      y: number,
    } | null > | null,
    plantedPlantRow?:  {
      __typename: "ModelPlantedPlantRowConnection",
      nextToken?: string | null,
    } | null,
    steps?:  {
      __typename: "ModelWorkStepConnection",
      nextToken?: string | null,
    } | null,
    units?: GardenUnits | null,
    updatedAt: string,
  } | null,
};

export type OnUpdatePlantedPlantRowSubscriptionVariables = {
  filter?: ModelSubscriptionPlantedPlantRowFilterInput | null,
  owner?: string | null,
};

export type OnUpdatePlantedPlantRowSubscription = {
  onUpdatePlantedPlantRow?:  {
    __typename: "PlantedPlantRow",
    createdAt: string,
    garden?:  {
      __typename: "Garden",
      createdAt: string,
      id: string,
      name?: string | null,
      objective?: string | null,
      owner?: string | null,
      units?: GardenUnits | null,
      updatedAt: string,
    } | null,
    gardenId?: string | null,
    id: string,
    info?:  {
      __typename: "PlantRow",
      perrenial?: boolean | null,
      plantDate?: string | null,
      rowSpacingCm?: number | null,
      species?: string | null,
      status?: PlantRowStatus | null,
      variety?: string | null,
    } | null,
    owner?: string | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateWorkStepSubscriptionVariables = {
  filter?: ModelSubscriptionWorkStepFilterInput | null,
  owner?: string | null,
};

export type OnUpdateWorkStepSubscription = {
  onUpdateWorkStep?:  {
    __typename: "WorkStep",
    createdAt: string,
    date?: string | null,
    description?: string | null,
    garden?:  {
      __typename: "Garden",
      createdAt: string,
      id: string,
      name?: string | null,
      objective?: string | null,
      owner?: string | null,
      units?: GardenUnits | null,
      updatedAt: string,
    } | null,
    gardenId?: string | null,
    id: string,
    owner?: string | null,
    plantRows?:  Array< {
      __typename: "PlantRow",
      perrenial?: boolean | null,
      plantDate?: string | null,
      rowSpacingCm?: number | null,
      species?: string | null,
      status?: PlantRowStatus | null,
      variety?: string | null,
    } | null > | null,
    result?: string | null,
    role?: WorkStepRole | null,
    status?: WorkStepStatus | null,
    title: string,
    updatedAt: string,
  } | null,
};

export type RecieveResponseStreamChunkSubscriptionVariables = {
  gardenId: string,
};

export type RecieveResponseStreamChunkSubscription = {
  recieveResponseStreamChunk?:  {
    __typename: "ResponseStreamChunk",
    chunkText: string,
    gardenId: string,
    index: number,
  } | null,
};
