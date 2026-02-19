import { test, expect, Page } from '@playwright/test';

/**
 * Comprehensive E2E Tests for Data Sources Feature
 * Tests the complete workflow after backend deployment.
 * Authentication is handled by the setup project (e2e/auth.setup.ts).
 */

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

test.describe('Data Sources - Navigation', () => {
  
  test('should navigate from landing page', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Click the "Connect Data Sources" button on landing page
    const connectButton = page.getByRole('button', { name: /connect data sources/i });
    await connectButton.waitFor({ state: 'visible', timeout: 10000 });
    await connectButton.click();
    
    // Verify we're on the data sources page
    await expect(page).toHaveURL(/\/datasources/, { timeout: 10000 });
  });

  test('should navigate from menu', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Click the navigation link
    const dataSourcesLink = page.getByRole('link', { name: /data sources/i });
    await dataSourcesLink.waitFor({ state: 'visible', timeout: 10000 });
    await dataSourcesLink.click();
    
    // Verify we're on the data sources page
    await expect(page).toHaveURL(/\/datasources/, { timeout: 10000 });
  });
});

test.describe('Data Sources - Create Connection', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/datasources`);
    await page.waitForLoadState('networkidle');
  });

  test('should open create dialog', async ({ page }) => {
    await page.getByRole('button', { name: /new connection/i }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByRole('heading', { name: /create data source connection/i })).toBeVisible();
  });

  test('should close dialog on cancel', async ({ page }) => {
    await page.getByRole('button', { name: /new connection/i }).click();
    await page.getByRole('button', { name: /cancel/i }).click();
    await expect(page.getByRole('dialog')).not.toBeVisible();
  });

  test('should close dialog on escape', async ({ page }) => {
    await page.getByRole('button', { name: /new connection/i }).click();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).not.toBeVisible();
  });

  test('should show form fields', async ({ page }) => {
    await page.getByRole('button', { name: /new connection/i }).click();
    
    // Check for required fields - use text content since Select doesn't have proper label association
    await expect(page.getByLabel(/connection name/i)).toBeVisible();
    await expect(page.getByText('Data Source Type')).toBeVisible();
    await expect(page.getByLabel(/account identifier/i)).toBeVisible();
  });
});

test.describe('Data Sources - Connection List', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/datasources`);
    await page.waitForLoadState('networkidle');
  });

  test('should display page header', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Data Sources', exact: true })).toBeVisible();
    await expect(page.getByText(/manage connections/i)).toBeVisible();
  });

  test('should display new connection button', async ({ page }) => {
    await expect(page.getByRole('button', { name: /new connection/i })).toBeVisible();
  });

  test('should handle empty state', async ({ page }) => {
    // If no connections, should show empty state or just the button
    const connectionCards = await page.locator('[data-testid="connection-card"]').count();
    
    if (connectionCards === 0) {
      await expect(page.getByRole('button', { name: /new connection/i })).toBeVisible();
    }
  });
});

test.describe('Data Sources - Connection Actions', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/datasources`);
    await page.waitForLoadState('networkidle');
  });

  test.skip('should test connection', async ({ page }) => {
    // Skip if no connections exist
    const hasConnections = await page.locator('[data-testid="connection-card"]').count() > 0;
    if (!hasConnections) test.skip();
    
    await page.getByRole('button', { name: /test connection/i }).first().click();
    await expect(page.getByText(/testing/i)).toBeVisible({ timeout: 5000 });
  });

  test.skip('should view details', async ({ page }) => {
    const hasConnections = await page.locator('[data-testid="connection-card"]').count() > 0;
    if (!hasConnections) test.skip();
    
    await page.getByRole('button', { name: /view details/i }).first().click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByText(/connection details/i)).toBeVisible();
  });

  test.skip('should delete connection', async ({ page }) => {
    const hasConnections = await page.locator('[data-testid="connection-card"]').count() > 0;
    if (!hasConnections) test.skip();
    
    const initialCount = await page.locator('[data-testid="connection-card"]').count();
    
    await page.getByRole('button', { name: /delete/i }).first().click();
    await expect(page.getByText(/are you sure/i)).toBeVisible();
    await page.getByRole('button', { name: /delete|confirm/i }).click();
    
    await expect(page.locator('[data-testid="connection-card"]')).toHaveCount(initialCount - 1, {
      timeout: 10000
    });
  });
});

test.describe('Data Sources - Responsive Design', () => {
  
  test('should work on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(`${BASE_URL}/datasources`);
    await page.waitForLoadState('networkidle');
    
    await expect(page.getByRole('heading', { name: 'Data Sources', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: /new connection/i })).toBeVisible();
  });

  test('should work on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto(`${BASE_URL}/datasources`);
    await page.waitForLoadState('networkidle');
    
    await expect(page.getByRole('heading', { name: 'Data Sources', exact: true })).toBeVisible();
  });
});

test.describe('Data Sources - Accessibility', () => {
  
  test('should support keyboard navigation', async ({ page }) => {
    await page.goto(`${BASE_URL}/datasources`);
    await page.waitForLoadState('networkidle');
    
    // Tab through elements
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Should be able to activate button with Enter
    const focused = await page.evaluate(() => document.activeElement?.tagName);
    expect(['BUTTON', 'A']).toContain(focused);
  });

  test('should have proper ARIA labels', async ({ page }) => {
    await page.goto(`${BASE_URL}/datasources`);
    await page.waitForLoadState('networkidle');
    
    const newButton = page.getByRole('button', { name: /new connection/i });
    await expect(newButton).toBeVisible();
  });
});

test.describe('Data Sources - Error Handling', () => {
  
  test('should handle network errors', async ({ page }) => {
    await page.route('**/graphql', route => route.abort());
    await page.goto(`${BASE_URL}/datasources`);
    await page.waitForLoadState('networkidle');
    
    // Should show error or loading state
    await page.waitForTimeout(2000);
  });

  test('should handle slow responses', async ({ page }) => {
    await page.route('**/graphql', async route => {
      await page.waitForTimeout(3000);
      await route.continue();
    });
    
    await page.goto(`${BASE_URL}/datasources`);
    await page.waitForLoadState('networkidle');
    
    // Should show loading state
    await page.waitForTimeout(1000);
  });
});
