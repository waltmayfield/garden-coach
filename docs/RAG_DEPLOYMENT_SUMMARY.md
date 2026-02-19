# RAG Knowledge Base Implementation Summary

## What Was Implemented

This implementation adds comprehensive RAG (Retrieval Augmented Generation) capabilities to the Digital Operations Agent using Amazon Bedrock Knowledge Bases with OpenSearch Serverless vector storage.

## Changes Made

### 1. Backend Infrastructure

#### Knowledge Base Schema (`amplify/data/schemas/knowledgebase.schema.ts`)
- **Document model**: Tracks uploaded documents with metadata
- **RetrievalResult model**: Logs retrieval operations for analytics
- **Custom queries**: `retrieveWithRAG`, `uploadDocument`, `getIndexingStatus`

#### Knowledge Base Construct (`amplify/custom/knowledgeBase.ts`)
- Creates OpenSearch Serverless collection for vector storage
- Configures Bedrock Knowledge Base with Titan embeddings
- Sets up S3 data source with advanced parsing
- Implements security policies and IAM roles
- Configures chunking strategy (512 tokens, 20% overlap)

#### Backend Configuration (`amplify/backend.ts`)
- Instantiates Knowledge Base construct
- Grants agent permissions for RAG operations
- Adds `KNOWLEDGE_BASE_ID` environment variable
- Exports Knowledge Base IDs in outputs

### 2. Agent Implementation

#### RAG Tools (`amplify/agent/server/src/tools/ragTools.ts`)
- **retrieve-documents**: Semantic search with relevance scores
- **retrieve-and-generate**: RAG-powered response generation
- Error handling and logging
- Configurable result limits

#### Agent Initialization (`amplify/agent/server/src/init.ts`)
- Registers RAG tools with agent
- Updates system prompt with RAG guidance
- Configures tool parameters and schemas

#### Dependencies (`amplify/agent/server/package.json`)
- Added `@aws-sdk/client-bedrock-agent-runtime` for RAG operations

### 3. Frontend UI

#### RAG Sources Component (`src/components/chat/RagSources.tsx`)
- Displays retrieved documents with relevance scores
- Collapsible source citations
- Visual relevance indicators
- Links to source documents
- Metadata badges

#### RAG Tool Renderer (`src/components/chat/RagToolRenderer.tsx`)
- Custom rendering for `retrieve-documents` tool
- Custom rendering for `retrieve-and-generate` tool
- Integrates with existing tool system

#### Knowledge Base Page (`src/app/(with-layout)/(with-auth)/knowledge-base/page.tsx`)
- Document upload interface
- Title and description fields
- Upload progress and status
- Success/error messaging
- Usage instructions

#### Navigation (`src/components/Navigation.tsx`)
- Added "Knowledge Base" link with BookOpen icon
- Accessible from main navigation

#### ChatBox Integration (`src/components/ChatBox.tsx`)
- Imports RAG tool renderer
- Enables RAG source display in chat

### 4. Testing

#### E2E Tests (`e2e/knowledge-base.spec.ts`)
- Document upload flow
- RAG retrieval in chat
- Source citation display
- Error handling
- Navigation between pages
- Form validation

#### Test Fixtures (`e2e/fixtures/test-document.txt`)
- Sample safety procedures document
- Realistic content for testing

### 5. Documentation

#### RAG Guide (`docs/RAG_KNOWLEDGE_BASE_GUIDE.md`)
- Complete usage instructions
- Architecture overview
- Configuration details
- Troubleshooting guide
- Best practices
- API reference

## Deployment Steps

### Prerequisites
1. AWS CLI configured with appropriate credentials
2. Docker installed and running
3. Node.js 20+ installed

### Deploy Backend

```bash
# Install dependencies
npm install

# Build agent server
cd amplify/agent/server
npm install
npm run build
cd ../../..

# Deploy to AWS
npm run sandbox
```

This will:
1. Create OpenSearch Serverless collection
2. Deploy Bedrock Knowledge Base
3. Configure S3 data source
4. Update agent with RAG tools
5. Deploy all infrastructure

### Verify Deployment

After deployment completes:

1. Check CloudFormation stack status
2. Verify Knowledge Base ID in outputs
3. Test document upload
4. Try RAG queries in chat

### Post-Deployment Configuration

1. **Upload Initial Documents**
   - Navigate to Knowledge Base page
   - Upload company documentation
   - Wait for indexing (5-10 minutes)

2. **Test RAG Functionality**
   - Ask questions about uploaded documents
   - Verify source citations appear
   - Check relevance scores

3. **Monitor Performance**
   - Check CloudWatch logs
   - Review retrieval metrics
   - Monitor costs

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  Chat UI     │  │  KB Upload   │  │  RAG Sources │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      AgentCore Runtime                       │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Agent with RAG Tools                                 │  │
│  │  - retrieve-documents                                 │  │
│  │  - retrieve-and-generate                              │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   Amazon Bedrock                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Knowledge Base                                       │  │
│  │  - Titan Embeddings                                   │  │
│  │  - Claude 3 Sonnet Parsing                            │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                    ┌─────────┴─────────┐
                    ▼                   ▼
┌──────────────────────────┐  ┌──────────────────────────┐
│  OpenSearch Serverless   │  │  S3 Storage              │
│  - Vector Storage        │  │  - documents/ prefix     │
│  - Semantic Search       │  │  - Document files        │
└──────────────────────────┘  └──────────────────────────┘
```

## Key Features

### 1. Semantic Search
- Uses Amazon Titan embeddings for vector search
- Finds relevant content even with different wording
- Returns relevance scores for transparency

### 2. Source Citations
- Every RAG response includes source documents
- Relevance scores show confidence
- Links to original documents
- Metadata for context

### 3. Advanced Parsing
- Uses Claude 3 Sonnet for document parsing
- Extracts structure and relationships
- Handles complex documents (PDFs, Word, etc.)
- Preserves context across chunks

### 4. User-Friendly Interface
- Simple document upload
- Clear source display
- Collapsible citations
- Visual relevance indicators

### 5. Monitoring & Analytics
- Document status tracking
- Retrieval result logging
- CloudWatch integration
- Performance metrics

## Cost Considerations

### Storage
- S3: ~$0.023/GB/month
- OpenSearch Serverless: ~$0.24/OCU-hour
- Minimum 2 OCUs required

### Retrieval
- ~$0.0004 per retrieval request
- Depends on query frequency

### Indexing
- ~$0.10 per 1000 documents
- One-time cost per document

### Embeddings
- Titan Embed Text v2: ~$0.0001 per 1000 tokens
- Charged during indexing and retrieval

## Security

### Data Protection
- S3 encryption at rest (AES-256)
- OpenSearch Serverless encryption
- TLS in transit
- IAM-based access control

### Access Control
- Cognito authentication required
- IAM roles for agent
- S3 bucket policies
- Knowledge Base access policies

## Performance

### Indexing
- 5-10 minutes for typical documents
- Parallel processing for multiple documents
- Automatic retry on failures

### Retrieval
- Sub-second response times
- Configurable result limits
- Caching for frequently accessed content

## Limitations

### Document Size
- Max 50MB per document
- Larger documents split into chunks
- Consider pre-processing very large files

### Supported Formats
- PDF, TXT, MD, DOC, DOCX
- Images extracted from PDFs
- Tables preserved in parsing

### Query Complexity
- Best for factual questions
- May struggle with very abstract queries
- Optimize queries for better results

## Next Steps

### Immediate
1. Deploy the infrastructure
2. Upload initial documents
3. Test RAG functionality
4. Train users on the interface

### Short-term
1. Add document versioning
2. Implement bulk upload
3. Create usage analytics dashboard
4. Add document search UI

### Long-term
1. Multi-language support
2. Custom metadata fields
3. Document expiration policies
4. Advanced filtering options

## Troubleshooting

### Common Issues

1. **Documents not indexed**
   - Check S3 prefix (must be `documents/`)
   - Verify file format is supported
   - Wait 5-10 minutes for indexing
   - Check CloudWatch logs

2. **Low relevance scores**
   - Improve document quality
   - Use more specific queries
   - Add metadata to documents
   - Review chunking strategy

3. **RAG not triggered**
   - Verify `KNOWLEDGE_BASE_ID` is set
   - Check agent permissions
   - Explicitly request RAG in query
   - Review agent logs

4. **Upload failures**
   - Check file size (<50MB)
   - Verify S3 permissions
   - Check network connectivity
   - Review browser console

## Support Resources

- [AWS Bedrock Knowledge Bases Documentation](https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html)
- [OpenSearch Serverless Documentation](https://docs.aws.amazon.com/opensearch-service/latest/developerguide/serverless.html)
- [RAG Knowledge Base Guide](./RAG_KNOWLEDGE_BASE_GUIDE.md)
- CloudWatch Logs for debugging

## Conclusion

This implementation provides a production-ready RAG system with:
- Robust infrastructure using AWS managed services
- User-friendly interface for document management
- Transparent source citations
- Comprehensive monitoring and logging
- Security best practices
- Scalable architecture

The system is ready for deployment and can be extended with additional features as needed.
