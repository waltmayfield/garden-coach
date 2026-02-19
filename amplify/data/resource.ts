import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

// Import modular schemas
import { chatSchema } from './schemas/chat.schema';
import { mapSchema } from './schemas/map.schema';

// Combine all schemas
const schema = a.combine([
  chatSchema,
  mapSchema,
]);

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});
