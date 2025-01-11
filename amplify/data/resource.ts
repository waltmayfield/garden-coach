import { type ClientSchema, a, defineData, defineFunction  } from '@aws-amplify/backend';
import { createZodSchema } from './amplifyToZod'

const generateGardenPlanStepsFunction = defineFunction({
  name: 'generateGardenPlanSteps',
  entry: '../functions/generateGardenPlanStepsHandler.ts',
  timeoutSeconds: 900,
  environment: {
    MODEL_ID: 'us.anthropic.claude-3-sonnet-20240229-v1:0',
  }
});

export const schema = a.schema({
  XY: a.customType({
    x: a.float(),
    y: a.float(),
  }),

  PlantRow: a.customType({
    location: a.customType({
      start: a.ref('XY'),
      end: a.ref('XY'),
    }),
    species: a.string(),
    plantSpacing: a.float(),
    plantDate: a.date()
  }),

  Step: a.customType({
    title: a.string().required(),
    description: a.string(),
    role: a.enum(['ai', 'human']),
    result: a.string(),
    plantRows: a.ref('PlantRow').array(),
  }),

  PlannedStep: a.model({
    gardenId: a.id(),
    garden: a.belongsTo('Garden', 'gardenId'),
    plantRowId: a.id(),
    plantedPlantRow: a.belongsTo('PlantedPlantRow', 'plantRowId'),
    step: a.ref('Step'),
    plannedDate: a.date(),
  })
    .authorization((allow) => [allow.owner()]),

  PastStep: a.model({
    gardenId: a.id(),
    garden: a.belongsTo('Garden', 'gardenId'),
    plantRowId: a.id(),
    plantedPlantRow: a.belongsTo('PlantedPlantRow', 'plantRowId'),
    step: a.ref('Step'),
    completedDate: a.date(),
    notes: a.string(),
  })
    .authorization((allow) => [allow.owner()]),

  Garden: a.model({
    name: a.string(),
    objective: a.string(),
    zipCode: a.string(),
    perimeterPoints: a.ref('XY').array(),
    units: a.enum(['imperial', 'metric']),
    plantedPlantRow: a.hasMany('PlantedPlantRow', 'gardenId'),
    plannedSteps: a.hasMany('PlannedStep', 'gardenId'),
    pastSteps: a.hasMany('PastStep', 'gardenId'),
  })
    .authorization((allow) => [allow.owner()]),

  PlantedPlantRow: a.model({
    gardenId: a.id(),
    garden: a.belongsTo('Garden', 'gardenId'),
    info: a.ref('PlantRow'),
    plannedSteps: a.hasMany('PlannedStep', 'plantRowId'),
    pastSteps: a.hasMany('PastStep', 'plantRowId'),
  })
    .authorization((allow) => [allow.owner()]),
  
  generateGardenPlanSteps: a.query()
    .arguments({gardenId: a.id().required()})
    .returns(a.ref('Step').array())
    .handler(a.handler.function(generateGardenPlanStepsFunction))
    .authorization((allow) => [allow.authenticated()]),
})
.authorization((allow) => [allow.resource(generateGardenPlanStepsFunction)]);

export type Schema = ClientSchema<typeof schema>;

// const zodSchema = createZodSchema(schema.data.types.Garden.identifier)

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});
