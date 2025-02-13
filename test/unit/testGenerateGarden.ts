// import { stringify } from 'yaml'

// import { Schema } from '../../amplify/data/resource';

// // import { generateGarden, generateGardenPlanSteps } from '../../utils/amplifyStrucutedOutputs';
// import { geocode, getWeatherForecast } from '../../utils/weather';

// // process.env.MODEL_ID = 'us.amazon.nova-pro-v1:0'
// process.env.MODEL_ID = 'us.anthropic.claude-3-5-sonnet-20241022-v2:0'

// const main = async () => {
//     const newGarden: Schema["Garden"]["createType"] = await generateGarden(`
//         I have a two meter by 8 meter garden bed. North is is the direction of the two meter side.
//         It is in Austin Texas, USA.
//         My family has three members and I would like as much of our food to come from this garden as possible.
//         Maximize the yield of vegtables and fill the garden as much as possible.
//         `)
//     console.log("New Garden: ", stringify(newGarden))
    
//     if (!newGarden.location) throw new Error("New garden does not have a location")

//     if (
//         (typeof newGarden.location?.lattitude) !== 'number' || 
//         (typeof newGarden.location?.longitude) !== 'number'
//     ) {
//         console.log("Geocoding garden location: ", newGarden.location.cityStateAndCountry)
//         const gardenLatLong = await geocode(newGarden.location.cityStateAndCountry)
//         newGarden.location.lattitude = gardenLatLong.lat
//         newGarden.location.longitude = gardenLatLong.lng        
//     }

//     const newSteps = await generateGardenPlanSteps(newGarden)
//     const firstNewStep: Schema["PlannedStep"]["createType"]["step"] = newSteps.steps[0].step
//     console.log("New Steps:\n", stringify(newSteps))

// }

// main()