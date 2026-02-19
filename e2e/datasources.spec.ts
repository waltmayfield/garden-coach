import { test, expect } from '@playwright/test';

/**
 * E2E Tests for Data Sources Feature
 * 
 * These tests verify the complete data sources workflow after backend deployment.
 * Authentication is handled by the setup project (e2e/auth.setup.ts).
 */

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

test.describe('Data Sources E2E Tests', () => {

  test('should navigate to data sources page', async ({ page }) => {
    // Navigate using the sidebar link
    await page.goto(BASE_URL);
    
    const dataSourcesLink = page.getByRole('link', { name: /data sources/i });
    await dataSourcesLink.waitFor({ state: 'visible', timeout: 10000 });
    await dataSourcesLink.click();
    
    // Verify we're on the correct page
    await expect(page).toHaveURL(/\/datasources/, { timeout: 10000 });
    await expect(page.getByRole('heading', { name: 'Data Sources', exact: true })).toBeVisible({ timeout: 10000 });
  });

  test('should open create connection dialog', async ({ page }) => {
    await page.goto(`${BASE_URL}/datasources`);
    await page.waitForLoadState('networkidle');
    
    const newConnectionButton = page.getByRole('button', { name: /new connection/i });
    await newConnectionButton.waitFor({ state: 'visible', timeout: 10000 });
    await newConnectionButton.click();
    
    await expect(page.getByRole('dialog')).toBeVisible({ timeout: 5000 });
  });
});

export default test;
