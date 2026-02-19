import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

// Import modular schemas
import { chatSchema } from './schemas/chat.schema';
import { mapSchema } from './schemas/map.schema';
// import { athenaSchema } from './schemas/athena.schema';
// import { mcpSchema } from './schemas/mcp.schema';
// import { operationsSchema } from './schemas/operations.schema';
// import { datasourceSchema } from './schemas/datasource.schema';
// import { knowledgebaseSchema } from './schemas/knowledgebase.schema';
import { internaroundSchema } from './schemas/internaround.schema';

// Combine all schemas
const schema = a.combine([
  chatSchema,
  mapSchema,
  // athenaSchema,
  // mcpSchema,
  // operationsSchema,
  // datasourceSchema,
  // knowledgebaseSchema,
  internaroundSchema,
]);

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});
