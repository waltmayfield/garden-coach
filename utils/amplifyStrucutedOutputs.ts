import { z } from "zod";
import { stringify } from "yaml";
import { ChatBedrockConverse } from "@langchain/aws";
import { ChatPromptTemplate } from "@langchain/core/prompts";

import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/data';
import { schema, Schema } from '../amplify/data/resource';
import { CreateGardenInput } from '../amplify/functions/graphql/API'

import { geocode, getWeatherForecast } from './weather';
import { experimental } from "aws-cdk-lib/aws-cloudfront";

import { createGarden } from '../amplify/functions/graphql/mutations';

const amplifyClient = generateClient<Schema>();

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
    perimeterPoints: z.array(XY.nullable()).nullable(),
    northVector: XY,
    units: z.enum(['imperial', 'metric']),
})

const zodStringDate = z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format, should be YYYY-MM-DD")
    .describe("The date in YYYY-MM-DD format")

const PlantRowType = z.object({
    location: z.object({
        start: XY,
        end: XY
    }),
    species: z.string(),
    plantSpacingInMeters: z.number(),
    plantDate: zodStringDate,
    expectedHarvest: z.object({
        date: zodStringDate,
        amount: z.number(),
        unit: z.string()
    })
})

const StepType = z.object({
    title: z.string(),
    description: z.string(),
    role: z.enum(['ai', 'human']),
    // resources: z.array(z.string()),
    plantRows: z.array(PlantRowType)
})

const StepArrayType = z.object({
    steps: z.array(StepType),
    explaination: z.string()
})

export const generateGarden = async (userPrompt: string) => {
    const gardenCreationModel = new ChatBedrockConverse({
        model: process.env.MODEL_ID
    }).withStructuredOutput(CreateGardenType, { includeRaw: true })

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

export const generateGardenPlanSteps = async (garden: Schema["Garden"]["createType"]) => {

    if (
        !garden.location ||
        !garden.location.lattitude ||
        !garden.location.longitude ||
        (typeof garden.location?.lattitude) !== 'number' ||
        (typeof garden.location?.longitude) !== 'number'
    ) throw new Error("Garden does not have lattitude and longitude. Garden:\n" + stringify(garden))

    const forecast = await getWeatherForecast({ lattitude: garden.location.lattitude, longitude: garden.location.longitude })

    const gardenStepPlannerModel = new ChatBedrockConverse({
        model: process.env.MODEL_ID
    }).withStructuredOutput(StepArrayType, { includeRaw: true })

    if (!garden.perimeterPoints) {
        throw new Error("Garden does not have perimeter points")
    }

    const prompt = `
    The user has a garden with the following objective:
    <userObjective>
    {objective}
    </userObjective>

    With the earliest possible date of ${new Date().toISOString().split('T')[0]}, come up with a step by step plan to accomplish the objective.
    Try to fill the garden as much as possible with plants that will yield the most food.
    Include all of the steps required over the course of a year.

    The weather forecast is:
    ${stringify(forecast)}

    The garden has perimeter points (meters):
    ${garden.perimeterPoints.map((point) => `(${point?.x}, ${point?.y})`).join(", ")}
    `

    console.log("Prompt: ", prompt)

    const plannerPrompt = ChatPromptTemplate.fromTemplate(prompt);

    const gandenStepLannerWithPrompt = plannerPrompt.pipe(gardenStepPlannerModel);

    const newPlanSteps = await gandenStepLannerWithPrompt.invoke({
        objective: garden.objective
    })

    return newPlanSteps.parsed
}


const typeChecks = async () => {
    const generatedGarden: Schema["Garden"]["createType"] = await generateGarden("Maximize food production")
    // const generatedGarden: CreateGardenInput = await generateGarden("Maximize food production")
    const newSteps = await generateGardenPlanSteps(generatedGarden as Schema["Garden"]["createType"])
    const firstNewStep: Schema["PlannedStep"]["createType"]["step"] = newSteps.steps[0]


    // if (!generatedGarden.perimeterPoints) throw new Error ("Generated garden does not have perimeter points")
    if (generatedGarden.perimeterPoints?.some((point) => !point)) throw new Error("Generated garden has null perimeter points")
    
    // const dummyGeneratedGarden: CreateGardenInput = {
    //     name: "testName",
    //     location: {
    //         cityStateAndCountry: "Austin, Texas, USA",
    //         lattitude: 30.2672,
    //         longitude: -97.7431
    //     },
    //     perimeterPoints: [
    //         { x: 0, y: 0 },
    //         { x: 0, y: 8 },
    //         { x: 2, y: 8 },
    //         { x: 2, y: 0 }
    //     ]
    // } 

    // const createGardenResponse = await amplifyClient.graphql({
    //     query: createGarden,
    //     variables: { input: dummyGeneratedGarden}
    // })

    // const createGardenResponse = await amplifyClient.graphql({
    //     query: createGarden,
    //     variables: { input: generatedGarden as CreateGardenInput}
    // })

    // return createGardenResponse.data?.createGarden
}