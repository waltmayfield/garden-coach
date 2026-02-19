# Quick Start: Custom Tool UI

## 5-Minute Guide to Adding Custom Tool Rendering

### 1. Create Your Component

```tsx
// src/components/tools/MyCustomTool.tsx
export const MyCustomTool = ({ data, onAction }) => {
  return (
    <div className="p-4 border rounded-lg bg-white shadow">
      <h3 className="font-bold mb-2">Custom Tool UI</h3>
      <div className="space-y-2">
        <p>Data: {JSON.stringify(data)}</p>
        <button 
          onClick={() => onAction(data)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Take Action
        </button>
      </div>
    </div>
  );
};
```

### 2. Register It

```tsx
// src/components/chat/customToolRenderers.tsx
import { ToolRenderer } from './ToolRenderer';
import { MyCustomTool } from '@/components/tools/MyCustomTool';

ToolRenderer.register('tool-my-custom-tool', ({ toolPart, chatSessionId }) => {
  return (
    <MyCustomTool
      data={toolPart.input}
      onAction={(data) => {
        console.log('Action taken:', data);
        // Add your logic here
      }}
    />
  );
});
```

### 3. Import It

```tsx
// src/app/layout.tsx (or wherever your app initializes)
import '@/components/chat/customToolRenderers';
```

That's it! Your custom UI will now render instead of the default tool display.

## Common Patterns

### Hide a Tool

```tsx
ToolRenderer.register('tool-internal-only', () => null);
```

### Access Chat Context

```tsx
ToolRenderer.register('tool-my-tool', ({ toolPart, messageId, chatSessionId }) => {
  // toolPart.input - The tool's input parameters
  // toolPart.output - The tool's output (if available)
  // toolPart.state - 'in-progress' | 'output-available' | 'output-error'
  // messageId - ID of the parent message
  // chatSessionId - Current chat session ID
  
  return <MyComponent {...toolPart.input} />;
});
```

### Conditional Rendering

```tsx
ToolRenderer.register('tool-my-tool', ({ toolPart }) => {
  if (toolPart.state === 'in-progress') {
    return <LoadingSpinner />;
  }
  
  if (toolPart.state === 'output-error') {
    return <ErrorDisplay error={toolPart.errorText} />;
  }
  
  return <SuccessDisplay data={toolPart.output} />;
});
```

### Interactive Tools

```tsx
ToolRenderer.register('tool-approval-required', ({ toolPart, messageId }) => {
  const [status, setStatus] = useState('pending');
  
  const handleApprove = async () => {
    setStatus('approved');
    // Call your API or trigger next action
    await approveAction(toolPart.input);
  };
  
  return (
    <ApprovalCard
      data={toolPart.input}
      status={status}
      onApprove={handleApprove}
      onReject={() => setStatus('rejected')}
    />
  );
});
```

## Tool Types

Tool types follow the pattern: `tool-{toolName}`

Examples:
- `tool-draft-work-order`
- `tool-generate_suggestions`
- `tool-query-database`
- `tool-create-map-layer`

## Debugging

Check if your renderer is registered:

```tsx
import { ToolRenderer } from '@/components/chat/ToolRenderer';

console.log(ToolRenderer.hasRenderer('tool-my-tool')); // true/false
```

List all registered renderers:

```tsx
// In browser console
window.ToolRenderer = ToolRenderer;
```

## Examples in This Project

See `customToolRenderers.tsx` for commented examples including:
- Work order draft approval flow
- Hidden internal tools
- Analytics dashboard

## Need Help?

See the full documentation in `README.md` for:
- Complete API reference
- Architecture overview
- Advanced patterns
- Migration guide
