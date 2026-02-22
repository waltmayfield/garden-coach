import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
// import { athenaQuery } from './functions/athena-query/resource';
// import { datasourceManager } from './functions/datasource-manager/resource';
// import { retrieveAndGenerate } from './functions/retrieve-and-generate/resource';
import { storage } from './storage/resource';
import { AgentCoreRuntimeWithBuild } from './custom/agentCoreRuntimeWithBuild';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import { SeedDataConstruct } from './custom/seedData';
import { applyCdkNag } from './custom/cdkNagHelper';
import { KnowledgeBaseConstruct } from './custom/knowledgeBase';

import {
  aws_iam as iam,
  aws_cognito as cognito,
  aws_amplify as amplify,
  Fn
} from 'aws-cdk-lib'

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const backend = defineBackend({
  auth,
  data,
  // athenaQuery,
  // retrieveAndGenerate,
  // datasourceManager,
  storage,
});

backend.stack.tags.setTag('Project', 'a4e');

// Create Amplify Hosting App
const amplifyApp = new amplify.CfnApp(backend.stack, 'DigitalOperationsApp', {
  name: 'digital-operations-frontend',
  description: 'Digital Operations Agent - Static Frontend',
  platform: 'WEB', // Static site platform
  environmentVariables: [
    {
      name: '_LIVE_UPDATES',
      value: JSON.stringify([
        {
          pkg: 'next-version',
          type: 'internal',
          version: 'latest',
        },
      ]),
    },
  ],
  customRules: [
    // SPA fallback rule - serve index.html for all routes
    {
      source: '/<*>',
      target: '/index.html',
      status: '404-200',
    },
  ],
});

// Create main branch
const mainBranch = new amplify.CfnBranch(backend.stack, 'MainBranch', {
  appId: amplifyApp.attrAppId,
  branchName: 'main',
  enableAutoBuild: false, // Manual deployment via CLI
  stage: 'PRODUCTION',
});

//This will disable the ability for users to sign up in the UI. The administrator will manually create users.
const { cfnUserPool, cfnUserPoolClient } = backend.auth.resources.cfnResources;
cfnUserPool.adminCreateUserConfig = {
  allowAdminCreateUserOnly: true,
};

// Enable ALLOW_ADMIN_USER_PASSWORD_AUTH for backend testing scripts
cfnUserPoolClient.explicitAuthFlows = [
  'ALLOW_ADMIN_USER_PASSWORD_AUTH',
  'ALLOW_CUSTOM_AUTH',
  'ALLOW_REFRESH_TOKEN_AUTH',
  'ALLOW_USER_SRP_AUTH'
];

// Configure Cognito domain for OAuth flows (required for hosted UI)
// Use stack name to ensure uniqueness across multiple deployments in same account
const domainPrefix = backend.stack.stackName.toLowerCase().replace(/[^a-z0-9-]/g, '-').substring(0, 63);
const cognitoDomain = new cognito.CfnUserPoolDomain(backend.stack, 'CognitoDomain', {
  domain: domainPrefix, // Must be globally unique - uses stack name for per-deployment uniqueness
  userPoolId: backend.auth.resources.userPool.userPoolId
});

// // Create a second Cognito client with secret for QuickSight OAuth integration
// const quicksightUserPoolClient = new cognito.CfnUserPoolClient(backend.stack, 'QuickSightUserPoolClient', {
//   userPoolId: backend.auth.resources.userPool.userPoolId,
//   clientName: 'quicksight-oauth-client',
//   generateSecret: true,
//   explicitAuthFlows: [
//     'ALLOW_ADMIN_USER_PASSWORD_AUTH',
//     'ALLOW_REFRESH_TOKEN_AUTH',
//     'ALLOW_USER_SRP_AUTH'
//   ],
//   allowedOAuthFlows: ['code', 'implicit'],
//   allowedOAuthScopes: ['openid', 'email', 'profile'],
//   allowedOAuthFlowsUserPoolClient: true,
//   callbackUrLs: [
//     'https://us-east-1.quicksight.aws.amazon.com/sn/integrations/oauth/callback',
//     'https://quicksight.aws.amazon.com/sn/integrations/oauth/callback',
//     'https://us-east-1.quicksight.aws.amazon.com/sn/oauthcallback',
//     // Localhost callbacks for MCP clients
//     'http://localhost:3000/callback',  // For mcpRemoteProxy.ts
//     // mcp-remote uses dynamic ports - adding common port ranges
//     'http://localhost:10419/oauth/callback',
//     'http://localhost:16998/oauth/callback',
//     'http://localhost:16999/oauth/callback',
//     'http://localhost:17000/oauth/callback',
//     'http://localhost:19245/oauth/callback',
//     'http://localhost:32359/oauth/callback',
//     'http://localhost:43111/oauth/callback',
//     // Add a range around common ephemeral ports
//     ...Array.from({ length: 20 }, (_, i) => `http://localhost:${30000 + i}/oauth/callback`),
//     ...Array.from({ length: 20 }, (_, i) => `http://localhost:${40000 + i}/oauth/callback`),
//   ],
//   logoutUrLs: [
//     'https://us-east-1.quicksight.aws.amazon.com/sn/start'
//   ],
//   supportedIdentityProviders: ['COGNITO']
// });

// // Ensure domain is created before client
// quicksightUserPoolClient.addDependency(cognitoDomain);

// Seed the Settings table with the system prompt
const SettingsDdbTable = backend.data.resources.tables["Settings"];
new SeedDataConstruct(backend.stack, 'SeedData', {
  settingsTable: SettingsDdbTable
});

// // Create Knowledge Base for RAG
// const knowledgeBase = new KnowledgeBaseConstruct(backend.stack, 'KnowledgeBase', {
//   documentBucket: backend.storage.resources.bucket,
//   namePrefix: backend.stack.stackName,
//   region: backend.stack.region,
//   accountId: backend.stack.account,
// });

// // Deploy MCP server with OAuth authentication
// // Using allowedClients to specify which Cognito clients can authenticate
// const mcpServer = new AgentCoreRuntimeWithBuild(backend.stack, 'McpServer', {
//   protocolConfiguration: 'MCP',
//   imageAssetDirectory: path.join(__dirname, 'mcp/server'),
//   cognitoDiscoveryUrl: `https://cognito-idp.${backend.auth.stack.region}.amazonaws.com/${backend.auth.resources.userPool.userPoolId}/.well-known/openid-configuration`,
//   // Use allowedClients - Cognito tokens have client_id in the token
//   allowedClients: [
//     backend.auth.resources.userPoolClient.userPoolClientId, // Web app client
//     quicksightUserPoolClient.ref // QuickSight OAuth client
//   ],
//   description: 'MCP server with OAuth authentication',
//   environment: {
//     AMPLIFY_DATA_GRAPHQL_ENDPOINT: backend.data.graphqlUrl,
//     COGNITO_DOMAIN: domainPrefix,
//     AWS_REGION: backend.auth.stack.region
//   }
// });

// // Deploy S3 Filesystem MCP server
// const s3FilesystemServer = new AgentCoreRuntimeWithBuild(backend.stack, 'S3FilesystemServer', {
//   protocolConfiguration: 'MCP',
//   imageAssetDirectory: path.join(__dirname, 's3-filesystem/server'),
//   cognitoDiscoveryUrl: `https://cognito-idp.${backend.auth.stack.region}.amazonaws.com/${backend.auth.resources.userPool.userPoolId}/.well-known/openid-configuration`,
//   allowedClients: [
//     backend.auth.resources.userPoolClient.userPoolClientId,
//     quicksightUserPoolClient.ref
//   ],
//   description: 'S3 Filesystem MCP server',
//   environment: {
//     S3_BUCKET: backend.storage.resources.bucket.bucketName,
//     AWS_REGION: backend.stack.region,
//     ALLOWED_PREFIXES: 'uploads,private,protected,public',
//     ENABLE_CACHE: 'true',
//     CACHE_TTL: '300',
//     CACHE_MAX_KEYS: '1000'
//   }
// });

// // Grant MCP server runtime permission to execute AppSync GraphQL operations
// backend.data.resources.graphqlApi.grantMutation(mcpServer.executionRole, '*');
// backend.data.resources.graphqlApi.grantQuery(mcpServer.executionRole, '*');
// backend.data.resources.graphqlApi.grantSubscription(mcpServer.executionRole, '*');

// // Grant S3 Filesystem server permissions to access storage bucket
// backend.storage.resources.bucket.grantReadWrite(s3FilesystemServer.executionRole);
// s3FilesystemServer.executionRole.addToPrincipalPolicy(
//   new iam.PolicyStatement({
//     effect: iam.Effect.ALLOW,
//     actions: [
//       's3:GetObject',
//       's3:PutObject',
//       's3:DeleteObject',
//       's3:ListBucket',
//       's3:HeadObject'
//     ],
//     resources: [
//       backend.storage.resources.bucket.bucketArn,
//       `${backend.storage.resources.bucket.bucketArn}/*`
//     ]
//   })
// );

// Deploy GenAI Agent to ECR with HTTP protocol
const agentServer = new AgentCoreRuntimeWithBuild(backend.stack, 'AgentServer', {
  protocolConfiguration: 'HTTP',
  imageAssetDirectory: path.join(__dirname, 'agent/server'),
  allowedClients: [backend.auth.resources.userPoolClient.userPoolClientId],
  cognitoDiscoveryUrl: `https://cognito-idp.${backend.auth.stack.region}.amazonaws.com/${backend.auth.resources.userPool.userPoolId}/.well-known/openid-configuration`,
  description: 'GenAI conversational agent with Bedrock integration',
  environment: {
    AMPLIFY_DATA_GRAPHQL_ENDPOINT: backend.data.graphqlUrl,
    AWS_REGION: backend.stack.region,
    // KNOWLEDGE_BASE_ID: knowledgeBase.knowledgeBaseId,
  }
});

// Grant Agent server runtime permission to execute AppSync GraphQL operations
backend.data.resources.graphqlApi.grantMutation(agentServer.executionRole, '*');
backend.data.resources.graphqlApi.grantQuery(agentServer.executionRole, '*');
backend.data.resources.graphqlApi.grantSubscription(agentServer.executionRole, '*');

// Grant Agent server permission to invoke Bedrock models
agentServer.executionRole.addToPrincipalPolicy(
  new iam.PolicyStatement({
    effect: iam.Effect.ALLOW,
    actions: [
      'bedrock:InvokeModel',
      'bedrock:InvokeModelWithResponseStream',
      'bedrock:Retrieve',
      'bedrock:RetrieveAndGenerate',
    ],
    resources: [
      `arn:aws:bedrock:*::foundation-model/*`,
      `arn:aws:bedrock:*:${backend.stack.account}:inference-profile/*`,
      `arn:aws:bedrock:${backend.stack.region}:${backend.stack.account}:knowledge-base/*`,
    ],
  })
);

// // Grant retrieveAndGenerate Lambda permission to invoke Bedrock
// backend.retrieveAndGenerate.resources.lambda.addToRolePolicy(
//   new iam.PolicyStatement({
//     effect: iam.Effect.ALLOW,
//     actions: [
//       'bedrock:InvokeModel',
//       'bedrock:InvokeModelWithResponseStream',
//       'bedrock:Retrieve',
//       'bedrock:RetrieveAndGenerate',
//     ],
//     resources: [
//       `arn:aws:bedrock:*::foundation-model/*`,
//       `arn:aws:bedrock:*:${backend.stack.account}:inference-profile/*`,
//       `arn:aws:bedrock:${backend.stack.region}:${backend.stack.account}:knowledge-base/*`,
//     ],
//   })
// );

// Add custom Bedrock permissions to authenticated users
backend.auth.resources.authenticatedUserIamRole.addToPrincipalPolicy(
  new iam.PolicyStatement({
    effect: iam.Effect.ALLOW,
    actions: [
      'bedrock:InvokeModel',
      'bedrock:InvokeModelWithResponseStream',
    ],
    resources: [
      // Specific model ARN or use * for all models
      `arn:aws:bedrock:*::foundation-model/*`,
      `arn:aws:bedrock:*:${backend.stack.account}:inference-profile/*`// inference profiles may call for responses from multiple regions 
    ],
  })
);

// // Add S3 permissions for accessing spatial data management assets
// backend.auth.resources.authenticatedUserIamRole.addToPrincipalPolicy(
//   new iam.PolicyStatement({
//     effect: iam.Effect.ALLOW,
//     actions: [
//       's3:GetObject',
//       's3:ListBucket',
//     ],
//     resources: [
//       'arn:aws:s3:::spatialdatamanagement-ass-assetencrypteds3encrypte-jrozbyvnxoe0/SpatialDataManagementAssets/*',
//       'arn:aws:s3:::spatialdatamanagement-ass-assetencrypteds3encrypte-jrozbyvnxoe0',
//     ],
//   })
// );

// Add AgentCore Runtime permissions
backend.auth.resources.authenticatedUserIamRole.addToPrincipalPolicy(
  new iam.PolicyStatement({
    effect: iam.Effect.ALLOW,
    actions: [
      'bedrock-agentcore:InvokeAgentRuntime',
      'bedrock-agentcore:GetAgentRuntime',
    ],
    resources: ['*'],
  })
);

// // Add Athena permissions to Lambda function
// backend.athenaQuery.resources.lambda.addToRolePolicy(
//   new iam.PolicyStatement({
//     effect: iam.Effect.ALLOW,
//     actions: [
//       'athena:StartQueryExecution',
//       'athena:GetQueryExecution',
//       'athena:GetQueryResults',
//       'athena:StopQueryExecution',
//       'athena:GetWorkGroup',
//     ],
//     resources: ['*'], // Lambda will have access to all Athena resources
//   })
// );

// // Add S3 permissions for Athena query results
// backend.athenaQuery.resources.lambda.addToRolePolicy(
//   new iam.PolicyStatement({
//     effect: iam.Effect.ALLOW,
//     actions: [
//       's3:GetBucketLocation',
//       's3:GetObject',
//       's3:ListBucket',
//       's3:PutObject',
//     ],
//     resources: [
//       `arn:aws:s3:::aws-athena-query-results-${backend.stack.account}-${backend.stack.region}`,
//       `arn:aws:s3:::aws-athena-query-results-${backend.stack.account}-${backend.stack.region}/*`,
//     ],
//   })
// );

// // Add S3 permissions for source data buckets (for Athena table data) from the prod a4e storage bucket
// backend.athenaQuery.resources.lambda.addToRolePolicy(
//   new iam.PolicyStatement({
//     effect: iam.Effect.ALLOW,
//     actions: [
//       's3:GetObject',
//       's3:ListBucket',
//     ],
//     resources: [
//       'arn:aws:s3:::amplify-d2l9ed3lys4sp6-ma-workshopstoragebucketd9b-n2b8vnbheqyu',
//       'arn:aws:s3:::amplify-d2l9ed3lys4sp6-ma-workshopstoragebucketd9b-n2b8vnbheqyu/*',
//     ],
//   })
// );

// // Add Glue permissions for Athena (to access data catalog)
// backend.athenaQuery.resources.lambda.addToRolePolicy(
//   new iam.PolicyStatement({
//     effect: iam.Effect.ALLOW,
//     actions: [
//       'glue:GetDatabase',
//       'glue:GetDatabases',
//       'glue:GetTable',
//       'glue:GetTables',
//       'glue:GetPartition',
//       'glue:GetPartitions',
//     ],
//     resources: ['*'], // Lambda will have access to all Glue resources
//   })
// );

// // Add Athena permissions to Agent server (so AI agent can execute queries via GraphQL)
// agentServer.executionRole.addToPrincipalPolicy(
//   new iam.PolicyStatement({
//     effect: iam.Effect.ALLOW,
//     actions: [
//       'athena:StartQueryExecution',
//       'athena:GetQueryExecution',
//       'athena:GetQueryResults',
//       'athena:StopQueryExecution',
//     ],
//     resources: ['*'],
//   })
// );

// // Add permissions for Datasource Manager Lambda
// // Secrets Manager permissions
// backend.datasourceManager.resources.lambda.addToRolePolicy(
//   new iam.PolicyStatement({
//     effect: iam.Effect.ALLOW,
//     actions: [
//       'secretsmanager:CreateSecret',
//       'secretsmanager:UpdateSecret',
//       'secretsmanager:DeleteSecret',
//       'secretsmanager:GetSecretValue',
//       'secretsmanager:DescribeSecret',
//       'secretsmanager:TagResource',
//     ],
//     resources: [
//       `arn:aws:secretsmanager:${backend.stack.region}:${backend.stack.account}:secret:datasource/*`,
//     ],
//   })
// );

// // Glue Data Catalog permissions for federated connections
// backend.datasourceManager.resources.lambda.addToRolePolicy(
//   new iam.PolicyStatement({
//     effect: iam.Effect.ALLOW,
//     actions: [
//       'glue:CreateConnection',
//       'glue:DeleteConnection',
//       'glue:GetConnection',
//       'glue:GetConnections',
//       'glue:UpdateConnection',
//       'glue:GetDatabases',
//       'glue:GetDatabase',
//       'glue:GetTables',
//       'glue:GetTable',
//       'glue:CreateDatabase',
//       'glue:CreateTable',
//     ],
//     resources: ['*'],
//   })
// );

// // Athena permissions for testing connections
// backend.datasourceManager.resources.lambda.addToRolePolicy(
//   new iam.PolicyStatement({
//     effect: iam.Effect.ALLOW,
//     actions: [
//       'athena:StartQueryExecution',
//       'athena:GetQueryExecution',
//       'athena:GetQueryResults',
//       'athena:StopQueryExecution',
//       'athena:GetWorkGroup',
//       'athena:CreateDataCatalog',
//       'athena:DeleteDataCatalog',
//       'athena:GetDataCatalog',
//       'athena:ListDataCatalogs',
//     ],
//     resources: ['*'],
//   })
// );

// // S3 permissions for Athena query results
// backend.datasourceManager.resources.lambda.addToRolePolicy(
//   new iam.PolicyStatement({
//     effect: iam.Effect.ALLOW,
//     actions: [
//       's3:GetBucketLocation',
//       's3:GetObject',
//       's3:ListBucket',
//       's3:PutObject',
//     ],
//     resources: [
//       `arn:aws:s3:::aws-athena-query-results-${backend.stack.account}-${backend.stack.region}`,
//       `arn:aws:s3:::aws-athena-query-results-${backend.stack.account}-${backend.stack.region}/*`,
//     ],
//   })
// );


backend.addOutput({
  custom: {
    rootStackName: backend.stack.stackName,
    amplify: {
      appUrl: `https://${mainBranch.branchName}.${amplifyApp.attrDefaultDomain}`,
      appId: amplifyApp.attrAppId
    },
    // mcpServerAgentArn: mcpServer.runtime.attrAgentRuntimeArn,
    // s3FilesystemServerAgentArn: s3FilesystemServer.runtime.attrAgentRuntimeArn,
    agentServerAgentArn: agentServer.runtime.attrAgentRuntimeArn,
    // quicksightOAuthClientId: quicksightUserPoolClient.ref,
    cognitoDomain: cognitoDomain.domain,
    // knowledgeBaseId: knowledgeBase.knowledgeBaseId,
    // knowledgeBaseDataSourceId: knowledgeBase.dataSourceId,
    // mcpIntegration: {
    //   // Encode the ARN for the URL: replace : with %3A and / with %2F
    //   endpoint: Fn.join('', [
    //     'https://bedrock-agentcore.',
    //     backend.stack.region,
    //     '.amazonaws.com/runtimes/',
    //     Fn.join('%3A', Fn.split(':', Fn.join('%2F', Fn.split('/', mcpServer.runtime.attrAgentRuntimeArn)))),
    //     '/invocations?qualifier=DEFAULT'
    //   ]),
    //   authorizationUrl: `https://${cognitoDomain.domain}.auth.${backend.stack.region}.amazoncognito.com/oauth2/authorize`,
    //   tokenUrl: `https://${cognitoDomain.domain}.auth.${backend.stack.region}.amazoncognito.com/oauth2/token`,
    //   discoveryUrl: `https://cognito-idp.${backend.stack.region}.amazonaws.com/${backend.auth.resources.userPool.userPoolId}/.well-known/openid-configuration`,
    //   userPoolId: backend.auth.resources.userPool.userPoolId,
    //   region: backend.stack.region,
    //   note: 'MCP server with Dynamic Client Registration (DCR) support - clients can register dynamically using the User Pool ID as audience'
    // },
    // s3FilesystemIntegration: {
    //   endpoint: Fn.join('', [
    //     'https://bedrock-agentcore.',
    //     backend.stack.region,
    //     '.amazonaws.com/runtimes/',
    //     Fn.join('%3A', Fn.split(':', Fn.join('%2F', Fn.split('/', s3FilesystemServer.runtime.attrAgentRuntimeArn)))),
    //     '/invocations?qualifier=DEFAULT'
    //   ]),
    //   authorizationUrl: `https://${cognitoDomain.domain}.auth.${backend.stack.region}.amazoncognito.com/oauth2/authorize`,
    //   tokenUrl: `https://${cognitoDomain.domain}.auth.${backend.stack.region}.amazoncognito.com/oauth2/token`,
    //   discoveryUrl: `https://cognito-idp.${backend.stack.region}.amazonaws.com/${backend.auth.resources.userPool.userPoolId}/.well-known/openid-configuration`,
    //   userPoolId: backend.auth.resources.userPool.userPoolId,
    //   region: backend.stack.region,
    //   bucket: backend.storage.resources.bucket.bucketName,
    //   note: 'S3 Filesystem MCP server - provides filesystem operations on S3 storage'
    // },
    // quicksightMcpIntegration: {
    //   // Encode the ARN for the URL: replace : with %3A and / with %2F
    //   endpoint: Fn.join('', [
    //     'https://bedrock-agentcore.',
    //     backend.stack.region,
    //     '.amazonaws.com/runtimes/',
    //     Fn.join('%3A', Fn.split(':', Fn.join('%2F', Fn.split('/', mcpServer.runtime.attrAgentRuntimeArn)))),
    //     '/invocations?qualifier=DEFAULT'
    //   ]),
    //   authorizationUrl: `https://${cognitoDomain.domain}.auth.${backend.stack.region}.amazoncognito.com/oauth2/authorize`,
    //   tokenUrl: `https://${cognitoDomain.domain}.auth.${backend.stack.region}.amazoncognito.com/oauth2/token`,
    //   userPoolId: backend.auth.resources.userPool.userPoolId,
    //   region: backend.stack.region,
    //   note: 'Use quicksightOAuthClientId for Client ID. Get Client Secret from AWS Console: Cognito > User Pools > App clients > quicksight-oauth-client'
    // }
  }
})



// // Apply CDK Nag checks only in sandbox environments
// // Sandbox stacks follow the naming convention: amplify-<app-name>-<username>-sandbox-<hash>
// const isSandbox = backend.stack.stackName.includes('-sandbox-')
// if (isSandbox) {
//   console.log('Applying cdk nag')
//   applyCdkNag(backend.stack)

//   // Also apply to nested stacks (auth, data, function)
//   const authStack = backend.auth.stack
//   const dataStack = backend.data.stack

//   if (authStack) {
//     applyCdkNag(authStack)
//   }
//   if (dataStack) {
//     applyCdkNag(dataStack)
//   }
// }
