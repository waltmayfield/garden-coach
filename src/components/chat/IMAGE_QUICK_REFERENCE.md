# Image Handling - Quick Reference

## 🖼️ Display Images in Chat

### Basic Usage

```tsx
sendMessage({
  role: 'user',
  parts: [
    { type: 'file', url: 'https://example.com/image.png', mediaType: 'image/png' },
    { type: 'text', text: 'What is this?' }
  ]
});
```

## 📋 Message Part Types

| Type | Description | Example |
|------|-------------|---------|
| `text` | Text content | `{ type: 'text', text: 'Hello' }` |
| `file` | Image/file | `{ type: 'file', url: '...', mediaType: 'image/png' }` |
| `reasoning` | AI reasoning | `{ type: 'reasoning', text: 'Let me think...' }` |
| `tool-*` | Tool calls | `{ type: 'tool-search', ... }` |

## 🎨 Image Features

| Feature | Description |
|---------|-------------|
| ✅ Display | Shows images inline with proper sizing |
| ✅ Click to Expand | Opens fullscreen modal |
| ✅ Loading State | Animated skeleton while loading |
| ✅ Error Handling | Fallback UI for broken images |
| ✅ Hover Effect | Shows zoom icon on hover |
| ✅ File Support | Shows file card for non-images |

## 📝 Common Patterns

### Pattern 1: Image URL
```tsx
{ type: 'file', url: 'https://cdn.example.com/photo.jpg', mediaType: 'image/jpeg' }
```

### Pattern 2: Base64 Image
```tsx
{ type: 'file', url: 'data:image/png;base64,iVBORw0KG...', mediaType: 'image/png' }
```

### Pattern 3: With Filename
```tsx
{ type: 'file', url: '...', mediaType: 'image/png', filename: 'screenshot.png' }
```

### Pattern 4: Multiple Images
```tsx
parts: [
  { type: 'file', url: 'image1.jpg', mediaType: 'image/jpeg' },
  { type: 'file', url: 'image2.jpg', mediaType: 'image/jpeg' },
  { type: 'text', text: 'Compare these' }
]
```

## 🔧 File Upload Helper

```tsx
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
  });
};

// Usage
const base64 = await fileToBase64(file);
sendMessage({
  role: 'user',
  parts: [
    { type: 'file', url: base64, mediaType: file.type, filename: file.name },
    { type: 'text', text: 'Analyze this' }
  ]
});
```

## 🎯 Supported Media Types

### Images (Auto-display)
- `image/png`
- `image/jpeg` / `image/jpg`
- `image/gif`
- `image/webp`
- `image/svg+xml`

### Other Files (File card)
- `application/pdf`
- `text/*`
- Any other MIME type

## 🚀 Quick Examples

### Example 1: Simple Image
```tsx
const { sendMessage } = useChat();

sendMessage({
  role: 'user',
  parts: [
    { type: 'file', url: 'https://example.com/photo.jpg', mediaType: 'image/jpeg' },
    { type: 'text', text: 'Describe this photo' }
  ]
});
```

### Example 2: File Upload
```tsx
<input
  type="file"
  accept="image/*"
  onChange={async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const base64 = await fileToBase64(file);
    sendMessage({
      role: 'user',
      parts: [
        { type: 'file', url: base64, mediaType: file.type, filename: file.name },
        { type: 'text', text: 'What is this?' }
      ]
    });
  }}
/>
```

### Example 3: Drag & Drop
```tsx
<div
  onDrop={async (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file?.type.startsWith('image/')) return;
    
    const base64 = await fileToBase64(file);
    sendMessage({
      role: 'user',
      parts: [
        { type: 'file', url: base64, mediaType: file.type },
        { type: 'text', text: 'Analyze this image' }
      ]
    });
  }}
  onDragOver={(e) => e.preventDefault()}
>
  Drop image here
</div>
```

## 🎨 Styling

### Default Styles
- Max width: 448px (max-w-md)
- Rounded corners
- Border with hover effect
- Smooth transitions

### Custom Styling
```tsx
<MessageImage
  url={imageUrl}
  className="max-w-lg border-2 border-blue-500 shadow-lg"
/>
```

## ⚡ Performance Tips

1. **Optimize Images**: Resize before sending
2. **Use CDN**: Host images on CDN for faster loading
3. **Compress**: Reduce file size (quality: 0.8)
4. **Thumbnails**: Use thumbnails for large images

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Image not showing | Check URL is accessible and CORS headers |
| Slow loading | Optimize image size, use CDN |
| Modal not opening | Check z-index conflicts |
| Error state | Verify URL and media type are correct |

## 📚 Full Documentation

- **IMAGE_HANDLING.md** - Complete guide
- **EXAMPLES.md** - More code examples
- **README.md** - Component overview

## 🔗 AI SDK Resources

- [Multimodal Chat](https://ai-sdk.dev/docs/ai-sdk-ui/chatbot)
- [Image Prompts](https://ai-sdk.dev/cookbook/next/stream-text-with-image-prompt)
- [UIMessage Docs](https://ai-sdk.dev/docs/reference/ai-sdk-core/ui-message)
