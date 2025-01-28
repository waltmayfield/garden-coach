import * as APITypes from "../amplify/functions/graphql/API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};


export const createChatMessage = /* GraphQL */ `mutation CreateChatMessage(
  $condition: ModelChatMessageConditionInput
  $input: CreateChatMessageInput!
) {
  createChatMessage(condition: $condition, input: $input) {
    chatSessionId
    content {
      text
    }
    owner
    role
  }
}
` as GeneratedMutation<
  APITypes.CreateChatMessageMutationVariables,
  APITypes.CreateChatMessageMutation
>;

export const createPlannedStepForGarden = /* GraphQL */ `mutation CreatePlannedStep(
  $condition: ModelPlannedStepConditionInput
  $input: CreatePlannedStepInput!
) {
  createPlannedStep(condition: $condition, input: $input) {
    gardenId
    owner
    plannedDate
    step {
      description
      result
      role
      title
      plantRows {
        species
      }
    }
  }
}
` as GeneratedMutation<
  APITypes.CreatePlannedStepMutationVariables,
  APITypes.CreatePlannedStepMutation
>;

export const generateGardenPlanSteps = /* GraphQL */ `query GenerateGardenPlanSteps($gardenId: ID!) {
  generateGardenPlanSteps(gardenId: $gardenId) {
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GenerateGardenPlanStepsQueryVariables,
  APITypes.GenerateGardenPlanStepsQuery
>;