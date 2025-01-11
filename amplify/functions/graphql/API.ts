/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type Step = {
  __typename: "Step",
  description?: string | null,
  result?: string | null,
  role?: StepRole | null,
  title?: string | null,
};

export enum StepRole {
  ai = "ai",
  human = "human",
}


export type Garden = {
  __typename: "Garden",
  createdAt: string,
  id: string,
  name?: string | null,
  objective?: string | null,
  owner?: string | null,
  pastSteps?: ModelPastStepConnection | null,
  perimeterPoints?:  Array<XY | null > | null,
  plannedSteps?: ModelPlannedStepConnection | null,
  plantRows?: ModelPlantRowConnection | null,
  updatedAt: string,
  zipCode?: string | null,
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
  plantRow?: PlantRow | null,
  plantRowId?: string | null,
  step?: Step | null,
  updatedAt: string,
};

export type PlantRow = {
  __typename: "PlantRow",
  createdAt: string,
  garden?: Garden | null,
  gardenId?: string | null,
  id: string,
  location?: PlantRowLocation | null,
  owner?: string | null,
  pastSteps?: ModelPastStepConnection | null,
  plannedSteps?: ModelPlannedStepConnection | null,
  plantSpacing?: number | null,
  species?: string | null,
  updatedAt: string,
};

export type PlantRowLocation = {
  __typename: "PlantRowLocation",
  end?: XY | null,
  start?: XY | null,
};

export type XY = {
  __typename: "XY",
  x?: number | null,
  y?: number | null,
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
  plantRow?: PlantRow | null,
  plantRowId?: string | null,
  step?: Step | null,
  updatedAt: string,
};

export type ModelPlantRowConnection = {
  __typename: "ModelPlantRowConnection",
  items:  Array<PlantRow | null >,
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
  updatedAt?: ModelStringInput | null,
  zipCode?: ModelStringInput | null,
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

export type ModelPlantRowFilterInput = {
  and?: Array< ModelPlantRowFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  gardenId?: ModelIDInput | null,
  id?: ModelIDInput | null,
  not?: ModelPlantRowFilterInput | null,
  or?: Array< ModelPlantRowFilterInput | null > | null,
  owner?: ModelStringInput | null,
  plantSpacing?: ModelFloatInput | null,
  species?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelFloatInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
};

export type ModelGardenConditionInput = {
  and?: Array< ModelGardenConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  name?: ModelStringInput | null,
  not?: ModelGardenConditionInput | null,
  objective?: ModelStringInput | null,
  or?: Array< ModelGardenConditionInput | null > | null,
  owner?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  zipCode?: ModelStringInput | null,
};

export type CreateGardenInput = {
  id?: string | null,
  name?: string | null,
  objective?: string | null,
  perimeterPoints?: Array< XYInput | null > | null,
  zipCode?: string | null,
};

export type XYInput = {
  x?: number | null,
  y?: number | null,
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
  plantRowId?: string | null,
  step?: StepInput | null,
};

export type StepInput = {
  description?: string | null,
  result?: string | null,
  role?: StepRole | null,
  title?: string | null,
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
  plannedDate?: string | null,
  plantRowId?: string | null,
  step?: StepInput | null,
};

export type ModelPlantRowConditionInput = {
  and?: Array< ModelPlantRowConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  gardenId?: ModelIDInput | null,
  not?: ModelPlantRowConditionInput | null,
  or?: Array< ModelPlantRowConditionInput | null > | null,
  owner?: ModelStringInput | null,
  plantSpacing?: ModelFloatInput | null,
  species?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreatePlantRowInput = {
  gardenId?: string | null,
  id?: string | null,
  location?: PlantRowLocationInput | null,
  plantSpacing?: number | null,
  species?: string | null,
};

export type PlantRowLocationInput = {
  end?: XYInput | null,
  start?: XYInput | null,
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

export type DeletePlantRowInput = {
  id: string,
};

export type UpdateGardenInput = {
  id: string,
  name?: string | null,
  objective?: string | null,
  perimeterPoints?: Array< XYInput | null > | null,
  zipCode?: string | null,
};

export type UpdatePastStepInput = {
  completedDate?: string | null,
  gardenId?: string | null,
  id: string,
  notes?: string | null,
  plantRowId?: string | null,
  step?: StepInput | null,
};

export type UpdatePlannedStepInput = {
  gardenId?: string | null,
  id: string,
  plannedDate?: string | null,
  plantRowId?: string | null,
  step?: StepInput | null,
};

export type UpdatePlantRowInput = {
  gardenId?: string | null,
  id: string,
  location?: PlantRowLocationInput | null,
  plantSpacing?: number | null,
  species?: string | null,
};

export type ModelSubscriptionGardenFilterInput = {
  and?: Array< ModelSubscriptionGardenFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  objective?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionGardenFilterInput | null > | null,
  owner?: ModelStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  zipCode?: ModelSubscriptionStringInput | null,
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

export type ModelSubscriptionPlantRowFilterInput = {
  and?: Array< ModelSubscriptionPlantRowFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  gardenId?: ModelSubscriptionIDInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionPlantRowFilterInput | null > | null,
  owner?: ModelStringInput | null,
  plantSpacing?: ModelSubscriptionFloatInput | null,
  species?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionFloatInput = {
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  in?: Array< number | null > | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
  notIn?: Array< number | null > | null,
};

export type GenerateGardenPlanStepsQueryVariables = {
  gardenId?: string | null,
};

export type GenerateGardenPlanStepsQuery = {
  generateGardenPlanSteps?:  Array< {
    __typename: "Step",
    description?: string | null,
    result?: string | null,
    role?: StepRole | null,
    title?: string | null,
  } | null > | null,
};

export type GetGardenQueryVariables = {
  id: string,
};

export type GetGardenQuery = {
  getGarden?:  {
    __typename: "Garden",
    createdAt: string,
    id: string,
    name?: string | null,
    objective?: string | null,
    owner?: string | null,
    pastSteps?:  {
      __typename: "ModelPastStepConnection",
      nextToken?: string | null,
    } | null,
    perimeterPoints?:  Array< {
      __typename: "XY",
      x?: number | null,
      y?: number | null,
    } | null > | null,
    plannedSteps?:  {
      __typename: "ModelPlannedStepConnection",
      nextToken?: string | null,
    } | null,
    plantRows?:  {
      __typename: "ModelPlantRowConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
    zipCode?: string | null,
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
      updatedAt: string,
      zipCode?: string | null,
    } | null,
    gardenId?: string | null,
    id: string,
    notes?: string | null,
    owner?: string | null,
    plantRow?:  {
      __typename: "PlantRow",
      createdAt: string,
      gardenId?: string | null,
      id: string,
      owner?: string | null,
      plantSpacing?: number | null,
      species?: string | null,
      updatedAt: string,
    } | null,
    plantRowId?: string | null,
    step?:  {
      __typename: "Step",
      description?: string | null,
      result?: string | null,
      role?: StepRole | null,
      title?: string | null,
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
      updatedAt: string,
      zipCode?: string | null,
    } | null,
    gardenId?: string | null,
    id: string,
    owner?: string | null,
    plannedDate?: string | null,
    plantRow?:  {
      __typename: "PlantRow",
      createdAt: string,
      gardenId?: string | null,
      id: string,
      owner?: string | null,
      plantSpacing?: number | null,
      species?: string | null,
      updatedAt: string,
    } | null,
    plantRowId?: string | null,
    step?:  {
      __typename: "Step",
      description?: string | null,
      result?: string | null,
      role?: StepRole | null,
      title?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type GetPlantRowQueryVariables = {
  id: string,
};

export type GetPlantRowQuery = {
  getPlantRow?:  {
    __typename: "PlantRow",
    createdAt: string,
    garden?:  {
      __typename: "Garden",
      createdAt: string,
      id: string,
      name?: string | null,
      objective?: string | null,
      owner?: string | null,
      updatedAt: string,
      zipCode?: string | null,
    } | null,
    gardenId?: string | null,
    id: string,
    location?:  {
      __typename: "PlantRowLocation",
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
    plantSpacing?: number | null,
    species?: string | null,
    updatedAt: string,
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
      updatedAt: string,
      zipCode?: string | null,
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
  limit?: number | null,
  nextToken?: string | null,
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

export type ListPlantRowsQueryVariables = {
  filter?: ModelPlantRowFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPlantRowsQuery = {
  listPlantRows?:  {
    __typename: "ModelPlantRowConnection",
    items:  Array< {
      __typename: "PlantRow",
      createdAt: string,
      gardenId?: string | null,
      id: string,
      owner?: string | null,
      plantSpacing?: number | null,
      species?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
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
    name?: string | null,
    objective?: string | null,
    owner?: string | null,
    pastSteps?:  {
      __typename: "ModelPastStepConnection",
      nextToken?: string | null,
    } | null,
    perimeterPoints?:  Array< {
      __typename: "XY",
      x?: number | null,
      y?: number | null,
    } | null > | null,
    plannedSteps?:  {
      __typename: "ModelPlannedStepConnection",
      nextToken?: string | null,
    } | null,
    plantRows?:  {
      __typename: "ModelPlantRowConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
    zipCode?: string | null,
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
      updatedAt: string,
      zipCode?: string | null,
    } | null,
    gardenId?: string | null,
    id: string,
    notes?: string | null,
    owner?: string | null,
    plantRow?:  {
      __typename: "PlantRow",
      createdAt: string,
      gardenId?: string | null,
      id: string,
      owner?: string | null,
      plantSpacing?: number | null,
      species?: string | null,
      updatedAt: string,
    } | null,
    plantRowId?: string | null,
    step?:  {
      __typename: "Step",
      description?: string | null,
      result?: string | null,
      role?: StepRole | null,
      title?: string | null,
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
      updatedAt: string,
      zipCode?: string | null,
    } | null,
    gardenId?: string | null,
    id: string,
    owner?: string | null,
    plannedDate?: string | null,
    plantRow?:  {
      __typename: "PlantRow",
      createdAt: string,
      gardenId?: string | null,
      id: string,
      owner?: string | null,
      plantSpacing?: number | null,
      species?: string | null,
      updatedAt: string,
    } | null,
    plantRowId?: string | null,
    step?:  {
      __typename: "Step",
      description?: string | null,
      result?: string | null,
      role?: StepRole | null,
      title?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type CreatePlantRowMutationVariables = {
  condition?: ModelPlantRowConditionInput | null,
  input: CreatePlantRowInput,
};

export type CreatePlantRowMutation = {
  createPlantRow?:  {
    __typename: "PlantRow",
    createdAt: string,
    garden?:  {
      __typename: "Garden",
      createdAt: string,
      id: string,
      name?: string | null,
      objective?: string | null,
      owner?: string | null,
      updatedAt: string,
      zipCode?: string | null,
    } | null,
    gardenId?: string | null,
    id: string,
    location?:  {
      __typename: "PlantRowLocation",
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
    plantSpacing?: number | null,
    species?: string | null,
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
    name?: string | null,
    objective?: string | null,
    owner?: string | null,
    pastSteps?:  {
      __typename: "ModelPastStepConnection",
      nextToken?: string | null,
    } | null,
    perimeterPoints?:  Array< {
      __typename: "XY",
      x?: number | null,
      y?: number | null,
    } | null > | null,
    plannedSteps?:  {
      __typename: "ModelPlannedStepConnection",
      nextToken?: string | null,
    } | null,
    plantRows?:  {
      __typename: "ModelPlantRowConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
    zipCode?: string | null,
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
      updatedAt: string,
      zipCode?: string | null,
    } | null,
    gardenId?: string | null,
    id: string,
    notes?: string | null,
    owner?: string | null,
    plantRow?:  {
      __typename: "PlantRow",
      createdAt: string,
      gardenId?: string | null,
      id: string,
      owner?: string | null,
      plantSpacing?: number | null,
      species?: string | null,
      updatedAt: string,
    } | null,
    plantRowId?: string | null,
    step?:  {
      __typename: "Step",
      description?: string | null,
      result?: string | null,
      role?: StepRole | null,
      title?: string | null,
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
      updatedAt: string,
      zipCode?: string | null,
    } | null,
    gardenId?: string | null,
    id: string,
    owner?: string | null,
    plannedDate?: string | null,
    plantRow?:  {
      __typename: "PlantRow",
      createdAt: string,
      gardenId?: string | null,
      id: string,
      owner?: string | null,
      plantSpacing?: number | null,
      species?: string | null,
      updatedAt: string,
    } | null,
    plantRowId?: string | null,
    step?:  {
      __typename: "Step",
      description?: string | null,
      result?: string | null,
      role?: StepRole | null,
      title?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type DeletePlantRowMutationVariables = {
  condition?: ModelPlantRowConditionInput | null,
  input: DeletePlantRowInput,
};

export type DeletePlantRowMutation = {
  deletePlantRow?:  {
    __typename: "PlantRow",
    createdAt: string,
    garden?:  {
      __typename: "Garden",
      createdAt: string,
      id: string,
      name?: string | null,
      objective?: string | null,
      owner?: string | null,
      updatedAt: string,
      zipCode?: string | null,
    } | null,
    gardenId?: string | null,
    id: string,
    location?:  {
      __typename: "PlantRowLocation",
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
    plantSpacing?: number | null,
    species?: string | null,
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
    name?: string | null,
    objective?: string | null,
    owner?: string | null,
    pastSteps?:  {
      __typename: "ModelPastStepConnection",
      nextToken?: string | null,
    } | null,
    perimeterPoints?:  Array< {
      __typename: "XY",
      x?: number | null,
      y?: number | null,
    } | null > | null,
    plannedSteps?:  {
      __typename: "ModelPlannedStepConnection",
      nextToken?: string | null,
    } | null,
    plantRows?:  {
      __typename: "ModelPlantRowConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
    zipCode?: string | null,
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
      updatedAt: string,
      zipCode?: string | null,
    } | null,
    gardenId?: string | null,
    id: string,
    notes?: string | null,
    owner?: string | null,
    plantRow?:  {
      __typename: "PlantRow",
      createdAt: string,
      gardenId?: string | null,
      id: string,
      owner?: string | null,
      plantSpacing?: number | null,
      species?: string | null,
      updatedAt: string,
    } | null,
    plantRowId?: string | null,
    step?:  {
      __typename: "Step",
      description?: string | null,
      result?: string | null,
      role?: StepRole | null,
      title?: string | null,
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
      updatedAt: string,
      zipCode?: string | null,
    } | null,
    gardenId?: string | null,
    id: string,
    owner?: string | null,
    plannedDate?: string | null,
    plantRow?:  {
      __typename: "PlantRow",
      createdAt: string,
      gardenId?: string | null,
      id: string,
      owner?: string | null,
      plantSpacing?: number | null,
      species?: string | null,
      updatedAt: string,
    } | null,
    plantRowId?: string | null,
    step?:  {
      __typename: "Step",
      description?: string | null,
      result?: string | null,
      role?: StepRole | null,
      title?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type UpdatePlantRowMutationVariables = {
  condition?: ModelPlantRowConditionInput | null,
  input: UpdatePlantRowInput,
};

export type UpdatePlantRowMutation = {
  updatePlantRow?:  {
    __typename: "PlantRow",
    createdAt: string,
    garden?:  {
      __typename: "Garden",
      createdAt: string,
      id: string,
      name?: string | null,
      objective?: string | null,
      owner?: string | null,
      updatedAt: string,
      zipCode?: string | null,
    } | null,
    gardenId?: string | null,
    id: string,
    location?:  {
      __typename: "PlantRowLocation",
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
    plantSpacing?: number | null,
    species?: string | null,
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
    name?: string | null,
    objective?: string | null,
    owner?: string | null,
    pastSteps?:  {
      __typename: "ModelPastStepConnection",
      nextToken?: string | null,
    } | null,
    perimeterPoints?:  Array< {
      __typename: "XY",
      x?: number | null,
      y?: number | null,
    } | null > | null,
    plannedSteps?:  {
      __typename: "ModelPlannedStepConnection",
      nextToken?: string | null,
    } | null,
    plantRows?:  {
      __typename: "ModelPlantRowConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
    zipCode?: string | null,
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
      updatedAt: string,
      zipCode?: string | null,
    } | null,
    gardenId?: string | null,
    id: string,
    notes?: string | null,
    owner?: string | null,
    plantRow?:  {
      __typename: "PlantRow",
      createdAt: string,
      gardenId?: string | null,
      id: string,
      owner?: string | null,
      plantSpacing?: number | null,
      species?: string | null,
      updatedAt: string,
    } | null,
    plantRowId?: string | null,
    step?:  {
      __typename: "Step",
      description?: string | null,
      result?: string | null,
      role?: StepRole | null,
      title?: string | null,
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
      updatedAt: string,
      zipCode?: string | null,
    } | null,
    gardenId?: string | null,
    id: string,
    owner?: string | null,
    plannedDate?: string | null,
    plantRow?:  {
      __typename: "PlantRow",
      createdAt: string,
      gardenId?: string | null,
      id: string,
      owner?: string | null,
      plantSpacing?: number | null,
      species?: string | null,
      updatedAt: string,
    } | null,
    plantRowId?: string | null,
    step?:  {
      __typename: "Step",
      description?: string | null,
      result?: string | null,
      role?: StepRole | null,
      title?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type OnCreatePlantRowSubscriptionVariables = {
  filter?: ModelSubscriptionPlantRowFilterInput | null,
  owner?: string | null,
};

export type OnCreatePlantRowSubscription = {
  onCreatePlantRow?:  {
    __typename: "PlantRow",
    createdAt: string,
    garden?:  {
      __typename: "Garden",
      createdAt: string,
      id: string,
      name?: string | null,
      objective?: string | null,
      owner?: string | null,
      updatedAt: string,
      zipCode?: string | null,
    } | null,
    gardenId?: string | null,
    id: string,
    location?:  {
      __typename: "PlantRowLocation",
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
    plantSpacing?: number | null,
    species?: string | null,
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
    name?: string | null,
    objective?: string | null,
    owner?: string | null,
    pastSteps?:  {
      __typename: "ModelPastStepConnection",
      nextToken?: string | null,
    } | null,
    perimeterPoints?:  Array< {
      __typename: "XY",
      x?: number | null,
      y?: number | null,
    } | null > | null,
    plannedSteps?:  {
      __typename: "ModelPlannedStepConnection",
      nextToken?: string | null,
    } | null,
    plantRows?:  {
      __typename: "ModelPlantRowConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
    zipCode?: string | null,
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
      updatedAt: string,
      zipCode?: string | null,
    } | null,
    gardenId?: string | null,
    id: string,
    notes?: string | null,
    owner?: string | null,
    plantRow?:  {
      __typename: "PlantRow",
      createdAt: string,
      gardenId?: string | null,
      id: string,
      owner?: string | null,
      plantSpacing?: number | null,
      species?: string | null,
      updatedAt: string,
    } | null,
    plantRowId?: string | null,
    step?:  {
      __typename: "Step",
      description?: string | null,
      result?: string | null,
      role?: StepRole | null,
      title?: string | null,
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
      updatedAt: string,
      zipCode?: string | null,
    } | null,
    gardenId?: string | null,
    id: string,
    owner?: string | null,
    plannedDate?: string | null,
    plantRow?:  {
      __typename: "PlantRow",
      createdAt: string,
      gardenId?: string | null,
      id: string,
      owner?: string | null,
      plantSpacing?: number | null,
      species?: string | null,
      updatedAt: string,
    } | null,
    plantRowId?: string | null,
    step?:  {
      __typename: "Step",
      description?: string | null,
      result?: string | null,
      role?: StepRole | null,
      title?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type OnDeletePlantRowSubscriptionVariables = {
  filter?: ModelSubscriptionPlantRowFilterInput | null,
  owner?: string | null,
};

export type OnDeletePlantRowSubscription = {
  onDeletePlantRow?:  {
    __typename: "PlantRow",
    createdAt: string,
    garden?:  {
      __typename: "Garden",
      createdAt: string,
      id: string,
      name?: string | null,
      objective?: string | null,
      owner?: string | null,
      updatedAt: string,
      zipCode?: string | null,
    } | null,
    gardenId?: string | null,
    id: string,
    location?:  {
      __typename: "PlantRowLocation",
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
    plantSpacing?: number | null,
    species?: string | null,
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
    name?: string | null,
    objective?: string | null,
    owner?: string | null,
    pastSteps?:  {
      __typename: "ModelPastStepConnection",
      nextToken?: string | null,
    } | null,
    perimeterPoints?:  Array< {
      __typename: "XY",
      x?: number | null,
      y?: number | null,
    } | null > | null,
    plannedSteps?:  {
      __typename: "ModelPlannedStepConnection",
      nextToken?: string | null,
    } | null,
    plantRows?:  {
      __typename: "ModelPlantRowConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
    zipCode?: string | null,
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
      updatedAt: string,
      zipCode?: string | null,
    } | null,
    gardenId?: string | null,
    id: string,
    notes?: string | null,
    owner?: string | null,
    plantRow?:  {
      __typename: "PlantRow",
      createdAt: string,
      gardenId?: string | null,
      id: string,
      owner?: string | null,
      plantSpacing?: number | null,
      species?: string | null,
      updatedAt: string,
    } | null,
    plantRowId?: string | null,
    step?:  {
      __typename: "Step",
      description?: string | null,
      result?: string | null,
      role?: StepRole | null,
      title?: string | null,
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
      updatedAt: string,
      zipCode?: string | null,
    } | null,
    gardenId?: string | null,
    id: string,
    owner?: string | null,
    plannedDate?: string | null,
    plantRow?:  {
      __typename: "PlantRow",
      createdAt: string,
      gardenId?: string | null,
      id: string,
      owner?: string | null,
      plantSpacing?: number | null,
      species?: string | null,
      updatedAt: string,
    } | null,
    plantRowId?: string | null,
    step?:  {
      __typename: "Step",
      description?: string | null,
      result?: string | null,
      role?: StepRole | null,
      title?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type OnUpdatePlantRowSubscriptionVariables = {
  filter?: ModelSubscriptionPlantRowFilterInput | null,
  owner?: string | null,
};

export type OnUpdatePlantRowSubscription = {
  onUpdatePlantRow?:  {
    __typename: "PlantRow",
    createdAt: string,
    garden?:  {
      __typename: "Garden",
      createdAt: string,
      id: string,
      name?: string | null,
      objective?: string | null,
      owner?: string | null,
      updatedAt: string,
      zipCode?: string | null,
    } | null,
    gardenId?: string | null,
    id: string,
    location?:  {
      __typename: "PlantRowLocation",
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
    plantSpacing?: number | null,
    species?: string | null,
    updatedAt: string,
  } | null,
};
