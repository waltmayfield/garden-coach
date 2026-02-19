/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createActionItem = /* GraphQL */ `mutation CreateActionItem(
  $condition: ModelActionItemConditionInput
  $input: CreateActionItemInput!
) {
  createActionItem(condition: $condition, input: $input) {
    action
    alertId
    createdAt
    description
    expectedValue
    id
    owner
    risk
    source
    status
    type
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateActionItemMutationVariables,
  APITypes.CreateActionItemMutation
>;
export const createChatMessage = /* GraphQL */ `mutation CreateChatMessage(
  $condition: ModelChatMessageConditionInput
  $input: CreateChatMessageInput!
) {
  createChatMessage(condition: $condition, input: $input) {
    chatSession {
      createdAt
      id
      mapBounds
      name
      owner
      updatedAt
      __typename
    }
    chatSessionId
    chatSessionIdUnderscoreAgentId
    createdAt
    id
    metadata
    owner
    parts
    responseComplete
    role
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateChatMessageMutationVariables,
  APITypes.CreateChatMessageMutation
>;
export const createChatSession = /* GraphQL */ `mutation CreateChatSession(
  $condition: ModelChatSessionConditionInput
  $input: CreateChatSessionInput!
) {
  createChatSession(condition: $condition, input: $input) {
    createdAt
    id
    mapBounds
    mapLayers {
      nextToken
      __typename
    }
    messages {
      nextToken
      __typename
    }
    name
    owner
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateChatSessionMutationVariables,
  APITypes.CreateChatSessionMutation
>;
export const createDataSourceConnection = /* GraphQL */ `mutation CreateDataSourceConnection(
  $condition: ModelDataSourceConnectionConditionInput
  $input: CreateDataSourceConnectionInput!
) {
  createDataSourceConnection(condition: $condition, input: $input) {
    catalogId
    catalogs {
      nextToken
      __typename
    }
    connectionMetadata
    createdAt
    createdBy
    description
    id
    lastQueryDate
    lastTestDate
    lastTestMessage
    lastTestStatus
    name
    owner
    queryCount
    queryHistory {
      nextToken
      __typename
    }
    secretArn
    status
    type
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateDataSourceConnectionMutationVariables,
  APITypes.CreateDataSourceConnectionMutation
>;
export const createDocument = /* GraphQL */ `mutation CreateDocument(
  $condition: ModelDocumentConditionInput
  $input: CreateDocumentInput!
) {
  createDocument(condition: $condition, input: $input) {
    chatSessionId
    contentType
    createdAt
    description
    errorMessage
    fileSize
    id
    metadata
    s3Bucket
    s3Key
    status
    title
    updatedAt
    uploadedAt
    uploadedBy
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateDocumentMutationVariables,
  APITypes.CreateDocumentMutation
>;
export const createFederatedCatalog = /* GraphQL */ `mutation CreateFederatedCatalog(
  $condition: ModelFederatedCatalogConditionInput
  $input: CreateFederatedCatalogInput!
) {
  createFederatedCatalog(condition: $condition, input: $input) {
    catalogArn
    catalogName
    connection {
      catalogId
      connectionMetadata
      createdAt
      createdBy
      description
      id
      lastQueryDate
      lastTestDate
      lastTestMessage
      lastTestStatus
      name
      owner
      queryCount
      secretArn
      status
      type
      updatedAt
      __typename
    }
    connectionId
    createdAt
    databaseCount
    databases
    id
    lastSyncDate
    owner
    tableCount
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateFederatedCatalogMutationVariables,
  APITypes.CreateFederatedCatalogMutation
>;
export const createFederatedQueryHistory = /* GraphQL */ `mutation CreateFederatedQueryHistory(
  $condition: ModelFederatedQueryHistoryConditionInput
  $input: CreateFederatedQueryHistoryInput!
) {
  createFederatedQueryHistory(condition: $condition, input: $input) {
    connection {
      catalogId
      connectionMetadata
      createdAt
      createdBy
      description
      id
      lastQueryDate
      lastTestDate
      lastTestMessage
      lastTestStatus
      name
      owner
      queryCount
      secretArn
      status
      type
      updatedAt
      __typename
    }
    connectionId
    createdAt
    dataScanedBytes
    database
    errorMessage
    estimatedCostUSD
    executedBy
    executionTimeMs
    id
    owner
    queryExecutionId
    queryString
    rowCount
    status
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateFederatedQueryHistoryMutationVariables,
  APITypes.CreateFederatedQueryHistoryMutation
>;
export const createMapLayer = /* GraphQL */ `mutation CreateMapLayer(
  $condition: ModelMapLayerConditionInput
  $input: CreateMapLayerInput!
) {
  createMapLayer(condition: $condition, input: $input) {
    athenaDatabase
    athenaQuery
    chatSession {
      createdAt
      id
      mapBounds
      name
      owner
      updatedAt
      __typename
    }
    chatSessionId
    createdAt
    description
    geoJsonMapping
    id
    lastQueryExecutedAt
    name
    order
    owner
    queryError
    queryRefreshInterval
    source
    style
    type
    updatedAt
    visible
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateMapLayerMutationVariables,
  APITypes.CreateMapLayerMutation
>;
export const createMcpServer = /* GraphQL */ `mutation CreateMcpServer(
  $condition: ModelMcpServerConditionInput
  $input: CreateMcpServerInput!
) {
  createMcpServer(condition: $condition, input: $input) {
    createdAt
    enabled
    headers {
      key
      value
      __typename
    }
    id
    name
    owner
    signRequestsWithAwsCreds
    tools {
      description
      name
      schema
      __typename
    }
    updatedAt
    url
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateMcpServerMutationVariables,
  APITypes.CreateMcpServerMutation
>;
export const createRetrievalResult = /* GraphQL */ `mutation CreateRetrievalResult(
  $condition: ModelRetrievalResultConditionInput
  $input: CreateRetrievalResultInput!
) {
  createRetrievalResult(condition: $condition, input: $input) {
    chatSessionId
    createdAt
    id
    messageId
    modelResponse
    query
    retrievedAt
    sources
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateRetrievalResultMutationVariables,
  APITypes.CreateRetrievalResultMutation
>;
export const createSettings = /* GraphQL */ `mutation CreateSettings(
  $condition: ModelSettingsConditionInput
  $input: CreateSettingsInput!
) {
  createSettings(condition: $condition, input: $input) {
    createdAt
    id
    name
    owner
    updatedAt
    value
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateSettingsMutationVariables,
  APITypes.CreateSettingsMutation
>;
export const createWorkoverJob = /* GraphQL */ `mutation CreateWorkoverJob(
  $condition: ModelWorkoverJobConditionInput
  $input: CreateWorkoverJobInput!
) {
  createWorkoverJob(condition: $condition, input: $input) {
    createdAt
    description
    estimatedCost
    estimatedDuration
    financialMetrics {
      incrementalGasMCFD
      incrementalOilBOPD
      paybackMonths
      presentValue
      rateOfReturn
      __typename
    }
    id
    jobType
    location
    owner
    priority
    rigAssigned
    scheduledDate
    status
    updatedAt
    wellName
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateWorkoverJobMutationVariables,
  APITypes.CreateWorkoverJobMutation
>;
export const deleteActionItem = /* GraphQL */ `mutation DeleteActionItem(
  $condition: ModelActionItemConditionInput
  $input: DeleteActionItemInput!
) {
  deleteActionItem(condition: $condition, input: $input) {
    action
    alertId
    createdAt
    description
    expectedValue
    id
    owner
    risk
    source
    status
    type
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteActionItemMutationVariables,
  APITypes.DeleteActionItemMutation
>;
export const deleteChatMessage = /* GraphQL */ `mutation DeleteChatMessage(
  $condition: ModelChatMessageConditionInput
  $input: DeleteChatMessageInput!
) {
  deleteChatMessage(condition: $condition, input: $input) {
    chatSession {
      createdAt
      id
      mapBounds
      name
      owner
      updatedAt
      __typename
    }
    chatSessionId
    chatSessionIdUnderscoreAgentId
    createdAt
    id
    metadata
    owner
    parts
    responseComplete
    role
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteChatMessageMutationVariables,
  APITypes.DeleteChatMessageMutation
>;
export const deleteChatSession = /* GraphQL */ `mutation DeleteChatSession(
  $condition: ModelChatSessionConditionInput
  $input: DeleteChatSessionInput!
) {
  deleteChatSession(condition: $condition, input: $input) {
    createdAt
    id
    mapBounds
    mapLayers {
      nextToken
      __typename
    }
    messages {
      nextToken
      __typename
    }
    name
    owner
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteChatSessionMutationVariables,
  APITypes.DeleteChatSessionMutation
>;
export const deleteDataSourceConnection = /* GraphQL */ `mutation DeleteDataSourceConnection(
  $condition: ModelDataSourceConnectionConditionInput
  $input: DeleteDataSourceConnectionInput!
) {
  deleteDataSourceConnection(condition: $condition, input: $input) {
    catalogId
    catalogs {
      nextToken
      __typename
    }
    connectionMetadata
    createdAt
    createdBy
    description
    id
    lastQueryDate
    lastTestDate
    lastTestMessage
    lastTestStatus
    name
    owner
    queryCount
    queryHistory {
      nextToken
      __typename
    }
    secretArn
    status
    type
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteDataSourceConnectionMutationVariables,
  APITypes.DeleteDataSourceConnectionMutation
>;
export const deleteDocument = /* GraphQL */ `mutation DeleteDocument(
  $condition: ModelDocumentConditionInput
  $input: DeleteDocumentInput!
) {
  deleteDocument(condition: $condition, input: $input) {
    chatSessionId
    contentType
    createdAt
    description
    errorMessage
    fileSize
    id
    metadata
    s3Bucket
    s3Key
    status
    title
    updatedAt
    uploadedAt
    uploadedBy
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteDocumentMutationVariables,
  APITypes.DeleteDocumentMutation
>;
export const deleteFederatedCatalog = /* GraphQL */ `mutation DeleteFederatedCatalog(
  $condition: ModelFederatedCatalogConditionInput
  $input: DeleteFederatedCatalogInput!
) {
  deleteFederatedCatalog(condition: $condition, input: $input) {
    catalogArn
    catalogName
    connection {
      catalogId
      connectionMetadata
      createdAt
      createdBy
      description
      id
      lastQueryDate
      lastTestDate
      lastTestMessage
      lastTestStatus
      name
      owner
      queryCount
      secretArn
      status
      type
      updatedAt
      __typename
    }
    connectionId
    createdAt
    databaseCount
    databases
    id
    lastSyncDate
    owner
    tableCount
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteFederatedCatalogMutationVariables,
  APITypes.DeleteFederatedCatalogMutation
>;
export const deleteFederatedQueryHistory = /* GraphQL */ `mutation DeleteFederatedQueryHistory(
  $condition: ModelFederatedQueryHistoryConditionInput
  $input: DeleteFederatedQueryHistoryInput!
) {
  deleteFederatedQueryHistory(condition: $condition, input: $input) {
    connection {
      catalogId
      connectionMetadata
      createdAt
      createdBy
      description
      id
      lastQueryDate
      lastTestDate
      lastTestMessage
      lastTestStatus
      name
      owner
      queryCount
      secretArn
      status
      type
      updatedAt
      __typename
    }
    connectionId
    createdAt
    dataScanedBytes
    database
    errorMessage
    estimatedCostUSD
    executedBy
    executionTimeMs
    id
    owner
    queryExecutionId
    queryString
    rowCount
    status
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteFederatedQueryHistoryMutationVariables,
  APITypes.DeleteFederatedQueryHistoryMutation
>;
export const deleteMapLayer = /* GraphQL */ `mutation DeleteMapLayer(
  $condition: ModelMapLayerConditionInput
  $input: DeleteMapLayerInput!
) {
  deleteMapLayer(condition: $condition, input: $input) {
    athenaDatabase
    athenaQuery
    chatSession {
      createdAt
      id
      mapBounds
      name
      owner
      updatedAt
      __typename
    }
    chatSessionId
    createdAt
    description
    geoJsonMapping
    id
    lastQueryExecutedAt
    name
    order
    owner
    queryError
    queryRefreshInterval
    source
    style
    type
    updatedAt
    visible
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteMapLayerMutationVariables,
  APITypes.DeleteMapLayerMutation
>;
export const deleteMcpServer = /* GraphQL */ `mutation DeleteMcpServer(
  $condition: ModelMcpServerConditionInput
  $input: DeleteMcpServerInput!
) {
  deleteMcpServer(condition: $condition, input: $input) {
    createdAt
    enabled
    headers {
      key
      value
      __typename
    }
    id
    name
    owner
    signRequestsWithAwsCreds
    tools {
      description
      name
      schema
      __typename
    }
    updatedAt
    url
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteMcpServerMutationVariables,
  APITypes.DeleteMcpServerMutation
>;
export const deleteRetrievalResult = /* GraphQL */ `mutation DeleteRetrievalResult(
  $condition: ModelRetrievalResultConditionInput
  $input: DeleteRetrievalResultInput!
) {
  deleteRetrievalResult(condition: $condition, input: $input) {
    chatSessionId
    createdAt
    id
    messageId
    modelResponse
    query
    retrievedAt
    sources
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteRetrievalResultMutationVariables,
  APITypes.DeleteRetrievalResultMutation
>;
export const deleteSettings = /* GraphQL */ `mutation DeleteSettings(
  $condition: ModelSettingsConditionInput
  $input: DeleteSettingsInput!
) {
  deleteSettings(condition: $condition, input: $input) {
    createdAt
    id
    name
    owner
    updatedAt
    value
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteSettingsMutationVariables,
  APITypes.DeleteSettingsMutation
>;
export const deleteWorkoverJob = /* GraphQL */ `mutation DeleteWorkoverJob(
  $condition: ModelWorkoverJobConditionInput
  $input: DeleteWorkoverJobInput!
) {
  deleteWorkoverJob(condition: $condition, input: $input) {
    createdAt
    description
    estimatedCost
    estimatedDuration
    financialMetrics {
      incrementalGasMCFD
      incrementalOilBOPD
      paybackMonths
      presentValue
      rateOfReturn
      __typename
    }
    id
    jobType
    location
    owner
    priority
    rigAssigned
    scheduledDate
    status
    updatedAt
    wellName
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteWorkoverJobMutationVariables,
  APITypes.DeleteWorkoverJobMutation
>;
export const executeAthenaQuery = /* GraphQL */ `mutation ExecuteAthenaQuery(
  $catalog: String
  $database: String
  $nextToken: String
  $outputLocation: String
  $queryExecutionId: String
  $queryString: String
) {
  executeAthenaQuery(
    catalog: $catalog
    database: $database
    nextToken: $nextToken
    outputLocation: $outputLocation
    queryExecutionId: $queryExecutionId
    queryString: $queryString
  ) {
    columns
    data
    error
    nextToken
    queryExecutionId
    rowCount
    status
    __typename
  }
}
` as GeneratedMutation<
  APITypes.ExecuteAthenaQueryMutationVariables,
  APITypes.ExecuteAthenaQueryMutation
>;
export const executeMapLayerQuery = /* GraphQL */ `mutation ExecuteMapLayerQuery(
  $database: String!
  $geoJsonMapping: AWSJSON!
  $layerId: String
  $queryString: String!
) {
  executeMapLayerQuery(
    database: $database
    geoJsonMapping: $geoJsonMapping
    layerId: $layerId
    queryString: $queryString
  ) {
    error
    geoJsonData
    rowCount
    success
    __typename
  }
}
` as GeneratedMutation<
  APITypes.ExecuteMapLayerQueryMutationVariables,
  APITypes.ExecuteMapLayerQueryMutation
>;
export const manageDataSourceConnection = /* GraphQL */ `mutation ManageDataSourceConnection($action: String!, $input: AWSJSON!) {
  manageDataSourceConnection(action: $action, input: $input) {
    catalogName
    error
    message
    secretArn
    success
    __typename
  }
}
` as GeneratedMutation<
  APITypes.ManageDataSourceConnectionMutationVariables,
  APITypes.ManageDataSourceConnectionMutation
>;
export const updateActionItem = /* GraphQL */ `mutation UpdateActionItem(
  $condition: ModelActionItemConditionInput
  $input: UpdateActionItemInput!
) {
  updateActionItem(condition: $condition, input: $input) {
    action
    alertId
    createdAt
    description
    expectedValue
    id
    owner
    risk
    source
    status
    type
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateActionItemMutationVariables,
  APITypes.UpdateActionItemMutation
>;
export const updateChatMessage = /* GraphQL */ `mutation UpdateChatMessage(
  $condition: ModelChatMessageConditionInput
  $input: UpdateChatMessageInput!
) {
  updateChatMessage(condition: $condition, input: $input) {
    chatSession {
      createdAt
      id
      mapBounds
      name
      owner
      updatedAt
      __typename
    }
    chatSessionId
    chatSessionIdUnderscoreAgentId
    createdAt
    id
    metadata
    owner
    parts
    responseComplete
    role
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateChatMessageMutationVariables,
  APITypes.UpdateChatMessageMutation
>;
export const updateChatSession = /* GraphQL */ `mutation UpdateChatSession(
  $condition: ModelChatSessionConditionInput
  $input: UpdateChatSessionInput!
) {
  updateChatSession(condition: $condition, input: $input) {
    createdAt
    id
    mapBounds
    mapLayers {
      nextToken
      __typename
    }
    messages {
      nextToken
      __typename
    }
    name
    owner
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateChatSessionMutationVariables,
  APITypes.UpdateChatSessionMutation
>;
export const updateDataSourceConnection = /* GraphQL */ `mutation UpdateDataSourceConnection(
  $condition: ModelDataSourceConnectionConditionInput
  $input: UpdateDataSourceConnectionInput!
) {
  updateDataSourceConnection(condition: $condition, input: $input) {
    catalogId
    catalogs {
      nextToken
      __typename
    }
    connectionMetadata
    createdAt
    createdBy
    description
    id
    lastQueryDate
    lastTestDate
    lastTestMessage
    lastTestStatus
    name
    owner
    queryCount
    queryHistory {
      nextToken
      __typename
    }
    secretArn
    status
    type
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateDataSourceConnectionMutationVariables,
  APITypes.UpdateDataSourceConnectionMutation
>;
export const updateDocument = /* GraphQL */ `mutation UpdateDocument(
  $condition: ModelDocumentConditionInput
  $input: UpdateDocumentInput!
) {
  updateDocument(condition: $condition, input: $input) {
    chatSessionId
    contentType
    createdAt
    description
    errorMessage
    fileSize
    id
    metadata
    s3Bucket
    s3Key
    status
    title
    updatedAt
    uploadedAt
    uploadedBy
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateDocumentMutationVariables,
  APITypes.UpdateDocumentMutation
>;
export const updateFederatedCatalog = /* GraphQL */ `mutation UpdateFederatedCatalog(
  $condition: ModelFederatedCatalogConditionInput
  $input: UpdateFederatedCatalogInput!
) {
  updateFederatedCatalog(condition: $condition, input: $input) {
    catalogArn
    catalogName
    connection {
      catalogId
      connectionMetadata
      createdAt
      createdBy
      description
      id
      lastQueryDate
      lastTestDate
      lastTestMessage
      lastTestStatus
      name
      owner
      queryCount
      secretArn
      status
      type
      updatedAt
      __typename
    }
    connectionId
    createdAt
    databaseCount
    databases
    id
    lastSyncDate
    owner
    tableCount
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateFederatedCatalogMutationVariables,
  APITypes.UpdateFederatedCatalogMutation
>;
export const updateFederatedQueryHistory = /* GraphQL */ `mutation UpdateFederatedQueryHistory(
  $condition: ModelFederatedQueryHistoryConditionInput
  $input: UpdateFederatedQueryHistoryInput!
) {
  updateFederatedQueryHistory(condition: $condition, input: $input) {
    connection {
      catalogId
      connectionMetadata
      createdAt
      createdBy
      description
      id
      lastQueryDate
      lastTestDate
      lastTestMessage
      lastTestStatus
      name
      owner
      queryCount
      secretArn
      status
      type
      updatedAt
      __typename
    }
    connectionId
    createdAt
    dataScanedBytes
    database
    errorMessage
    estimatedCostUSD
    executedBy
    executionTimeMs
    id
    owner
    queryExecutionId
    queryString
    rowCount
    status
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateFederatedQueryHistoryMutationVariables,
  APITypes.UpdateFederatedQueryHistoryMutation
>;
export const updateMapLayer = /* GraphQL */ `mutation UpdateMapLayer(
  $condition: ModelMapLayerConditionInput
  $input: UpdateMapLayerInput!
) {
  updateMapLayer(condition: $condition, input: $input) {
    athenaDatabase
    athenaQuery
    chatSession {
      createdAt
      id
      mapBounds
      name
      owner
      updatedAt
      __typename
    }
    chatSessionId
    createdAt
    description
    geoJsonMapping
    id
    lastQueryExecutedAt
    name
    order
    owner
    queryError
    queryRefreshInterval
    source
    style
    type
    updatedAt
    visible
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateMapLayerMutationVariables,
  APITypes.UpdateMapLayerMutation
>;
export const updateMcpServer = /* GraphQL */ `mutation UpdateMcpServer(
  $condition: ModelMcpServerConditionInput
  $input: UpdateMcpServerInput!
) {
  updateMcpServer(condition: $condition, input: $input) {
    createdAt
    enabled
    headers {
      key
      value
      __typename
    }
    id
    name
    owner
    signRequestsWithAwsCreds
    tools {
      description
      name
      schema
      __typename
    }
    updatedAt
    url
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateMcpServerMutationVariables,
  APITypes.UpdateMcpServerMutation
>;
export const updateRetrievalResult = /* GraphQL */ `mutation UpdateRetrievalResult(
  $condition: ModelRetrievalResultConditionInput
  $input: UpdateRetrievalResultInput!
) {
  updateRetrievalResult(condition: $condition, input: $input) {
    chatSessionId
    createdAt
    id
    messageId
    modelResponse
    query
    retrievedAt
    sources
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateRetrievalResultMutationVariables,
  APITypes.UpdateRetrievalResultMutation
>;
export const updateSettings = /* GraphQL */ `mutation UpdateSettings(
  $condition: ModelSettingsConditionInput
  $input: UpdateSettingsInput!
) {
  updateSettings(condition: $condition, input: $input) {
    createdAt
    id
    name
    owner
    updatedAt
    value
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateSettingsMutationVariables,
  APITypes.UpdateSettingsMutation
>;
export const updateWorkoverJob = /* GraphQL */ `mutation UpdateWorkoverJob(
  $condition: ModelWorkoverJobConditionInput
  $input: UpdateWorkoverJobInput!
) {
  updateWorkoverJob(condition: $condition, input: $input) {
    createdAt
    description
    estimatedCost
    estimatedDuration
    financialMetrics {
      incrementalGasMCFD
      incrementalOilBOPD
      paybackMonths
      presentValue
      rateOfReturn
      __typename
    }
    id
    jobType
    location
    owner
    priority
    rigAssigned
    scheduledDate
    status
    updatedAt
    wellName
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateWorkoverJobMutationVariables,
  APITypes.UpdateWorkoverJobMutation
>;
