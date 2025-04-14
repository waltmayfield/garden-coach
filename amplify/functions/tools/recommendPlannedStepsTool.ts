import { tool } from "@langchain/core/tools";
import { stringify } from "yaml";
import { listPlantedPlantRows } from "../../../utils/graphqlStatements";

import { workStepArrayType, WorkStepArray } from "../../../utils/types";
import { doRectanglesOverlap } from "../../../utils/geometry";

import { getConfiguredAmplifyClient } from '../../../utils/amplifyUtils';

const getUtilizedGardenSpace = async (workStepArray: WorkStepArray, gardenId: string) => {
    const amplifyClient = getConfiguredAmplifyClient();

    // Fetch current planted plant rows from the garden
    const {data: {listPlantedPlantRows: {items: plantedPlantRowsResponse}}} = await amplifyClient.graphql({
        query: listPlantedPlantRows,
        variables: { filter: { gardenId: { eq: gardenId } } }
    });

    const plantedPlantRows = plantedPlantRowsResponse.map((row) => row.info);

    // const plantedPlantRows = gardenData?.data?.getGarden?.plantedPlantRow?.items || [];

    return workStepArray.steps.map(({ date, plantRows }) => {
        // Combine planned plant rows with currently planted rows
        const allPlantRows = [...plantRows, ...plantedPlantRows];

        // Check if any plant rows overlap
        for (let i = 0; i < allPlantRows.length; i++) {
            for (let j = i + 1; j < allPlantRows.length; j++) {
                const rowA = allPlantRows[i];
                const rowB = allPlantRows[j];

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
                    throw new Error(
                        `Plant rows overlap between species ${rowA.species} and ${rowB.species} for the step with planned date ${date}`
                    );
                }
            }
        }

        return {
            stepPlannedDate: date,
            utilizedAreaFraction: 1.0, // Placeholder for area calculation logic
        };
    });
};

// Add a persistent array to store planned steps
const proposedSteps: WorkStepArray = { steps: [] };

export const updatePlannedStepsBuilder = (props: {gardenId: string}) => tool(
    async ({ steps }) => {
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

        const utilizedSpace = await getUtilizedGardenSpace(proposedSteps, props.gardenId);

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