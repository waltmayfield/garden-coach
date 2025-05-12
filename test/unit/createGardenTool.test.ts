import { createGardenInfoToolBuilder, CreateGardenToolInput } from "../../amplify/functions/tools/createGardenTool";
import { describe, it, expect } from "@jest/globals";

describe("createGardenInfoToolBuilder", () => {

    it("should return a recommendation string for valid proposed garden", async () => {
        const validGarden: CreateGardenToolInput = {
            name: "My Garden",
            objective: "Grow vegetables",
            location: {
                cityStateAndCountry: "City, State, Country",
                lattitude: 0,
                longitude: 0
            },
            perimeterPoints: null,
            northVector: { x: 0, y: 1 },
            units: "metric"
        };
        const tool = createGardenInfoToolBuilder({ gardenId: "test-id" });

        const result = await tool.invoke(validGarden);

        expect(result).toBe("Recommend garden update to the user");
    });
});
