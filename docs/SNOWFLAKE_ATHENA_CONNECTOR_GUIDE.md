# Snowflake Athena Connector Architecture Guide

## Overview

This document explains how the Digital Operations platform connects to Snowflake using AWS Athena's federated query capabilities.

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    Your Application                              │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Query Interface / AI Agent                               │  │
│  │  - User enters SQL query                                  │  │
│  │  - Selects Snowflake connection                          │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    GraphQL API (AppSync)                         │
│  - executeAthenaQuery mutation                                  │
│  - Passes: queryString, catalog, database                      │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│              Lambda: athena-query                                │
│  - Receives query parameters                                    │
│  - Calls Athena StartQueryExecution with:                      │
│    * QueryString: Your SQL                                      │
│    * Catalog: Glue connection name                             │
│    * Database: Snowflake database name                         │
│  - Polls for completion                                         │
│  - Returns results                                              │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Amazon Athena                                 │
│  - Receives federated query request                             │
│  - Looks up Glue connection (catalog)                          │
│  - Finds Athena Snowflake Connector Lambda                     │
│  - Invokes connector with query                                 │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│         Athena Snowflake Connector (Lambda)                      │
│  - Deployed separately (one-time setup)                         │
│  - Reads Glue connection details                                │
│  - Extracts secret name from JDBC URL: ${secretName}           │
│  - Fetches credentials from Secrets Manager                     │
│  - Connects to Snowflake via JDBC                              │
│  - Executes query                                               │
│  - Returns results to Athena                                    │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    AWS Secrets Manager                           │
│  - Stores Snowflake credentials securely                        │
│  - Encrypted at rest with KMS                                   │
│  - Credentials format:                                          │
│    {                                                            │
│      "account": "xy12345.us-east-1",                           │
│      "username": "ANALYTICS_USER",                             │
│      "password": "..." OR "privateKey": "...",                 │
│      "warehouse": "COMPUTE_WH",                                │
│      "database": "ANALYTICS_DB",                               │
│      "schema": "PUBLIC",                                       │
│      "authenticationType": "PASSWORD" | "PRIVATE_KEY"          │
│    }                                                            │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    AWS Glue Data Catalog                         │
│  - Stores connection metadata                                   │
│  - Connection name: snowflake-{your-connection-name}           │
│  - JDBC URL format:                                             │
│    jdbc:snowflake://account/?warehouse=WH&db=DB&${secretName}  │
│  - The ${secretName} tells connector where to find credentials │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
                    ┌──────────────┐
                    │  Snowflake   │
                    │  (External)  │
                    └──────────────┘
```

## Key Components

### 1. Athena Snowflake Connector (Required - One-Time Setup)

**What is it?**
- A Lambda function that acts as a bridge between Athena and Snowflake
- Deployed from AWS Serverless Application Repository
- Handles authentication, query execution, and result formatting

**Deployment:**
```bash
# Deploy via AWS Console:
# 1. Go to AWS Serverless Application Repository
# 2. Search for "AthenaSnowflakeConnector"
# 3. Click "Deploy"
# 4. Configure:
#    - Application name: AthenaSnowflakeConnector
#    - SpillBucket: Create or select an S3 bucket for large results
#    - AthenaCatalogName: snowflake (or your preferred name)
# 5. Click "Deploy"
```

**Important:** This is a **one-time setup per AWS account**. Once deployed, it can be used by all Snowflake connections.

### 2. AWS Glue Connection

**What is it?**
- Metadata about how to connect to Snowflake
- Stores the JDBC URL with secret reference
- Created automatically when you create a connection in the UI

**JDBC URL Format:**
```
jdbc:snowflake://account.snowflakecomputing.com/?warehouse=WH&db=DB&schema=SCHEMA&${secretName}
```

**The `${secretName}` syntax:**
- Special placeholder that tells the Athena connector to fetch credentials from Secrets Manager
- The connector replaces this with actual credentials at runtime
- Keeps credentials secure and never exposed in logs

### 3. AWS Secrets Manager

**What is it?**
- Secure storage for Snowflake credentials
- Encrypted at rest with AWS KMS
- Automatic rotation support (optional)

**Secret Format:**
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

**For Private Key Authentication:**
```json
{
  "account": "xy12345.us-east-1",
  "username": "ANALYTICS_USER",
  "privateKey": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----",
  "warehouse": "COMPUTE_WH",
  "database": "ANALYTICS_DB",
  "schema": "PUBLIC",
  "role": "ANALYST_ROLE",
  "authenticationType": "PRIVATE_KEY"
}
```

## Query Execution Flow

### Step 1: User Submits Query

```sql
SELECT * FROM "TPCH_SF1"."CUSTOMER" LIMIT 10;
```

**Important:** Use fully qualified table names with quotes:
- Format: `"SCHEMA"."TABLE"`
- Example: `"TPCH_SF1"."CUSTOMER"`
- Snowflake is case-sensitive when using quotes

### Step 2: Application Calls GraphQL API

```typescript
const response = await client.mutations.executeAthenaQuery({
  queryString: 'SELECT * FROM "TPCH_SF1"."CUSTOMER" LIMIT 10;',
  catalog: 'snowflake-snowflake-tpch-sf1', // Glue connection name
  database: 'SNOWFLAKE_SAMPLE_DATA',        // Snowflake database
});
```

### Step 3: Lambda Calls Athena

```typescript
await athena.send(new StartQueryExecutionCommand({
  QueryString: queryString,
  QueryExecutionContext: {
    Catalog: 'snowflake-snowflake-tpch-sf1', // Glue connection
    Database: 'SNOWFLAKE_SAMPLE_DATA',        // Snowflake database
  },
}));
```

### Step 4: Athena Invokes Connector

Athena:
1. Looks up the Glue connection by catalog name
2. Finds the associated Athena Snowflake Connector Lambda
3. Invokes the connector with the query

### Step 5: Connector Executes Query

The connector:
1. Reads the Glue connection details
2. Extracts the secret name from the JDBC URL
3. Fetches credentials from Secrets Manager
4. Connects to Snowflake using JDBC
5. Executes the query
6. Returns results to Athena

### Step 6: Results Return to User

Athena:
1. Receives results from connector
2. Stores results in S3 (managed by workgroup)
3. Returns results to Lambda
4. Lambda formats and returns to GraphQL API
5. UI displays results in table

## Query Syntax

### Correct Query Format

```sql
-- ✅ CORRECT: Fully qualified with quotes
SELECT * FROM "TPCH_SF1"."CUSTOMER" LIMIT 10;

-- ✅ CORRECT: With database prefix
SELECT * FROM "SNOWFLAKE_SAMPLE_DATA"."TPCH_SF1"."CUSTOMER" LIMIT 10;

-- ✅ CORRECT: Joins
SELECT 
  c."C_NAME",
  o."O_TOTALPRICE"
FROM "TPCH_SF1"."CUSTOMER" c
JOIN "TPCH_SF1"."ORDERS" o ON c."C_CUSTKEY" = o."O_CUSTKEY"
LIMIT 10;
```

### Common Mistakes

```sql
-- ❌ WRONG: Missing quotes (case-insensitive, may not find table)
SELECT * FROM TPCH_SF1.CUSTOMER LIMIT 10;

-- ❌ WRONG: Wrong schema name
SELECT * FROM "tpch_sf1"."CUSTOMER" LIMIT 10;
-- Error: SCHEMA_NOT_FOUND: Schema 'tpch_sf1' does not exist

-- ❌ WRONG: Missing schema
SELECT * FROM "CUSTOMER" LIMIT 10;
-- Error: Table not found

-- ❌ WRONG: Using catalog in query (catalog is set in context)
SELECT * FROM "snowflake-snowflake-tpch-sf1"."TPCH_SF1"."CUSTOMER" LIMIT 10;
```

## Troubleshooting

### Error: "SCHEMA_NOT_FOUND: Schema 'tpch_sf1' does not exist"

**Cause:** Schema name is case-sensitive when using quotes

**Solution:** Use the exact case from Snowflake:
```sql
-- Check schema names in Snowflake:
SHOW SCHEMAS IN DATABASE SNOWFLAKE_SAMPLE_DATA;

-- Use exact case:
SELECT * FROM "TPCH_SF1"."CUSTOMER" LIMIT 10;
```

### Error: "Queries of this type are not supported"

**Cause:** Using Snowflake-specific functions not supported by Athena connector

**Solution:** Use standard SQL functions:
```sql
-- ❌ WRONG: Snowflake-specific
SELECT CURRENT_VERSION();

-- ✅ CORRECT: Standard SQL
SELECT 1 as test_value;
```

### Error: "Catalog not found"

**Cause:** Athena Snowflake Connector not deployed or catalog name mismatch

**Solution:**
1. Deploy the Athena Snowflake Connector from AWS Serverless Application Repository
2. Verify the catalog name matches your Glue connection name
3. Check that the connector Lambda has permissions to read Secrets Manager

### Error: "Authentication failed"

**Cause:** Invalid credentials in Secrets Manager

**Solution:**
1. Verify credentials in Snowflake:
   ```sql
   -- Test login in Snowflake web UI
   ```
2. Check secret value in AWS Secrets Manager
3. Ensure username/password or private key is correct
4. For private key auth, ensure the public key is registered in Snowflake

### Query Works in Athena Console but Not in App

**Cause:** Different query execution context

**Solution:**
1. Check that catalog and database are set correctly in the app
2. Verify the Glue connection exists and is accessible
3. Check IAM permissions for the Lambda function
4. Review CloudWatch logs for detailed error messages

## Cost Considerations

### Athena Costs
- **Data Scanned**: $5 per TB scanned
- **Federated Queries**: Same pricing as regular Athena queries
- **Tip**: Use `LIMIT` clauses and `WHERE` filters to reduce data scanned

### Connector Lambda Costs
- **Invocations**: $0.20 per 1M requests
- **Duration**: $0.0000166667 per GB-second
- **Typical Cost**: < $1/month for moderate usage

### Secrets Manager Costs
- **Storage**: $0.40 per secret per month
- **API Calls**: $0.05 per 10,000 API calls
- **Typical Cost**: ~$0.50/month per connection

### Total Estimated Cost
- **Per Connection**: ~$1-2/month
- **Per Query**: ~$0.001-0.01 depending on data scanned

## Security Best Practices

1. **Use Private Key Authentication** for production
2. **Rotate credentials regularly** (Secrets Manager supports automatic rotation)
3. **Use least privilege IAM roles** for Lambda functions
4. **Enable CloudTrail** for audit logging
5. **Use VPC endpoints** for Secrets Manager (optional, for enhanced security)
6. **Restrict Snowflake network policies** to AWS IP ranges

## Monitoring

### CloudWatch Logs

**Lambda Logs:**
- `/aws/lambda/athena-query-{stack-name}`
- Shows query execution details and errors

**Connector Logs:**
- `/aws/lambda/AthenaSnowflakeConnector`
- Shows Snowflake connection and query execution

### Athena Query History

View in AWS Console:
1. Go to Amazon Athena
2. Click "Recent queries"
3. Filter by workgroup
4. View execution details, data scanned, and costs

### Secrets Manager Audit

View in CloudTrail:
1. Go to AWS CloudTrail
2. Filter by event name: `GetSecretValue`
3. Review who accessed credentials and when

## Next Steps

1. **Deploy Athena Snowflake Connector** (one-time setup)
2. **Create Snowflake connection** in the UI
3. **Test connection** to verify setup
4. **Execute queries** using the Query Interface or AI Agent
5. **Monitor costs** in AWS Cost Explorer

## Additional Resources

- [AWS Athena Federated Query](https://docs.aws.amazon.com/athena/latest/ug/connect-to-a-data-source.html)
- [Athena Snowflake Connector](https://github.com/awslabs/aws-athena-query-federation/tree/master/athena-snowflake)
- [Snowflake JDBC Driver](https://docs.snowflake.com/en/user-guide/jdbc.html)
- [AWS Secrets Manager](https://docs.aws.amazon.com/secretsmanager/)
- [AWS Glue Connections](https://docs.aws.amazon.com/glue/latest/dg/connection-defining.html)
