import { type ClientSchema, a, defineData, defineFunction  } from '@aws-amplify/backend';

const generateGardenPlanStepsFunction = defineFunction({
  name: 'generateGardenPlanSteps',
  entry: '../functions/generateGardenPlanStepsHandler.ts',
  timeoutSeconds: 900,
  environment: {
    MODEL_ID: 'us.anthropic.claude-3-sonnet-20240229-v1:0',
  }
});

const schema = a.schema({
  XY: a.customType({
    x: a.float(),
    y: a.float(),
  }),

  Step: a.customType({
    title: a.string(),
    description: a.string(),
    role: a.enum(['ai', 'human']),
    result: a.string()
  }),

  PlannedStep: a.model({
    gardenId: a.id(),
    garden: a.belongsTo('Garden', 'gardenId'),
    plantRowId: a.id(),
    plantRow: a.belongsTo('PlantRow', 'plantRowId'),
    step: a.ref('Step'),
    plannedDate: a.date(),
  })
    .authorization((allow) => [allow.owner()]),

  PastStep: a.model({
    gardenId: a.id(),
    garden: a.belongsTo('Garden', 'gardenId'),
    plantRowId: a.id(),
    plantRow: a.belongsTo('PlantRow', 'plantRowId'),
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
    plantRows: a.hasMany('PlantRow', 'gardenId'),
    plannedSteps: a.hasMany('PlannedStep', 'gardenId'),
    pastSteps: a.hasMany('PastStep', 'gardenId'),
  })
    .authorization((allow) => [allow.owner()]),

  PlantRow: a.model({
    gardenId: a.id(),
    garden: a.belongsTo('Garden', 'gardenId'),
    location: a.customType({
      start: a.ref('XY'),
      end: a.ref('XY'),
    }),
    species: a.string(),
    plantSpacing: a.float(),
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

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});
