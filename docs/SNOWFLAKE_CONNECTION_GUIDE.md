# Snowflake Connection Management Guide

This guide explains how to securely create and manage Snowflake connections using AWS Glue and the Athena Snowflake Connector for federated queries in the Digital Operations platform.

## Prerequisites

### ⚠️ Required: Athena Snowflake Connector (One-Time Setup)

Before creating your first Snowflake connection, you **must** deploy the **Athena Snowflake Connector** in your AWS account. This is a Lambda function that enables Athena to query Snowflake.

**Quick Deployment Steps:**

1. **Open AWS Serverless Application Repository**
   - Go to: https://console.aws.amazon.com/serverlessrepo
   - Or search for "Serverless Application Repository" in AWS Console

2. **Find and Deploy the Connector**
   - Search for: `AthenaSnowflakeConnector`
   - Select the application from AWS Labs
   - Click **Deploy**

3. **Configure Settings**
   - **Application name**: `AthenaSnowflakeConnector`
   - **SpillBucket**: Create or select an S3 bucket (e.g., `athena-snowflake-spill-{account-id}`)
   - **AthenaCatalogName**: `snowflake` (default)
   - **LambdaMemory**: `3008` MB (recommended)
   - **LambdaTimeout**: `900` seconds (15 minutes)
   - Check "I acknowledge that this app creates custom IAM roles"
   - Click **Deploy**

4. **Wait for Completion** (2-3 minutes)
   - Status will show "CREATE_COMPLETE" when ready

**This is a one-time setup** - once deployed, it works for all Snowflake connections in your account.

**Cost:** < $1/month for moderate usage

**Alternative: AWS CLI Deployment**
```bash
# Create S3 bucket for spill data
aws s3 mb s3://athena-snowflake-spill-$(aws sts get-caller-identity --query Account --output text)

# Deploy connector (replace with actual application ARN)
aws serverlessrepo create-cloud-formation-change-set \
  --application-id arn:aws:serverlessrepo:us-east-1:292517598671:applications/AthenaSnowflakeConnector \
  --stack-name AthenaSnowflakeConnector \
  --capabilities CAPABILITY_IAM \
  --parameter-overrides \
    SpillBucket=athena-snowflake-spill-$(aws sts get-caller-identity --query Account --output text)
```

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    Frontend (Next.js)                            │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Connection Management UI                                 │  │
│  │  - Create/Test/Delete connections                        │  │
│  │  - Browse catalogs and databases                         │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    GraphQL API (AppSync)                         │
│  - manageDataSourceConnection mutation                          │
│  - DataSourceConnection model (DynamoDB)                        │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│              Lambda: datasource-manager                          │
│  Actions:                                                        │
│  - createConnection: Store credentials, create SM connection    │
│  - testConnection: Execute test query via Athena                │
│  - deleteConnection: Clean up resources                         │
│  - listDatabases: Browse available databases                    │
│  - listTables: Browse available tables                          │
└────────────────────────────┬────────────────────────────────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
        ▼                    ▼                    ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   AWS        │    │  SageMaker   │    │   Amazon     │
│   Secrets    │    │  Unified     │    │   Athena     │
│   Manager    │    │  Catalog     │    │              │
└──────────────┘    └──────────────┘    └──────────────┘
        │                    │                    │
        │                    │                    │
        └────────────────────┼────────────────────┘
                             │
                             ▼
                    ┌──────────────┐
                    │  Snowflake   │
                    │  (External)  │
                    └──────────────┘
```

## Security Best Practices

### 1. Credential Storage
- ✅ **Credentials stored in AWS Secrets Manager** (never in DynamoDB)
- ✅ **Automatic encryption** at rest using AWS KMS
- ✅ **IAM-based access control** to secrets
- ✅ **Audit logging** via CloudTrail
- ✅ **30-day recovery period** for deleted secrets

### 2. Connection Metadata
- ✅ **Non-sensitive data in DynamoDB** (account name, warehouse, database)
- ✅ **Sensitive data in Secrets Manager** (username, password, tokens)
- ✅ **Owner-based authorization** (users can only manage their own connections)

### 3. IAM Permissions
- ✅ **Least privilege** - Lambda has minimal required permissions
- ✅ **Resource-based policies** - Secrets scoped to `datasource/*` prefix
- ✅ **Authenticated users only** - No public access

## Data Models

### DataSourceConnection (DynamoDB)
```typescript
{
  id: string;                    // Auto-generated
  name: string;                  // User-friendly name
  description?: string;          // Optional description
  type: 'SNOWFLAKE' | 'DATABRICKS' | ...;
  status: 'ACTIVE' | 'INACTIVE' | 'TESTING' | 'FAILED' | 'CREATING';
  
  // Security
  secretArn: string;             // AWS Secrets Manager ARN
  
  // Catalog info
  catalogId?: string;            // Glue catalog name
  
  // Non-sensitive metadata
  connectionMetadata: {
    account: string;             // Snowflake account identifier
    warehouse: string;           // Snowflake warehouse
    database: string;            // Default database
    schema?: string;             // Default schema
    role?: string;               // Snowflake role
  };
  
  // Test results
  lastTestDate?: datetime;
  lastTestStatus?: string;
  lastTestMessage?: string;
  
  // Usage tracking
  queryCount: number;
  lastQueryDate?: datetime;
  
  // Ownership
  createdBy: string;
  owner: string;                 // Cognito user ID
}
```

### Credentials (Secrets Manager)

**Password Authentication:**
```json
{
  "account": "xy12345.us-east-1",
  "username": "ANALYTICS_USER",
  "password": "SecurePassword123!",
  "warehouse": "COMPUTE_WH",
  "database": "ANALYTICS_DB",
  "schema": "PUBLIC",
  "role": "ANALYST_ROLE",
  "authenticationType": "PASSWORD"
}
```

**Private Key Authentication (Recommended for Production):**
```json
{
  "account": "xy12345.us-east-1",
  "username": "ANALYTICS_USER",
  "privateKey": "-----BEGIN PRIVATE KEY-----\nMIIEvg...\n-----END PRIVATE KEY-----",
  "warehouse": "COMPUTE_WH",
  "database": "ANALYTICS_DB",
  "schema": "PUBLIC",
  "role": "ANALYST_ROLE",
  "authenticationType": "PRIVATE_KEY"
}
```

## API Usage

### Create Connection with Private Key Authentication

```typescript
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '@/amplify/data/resource';

const client = generateClient<Schema>();

// Read your private key file
const privateKey = `-----BEGIN PRIVATE KEY-----
MIIEvg...
-----END PRIVATE KEY-----`;

const result = await client.mutations.manageDataSourceConnection({
  action: 'createConnection',
  input: {
    name: 'Production Snowflake',
    description: 'Main analytics warehouse with private key auth',
    type: 'SNOWFLAKE',
    credentials: {
      account: 'xy12345.us-east-1',
      username: 'ANALYTICS_USER',
      privateKey: privateKey,
      warehouse: 'COMPUTE_WH',
      database: 'ANALYTICS_DB',
      schema: 'PUBLIC',
      role: 'ANALYST_ROLE',
      authenticationType: 'PRIVATE_KEY'
    },
    connectionMetadata: {
      account: 'xy12345.us-east-1',
      warehouse: 'COMPUTE_WH',
      database: 'ANALYTICS_DB',
      schema: 'PUBLIC',
      role: 'ANALYST_ROLE'
    }
  }
});

if (result.data?.success) {
  console.log('Connection created:', result.data.catalogName);
  console.log('Secret ARN:', result.data.secretArn);
}
```

### Create Connection with Password Authentication

```typescript
const result = await client.mutations.manageDataSourceConnection({
  action: 'createConnection',
  input: {
    name: 'Dev Snowflake',
    description: 'Development warehouse',
    type: 'SNOWFLAKE',
    credentials: {
      account: 'xy12345.us-east-1',
      username: 'DEV_USER',
      password: 'SecurePassword123!',
      warehouse: 'DEV_WH',
      database: 'DEV_DB',
      schema: 'PUBLIC',
      authenticationType: 'PASSWORD'
    },
    connectionMetadata: {
      account: 'xy12345.us-east-1',
      warehouse: 'DEV_WH',
      database: 'DEV_DB',
      schema: 'PUBLIC'
    }
  }
});
```

### Test Connection

```typescript
const testResult = await client.mutations.manageDataSourceConnection({
  action: 'testConnection',
  input: {
    connectionId: 'connection-id',
    secretArn: 'arn:aws:secretsmanager:...',
    type: 'SNOWFLAKE',
    connectionMetadata: {
      catalogName: 'snowflake-production',
      account: 'xy12345.us-east-1',
      warehouse: 'COMPUTE_WH',
      database: 'ANALYTICS_DB'
    }
  }
});

if (testResult.data?.success) {
  console.log('Connection test passed!');
  console.log('Execution time:', testResult.data.executionTimeMs, 'ms');
}
```

### List Databases

```typescript
const databases = await client.mutations.manageDataSourceConnection({
  action: 'listDatabases',
  input: {
    catalogName: 'snowflake-production'
  }
});

console.log('Available databases:', databases.data?.databases);
```

### Delete Connection

```typescript
const deleteResult = await client.mutations.manageDataSourceConnection({
  action: 'deleteConnection',
  input: {
    connectionId: 'connection-id',
    secretArn: 'arn:aws:secretsmanager:...',
    catalogName: 'snowflake-production'
  }
});

if (deleteResult.data?.success) {
  console.log('Connection deleted successfully');
}
```

## Snowflake Setup

### 1. Create Snowflake User

**Option A: Password Authentication (Simple)**
```sql
-- Create a dedicated user for AWS integration
CREATE USER aws_analytics_user
  PASSWORD = 'SecurePassword123!'
  DEFAULT_ROLE = analyst_role
  DEFAULT_WAREHOUSE = compute_wh
  DEFAULT_NAMESPACE = analytics_db.public;

-- Grant necessary privileges
GRANT ROLE analyst_role TO USER aws_analytics_user;
```

**Option B: Private Key Authentication (Recommended for Production)**

First, generate an RSA key pair locally:
```bash
# Generate private key
openssl genrsa 2048 | openssl pkcs8 -topk8 -inform PEM -out rsa_key.p8 -nocrypt

# Generate public key
openssl rsa -in rsa_key.p8 -pubout -out rsa_key.pub
```

Then, create the user in Snowflake with the public key:
```sql
-- Get the public key content (remove header/footer and newlines)
-- From rsa_key.pub, copy everything between BEGIN/END PUBLIC KEY

-- Create user with public key authentication
CREATE USER aws_analytics_user
  RSA_PUBLIC_KEY = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA...'
  DEFAULT_ROLE = analyst_role
  DEFAULT_WAREHOUSE = compute_wh
  DEFAULT_NAMESPACE = analytics_db.public;

-- Grant necessary privileges
GRANT ROLE analyst_role TO USER aws_analytics_user;
```

Store the private key (rsa_key.p8) securely - you'll need it when creating the connection.

### 2. Create Role with Appropriate Permissions

```sql
-- Create role for analytics
CREATE ROLE analyst_role;

-- Grant database access
GRANT USAGE ON DATABASE analytics_db TO ROLE analyst_role;
GRANT USAGE ON SCHEMA analytics_db.public TO ROLE analyst_role;

-- Grant table access (read-only for safety)
GRANT SELECT ON ALL TABLES IN SCHEMA analytics_db.public TO ROLE analyst_role;
GRANT SELECT ON FUTURE TABLES IN SCHEMA analytics_db.public TO ROLE analyst_role;

-- Grant warehouse access
GRANT USAGE ON WAREHOUSE compute_wh TO ROLE analyst_role;
```

### 3. Configure Network Policy (Optional but Recommended)

```sql
-- Allow connections from AWS IP ranges
CREATE NETWORK POLICY aws_access
  ALLOWED_IP_LIST = (
    '52.0.0.0/8',      -- AWS IP ranges (example)
    '54.0.0.0/8'       -- Add your specific AWS region IPs
  );

-- Apply to user
ALTER USER aws_analytics_user SET NETWORK_POLICY = aws_access;
```

### 4. Enable Query History (for auditing)

```sql
-- Snowflake automatically tracks query history
-- View queries from AWS
SELECT 
  query_text,
  user_name,
  execution_status,
  start_time,
  end_time,
  total_elapsed_time
FROM snowflake.account_usage.query_history
WHERE user_name = 'AWS_ANALYTICS_USER'
ORDER BY start_time DESC
LIMIT 100;
```

## Testing Checklist

Before deploying to production:

- [ ] Test connection with valid credentials
- [ ] Test connection with invalid credentials (should fail gracefully)
- [ ] Verify credentials are stored in Secrets Manager (not DynamoDB)
- [ ] Verify Glue connection is created
- [ ] Test query execution via Athena
- [ ] Test database listing
- [ ] Test table listing
- [ ] Test connection deletion (verify cleanup)
- [ ] Verify IAM permissions are minimal
- [ ] Check CloudTrail logs for audit trail
- [ ] Test with multiple users (verify isolation)

## Troubleshooting

### Connection Test Fails

**Symptom**: Test query returns FAILED status

**Possible Causes**:
1. Invalid Snowflake credentials
2. Network connectivity issues
3. Insufficient Snowflake permissions
4. Warehouse not running

**Solutions**:
```sql
-- Check user exists and is not locked
SHOW USERS LIKE 'AWS_ANALYTICS_USER';

-- Check role grants
SHOW GRANTS TO ROLE analyst_role;

-- Check warehouse status
SHOW WAREHOUSES LIKE 'COMPUTE_WH';

-- Start warehouse if suspended
ALTER WAREHOUSE compute_wh RESUME;
```

### Glue Connection Creation Fails

**Symptom**: Connection created but catalogId is null

**Possible Causes**:
1. IAM permissions missing for Lambda
2. Invalid JDBC URL format
3. Glue service limits reached

**Solutions**:
- Check Lambda CloudWatch logs
- Verify IAM policy includes `glue:CreateConnection`
- Check Glue connection limits in AWS Console

### Secrets Manager Access Denied

**Symptom**: Lambda cannot read/write secrets

**Solution**:
```typescript
// Verify IAM policy in backend.ts includes:
{
  effect: iam.Effect.ALLOW,
  actions: [
    'secretsmanager:CreateSecret',
    'secretsmanager:GetSecretValue',
    'secretsmanager:UpdateSecret',
    'secretsmanager:DeleteSecret',
  ],
  resources: [
    `arn:aws:secretsmanager:${region}:${account}:secret:datasource/*`,
  ],
}
```

## Cost Considerations

### Secrets Manager
- **Storage**: $0.40 per secret per month
- **API Calls**: $0.05 per 10,000 API calls
- **Estimated**: ~$0.50/month per connection

### Glue Data Catalog
- **Storage**: First 1M objects free, then $1 per 100,000 objects
- **API Calls**: First 1M requests free, then $1 per million
- **Estimated**: Free for most use cases

### Athena Queries
- **Data Scanned**: $5 per TB scanned
- **Test Queries**: ~$0.001 per test (minimal data scanned)
- **Estimated**: $0.01-0.10 per connection test

### Total Estimated Cost
- **Per Connection**: ~$0.50-1.00/month
- **10 Connections**: ~$5-10/month

## Querying Your Data Source

Once your connection passes the test, you can query your data in two ways:

### Option 1: Query Interface (Direct SQL)

Navigate to the **Data Sources** page and click the **Query** tab:

1. Select your data source from the dropdown
2. Enter your SQL query in the text area
3. Click "Execute Query" or press Cmd+Enter (Mac) / Ctrl+Enter (Windows)
4. View results in a formatted table

**Example Queries:**
```sql
-- List all tables in your database
SHOW TABLES;

-- Query sample data
SELECT * FROM your_table LIMIT 10;

-- Aggregate data
SELECT 
  category,
  COUNT(*) as count,
  AVG(value) as avg_value
FROM your_table
GROUP BY category
ORDER BY count DESC;
```

**Features:**
- Real-time query execution via Amazon Athena
- Results displayed in a formatted table
- Execution time tracking
- Support for all SQL queries supported by your data source

### Option 2: AI Agent (Natural Language)

Navigate to the **Chat** page and ask the AI agent to query your data:

**Example Prompts:**
- "Show me the top 10 customers by revenue from Snowflake"
- "What are the total sales by region in the last quarter?"
- "Create a chart showing monthly trends from the analytics database"
- "Compare performance metrics across different warehouses"

The AI agent will:
1. Understand your natural language request
2. Generate the appropriate SQL query
3. Execute it against your connected data source
4. Format and visualize the results
5. Provide insights and analysis

**Benefits:**
- No SQL knowledge required
- Automatic visualization generation
- Context-aware follow-up questions
- Multi-step analysis and insights

## Next Steps

1. **Deploy Backend**: Run `npm run sandbox` to deploy Lambda and schema
2. **Test Connection**: Verify your connection passes the test
3. **Query Your Data**: Use the Query Interface or AI Agent
4. **Monitor Usage**: Track query costs and performance in AWS Console

## Related Documentation

- [AWS Secrets Manager Best Practices](https://docs.aws.amazon.com/secretsmanager/latest/userguide/best-practices.html)
- [AWS Glue Connections](https://docs.aws.amazon.com/glue/latest/dg/connection-defining.html)
- [Snowflake JDBC Driver](https://docs.snowflake.com/en/user-guide/jdbc.html)
- [Athena Federated Queries](https://docs.aws.amazon.com/athena/latest/ug/connect-to-a-data-source.html)
