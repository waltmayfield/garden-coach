# E2E Tests for Data Sources

End-to-end tests using Playwright to verify the data sources functionality after backend deployment.

## Setup

### 1. Install Playwright

```bash
npm install -D @playwright/test
npx playwright install
```

### 2. Configure Environment

Copy the example environment file:

```bash
cp .env.test.example .env.test
```

Edit `.env.test` with your test credentials:

```env
BASE_URL=http://localhost:3000
TEST_USER_EMAIL=your-test-user@example.com
TEST_USER_PASSWORD=YourTestPassword123!
```

### 3. Save Authentication State (One-Time Setup)

Since AWS Amplify uses complex authentication with SSR, we use manual login to capture the auth state:

```bash
# Make sure your dev server is running
npm run dev

# In another terminal, run the auth capture script
npm run auth:save
```

This will:
1. Open a browser window
2. Navigate to your app
3. Wait for you to log in manually
4. Save the authentication state to `playwright/.auth/user.json`
5. Close the browser

**You only need to do this once**, or whenever your authentication expires.

### 4. Deploy Backend

Make sure your backend is deployed:

```bash
npm run sandbox
```

### 5. Start Frontend (if not already running)

In a separate terminal:

```bash
npm run dev
```

## Running Tests

### Run All Tests

```bash
npx playwright test
```

### Run Specific Test File

```bash
npx playwright test e2e/datasources.spec.ts
```

### Run in UI Mode (Interactive)

```bash
npx playwright test --ui
```

### Run in Headed Mode (See Browser)

```bash
npx playwright test --headed
```

### Run Specific Browser

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Debug Tests

```bash
npx playwright test --debug
```

## Test Structure

### datasources.spec.ts
Basic smoke tests for data sources functionality:
- Navigation
- Opening dialogs
- Basic UI elements

### datasources-full.spec.ts
Comprehensive tests covering:
- **Navigation**: Landing page and menu navigation
- **Create Connection**: Dialog interactions, form validation
- **Connection List**: Display, empty states
- **Connection Actions**: Test, view details, delete
- **Responsive Design**: Mobile and tablet viewports
- **Accessibility**: Keyboard navigation, ARIA labels
- **Error Handling**: Network errors, slow responses

## Test Scenarios

### 1. Navigation Tests
- ✅ Navigate from landing page "Connect Data Sources" button
- ✅ Navigate from navigation menu "Data Sources" link
- ✅ Verify URL and page title

### 2. Create Connection Tests
- ✅ Open create connection dialog
- ✅ Close dialog (cancel button, escape key)
- ✅ Display all form fields
- ⏭️ Validate required fields
- ⏭️ Create Snowflake connection (requires credentials)
- ⏭️ Handle creation errors

### 3. Connection List Tests
- ✅ Display page header and description
- ✅ Display "New Connection" button
- ✅ Handle empty state
- ⏭️ Display connection cards
- ⏭️ Show connection status badges

### 4. Connection Actions Tests
- ⏭️ Test connection (requires existing connection)
- ⏭️ View connection details
- ⏭️ Delete connection with confirmation
- ⏭️ Handle action errors

### 5. Responsive Design Tests
- ✅ Mobile viewport (375x667)
- ✅ Tablet viewport (768x1024)
- ✅ Desktop viewport (1920x1080)

### 6. Accessibility Tests
- ✅ Keyboard navigation
- ✅ ARIA labels and roles
- ✅ Focus management
- ✅ Screen reader compatibility

### 7. Error Handling Tests
- ✅ Network errors (aborted requests)
- ✅ Slow responses (delayed requests)
- ⏭️ Invalid credentials
- ⏭️ Backend errors

## Test Data

### Test User
Create a test user in Cognito:

```bash
node scripts/createUser.js
```

Follow the prompts to create a user with:
- Email: test@example.com
- Password: TestPassword123!

### Test Snowflake Connection
For integration tests that create actual connections, you'll need:
- Valid Snowflake account
- Test database and schema
- User with appropriate permissions

**Security Note:** Never commit real credentials to the repository!

## CI/CD Integration

### GitHub Actions Example

```yaml
name: E2E Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Install Playwright
        run: npx playwright install --with-deps
      
      - name: Deploy backend
        run: npm run sandbox
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
      
      - name: Run E2E tests
        run: npx playwright test
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
```

## Troubleshooting

### Tests Fail with "Timeout"
- Increase timeout in `playwright.config.ts`
- Check if backend is deployed and running
- Verify frontend is accessible at BASE_URL

### Tests Fail with "Element not found"
- Check if selectors match your components
- Verify authentication is working
- Use `--headed` mode to see what's happening

### Tests Fail with "Network error"
- Verify backend is deployed
- Check AWS credentials
- Verify GraphQL endpoint is accessible

### Tests are Slow
- Run fewer browsers: `--project=chromium`
- Disable video: Set `video: 'off'` in config
- Run in parallel: Remove `workers: 1` from config

## Best Practices

### 1. Use Data Test IDs
Add `data-testid` attributes to components:

```tsx
<div data-testid="connection-card">
  {/* ... */}
</div>
```

### 2. Wait for Elements
Always wait for elements to be visible:

```ts
await expect(page.getByRole('button')).toBeVisible();
```

### 3. Clean Up Test Data
Delete test connections after tests:

```ts
test.afterEach(async ({ page }) => {
  // Clean up test data
});
```

### 4. Use Page Object Model
For complex tests, create page objects:

```ts
class DataSourcesPage {
  constructor(private page: Page) {}
  
  async navigateTo() {
    await this.page.goto('/datasources');
  }
  
  async createConnection(data: ConnectionData) {
    // ...
  }
}
```

### 5. Skip Tests Conditionally
Skip tests that require specific setup:

```ts
test.skip('should create connection', async ({ page }) => {
  if (!process.env.SNOWFLAKE_ACCOUNT) {
    test.skip();
  }
  // ...
});
```

## Reporting

### HTML Report
After running tests, view the HTML report:

```bash
npx playwright show-report
```

### JSON Report
Test results are saved to `test-results/results.json`

### JUnit Report
For CI integration: `test-results/junit.xml`

## Next Steps

1. **Add More Test Scenarios**
   - Chat integration with data sources
   - Query execution and results
   - Map layer creation from queries

2. **Add Visual Regression Tests**
   - Screenshot comparison
   - Visual diff reporting

3. **Add Performance Tests**
   - Page load times
   - Query execution times
   - Connection test times

4. **Add API Tests**
   - Direct GraphQL API testing
   - Lambda function testing
   - Athena query testing

## Resources

- [Playwright Documentation](https://playwright.dev)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Testing Library](https://testing-library.com)
- [AWS Amplify Testing](https://docs.amplify.aws/guides/testing/)

---

**Last Updated:** February 10, 2026
