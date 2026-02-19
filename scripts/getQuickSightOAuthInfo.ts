#!/usr/bin/env tsx

/**
 * Get QuickSight OAuth Integration Information
 * 
 * This script retrieves all the information needed to configure
 * QuickSight MCP integration through the UI, including the client secret.
 */

import { CognitoIdentityProviderClient, DescribeUserPoolClientCommand } from '@aws-sdk/client-cognito-identity-provider';
import outputs from '../amplify_outputs.json' assert { type: 'json' };

async function getQuickSightOAuthInfo() {
  console.log('\n🔐 QuickSight MCP Integration - OAuth Configuration\n');
  console.log('=' .repeat(70));

  // Get custom outputs
  const custom = outputs.custom as any;
  const mcpIntegration = custom.quicksightMcpIntegration;
  const clientId = custom.quicksightOAuthClientId;
  const userPoolId = mcpIntegration.userPoolId;
  const region = mcpIntegration.region;
  const cognitoDomain = custom.cognitoDomain;

  console.log('\n📋 Basic Information:');
  console.log(`   Region: ${region}`);
  console.log(`   User Pool ID: ${userPoolId}`);
  console.log(`   Cognito Domain: ${cognitoDomain}`);
  console.log(`   MCP Server ARN: ${custom.mcpServerAgentArn}`);

  // Retrieve client secret from Cognito
  console.log('\n🔑 Retrieving OAuth Client Secret...');
  
  try {
    const cognitoClient = new CognitoIdentityProviderClient({ region });
    
    const response = await cognitoClient.send(
      new DescribeUserPoolClientCommand({
        UserPoolId: userPoolId,
        ClientId: clientId
      })
    );

    const clientSecret = response.UserPoolClient?.ClientSecret;

    if (!clientSecret) {
      console.error('❌ Error: Client secret not found. The client may not have been created with a secret.');
      process.exit(1);
    }

    console.log('✅ Client secret retrieved successfully!\n');

    // Display all configuration
    console.log('=' .repeat(70));
    console.log('\n📝 QuickSight MCP Integration Configuration:\n');
    console.log('Copy these values into QuickSight Console when creating MCP integration:\n');
    
    console.log('1️⃣  MCP Server Endpoint:');
    console.log(`   ${mcpIntegration.endpoint}\n`);
    
    console.log('2️⃣  OAuth Client ID:');
    console.log(`   ${clientId}\n`);
    
    console.log('3️⃣  OAuth Client Secret:');
    console.log(`   ${clientSecret}\n`);
    
    console.log('4️⃣  Token URL:');
    console.log(`   ${mcpIntegration.tokenUrl}\n`);
    
    console.log('5️⃣  Authorization URL:');
    console.log(`   ${mcpIntegration.authorizationUrl}\n`);

    console.log('=' .repeat(70));
    console.log('\n📖 How to Use:\n');
    console.log('1. Open QuickSight Console:');
    console.log('   https://us-east-1.quicksight.aws.amazon.com/sn/start/integrations?tab=action\n');
    console.log('2. Click "Add action" → Select "Model Context Protocol (MCP)"\n');
    console.log('3. Fill in the form:');
    console.log('   - Name: Digital Operations MCP Server');
    console.log('   - Description: MCP server for industrial operations management');
    console.log('   - Endpoint: (copy #1 from above)');
    console.log('   - Authentication: OAuth 2.0');
    console.log('   - Client ID: (copy #2 from above)');
    console.log('   - Client Secret: (copy #3 from above)');
    console.log('   - Token URL: (copy #4 from above)');
    console.log('   - Authorization URL: (copy #5 from above)\n');
    console.log('4. Click "Create" and test the connection\n');

    console.log('⚠️  Important Notes:\n');
    console.log('   • This MCP integration may fail due to transport mismatch');
    console.log('     (QuickSight expects SSE, but AgentCore uses HTTP POST)');
    console.log('   • The Bedrock Agent connector (already created) is the');
    console.log('     recommended approach and should work better');
    console.log('   • Check the Automations section for the Bedrock connector\n');

    console.log('=' .repeat(70));
    console.log('\n✅ Configuration information retrieved successfully!\n');

    // Also save to a file for easy reference
    const configInfo = {
      endpoint: mcpIntegration.endpoint,
      clientId: clientId,
      clientSecret: clientSecret,
      tokenUrl: mcpIntegration.tokenUrl,
      authorizationUrl: mcpIntegration.authorizationUrl,
      cognitoDomain: cognitoDomain,
      userPoolId: userPoolId,
      region: region,
      mcpServerArn: custom.mcpServerAgentArn,
      createdAt: new Date().toISOString()
    };

    const fs = await import('fs');
    fs.writeFileSync(
      'quicksight-mcp-oauth-config.json',
      JSON.stringify(configInfo, null, 2)
    );

    console.log('💾 Configuration saved to: quicksight-mcp-oauth-config.json\n');

  } catch (error: any) {
    console.error('\n❌ Error retrieving client secret:');
    console.error(`   ${error.message}\n`);
    
    if (error.name === 'ResourceNotFoundException') {
      console.log('💡 The OAuth client may not have been created yet.');
      console.log('   Run: npm run sandbox\n');
    }
    
    process.exit(1);
  }
}

// Run the script
getQuickSightOAuthInfo().catch(console.error);
