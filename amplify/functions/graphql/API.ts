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
  proposedSteps?:  Array<Step | null > | null,
  text?: string | null,
};

export type Step = {
  __typename: "Step",
  description?: string | null,
  plantRows?:  Array<PlantRow | null > | null,
  result?: string | null,
  role?: StepRole | null,
  title: string,
};

export type PlantRow = {
  __typename: "PlantRow",
  expectedHarvest?: expectedHarvest | null,
  location?: rowLocation | null,
  plantDate?: string | null,
  plantSpacingInMeters?: number | null,
  species?: string | null,
};

export type expectedHarvest = {
  __typename: "expectedHarvest",
  amount?: number | null,
  date?: string | null,
  unit?: string | null,
};

export type rowLocation = {
  __typename: "rowLocation",
  end: XY,
  start: XY,
};

export type XY = {
  __typename: "XY",
  x: number,
  y: number,
};

export enum StepRole {
  ai = "ai",
  human = "human",
}


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
  pastSteps?: ModelPastStepConnection | null,
  perimeterPoints?:  Array<XY | null > | null,
  plannedSteps?: ModelPlannedStepConnection | null,
  plantedPlantRow?: ModelPlantedPlantRowConnection | null,
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

export type ModelPastStepConnection = {
  __typename: "ModelPastStepConnection",
  items:  Array<PastStep | null >,
  nextToken?: string | null,
};

export type PastStep = {
  __typename: "PastStep",
  completedDate?: string | null,
  createdAt: string,
  garden?: Garden | null,
  gardenId?: string | null,
  id: string,
  notes?: string | null,
  owner?: string | null,
  plantRowId?: string | null,
  plantedPlantRow?: PlantedPlantRow | null,
  step?: Step | null,
  updatedAt: string,
};

export type PlantedPlantRow = {
  __typename: "PlantedPlantRow",
  createdAt: string,
  garden?: Garden | null,
  gardenId?: string | null,
  id: string,
  info?: PlantRow | null,
  owner?: string | null,
  pastSteps?: ModelPastStepConnection | null,
  plannedSteps?: ModelPlannedStepConnection | null,
  updatedAt: string,
};

export type ModelPlannedStepConnection = {
  __typename: "ModelPlannedStepConnection",
  items:  Array<PlannedStep | null >,
  nextToken?: string | null,
};

export type PlannedStep = {
  __typename: "PlannedStep",
  createdAt: string,
  garden?: Garden | null,
  gardenId?: string | null,
  id: string,
  owner?: string | null,
  plannedDate?: string | null,
  plantRowId?: string | null,
  plantedPlantRow?: PlantedPlantRow | null,
  step?: Step | null,
  updatedAt: string,
};

export type ModelPlantedPlantRowConnection = {
  __typename: "ModelPlantedPlantRowConnection",
  items:  Array<PlantedPlantRow | null >,
  nextToken?: string | null,
};

export enum GardenUnits {
  imperial = "imperial",
  metric = "metric",
}


export enum ChatMessageRole {
  ai = "ai",
  human = "human",
  tool = "tool",
}


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

export type ModelPastStepFilterInput = {
  and?: Array< ModelPastStepFilterInput | null > | null,
  completedDate?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  gardenId?: ModelIDInput | null,
  id?: ModelIDInput | null,
  not?: ModelPastStepFilterInput | null,
  notes?: ModelStringInput | null,
  or?: Array< ModelPastStepFilterInput | null > | null,
  owner?: ModelStringInput | null,
  plantRowId?: ModelIDInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelPlannedStepFilterInput = {
  and?: Array< ModelPlannedStepFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  gardenId?: ModelIDInput | null,
  id?: ModelIDInput | null,
  not?: ModelPlannedStepFilterInput | null,
  or?: Array< ModelPlannedStepFilterInput | null > | null,
  owner?: ModelStringInput | null,
  plannedDate?: ModelStringInput | null,
  plantRowId?: ModelIDInput | null,
  updatedAt?: ModelStringInput | null,
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

export type ModelChatMessageConditionInput = {
  and?: Array< ModelChatMessageConditionInput | null > | null,
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
  proposedSteps?: Array< StepInput | null > | null,
  text?: string | null,
};

export type StepInput = {
  description?: string | null,
  plantRows?: Array< PlantRowInput | null > | null,
  result?: string | null,
  role?: StepRole | null,
  title: string,
};

export type PlantRowInput = {
  expectedHarvest?: ExpectedHarvestInput | null,
  location?: RowLocationInput | null,
  plantDate?: string | null,
  plantSpacingInMeters?: number | null,
  species?: string | null,
};

export type ExpectedHarvestInput = {
  amount?: number | null,
  date?: string | null,
  unit?: string | null,
};

export type RowLocationInput = {
  end: XYInput,
  start: XYInput,
};

export type XYInput = {
  x: number,
  y: number,
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

export type ModelPastStepConditionInput = {
  and?: Array< ModelPastStepConditionInput | null > | null,
  completedDate?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  gardenId?: ModelIDInput | null,
  not?: ModelPastStepConditionInput | null,
  notes?: ModelStringInput | null,
  or?: Array< ModelPastStepConditionInput | null > | null,
  owner?: ModelStringInput | null,
  plantRowId?: ModelIDInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreatePastStepInput = {
  completedDate?: string | null,
  gardenId?: string | null,
  id?: string | null,
  notes?: string | null,
  owner?: string | null,
  plantRowId?: string | null,
  step?: StepInput | null,
};

export type ModelPlannedStepConditionInput = {
  and?: Array< ModelPlannedStepConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  gardenId?: ModelIDInput | null,
  not?: ModelPlannedStepConditionInput | null,
  or?: Array< ModelPlannedStepConditionInput | null > | null,
  owner?: ModelStringInput | null,
  plannedDate?: ModelStringInput | null,
  plantRowId?: ModelIDInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreatePlannedStepInput = {
  gardenId?: string | null,
  id?: string | null,
  owner?: string | null,
  plannedDate?: string | null,
  plantRowId?: string | null,
  step?: StepInput | null,
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

export type DeleteChatMessageInput = {
  id: string,
};

export type DeleteGardenInput = {
  id: string,
};

export type DeletePastStepInput = {
  id: string,
};

export type DeletePlannedStepInput = {
  id: string,
};

export type DeletePlantedPlantRowInput = {
  id: string,
};

export type UpdateChatMessageInput = {
  content?: ChatMessageContentInput | null,
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

export type UpdateGardenInput = {
  id: string,
  location?: LatLongLocationInput | null,
  name?: string | null,
  northVector?: XYInput | null,
  objective?: string | null,
  perimeterPoints?: Array< XYInput | null > | null,
  units?: GardenUnits | null,
};

export type UpdatePastStepInput = {
  completedDate?: string | null,
  gardenId?: string | null,
  id: string,
  notes?: string | null,
  owner?: string | null,
  plantRowId?: string | null,
  step?: StepInput | null,
};

export type UpdatePlannedStepInput = {
  gardenId?: string | null,
  id: string,
  owner?: string | null,
  plannedDate?: string | null,
  plantRowId?: string | null,
  step?: StepInput | null,
};

export type UpdatePlantedPlantRowInput = {
  gardenId?: string | null,
  id: string,
  info?: PlantRowInput | null,
};

export type ModelSubscriptionChatMessageFilterInput = {
  and?: Array< ModelSubscriptionChatMessageFilterInput | null > | null,
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

export type ModelSubscriptionPastStepFilterInput = {
  and?: Array< ModelSubscriptionPastStepFilterInput | null > | null,
  completedDate?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  gardenId?: ModelSubscriptionIDInput | null,
  id?: ModelSubscriptionIDInput | null,
  notes?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionPastStepFilterInput | null > | null,
  owner?: ModelStringInput | null,
  plantRowId?: ModelSubscriptionIDInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionPlannedStepFilterInput = {
  and?: Array< ModelSubscriptionPlannedStepFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  gardenId?: ModelSubscriptionIDInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionPlannedStepFilterInput | null > | null,
  owner?: ModelStringInput | null,
  plannedDate?: ModelSubscriptionStringInput | null,
  plantRowId?: ModelSubscriptionIDInput | null,
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

export type GenerateGardenPlanStepsQueryVariables = {
  gardenId: string,
};

export type GenerateGardenPlanStepsQuery = {
  generateGardenPlanSteps?:  {
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
    pastSteps?:  {
      __typename: "ModelPastStepConnection",
      nextToken?: string | null,
    } | null,
    perimeterPoints?:  Array< {
      __typename: "XY",
      x: number,
      y: number,
    } | null > | null,
    plannedSteps?:  {
      __typename: "ModelPlannedStepConnection",
      nextToken?: string | null,
    } | null,
    plantedPlantRow?:  {
      __typename: "ModelPlantedPlantRowConnection",
      nextToken?: string | null,
    } | null,
    units?: GardenUnits | null,
    updatedAt: string,
  } | null,
};

export type GetPastStepQueryVariables = {
  id: string,
};

export type GetPastStepQuery = {
  getPastStep?:  {
    __typename: "PastStep",
    completedDate?: string | null,
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
    notes?: string | null,
    owner?: string | null,
    plantRowId?: string | null,
    plantedPlantRow?:  {
      __typename: "PlantedPlantRow",
      createdAt: string,
      gardenId?: string | null,
      id: string,
      owner?: string | null,
      updatedAt: string,
    } | null,
    step?:  {
      __typename: "Step",
      description?: string | null,
      result?: string | null,
      role?: StepRole | null,
      title: string,
    } | null,
    updatedAt: string,
  } | null,
};

export type GetPlannedStepQueryVariables = {
  id: string,
};

export type GetPlannedStepQuery = {
  getPlannedStep?:  {
    __typename: "PlannedStep",
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
    owner?: string | null,
    plannedDate?: string | null,
    plantRowId?: string | null,
    plantedPlantRow?:  {
      __typename: "PlantedPlantRow",
      createdAt: string,
      gardenId?: string | null,
      id: string,
      owner?: string | null,
      updatedAt: string,
    } | null,
    step?:  {
      __typename: "Step",
      description?: string | null,
      result?: string | null,
      role?: StepRole | null,
      title: string,
    } | null,
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
      plantDate?: string | null,
      plantSpacingInMeters?: number | null,
      species?: string | null,
    } | null,
    owner?: string | null,
    pastSteps?:  {
      __typename: "ModelPastStepConnection",
      nextToken?: string | null,
    } | null,
    plannedSteps?:  {
      __typename: "ModelPlannedStepConnection",
      nextToken?: string | null,
    } | null,
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

export type ListPastStepsQueryVariables = {
  filter?: ModelPastStepFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPastStepsQuery = {
  listPastSteps?:  {
    __typename: "ModelPastStepConnection",
    items:  Array< {
      __typename: "PastStep",
      completedDate?: string | null,
      createdAt: string,
      gardenId?: string | null,
      id: string,
      notes?: string | null,
      owner?: string | null,
      plantRowId?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListPlannedStepsQueryVariables = {
  filter?: ModelPlannedStepFilterInput | null,
  id?: string | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListPlannedStepsQuery = {
  listPlannedSteps?:  {
    __typename: "ModelPlannedStepConnection",
    items:  Array< {
      __typename: "PlannedStep",
      createdAt: string,
      gardenId?: string | null,
      id: string,
      owner?: string | null,
      plannedDate?: string | null,
      plantRowId?: string | null,
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
    pastSteps?:  {
      __typename: "ModelPastStepConnection",
      nextToken?: string | null,
    } | null,
    perimeterPoints?:  Array< {
      __typename: "XY",
      x: number,
      y: number,
    } | null > | null,
    plannedSteps?:  {
      __typename: "ModelPlannedStepConnection",
      nextToken?: string | null,
    } | null,
    plantedPlantRow?:  {
      __typename: "ModelPlantedPlantRowConnection",
      nextToken?: string | null,
    } | null,
    units?: GardenUnits | null,
    updatedAt: string,
  } | null,
};

export type CreatePastStepMutationVariables = {
  condition?: ModelPastStepConditionInput | null,
  input: CreatePastStepInput,
};

export type CreatePastStepMutation = {
  createPastStep?:  {
    __typename: "PastStep",
    completedDate?: string | null,
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
    notes?: string | null,
    owner?: string | null,
    plantRowId?: string | null,
    plantedPlantRow?:  {
      __typename: "PlantedPlantRow",
      createdAt: string,
      gardenId?: string | null,
      id: string,
      owner?: string | null,
      updatedAt: string,
    } | null,
    step?:  {
      __typename: "Step",
      description?: string | null,
      result?: string | null,
      role?: StepRole | null,
      title: string,
    } | null,
    updatedAt: string,
  } | null,
};

export type CreatePlannedStepMutationVariables = {
  condition?: ModelPlannedStepConditionInput | null,
  input: CreatePlannedStepInput,
};

export type CreatePlannedStepMutation = {
  createPlannedStep?:  {
    __typename: "PlannedStep",
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
    owner?: string | null,
    plannedDate?: string | null,
    plantRowId?: string | null,
    plantedPlantRow?:  {
      __typename: "PlantedPlantRow",
      createdAt: string,
      gardenId?: string | null,
      id: string,
      owner?: string | null,
      updatedAt: string,
    } | null,
    step?:  {
      __typename: "Step",
      description?: string | null,
      result?: string | null,
      role?: StepRole | null,
      title: string,
    } | null,
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
      plantDate?: string | null,
      plantSpacingInMeters?: number | null,
      species?: string | null,
    } | null,
    owner?: string | null,
    pastSteps?:  {
      __typename: "ModelPastStepConnection",
      nextToken?: string | null,
    } | null,
    plannedSteps?:  {
      __typename: "ModelPlannedStepConnection",
      nextToken?: string | null,
    } | null,
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
    pastSteps?:  {
      __typename: "ModelPastStepConnection",
      nextToken?: string | null,
    } | null,
    perimeterPoints?:  Array< {
      __typename: "XY",
      x: number,
      y: number,
    } | null > | null,
    plannedSteps?:  {
      __typename: "ModelPlannedStepConnection",
      nextToken?: string | null,
    } | null,
    plantedPlantRow?:  {
      __typename: "ModelPlantedPlantRowConnection",
      nextToken?: string | null,
    } | null,
    units?: GardenUnits | null,
    updatedAt: string,
  } | null,
};

export type DeletePastStepMutationVariables = {
  condition?: ModelPastStepConditionInput | null,
  input: DeletePastStepInput,
};

export type DeletePastStepMutation = {
  deletePastStep?:  {
    __typename: "PastStep",
    completedDate?: string | null,
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
    notes?: string | null,
    owner?: string | null,
    plantRowId?: string | null,
    plantedPlantRow?:  {
      __typename: "PlantedPlantRow",
      createdAt: string,
      gardenId?: string | null,
      id: string,
      owner?: string | null,
      updatedAt: string,
    } | null,
    step?:  {
      __typename: "Step",
      description?: string | null,
      result?: string | null,
      role?: StepRole | null,
      title: string,
    } | null,
    updatedAt: string,
  } | null,
};

export type DeletePlannedStepMutationVariables = {
  condition?: ModelPlannedStepConditionInput | null,
  input: DeletePlannedStepInput,
};

export type DeletePlannedStepMutation = {
  deletePlannedStep?:  {
    __typename: "PlannedStep",
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
    owner?: string | null,
    plannedDate?: string | null,
    plantRowId?: string | null,
    plantedPlantRow?:  {
      __typename: "PlantedPlantRow",
      createdAt: string,
      gardenId?: string | null,
      id: string,
      owner?: string | null,
      updatedAt: string,
    } | null,
    step?:  {
      __typename: "Step",
      description?: string | null,
      result?: string | null,
      role?: StepRole | null,
      title: string,
    } | null,
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
      plantDate?: string | null,
      plantSpacingInMeters?: number | null,
      species?: string | null,
    } | null,
    owner?: string | null,
    pastSteps?:  {
      __typename: "ModelPastStepConnection",
      nextToken?: string | null,
    } | null,
    plannedSteps?:  {
      __typename: "ModelPlannedStepConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
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
    pastSteps?:  {
      __typename: "ModelPastStepConnection",
      nextToken?: string | null,
    } | null,
    perimeterPoints?:  Array< {
      __typename: "XY",
      x: number,
      y: number,
    } | null > | null,
    plannedSteps?:  {
      __typename: "ModelPlannedStepConnection",
      nextToken?: string | null,
    } | null,
    plantedPlantRow?:  {
      __typename: "ModelPlantedPlantRowConnection",
      nextToken?: string | null,
    } | null,
    units?: GardenUnits | null,
    updatedAt: string,
  } | null,
};

export type UpdatePastStepMutationVariables = {
  condition?: ModelPastStepConditionInput | null,
  input: UpdatePastStepInput,
};

export type UpdatePastStepMutation = {
  updatePastStep?:  {
    __typename: "PastStep",
    completedDate?: string | null,
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
    notes?: string | null,
    owner?: string | null,
    plantRowId?: string | null,
    plantedPlantRow?:  {
      __typename: "PlantedPlantRow",
      createdAt: string,
      gardenId?: string | null,
      id: string,
      owner?: string | null,
      updatedAt: string,
    } | null,
    step?:  {
      __typename: "Step",
      description?: string | null,
      result?: string | null,
      role?: StepRole | null,
      title: string,
    } | null,
    updatedAt: string,
  } | null,
};

export type UpdatePlannedStepMutationVariables = {
  condition?: ModelPlannedStepConditionInput | null,
  input: UpdatePlannedStepInput,
};

export type UpdatePlannedStepMutation = {
  updatePlannedStep?:  {
    __typename: "PlannedStep",
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
    owner?: string | null,
    plannedDate?: string | null,
    plantRowId?: string | null,
    plantedPlantRow?:  {
      __typename: "PlantedPlantRow",
      createdAt: string,
      gardenId?: string | null,
      id: string,
      owner?: string | null,
      updatedAt: string,
    } | null,
    step?:  {
      __typename: "Step",
      description?: string | null,
      result?: string | null,
      role?: StepRole | null,
      title: string,
    } | null,
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
      plantDate?: string | null,
      plantSpacingInMeters?: number | null,
      species?: string | null,
    } | null,
    owner?: string | null,
    pastSteps?:  {
      __typename: "ModelPastStepConnection",
      nextToken?: string | null,
    } | null,
    plannedSteps?:  {
      __typename: "ModelPlannedStepConnection",
      nextToken?: string | null,
    } | null,
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
    pastSteps?:  {
      __typename: "ModelPastStepConnection",
      nextToken?: string | null,
    } | null,
    perimeterPoints?:  Array< {
      __typename: "XY",
      x: number,
      y: number,
    } | null > | null,
    plannedSteps?:  {
      __typename: "ModelPlannedStepConnection",
      nextToken?: string | null,
    } | null,
    plantedPlantRow?:  {
      __typename: "ModelPlantedPlantRowConnection",
      nextToken?: string | null,
    } | null,
    units?: GardenUnits | null,
    updatedAt: string,
  } | null,
};

export type OnCreatePastStepSubscriptionVariables = {
  filter?: ModelSubscriptionPastStepFilterInput | null,
  owner?: string | null,
};

export type OnCreatePastStepSubscription = {
  onCreatePastStep?:  {
    __typename: "PastStep",
    completedDate?: string | null,
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
    notes?: string | null,
    owner?: string | null,
    plantRowId?: string | null,
    plantedPlantRow?:  {
      __typename: "PlantedPlantRow",
      createdAt: string,
      gardenId?: string | null,
      id: string,
      owner?: string | null,
      updatedAt: string,
    } | null,
    step?:  {
      __typename: "Step",
      description?: string | null,
      result?: string | null,
      role?: StepRole | null,
      title: string,
    } | null,
    updatedAt: string,
  } | null,
};

export type OnCreatePlannedStepSubscriptionVariables = {
  filter?: ModelSubscriptionPlannedStepFilterInput | null,
  owner?: string | null,
};

export type OnCreatePlannedStepSubscription = {
  onCreatePlannedStep?:  {
    __typename: "PlannedStep",
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
    owner?: string | null,
    plannedDate?: string | null,
    plantRowId?: string | null,
    plantedPlantRow?:  {
      __typename: "PlantedPlantRow",
      createdAt: string,
      gardenId?: string | null,
      id: string,
      owner?: string | null,
      updatedAt: string,
    } | null,
    step?:  {
      __typename: "Step",
      description?: string | null,
      result?: string | null,
      role?: StepRole | null,
      title: string,
    } | null,
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
      plantDate?: string | null,
      plantSpacingInMeters?: number | null,
      species?: string | null,
    } | null,
    owner?: string | null,
    pastSteps?:  {
      __typename: "ModelPastStepConnection",
      nextToken?: string | null,
    } | null,
    plannedSteps?:  {
      __typename: "ModelPlannedStepConnection",
      nextToken?: string | null,
    } | null,
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
    pastSteps?:  {
      __typename: "ModelPastStepConnection",
      nextToken?: string | null,
    } | null,
    perimeterPoints?:  Array< {
      __typename: "XY",
      x: number,
      y: number,
    } | null > | null,
    plannedSteps?:  {
      __typename: "ModelPlannedStepConnection",
      nextToken?: string | null,
    } | null,
    plantedPlantRow?:  {
      __typename: "ModelPlantedPlantRowConnection",
      nextToken?: string | null,
    } | null,
    units?: GardenUnits | null,
    updatedAt: string,
  } | null,
};

export type OnDeletePastStepSubscriptionVariables = {
  filter?: ModelSubscriptionPastStepFilterInput | null,
  owner?: string | null,
};

export type OnDeletePastStepSubscription = {
  onDeletePastStep?:  {
    __typename: "PastStep",
    completedDate?: string | null,
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
    notes?: string | null,
    owner?: string | null,
    plantRowId?: string | null,
    plantedPlantRow?:  {
      __typename: "PlantedPlantRow",
      createdAt: string,
      gardenId?: string | null,
      id: string,
      owner?: string | null,
      updatedAt: string,
    } | null,
    step?:  {
      __typename: "Step",
      description?: string | null,
      result?: string | null,
      role?: StepRole | null,
      title: string,
    } | null,
    updatedAt: string,
  } | null,
};

export type OnDeletePlannedStepSubscriptionVariables = {
  filter?: ModelSubscriptionPlannedStepFilterInput | null,
  owner?: string | null,
};

export type OnDeletePlannedStepSubscription = {
  onDeletePlannedStep?:  {
    __typename: "PlannedStep",
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
    owner?: string | null,
    plannedDate?: string | null,
    plantRowId?: string | null,
    plantedPlantRow?:  {
      __typename: "PlantedPlantRow",
      createdAt: string,
      gardenId?: string | null,
      id: string,
      owner?: string | null,
      updatedAt: string,
    } | null,
    step?:  {
      __typename: "Step",
      description?: string | null,
      result?: string | null,
      role?: StepRole | null,
      title: string,
    } | null,
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
      plantDate?: string | null,
      plantSpacingInMeters?: number | null,
      species?: string | null,
    } | null,
    owner?: string | null,
    pastSteps?:  {
      __typename: "ModelPastStepConnection",
      nextToken?: string | null,
    } | null,
    plannedSteps?:  {
      __typename: "ModelPlannedStepConnection",
      nextToken?: string | null,
    } | null,
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
    pastSteps?:  {
      __typename: "ModelPastStepConnection",
      nextToken?: string | null,
    } | null,
    perimeterPoints?:  Array< {
      __typename: "XY",
      x: number,
      y: number,
    } | null > | null,
    plannedSteps?:  {
      __typename: "ModelPlannedStepConnection",
      nextToken?: string | null,
    } | null,
    plantedPlantRow?:  {
      __typename: "ModelPlantedPlantRowConnection",
      nextToken?: string | null,
    } | null,
    units?: GardenUnits | null,
    updatedAt: string,
  } | null,
};

export type OnUpdatePastStepSubscriptionVariables = {
  filter?: ModelSubscriptionPastStepFilterInput | null,
  owner?: string | null,
};

export type OnUpdatePastStepSubscription = {
  onUpdatePastStep?:  {
    __typename: "PastStep",
    completedDate?: string | null,
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
    notes?: string | null,
    owner?: string | null,
    plantRowId?: string | null,
    plantedPlantRow?:  {
      __typename: "PlantedPlantRow",
      createdAt: string,
      gardenId?: string | null,
      id: string,
      owner?: string | null,
      updatedAt: string,
    } | null,
    step?:  {
      __typename: "Step",
      description?: string | null,
      result?: string | null,
      role?: StepRole | null,
      title: string,
    } | null,
    updatedAt: string,
  } | null,
};

export type OnUpdatePlannedStepSubscriptionVariables = {
  filter?: ModelSubscriptionPlannedStepFilterInput | null,
  owner?: string | null,
};

export type OnUpdatePlannedStepSubscription = {
  onUpdatePlannedStep?:  {
    __typename: "PlannedStep",
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
    owner?: string | null,
    plannedDate?: string | null,
    plantRowId?: string | null,
    plantedPlantRow?:  {
      __typename: "PlantedPlantRow",
      createdAt: string,
      gardenId?: string | null,
      id: string,
      owner?: string | null,
      updatedAt: string,
    } | null,
    step?:  {
      __typename: "Step",
      description?: string | null,
      result?: string | null,
      role?: StepRole | null,
      title: string,
    } | null,
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
      plantDate?: string | null,
      plantSpacingInMeters?: number | null,
      species?: string | null,
    } | null,
    owner?: string | null,
    pastSteps?:  {
      __typename: "ModelPastStepConnection",
      nextToken?: string | null,
    } | null,
    plannedSteps?:  {
      __typename: "ModelPlannedStepConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};
