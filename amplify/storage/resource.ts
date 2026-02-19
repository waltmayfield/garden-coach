import { defineStorage } from '@aws-amplify/backend';

/**
 * Storage configuration for Digital Operations Agent
 * 
 * Access patterns:
 * - public/*: Read-only access for all users (guest and authenticated)
 * - protected/{user_id}/*: Read access for all authenticated users, write/delete for owner only
 * - private/{user_id}/*: Full access for owner only
 * - uploads/*: Authenticated users can upload, read their own files
 */
export const storage = defineStorage({
  name: 'digitalOperationsStorage',
  access: (allow) => ({
    // Public files - anyone can read
    'public/*': [
      allow.guest.to(['read']),
      allow.authenticated.to(['read', 'write', 'delete'])
    ],
    
    // Protected files - owner can write/delete, all authenticated users can read
    'protected/{entity_id}/*': [
      allow.entity('identity').to(['read', 'write', 'delete']),
      allow.authenticated.to(['read'])
    ],

    // Business Documents - owner can write/delete, all authenticated users can read
    'documents/*': [
      allow.entity('identity').to(['read', 'write', 'delete']),
      allow.authenticated.to(['read'])
    ],
    
    // Private files - only owner can access
    'private/{entity_id}/*': [
      allow.entity('identity').to(['read', 'write', 'delete'])
    ],
    
    // Uploads - authenticated users can manage their own uploads
    'uploads/{entity_id}/*': [
      allow.entity('identity').to(['read', 'write', 'delete'])
    ]
  })
});
