import { a } from '@aws-amplify/backend';

/**
 * Garden Schema
 * Models for garden planning, plant lifecycle tracking, and step preview simulations
 */
export const gardenSchema = a.schema({
  GardenType: a.enum(['raised_bed', 'in_ground', 'container', 'greenhouse', 'indoor', 'other']),
  SunExposure: a.enum(['full_sun', 'partial_sun', 'partial_shade', 'full_shade']),
  SoilType: a.enum(['clay', 'loam', 'sand', 'silt', 'mix', 'unknown']),
  WaterSource: a.enum(['hose', 'drip', 'rain', 'well', 'municipal', 'other']),
  CoordinateSystem: a.enum(['meters', 'feet']),

  ZoneType: a.enum(['bed', 'row', 'container', 'section', 'other']),

  CropCategory: a.enum(['vegetable', 'fruit', 'herb', 'flower', 'other']),
  SeedType: a.enum(['hybrid', 'heirloom', 'open_pollinated']),

  PlantingStatus: a.enum(['planned', 'seeded', 'germinated', 'transplanted', 'growing', 'harvesting', 'finished', 'failed']),
  PlacementAnchor: a.enum(['center', 'top_left', 'top_right', 'bottom_left', 'bottom_right']),

  TaskType: a.enum(['water', 'fertilize', 'prune', 'weed', 'harvest', 'pest_control', 'plant', 'transplant', 'mulch', 'other']),
  TaskStatus: a.enum(['pending', 'in_progress', 'completed', 'skipped', 'cancelled']),
  TaskPriority: a.enum(['low', 'medium', 'high']),

  HarvestUnit: a.enum(['lbs', 'oz', 'kg', 'g', 'count', 'bunches', 'heads', 'other']),
  HarvestQuality: a.enum(['excellent', 'good', 'fair', 'poor']),

  Season: a.enum(['spring', 'summer', 'fall', 'winter', 'year_round']),

  PlanStepActionType: a.enum(['plant', 'transplant', 'harvest', 'remove', 'prune', 'thin', 'amend_soil', 'irrigate', 'other']),
  PlanStepStatus: a.enum(['proposed', 'approved', 'applied', 'skipped']),
  SnapshotType: a.enum(['before_step', 'after_step']),
  SnapshotGeneratedBy: a.enum(['system', 'user', 'agent']),

  Garden: a
    .model({
      name: a.string().required(),
      description: a.string(),
      type: a.ref('GardenType').required(),
      dimensions: a.json(),
      sunExposure: a.ref('SunExposure'),
      yAxisDegrees: a.float().default(0),
      defaultViewRotationDegrees: a.float().default(0),
      soilType: a.ref('SoilType'),
      waterSource: a.ref('WaterSource'),
      location: a.json(),
      coordinateSystem: a.ref('CoordinateSystem'),
      isActive: a.boolean().default(true),

      zones: a.hasMany('GardenZone', 'gardenId'),
      plantings: a.hasMany('Planting', 'gardenId'),
      tasks: a.hasMany('Task', 'gardenId'),
      plans: a.hasMany('PlantingPlan', 'gardenId'),
      planSteps: a.hasMany('PlanStep', 'gardenId'),
      previewSnapshots: a.hasMany('PlanPreviewSnapshot', 'gardenId'),
    })
    .secondaryIndexes((index) => [index('type'), index('coordinateSystem')])
    .authorization((allow) => [allow.owner(), allow.authenticated()]),

  GardenZone: a
    .model({
      gardenId: a.id().required(),
      garden: a.belongsTo('Garden', 'gardenId'),

      name: a.string().required(),
      zoneType: a.ref('ZoneType').required(),
      geometry: a.json().required(),
      displayOrder: a.integer().default(0),
      isActive: a.boolean().default(true),

      plantings: a.hasMany('Planting', 'zoneId'),
    })
    .secondaryIndexes((index) => [index('gardenId').sortKeys(['displayOrder'])])
    .authorization((allow) => [allow.owner(), allow.authenticated()]),

  Crop: a
    .model({
      commonName: a.string().required(),
      scientificName: a.string(),
      category: a.ref('CropCategory').required(),
      growingInfo: a.json(),
      temperatureTolerance: a.json(),
      plantingSchedule: a.json(),
      yieldInfo: a.json(),
      companionPlantCropIds: a.id().array(),
      antagonistPlantCropIds: a.id().array(),
      imageUrl: a.string(),
      description: a.string(),

      varieties: a.hasMany('Variety', 'cropId'),
      plantings: a.hasMany('Planting', 'cropId'),
    })
    .secondaryIndexes((index) => [index('commonName'), index('category')])
    .authorization((allow) => [allow.owner(), allow.authenticated(), allow.guest().to(['read'])]),

  Variety: a
    .model({
      cropId: a.id().required(),
      crop: a.belongsTo('Crop', 'cropId'),
      varietyName: a.string().required(),
      commonName: a.string(),
      scientificName: a.string(),
      seedType: a.ref('SeedType'),
      growingInfo: a.json(),
      temperatureTolerance: a.json(),
      growthHabit: a.string(),
      fruitSize: a.string(),
      fruitDescription: a.string(),
      flavorProfile: a.string(),
      diseaseResistance: a.string().array(),
      bestUses: a.string().array(),
      specialCharacteristics: a.string(),
      yieldInfo: a.json(),
      sourceUrls: a.string().array(),

      plantings: a.hasMany('Planting', 'varietyId'),
    })
    .secondaryIndexes((index) => [index('cropId'), index('varietyName'), index('seedType')])
    .authorization((allow) => [allow.owner(), allow.authenticated(), allow.guest().to(['read'])]),

  Planting: a
    .model({
      gardenId: a.id().required(),
      garden: a.belongsTo('Garden', 'gardenId'),
      cropId: a.id().required(),
      crop: a.belongsTo('Crop', 'cropId'),
      varietyId: a.id(),
      variety: a.belongsTo('Variety', 'varietyId'),
      zoneId: a.id(),
      zone: a.belongsTo('GardenZone', 'zoneId'),

      quantity: a.integer(),
      rowLengthFt: a.float(),
      locationNote: a.string(),
      placement: a.json(),

      plantedDate: a.date(),
      germinationDate: a.date(),
      firstHarvestDate: a.date(),
      lastHarvestDate: a.date(),
      removedDate: a.date(),

      status: a.ref('PlantingStatus').required(),
      notes: a.string(),

      tasks: a.hasMany('Task', 'plantingId'),
      harvests: a.hasMany('Harvest', 'plantingId'),
    })
    .secondaryIndexes((index) => [
      index('gardenId').sortKeys(['plantedDate']),
      index('zoneId'),
      index('cropId'),
      index('varietyId'),
      index('status'),
    ])
    .authorization((allow) => [allow.owner(), allow.authenticated()]),

  Task: a
    .model({
      gardenId: a.id(),
      garden: a.belongsTo('Garden', 'gardenId'),
      plantingId: a.id(),
      planting: a.belongsTo('Planting', 'plantingId'),

      title: a.string().required(),
      description: a.string(),
      taskType: a.ref('TaskType').required(),

      dueDate: a.date(),
      scheduledTime: a.time(),

      status: a.ref('TaskStatus').required(),
      completedAt: a.datetime(),
      priority: a.ref('TaskPriority').required(),

      recurrence: a.json(),
    })
    .secondaryIndexes((index) => [index('gardenId').sortKeys(['dueDate']), index('status'), index('plantingId')])
    .authorization((allow) => [allow.owner(), allow.authenticated()]),

  Harvest: a
    .model({
      plantingId: a.id().required(),
      planting: a.belongsTo('Planting', 'plantingId'),

      harvestDate: a.date().required(),
      quantity: a.float().required(),
      unit: a.ref('HarvestUnit').required(),
      quality: a.ref('HarvestQuality'),
      notes: a.string(),
      imageUrl: a.string(),
    })
    .secondaryIndexes((index) => [index('plantingId').sortKeys(['harvestDate'])])
    .authorization((allow) => [allow.owner(), allow.authenticated()]),

  PlantingPlan: a
    .model({
      gardenId: a.id(),
      garden: a.belongsTo('Garden', 'gardenId'),

      name: a.string().required(),
      season: a.ref('Season').required(),
      year: a.integer().required(),

      isTemplate: a.boolean().default(false),
      isActive: a.boolean().default(true),

      crops: a.json(),
      previewStartDate: a.date(),
      simulationAssumptions: a.json(),
      notes: a.string(),

      steps: a.hasMany('PlanStep', 'plantingPlanId'),
      snapshots: a.hasMany('PlanPreviewSnapshot', 'plantingPlanId'),
    })
    .secondaryIndexes((index) => [index('gardenId'), index('season')])
    .authorization((allow) => [allow.owner(), allow.authenticated()]),

  PlanStep: a
    .model({
      plantingPlanId: a.id().required(),
      plantingPlan: a.belongsTo('PlantingPlan', 'plantingPlanId'),
      gardenId: a.id().required(),
      garden: a.belongsTo('Garden', 'gardenId'),

      stepNumber: a.integer().required(),
      actionType: a.ref('PlanStepActionType').required(),
      status: a.ref('PlanStepStatus'),

      effectiveDate: a.date(),
      title: a.string().required(),
      description: a.string(),

      target: a.json(),
      delta: a.json(),
      metadata: a.json(),

      snapshots: a.hasMany('PlanPreviewSnapshot', 'planStepId'),
    })
    .secondaryIndexes((index) => [
      index('plantingPlanId'),
      index('stepNumber'),
      index('gardenId'),
      index('actionType'),
      index('status'),
      index('effectiveDate'),
    ])
    .authorization((allow) => [allow.owner(), allow.authenticated()]),

  PlanPreviewSnapshot: a
    .model({
      plantingPlanId: a.id().required(),
      plantingPlan: a.belongsTo('PlantingPlan', 'plantingPlanId'),
      planStepId: a.id().required(),
      planStep: a.belongsTo('PlanStep', 'planStepId'),
      gardenId: a.id().required(),
      garden: a.belongsTo('Garden', 'gardenId'),

      snapshotType: a.ref('SnapshotType').required(),
      asOfDate: a.date().required(),

      renderedState: a.json().required(),
      changeSummary: a.json(),

      generatedBy: a.ref('SnapshotGeneratedBy').required(),
      generatedAt: a.datetime(),
    })
    .secondaryIndexes((index) => [index('plantingPlanId'), index('planStepId'), index('gardenId')])
    .authorization((allow) => [allow.owner(), allow.authenticated()]),
});
