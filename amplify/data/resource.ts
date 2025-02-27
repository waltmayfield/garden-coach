import { type ClientSchema, a, defineData, defineFunction } from '@aws-amplify/backend';
import { GardenUnits } from '../functions/graphql/API';
// import { createZodSchema } from './amplifyToZod'

// export const generateGardenPlanStepsFunction = defineFunction({
//   name: 'generateGardenPlanSteps',
//   entry: '../functions/generateGardenPlanStepsHandler.ts',
//   timeoutSeconds: 900,
//   environment: {
//     MODEL_ID: 'us.anthropic.claude-3-5-sonnet-20241022-v2:0'
//     // MODEL_ID: 'us.anthropic.claude-3-sonnet-20240229-v1:0',
//     // MODEL_ID: 'us.amazon.nova-pro-v1:0'
//   }
// });

export const generateGardenFunction = defineFunction({
  name: 'generateGarden',
  entry: '../functions/generateGarden/generateGardenHandler.ts',
  timeoutSeconds: 900,
  environment: {
    // MODEL_ID: 'us.anthropic.claude-3-5-sonnet-20241022-v2:0'
    MODEL_ID: 'us.anthropic.claude-3-5-haiku-20241022-v1:0'
    // MODEL_ID: 'us.anthropic.claude-3-sonnet-20240229-v1:0',
    // MODEL_ID: 'us.amazon.nova-pro-v1:0'
  }
});

export const schema = a.schema({
  XY: a.customType({
    x: a.float().required(),
    y: a.float().required(),
  }),

  harvest: a.customType({
    first: a.date(),
    days: a.integer(),
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
    variety: a.string(),
    plantSpacingInMeters: a.float(),
    plantDate: a.date(),
    harvest: a.ref('harvest'),
    perrenial: a.boolean(),
  }),

  Step: a.customType({
    title: a.string().required(),
    description: a.string(),
    role: a.enum(['ai', 'human']),
    result: a.string(),
    plantRows: a.ref('PlantRow').array(),
  }),

  // ChatSession: a.model({
  //   messages: a.hasMany("ChatMessage", "chatSessionId"),
  // })
  //   .authorization((allow) => [allow.owner(), allow.authenticated()]),

  ChatMessage: a
    .model({
      gardenId: a.id(),
      garden: a.belongsTo("Garden", 'gardenId'),

      //Chat message fields
      content: a.customType({
        text: a.string(),
        // proposedSteps: a.ref('Step').array(),
        // proposedGardenUpdate: a.ref('Garden'),
      }),
      role: a.enum(["human", "ai", "tool"]),
      responseComplete: a.boolean(),

      //auto-generated fields
      owner: a.string(),
      createdAt: a.datetime(),

      //langchain fields
      toolCallId: a.string(),
      toolName: a.string(),
      toolCalls: a.string(),

      //context fields
      contextStepId: a.string(),
    })
    .secondaryIndexes((index) => [
      index("gardenId").sortKeys(["createdAt"])
    ])
    .authorization((allow) => [allow.owner(), allow.authenticated()]),

  //These assets enable token level streaming from the model
  ResponseStreamChunk: a.customType({
    chunkText: a.string().required(),
    index: a.integer().required(),
    gardenId: a.string().required()
  }),

  DummyModelToAddIamDirective: a.model({//This is required to add the IAM directive to the ResponseStreamChunk type
    responseStreamChunk: a.ref('ResponseStreamChunk')
  })
    .authorization((allow) => [allow.owner()]),

  PlannedStep: a.model({
    id: a.id(),
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
    messages: a.hasMany("ChatMessage", "gardenId"),
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

  publishResponseStreamChunk: a.mutation()
    .arguments({
      chunkText: a.string().required(),
      index: a.integer().required(),
      gardenId: a.string().required(),
    })
    .returns(a.ref('ResponseStreamChunk'))
    // .returns(a.string())
    .handler(a.handler.custom({ entry: './publishMessageStreamChunk.js' }))
    .authorization(allow => [allow.authenticated()]),

  recieveResponseStreamChunk: a
    .subscription()
    .for(a.ref('publishResponseStreamChunk'))
    .arguments({ gardenId: a.string().required() })
    .handler(a.handler.custom({ entry: './receiveMessageStreamChunk.js' }))
    .authorization(allow => [allow.authenticated()]),

  generateGarden: a.query()
    .arguments({ gardenId: a.id().required(), userInput: a.string().required() })
    // .returns(a.ref('Garden'))
    .handler(a.handler.function(generateGardenFunction).async())
    .authorization((allow) => [allow.authenticated()]),

  // generateGardenPlanSteps: a.query()
  //   .arguments({ gardenId: a.id().required() })
  //   // .returns(a.ref('Step').array())
  //   .handler(a.handler.function(generateGardenPlanStepsFunction).async())
  //   .authorization((allow) => [allow.authenticated()]),

})
  .authorization((allow) => [
    // allow.resource(generateGardenPlanStepsFunction),
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
