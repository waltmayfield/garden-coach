import { z } from "zod";
import { Schema } from '../amplify/data/resource';
import React from "react";

import { HumanMessage, AIMessage, ToolMessage } from "@langchain/core/messages";


const xY = z.object({
    x: z.number(),
    y: z.number()
})

export const createGardenType = z.object({
    name: z.string(),
    objective: z.string(),
    location: z.object({
        cityStateAndCountry: z.string(),
        lattitude: z.number(),
        longitude: z.number()
    }),
    perimeterPoints: z.array(xY.nullable()).nullable(),
    northVector: xY,
    units: z.enum(['imperial', 'metric']),
})

export type Garden = z.infer<typeof createGardenType>

const zodStringDate = z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format, should be YYYY-MM-DD")
    .describe("The date in YYYY-MM-DD format")

const plantRowType = z.object({
    location: z.object({
        start: xY,
        end: xY
    }),
    species: z.string(),
    plantSpacingInMeters: z.number(),
    // plantDate: zodStringDate,
    expectedHarvest: z.object({
        date: zodStringDate,
        amount: z.number(),
        unit: z.string()
    })
})

const stepType = z.object({
    title: z.string(),
    description: z.string(),
    role: z.enum(['ai', 'human']),
    // resources: z.array(z.string()),
    plantRows: z.array(plantRowType),

})

export const plannedStepArrayType = z.object({
    steps: z.array(z.object({
        id: z.string().optional().describe("To update an existing step, provide the id of the step"),
        step: stepType,
        plannedDate: zodStringDate,
    })),
    explaination: z.string(),
})

export type PlannedStepArray = z.infer<typeof plannedStepArrayType>

export type GardenWithSvg = (
    Schema["Garden"]["type"] & {
        gardenSvg?: React.JSX.Element
    }
)

export type PlannedSteps = (
    Schema["PlannedStep"]["createType"] & {
        gardenSvg?: React.JSX.Element
    }
)[];

export type Message = (
    Schema["ChatMessage"]["createType"]
)

export type PublishMessageCommandInput = { 
    gardenId: string, 
    owner: string, 
    message: HumanMessage | AIMessage | ToolMessage, 
    responseComplete?: boolean,
}