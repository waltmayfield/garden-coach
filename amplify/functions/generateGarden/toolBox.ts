import { tool } from "@langchain/core/tools";
import { stringify } from "yaml";

import { getContextVariable } from "@langchain/core/context";

import { createGardenType, plannedStepArrayType, PlannedStepArray, Garden } from "../../../utils/types";
import { doRectanglesOverlap } from "../../../utils/geometry";


export const createGardenInfoToolBuilder = (props: {gardenId: string}) => tool(
    async (proposedGarden) => {
        console.log('proposedGarden:\n', proposedGarden)
        // Verify that the functionArgs are valid
        const verifySchemaResult = createGardenType.safeParse(proposedGarden)
        if (!verifySchemaResult.success) {
            console.log(`Invalid proposed garden: ${JSON.stringify(verifySchemaResult.error)}`)
            throw new Error(`Invalid proposed garden: ${JSON.stringify(verifySchemaResult.error, null, 2)}`)
            // return `Invalid proposed garden: ${JSON.stringify(verifySchemaResult.error)}`
        }

        // // Functions must return strings
        // let updateGardenInput: UpdateGardenInput = {
        //     id: props.gardenId,
        //     ...(proposedGarden as Partial<UpdateGardenInput>)
        // }

        // if (
        //     (typeof proposedGarden.location?.lattitude) !== 'number' ||
        //     (typeof proposedGarden.location?.longitude) !== 'number'
        // ) {
        //     console.log("Geocoding garden location: ", proposedGarden.location.cityStateAndCountry)
        //     const gardenLatLong = await geocode(proposedGarden.location.cityStateAndCountry)
        //     updateGardenInput.location!.lattitude = gardenLatLong.lat
        //     updateGardenInput.location!.longitude = gardenLatLong.lng
        // }

        // const updateGardenResponse = await amplifyClient.graphql({
        //     query: updateGarden,
        //     variables: { input: updateGardenInput }
        // })

        // console.log('updateGardenResponse:\n', updateGardenResponse.data.updateGarden)
        // return stringify(updateGardenResponse.data.updateGarden)
        return "Recommend garden update to the user"
    },
    {
        name: "recommendGardenUpdate",
        description: "Recommend an update to the garden's attributes",
        schema: createGardenType,
    }
);

const getUtilizedGardenSpace = (plannedStepArray: PlannedStepArray) => {
    return plannedStepArray.steps.map(({plannedDate, step: {plantRows}}) => {
        //Check if the plant rows overlap
        for (let i = 0; i < plantRows.length; i++) {
            for (let j = i + 1; j < plantRows.length; j++) {
                const rowA = plantRows[i];
                const rowB = plantRows[j];
    
                const overlap = doRectanglesOverlap(
                    {
                        ...rowA.location,
                        width: rowA.rowSpacingCm/100
                    }, {
                        ...rowB.location,
                        width: rowA.rowSpacingCm/100
                    });
    
                if (overlap) {
                    throw new Error(`Plant rows overlap between species ${rowA.species} and ${rowB.species} for the step with planned date ${plannedDate}`);
                }
            }
        }

        //Check how much of the garden space is used
        const garden = getContextVariable('garden') as Garden;

        if (!garden.perimeterPoints) throw new Error("Garden perimeter points are missing");
        const gardenArea = garden.perimeterPoints.reduce((acc, point, i, points) => {
            const nextPoint = points[(i + 1) % points.length];
            if (!point || !nextPoint) return acc;
            return acc + (point.x * nextPoint.y - point.y * nextPoint.x);
        }, 0) / 2;

        const usedArea = plantRows.reduce((acc, row) => {
            const {start, end} = row.location;
            const rowLength = Math.sqrt((end.x - start.x) ** 2 + (end.y - start.y) ** 2);
            return acc + rowLength * row.rowSpacingCm / 100;
        }, 0);

        return {
            stepPlannedDate: plannedDate,
            utilizedAreaFraction: usedArea / gardenArea,
        };
    })
}

export const createPlannedSteps = tool(
    async ({steps}) => {
        console.log('Proposed steps:\n', steps)
        const verifySchemaResult = plannedStepArrayType.safeParse({steps})
        if (!verifySchemaResult.success) {
            console.log(`Invalid proposed steps:\n${JSON.stringify(verifySchemaResult.error)}`)
            throw new Error(`Invalid proposed steps: ${JSON.stringify(verifySchemaResult.error, null, 2)}`)
            // return `Invalid proposed steps:\n${JSON.stringify(verifySchemaResult.error)}`
        }

        const utilizedSpace = getUtilizedGardenSpace(verifySchemaResult.data)

        return `Recommend planned steps to the user. Utilized space: \n${stringify(utilizedSpace)}`
    },
    {
        name: "createGardenPlannedSteps",
        description: "Recommend planned steps to the user",
        schema: plannedStepArrayType,
    }
);

// export const updatePlannedStepTool = () => tool(
//     async (updatedPlannedStep) => {
//         const amplifyClient = getConfiguredAmplifyClient();

//         await amplifyClient.graphql({
//             query: updatePlannedStep,
//             variables: { input: updatedPlannedStep}
//         })
        
//         return `Updated the planned step id: ${updatedPlannedStep.id}`
//     },
//     {
//         name: "updatePlannedStep",
//         description: "Update one of the garden's planned steps",
//         schema: plannedStepArrayType.extend({
//             id: z.string().nonempty("ID is required")
//         }),
//     }
// );