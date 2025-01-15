import { z } from "zod";
import { stringify } from "yaml";
import { ChatBedrockConverse } from "@langchain/aws";
import { ChatPromptTemplate } from "@langchain/core/prompts";

import { schema, Schema } from '../amplify/data/resource';

import { geocode, getWeatherForecast } from './weather';

const XY = z.object({
    x: z.number(),
    y: z.number()
})

// schema.data.types.Garden

const CreateGardenType = z.object({
    name: z.string(),
    objective: z.string(),
    location: z.object({
        cityStateAndCountry: z.string(),
        lattitude: z.number(),
        longitude: z.number()
    }),
    perimeterPoints: z.array(XY),
    units: z.enum(['imperial', 'metric']),
})

const PlantRowType = z.object({
    location: z.object({
        start: XY,
        end: XY
    }),
    species: z.string(),
    plantSpacingInMeters: z.number(),
    plantDate: z.string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format, should be YYYY-MM-DD")
        .describe("The date in YYYY-MM-DD format")
})

const StepType = z.object({
    title: z.string(),
    description: z.string(),
    role: z.enum(['ai', 'human']),
    resources: z.array(z.string()),
    plantRows: z.array(PlantRowType)
})

const StepArrayType= z.object({
    steps: z.array(StepType),
    explaination: z.string()
})

export const createGarden = async (userPrompt: string) => {
    const gardenCreationModel = new ChatBedrockConverse({
        model: process.env.MODEL_ID
    }).withStructuredOutput(CreateGardenType,{includeRaw: true})

    const gardenCreationPrompt = ChatPromptTemplate.fromTemplate(
        `
        Create a new garden based on the user's prompt.

        <userPrompt>
        {userPrompt}
        </userPrompt>
        `,
    );

    const newGarden = await gardenCreationPrompt.pipe(gardenCreationModel).invoke({
        userPrompt
    })

    return newGarden.parsed
}

export const createGardenPlanSteps = async (garden: Schema["Garden"]["createType"]) => {
    // const location = await geocode(garden.zipCode)
    const forecast = ""//await getWeatherForecast({lattitude: garden.lattitude, longitude: garden.longitude})

    const gardenStepPlannerModel = new ChatBedrockConverse({
        model: process.env.MODEL_ID
    }).withStructuredOutput(StepArrayType,{includeRaw: true})

    if (!garden.perimeterPoints) {
        throw new Error("Garden does not have perimeter points")
    }

    const plannerPrompt = ChatPromptTemplate.fromTemplate(
        `
        For the given objective, come up with a simple step by step plan. 
        This plan should involve individual tasks, that if executed correctly will yield the correct answer.
        Do not add any superfluous steps. 
        The result of the final step should be the final answer. Make sure that each step has all the information needed - do not skip steps.
        
        {objective}

        Today's date is: ${new Date().toISOString().split('T')[0]}

        The weather forecast is:
        ${stringify(forecast)}

        The garden has perimeter points (meters):
        ${garden.perimeterPoints.map((point) => `(${point?.x}, ${point?.y})`).join(", ")}
        `,
    );

    const gandenStepLannerWithPrompt = plannerPrompt.pipe(gardenStepPlannerModel);

    const newPlanSteps = await gandenStepLannerWithPrompt.invoke({
        objective: garden.objective
    })

    return newPlanSteps.parsed
}


const typeChecks = async () => {
    const newGarden: Schema["Garden"]["createType"] = await createGarden("Maximize food production")
    const newSteps = await createGardenPlanSteps(newGarden)
    const firstNewStep: Schema["PlannedStep"]["createType"]["step"] = newSteps.steps[0]
}