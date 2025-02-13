import { tool } from "@langchain/core/tools";
// import { z } from "zod";
// import { stringify } from "yaml";

// import { geocode } from '../../../utils/weather';

// import { Schema } from '../../../amplify/data/resource';
import { createGardenType, plannedStepArrayType } from "../../../utils/types";
// import { createPlannedStepForGarden } from '../../../utils/graphqlStatements'
// import { UpdateGardenInput, UpdatePlannedStepInput, CreatePlannedStepInput } from "../graphql/API";
// import { updateGarden, updatePlannedStep } from "../graphql/mutations";
// import { getConfiguredAmplifyClient } from "../../../utils/amplifyUtils";

export const createGardenInfoToolBuilder = (props: {gardenId: string}) => tool(
    async (proposedGarden) => {
        // Verify that the functionArgs are valid
        const verifySchemaResult = createGardenType.safeParse(proposedGarden)
        if (!verifySchemaResult.success) {
            throw new Error(`Invalid proposed garden: ${verifySchemaResult.error}`)
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

export const createGardenPlanToolBuilder = (props: {gardenId: string, owner: string}) => tool(
    async ({steps}) => {

        const verifySchemaResult = plannedStepArrayType.safeParse({steps})
        if (!verifySchemaResult.success) {
            throw new Error(`Invalid proposed steps: ${verifySchemaResult.error}`)
        }

        return "Send planned step recommendations to the user"
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