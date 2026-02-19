#!/usr/bin/env tsx
/**
 * Deploy static frontend to Amplify Hosting
 * 
 * This script:
 * 1. Reads the Amplify App ID from CloudFormation outputs
 * 2. Zips the static build output
 * 3. Deploys to Amplify Hosting using AWS SDK
 */

import { AmplifyClient, CreateDeploymentCommand, StartDeploymentCommand } from '@aws-sdk/client-amplify';
import { statSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';

const region = process.env.AWS_REGION || 'us-east-1';
const amplifyClient = new AmplifyClient({ region });

function getAmplifyConfig() {
  // Read from amplify_outputs.json
  const amplifyOutputs = require('../amplify_outputs.json');
  
  const appId = amplifyOutputs.custom?.amplify?.appId;
  const appUrl = amplifyOutputs.custom?.amplify?.appUrl;
  
  if (!appId) {
    throw new Error('Amplify App ID not found in amplify_outputs.json. Did you deploy the backend first with "npm run sandbox"?');
  }
  
  console.log(`� Found Amplify App ID: ${appId}`);
  console.log(`🌐 App URL: ${appUrl || 'Not yet deployed'}`);
  
  return { appId, appUrl };
}

async function deployToAmplify(appId: string) {
  const outDir = join(process.cwd(), 'out');
  
  // Check if out directory exists
  try {
    statSync(outDir);
  } catch {
    throw new Error('Build output directory "out" not found. Run "npm run build:static" first.');
  }
  
  console.log('📦 Creating deployment package...');
  
  // Create a zip file of the out directory
  const zipFile = join(process.cwd(), 'frontend-deploy.zip');
  execSync(`cd out && zip -r ${zipFile} . -x "*.DS_Store"`, { stdio: 'inherit' });
  
  console.log('🚀 Creating Amplify deployment...');
  
  // Create deployment
  const createDeploymentResponse = await amplifyClient.send(
    new CreateDeploymentCommand({
      appId,
      branchName: 'main',
    })
  );
  
  const { jobId, zipUploadUrl } = createDeploymentResponse;
  
  if (!zipUploadUrl) {
    throw new Error('Failed to get upload URL from Amplify');
  }
  
  console.log('📤 Uploading build artifacts...');
  
  // Upload the zip file to the pre-signed URL
  const fileBuffer = require('fs').readFileSync(zipFile);
  const uploadResponse = await fetch(zipUploadUrl, {
    method: 'PUT',
    body: fileBuffer,
    headers: {
      'Content-Type': 'application/zip',
    },
  });
  
  if (!uploadResponse.ok) {
    throw new Error(`Upload failed: ${uploadResponse.statusText}`);
  }
  
  console.log('🎯 Starting deployment...');
  
  // Start the deployment
  await amplifyClient.send(
    new StartDeploymentCommand({
      appId,
      branchName: 'main',
      jobId,
    })
  );
  
  console.log('✅ Deployment started successfully!');
  console.log(`📝 Job ID: ${jobId}`);
  
  // Clean up
  execSync(`rm ${zipFile}`);
  
  return jobId;
}

async function main() {
  try {
    console.log('🚀 Starting frontend deployment...\n');
    
    const { appId, appUrl } = getAmplifyConfig();
    
    const jobId = await deployToAmplify(appId);
    
    console.log('\n✨ Deployment initiated!');
    console.log(`\n🔗 View deployment status:`);
    console.log(`   https://console.aws.amazon.com/amplify/home?region=${region}#/${appId}/main/${jobId}`);
    console.log(`\n🌐 Your app will be available at:`);
    console.log(`   ${appUrl || `https://main.${appId}.amplifyapp.com`}`);
    
  } catch (error) {
    console.error('❌ Deployment failed:', error);
    process.exit(1);
  }
}

main();
