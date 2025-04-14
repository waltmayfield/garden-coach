import { tool } from "@langchain/core/tools";
import { stringify } from "yaml";
import { listPlantedPlantRows, ListPlantedPlantRowsWithLocation } from "../../../utils/graphqlStatements";
import { getGarden } from "../graphql/queries";

import { workStepArrayType, WorkStepArray } from "../../../utils/types";
import { doRectanglesOverlap } from "../../../utils/geometry";

import { getConfiguredAmplifyClient } from '../../../utils/amplifyUtils';

import { Schema } from '../../data/resource';

const getUtilizedGardenSpace = async (props: {
    workStepArray: WorkStepArray,
    plantedPlantRows: ListPlantedPlantRowsWithLocation["listPlantedPlantRows"]["items"][number]["info"][],
    gardenPerimeterPoints: Schema["Garden"]["createType"]["perimeterPoints"],
}) => {
    const { workStepArray, plantedPlantRows } = props;

    return workStepArray.steps.map(({ date, plantRows }) => {
        // Combine planned plant rows with currently planted rows
        const allPlantRows = [...plantRows, ...plantedPlantRows];

        const overlaps = [];

        // Check if any plant rows overlap
        for (let i = 0; i < allPlantRows.length; i++) {
            for (let j = i + 1; j < allPlantRows.length; j++) {
                const rowA = allPlantRows[i];
                const rowB = allPlantRows[j];

                if (!rowA || !rowB || !rowA.location || !rowB.location || !rowA.rowSpacingCm || !rowB.rowSpacingCm) continue;

                const overlap = doRectanglesOverlap(
                    {
                        ...rowA.location,
                        width: rowA.rowSpacingCm / 100,
                    },
                    {
                        ...rowB.location,
                        width: rowB.rowSpacingCm / 100,
                    }
                );

                if (overlap) {
                    overlaps.push({
                        speciesA: rowA.species,
                        speciesB: rowB.species,
                        plannedDate: date,
                    });
                }
            }
        }

        return {
            stepPlannedDate: date,
            utilizedAreaFraction: 1.0, // Placeholder for area calculation logic
            overlaps, // Include overlap information in the response
        };
    });
};

// Add a persistent array to store planned steps
const proposedSteps: WorkStepArray = { steps: [] };

export const updatePlannedStepsBuilder = (props: { gardenId: string }) => tool(
    async ({ steps }) => {
        const amplifyClient = getConfiguredAmplifyClient();

        console.log("Proposed steps:\n", steps);
        const verifySchemaResult = workStepArrayType.safeParse({ steps });
        if (!verifySchemaResult.success) {
            console.log(
                `Invalid proposed steps:\n${JSON.stringify(verifySchemaResult.error)}`
            );
            return `Invalid proposed steps: ${JSON.stringify(
                verifySchemaResult.error
            )}`;
        }

        // Update plannedSteps array
        verifySchemaResult.data.steps.forEach((newStep) => {
            const existingStepIndex = proposedSteps.steps.findIndex(
                (step) => step.date === newStep.date
            );

            if (existingStepIndex !== -1) {
                // Edit existing step
                proposedSteps.steps[existingStepIndex] = newStep;
            } else {
                // Add new step
                proposedSteps.steps.push(newStep);
            }
        });

        // Fetch the current garden's perimeter points
        const { data: { getGarden: garden } } = await amplifyClient.graphql({
            query: getGarden,
            variables: { id: props.gardenId }
        });

        if (!garden) {
            console.log("Garden not found");
            return `Garden with id ${props.gardenId} not found`;
        }

        // Fetch current planted plant rows from the garden
        const { data: { listPlantedPlantRows: { items: plantedPlantRowsResponse } } } = await amplifyClient.graphql({
            query: listPlantedPlantRows,
            variables: { filter: { gardenId: { eq: props.gardenId } } }
        });

        const utilizedSpace = await getUtilizedGardenSpace(
        {
            workStepArray: proposedSteps,
            plantedPlantRows: plantedPlantRowsResponse.map((row) => row.info),
            gardenPerimeterPoints: garden.perimeterPoints
        })

        
        return {
            status: "success",
            utilizedGardenSpace: utilizedSpace,
            proposedSteps: proposedSteps.steps,
        };
    },
    {
        name: "updateGardenPlannedSteps",
        description: `
        Update or add planned steps to the garden plan. 
        Steps can be added by providing new planned dates or updated by matching an existing planned date and modifying the step details.
        `,
        schema: workStepArrayType,
    }
);