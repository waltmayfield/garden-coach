# S3 Vectors Implementation for RAG Knowledge Base

## Overview

This document describes the implementation of Amazon Bedrock Knowledge Base using S3 Vectors as the vector storage layer instead of OpenSearch Serverless.

## Why S3 Vectors?

S3 Vectors provides several advantages:
- **Native S3 integration**: Vector storage directly in S3
- **Massive scale**: Up to 2 billion vectors per index (40x increase from preview)
- **Low latency**: Sub-100ms query latencies
- **Cost-effective**: Up to 90% cost reduction compared to traditional vector databases
- **Serverless**: No infrastructure to manage

## Architecture

```
Documents (S3 Bucket)
    ↓
Bedrock Knowledge Base
    ↓
Titan Embeddings V2 (1024 dimensions)
    ↓
S3 Vector Bucket + Index
    ↓
RAG Queries
```

## Implementation Details

### CDK Resources

The implementation uses AWS CDK L1 constructs from `aws-cdk-lib/aws-s3vectors`:

1. **CfnVectorBucket**: Creates an S3 bucket optimized for vector storage
2. **CfnIndex**: Creates a vector index with the following configuration:
   - Data type: `float32`
   - Dimension: `1024` (matches Titan Text Embeddings V2)
   - Distance metric: `cosine`

### IAM Permissions

The Knowledge Base role requires the following S3 Vectors permissions:
- `s3vectors:PutVectors` - Write embeddings to the index
- `s3vectors:GetVectors` - Read embeddings from the index
- `s3vectors:DeleteVectors` - Remove embeddings when documents are deleted
- `s3vectors:QueryVectors` - Query the index for similar vectors
- `s3vectors:GetIndex` - Get index metadata
- `s3vectors:ListIndexes` - List available indexes

### IAM Propagation Handling

IAM policies can take up to 10-15 seconds to propagate globally. The implementation includes a custom resource with a Lambda function that introduces a 15-second delay between IAM policy creation and Knowledge Base creation. This ensures Bedrock can successfully validate permissions when creating the Knowledge Base.

### Chunking Strategy

The implementation uses **semantic chunking** for optimal context preservation:
- Max tokens: 300
- Buffer size: 1
- Breakpoint percentile threshold: 95

This strategy uses AI to identify natural semantic boundaries for chunking, providing better context than fixed-size chunking.

## Deployment

### Prerequisites

1. AWS CDK with S3 Vectors support (included in aws-cdk-lib)
2. Bedrock model access for Titan Text Embeddings V2
3. Existing S3 bucket for document storage (provided by `backend.storage.resources.bucket`)

### Deploy Command

```bash
npm run sandbox
```

This will:
1. Create the S3 Vector Bucket
2. Create the Vector Index with cosine similarity
3. Create the Bedrock Knowledge Base
4. Create the S3 Data Source pointing to `documents/` prefix
5. Set up all necessary IAM roles and permissions

### Verify Deployment

Check the CloudFormation outputs:
```bash
aws cloudformation describe-stacks \
  --stack-name <your-stack-name> \
  --query 'Stacks[0].Outputs'
```

Look for:
- `KnowledgeBaseId` - The Knowledge Base ID
- `DataSourceId` - The Data Source ID
- `VectorBucketArn` - The S3 Vector Bucket ARN
- `VectorIndexArn` - The Vector Index ARN
- `StorageType` - Should be "S3_VECTORS"

## Usage

### Upload Documents

Upload documents to the `documents/` prefix in your storage bucket:

```bash
aws s3 cp my-document.pdf s3://<bucket-name>/documents/
```

### Trigger Ingestion

Start an ingestion job to process the documents:

```bash
aws bedrock-agent start-ingestion-job \
  --knowledge-base-id <kb-id> \
  --data-source-id <ds-id>
```

### Query the Knowledge Base

Use the RAG tools in the agent or query directly:

```bash
aws bedrock-agent-runtime retrieve-and-generate \
  --input '{"text":"Your question here"}' \
  --retrieve-and-generate-configuration '{
    "type":"KNOWLEDGE_BASE",
    "knowledgeBaseConfiguration":{
      "knowledgeBaseId":"<kb-id>",
      "modelArn":"arn:aws:bedrock:us-east-1::foundation-model/anthropic.claude-3-sonnet-20240229-v1:0"
    }
  }'
```

## Frontend Integration

The Knowledge Base page (`src/app/(with-layout)/(with-auth)/knowledge-base/page.tsx`) provides:
- Document upload interface
- Ingestion job management
- RAG query testing
- Document list and management

The chat interface automatically displays RAG sources when the agent uses the Knowledge Base.

## Monitoring

### Check Ingestion Status

```bash
aws bedrock-agent list-ingestion-jobs \
  --knowledge-base-id <kb-id> \
  --data-source-id <ds-id>
```

### CloudWatch Logs

Monitor the agent logs for RAG queries:
```bash
aws logs tail /aws/lambda/<agent-function-name> --follow
```

## Troubleshooting

### Common Issues

1. **"Vector store must be in the same region"**
   - Ensure all resources (Knowledge Base, Vector Bucket, Index) are in the same region
   - This is handled automatically by the CDK construct

2. **"Properties validation failed"**
   - Ensure you're using `indexArn` (not `indexName`) in the S3VectorsConfiguration
   - Verify the index has the correct dimension (1024 for Titan V2)

3. **Ingestion job fails**
   - Check IAM permissions for the Knowledge Base role
   - Verify documents are in the `documents/` prefix
   - Check document format (PDF, TXT, MD, HTML, DOC, DOCX supported)

### Debug Commands

Check Knowledge Base configuration:
```bash
aws bedrock-agent get-knowledge-base --knowledge-base-id <kb-id>
```

Check Data Source configuration:
```bash
aws bedrock-agent get-data-source \
  --knowledge-base-id <kb-id> \
  --data-source-id <ds-id>
```

## Cost Optimization

S3 Vectors is significantly more cost-effective than OpenSearch Serverless:
- No minimum cluster costs
- Pay only for storage and queries
- No idle capacity charges
- Suitable for both small and large workloads

## References

- [S3 Vectors Documentation](https://docs.aws.amazon.com/AmazonS3/latest/userguide/s3-vectors.html)
- [Bedrock Knowledge Base Documentation](https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html)
- [CloudFormation Template Example](https://github.com/kallu/aws-bedrock-kb-s3-vector)
- [CDK S3 Vectors API](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_s3vectors-readme.html)

## Next Steps

1. Deploy the updated Knowledge Base with `npm run sandbox`
2. Upload sample documents to test
3. Trigger an ingestion job
4. Test RAG queries through the chat interface
5. Monitor performance and costs

---

**Last Updated**: February 2026
**Implementation**: `amplify/custom/knowledgeBase.ts`
