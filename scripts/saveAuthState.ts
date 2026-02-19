#!/usr/bin/env ts-node

/**
 * Manual Authentication State Capture for AWS Amplify
 * 
 * This script opens a browser where you can manually log in.
 * After logging in, it saves the authentication state (including localStorage)
 * for use in Playwright tests.
 * 
 * AWS Amplify stores auth tokens in localStorage with keys like:
 * - CognitoIdentityServiceProvider.{clientId}.{userId}.accessToken
 * - CognitoIdentityServiceProvider.{clientId}.{userId}.idToken
 * - CognitoIdentityServiceProvider.{clientId}.{userId}.refreshToken
 * 
 * Usage:
 *   npm run auth:save
 */

import { chromium } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');
const baseURL = process.env.BASE_URL || 'http://localhost:3000';

async function saveAuthState() {
  console.log('🚀 Manual Authentication State Capture');
  console.log('=====================================\n');
  
  // Launch browser in headed mode with a fresh profile
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 500 // Slow down actions so you can see what's happening
  });
  
  // Create a completely fresh context (no existing auth)
  const context = await browser.newContext({
    // Start with no storage state
    storageState: undefined
  });
  
  const page = await context.newPage();
  
  console.log(`📱 Opening browser at: ${baseURL}`);
  console.log('👉 This is a FRESH browser session - you MUST log in.\n');
  console.log('⏳ Please log in manually in the browser window...\n');
  
  await page.goto(baseURL);
  
  // Wait for user to manually log in
  console.log('⏳ Waiting for you to complete login...');
  console.log('   Look for the "Data Sources" link in the navigation');
  console.log('   to confirm you\'re logged in.\n');
  
  // Wait for the Data Sources link to appear (indicates successful login)
  await page.getByRole('link', { name: /data sources/i }).waitFor({ 
    state: 'visible',
    timeout: 300000 // 5 minutes - plenty of time to log in manually
  });
  
  console.log('✅ Login detected!\n');
  console.log('⏳ Waiting for authentication to fully settle...');
  console.log('   (This ensures all tokens are stored in localStorage)\n');
  
  // Give plenty of time for auth tokens to be set in localStorage
  await page.waitForTimeout(5000);
  
  // Check localStorage for Cognito tokens - try multiple times
  console.log('🔍 Checking for Cognito tokens in localStorage...\n');
  
  let cognitoKeys: string[] = [];
  let attempts = 0;
  const maxAttempts = 3;
  
  while (cognitoKeys.length === 0 && attempts < maxAttempts) {
    attempts++;
    
    const localStorageData = await page.evaluate(() => {
      const data: Record<string, string> = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) {
          data[key] = localStorage.getItem(key) || '';
        }
      }
      return data;
    });
    
    cognitoKeys = Object.keys(localStorageData).filter(key => 
      key.startsWith('CognitoIdentityServiceProvider')
    );
    
    if (cognitoKeys.length === 0 && attempts < maxAttempts) {
      console.log(`   Attempt ${attempts}/${maxAttempts}: No tokens found, waiting 2s...`);
      await page.waitForTimeout(2000);
    }
  }
  
  if (cognitoKeys.length > 0) {
    console.log(`✅ Found ${cognitoKeys.length} Cognito keys in localStorage:`);
    cognitoKeys.forEach(key => {
      const shortKey = key.length > 80 ? key.substring(0, 77) + '...' : key;
      console.log(`   - ${shortKey}`);
    });
    console.log('');
  } else {
    console.log('⚠️  WARNING: No Cognito keys found in localStorage after 3 attempts!');
    console.log('   This might be because:');
    console.log('   1. You were already logged in (tokens in existing browser)');
    console.log('   2. Amplify stores tokens differently in this setup');
    console.log('   3. The page uses a different authentication mechanism\n');
  }
  
  // Navigate to the data sources page to ensure auth is working
  console.log('🔍 Verifying authentication by navigating to Data Sources...\n');
  await page.goto(`${baseURL}/datasources`);
  await page.waitForLoadState('networkidle');
  
  // Wait for the page to load and verify we're not on login screen
  try {
    await page.getByRole('heading', { name: /data sources/i }).waitFor({ 
      state: 'visible',
      timeout: 10000
    });
    console.log('✅ Authentication verified - Data Sources page loaded!\n');
  } catch (error) {
    console.error('❌ Warning: Could not verify Data Sources page loaded.');
    console.error('   You may still be on the login screen.');
    console.error('   The auth state may not work correctly.\n');
  }
  
  // Wait a bit more to ensure everything is settled
  await page.waitForTimeout(2000);
  
  // Save the authentication state (includes localStorage, cookies, etc.)
  const state = await context.storageState({ path: authFile });
  
  console.log(`✅ Authentication state saved to: ${authFile}`);
  console.log(`\n📊 Captured state summary:`);
  console.log(`   - Cookies: ${state.cookies.length}`);
  console.log(`   - Origins with storage: ${state.origins.length}`);
  
  // Check if localStorage was captured
  let totalLocalStorageItems = 0;
  let cognitoItemsInState = 0;
  state.origins.forEach(origin => {
    if (origin.localStorage) {
      totalLocalStorageItems += origin.localStorage.length;
      cognitoItemsInState += origin.localStorage.filter(item => 
        item.name.startsWith('CognitoIdentityServiceProvider')
      ).length;
    }
  });
  
  console.log(`   - Total localStorage items: ${totalLocalStorageItems}`);
  console.log(`   - Cognito items in state: ${cognitoItemsInState}`);
  
  if (cognitoItemsInState === 0) {
    console.log('\n⚠️  WARNING: No Cognito tokens captured in state!');
    console.log('   This likely means authentication will not work in tests.');
    console.log('   The tests will probably fail.\n');
    console.log('   Possible issues:');
    console.log('   - You may not have actually logged in');
    console.log('   - Amplify may be using a different storage mechanism');
    console.log('   - The page may not have finished loading\n');
  } else {
    console.log('\n✅ Auth state looks good!\n');
  }
  
  console.log('📝 Next steps:');
  console.log('   1. Run your tests: npm run test:e2e');
  console.log('   2. Tests will use this saved authentication state');
  console.log('   3. Re-run this script if authentication expires\n');
  
  await browser.close();
  
  console.log('🎉 Done! You can now run your tests.');
}

saveAuthState().catch(error => {
  console.error('❌ Error:', error);
  process.exit(1);
});
