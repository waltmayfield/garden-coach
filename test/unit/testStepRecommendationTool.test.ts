import { updatePlannedStepsBuilder, UpdatePlannedStepsToolInput } from "../../amplify/functions/tools/recommendPlannedStepsTool";
import { createGardenInfoToolBuilder, CreateGardenToolInput } from "../../amplify/functions/tools/createGardenTool";
import { describe, it, expect } from "@jest/globals";
import { getConfiguredAmplifyClient, setAmplifyClientEnvVars } from "../utils";

import { createGarden } from "../../amplify/functions/graphql/mutations";
import * as APITypes from "../../amplify/functions/graphql/API";
// Mock data for testing
// const mockGardenId = "test-garden-id";
const mockSteps: UpdatePlannedStepsToolInput = {
  steps: [
    {
      title: "Plant Tomatoes",
      role: "human",
      status: "planned",
      date: "2025-05-15",
      description: "Planting tomato rows in the garden",
      result: "Expected successful planting of tomatoes.",
      plantRows: [
        {
          species: "Tomato",
          variety: "Cherry",
          location: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
          rowSpacingCm: 50,
          plantDate: "2025-05-01",
          harvest: { amount: 10, window: 30, first: "2025-06-01", unit: "kg" },
          perrenial: false,
          status: "planned",
        },
        {
          species: "Tomato",
          variety: "Cherry",
          location: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
          rowSpacingCm: 50,
          plantDate: "2025-05-01",
          harvest: { amount: 10, window: 30, first: "2025-06-01", unit: "kg" },
          perrenial: false,
          status: "planned",
        },
      ],
    },
  ],
  explaination: "Testing planned steps for planting tomatoes."
};

describe("updatePlannedStepsBuilder", () => {
  it("should update or add planned steps correctly", async () => {
    await setAmplifyClientEnvVars()
    const amplifyClient = await getConfiguredAmplifyClient()

    //Create a garden for the test to use
    const validGardenInput = {
      input: {
        name: "My Garden",
        objective: "Grow vegetables",
        location: {
          cityStateAndCountry: "Austin, Texas, USA",
          lattitude: 0,
          longitude: 0
        },
        perimeterPoints: [
          { x: 0, y: 0 },
          { x: 10, y: 0 },
          { x: 10, y: 5 },
          { x: 0, y: 5 }
        ],
        northVector: { x: 0, y: 1 },
        units: "metric"
      }
    } as APITypes.CreateGardenMutationVariables;

    const createGardenResult = await amplifyClient.graphql({
      query: createGarden,
      variables: validGardenInput
    })

    const gardenId = createGardenResult.data.createGarden.id
    console.log("Created garden with ID:", gardenId);
    // const createGardenTool = createGardenInfoToolBuilder({ gardenId: mockGardenId });
    // const createGardenResult = await createGardenTool.invoke(validGarden);
    expect(createGardenResult.data).toBeDefined();

    const updatePlannedStepsTool = updatePlannedStepsBuilder({ gardenId: gardenId });
    const toolInput = mockSteps;

    const parseResult = updatePlannedStepsTool.schema.safeParse(toolInput);
    if (!parseResult.success) {
      // handle validation error
      console.error("Validation error:");
      console.error(parseResult.error);
    } else {
      // data is valid
      console.log('input is valid');
    }

    expect(parseResult.success).toBe(true);

    const updatePlannedStepsResult = await updatePlannedStepsTool.invoke(toolInput);
    console.log("Update planned steps result:\n", updatePlannedStepsResult);

    expect(updatePlannedStepsResult).toBeDefined();
    expect(updatePlannedStepsResult.plannedStepAnalysis[0].overlaps.length).toBe(0);
  });
});


