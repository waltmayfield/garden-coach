# Chat Components

Modular chat components for building conversational interfaces with custom tool rendering.

## Overview

The chat functionality has been refactored into smaller, focused components to improve maintainability and make it easier to customize tool rendering.

## Components

### `ChatBox.tsx`
Main chat component that orchestrates the conversation UI. Now much cleaner and focused on composition rather than implementation details.

### `MessageRenderer.tsx`
Handles rendering of individual messages and their parts (text, reasoning, tools, images, etc.). Uses the `ToolRenderer` registry to support custom tool UI.

### `MessageImage.tsx`
Displays images and file attachments in messages with click-to-expand functionality, loading states, and error handling.

### `MessageActions.tsx`
Renders action buttons for messages (copy, retry, etc.).

### `ToolRenderer.tsx`
Registry system for custom tool UI components. Allows you to replace default tool rendering with custom components.

### `EmptyState.tsx`
Displays the empty conversation state when no messages exist.

### `SuggestionList.tsx`
Renders suggested prompts for the user.

### `useSuggestions.ts`
Hook that manages chat suggestions based on AI responses.

### `useChatPersistence.ts`
Hook that handles loading and saving chat messages to the database.

## Adding Custom Tool UI

To add custom UI for a specific tool, use the `ToolRenderer` registry:

### Step 1: Create your custom component

```tsx
// src/components/WorkOrderDraft.tsx
export const WorkOrderDraft = ({ data, onApprove, onReject, status }) => {
  return (
    <div className="p-4 border rounded-lg">
      <h3>Draft Work Order</h3>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <button onClick={() => onApprove(data)}>Approve</button>
      <button onClick={() => onReject()}>Reject</button>
    </div>
  );
};
```

### Step 2: Register the custom renderer

```tsx
// src/components/chat/customToolRenderers.tsx
import { ToolRenderer } from './ToolRenderer';
import { WorkOrderDraft } from '@/components/WorkOrderDraft';

ToolRenderer.register('tool-draft-work-order', ({ toolPart, messageId, chatSessionId }) => {
  return (
    <WorkOrderDraft
      data={toolPart.input}
      onApprove={(data) => {
        // Handle approval
        console.log('Approved:', data);
      }}
      onReject={(reason) => {
        // Handle rejection
        console.log('Rejected:', reason);
      }}
      status="pending"
    />
  );
});
```

### Step 3: Import the registration file

```tsx
// src/app/layout.tsx or src/components/ChatBox.tsx
import '@/components/chat/customToolRenderers';
```

## Hiding Tools from UI

To hide a tool from the UI (e.g., internal tools that shouldn't be displayed):

```tsx
ToolRenderer.register('tool-generate_suggestions', () => null);
```

This is already done by default for the `tool-generate_suggestions` tool.

## Architecture

```
ChatBox
├── EmptyState (when no messages)
├── MessageRenderer (for each message)
│   ├── Text parts → Response component
│   ├── File parts → MessageImage component
│   ├── Reasoning parts → Reasoning component
│   ├── Tool parts → ToolRenderer.getRenderer()
│   │   ├── Custom renderer (if registered)
│   │   └── Default Tool component (fallback)
│   └── MessageActions (copy, retry)
├── SuggestionList (when ready)
└── PromptInput
```

## Benefits

1. **Modularity**: Each component has a single responsibility
2. **Testability**: Smaller components are easier to test
3. **Customization**: Easy to add custom tool UI without modifying core components
4. **Maintainability**: Changes to one part don't affect others
5. **Reusability**: Components can be used in other contexts

## Example: Complete Custom Tool Flow

```tsx
// 1. Define your tool component
// src/components/tools/AnalyticsDashboard.tsx
export const AnalyticsDashboard = ({ query, results }) => {
  return (
    <div className="analytics-dashboard">
      <h3>Analytics Results</h3>
      <div>Query: {query}</div>
      <div>Results: {results?.length} items</div>
    </div>
  );
};

// 2. Register the renderer
// src/components/chat/customToolRenderers.tsx
import { AnalyticsDashboard } from '@/components/tools/AnalyticsDashboard';

ToolRenderer.register('tool-run-analytics', ({ toolPart }) => {
  return (
    <AnalyticsDashboard
      query={toolPart.input?.query}
      results={toolPart.output?.results}
    />
  );
});

// 3. Import in your app
// src/app/layout.tsx
import '@/components/chat/customToolRenderers';
```

## API Reference

### ToolRenderer

Static class for managing custom tool renderers.

#### Methods

- `register(toolType: string, renderer: ToolRendererFunction): void`
  - Register a custom renderer for a tool type
  
- `unregister(toolType: string): void`
  - Remove a custom renderer
  
- `getRenderer(toolType: string): ToolRendererFunction | undefined`
  - Get the renderer for a tool type
  
- `hasRenderer(toolType: string): boolean`
  - Check if a custom renderer exists
  
- `clear(): void`
  - Remove all custom renderers

#### ToolRendererContext

```typescript
interface ToolRendererContext {
  toolPart: ToolUIPart;      // The tool part from the message
  messageId: string;          // ID of the parent message
  partIndex: number;          // Index of this part in the message
  chatSessionId: string;      // Current chat session ID
}
```

#### ToolRendererFunction

```typescript
type ToolRendererFunction = (context: ToolRendererContext) => ReactNode | null;
```

## Migration Guide

If you have existing custom tool rendering logic in `ChatBox.tsx`, here's how to migrate:

### Before (in ChatBox.tsx)
```tsx
if (toolPart.type === 'tool-draft-work-order') {
  return <WorkOrderDraft data={toolPart.input} />;
}
```

### After (in customToolRenderers.tsx)
```tsx
ToolRenderer.register('tool-draft-work-order', ({ toolPart }) => {
  return <WorkOrderDraft data={toolPart.input} />;
});
```

Then import the registration file in your app initialization.
