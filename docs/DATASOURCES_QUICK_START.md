# Data Sources Quick Start Guide

This guide walks you through testing the Snowflake connection management system.

## Prerequisites

1. **Snowflake Account**: You need access to a Snowflake account with:
   - Account identifier (e.g., `xy12345.us-east-1`)
   - Username and password
   - Database and schema you want to query

2. **AWS Resources**: The backend deployment creates:
   - Lambda function for connection management
   - Secrets Manager for credential storage
   - Glue Data Catalog for connection metadata
   - DynamoDB tables for connection tracking

## Testing the Complete Flow

### 1. Navigate to Data Sources Page

1. Start your development server: `npm run dev`
2. Open your browser to `http://localhost:3000`
3. Sign in with your Cognito credentials
4. Click "Data Sources" in the navigation menu

### 2. Create a Snowflake Connection

1. Click the "Add Connection" button
2. Fill in the connection form:
   - **Connection Name**: Give it a descriptive name (e.g., "Production Snowflake")
   - **Description**: Optional description
   - **Account Identifier**: Your Snowflake account (e.g., `xy12345.us-east-1`)
   - **Username**: Your Snowflake username
   - **Password**: Your Snowflake password
   - **Database**: Default database to connect to
   - **Schema**: Default schema to use
   - **Warehouse**: Snowflake warehouse name (optional)
   - **Role**: Snowflake role (optional)

3. Click "Create Connection"
4. Wait for the connection to be created (status will show "pending")

### 3. Test the Connection

1. Find your connection in the list
2. Click the "Test" button
3. The system will:
   - Retrieve credentials from Secrets Manager
   - Execute a test query via Athena
   - Update the connection status

4. Status indicators:
   - 🟢 **Active**: Connection tested successfully
   - 🟡 **Pending**: Connection created but not tested
   - 🔴 **Failed**: Connection test failed
   - ⚪ **Inactive**: Connection disabled

### 4. View Connection Details

1. Click the "Details" button on any connection
2. View:
   - Connection metadata (name, type, status)
   - Snowflake configuration (account, database, schema)
   - Glue connection name
   - Secrets Manager ARN
   - Creation and update timestamps
   - Last test result and timestamp

### 5. Query the Data Source

1. Click the "Query" button on an active connection
2. Enter your SQL query in the editor
3. Click "Run Query"
4. View results in the table below
5. Export results as CSV if needed

### 6. Delete a Connection

1. Click the "Delete" button on any connection
2. Confirm the deletion
3. The system will:
   - Delete the Glue connection
   - Delete the secret from Secrets Manager
   - Remove the DynamoDB record

## Example Snowflake Queries

Once connected, try these queries:

```sql
-- List all tables in the current schema
SHOW TABLES;

-- Query a specific table
SELECT * FROM your_table_name LIMIT 10;

-- Get table metadata
SELECT 
  table_catalog,
  table_schema,
  table_name,
  table_type
FROM information_schema.tables
WHERE table_schema = 'YOUR_SCHEMA'
LIMIT 10;

-- Count rows in a table
SELECT COUNT(*) as row_count FROM your_table_name;
```

## Troubleshooting

### Connection Test Fails

**Symptom**: Status shows "failed" after testing

**Possible Causes**:
1. Incorrect credentials
2. Network connectivity issues
3. Snowflake warehouse not running
4. Insufficient permissions

**Solutions**:
- Verify credentials in Snowflake console
- Check Snowflake warehouse is running
- Verify user has necessary permissions
- Check CloudWatch logs for detailed error messages

### Query Execution Fails

**Symptom**: Query returns an error

**Possible Causes**:
1. Invalid SQL syntax
2. Table/schema doesn't exist
3. Insufficient permissions
4. Athena query timeout

**Solutions**:
- Verify SQL syntax
- Check table/schema names
- Verify user permissions in Snowflake
- Check Athena query execution logs

### Connection Not Appearing

**Symptom**: Created connection doesn't show in list

**Possible Causes**:
1. GraphQL subscription not connected
2. DynamoDB write failed
3. Browser cache issue

**Solutions**:
- Refresh the page
- Check browser console for errors
- Verify DynamoDB table has the record
- Check CloudWatch logs for Lambda errors

## Architecture Overview

```
User Interface (React)
    ↓
GraphQL API (Amplify)
    ↓
Lambda Function (datasource-manager)
    ↓
├── Secrets Manager (credentials)
├── Glue Data Catalog (connection metadata)
└── Athena (query execution)
    ↓
Snowflake (external data source)
```

## Security Notes

1. **Credentials**: Stored encrypted in AWS Secrets Manager
2. **IAM Permissions**: Lambda has least-privilege access
3. **Network**: Connections use Snowflake's public endpoints
4. **Audit Trail**: All queries logged in FederatedQueryHistory table
5. **Authentication**: Requires Cognito authentication

## Cost Considerations

1. **Secrets Manager**: $0.40/secret/month + $0.05 per 10,000 API calls
2. **Glue Data Catalog**: First million objects free, then $1 per 100,000 objects
3. **Athena**: $5 per TB of data scanned
4. **DynamoDB**: On-demand pricing (pay per request)
5. **Snowflake**: Charges based on warehouse usage and data scanned

## Next Steps

1. **Add More Data Sources**: Extend to support Databricks, PostgreSQL, MySQL
2. **Query History**: View past queries and results
3. **Scheduled Queries**: Set up recurring queries
4. **Data Catalog**: Browse available tables and schemas
5. **Agent Integration**: Allow AI agent to query data sources

## Related Documentation

- [Snowflake Connection Guide](./SNOWFLAKE_CONNECTION_GUIDE.md) - Detailed architecture
- [Data Sources User Guide](./DATA_SOURCES_USER_GUIDE.md) - Complete user documentation
- [Athena Integration](./ATHENA_INTEGRATION.md) - Athena query execution details

## Support

For issues or questions:
1. Check CloudWatch logs for Lambda function
2. Review Athena query execution history
3. Verify Glue connection configuration
4. Check Secrets Manager for credential issues
