# Data Schema Organization

This directory contains modular schema definitions for the Digital Operations Agent project. The schemas are organized by domain to improve maintainability and clarity.

## Schema Files

### `chat.schema.ts` - Chat Management
Models for managing chat sessions and messages:
- **ChatSession** - Conversation history with map layers
- **ChatMessage** - Individual messages with role, parts, and metadata
- **Roles** - Enum for user/assistant/system roles
- **Settings** - System configuration

### `map.schema.ts` - Map Visualization
Models for map layers and visualizations:
- **MapLayer** - Query-driven map layers with Athena SQL
- **MapLayerType** - Enum for layer types (point, line, polygon, heatmap, geojson)
- **GeoJsonMappingConfig** - Configuration for converting query results to GeoJSON
- **MapLayerQueryResult** - Result type for map layer query execution

### `athena.schema.ts` - Athena Queries
Models and mutations for executing Athena queries:
- **AthenaQueryStatus** - Enum for query execution status
- **AthenaQueryResult** - Result type for Athena queries
- **executeAthenaQuery** - Mutation to execute Athena queries
- **executeMapLayerQuery** - Mutation to execute and validate map layer queries
- **onAthenaQueryResult** - Subscription for query results

### `mcp.schema.ts` - Model Context Protocol
Models for MCP server management:
- **McpServer** - MCP server configuration
- **HeaderEntry** - HTTP header key-value pairs
- **Tool** - Tool definitions for MCP servers

### `operations.schema.ts` - Business Operations
Business-specific models for industrial operations:
- **ActionItem** - Recommended actions with status tracking
- **ActionItemType** - Enum for action types (immediate, scheduled, preventive)
- **ActionItemStatus** - Enum for action status (pending, approved, rejected, deferred)
- **WorkoverJob** - Maintenance jobs with financial metrics
- **WorkoverJobType** - Enum for job types (workover, completion, maintenance)
- **WorkoverJobPriority** - Enum for priority levels (high, medium, low)
- **WorkoverJobStatus** - Enum for job status (queued, inProgress, completed, delayed)
- **FinancialMetrics** - Financial metrics for workover jobs

## Usage

All schemas are combined in `amplify/data/resource.ts`:

```typescript
import { chatSchema } from './schemas/chat.schema';
import { mapSchema } from './schemas/map.schema';
import { athenaSchema } from './schemas/athena.schema';
import { mcpSchema } from './schemas/mcp.schema';
import { operationsSchema } from './schemas/operations.schema';

const schema = a.combine([
  chatSchema,
  mapSchema,
  athenaSchema,
  mcpSchema,
  operationsSchema,
]);
```

## Adding New Models

To add a new model:

1. Determine which schema file it belongs to (or create a new one)
2. Add the model definition to the appropriate schema file
3. If creating a new schema file, import and add it to the `a.combine()` array in `resource.ts`
4. Run `npm run sandbox` to deploy the changes

## Cross-Schema References

Models can reference types from other schemas. For example:
- `MapLayer` references `ChatSession` (from chat.schema.ts)
- `executeMapLayerQuery` returns `MapLayerQueryResult` (from map.schema.ts)

Amplify's `a.combine()` function handles these cross-references automatically.

## Authorization

Each model defines its own authorization rules:
- **owner()** - Only the owner can access
- **authenticated()** - Any authenticated user can access
- **guest()** - Unauthenticated users can access (read-only)

See individual schema files for specific authorization rules.
