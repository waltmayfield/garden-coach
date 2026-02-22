import { tool } from 'ai';
import { z } from 'zod';
import { getConfiguredAmplifyClient } from './amplifyUtils';

const mutations = {
  createGarden: /* GraphQL */ `
    mutation CreateGarden($input: CreateGardenInput!) {
      createGarden(input: $input) {
        id
        name
        description
        type
        coordinateSystem
        yAxisDegrees
        defaultViewRotationDegrees
        isActive
      }
    }
  `,
  createPlantingPlan: /* GraphQL */ `
    mutation CreatePlantingPlan($input: CreatePlantingPlanInput!) {
      createPlantingPlan(input: $input) {
        id
        gardenId
        name
        season
        year
        isTemplate
        isActive
        previewStartDate
        notes
      }
    }
  `,
  createPlanStep: /* GraphQL */ `
    mutation CreatePlanStep($input: CreatePlanStepInput!) {
      createPlanStep(input: $input) {
        id
        plantingPlanId
        gardenId
        stepNumber
        actionType
        status
        effectiveDate
        title
        description
        target
        delta
      }
    }
  `,
  updatePlanStep: /* GraphQL */ `
    mutation UpdatePlanStep($input: UpdatePlanStepInput!) {
      updatePlanStep(input: $input) {
        id
        stepNumber
        actionType
        status
        effectiveDate
        title
        description
        target
        delta
      }
    }
  `,
  createTask: /* GraphQL */ `
    mutation CreateTask($input: CreateTaskInput!) {
      createTask(input: $input) {
        id
        gardenId
        plantingId
        title
        description
        taskType
        dueDate
        status
        priority
      }
    }
  `,
};

function jsonStringifyIfNeeded(value: unknown): string | undefined {
  if (value === undefined) return undefined;
  if (typeof value === 'string') return value;
  return JSON.stringify(value);
}

async function runMutation(query: string, input: Record<string, unknown>) {
  const client = getConfiguredAmplifyClient();
  const result = await client.graphql({
    query,
    variables: { input },
  });

  const errors = 'errors' in result ? result.errors : undefined;
  if (errors && errors.length > 0) {
    throw new Error(errors.map((error: { message?: string }) => error.message).filter(Boolean).join('; '));
  }

  return 'data' in result ? result.data : null;
}

export const mutationTools = {
  'create-garden': tool({
    description: 'Create a garden with orientation and coordinate settings.',
    inputSchema: z.object({
      name: z.string(),
      description: z.string().optional(),
      type: z.enum(['raised_bed', 'in_ground', 'container', 'greenhouse', 'indoor', 'other']),
      dimensions: z.record(z.string(), z.unknown()).optional(),
      sunExposure: z.enum(['full_sun', 'partial_sun', 'partial_shade', 'full_shade']).optional(),
      yAxisDegrees: z.number().optional(),
      defaultViewRotationDegrees: z.number().optional(),
      soilType: z.enum(['clay', 'loam', 'sand', 'silt', 'mix', 'unknown']).optional(),
      waterSource: z.enum(['hose', 'drip', 'rain', 'well', 'municipal', 'other']).optional(),
      location: z.record(z.string(), z.unknown()).optional(),
      coordinateSystem: z.enum(['meters', 'feet']).optional(),
      isActive: z.boolean().optional(),
    }),
    execute: async (params) => {
      const input = {
        ...params,
        dimensions: jsonStringifyIfNeeded(params.dimensions),
        location: jsonStringifyIfNeeded(params.location),
      };

      return runMutation(mutations.createGarden, input);
    },
  }),

  'create-planting-plan': tool({
    description: 'Create a planting plan for a garden and season.',
    inputSchema: z.object({
      gardenId: z.string().optional(),
      name: z.string(),
      season: z.enum(['spring', 'summer', 'fall', 'winter', 'year_round']),
      year: z.number().int(),
      isTemplate: z.boolean().optional(),
      isActive: z.boolean().optional(),
      crops: z.record(z.string(), z.unknown()).optional(),
      previewStartDate: z.string().optional(),
      simulationAssumptions: z.record(z.string(), z.unknown()).optional(),
      notes: z.string().optional(),
    }),
    execute: async (params) => {
      const input = {
        ...params,
        crops: jsonStringifyIfNeeded(params.crops),
        simulationAssumptions: jsonStringifyIfNeeded(params.simulationAssumptions),
      };

      return runMutation(mutations.createPlantingPlan, input);
    },
  }),

  'create-plan-step': tool({
    description: 'Create a proposed step for a planting plan timeline preview.',
    inputSchema: z.object({
      plantingPlanId: z.string(),
      gardenId: z.string(),
      stepNumber: z.number().int(),
      actionType: z.enum(['plant', 'transplant', 'harvest', 'remove', 'prune', 'thin', 'amend_soil', 'irrigate', 'other']),
      status: z.enum(['proposed', 'approved', 'applied', 'skipped']).optional(),
      effectiveDate: z.string().optional(),
      title: z.string(),
      description: z.string().optional(),
      target: z.record(z.string(), z.unknown()).optional(),
      delta: z.record(z.string(), z.unknown()).optional(),
      metadata: z.record(z.string(), z.unknown()).optional(),
    }),
    execute: async (params) => {
      const input = {
        ...params,
        target: jsonStringifyIfNeeded(params.target),
        delta: jsonStringifyIfNeeded(params.delta),
        metadata: jsonStringifyIfNeeded(params.metadata),
      };

      return runMutation(mutations.createPlanStep, input);
    },
  }),

  'update-plan-step': tool({
    description: 'Update an existing plan step (status, schedule, or content).',
    inputSchema: z.object({
      id: z.string(),
      stepNumber: z.number().int().optional(),
      actionType: z.enum(['plant', 'transplant', 'harvest', 'remove', 'prune', 'thin', 'amend_soil', 'irrigate', 'other']).optional(),
      status: z.enum(['proposed', 'approved', 'applied', 'skipped']).optional(),
      effectiveDate: z.string().optional(),
      title: z.string().optional(),
      description: z.string().optional(),
      target: z.record(z.string(), z.unknown()).optional(),
      delta: z.record(z.string(), z.unknown()).optional(),
      metadata: z.record(z.string(), z.unknown()).optional(),
    }),
    execute: async (params) => {
      const input = {
        ...params,
        target: jsonStringifyIfNeeded(params.target),
        delta: jsonStringifyIfNeeded(params.delta),
        metadata: jsonStringifyIfNeeded(params.metadata),
      };

      return runMutation(mutations.updatePlanStep, input);
    },
  }),

  'create-task': tool({
    description: 'Create a garden task linked to a garden or planting.',
    inputSchema: z.object({
      gardenId: z.string().optional(),
      plantingId: z.string().optional(),
      title: z.string(),
      description: z.string().optional(),
      taskType: z.enum(['water', 'fertilize', 'prune', 'weed', 'harvest', 'pest_control', 'plant', 'transplant', 'mulch', 'other']),
      dueDate: z.string().optional(),
      scheduledTime: z.string().optional(),
      status: z.enum(['pending', 'in_progress', 'completed', 'skipped', 'cancelled']),
      completedAt: z.string().optional(),
      priority: z.enum(['low', 'medium', 'high']),
      recurrence: z.record(z.string(), z.unknown()).optional(),
    }),
    execute: async (params) => {
      const input = {
        ...params,
        recurrence: jsonStringifyIfNeeded(params.recurrence),
      };

      return runMutation(mutations.createTask, input);
    },
  }),
} as const;
