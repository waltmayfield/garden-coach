# Test Documents for Multimodal RAG

This directory contains test documents for validating the RAG Knowledge Base with multimodal content (text + images/charts).

## Files

### industrial_operations_manual.html
An HTML document with embedded visual elements including:
- **Bar Chart**: Equipment performance metrics showing efficiency and downtime for 5 pumps
- **Pie Chart**: Maintenance cost breakdown ($2.5M total)
- **System Diagram**: Oil & Gas production system architecture with sensors
- **Pressure Chart Image**: 30-day time series of wellhead tubing pressure (embedded PNG)
- **Tables**: Detailed cost breakdown
- **Rich Text**: Technical specifications, safety guidelines, and operational data

### wellhead_pressure_chart.png
A matplotlib-generated time series chart showing:
- 30 days of hourly wellhead tubing pressure data
- Average pressure: ~1448 PSI
- Maximum pressure: ~1733 PSI (Day 10-11, pressure spike event)
- Minimum pressure: ~1215 PSI (Day 20-21, maintenance period)
- Decline rate: -3.6 PSI/day
- Alert thresholds: High (1600 PSI), Low (1200 PSI)
- Highlighted anomalies: pressure spike and maintenance period

## Converting HTML to PDF

### Option 1: Using Browser (Recommended)
1. Open `industrial_operations_manual.html` in Chrome/Safari/Firefox
2. Print to PDF (Cmd+P on Mac, Ctrl+P on Windows)
3. Save as `industrial_operations_manual.pdf`

### Option 2: Using wkhtmltopdf (Command Line)
```bash
# Install wkhtmltopdf
brew install wkhtmltopdf  # macOS
# or
sudo apt-get install wkhtmltopdf  # Linux

# Convert to PDF
wkhtmltopdf industrial_operations_manual.html industrial_operations_manual.pdf
```

### Option 3: Using Python (if reportlab is available)
```bash
python3 ../scripts/generateTestPdf.py
```

## Uploading to Knowledge Base

Once you have the PDF:

```bash
# Upload to S3 documents folder
aws s3 cp industrial_operations_manual.pdf \
  s3://amplify-aichatbot-waltmay-digitaloperationsstorage-0drnopnzbw92/documents/

# Start ingestion job
aws bedrock-agent start-ingestion-job \
  --knowledge-base-id Z3XX82MYCZ \
  --data-source-id KNJVKKF6NN

# Check ingestion status
aws bedrock-agent list-ingestion-jobs \
  --knowledge-base-id Z3XX82MYCZ \
  --data-source-id KNJVKKF6NN \
  --max-results 5
```

## Test Questions for Multimodal RAG

After ingestion completes, test the RAG system with these questions:

### Questions About Charts/Visual Data
1. **"Which pump has the highest efficiency?"**
   - Expected: Pump E with 95% efficiency

2. **"What is the total downtime across all pumps?"**
   - Expected: 51 hours per month

3. **"What percentage of maintenance costs is spent on labor?"**
   - Expected: 35% or $875,000

4. **"What are the three main components in the production system?"**
   - Expected: Wellhead, Separator, Storage

5. **"What sensors are used in the system?"**
   - Expected: Pressure (P), Temperature (T), Level (L)

### Questions About Specific Values
6. **"What is the wellhead operating pressure?"**
   - Expected: 1,500 PSI

7. **"What is the storage capacity?"**
   - Expected: 10,000 barrels

8. **"What is the separator temperature range?"**
   - Expected: 150-200°F

### Questions Requiring Chart Interpretation
9. **"Which pump needs immediate attention and why?"**
   - Expected: Pump C due to lowest efficiency (78%) and highest downtime (15 hours)

10. **"What is the second largest maintenance cost category?"**
    - Expected: Parts at 25% ($625,000)

### Questions About System Architecture
11. **"Describe the flow of materials through the production system"**
    - Expected: Materials flow from Wellhead → Separator → Storage

12. **"What is the purpose of the pressure sensor at the wellhead?"**
    - Expected: Critical for preventing overpressure conditions

## Expected RAG Behavior

The Knowledge Base should:
1. ✅ Extract text content from the PDF
2. ✅ Understand visual data (charts, diagrams) through their descriptions
3. ✅ Answer questions about specific values shown in charts
4. ✅ Provide context from both text and visual elements
5. ✅ Cite sources with page numbers or sections

## Troubleshooting

### Ingestion Job Fails
- Check document format (PDF, TXT, MD, HTML, DOC, DOCX supported)
- Verify file is in `documents/` prefix
- Check file size (max 50MB per file)
- Review CloudWatch logs for detailed errors

### RAG Returns No Results
- Verify ingestion job completed successfully
- Check Knowledge Base status is ACTIVE
- Ensure semantic chunking is configured
- Try broader questions first

### Poor Quality Answers
- Semantic chunking may need adjustment (maxTokens, bufferSize)
- Consider adding more context to questions
- Verify embedding model is Titan Text Embeddings V2

## Document Content Summary

The test document contains:
- **5 pumps** with efficiency and downtime metrics
- **$2.5M** total maintenance costs across 5 categories
- **3 system components** with dedicated sensors
- **Technical specifications** for pressure, temperature, capacity
- **Safety protocols** and critical procedures

This provides rich multimodal content for testing RAG retrieval across text, numerical data, and visual representations.
