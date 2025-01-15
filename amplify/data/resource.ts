import { type ClientSchema, a, defineData, defineFunction } from '@aws-amplify/backend';
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
    x: a.float().required(),
    y: a.float().required(),
  }),

  PlantRow: a.customType({
    location: a.customType({
      start: a.ref('XY'),
      end: a.ref('XY'),
    }),
    species: a.string(),
    plantSpacingInMeters: a.float(),
    plantDate: a.date()
  }),

  Step: a.customType({
    title: a.string().required(),
    description: a.string(),
    role: a.enum(['ai', 'human']),
    result: a.string(),
    plantRows: a.ref('PlantRow').array(),
  }),

  ChatSession: a.model({
    messages: a.hasMany("ChatMessage", "chatSessionId"),
  })
    .authorization((allow) => [allow.owner()]),

  ChatMessage: a
    .model({
      chatSessionId: a.id(),
      session: a.belongsTo("ChatSession", "chatSessionId"),
      content: a.customType({
        text: a.string(),
        proposedSteps: a.ref('Step').array()
      }),
      role: a.enum(["human", "ai", "tool"]),
      owner: a.string(),
      createdAt: a.datetime()
    })
    .secondaryIndexes((index) => [
      index("chatSessionId").sortKeys(["createdAt"])
    ])
    .authorization((allow) => [allow.owner(), allow.authenticated()]),

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
    name: a.string().required(),
    objective: a.string(),
    location: a.customType({
      cityStateAndCountry: a.string().required(),
      lattitude: a.float(),
      longitude: a.float()
    }),
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
    .arguments({ gardenId: a.id().required() })
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
