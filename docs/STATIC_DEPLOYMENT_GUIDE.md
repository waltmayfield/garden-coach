# Static Site Deployment Guide

This guide explains how to deploy the Digital Operations Agent as a static website to AWS Amplify Hosting.

## Architecture

The application is deployed as a **static site** with the following architecture:

- **Frontend**: Next.js static export hosted on AWS Amplify Hosting
- **Backend**: AWS Amplify Gen 2 backend (AppSync, DynamoDB, Lambda, etc.)
- **Agent Runtime**: Separate AgentCore Runtime container (deployed independently)
- **Communication**: Frontend → AppSync GraphQL API → Backend services

## Why Static Export?

All pages in this application are pre-rendered at build time:
- No API routes (AgentCore is separate)
- No server-side rendering
- GraphQL subscriptions work client-side
- Query string parameters for dynamic content

## Prerequisites

1. AWS CLI configured with appropriate credentials
2. Node.js 20+ installed
3. Backend deployed via `npm run sandbox`

## Deployment Steps

### 1. Deploy Backend (First Time Only)

The backend includes the Amplify Hosting app infrastructure:

```bash
npm run sandbox
```

This creates:
- Amplify Hosting App
- Main branch configuration
- CloudFormation outputs with App ID and URL

### 2. Build Static Site

```bash
npm run build:static
```

This creates an `out/` directory with static HTML/CSS/JS files.

### 3. Deploy Frontend

```bash
npm run deploy:frontend
```

Or deploy both in one command:

```bash
npm run deploy
```

This script:
1. Reads the Amplify App ID from CloudFormation outputs
2. Zips the `out/` directory
3. Uploads to Amplify Hosting
4. Starts the deployment

### 4. View Deployment

The script outputs:
- Deployment job ID
- Console URL to monitor progress
- App URL where site will be available

Example output:
```
✨ Deployment initiated!

🔗 View deployment status:
   https://console.aws.amazon.com/amplify/home?region=us-east-1#/d123abc/main/1

🌐 Your app will be available at:
   https://main.d123abc.amplifyapp.com
```

## Configuration

### Next.js Config

The `next.config.ts` file is configured for static export:

```typescript
const nextConfig: NextConfig = {
  output: 'export',
};
```

### Amplify App Config

The Amplify app is created in `amplify/backend.ts`:

```typescript
const amplifyApp = new amplify.CfnApp(backend.stack, 'DigitalOperationsApp', {
  name: 'digital-operations-frontend',
  platform: 'WEB', // Static site
  customRules: [
    {
      source: '/<*>',
      target: '/index.html',
      status: '404-200', // SPA fallback
    },
  ],
});
```

## Custom Domain (Optional)

To add a custom domain:

1. Add domain in Amplify Console
2. Or update `amplify/backend.ts`:

```typescript
// Add custom domain
const domain = new amplify.CfnDomain(backend.stack, 'CustomDomain', {
  appId: amplifyApp.attrAppId,
  domainName: 'yourdomain.com',
  subDomainSettings: [
    {
      branchName: mainBranch.branchName,
      prefix: 'www',
    },
  ],
});
```

## Environment Variables

Frontend environment variables are embedded at build time. To add:

1. Create `.env.local` (not committed):
```bash
NEXT_PUBLIC_API_URL=https://your-api.com
```

2. Reference in code:
```typescript
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
```

3. Rebuild and redeploy

## Troubleshooting

### "AmplifyAppId not found in stack outputs"

**Solution**: Deploy backend first with `npm run sandbox`

### "Build output directory 'out' not found"

**Solution**: Run `npm run build:static` before deploying

### 404 errors on page refresh

**Solution**: The SPA fallback rule should handle this. Verify in Amplify Console → App Settings → Rewrites and redirects

### GraphQL connection issues

**Solution**: Ensure `amplify_outputs.json` is up to date and included in the build

## CI/CD Integration

For automated deployments, add to your CI/CD pipeline:

```yaml
# Example GitHub Actions
- name: Install dependencies
  run: npm ci

- name: Build static site
  run: npm run build:static

- name: Deploy to Amplify
  run: npm run deploy:frontend
  env:
    AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
    AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
    AWS_REGION: us-east-1
```

## Monitoring

View deployment logs and metrics:

1. AWS Console → Amplify → Your App
2. Select "main" branch
3. View deployment history and logs

## Rollback

To rollback to a previous deployment:

1. Go to Amplify Console
2. Select the branch
3. Find the previous successful deployment
4. Click "Redeploy this version"

## Cost Optimization

Static hosting on Amplify is cost-effective:
- Pay per GB served
- Free tier: 15 GB served/month
- No server costs (unlike SSR)

## Next Steps

- Set up custom domain
- Configure CDN caching rules
- Add monitoring and alerts
- Set up staging environment

## Related Documentation

- [Amplify Hosting Documentation](https://docs.aws.amazon.com/amplify/latest/userguide/welcome.html)
- [Next.js Static Export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [AWS Amplify Gen 2](https://docs.amplify.aws/)
