# E2E Testing Guide

Complete guide for running end-to-end tests for the Data Sources feature.

## Quick Start

### 1. Install Dependencies

```bash
npm install
npx playwright install
```

### 2. Setup Environment

```bash
cp .env.test.example .env.test
```

Edit `.env.test`:
```env
BASE_URL=http://localhost:3000
TEST_USER_EMAIL=test@example.com
TEST_USER_PASSWORD=TestPassword123!
```

### 3. Create Test User

```bash
node scripts/createUser.js
```

### 4. Deploy Backend

```bash
npm run sandbox
```

### 5. Run Tests

```bash
# Terminal 1: Start frontend
npm run dev

# Terminal 2: Run tests
npm run test:e2e
```

## Test Commands

```bash
# Run all E2E tests
npm run test:e2e

# Run with UI (interactive mode)
npm run test:e2e:ui

# Run in headed mode (see browser)
npm run test:e2e:headed

# Debug tests
npm run test:e2e:debug

# View test report
npm run test:e2e:report
```

## What Gets Tested

### ✅ Implemented Tests

1. **Navigation**
   - Landing page → Data Sources
   - Navigation menu → Data Sources
   - URL verification

2. **Create Connection Dialog**
   - Open dialog
   - Close dialog (cancel, escape)
   - Form fields display

3. **Connection List**
   - Page header and description
   - New Connection button
   - Empty state handling

4. **Responsive Design**
   - Mobile viewport (375x667)
   - Tablet viewport (768x1024)
   - Desktop viewport

5. **Accessibility**
   - Keyboard navigation
   - ARIA labels
   - Focus management

6. **Error Handling**
   - Network errors
   - Slow responses

### ⏭️ Skipped Tests (Require Setup)

These tests are skipped by default and require:
- Existing connections in the database
- Valid Snowflake credentials
- Deployed backend with test data

1. **Connection Actions**
   - Test connection
   - View details
   - Delete connection

2. **Create Connection**
   - Full form submission
   - Snowflake connection creation
   - Validation errors

## Test Architecture

```
e2e/
├── datasources.spec.ts          # Basic smoke tests
├── datasources-full.spec.ts     # Comprehensive tests
└── README.md                    # Test documentation

playwright.config.ts             # Playwright configuration
.env.test.example               # Environment template
```

## Writing New Tests

### Basic Test Structure

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/datasources');
    // Setup code
  });

  test('should do something', async ({ page }) => {
    // Test code
    await page.click('button');
    await expect(page.getByText('Success')).toBeVisible();
  });
});
```

### Using Page Objects

```typescript
class DataSourcesPage {
  constructor(private page: Page) {}
  
  async navigateTo() {
    await this.page.goto('/datasources');
  }
  
  async openCreateDialog() {
    await this.page.getByRole('button', { name: /new connection/i }).click();
  }
  
  async fillConnectionForm(data: ConnectionData) {
    await this.page.fill('input[name="name"]', data.name);
    // ...
  }
}

test('should create connection', async ({ page }) => {
  const datasourcesPage = new DataSourcesPage(page);
  await datasourcesPage.navigateTo();
  await datasourcesPage.openCreateDialog();
  await datasourcesPage.fillConnectionForm({
    name: 'Test Connection',
    // ...
  });
});
```

### Conditional Tests

```typescript
test.skip('should test with real data', async ({ page }) => {
  // Skip if environment not configured
  if (!process.env.SNOWFLAKE_ACCOUNT) {
    test.skip();
  }
  
  // Test code
});
```

## CI/CD Integration

### GitHub Actions

Create `.github/workflows/e2e-tests.yml`:

```yaml
name: E2E Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Install Playwright browsers
        run: npx playwright install --with-deps
      
      - name: Deploy backend
        run: npm run sandbox
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          AWS_REGION: us-east-1
      
      - name: Run E2E tests
        run: npm run test:e2e
        env:
          BASE_URL: ${{ secrets.BASE_URL }}
          TEST_USER_EMAIL: ${{ secrets.TEST_USER_EMAIL }}
          TEST_USER_PASSWORD: ${{ secrets.TEST_USER_PASSWORD }}
      
      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
      
      - name: Upload test videos
        if: failure()
        uses: actions/upload-artifact@v3
        with:
          name: test-videos
          path: test-results/
          retention-days: 7
```

### AWS CodeBuild

Create `buildspec-e2e.yml`:

```yaml
version: 0.2

phases:
  install:
    runtime-versions:
      nodejs: 20
    commands:
      - npm ci
      - npx playwright install --with-deps
  
  pre_build:
    commands:
      - npm run sandbox
  
  build:
    commands:
      - npm run test:e2e
  
  post_build:
    commands:
      - echo "Tests completed"

artifacts:
  files:
    - playwright-report/**/*
    - test-results/**/*

reports:
  e2e-tests:
    files:
      - 'test-results/junit.xml'
    file-format: 'JUNITXML'
```

## Debugging Tests

### Visual Debugging

```bash
# Run with headed browser
npm run test:e2e:headed

# Run with debug mode (step through)
npm run test:e2e:debug

# Run with UI mode (interactive)
npm run test:e2e:ui
```

### Screenshots and Videos

Tests automatically capture:
- Screenshots on failure
- Videos on failure
- Traces on retry

Find them in `test-results/` directory.

### Playwright Inspector

```bash
# Open inspector
PWDEBUG=1 npm run test:e2e

# Or use debug command
npm run test:e2e:debug
```

## Best Practices

### 1. Use Semantic Selectors

```typescript
// ✅ Good - semantic, resilient
await page.getByRole('button', { name: /new connection/i });
await page.getByLabel('Connection Name');

// ❌ Bad - brittle, implementation-specific
await page.click('.btn-primary');
await page.click('#connection-name-input');
```

### 2. Wait for Elements

```typescript
// ✅ Good - explicit wait
await expect(page.getByText('Success')).toBeVisible();

// ❌ Bad - implicit wait
await page.waitForTimeout(1000);
```

### 3. Clean Up Test Data

```typescript
test.afterEach(async ({ page }) => {
  // Delete test connections
  await cleanupTestData(page);
});
```

### 4. Use Test IDs for Complex Selectors

```tsx
// Component
<div data-testid="connection-card">
  {/* ... */}
</div>

// Test
await page.locator('[data-testid="connection-card"]').first().click();
```

### 5. Isolate Tests

```typescript
// Each test should be independent
test('test 1', async ({ page }) => {
  // Don't rely on test 2
});

test('test 2', async ({ page }) => {
  // Don't rely on test 1
});
```

## Troubleshooting

### Tests Timeout

**Problem:** Tests fail with timeout errors

**Solutions:**
- Increase timeout in `playwright.config.ts`
- Check if backend is running
- Verify network connectivity
- Use `--headed` to see what's happening

### Element Not Found

**Problem:** `Error: Element not found`

**Solutions:**
- Check selector is correct
- Wait for element: `await expect(element).toBeVisible()`
- Check if element is in viewport
- Verify authentication state

### Flaky Tests

**Problem:** Tests pass sometimes, fail other times

**Solutions:**
- Add explicit waits
- Check for race conditions
- Verify test isolation
- Use `test.retry()` for known flaky tests

### Slow Tests

**Problem:** Tests take too long

**Solutions:**
- Run fewer browsers: `--project=chromium`
- Disable video: `video: 'off'`
- Increase workers: `workers: 4`
- Optimize test setup

## Performance Tips

### 1. Parallel Execution

```typescript
// playwright.config.ts
export default defineConfig({
  workers: process.env.CI ? 2 : 4,
  fullyParallel: true,
});
```

### 2. Reuse Authentication

```typescript
// global-setup.ts
export default async function globalSetup() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('/login');
  // Login once
  await page.context().storageState({ path: 'auth.json' });
  await browser.close();
}

// playwright.config.ts
export default defineConfig({
  use: {
    storageState: 'auth.json',
  },
});
```

### 3. Skip Unnecessary Tests

```typescript
test.skip(process.env.CI, 'Skip on CI');
test.skip(!process.env.SNOWFLAKE_ACCOUNT, 'Requires Snowflake');
```

## Resources

- [Playwright Documentation](https://playwright.dev)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [API Reference](https://playwright.dev/docs/api/class-test)
- [Debugging Guide](https://playwright.dev/docs/debug)

---

**Last Updated:** February 10, 2026
