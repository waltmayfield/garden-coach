import { tool } from 'ai';
import { z } from 'zod';
import { getConfiguredAmplifyClient } from './amplifyUtils';

const queries = {
  listCrops: /* GraphQL */ `
    query ListCrops($filter: ModelCropFilterInput, $limit: Int, $nextToken: String) {
      listCrops(filter: $filter, limit: $limit, nextToken: $nextToken) {
        items {
          id
          commonName
          scientificName
          category
          growingInfo
          temperatureTolerance
          plantingSchedule
          yieldInfo
          description
          imageUrl
        }
        nextToken
      }
    }
  `,
  getCrop: /* GraphQL */ `
    query GetCrop($id: ID!) {
      getCrop(id: $id) {
        id
        commonName
        scientificName
        category
        growingInfo
        temperatureTolerance
        plantingSchedule
        yieldInfo
        description
        imageUrl
      }
    }
  `,
  listVarieties: /* GraphQL */ `
    query ListVarieties($filter: ModelVarietyFilterInput, $limit: Int, $nextToken: String) {
      listVarieties(filter: $filter, limit: $limit, nextToken: $nextToken) {
        items {
          id
          cropId
          varietyName
          commonName
          seedType
          growingInfo
          temperatureTolerance
          growthHabit
          yieldInfo
        }
        nextToken
      }
    }
  `,
  getVariety: /* GraphQL */ `
    query GetVariety($id: ID!) {
      getVariety(id: $id) {
        id
        cropId
        varietyName
        commonName
        scientificName
        seedType
        growingInfo
        temperatureTolerance
        growthHabit
        fruitSize
        fruitDescription
        flavorProfile
        diseaseResistance
        bestUses
        specialCharacteristics
        yieldInfo
        sourceUrls
      }
    }
  `,
  listGardens: /* GraphQL */ `
    query ListGardens($filter: ModelGardenFilterInput, $limit: Int, $nextToken: String) {
      listGardens(filter: $filter, limit: $limit, nextToken: $nextToken) {
        items {
          id
          name
          description
          type
          coordinateSystem
          yAxisDegrees
          defaultViewRotationDegrees
          isActive
        }
        nextToken
      }
    }
  `,
  listPlantingPlans: /* GraphQL */ `
    query ListPlantingPlans($filter: ModelPlantingPlanFilterInput, $limit: Int, $nextToken: String) {
      listPlantingPlans(filter: $filter, limit: $limit, nextToken: $nextToken) {
        items {
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
        nextToken
      }
    }
  `,
  listPlanSteps: /* GraphQL */ `
    query ListPlanSteps($filter: ModelPlanStepFilterInput, $limit: Int, $nextToken: String) {
      listPlanSteps(filter: $filter, limit: $limit, nextToken: $nextToken) {
        items {
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
        nextToken
      }
    }
  `,
};

async function runQuery(query: string, variables?: Record<string, unknown>) {
  const client = getConfiguredAmplifyClient();
  const result = await client.graphql({
    query,
    variables,
  });

  const data = 'data' in result ? result.data : null;
  const errors = 'errors' in result ? result.errors : undefined;

  if (errors && errors.length > 0) {
    throw new Error(errors.map((error: { message?: string }) => error.message).filter(Boolean).join('; '));
  }

  return data;
}

export const queryTools = {
  'list-crops': tool({
    description: 'List crops in the catalog. Optionally filter by category.',
    inputSchema: z.object({
      category: z.enum(['vegetable', 'fruit', 'herb', 'flower', 'other']).optional(),
      limit: z.number().int().min(1).max(200).optional(),
      nextToken: z.string().optional(),
    }),
    execute: async ({ category, limit, nextToken }) => {
      const data = await runQuery(queries.listCrops, {
        filter: category ? { category: { eq: category } } : undefined,
        limit: limit ?? 100,
        nextToken,
      });

      return data;
    },
  }),

  'get-crop': tool({
    description: 'Get detailed information for a specific crop by ID.',
    inputSchema: z.object({
      id: z.string(),
    }),
    execute: async ({ id }) => {
      const data = await runQuery(queries.getCrop, { id });
      return data;
    },
  }),

  'list-varieties': tool({
    description: 'List crop varieties. Optionally filter by crop ID.',
    inputSchema: z.object({
      cropId: z.string().optional(),
      limit: z.number().int().min(1).max(200).optional(),
      nextToken: z.string().optional(),
    }),
    execute: async ({ cropId, limit, nextToken }) => {
      const data = await runQuery(queries.listVarieties, {
        filter: cropId ? { cropId: { eq: cropId } } : undefined,
        limit: limit ?? 100,
        nextToken,
      });

      return data;
    },
  }),

  'get-variety': tool({
    description: 'Get detailed information for a specific variety by ID.',
    inputSchema: z.object({
      id: z.string(),
    }),
    execute: async ({ id }) => {
      const data = await runQuery(queries.getVariety, { id });
      return data;
    },
  }),

  'list-gardens': tool({
    description: 'List gardens. Optionally filter to active gardens only.',
    inputSchema: z.object({
      activeOnly: z.boolean().optional(),
      limit: z.number().int().min(1).max(200).optional(),
      nextToken: z.string().optional(),
    }),
    execute: async ({ activeOnly, limit, nextToken }) => {
      const data = await runQuery(queries.listGardens, {
        filter: activeOnly ? { isActive: { eq: true } } : undefined,
        limit: limit ?? 100,
        nextToken,
      });

      return data;
    },
  }),

  'list-planting-plans': tool({
    description: 'List planting plans. Optionally filter by garden ID.',
    inputSchema: z.object({
      gardenId: z.string().optional(),
      limit: z.number().int().min(1).max(200).optional(),
      nextToken: z.string().optional(),
    }),
    execute: async ({ gardenId, limit, nextToken }) => {
      const data = await runQuery(queries.listPlantingPlans, {
        filter: gardenId ? { gardenId: { eq: gardenId } } : undefined,
        limit: limit ?? 100,
        nextToken,
      });

      return data;
    },
  }),

  'list-plan-steps': tool({
    description: 'List plan steps. Optionally filter by planting plan ID.',
    inputSchema: z.object({
      plantingPlanId: z.string().optional(),
      limit: z.number().int().min(1).max(500).optional(),
      nextToken: z.string().optional(),
    }),
    execute: async ({ plantingPlanId, limit, nextToken }) => {
      const data = await runQuery(queries.listPlanSteps, {
        filter: plantingPlanId ? { plantingPlanId: { eq: plantingPlanId } } : undefined,
        limit: limit ?? 200,
        nextToken,
      });

      return data;
    },
  }),
} as const;
