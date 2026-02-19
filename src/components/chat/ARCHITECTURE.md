# Chat Architecture

## Component Hierarchy

```
ChatBox (Main Container)
│
├─── Conversation
│    │
│    ├─── ConversationContent
│    │    │
│    │    ├─── EmptyState (when messages.length === 0)
│    │    │
│    │    ├─── Messages (map over messages array)
│    │    │    │
│    │    │    ├─── Sources (if assistant message has source-url parts)
│    │    │    │
│    │    │    └─── MessageRenderer (for each message)
│    │    │         │
│    │    │         ├─── Text Parts
│    │    │         │    ├─── Message
│    │    │         │    │    └─── MessageContent
│    │    │         │    │         └─── Response (preprocessed HTML)
│    │    │         │    │
│    │    │         │    └─── MessageActions
│    │    │         │         ├─── Retry (if last message)
│    │    │         │         └─── Copy
│    │    │         │
│    │    │         ├─── Reasoning Parts
│    │    │         │    └─── Reasoning
│    │    │         │         ├─── ReasoningTrigger
│    │    │         │         └─── ReasoningContent
│    │    │         │
│    │    │         └─── Tool Parts
│    │    │              │
│    │    │              ├─── Custom Renderer (if registered)
│    │    │              │    └─── ToolRenderer.getRenderer()
│    │    │              │         └─── Your Custom Component
│    │    │              │
│    │    │              └─── Default Tool (fallback)
│    │    │                   └─── Tool
│    │    │                        ├─── ToolHeader
│    │    │                        └─── ToolContent
│    │    │                             ├─── ToolInput
│    │    │                             └─── ToolOutput
│    │    │
│    │    ├─── Loader (when status === 'submitted')
│    │    │
│    │    └─── SuggestionList (when status === 'ready')
│    │         └─── Suggestion (for each suggestion)
│    │
│    └─── ConversationScrollButton
│
└─── PromptInput
     ├─── PromptInputHeader
     │    └─── PromptInputAttachments
     │
     ├─── PromptInputBody
     │    └─── PromptInputTextarea
     │
     └─── PromptInputFooter
          ├─── PromptInputTools
          │    ├─── PromptInputActionMenu
          │    └─── PromptInputModelSelect
          │
          └─── PromptInputSubmit
```

## Data Flow

```
User Input
    ↓
handleSubmit()
    ↓
sendMessage() [useChat hook]
    ↓
AgentCoreChatTransport
    ↓
AgentCore Runtime (Backend)
    ↓
Streaming Response
    ↓
messages state updated
    ↓
MessageRenderer renders parts
    ↓
ToolRenderer checks for custom UI
    ↓
Render custom or default component
    ↓
onFinish callback
    ↓
saveNewMessages() [useChatPersistence]
    ↓
Save to DynamoDB
```

## State Management

### Local State (useState)
- `input` - Current textarea value
- `model` - Selected AI model

### Chat State (useChat hook)
- `messages` - Array of chat messages
- `status` - 'ready' | 'submitted' | 'streaming'
- `error` - Error object if request fails

### Derived State (useSuggestions)
- `suggestions` - Computed from latest assistant message
- Uses `useMemo` to avoid unnecessary recalculations

### Side Effects (useChatPersistence)
- Loads messages on mount
- Saves new messages after each response
- Uses `useRef` to track saved messages

## Custom Tool Rendering Flow

```
Message Part Type: 'tool-xyz'
    ↓
MessageRenderer detects tool part
    ↓
Check ToolRenderer.getRenderer('tool-xyz')
    ↓
    ├─── Custom Renderer Found
    │    └─── Render custom component
    │         └─── Pass context (toolPart, messageId, etc.)
    │
    └─── No Custom Renderer
         └─── Render default Tool component
              └─── Show ToolHeader, ToolInput, ToolOutput
```

## Hook Dependencies

### useSuggestions
- **Input**: `messages` array
- **Output**: `{ suggestions, setSuggestions }`
- **Logic**: Extracts suggestions from latest assistant message with `tool-generate_suggestions`

### useChatPersistence
- **Input**: `chatSessionId`, `messages`, `setMessages`
- **Output**: `{ saveNewMessages }`
- **Logic**: 
  - Loads messages on mount
  - Saves only new messages (not already in ref)
  - Updates ref after successful save

## Extension Points

### 1. Custom Tool Renderers
Register in `customToolRenderers.tsx`:
```tsx
ToolRenderer.register('tool-name', (context) => <Component />);
```

### 2. Custom Message Actions
Modify `MessageActions.tsx` to add new action buttons

### 3. Custom Empty State
Replace `EmptyState.tsx` with your own component

### 4. Custom Suggestions
Override `useSuggestions` or modify `SuggestionList.tsx`

### 5. Custom Persistence
Replace `useChatPersistence` with your own storage logic

## Performance Considerations

### Optimizations
- `useMemo` in `useSuggestions` prevents unnecessary recalculations
- `useRef` in `useChatPersistence` prevents duplicate saves
- Component splitting enables better code splitting
- Modular structure allows React to optimize re-renders

### Potential Improvements
- Virtualize message list for very long conversations
- Memoize `MessageRenderer` with `React.memo`
- Lazy load custom tool components
- Debounce suggestion updates

## Testing Strategy

### Unit Tests
- Test each component in isolation
- Mock hooks and dependencies
- Test custom tool renderers

### Integration Tests
- Test message flow end-to-end
- Test persistence logic
- Test suggestion extraction

### E2E Tests
- Test full chat interaction
- Test custom tool interactions
- Test error handling

## File Responsibilities

| File | Responsibility | Size |
|------|---------------|------|
| `ChatBox.tsx` | Orchestration & layout | ~230 lines |
| `MessageRenderer.tsx` | Message part rendering | ~100 lines |
| `MessageActions.tsx` | Action buttons | ~30 lines |
| `ToolRenderer.tsx` | Tool registry | ~60 lines |
| `EmptyState.tsx` | Empty view | ~20 lines |
| `SuggestionList.tsx` | Suggestion display | ~30 lines |
| `useSuggestions.ts` | Suggestion logic | ~40 lines |
| `useChatPersistence.ts` | Persistence logic | ~50 lines |

**Total: ~560 lines** (vs. 600+ in original monolithic component)

But now with:
- ✅ Better separation of concerns
- ✅ Easier to test
- ✅ Easier to extend
- ✅ Reusable components
- ✅ Clear extension points
