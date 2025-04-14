import { z } from "zod";
import { Schema } from '../amplify/data/resource';
import React from "react";

import { HumanMessage, AIMessage, ToolMessage } from "@langchain/core/messages";


const xY = z.object({
    x: z.number(),
    y: z.number()
});

export const createGardenType = z.object({
    name: z.string(),
    objective: z.string(),
    location: z.object({
        cityStateAndCountry: z.string(),
        lattitude: z.number(),
        longitude: z.number()
    }),
    perimeterPoints: z.array(xY).nullable(),
    northVector: xY,
    units: z.enum(['imperial', 'metric']),
});

export type Garden = z.infer<typeof createGardenType>

const zodStringDate = z.string()
    .regex(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/)
    .describe("The date in YYYY-MM-DD format");

const harvestType = z.object({
    first: zodStringDate,
    window: z.number().int().describe("Maximum number of days over which harvest can occur"),
    amount: z.number().describe("Harvest amount"),
    unit: z.string().describe("Unit of measurement for harvest amount")
});

const rowLocationType = z.object({
    start: xY,
    end: xY
});

const plantRowType = z.object({
    location: rowLocationType,
    species: z.string(),
    variety: z.string(),
    rowSpacingCm: z.number().describe("Distance between rows in cm"),
    plantDate: zodStringDate,
    harvest: harvestType,
    perrenial: z.boolean(),
    status: z.enum(['planned', 'planted', 'failed', 'germinated', 'vegatitative', 'flowering', 'fruiting', 'removed'])
});

const stepType = z.object({
    title: z.string(),
    description: z.string().optional(),
    role: z.enum(['ai', 'human']),
    result: z.string().optional(),
    plantRows: z.array(plantRowType),
    date: zodStringDate,
    status: z.enum(['proposed', 'rejected', 'planned', 'completed', 'failed'])
});

export const workStepArrayType = z.object({
    steps: z.array(stepType).describe("Array of work steps"),
    explaination: z.string().optional()
});

export type WorkStepArray = z.infer<typeof workStepArrayType>

export type GardenWithSvg = (
    Schema["Garden"]["type"] & {
        gardenSvg?: React.JSX.Element
    }
)

export type WorkSteps = (
    Schema["WorkStep"]["createType"] & {
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

const typeChecks = () =>{
    const garden: Schema["Garden"]["createType"] = {} as Garden;
    const step: Schema["WorkStep"]["createType"] = {} as WorkStepArray["steps"][number]
}