import { Schema } from "../amplify/data/resource";
import React from "react";

import { HumanMessage, AIMessage, ToolMessage } from "@langchain/core/messages";

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