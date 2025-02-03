import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { stringify } from "yaml";

import { geocode } from '../../../utils/weather';

import { Schema } from '../../../amplify/data/resource';
import { createGardenType, plannedStepArrayType } from "../../../utils/amplifyStrucutedOutputs";
import { createPlannedStepForGarden } from '../../../utils/graphqlStatements'
import { UpdateGardenInput, UpdatePlannedStepInput, CreatePlannedStepInput } from "../graphql/API";
import { updateGarden } from "../graphql/mutations";
import { getConfiguredAmplifyClient } from "../../../utils/amplifyUtils";

export const createGardenInfoToolBuilder = (props: {gardenId: string}) => tool(
    async (createGardenProps) => {
        const amplifyClient = getConfiguredAmplifyClient();

        // Functions must return strings
        let updateGardenInput: UpdateGardenInput = {
            id: props.gardenId,
            ...(createGardenProps as Partial<UpdateGardenInput>)
        }

        if (
            (typeof createGardenProps.location?.lattitude) !== 'number' ||
            (typeof createGardenProps.location?.longitude) !== 'number'
        ) {
            console.log("Geocoding garden location: ", createGardenProps.location.cityStateAndCountry)
            const gardenLatLong = await geocode(createGardenProps.location.cityStateAndCountry)
            updateGardenInput.location!.lattitude = gardenLatLong.lat
            updateGardenInput.location!.longitude = gardenLatLong.lng
        }

        const updateGardenResponse = await amplifyClient.graphql({
            query: updateGarden,
            variables: { input: updateGardenInput }
        })

        console.log('updateGardenResponse:\n', updateGardenResponse.data.updateGarden)
        return stringify(updateGardenResponse.data.updateGarden)
    },
    {
        name: "updateGarden",
        description: "Updates the garden's attributes",
        schema: createGardenType,
    }
);

export const createGardenPlanToolBuilder = (props: {gardenId: string, owner: string}) => tool(
    async (plannedStepArrayType) => {
        const { gardenId, owner } = props;
        const amplifyClient = getConfiguredAmplifyClient();

        for (const plannedStep of plannedStepArrayType.steps) {
                const stepInput: Schema["PlannedStep"]["createType"] = {
                    gardenId: gardenId,
                    owner: owner,
                    step: plannedStep.step,
                    plannedDate: plannedStep.plannedDate
                }
                console.log("Step Input:\n", stringify(stepInput))
                const createStepResponse = await amplifyClient.graphql({
                    query: createPlannedStepForGarden,
                    variables: { input: stepInput as CreatePlannedStepInput }
                })//.catch((error) => console.error("Error creating new step: ", stringify(error)))
        
                console.log("Created new step: ", createStepResponse)
                // .then(
                //     (response) => console.log("Created new step: ", response)
                // ).catch(
                //     (error) => console.error("Error creating new step: ", error)
                // )
            }
        return "Added all planned steps to the garden"
    },
    {
        name: "createGardenPlannedSteps",
        description: "Add planned steps to the garden",
        schema: plannedStepArrayType,
    }
);