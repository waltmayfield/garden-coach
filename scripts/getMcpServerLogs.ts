#!/usr/bin/env tsx

/**
 * Fetch CloudWatch logs for the MCP server to troubleshoot issues
 */

import { CloudWatchLogsClient, DescribeLogStreamsCommand, GetLogEventsCommand } from '@aws-sdk/client-cloudwatch-logs';
import outputs from '../amplify_outputs.json' assert { type: 'json' };

async function getMcpServerLogs() {
  console.log('\n📋 Fetching MCP Server CloudWatch Logs\n');
  console.log('=' .repeat(70));

  // Get MCP server ARN from outputs
  const custom = outputs.custom as any;
  const mcpServerArn = custom.mcpServerAgentArn;
  
  if (!mcpServerArn) {
    console.error('❌ MCP Server ARN not found in amplify_outputs.json');
    console.log('   Run: npm run sandbox');
    process.exit(1);
  }

  // Extract runtime ID from ARN
  // ARN format: arn:aws:bedrock-agentcore:us-east-1:796988593450:runtime/amplify_aichatbot_wa_MCP_28E3A66D-KwYGxJFjqv
  const runtimeId = mcpServerArn.split('/').pop();
  
  console.log(`\n🔍 MCP Server Details:`);
  console.log(`   ARN: ${mcpServerArn}`);
  console.log(`   Runtime ID: ${runtimeId}`);

  // CloudWatch log group for AgentCore runtimes
  const logGroupName = `/aws/bedrock-agentcore/runtimes/${runtimeId}-DEFAULT`;
  
  console.log(`   Log Group: ${logGroupName}\n`);

  const region = custom.quicksightMcpIntegration?.region || 'us-east-1';
  const client = new CloudWatchLogsClient({ region });

  try {
    // Get the most recent log streams
    console.log('📡 Fetching log streams...\n');
    
    const streamsResponse = await client.send(
      new DescribeLogStreamsCommand({
        logGroupName: logGroupName,
        orderBy: 'LastEventTime',
        descending: true,
        limit: 5 // Get last 5 streams
      })
    );

    if (!streamsResponse.logStreams || streamsResponse.logStreams.length === 0) {
      console.log('⚠️  No log streams found. The MCP server may not have been invoked yet.\n');
      return;
    }

    console.log(`✅ Found ${streamsResponse.logStreams.length} log stream(s)\n`);
    console.log('=' .repeat(70));

    // Fetch logs from each stream
    for (const stream of streamsResponse.logStreams) {
      if (!stream.logStreamName) continue;

      console.log(`\n📄 Log Stream: ${stream.logStreamName}`);
      console.log(`   Last Event: ${stream.lastEventTimestamp ? new Date(stream.lastEventTimestamp).toISOString() : 'N/A'}`);
      console.log(`   Events: ${stream.storedBytes || 0} bytes\n`);

      try {
        const eventsResponse = await client.send(
          new GetLogEventsCommand({
            logGroupName: logGroupName,
            logStreamName: stream.logStreamName,
            limit: 100, // Get last 100 events
            startFromHead: false // Get most recent events
          })
        );

        if (!eventsResponse.events || eventsResponse.events.length === 0) {
          console.log('   (No events in this stream)\n');
          continue;
        }

        console.log(`   📝 Log Events (${eventsResponse.events.length}):\n`);
        console.log('-' .repeat(70));

        // Display events in chronological order
        const events = eventsResponse.events.reverse();
        
        for (const event of events) {
          if (!event.message) continue;

          const timestamp = event.timestamp ? new Date(event.timestamp).toISOString() : 'N/A';
          const message = event.message.trim();

          // Color code based on log level
          let prefix = '   ';
          if (message.includes('ERROR') || message.includes('Error')) {
            prefix = '   ❌ ';
          } else if (message.includes('WARN') || message.includes('Warning')) {
            prefix = '   ⚠️  ';
          } else if (message.includes('invoked') || message.includes('request')) {
            prefix = '   🔵 ';
          }

          console.log(`${prefix}[${timestamp}]`);
          console.log(`      ${message}\n`);
        }

        console.log('-' .repeat(70));

      } catch (error: any) {
        console.error(`   ❌ Error fetching events: ${error.message}\n`);
      }
    }

    console.log('\n' + '=' .repeat(70));
    console.log('\n✅ Log fetch complete!\n');

    // Provide analysis hints
    console.log('🔍 Common Issues to Look For:\n');
    console.log('   • Authentication errors (401, 403)');
    console.log('   • Missing or invalid headers');
    console.log('   • JSON parsing errors');
    console.log('   • Transport connection issues');
    console.log('   • Tool execution errors');
    console.log('   • GraphQL query failures\n');

  } catch (error: any) {
    if (error.name === 'ResourceNotFoundException') {
      console.error('\n❌ Log group not found!');
      console.log(`   Expected: ${logGroupName}`);
      console.log('\n   Possible reasons:');
      console.log('   • MCP server not deployed yet');
      console.log('   • MCP server never invoked (no logs created)');
      console.log('   • Wrong region or runtime ID\n');
      console.log('   Try:');
      console.log('   1. Verify deployment: npm run sandbox');
      console.log('   2. Test MCP server: npm test scripts/testMcpServer.ts\n');
    } else {
      console.error('\n❌ Error fetching logs:');
      console.error(`   ${error.message}\n`);
      
      if (error.name === 'AccessDeniedException') {
        console.log('   💡 You need CloudWatch Logs permissions:');
        console.log('      • logs:DescribeLogStreams');
        console.log('      • logs:GetLogEvents\n');
      }
    }
    
    process.exit(1);
  }
}

// Run the script
getMcpServerLogs().catch(console.error);
