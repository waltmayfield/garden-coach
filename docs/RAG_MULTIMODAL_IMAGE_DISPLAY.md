# RAG Multimodal Image Display Implementation

## Overview

This document explains how images embedded in PDFs are extracted, stored, and displayed in the chat interface when using the Knowledge Base RAG functionality.

## Architecture

### 1. Knowledge Base Configuration

**File**: `amplify/custom/knowledgeBase.ts`

The Knowledge Base is configured with:
- **Embedding Model**: Titan Text Embeddings V2 (1024 dimensions)
- **Parsing Strategy**: Bedrock Foundation Model (Claude 3 Sonnet)
- **Supplemental Storage**: Dedicated S3 bucket for extracted multimodal content
- **CORS Configuration**: Enabled on multimodal bucket for browser access

```typescript
supplementalDataStorageConfiguration: {
  storageLocations: [
    {
      type: 'S3',
      s3Location: {
        uri: `s3://${multimodalBucket.bucketName}/`,
      },
    },
  ],
}
```

### 2. Document Processing Flow

1. **Upload**: PDF documents are uploaded to the source S3 bucket (`documents/` prefix)
2. **Ingestion**: Bedrock Data Automation (BDA) processes the PDF:
   - Extracts text content
   - Identifies and extracts images (charts, diagrams, photos)
   - Uses Claude 3 Sonnet to describe visual content
   - Extracts numeric data from charts and graphs
3. **Storage**: 
   - Text chunks are embedded and stored in S3 Vectors
   - Extracted images are stored in the multimodal storage bucket
   - Metadata links text chunks to their source images

### 3. Retrieval Response Structure

When querying the Knowledge Base, retrieval results include:

```typescript
{
  content: { text: "..." },
  score: 0.85,
  location: {
    s3Location: { uri: "s3://source-bucket/documents/file.pdf" }
  },
  metadata: {
    "x-amz-bedrock-kb-source-file-modality": "IMAGE",
    "x-amz-bedrock-kb-source-file-mime-type": "image/png",
    "x-amz-bedrock-kb-source-uri": "s3://multimodal-bucket/extracted/image.png",
    // ... other metadata
  }
}
```

### 4. Frontend Display

**Files**:
- `src/lib/ragUtils.ts` - Utility functions for extracting multimodal metadata
- `src/components/chat/RagSources.tsx` - Component that displays sources with images
- `src/components/chat/MessageImage.tsx` - Reusable image display component

**Process**:
1. Extract multimodal metadata from retrieval results
2. Identify image content using modality and MIME type
3. Extract supplemental URI (location of extracted image)
4. Display image using MessageImage component
5. Show source document link for reference

## Key Features

### Image Display
- Extracted images are displayed inline in the sources section
- Click to expand for full-size view
- Fallback error handling if image fails to load
- Labeled as "Extracted from PDF"

### Metadata Badges
- Relevance score (color-coded)
- Content type (Image, Audio, Video)
- Timestamps for audio/video segments
- Custom metadata from source documents

### Source Attribution
- Link to original PDF document
- Filename display
- Relevance scoring
- Text content preview

## Configuration Requirements

### 1. Multimodal Storage Bucket
- Created automatically by CDK construct
- CORS enabled for browser access
- Read permissions granted to Knowledge Base role
- Encryption enabled (S3-managed)

### 2. Parsing Configuration
The parsing prompt is optimized for extracting visual data:

```typescript
parsingPrompt: {
  parsingPromptText: `Extract all text content from this document. For any charts, graphs, or images, describe what they show and extract any numeric data, labels, or key information visible in the image. Be specific about values shown in charts.`,
}
```

### 3. IAM Permissions
Knowledge Base role needs:
- Read access to source document bucket
- Read/write access to multimodal storage bucket
- InvokeModel permissions for Claude 3 Sonnet (parsing)
- InvokeModel permissions for Titan Text Embeddings V2

## Deployment

### Deploy Backend
```bash
npm run sandbox
```

This will:
1. Create/update the Knowledge Base (v5)
2. Create the multimodal storage bucket
3. Configure supplemental data storage
4. Set up IAM permissions and CORS

### Upload Test Documents
```bash
./scripts/uploadTestDocument.sh
```

### Start Ingestion Job
Use the Knowledge Base management page or AWS Console to start an ingestion job.

### Verify
1. Query the Knowledge Base through the chat interface
2. Check that sources section shows extracted images
3. Verify images load correctly in the browser

## Troubleshooting

### Images Not Displaying

**Check 1: Multimodal Storage Configuration**
```bash
aws cloudformation describe-stacks \
  --stack-name amplify-aichatbot-waltmayf-sandbox-1e9b4f522c \
  --query 'Stacks[0].Outputs[?OutputKey==`MultimodalBucketName`].OutputValue' \
  --output text
```

**Check 2: CORS Configuration**
```bash
aws s3api get-bucket-cors --bucket <multimodal-bucket-name>
```

**Check 3: Ingestion Job Status**
Verify the ingestion job completed successfully and processed images.

**Check 4: Browser Console**
Check for CORS errors or 403 Forbidden responses.

### Images Not Extracted

**Check 1: Parsing Configuration**
Verify the data source has `parsingConfiguration` with `BEDROCK_FOUNDATION_MODEL` strategy.

**Check 2: PDF Compatibility**
Ensure PDFs don't contain:
- JPEG2000 or JBIG2 encoded images
- CMYK color profiles
- SVG images

**Check 3: IAM Permissions**
Verify Knowledge Base role has permissions to invoke Claude 3 Sonnet.

## Limitations

### Current Implementation with BDA + Foundation Model Parsing

**Important**: The current configuration uses Bedrock Data Automation (BDA) with foundation model parsing (Claude 3 Sonnet). This approach:
- ✅ Extracts text descriptions from images and charts
- ✅ Extracts numeric data from visual elements
- ✅ Supports full RetrieveAndGenerate (RAG) functionality
- ❌ **Does NOT preserve original images** in supplemental storage
- ❌ Cannot display extracted images in the UI

**Why images aren't extracted**: BDA with foundation model parsing converts all visual content to text descriptions. The supplemental storage feature is designed for **Nova Multimodal Embeddings**, which preserves native image format but has limited RAG support.

### To Display Images from PDFs

You have three options:

1. **Switch to Nova Multimodal Embeddings** (trade-offs):
   - ✅ Preserves original images in supplemental storage
   - ✅ Enables visual similarity search
   - ❌ Limited RetrieveAndGenerate support (text only)
   - ❌ Cannot generate text responses from visual content
   - ❌ US East (N. Virginia) only

2. **Extract images separately** (recommended for production):
   - Pre-process PDFs to extract images
   - Store images in S3 with metadata linking to PDF pages
   - Reference images in Knowledge Base metadata
   - Display images based on metadata references

3. **Hybrid approach** (complex):
   - Use BDA for text extraction and RAG
   - Use separate image extraction pipeline
   - Combine results in the UI

### Bedrock Limitations
- RetrieveAndGenerate with visual content requires BDA (current setup)
- Visual similarity search requires Nova Multimodal Embeddings
- Image-based queries not supported with BDA
- Cannot have both full RAG and native image preservation simultaneously

## Future Enhancements

### Potential Improvements
1. **Presigned URLs**: Generate temporary URLs for secure access
2. **Image Optimization**: Resize/compress images for faster loading
3. **Lazy Loading**: Load images on-demand as user scrolls
4. **Caching**: Cache extracted images in CloudFront
5. **Nova Embeddings**: Switch to Nova for visual similarity search
6. **PDF Viewer**: Embed PDF viewer to show exact page/location

### Alternative Approaches
1. **Nova Multimodal Embeddings**: Preserve native visual format
   - Pros: Visual similarity search, image-based queries
   - Cons: Limited RAG support, US East only, no text generation from images

2. **Hybrid Approach**: Use both BDA and Nova
   - BDA for text extraction and RAG
   - Nova for visual similarity search
   - Combine results for comprehensive retrieval

## References

- [AWS Bedrock Knowledge Bases - Multimodal](https://docs.aws.amazon.com/bedrock/latest/userguide/kb-multimodal.html)
- [Bedrock Data Automation](https://docs.aws.amazon.com/bedrock/latest/userguide/bda.html)
- [Nova Multimodal Embeddings](https://docs.aws.amazon.com/nova/latest/userguide/nova-embeddings.html)
- [S3 Vectors Implementation](docs/S3_VECTORS_IMPLEMENTATION.md)
- [RAG Deployment Summary](docs/RAG_DEPLOYMENT_SUMMARY.md)

---

**Last Updated**: February 2026  
**Knowledge Base Version**: v5 (with supplemental storage)
