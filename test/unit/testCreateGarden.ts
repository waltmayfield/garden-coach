import { stringify } from 'yaml'

import { Schema } from '../../amplify/data/resource';

import { createGarden, createGardenPlanSteps } from '../../utils/amplifyStrucutedOutputs';
import { geocode, getWeatherForecast } from '../../utils/weather';

const main = async () => {
    const newGarden: Schema["Garden"]["createType"] = await createGarden(`
        I have a two meter by 8 meter garden bed.
        It is in Austin Texas, USA.
        My family has three members and I would like to feed them year round with a variety of vegtables from this garden.
        `)
    console.log("New Garden: ", stringify(newGarden))

    if (
        (typeof newGarden.location?.lattitude) !== 'number' || 
        (typeof newGarden.location?.longitude) !== 'number'
    ) {
        const gardenLatLong = await geocode(newGarden.location.cityStateAndCountry)
        newGarden.location.lattitude = gardenLatLong.lat
        newGarden.location.longitude = gardenLatLong.lng        
    }

    const newSteps = await createGardenPlanSteps(newGarden)
    const firstNewStep: Schema["PlannedStep"]["createType"]["step"] = newSteps.steps[0]
    console.log("New Steps:\n", stringify(newSteps))
}

main()