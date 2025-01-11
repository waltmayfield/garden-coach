/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const generateGardenPlanSteps = /* GraphQL */ `query GenerateGardenPlanSteps($gardenId: ID) {
  generateGardenPlanSteps(gardenId: $gardenId) {
    description
    result
    role
    title
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GenerateGardenPlanStepsQueryVariables,
  APITypes.GenerateGardenPlanStepsQuery
>;
export const getGarden = /* GraphQL */ `query GetGarden($id: ID!) {
  getGarden(id: $id) {
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
` as GeneratedQuery<APITypes.GetGardenQueryVariables, APITypes.GetGardenQuery>;
export const getPastStep = /* GraphQL */ `query GetPastStep($id: ID!) {
  getPastStep(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetPastStepQueryVariables,
  APITypes.GetPastStepQuery
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
` as GeneratedQuery<
  APITypes.GetPlannedStepQueryVariables,
  APITypes.GetPlannedStepQuery
>;
export const getPlantRow = /* GraphQL */ `query GetPlantRow($id: ID!) {
  getPlantRow(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetPlantRowQueryVariables,
  APITypes.GetPlantRowQuery
>;
export const listGardens = /* GraphQL */ `query ListGardens(
  $filter: ModelGardenFilterInput
  $limit: Int
  $nextToken: String
) {
  listGardens(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      createdAt
      id
      name
      objective
      owner
      updatedAt
      zipCode
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListGardensQueryVariables,
  APITypes.ListGardensQuery
>;
export const listPastSteps = /* GraphQL */ `query ListPastSteps(
  $filter: ModelPastStepFilterInput
  $limit: Int
  $nextToken: String
) {
  listPastSteps(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      completedDate
      createdAt
      gardenId
      id
      notes
      owner
      plantRowId
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListPastStepsQueryVariables,
  APITypes.ListPastStepsQuery
>;
export const listPlannedSteps = /* GraphQL */ `query ListPlannedSteps(
  $filter: ModelPlannedStepFilterInput
  $limit: Int
  $nextToken: String
) {
  listPlannedSteps(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      createdAt
      gardenId
      id
      owner
      plannedDate
      plantRowId
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListPlannedStepsQueryVariables,
  APITypes.ListPlannedStepsQuery
>;
export const listPlantRows = /* GraphQL */ `query ListPlantRows(
  $filter: ModelPlantRowFilterInput
  $limit: Int
  $nextToken: String
) {
  listPlantRows(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      createdAt
      gardenId
      id
      owner
      plantSpacing
      species
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListPlantRowsQueryVariables,
  APITypes.ListPlantRowsQuery
>;
