import { type ClientSchema, a, defineData, defineFunction } from '@aws-amplify/backend';
// import { createZodSchema } from './amplifyToZod'

export const generateGardenPlanStepsFunction = defineFunction({
  name: 'generateGardenPlanSteps',
  entry: '../functions/generateGardenPlanStepsHandler.ts',
  timeoutSeconds: 900,
  environment: {
    MODEL_ID: 'us.anthropic.claude-3-5-sonnet-20241022-v2:0'
    // MODEL_ID: 'us.anthropic.claude-3-sonnet-20240229-v1:0',
    // MODEL_ID: 'us.amazon.nova-pro-v1:0'
  }
});

export const generateGardenFunction = defineFunction({
  name: 'generateGarden',
  entry: '../functions/generateGarden/generateGardenHandler.ts',
  timeoutSeconds: 900,
  environment: {
    MODEL_ID: 'us.anthropic.claude-3-5-sonnet-20241022-v2:0'
    // MODEL_ID: 'us.anthropic.claude-3-sonnet-20240229-v1:0',
    // MODEL_ID: 'us.amazon.nova-pro-v1:0'
  }
});

export const schema = a.schema({
  XY: a.customType({
    x: a.float().required(),
    y: a.float().required(),
  }),

  expectedHarvest: a.customType({
    date: a.date(),
    amount: a.float(),
    unit: a.string(),
  }),

  rowLocation: a.customType({
    start: a.ref('XY').required(),
    end: a.ref('XY').required(),
  }),

  latLongLocation: a.customType({
    cityStateAndCountry: a.string().required(),
    lattitude: a.float(),
    longitude: a.float()
  }),

  PlantRow: a.customType({
    location: a.ref('rowLocation'),
    species: a.string(),
    plantSpacingInMeters: a.float(),
    plantDate: a.date(),
    expectedHarvest: a.ref('expectedHarvest')
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
    .authorization((allow) => [allow.owner(), allow.authenticated()]),

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
    owner: a.string(),
  })
    .authorization((allow) => [allow.owner(), allow.authenticated()]),

  PastStep: a.model({
    gardenId: a.id(),
    garden: a.belongsTo('Garden', 'gardenId'),
    plantRowId: a.id(),
    plantedPlantRow: a.belongsTo('PlantedPlantRow', 'plantRowId'),
    step: a.ref('Step'),
    completedDate: a.date(),
    notes: a.string(),
    owner: a.string(),
  })
    .authorization((allow) => [allow.owner(), allow.authenticated()]),

  Garden: a.model({
    name: a.string(),
    objective: a.string(),
    location: a.ref('latLongLocation'),
    perimeterPoints: a.ref('XY').array(),
    northVector: a.ref('XY'),
    units: a.enum(['imperial', 'metric']),
    plantedPlantRow: a.hasMany('PlantedPlantRow', 'gardenId'),
    plannedSteps: a.hasMany('PlannedStep', 'gardenId'),
    pastSteps: a.hasMany('PastStep', 'gardenId'),
  })
    .authorization((allow) => [allow.owner(), allow.authenticated()]),

  PlantedPlantRow: a.model({
    gardenId: a.id(),
    garden: a.belongsTo('Garden', 'gardenId'),
    info: a.ref('PlantRow'),
    plannedSteps: a.hasMany('PlannedStep', 'plantRowId'),
    pastSteps: a.hasMany('PastStep', 'plantRowId'),
  })
    .authorization((allow) => [allow.owner(), allow.authenticated()]),

  generateGarden: a.query()
    .arguments({ gardenId: a.id().required(), userInput: a.string().required() })
    // .returns(a.ref('Garden'))
    .handler(a.handler.function(generateGardenFunction).async())
    .authorization((allow) => [allow.authenticated()]),

  generateGardenPlanSteps: a.query()
    .arguments({ gardenId: a.id().required() })
    // .returns(a.ref('Step').array())
    .handler(a.handler.function(generateGardenPlanStepsFunction).async())
    .authorization((allow) => [allow.authenticated()]),
  
})
  .authorization((allow) => [
    allow.resource(generateGardenPlanStepsFunction),
    allow.resource(generateGardenFunction)
  ]);

export type Schema = ClientSchema<typeof schema>;

// const zodSchema = createZodSchema(schema.data.types.Garden.identifier)

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});
