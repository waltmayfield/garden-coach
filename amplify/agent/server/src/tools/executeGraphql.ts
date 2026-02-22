import { tool } from 'ai';
import { z } from 'zod';
import { getConfiguredAmplifyClient } from './amplifyUtils';

export const graphqlTools = {
  'execute-graphql': tool({
    description: 'Execute a GraphQL query or mutation against the AppSync API.',
    inputSchema: z.object({
      query: z.string().describe('The GraphQL operation to execute'),
      variables: z.record(z.string(), z.unknown()).optional().describe('Optional GraphQL variables'),
    }),
    execute: async ({ query, variables }: { query: string; variables?: Record<string, unknown> }) => {
      const amplifyClient = getConfiguredAmplifyClient() as any;
      const result = await amplifyClient.graphql({
        query,
        variables: variables ?? {},
      });

      return result;
    },
  } as any),
} as const;
