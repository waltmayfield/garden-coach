// import { z } from "zod";
// import { Schema } from '../amplify/data/resource';

// const xY = z.object({
//     x: z.number(),
//     y: z.number()
// })

// // schema.data.types.Garden

// export const createGardenType = z.object({
//     name: z.string(),
//     objective: z.string(),
//     location: z.object({
//         cityStateAndCountry: z.string(),
//         lattitude: z.number(),
//         longitude: z.number()
//     }),
//     perimeterPoints: z.array(xY.nullable()).nullable(),
//     northVector: xY,
//     units: z.enum(['imperial', 'metric']),
// })

// const zodStringDate = z.string()
//     .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format, should be YYYY-MM-DD")
//     .describe("The date in YYYY-MM-DD format")

// const plantRowType = z.object({
//     location: z.object({
//         start: xY,
//         end: xY
//     }),
//     species: z.string(),
//     plantSpacingInMeters: z.number(),
//     // plantDate: zodStringDate,
//     expectedHarvest: z.object({
//         date: zodStringDate,
//         amount: z.number(),
//         unit: z.string()
//     })
// })

// const stepType = z.object({
//     title: z.string(),
//     description: z.string(),
//     role: z.enum(['ai', 'human']),
//     // resources: z.array(z.string()),
//     plantRows: z.array(plantRowType),

// })

// export const plannedStepArrayType = z.object({
//     steps: z.array(z.object({
//         id: z.string().optional().describe("To update an existing step, provide the id of the step"),
//         step: stepType,
//         plannedDate: zodStringDate,
//     })),
//     explaination: z.string(),
// })

// export type PlannedStepArray = z.infer<typeof plannedStepArrayType>

// // const StepArrayType = z.object({
// //     steps: z.array(StepType),
// //     explaination: z.string(),
// // })

// // export const generateGarden = async (userPrompt: string) => {
// //     const gardenCreationModel = new ChatBedrockConverse({
// //         model: process.env.MODEL_ID
// //     }).withStructuredOutput(createGardenType, { includeRaw: true })

// //     const gardenCreationPrompt = ChatPromptTemplate.fromTemplate(
// //         `
// //         Create a new garden based on the user's prompt. Use the x coordinate for the longest side of the garden.

// //         <userPrompt>
// //         {userPrompt}
// //         </userPrompt>
// //         `,
// //     );

// //     const newGarden = await gardenCreationPrompt.pipe(gardenCreationModel).invoke({
// //         userPrompt
// //     })

// //     return newGarden.parsed
// // }

// // export const generateGardenPlanSteps = async (garden: Schema["Garden"]["createType"]) => {

// //     if (
// //         !garden.location ||
// //         !garden.location.lattitude ||
// //         !garden.location.longitude ||
// //         (typeof garden.location?.lattitude) !== 'number' ||
// //         (typeof garden.location?.longitude) !== 'number'
// //     ) throw new Error("Garden does not have lattitude and longitude. Garden:\n" + stringify(garden))

// //     const forecast = await getWeatherForecast({ lattitude: garden.location.lattitude, longitude: garden.location.longitude })

// //     const gardenStepPlannerModel = new ChatBedrockConverse({
// //         model: process.env.MODEL_ID
// //     }).withStructuredOutput(plannedStepArrayType, { includeRaw: true })

// //     if (!garden.perimeterPoints) {
// //         throw new Error("Garden does not have perimeter points")
// //     }

// //     const prompt = `
// //     The user has a garden with the following objective:
// //     <userObjective>
// //     {objective}
// //     </userObjective>

// //     With the earliest possible date of ${new Date().toISOString().split('T')[0]}, come up with a step by step plan to accomplish the objective.
// //     Try to fill the garden as much as possible with plants that will yield the most food.
// //     Include all of the steps required over the course of a year.

// //     The weather forecast is:
// //     ${stringify(forecast)}

// //     The garden has perimeter points (meters):
// //     ${garden.perimeterPoints.map((point) => `(${point?.x}, ${point?.y})`).join(", ")}
// //     `

// //     console.log("Prompt: ", prompt)

// //     const plannerPrompt = ChatPromptTemplate.fromTemplate(prompt);

// //     const gandenStepPlannerWithPrompt = plannerPrompt.pipe(gardenStepPlannerModel);

// //     const newPlanSteps = await gandenStepPlannerWithPrompt.invoke({
// //         objective: garden.objective
// //     })

// //     return newPlanSteps.parsed
// // }


// const typeChecks = async () => {
//     const generatedGarden: Schema["Garden"]["createType"] = await generateGarden("Maximize food production")
//     // // const generatedGarden: CreateGardenInput = await generateGarden("Maximize food production")
//     // const newSteps = await generateGardenPlanSteps(generatedGarden as Schema["Garden"]["createType"])
//     const firstNewStep: Schema["PlannedStep"]["createType"]["step"] = {} as PlannedStepArray["steps"][number]["step"]


//     // if (!generatedGarden.perimeterPoints) throw new Error ("Generated garden does not have perimeter points")
//     // if (generatedGarden.perimeterPoints?.some((point) => !point)) throw new Error("Generated garden has null perimeter points")
    
//     // const dummyGeneratedGarden: CreateGardenInput = {
//     //     name: "testName",
//     //     location: {
//     //         cityStateAndCountry: "Austin, Texas, USA",
//     //         lattitude: 30.2672,
//     //         longitude: -97.7431
//     //     },
//     //     perimeterPoints: [
//     //         { x: 0, y: 0 },
//     //         { x: 0, y: 8 },
//     //         { x: 2, y: 8 },
//     //         { x: 2, y: 0 }
//     //     ]
//     // } 

//     // const createGardenResponse = await amplifyClient.graphql({
//     //     query: createGarden,
//     //     variables: { input: dummyGeneratedGarden}
//     // })

//     // const createGardenResponse = await amplifyClient.graphql({
//     //     query: createGarden,
//     //     variables: { input: generatedGarden as CreateGardenInput}
//     // })

//     // return createGardenResponse.data?.createGarden
// }