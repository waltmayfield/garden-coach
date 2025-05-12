import { tool } from "@langchain/core/tools";
import { stringify } from "yaml";
import { z } from "zod";

import { createGardenType, Garden } from "../../../utils/types";

export type CreateGardenToolInput = z.infer<typeof createGardenType>;

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
