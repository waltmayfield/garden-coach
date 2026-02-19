# Data Sources User Guide

Complete guide for managing external data source connections in the Digital Operations Agent.

## Overview

The Data Sources feature allows you to securely connect to external data sources like Snowflake, Databricks, and other databases. Once connected, you can:

- Query data using SQL
- Visualize results in the AI chat interface
- Allow the AI agent to access your data
- Track query history and costs

## Supported Data Sources

### Currently Supported
- **Snowflake**: Cloud data warehouse

### Coming Soon
- **Databricks**: Unified analytics platform
- **PostgreSQL**: Open-source relational database
- **MySQL**: Popular relational database
- **Amazon Redshift**: AWS data warehouse

## Getting Started

### Prerequisites

1. **AWS Account**: Deployed Digital Operations Agent
2. **Data Source Credentials**: Access to your external data source
3. **Permissions**: Admin access to create connections

### Accessing Data Sources

1. Sign in to the application
2. Click "Data Sources" in the navigation menu
3. You'll see a list of all configured connections

## Managing Connections

### Creating a Connection

#### Snowflake Connection

1. Click "Add Connection" button
2. Select "Snowflake" as the connection type
3. Fill in the required fields:

**Basic Information**
- **Connection Name**: Unique identifier (e.g., "Production Snowflake")
- **Description**: Optional description of the connection

**Snowflake Configuration**
- **Account Identifier**: Your Snowflake account (format: `account.region`)
  - Example: `xy12345.us-east-1`
  - Find in Snowflake console under Account → Account Identifier
- **Username**: Your Snowflake username
- **Password**: Your Snowflake password
- **Database**: Default database to connect to
- **Schema**: Default schema within the database

**Optional Settings**
- **Warehouse**: Snowflake warehouse name (uses default if not specified)
- **Role**: Snowflake role to use (uses default if not specified)

4. Click "Create Connection"
5. Wait for confirmation message

### Testing a Connection

After creating a connection, you should test it:

1. Find the connection in the list
2. Click the "Test" button
3. Wait for the test to complete
4. Check the status indicator:
   - 🟢 **Active**: Test successful
   - 🔴 **Failed**: Test failed (check details)

**What happens during a test:**
- Retrieves credentials from secure storage
- Executes a simple query: `SELECT 1`
- Verifies connectivity and permissions
- Updates connection status

### Viewing Connection Details

1. Click "Details" button on any connection
2. View comprehensive information:

**Metadata**
- Connection name and description
- Connection type (Snowflake, etc.)
- Current status
- Creation and last update timestamps

**Configuration**
- Account identifier
- Database and schema
- Warehouse and role (if specified)

**AWS Resources**
- Glue connection name
- Secrets Manager ARN
- Last test result and timestamp

### Querying Data

1. Click "Query" button on an active connection
2. Enter your SQL query in the editor
3. Click "Run Query"
4. View results in the table
5. Export results as CSV (optional)

**Query Editor Features**
- Syntax highlighting
- Multi-line queries
- Query history
- Result pagination
- CSV export

**Example Queries**

```sql
-- List all tables
SHOW TABLES;

-- Query specific table
SELECT * FROM sales_data 
WHERE date >= '2024-01-01' 
LIMIT 100;

-- Aggregate data
SELECT 
  region,
  SUM(revenue) as total_revenue,
  COUNT(*) as transaction_count
FROM sales_data
GROUP BY region
ORDER BY total_revenue DESC;

-- Join tables
SELECT 
  c.customer_name,
  o.order_date,
  o.total_amount
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
WHERE o.order_date >= CURRENT_DATE - 30;
```

### Deleting a Connection

1. Click "Delete" button on the connection
2. Confirm the deletion in the dialog
3. The system will:
   - Remove the Glue connection
   - Delete credentials from Secrets Manager
   - Remove the database record

**Warning**: This action cannot be undone. Any queries or visualizations using this connection will stop working.

## Connection Status

### Status Indicators

- 🟢 **Active**: Connection tested and working
- 🟡 **Pending**: Created but not yet tested
- 🔴 **Failed**: Last test failed
- ⚪ **Inactive**: Connection disabled

### Status Transitions

```
Created → Pending
Pending → Active (test succeeds)
Pending → Failed (test fails)
Active → Failed (test fails)
Failed → Active (test succeeds)
Any → Inactive (manually disabled)
```

## Security

### Credential Storage

- **Encryption**: All credentials encrypted at rest in AWS Secrets Manager
- **Access Control**: Only authorized Lambda functions can access secrets
- **Rotation**: Supports automatic credential rotation (configure in Secrets Manager)
- **Audit**: All access logged in CloudTrail

### Network Security

- **TLS**: All connections use TLS encryption
- **IP Allowlisting**: Configure in your data source (Snowflake, etc.)
- **VPC**: Can be configured to use VPC endpoints (advanced)

### IAM Permissions

The system uses least-privilege IAM roles:
- Lambda can only access secrets with prefix `datasource/*`
- Glue access limited to specific catalog operations
- Athena access scoped to specific workgroup

### Authentication

- **User Authentication**: Cognito authentication required
- **Authorization**: Admin role required to create/delete connections
- **Query Execution**: All users can query active connections

## Query History

All queries are tracked in the FederatedQueryHistory table:

**Tracked Information**
- Query text
- Execution time
- Data scanned
- Estimated cost
- User who executed the query
- Timestamp

**Viewing History**
1. Go to Data Sources page
2. Click "Query History" tab
3. Filter by connection, user, or date range

## Cost Management

### Understanding Costs

**AWS Costs**
- **Secrets Manager**: $0.40/secret/month
- **Glue Data Catalog**: First 1M objects free
- **Athena**: $5 per TB scanned
- **DynamoDB**: Pay per request

**Data Source Costs**
- **Snowflake**: Warehouse compute + storage
- **Databricks**: DBU consumption
- **Others**: Varies by provider

### Cost Optimization Tips

1. **Use Partitions**: Query only necessary data
2. **Limit Results**: Use LIMIT clause in queries
3. **Cache Results**: Reuse query results when possible
4. **Monitor Usage**: Review query history regularly
5. **Optimize Queries**: Use WHERE clauses to filter data

## Troubleshooting

### Connection Test Fails

**Error**: "Failed to connect to Snowflake"

**Possible Causes**:
1. Incorrect credentials
2. Network connectivity issues
3. Snowflake warehouse not running
4. IP not allowlisted

**Solutions**:
1. Verify credentials in Snowflake console
2. Check Snowflake warehouse status
3. Add Lambda IP to Snowflake allowlist
4. Check CloudWatch logs for detailed errors

### Query Execution Fails

**Error**: "Query execution failed"

**Possible Causes**:
1. Invalid SQL syntax
2. Table doesn't exist
3. Insufficient permissions
4. Query timeout

**Solutions**:
1. Verify SQL syntax
2. Check table name and schema
3. Verify user permissions in data source
4. Simplify query or add filters

### Connection Not Appearing

**Error**: Connection created but not visible

**Possible Causes**:
1. GraphQL subscription issue
2. DynamoDB write failed
3. Browser cache

**Solutions**:
1. Refresh the page
2. Check browser console for errors
3. Verify DynamoDB record exists
4. Check Lambda logs

### Slow Query Performance

**Issue**: Queries taking too long

**Possible Causes**:
1. Large dataset
2. Missing indexes
3. Complex joins
4. Network latency

**Solutions**:
1. Add WHERE clauses to filter data
2. Use LIMIT to reduce result size
3. Optimize query structure
4. Consider creating materialized views

## Best Practices

### Connection Management

1. **Naming**: Use descriptive names (e.g., "Production Snowflake - Sales DB")
2. **Testing**: Always test connections after creation
3. **Documentation**: Add descriptions to explain connection purpose
4. **Monitoring**: Regularly check connection status
5. **Cleanup**: Delete unused connections

### Query Writing

1. **Use LIMIT**: Always limit results during development
2. **Filter Early**: Use WHERE clauses to reduce data scanned
3. **Avoid SELECT ***: Specify only needed columns
4. **Use Partitions**: Query partitioned data when available
5. **Test Small**: Test queries on small datasets first

### Security

1. **Rotate Credentials**: Regularly update passwords
2. **Least Privilege**: Use service accounts with minimal permissions
3. **Monitor Access**: Review query history regularly
4. **Audit Logs**: Enable CloudTrail logging
5. **IP Allowlisting**: Restrict access by IP when possible

## Advanced Features

### Custom Athena Workgroups

Configure custom Athena workgroups for:
- Query result encryption
- Cost allocation tags
- Query result retention
- Per-query data limits

### VPC Configuration

For enhanced security:
1. Deploy Lambda in VPC
2. Use VPC endpoints for AWS services
3. Configure security groups
4. Use private subnets

### Credential Rotation

Enable automatic credential rotation:
1. Configure rotation in Secrets Manager
2. Update connection configuration
3. Test connection after rotation

## API Reference

### GraphQL Mutations

```graphql
# Create connection
mutation CreateConnection {
  manageDataSourceConnection(input: {
    action: "createConnection"
    connectionName: "My Snowflake"
    connectionType: "snowflake"
    configuration: {
      account: "xy12345.us-east-1"
      username: "myuser"
      password: "mypassword"
      database: "mydb"
      schema: "myschema"
    }
  }) {
    success
    message
    connectionId
  }
}

# Test connection
mutation TestConnection {
  manageDataSourceConnection(input: {
    action: "testConnection"
    connectionId: "conn-123"
  }) {
    success
    message
    testResult
  }
}

# Delete connection
mutation DeleteConnection {
  manageDataSourceConnection(input: {
    action: "deleteConnection"
    connectionId: "conn-123"
  }) {
    success
    message
  }
}
```

### GraphQL Queries

```graphql
# List connections
query ListConnections {
  listDataSourceConnections {
    items {
      id
      name
      type
      status
      createdAt
      updatedAt
    }
  }
}

# Get connection details
query GetConnection {
  getDataSourceConnection(id: "conn-123") {
    id
    name
    type
    status
    configuration
    glueConnectionName
    secretArn
    lastTestResult
    lastTestTimestamp
  }
}
```

## Related Documentation

- [Snowflake Connection Guide](./SNOWFLAKE_CONNECTION_GUIDE.md)
- [Athena Integration](./ATHENA_INTEGRATION.md)
- [Quick Start Guide](./DATASOURCES_QUICK_START.md)

## Support

For additional help:
1. Check CloudWatch logs
2. Review Athena query history
3. Verify Glue connection configuration
4. Contact your administrator
