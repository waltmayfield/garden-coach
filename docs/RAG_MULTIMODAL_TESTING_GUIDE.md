# RAG Multimodal Testing Guide

## Overview

This guide explains how to test the RAG Knowledge Base with multimodal content (text + visual elements like charts and diagrams). The test document includes bar charts, pie charts, system diagrams, and tables to validate that the Knowledge Base can extract and retrieve information from visual representations.

## Test Document

**Location**: `test_documents/industrial_operations_manual.html`

**Content**:
- Equipment performance bar chart (5 pumps with efficiency/downtime metrics)
- Maintenance cost pie chart ($2.5M breakdown)
- System architecture diagram (Wellhead → Separator → Storage)
- Technical specifications table
- Safety protocols and procedures

## Setup Instructions

### Step 1: Convert HTML to PDF

Choose one of these methods:

#### Option A: Manual Browser Conversion (Easiest)
1. Open `test_documents/industrial_operations_manual.html` in Chrome/Safari/Firefox
2. Press `Cmd+P` (Mac) or `Ctrl+P` (Windows)
3. Select "Save as PDF"
4. Save to `test_documents/industrial_operations_manual.pdf`

#### Option B: Using Node.js Script
```bash
# Install puppeteer globally (if not already installed)
npm install -g puppeteer

# Convert HTML to PDF
node scripts/convertHtmlToPdf.js
```

#### Option C: Using wkhtmltopdf
```bash
# Install wkhtmltopdf
brew install wkhtmltopdf  # macOS
# or
sudo apt-get install wkhtmltopdf  # Linux

# Convert
wkhtmltopdf test_documents/industrial_operations_manual.html \
            test_documents/industrial_operations_manual.pdf
```

### Step 2: Upload and Ingest

#### Automated Upload (Recommended)
```bash
bash scripts/uploadTestDocument.sh
```

This script will:
1. Upload the PDF to S3
2. Start an ingestion job
3. Monitor the ingestion status
4. Display statistics when complete

#### Manual Upload
```bash
# Upload to S3
aws s3 cp test_documents/industrial_operations_manual.pdf \
  s3://amplify-aichatbot-waltmay-digitaloperationsstorage-0drnopnzbw92/documents/

# Start ingestion
aws bedrock-agent start-ingestion-job \
  --knowledge-base-id Z3XX82MYCZ \
  --data-source-id KNJVKKF6NN

# Check status
aws bedrock-agent list-ingestion-jobs \
  --knowledge-base-id Z3XX82MYCZ \
  --data-source-id KNJVKKF6NN \
  --max-results 5
```

### Step 3: Wait for Ingestion

Ingestion typically takes 2-5 minutes. The status will progress:
- `IN_PROGRESS` → Processing document
- `COMPLETE` → Ready for queries
- `FAILED` → Check CloudWatch logs for errors

## Test Queries

### Category 1: Chart Data Extraction

Test if the Knowledge Base can extract specific values from charts:

1. **"Which pump has the highest efficiency?"**
   - ✅ Expected: Pump E with 95% efficiency
   - Tests: Bar chart data extraction

2. **"What is the total downtime across all pumps?"**
   - ✅ Expected: 51 hours per month
   - Tests: Aggregation of chart values

3. **"Which pump needs immediate attention?"**
   - ✅ Expected: Pump C (78% efficiency, 15 hours downtime)
   - Tests: Chart interpretation and reasoning

### Category 2: Pie Chart Analysis

4. **"What percentage of maintenance costs is spent on labor?"**
   - ✅ Expected: 35% or $875,000
   - Tests: Pie chart segment extraction

5. **"What is the second largest maintenance cost category?"**
   - ✅ Expected: Parts at 25% ($625,000)
   - Tests: Comparative analysis of pie chart

6. **"What is the total annual maintenance cost?"**
   - ✅ Expected: $2.5 million
   - Tests: Overall value from pie chart context

### Category 3: System Diagram Understanding

7. **"What are the three main components in the production system?"**
   - ✅ Expected: Wellhead, Separator, Storage
   - Tests: Diagram component identification

8. **"Describe the flow of materials through the system"**
   - ✅ Expected: Wellhead → Separator → Storage
   - Tests: Process flow understanding from diagram

9. **"What sensors are used in the system?"**
   - ✅ Expected: Pressure (P), Temperature (T), Level (L)
   - Tests: Diagram annotation extraction

### Category 4: Table Data Retrieval

10. **"What is the wellhead operating pressure?"**
    - ✅ Expected: 1,500 PSI
    - Tests: Technical specifications table

11. **"What is the storage capacity?"**
    - ✅ Expected: 10,000 barrels
    - Tests: Specific value from table

12. **"What is the separator temperature range?"**
    - ✅ Expected: 150-200°F
    - Tests: Range value extraction

### Category 5: Image-Based Data Extraction (Critical Test)

These questions test whether the Knowledge Base can extract data from the actual chart image, not from text descriptions:

13. **"What was the maximum wellhead tubing pressure recorded?"**
    - ✅ Expected: Approximately 1733 PSI (Day 10-11)
    - Tests: Peak value extraction from image

14. **"What was the minimum wellhead tubing pressure?"**
    - ✅ Expected: Approximately 1215 PSI (Day 20-21)
    - Tests: Minimum value extraction from image

15. **"What is the average wellhead tubing pressure over the 30-day period?"**
    - ✅ Expected: Approximately 1448 PSI
    - Tests: Statistical calculation from image data

16. **"What is the pressure decline rate per day?"**
    - ✅ Expected: Approximately -3.6 PSI/day
    - Tests: Trend analysis from image

17. **"When did the pressure spike event occur?"**
    - ✅ Expected: Around Day 10-11
    - Tests: Anomaly detection from image

18. **"What are the high and low pressure alert thresholds?"**
    - ✅ Expected: High: 1600 PSI, Low: 1200 PSI
    - Tests: Threshold line extraction from image

19. **"When was the maintenance period?"**
    - ✅ Expected: Around Day 20-21
    - Tests: Event identification from shaded region in image

### Category 6: Safety Information

13. **"What is the purpose of the pressure sensor at the wellhead?"**
    - ✅ Expected: Preventing overpressure conditions
    - Tests: Safety-critical information retrieval

14. **"How often should emergency shutdown procedures be tested?"**
    - ✅ Expected: Quarterly
    - Tests: Procedural information extraction

15. **"What is the sensor accuracy?"**
    - ✅ Expected: ±0.5%
    - Tests: Technical specification retrieval

## Expected RAG Behavior

### What Should Work ✅

1. **Text Extraction**: All text content should be searchable
2. **Chart Values**: Specific numbers from charts should be retrievable
3. **Diagram Components**: Named elements in diagrams should be identifiable
4. **Table Data**: Structured data from tables should be accessible
5. **Context Understanding**: Relationships between visual and text elements
6. **Source Citations**: Responses should cite the document as source

### What Might Be Limited ⚠️

1. **Visual Reasoning**: Complex visual patterns may not be fully understood
2. **Chart Comparisons**: Cross-chart analysis might require multiple queries
3. **Spatial Relationships**: Exact positioning in diagrams may not be preserved
4. **Color Information**: Color-based distinctions might not be captured

## Evaluating Results

### Good Response Indicators
- ✅ Correct values from charts/tables
- ✅ Accurate component names from diagrams
- ✅ Proper context from surrounding text
- ✅ Source citation included
- ✅ Confidence in the answer

### Poor Response Indicators
- ❌ "I don't have information about..."
- ❌ Incorrect values or names
- ❌ Generic responses without specifics
- ❌ No source citation
- ❌ Contradictory information

## Troubleshooting

### No Results Returned

**Possible Causes**:
- Ingestion not complete
- Document not in `documents/` prefix
- Knowledge Base not ACTIVE

**Solutions**:
```bash
# Check Knowledge Base status
aws bedrock-agent get-knowledge-base --knowledge-base-id Z3XX82MYCZ

# Check ingestion jobs
aws bedrock-agent list-ingestion-jobs \
  --knowledge-base-id Z3XX82MYCZ \
  --data-source-id KNJVKKF6NN

# Verify document in S3
aws s3 ls s3://amplify-aichatbot-waltmay-digitaloperationsstorage-0drnopnzbw92/documents/
```

### Poor Quality Answers

**Possible Causes**:
- Semantic chunking not optimal
- Query too vague
- Visual content not well-described in HTML

**Solutions**:
- Try more specific questions
- Include context in queries (e.g., "According to the equipment performance chart...")
- Adjust chunking parameters in `amplify/custom/knowledgeBase.ts`

### Ingestion Fails

**Possible Causes**:
- File format not supported
- File too large (>50MB)
- IAM permissions issue

**Solutions**:
```bash
# Check CloudWatch logs
aws logs tail /aws/bedrock/knowledge-bases/Z3XX82MYCZ --follow

# Verify file format
file test_documents/industrial_operations_manual.pdf

# Check file size
ls -lh test_documents/industrial_operations_manual.pdf
```

## Advanced Testing

### Testing Chunking Strategy

The Knowledge Base uses semantic chunking with:
- Max tokens: 300
- Buffer size: 1
- Breakpoint percentile threshold: 95

To test chunking effectiveness:

1. Ask questions that span multiple chunks
2. Ask questions about relationships between sections
3. Compare answers with different chunk sizes

### Testing Embedding Quality

The Knowledge Base uses Titan Text Embeddings V2 (1024 dimensions):

1. Test semantic similarity (synonyms, paraphrasing)
2. Test technical term recognition
3. Test numerical value retrieval

### Testing Retrieval Accuracy

Use the RAG tools directly to see retrieved chunks:

```typescript
// In agent tools
const result = await retrieveFromKnowledgeBase({
  query: "Which pump has the highest efficiency?",
  numberOfResults: 5
});

console.log('Retrieved chunks:', result.retrievalResults);
```

## Performance Metrics

Track these metrics for RAG quality:

1. **Retrieval Accuracy**: % of queries returning relevant chunks
2. **Answer Correctness**: % of answers matching expected values
3. **Source Citation**: % of responses with proper citations
4. **Response Time**: Average time to retrieve and generate answer
5. **Chunk Relevance**: Average relevance score of retrieved chunks

## Next Steps

After validating multimodal RAG:

1. **Add More Documents**: Upload additional PDFs with charts/diagrams
2. **Test Different Formats**: Try DOCX, HTML, TXT files
3. **Optimize Chunking**: Adjust parameters based on results
4. **Monitor Costs**: Track embedding and query costs
5. **Scale Testing**: Test with larger document sets

## References

- [S3 Vectors Documentation](https://docs.aws.amazon.com/AmazonS3/latest/userguide/s3-vectors.html)
- [Bedrock Knowledge Base](https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html)
- [Semantic Chunking](https://docs.aws.amazon.com/bedrock/latest/userguide/kb-chunking-parsing.html)
- [Titan Embeddings V2](https://docs.aws.amazon.com/bedrock/latest/userguide/titan-embedding-models.html)

---

**Last Updated**: February 2026  
**Knowledge Base ID**: Z3XX82MYCZ  
**Data Source ID**: KNJVKKF6NN
