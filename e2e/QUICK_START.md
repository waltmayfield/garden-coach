# E2E Testing Quick Start

## TL;DR

```bash
# 1. Make sure dev server is running
npm run dev

# 2. Save auth state (one-time, opens browser for manual login)
npm run auth:save

# 3. Run tests
npm run test:e2e
```

## How It Works

### Manual Authentication Approach

Because AWS Amplify with SSR uses complex authentication storage (IndexedDB, HTTP-only cookies), we use a **manual login approach**:

1. **You log in once** in a real browser using the `auth:save` script
2. Playwright captures **everything** (cookies, localStorage, IndexedDB, etc.)
3. All tests reuse this saved authentication state
4. No need to log in for each test run

### When to Re-authenticate

Re-run `npm run auth:save` when:
- Authentication expires (tokens have TTL)
- You get authentication errors in tests
- You switch test users
- You deploy new auth configuration

## Running Tests

### All Tests
```bash
npm run test:e2e
```

### Specific Test File
```bash
npx playwright test e2e/datasources.spec.ts
```

### With UI (Interactive Mode)
```bash
npm run test:e2e:ui
```

### Debug Mode (Step Through Tests)
```bash
npm run test:e2e:debug
```

### Headed Mode (See Browser)
```bash
npm run test:e2e:headed
```

### Specific Browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

## Troubleshooting

### Tests Show Login Screen

**Problem:** Tests are seeing the login form instead of authenticated pages.

**Solution:** Your auth state expired or wasn't captured. Re-run:
```bash
npm run auth:save
```

### "storageState" File Not Found

**Problem:** `playwright/.auth/user.json` doesn't exist.

**Solution:** Run the auth capture script:
```bash
npm run auth:save
```

### Dev Server Not Running

**Problem:** Tests fail because localhost:3000 isn't responding.

**Solution:** Start the dev server:
```bash
npm run dev
```

The Playwright config will auto-start it, but it's faster if you keep it running.

### Authentication Works But Page Doesn't Load

**Problem:** You're authenticated but the Data Sources page shows a blank screen or error.

**Possible causes:**
1. Backend not deployed: Run `npm run sandbox`
2. GraphQL errors: Check browser console in headed mode
3. Component errors: Check test screenshots in `test-results/`

## Test Structure

```
e2e/
├── auth.setup.ts              # Automated auth (not used with manual approach)
├── datasources.spec.ts        # Simple smoke tests
├── datasources-full.spec.ts   # Comprehensive test suite
└── README.md                  # Detailed documentation

playwright/.auth/
└── user.json                  # Saved authentication state (git-ignored)

scripts/
└── saveAuthState.ts           # Manual auth capture script
```

## Best Practices

1. **Keep auth state fresh** - Re-run `auth:save` weekly or when tests fail
2. **Run tests often** - Catch issues early
3. **Use headed mode for debugging** - See what's actually happening
4. **Check screenshots** - Test failures include screenshots in `test-results/`
5. **Use UI mode for development** - Interactive test runner is great for writing tests

## CI/CD Integration

For CI/CD pipelines, you'll need to:

1. **Option A: Commit auth state** (not recommended for security)
   - Add `playwright/.auth/user.json` to git
   - Use a dedicated test account
   - Rotate credentials regularly

2. **Option B: Generate auth state in CI** (recommended)
   - Use the automated `e2e/auth.setup.ts` approach
   - Configure Amplify to use localStorage instead of IndexedDB
   - Or use Cognito API to generate tokens programmatically

3. **Option C: Use test-specific auth** (most secure)
   - Create temporary test users in CI
   - Clean up after tests
   - Use isolated test environment

## Next Steps

- Read [E2E_TESTING_GUIDE.md](../docs/E2E_TESTING_GUIDE.md) for detailed information
- Check [README.md](./README.md) for complete setup instructions
- See [Playwright docs](https://playwright.dev) for advanced features
