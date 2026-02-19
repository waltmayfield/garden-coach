# Agent Guide: Digital Operations Agent Project

This guide helps AI coding agents understand the Digital Operations Agent project structure, locate relevant files, and find documentation for specific tasks.

## Guidance
- To deploy the backend, run `npm run sandbox` in the foreground. This will run the deployment once, and will return any error messages. Don't run this command in the background.
- kb means Amazon Knowledge Base
- BDA means Amazon Bedrock Data Automation

### Waiting for CloudFormation Deployments
If the stack is currently updating, you can use AWS CLI wait commands to monitor deployment status:

```bash
# Wait for stack update to complete
aws cloudformation wait stack-update-complete \
  --stack-name amplify-aichatbot-waltmayf-sandbox-1e9b4f522c
```

## AWS Amplify Gen 2 Best Practices

### GraphQL JSON Fields
When working with `a.json()` fields in Amplify Gen 2 schemas:
- **Always use `JSON.stringify()`** when passing objects to `a.json()` fields
- This applies to both custom mutations AND model operations
- Example for custom mutation:
  ```typescript
  client.mutations.myMutation({
    input: JSON.stringify({ key: 'value' })
  })
  ```
- Example for model creation:
  ```typescript
  client.models.MyModel.create({
    jsonField: JSON.stringify({ key: 'value' })
  })
  ```

### Lambda Functions and Data Models
- **Separation of concerns**: Lambda functions should handle AWS infrastructure (Glue, Secrets Manager, S3, etc.)
- **Frontend handles data models**: Use GraphQL from frontend to create/update DynamoDB records
- **Never create DynamoDB records directly**: Always use GraphQL API (client.models.X.create())
- This approach provides better error handling and maintains authorization rules

### Error Handling
- GraphQL validation errors occur BEFORE Lambda execution
- Check `result.errors` array for GraphQL-level errors
- Check `result.data?.error` for Lambda-returned errors
- Always provide default values for optional fields to avoid `undefined` in GraphQL calls

## Project Overview

**Type:** Next.js 15 + AWS Amplify Gen 2 + AgentCore Runtime  
**Purpose:** AI agent for industrial operations management with real-time data analysis, predictive maintenance, and operational decision support  
**Key Technologies:** React 19, TypeScript, GraphQL, DynamoDB, Amazon Bedrock, MapLibre GL, Plotly

## Quick Navigation

### I need to...

**Modify the chat interface**
- Main component: `src/components/ChatBox.tsx`
- Message rendering: `src/components/ai-elements/message.tsx`
- AI response formatting: `src/components/ai-elements/response.tsx`
- Input handling: `src/components/ai-elements/prompt-input.tsx`
- Action buttons: `src/components/ai-elements/actions.tsx`

**Change the data schema**
- Schema definition: `amplify/data/resource.ts`
- After changes: Run `npm run sandbox` to redeploy
- GraphQL operations: `amplify/graphql/` (auto-generated)

**Modify the AI agent behavior**
- Agent implementation: `amplify/agent/server/src/index.ts`
- Agent initialization: `amplify/agent/server/src/init.ts`
- System prompts: `amplify/agent/server/src/init.ts`
- GraphQL query tools: `amplify/agent/server/src/tools/queryTools.ts`
- GraphQL mutation tools: `amplify/agent/server/src/tools/mutationTools.ts`
- After changes: Rebuild and redeploy agent container

**Work with the map viewer**
- Map component: `src/components/MapViewer.tsx`
- Map layer schema: `amplify/data/resource.ts` (MapLayer model)
- Athena integration: `amplify/functions/athena-query/handler.ts`
- Documentation: `docs/MAP_INTEGRATION.md`, `docs/QUERY_BASED_MAP_LAYERS.md`

**Manage data source connections**
- Data sources page: `src/app/(with-layout)/(with-auth)/datasources/page.tsx`
- Components: `src/components/datasources/` (DataSourceList, CreateConnectionDialog, etc.)
- Schema: `amplify/data/schemas/datasource.schema.ts`
- Lambda function: `amplify/functions/datasource-manager/handler.ts`
- Documentation: `docs/DATASOURCES_QUICK_START.md`, `docs/DATA_SOURCES_USER_GUIDE.md`, `docs/SNOWFLAKE_CONNECTION_GUIDE.md`

**Add authentication/authorization**
- Auth config: `amplify/auth/resource.ts`
- Auth wrapper: `src/components/WithAuth.tsx`
- User context: `src/components/UserAttributesProvider.tsx`
- Create users: `scripts/createUser.js`

**Add visualizations**
- HTML preprocessing: `src/lib/htmlPreprocessing.ts`
- Visualization guide: `docs/PLOTTING_AND_VISUALIZATION_GUIDE.md`
- Quick reference: `docs/PLOTTING_QUICK_REFERENCE.md`

**Deploy to AWS**
- Deployment guide: `docs/AMPLIFY_DEPLOYMENT_GUIDE.md`
- Build config: `amplify.yml`
- Backend config: `amplify/backend.ts`

**Run tests**
- Test files: `__tests__/` directory
- Test utilities: `utils/testUtils.ts`
- Run: `npm test`

## Project Structure

```
digital-operations/
├── amplify/                    # AWS Amplify backend
│   ├── agent/                  # AgentCore Runtime agent
│   │   └── server/             # Agent server implementation
│   │       ├── src/
│   │       │   ├── index.ts    # Express server entry
│   │       │   ├── init.ts     # Agent initialization & prompts
│   │       │   ├── server.ts   # Request handler
│   │       │   └── tools/      # GraphQL tools
│   │       └── Dockerfile      # Container config
│   ├── auth/                   # Cognito authentication
│   ├── data/                   # GraphQL schema & DynamoDB
│   │   └── resource.ts         # ⚠️ Data models (requires redeploy)
│   ├── functions/              # Lambda functions
│   │   └── athena-query/       # Athena SQL execution
│   ├── mcp/                    # Model Context Protocol server
│   ├── custom/                 # CDK constructs
│   └── backend.ts              # Main backend config
│
├── src/                        # Frontend source
│   ├── app/                    # Next.js pages
│   │   ├── (with-layout)/
│   │   │   └── (with-auth)/
│   │   │       ├── chat/       # Chat interface page
│   │   │       ├── map/        # Map viewer page
│   │   │       └── datasources/ # 🔌 Data sources management
│   │   └── layout.tsx          # Root layout
│   ├── components/
│   │   ├── ChatBox.tsx         # 🎯 Main chat component
│   │   ├── MapViewer.tsx       # 🗺️ Map component
│   │   ├── datasources/        # 🔌 Data source components
│   │   ├── ai-elements/        # AI UI components
│   │   │   ├── message.tsx     # Message display
│   │   │   ├── response.tsx    # AI response renderer
│   │   │   ├── prompt-input.tsx # Chat input
│   │   │   └── actions.tsx     # Message actions
│   │   └── ui/                 # Base UI (shadcn/ui)
│   └── lib/                    # Utilities
│       ├── agentCoreClient.ts  # AgentCore client
│       ├── agentCoreTransport.ts # Streaming transport
│       ├── htmlPreprocessing.ts # Visualization processing
│       └── athenaUtils.ts      # Athena helpers
│
├── docs/                       # 📚 Documentation
├── scripts/                    # Utility scripts
├── utils/                      # Shared utilities
└── __tests__/                  # Test files
```

## Data Models

Key models defined in `amplify/data/resource.ts`:

- **ChatSession** - Conversation history with map layers
- **ChatMessage** - Individual messages (text, tool calls, metadata)
- **MapLayer** - Query-driven map layers with Athena SQL
- **DataSourceConnection** - External data source connections (Snowflake, etc.)
- **FederatedCatalog** - Metadata for federated data catalogs
- **FederatedQueryHistory** - Query history for cost tracking
- **WorkoverJob** - Maintenance jobs with financial metrics
- **ActionItem** - Recommended actions with status tracking
- **Settings** - System configuration and agent prompts

## Key Flows

### Chat Message Flow
```
User Input (ChatBox.tsx)
  → AgentCore Runtime (amplify/agent/server/)
    → Bedrock Model (Nova/Claude)
      → GraphQL Tools (query/mutation)
        → Amplify Data (DynamoDB)
          → Response streamed back
            → Rendered with ai-elements
```

### Map Layer Flow
```
Agent creates MapLayer
  → Saved to DynamoDB
    → GraphQL subscription fires
      → MapViewer receives update
        → Execute Athena query
          → Convert to GeoJSON
            → Render on MapLibre map
```

## Documentation Index

### Getting Started
- **README.md** - Project overview and quick start
- **docs/PROJECT_STRUCTURE.md** - Detailed structure guide
- **docs/CUSTOMIZATION_GUIDE.md** - Common customization patterns

### Deployment
- **docs/AMPLIFY_DEPLOYMENT_GUIDE.md** - Deploy to AWS Amplify Hosting
- **docs/AGENTCORE_AGENT_DEPLOYMENT.md** - AgentCore Runtime deployment

### Features
- **docs/ATHENA_INTEGRATION.md** - Athena SQL query integration
- **docs/MAP_INTEGRATION.md** - Map viewer implementation
- **docs/QUERY_BASED_MAP_LAYERS.md** - Dynamic map layers
- **docs/MAP_COLOR_CODING.md** - Map styling and colors
- **docs/MAP_LAYER_SUBSCRIPTIONS.md** - Real-time layer updates
- **docs/MAP_LAYER_ERROR_HANDLING.md** - Error handling for maps

### Visualizations
- **docs/PLOTTING_AND_VISUALIZATION_GUIDE.md** - Complete visualization guide
- **docs/PLOTTING_QUICK_REFERENCE.md** - Quick reference for plots

### Technical Details
- **docs/GRAPHQL_TRANSPORT_IMPLEMENTATION.md** - Custom transport layer
- **docs/CHAT_SESSION_ID_AUTO_INJECTION.md** - Session management
- **docs/MCP_INTEGRATION_PLAN.md** - Model Context Protocol integration
- **docs/S3_FILESYSTEM_MCP_PROJECT_PLAN.md** - S3 filesystem MCP

### Agent Implementation
- **amplify/agent/README.md** - Agent server overview
- **amplify/agent/server/README.md** - Detailed agent implementation
- **amplify/agent/DEPLOYMENT_GUIDE.md** - Agent deployment guide
- **amplify/mcp/README.md** - MCP server implementation

### Scripts
- **scripts/SCRIPTS_README.md** - Available utility scripts
- **scripts/GRAPHQ_RUNNER_README.md** - GraphQL runner usage

## Common Tasks

### Modify Agent System Prompt
1. Edit `amplify/agent/server/src/init.ts`
2. Update the `systemPrompt` variable
3. Rebuild: `cd amplify/agent/server && npm run build`
4. Redeploy: `npm run sandbox` (from project root)

### Add New Data Model
1. Edit `amplify/data/resource.ts`
2. Add model definition with authorization rules
3. Run `npm run sandbox` to deploy
4. GraphQL operations auto-generated in `amplify/graphql/`

### Add New Agent Tool
1. Edit `amplify/agent/server/src/tools/queryTools.ts` or `mutationTools.ts`
2. Add tool definition and implementation
3. Register tool in `amplify/agent/server/src/init.ts`
4. Rebuild and redeploy agent

### Customize Chat UI
1. Message appearance: `src/components/ai-elements/message.tsx`
2. Response formatting: `src/components/ai-elements/response.tsx`
3. Input behavior: `src/components/ai-elements/prompt-input.tsx`
4. Action buttons: `src/components/ai-elements/actions.tsx`
5. Changes hot-reload automatically

### Add Map Layer Type
1. Update MapLayer model in `amplify/data/resource.ts`
2. Update Athena query handler: `amplify/functions/athena-query/handler.ts`
3. Update MapViewer rendering: `src/components/MapViewer.tsx`
4. See `docs/QUERY_BASED_MAP_LAYERS.md` for details

## Development Commands

```bash
# Install dependencies
npm install

# Start Amplify sandbox (deploys backend)
npm run sandbox

# Start Next.js dev server (separate terminal)
npm run dev

# Run tests
npm test

# Build for production
npm run build

# Create Cognito user (sandbox only)
node scripts/createUser.js

# Run GraphQL query
npx tsx scripts/runGraphql.ts
```

## Important Notes

### When to Redeploy Backend
Run `npm run sandbox` after changes to:
- `amplify/data/resource.ts` (schema)
- `amplify/auth/resource.ts` (auth)
- `amplify/backend.ts` (backend config)
- `amplify/agent/` (agent server)
- `amplify/functions/` (Lambda functions)

### Hot Reload (No Restart Needed)
- React components in `src/`
- CSS files
- Most TypeScript files

### Architecture Constraints
- **Streaming**: Uses custom transport (Amplify SSR doesn't support HTTP streaming)
- **Build**: Amplify uses x86, AgentCore requires ARM64 (uses QEMU emulation)
- **Timeouts**: AgentCore handles long operations (Amplify has 30s limit)
- **Auth**: Admin-only user creation (self-signup disabled)

## Testing

### Test Structure
- Unit tests: `__tests__/lib/`
- Integration tests: `__tests__/lib/*.integration.test.ts`
- Test fixtures: `__tests__/fixtures/`
- Test utilities: `utils/testUtils.ts`

### Running Tests
```bash
# Run all tests
npm test

# Run specific test file
npm test htmlPreprocessing.test.ts

# Run with coverage
npm test -- --coverage
```

## Environment Variables

Key environment variables (set in `.env` or Amplify Console):
- AWS region and credentials (for local development)
- Amplify outputs (auto-generated in `amplify_outputs.json`)

## Troubleshooting

### Agent not responding
- Check AgentCore Runtime logs in CloudWatch
- Verify agent container is running
- Check `amplify/agent/server/src/index.ts` for errors

### Map layers not rendering
- Check Athena query syntax in MapLayer
- Verify GeoJSON mapping configuration
- See `docs/MAP_LAYER_ERROR_HANDLING.md`

### GraphQL errors
- Verify schema in `amplify/data/resource.ts`
- Check authorization rules
- Use `scripts/runGraphql.ts` to test queries

### Build failures
- Check `amplify.yml` build configuration
- Verify Node.js version (requires 20+)
- Check Docker image build for agent

## Additional Resources

- [AWS Amplify Gen 2 Docs](https://docs.amplify.aws/)
- [AgentCore Runtime Docs](https://docs.aws.amazon.com/bedrock/latest/userguide/agentcore.html)
- [Next.js 15 Docs](https://nextjs.org/docs)
- [MapLibre GL JS Docs](https://maplibre.org/maplibre-gl-js/docs/)
- [Plotly.js Docs](https://plotly.com/javascript/)

## Contributing

When making changes:
1. Follow existing code patterns
2. Update relevant documentation
3. Add tests for new features
4. Test locally with `npm run sandbox` + `npm run dev`
5. Verify deployment with `amplify.yml` configuration

---

**Last Updated:** January 2026  
**Project Version:** See `package.json`
