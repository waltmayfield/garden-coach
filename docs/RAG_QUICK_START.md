# RAG Quick Start Guide

Get started with RAG (Retrieval Augmented Generation) in 5 minutes.

## What is RAG?

RAG allows the AI agent to retrieve information from your uploaded documents and use it to generate accurate, source-backed responses.

## Quick Setup

### 1. Deploy the Backend

```bash
npm run sandbox
```

Wait for deployment to complete (~10-15 minutes).

### 2. Upload Your First Document

1. Navigate to **Knowledge Base** in the menu
2. Click **Choose File** and select a document
3. Enter a title (e.g., "Safety Procedures")
4. Click **Upload to Knowledge Base**
5. Wait for "Document uploaded successfully" message

### 3. Ask a Question

1. Go to **Home** (chat interface)
2. Type: "What information do you have about [your document topic]?"
3. Press Enter
4. See the AI response with source citations

## Example Queries

Try these queries to test RAG:

```
"Search the knowledge base for safety procedures"
"What do the documents say about emergency protocols?"
"Retrieve information about equipment maintenance"
"What documentation do we have on hazardous materials?"
```

## Understanding the Response

When RAG is used, you'll see:

1. **Tool Execution**: Shows the RAG tool being called
2. **Knowledge Base Sources**: Click "Show Sources" to expand
3. **Source Cards**: Each shows:
   - Relevance score (higher is better)
   - Document excerpt
   - Link to full document

## Tips for Best Results

### Document Upload
- Use clear, descriptive titles
- Upload related documents together
- Supported formats: PDF, TXT, MD, DOC, DOCX
- Max file size: 50MB

### Queries
- Be specific in your questions
- Mention document types when known
- Use domain-specific terminology
- Ask follow-up questions to refine

### Relevance Scores
- 80-100%: Highly relevant ✅
- 60-79%: Moderately relevant ⚠️
- <60%: Low relevance ❌

## Common Issues

### "No sources found"
- Wait 5-10 minutes after upload for indexing
- Try a different query
- Check document was uploaded to correct location

### "Knowledge Base not configured"
- Verify deployment completed successfully
- Check `KNOWLEDGE_BASE_ID` in environment variables
- Redeploy if necessary

### Low relevance scores
- Improve document quality and structure
- Use more specific queries
- Add metadata to documents

## Next Steps

1. Upload more documents to build your knowledge base
2. Experiment with different query styles
3. Review the [full RAG guide](./RAG_KNOWLEDGE_BASE_GUIDE.md)
4. Set up monitoring in CloudWatch

## Need Help?

- Check [RAG Knowledge Base Guide](./RAG_KNOWLEDGE_BASE_GUIDE.md)
- Review [Deployment Summary](./RAG_DEPLOYMENT_SUMMARY.md)
- Check CloudWatch logs for errors
- Contact your system administrator

## Architecture Overview

```
Your Documents → S3 → Bedrock Knowledge Base → OpenSearch Serverless
                                    ↓
                              AI Agent with RAG
                                    ↓
                            Source-backed Responses
```

## Key Benefits

- **Accurate**: Responses backed by your documents
- **Transparent**: See which sources were used
- **Up-to-date**: Add new documents anytime
- **Secure**: Access controlled via authentication

Start uploading documents and asking questions!
