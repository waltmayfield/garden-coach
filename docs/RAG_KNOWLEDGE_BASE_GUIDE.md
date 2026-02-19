# RAG Knowledge Base Guide

This guide explains how to use the RAG (Retrieval Augmented Generation) capabilities powered by Amazon Bedrock Knowledge Bases.

## Overview

The Digital Operations Agent now includes a Knowledge Base that allows the AI to retrieve and reference information from your uploaded documents. This enables:

- **Source-backed answers**: AI responses include citations from your documents
- **Domain-specific knowledge**: Upload technical documentation, procedures, and policies
- **Accurate information retrieval**: Semantic search finds relevant content
- **Transparency**: See which documents were used to generate each response

## Architecture

### Components

1. **Amazon Bedrock Knowledge Base**: Manages document indexing and retrieval
2. **OpenSearch Serverless**: Vector storage for semantic search
3. **S3 Storage**: Document storage in the `documents/` prefix
4. **DynamoDB**: Document metadata and tracking
5. **Agent Tools**: `retrieve-documents` and `retrieve-and-generate`

### Data Flow

```
User uploads document
  → S3 (documents/ prefix)
    → Bedrock Knowledge Base indexes document
      → OpenSearch Serverless stores vectors
        → Agent retrieves relevant chunks
          → UI displays sources with citations
```

## Using the Knowledge Base

### Uploading Documents

1. Navigate to **Knowledge Base** in the navigation menu
2. Click **Choose File** and select your document
3. Enter a descriptive **Title**
4. Optionally add a **Description**
5. Click **Upload to Knowledge Base**

**Supported formats:**
- PDF (.pdf)
- Text (.txt)
- Markdown (.md)
- Word documents (.doc, .docx)

**Best practices:**
- Use descriptive titles that indicate the document's content
- Add descriptions to help with discovery
- Upload documents in logical groups (e.g., all safety procedures together)
- Keep documents focused on specific topics

### Querying the Knowledge Base

The AI agent automatically uses the knowledge base when appropriate. You can also explicitly request it:

**Example queries:**
- "What do the safety procedures say about PPE?"
- "Search the knowledge base for information about emergency procedures"
- "What documentation do we have about equipment maintenance?"
- "Retrieve documents about hazardous materials handling"

### Understanding RAG Responses

When the agent uses RAG, you'll see:

1. **Tool Execution**: Shows which RAG tool was called
2. **Knowledge Base Sources**: Collapsible section with retrieved documents
3. **Source Cards**: Each source shows:
   - Source number
   - Relevance score (0-100%)
   - Document excerpt
   - Metadata (if available)
   - Link to source document

**Relevance scores:**
- 80-100%: Highly relevant
- 60-79%: Moderately relevant
- 40-59%: Somewhat relevant
- <40%: Low relevance

## RAG Tools

### retrieve-documents

Retrieves relevant documents without generating a response.

**Use when:**
- You want to see what documents are available
- You need to verify source material
- You want to explore the knowledge base

**Parameters:**
- `query`: Search query
- `maxResults`: Number of results (default: 5)

### retrieve-and-generate

Retrieves documents and generates a response using RAG.

**Use when:**
- You want a direct answer backed by sources
- You need synthesized information from multiple documents
- You want citations in the response

**Parameters:**
- `query`: Question or prompt
- `modelArn`: Optional model to use (default: Claude 3 Sonnet)

## Configuration

### Environment Variables

Set in `amplify/backend.ts`:

```typescript
environment: {
  KNOWLEDGE_BASE_ID: knowledgeBase.knowledgeBaseId,
}
```

### Indexing Configuration

Configured in `amplify/custom/knowledgeBase.ts`:

- **Chunking**: Fixed size, 512 tokens, 20% overlap
- **Parsing**: Bedrock Foundation Model (Claude 3 Sonnet)
- **Embeddings**: Amazon Titan Embed Text v2
- **Vector Storage**: OpenSearch Serverless

### S3 Prefix

Documents must be uploaded to the `documents/` prefix in the storage bucket. This is configured in the data source:

```typescript
inclusionPrefixes: ['documents/']
```

## Permissions

### Agent Permissions

The agent execution role has:
- `bedrock:Retrieve`
- `bedrock:RetrieveAndGenerate`
- Access to Knowledge Base resources

### User Permissions

Authenticated users can:
- Upload documents to S3 (`documents/` prefix)
- Create document records in DynamoDB
- Query the knowledge base through the agent

## Monitoring

### Document Status

Documents have the following statuses:
- `PENDING`: Uploaded, waiting for indexing
- `PROCESSING`: Currently being indexed
- `INDEXED`: Available for retrieval
- `FAILED`: Indexing failed

### CloudWatch Logs

Monitor RAG operations in CloudWatch:
- Agent logs: `/aws/bedrock/agentcore/[agent-id]`
- Knowledge Base logs: `/aws/bedrock/knowledgebases/[kb-id]`

## Troubleshooting

### Documents not appearing in search

1. Check document status in DynamoDB
2. Verify document is in `documents/` prefix
3. Wait for indexing to complete (can take 5-10 minutes)
4. Check CloudWatch logs for errors

### Low relevance scores

1. Improve document quality and structure
2. Use more specific queries
3. Add metadata to documents
4. Consider document chunking strategy

### RAG not being used

1. Verify `KNOWLEDGE_BASE_ID` environment variable is set
2. Check agent has proper permissions
3. Try explicitly requesting RAG in your query
4. Check agent logs for errors

### Upload failures

1. Check file size (max 50MB)
2. Verify file format is supported
3. Check S3 permissions
4. Review browser console for errors

## Best Practices

### Document Organization

- Use consistent naming conventions
- Group related documents
- Include metadata in document titles
- Keep documents up to date

### Query Optimization

- Be specific in your queries
- Use domain-specific terminology
- Reference document types when known
- Ask follow-up questions to refine results

### Performance

- Upload documents during off-peak hours
- Batch similar documents together
- Monitor indexing progress
- Clean up outdated documents

## API Reference

### GraphQL Mutations

```graphql
mutation UploadDocument {
  uploadDocument(
    title: "Safety Procedures"
    description: "Company safety guidelines"
    s3Key: "documents/safety-procedures.pdf"
    contentType: "application/pdf"
    fileSize: 1024000
  ) {
    id
    status
  }
}
```

### GraphQL Queries

```graphql
query GetDocument {
  getDocument(id: "doc-123") {
    id
    title
    status
    uploadedAt
  }
}

query GetIndexingStatus {
  getIndexingStatus(documentId: "doc-123") {
    status
    progress
    errorMessage
  }
}
```

## Advanced Topics

### Custom Parsing

Modify parsing configuration in `amplify/custom/knowledgeBase.ts`:

```typescript
parsingConfiguration: {
  parsingStrategy: 'BEDROCK_FOUNDATION_MODEL',
  bedrockFoundationModelConfiguration: {
    modelArn: 'your-model-arn',
    parsingPrompt: {
      parsingPromptText: 'Your custom parsing instructions',
    },
  },
}
```

### Metadata Filtering

Add metadata to documents for filtering:

```typescript
metadata: {
  category: 'safety',
  department: 'operations',
  version: '2.0',
}
```

### Multi-modal Documents

For documents with images and charts:
- Use advanced parsing options
- Enable image extraction
- Configure image storage in S3

## Security

### Data Protection

- Documents are encrypted at rest in S3
- Vector data is encrypted in OpenSearch Serverless
- Access controlled via IAM and Cognito

### Access Control

- Only authenticated users can upload documents
- Document access follows S3 bucket policies
- Agent access is scoped to specific Knowledge Base

## Cost Optimization

### Storage Costs

- S3 storage for documents
- OpenSearch Serverless collection
- Consider lifecycle policies for old documents

### Retrieval Costs

- Charged per retrieval request
- Optimize query frequency
- Use caching where appropriate

### Indexing Costs

- Charged per document indexed
- Batch uploads to reduce costs
- Remove duplicate documents

## Future Enhancements

Planned features:
- Document versioning
- Bulk upload
- Document search UI
- Usage analytics
- Custom metadata fields
- Document expiration
- Multi-language support

## Support

For issues or questions:
1. Check CloudWatch logs
2. Review this documentation
3. Check AWS Bedrock Knowledge Bases documentation
4. Contact your system administrator
