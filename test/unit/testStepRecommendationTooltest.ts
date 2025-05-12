import { updatePlannedStepsBuilder, UpdatePlannedStepsToolInput } from "../../amplify/functions/tools/recommendPlannedStepsTool";
import { describe, it, expect } from "@jest/globals";

// Mock data for testing
const mockGardenId = "test-garden-id";
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
      ],
    },
  ],
  explaination: "Testing planned steps for planting tomatoes."
};

describe("updatePlannedStepsBuilder", () => {
  it("should update or add planned steps correctly", async () => {
    const tool = updatePlannedStepsBuilder({ gardenId: mockGardenId });

    const result = await tool.invoke({ steps: mockSteps });

    expect(result).toBeDefined();
    expect(result).toContain("Proposed steps:");
  });
});


