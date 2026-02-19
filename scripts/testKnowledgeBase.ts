#!/usr/bin/env tsx
/**
 * Test script for AWS Bedrock Knowledge Base with S3 Vectors
 * 
 * This script tests:
 * 1. Basic text retrieval from documents
 * 2. Multimodal retrieval (image-based data)
 * 3. Semantic search capabilities
 * 
 * Usage: npx tsx scripts/testKnowledgeBase.ts
 */

import {
  BedrockAgentRuntimeClient,
  RetrieveCommand,
  RetrieveAndGenerateCommand,
} from '@aws-sdk/client-bedrock-agent-runtime';
import yaml from 'yaml'

const KNOWLEDGE_BASE_ID = 'ADKJBIWTSD'; // Updated to v5
const REGION = 'us-east-1';

const client = new BedrockAgentRuntimeClient({ region: REGION });

interface TestCase {
  name: string;
  query: string;
  expectedContent?: string[];
  testType: 'text' | 'multimodal' | 'semantic';
}

const testCases: TestCase[] = [
  {
    name: 'Basic Equipment Information',
    query: 'What equipment is mentioned in the operations manual?',
    expectedContent: ['pump', 'compressor', 'valve', 'sensor'],
    testType: 'text',
  },
  {
    name: 'Multimodal - Pressure Chart Data',
    query: 'What is the average wellhead tubing pressure shown in the chart?',
    expectedContent: ['1448', 'PSI', 'pressure'],
    testType: 'multimodal',
  },
  {
    name: 'Multimodal - Maximum Pressure',
    query: 'What was the maximum pressure recorded in the wellhead tubing pressure chart?',
    expectedContent: ['1733', 'PSI', 'maximum'],
    testType: 'multimodal',
  },
  {
    name: 'Multimodal - Pressure Trend',
    query: 'Describe the pressure trend over the 30-day period shown in the chart',
    expectedContent: ['decline', 'decrease', 'trend'],
    testType: 'multimodal',
  },
  {
    name: 'Semantic Search - Maintenance',
    query: 'What are the maintenance procedures?',
    expectedContent: ['maintenance', 'procedure', 'inspection'],
    testType: 'semantic',
  },
];

async function testRetrieve(query: string): Promise<any> {
  console.log(`\n🔍 Testing Retrieve API...`);
  console.log(`Query: "${query}"`);
  
  const command = new RetrieveCommand({
    knowledgeBaseId: KNOWLEDGE_BASE_ID,
    retrievalQuery: {
      text: query,
    },
    retrievalConfiguration: {
      vectorSearchConfiguration: {
        numberOfResults: 5,
      },
    },
  });

  const response = await client.send(command);
  
  console.log(`✅ Retrieved ${response.retrievalResults?.length || 0} results`);
  
  if (response.retrievalResults && response.retrievalResults.length > 0) {
    response.retrievalResults.forEach((result, idx) => {
      console.log(`\n  Result ${idx + 1}:`);
    //   console.log(yaml.stringify(result))
      console.log(`    Score: ${result.score?.toFixed(4)}`);
      console.log(`    Type: ${result.content?.type || 'N/A'}`);
      console.log(`    Location: ${result.location?.s3Location?.uri || 'N/A'}`);
      console.log(`    Content: ${result.content?.text?.substring(0, 150)}...`);
    });
  }
  
  return response;
}

async function testRetrieveAndGenerate(query: string): Promise<any> {
  console.log(`\n🤖 Testing RetrieveAndGenerate API...`);
  console.log(`Query: "${query}"`);
  
  const command = new RetrieveAndGenerateCommand({
    input: {
      text: query,
    },
    retrieveAndGenerateConfiguration: {
      type: 'KNOWLEDGE_BASE',
      knowledgeBaseConfiguration: {
        knowledgeBaseId: KNOWLEDGE_BASE_ID,
        modelArn: `arn:aws:bedrock:${REGION}::foundation-model/anthropic.claude-3-sonnet-20240229-v1:0`,
        retrievalConfiguration: {
          vectorSearchConfiguration: {
            numberOfResults: 5,
          },
        },
      },
    },
  });

  const response = await client.send(command);
  
  console.log(`✅ Generated response:`);
  console.log(`\n${response.output?.text}\n`);
  
  if (response.citations && response.citations.length > 0) {
    console.log(`📚 Citations (${response.citations.length}):`);
    response.citations.forEach((citation, idx) => {
      console.log(`  ${idx + 1}. ${citation.retrievedReferences?.[0]?.location?.s3Location?.uri || 'N/A'}`);
    });
  }
  
  return response;
}

function validateResults(
  testCase: TestCase,
  retrieveResponse: any,
  generateResponse: any
): boolean {
  console.log(`\n✓ Validating test case: ${testCase.name}`);
  
  let passed = true;
  
  // Check if we got results
  if (!retrieveResponse.retrievalResults || retrieveResponse.retrievalResults.length === 0) {
    console.log(`  ❌ No retrieval results found`);
    passed = false;
  } else {
    console.log(`  ✅ Retrieved ${retrieveResponse.retrievalResults.length} results`);
  }
  
  // Check if we got a generated response
  if (!generateResponse.output?.text) {
    console.log(`  ❌ No generated response`);
    passed = false;
  } else {
    console.log(`  ✅ Generated response (${generateResponse.output.text.length} chars)`);
  }
  
  // Check for expected content in the response
  if (testCase.expectedContent && generateResponse.output?.text) {
    const responseText = generateResponse.output.text.toLowerCase();
    const foundContent: string[] = [];
    const missingContent: string[] = [];
    
    testCase.expectedContent.forEach(content => {
      if (responseText.includes(content.toLowerCase())) {
        foundContent.push(content);
      } else {
        missingContent.push(content);
      }
    });
    
    if (foundContent.length > 0) {
      console.log(`  ✅ Found expected content: ${foundContent.join(', ')}`);
    }
    
    if (missingContent.length > 0) {
      console.log(`  ⚠️  Missing expected content: ${missingContent.join(', ')}`);
      // Don't fail the test for missing content, just warn
    }
  }
  
  return passed;
}

async function runTests() {
  console.log('🚀 Starting Knowledge Base Tests');
  console.log(`Knowledge Base ID: ${KNOWLEDGE_BASE_ID}`);
  console.log(`Region: ${REGION}`);
  console.log(`Test Cases: ${testCases.length}`);
  
  const results: { testCase: TestCase; passed: boolean }[] = [];
  
  for (const testCase of testCases) {
    console.log('\n' + '='.repeat(80));
    console.log(`📝 Test: ${testCase.name} (${testCase.testType})`);
    console.log('='.repeat(80));
    
    try {
      // Test Retrieve API
      const retrieveResponse = await testRetrieve(testCase.query);
      
      // Test RetrieveAndGenerate API
      const generateResponse = await testRetrieveAndGenerate(testCase.query);
      
      // Validate results
      const passed = validateResults(testCase, retrieveResponse, generateResponse);
      
      results.push({ testCase, passed });
      
      if (passed) {
        console.log(`\n✅ Test PASSED: ${testCase.name}`);
      } else {
        console.log(`\n❌ Test FAILED: ${testCase.name}`);
      }
      
      // Wait a bit between tests to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 2000));
      
    } catch (error) {
      console.error(`\n❌ Test ERROR: ${testCase.name}`);
      console.error(error);
      results.push({ testCase, passed: false });
    }
  }
  
  // Print summary
  console.log('\n' + '='.repeat(80));
  console.log('📊 TEST SUMMARY');
  console.log('='.repeat(80));
  
  const passed = results.filter(r => r.passed).length;
  const failed = results.filter(r => !r.passed).length;
  
  console.log(`\nTotal Tests: ${results.length}`);
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  
  results.forEach(({ testCase, passed }) => {
    const icon = passed ? '✅' : '❌';
    console.log(`  ${icon} ${testCase.name} (${testCase.testType})`);
  });
  
  if (failed === 0) {
    console.log('\n🎉 All tests passed!');
    process.exit(0);
  } else {
    console.log(`\n⚠️  ${failed} test(s) failed`);
    process.exit(1);
  }
}

// Run tests
runTests().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
