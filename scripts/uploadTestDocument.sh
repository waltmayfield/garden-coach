#!/bin/bash

# Upload Test Document to Knowledge Base
# This script converts HTML to PDF and uploads it to S3 for RAG testing

set -e

KB_ID="Z3XX82MYCZ"
DS_ID="KNJVKKF6NN"
BUCKET="amplify-aichatbot-waltmay-digitaloperationsstorage-0drnopnzbw92"
HTML_FILE="test_documents/industrial_operations_manual.html"
PDF_FILE="test_documents/industrial_operations_manual.pdf"

echo "🔄 Converting HTML to PDF..."

# Check if wkhtmltopdf is available
if command -v wkhtmltopdf &> /dev/null; then
    echo "Using wkhtmltopdf..."
    wkhtmltopdf "$HTML_FILE" "$PDF_FILE"
elif command -v google-chrome &> /dev/null; then
    echo "Using Chrome headless..."
    google-chrome --headless --disable-gpu --print-to-pdf="$PDF_FILE" "$HTML_FILE"
elif command -v chromium &> /dev/null; then
    echo "Using Chromium headless..."
    chromium --headless --disable-gpu --print-to-pdf="$PDF_FILE" "$HTML_FILE"
else
    echo "❌ No PDF converter found!"
    echo ""
    echo "Please install one of the following:"
    echo "  • wkhtmltopdf: brew install wkhtmltopdf"
    echo "  • Chrome/Chromium browser"
    echo ""
    echo "Or manually convert the HTML to PDF:"
    echo "  1. Open $HTML_FILE in your browser"
    echo "  2. Print to PDF (Cmd+P / Ctrl+P)"
    echo "  3. Save as $PDF_FILE"
    echo ""
    exit 1
fi

echo "✅ PDF created: $PDF_FILE"
echo ""

# Upload to S3
echo "📤 Uploading to S3..."
aws s3 cp "$PDF_FILE" "s3://$BUCKET/documents/" --no-progress

echo "✅ Uploaded to s3://$BUCKET/documents/industrial_operations_manual.pdf"
echo ""

# Start ingestion job
echo "🔄 Starting ingestion job..."
JOB_ID=$(aws bedrock-agent start-ingestion-job \
    --knowledge-base-id "$KB_ID" \
    --data-source-id "$DS_ID" \
    --query 'ingestionJob.ingestionJobId' \
    --output text)

echo "✅ Ingestion job started: $JOB_ID"
echo ""

# Monitor ingestion status
echo "⏳ Monitoring ingestion status..."
echo "   (This may take 2-5 minutes)"
echo ""

for i in {1..30}; do
    STATUS=$(aws bedrock-agent get-ingestion-job \
        --knowledge-base-id "$KB_ID" \
        --data-source-id "$DS_ID" \
        --ingestion-job-id "$JOB_ID" \
        --query 'ingestionJob.status' \
        --output text)
    
    echo "   Status: $STATUS"
    
    if [ "$STATUS" = "COMPLETE" ]; then
        echo ""
        echo "✅ Ingestion completed successfully!"
        echo ""
        echo "📊 Ingestion Statistics:"
        aws bedrock-agent get-ingestion-job \
            --knowledge-base-id "$KB_ID" \
            --data-source-id "$DS_ID" \
            --ingestion-job-id "$JOB_ID" \
            --query 'ingestionJob.statistics' \
            --output table
        echo ""
        echo "🎯 Ready to test! Try these questions:"
        echo "   • Which pump has the highest efficiency?"
        echo "   • What percentage of maintenance costs is spent on labor?"
        echo "   • What are the three main components in the production system?"
        echo ""
        exit 0
    elif [ "$STATUS" = "FAILED" ]; then
        echo ""
        echo "❌ Ingestion failed!"
        echo ""
        echo "Failure reasons:"
        aws bedrock-agent get-ingestion-job \
            --knowledge-base-id "$KB_ID" \
            --data-source-id "$DS_ID" \
            --ingestion-job-id "$JOB_ID" \
            --query 'ingestionJob.failureReasons' \
            --output table
        exit 1
    fi
    
    sleep 10
done

echo ""
echo "⏰ Ingestion still in progress after 5 minutes"
echo "   Check status manually:"
echo "   aws bedrock-agent get-ingestion-job \\"
echo "     --knowledge-base-id $KB_ID \\"
echo "     --data-source-id $DS_ID \\"
echo "     --ingestion-job-id $JOB_ID"
