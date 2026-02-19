#!/usr/bin/env tsx
/**
 * Test multimodal retrieval to verify image extraction and metadata
 */

import { BedrockAgentRuntimeClient, RetrieveCommand } from '@aws-sdk/client-bedrock-agent-runtime';

const KNOWLEDGE_BASE_ID = 'ADKJBIWTSD';

async function testMultimodalRetrieval() {
  console.log('🧪 Testing Multimodal Retrieval\n');

  const client = new BedrockAgentRuntimeClient({
    region: 'us-east-1',
  });

  // Test query about the pressure chart
  const query = 'What is the wellhead tubing pressure shown in the chart?';
  console.log(`Query: "${query}"\n`);

  const command = new RetrieveCommand({
    knowledgeBaseId: KNOWLEDGE_BASE_ID,
    retrievalQuery: {
      text: query,
    },
    retrievalConfiguration: {
      vectorSearchConfiguration: {
        numberOfResults: 3,
      },
    },
  });

  try {
    const response = await client.send(command);
    
    console.log(`✓ Retrieved ${response.retrievalResults?.length || 0} results\n`);

    response.retrievalResults?.forEach((result, index) => {
      console.log(`\n--- Result ${index + 1} ---`);
      console.log(`Score: ${result.score?.toFixed(4)}`);
      console.log(`Content: ${result.content?.text?.substring(0, 200)}...`);
      
      // Check for multimodal metadata
      const metadata = result.metadata as Record<string, any>;
      if (metadata) {
        console.log('\nMetadata:');
        
        const modality = metadata['x-amz-bedrock-kb-source-file-modality'];
        const mimeType = metadata['x-amz-bedrock-kb-source-file-mime-type'];
        const sourceUri = metadata['x-amz-bedrock-kb-source-uri'];
        
        if (modality) console.log(`  Modality: ${modality}`);
        if (mimeType) console.log(`  MIME Type: ${mimeType}`);
        if (sourceUri) console.log(`  Source URI: ${sourceUri}`);
        
        // Check for supplemental storage (extracted images)
        if (metadata.source?.relatedContent) {
          console.log('\n  📸 Related Content (Extracted Images):');
          metadata.source.relatedContent.forEach((content: any, i: number) => {
            console.log(`    ${i + 1}. ${content.s3Location?.uri || 'N/A'}`);
          });
        }
        
        // Show all metadata keys
        console.log('\n  All metadata keys:');
        Object.keys(metadata).forEach(key => {
          if (!key.startsWith('x-amz-bedrock-kb-')) {
            console.log(`    - ${key}`);
          }
        });
      }
      
      console.log(`\nLocation: ${result.location?.s3Location?.uri}`);
    });

    console.log('\n\n✅ Test completed successfully!');
    
  } catch (error: any) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
}

testMultimodalRetrieval();
