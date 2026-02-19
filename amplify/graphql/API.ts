/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type ActionItem = {
  __typename: "ActionItem",
  action: string,
  alertId: string,
  createdAt: string,
  description: string,
  expectedValue?: string | null,
  id: string,
  owner?: string | null,
  risk?: string | null,
  source: string,
  status: ActionItemStatus,
  type: ActionItemType,
  updatedAt: string,
};

export enum ActionItemStatus {
  approved = "approved",
  deferred = "deferred",
  pending = "pending",
  rejected = "rejected",
}


export enum ActionItemType {
  immediate = "immediate",
  preventive = "preventive",
  scheduled = "scheduled",
}


export type ChatMessage = {
  __typename: "ChatMessage",
  chatSession?: ChatSession | null,
  chatSessionId?: string | null,
  chatSessionIdUnderscoreAgentId?: string | null,
  createdAt?: string | null,
  id: string,
  metadata?: string | null,
  owner?: string | null,
  parts: string,
  responseComplete?: boolean | null,
  role: Roles,
  updatedAt: string,
};

export type ChatSession = {
  __typename: "ChatSession",
  createdAt: string,
  id: string,
  mapBounds?: string | null,
  mapLayers?: ModelMapLayerConnection | null,
  messages?: ModelChatMessageConnection | null,
  name?: string | null,
  owner?: string | null,
  updatedAt: string,
};

export type ModelMapLayerConnection = {
  __typename: "ModelMapLayerConnection",
  items:  Array<MapLayer | null >,
  nextToken?: string | null,
};

export type MapLayer = {
  __typename: "MapLayer",
  athenaDatabase: string,
  athenaQuery: string,
  chatSession?: ChatSession | null,
  chatSessionId: string,
  createdAt?: string | null,
  description?: string | null,
  geoJsonMapping: string,
  id: string,
  lastQueryExecutedAt?: string | null,
  name: string,
  order?: number | null,
  owner?: string | null,
  queryError?: string | null,
  queryRefreshInterval?: number | null,
  source?: string | null,
  style?: string | null,
  type: MapLayerType,
  updatedAt?: string | null,
  visible?: boolean | null,
};

export enum MapLayerType {
  geojson = "geojson",
  heatmap = "heatmap",
  line = "line",
  point = "point",
  polygon = "polygon",
}


export type ModelChatMessageConnection = {
  __typename: "ModelChatMessageConnection",
  items:  Array<ChatMessage | null >,
  nextToken?: string | null,
};

export enum Roles {
  assistant = "assistant",
  system = "system",
  user = "user",
}


export type DataSourceConnection = {
  __typename: "DataSourceConnection",
  catalogId?: string | null,
  catalogs?: ModelFederatedCatalogConnection | null,
  connectionMetadata: string,
  createdAt: string,
  createdBy?: string | null,
  description?: string | null,
  id: string,
  lastQueryDate?: string | null,
  lastTestDate?: string | null,
  lastTestMessage?: string | null,
  lastTestStatus?: string | null,
  name: string,
  owner?: string | null,
  queryCount?: number | null,
  queryHistory?: ModelFederatedQueryHistoryConnection | null,
  secretArn: string,
  status: DataSourceStatus,
  type: DataSourceType,
  updatedAt: string,
};

export type ModelFederatedCatalogConnection = {
  __typename: "ModelFederatedCatalogConnection",
  items:  Array<FederatedCatalog | null >,
  nextToken?: string | null,
};

export type FederatedCatalog = {
  __typename: "FederatedCatalog",
  catalogArn?: string | null,
  catalogName: string,
  connection?: DataSourceConnection | null,
  connectionId: string,
  createdAt: string,
  databaseCount?: number | null,
  databases?: string | null,
  id: string,
  lastSyncDate?: string | null,
  owner?: string | null,
  tableCount?: number | null,
  updatedAt: string,
};

export type ModelFederatedQueryHistoryConnection = {
  __typename: "ModelFederatedQueryHistoryConnection",
  items:  Array<FederatedQueryHistory | null >,
  nextToken?: string | null,
};

export type FederatedQueryHistory = {
  __typename: "FederatedQueryHistory",
  connection?: DataSourceConnection | null,
  connectionId: string,
  createdAt: string,
  dataScanedBytes?: number | null,
  database?: string | null,
  errorMessage?: string | null,
  estimatedCostUSD?: number | null,
  executedBy?: string | null,
  executionTimeMs?: number | null,
  id: string,
  owner?: string | null,
  queryExecutionId?: string | null,
  queryString: string,
  rowCount?: number | null,
  status: string,
  updatedAt: string,
};

export enum DataSourceStatus {
  ACTIVE = "ACTIVE",
  CREATING = "CREATING",
  FAILED = "FAILED",
  INACTIVE = "INACTIVE",
  TESTING = "TESTING",
}


export enum DataSourceType {
  DATABRICKS = "DATABRICKS",
  DYNAMODB = "DYNAMODB",
  MYSQL = "MYSQL",
  POSTGRESQL = "POSTGRESQL",
  REDSHIFT = "REDSHIFT",
  SNOWFLAKE = "SNOWFLAKE",
}


export type Document = {
  __typename: "Document",
  chatSessionId?: string | null,
  contentType: string,
  createdAt: string,
  description?: string | null,
  errorMessage?: string | null,
  fileSize?: number | null,
  id: string,
  metadata?: string | null,
  s3Bucket: string,
  s3Key: string,
  status?: DocumentStatus | null,
  title: string,
  updatedAt: string,
  uploadedAt: string,
  uploadedBy: string,
};

export enum DocumentStatus {
  FAILED = "FAILED",
  INDEXED = "INDEXED",
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
}


export type McpServer = {
  __typename: "McpServer",
  createdAt: string,
  enabled?: boolean | null,
  headers?:  Array<HeaderEntry | null > | null,
  id: string,
  name: string,
  owner?: string | null,
  signRequestsWithAwsCreds?: boolean | null,
  tools?:  Array<Tool | null > | null,
  updatedAt: string,
  url?: string | null,
};

export type HeaderEntry = {
  __typename: "HeaderEntry",
  key?: string | null,
  value?: string | null,
};

export type Tool = {
  __typename: "Tool",
  description?: string | null,
  name?: string | null,
  schema?: string | null,
};

export type RetrievalResult = {
  __typename: "RetrievalResult",
  chatSessionId: string,
  createdAt: string,
  id: string,
  messageId: string,
  modelResponse?: string | null,
  query: string,
  retrievedAt: string,
  sources: string,
  updatedAt: string,
};

export type Settings = {
  __typename: "Settings",
  createdAt: string,
  id: string,
  name?: string | null,
  owner?: string | null,
  updatedAt: string,
  value?: string | null,
};

export type WorkoverJob = {
  __typename: "WorkoverJob",
  createdAt: string,
  description: string,
  estimatedCost: string,
  estimatedDuration: string,
  financialMetrics: FinancialMetrics,
  id: string,
  jobType: WorkoverJobType,
  location: string,
  owner?: string | null,
  priority: WorkoverJobPriority,
  rigAssigned?: string | null,
  scheduledDate: string,
  status: WorkoverJobStatus,
  updatedAt: string,
  wellName: string,
};

export type FinancialMetrics = {
  __typename: "FinancialMetrics",
  incrementalGasMCFD?: number | null,
  incrementalOilBOPD?: number | null,
  paybackMonths: number,
  presentValue: number,
  rateOfReturn: number,
};

export enum WorkoverJobType {
  completion = "completion",
  maintenance = "maintenance",
  workover = "workover",
}


export enum WorkoverJobPriority {
  high = "high",
  low = "low",
  medium = "medium",
}


export enum WorkoverJobStatus {
  completed = "completed",
  delayed = "delayed",
  inProgress = "inProgress",
  queued = "queued",
}


export type ModelActionItemFilterInput = {
  action?: ModelStringInput | null,
  alertId?: ModelStringInput | null,
  and?: Array< ModelActionItemFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  description?: ModelStringInput | null,
  expectedValue?: ModelStringInput | null,
  id?: ModelIDInput | null,
  not?: ModelActionItemFilterInput | null,
  or?: Array< ModelActionItemFilterInput | null > | null,
  owner?: ModelStringInput | null,
  risk?: ModelStringInput | null,
  source?: ModelStringInput | null,
  status?: ModelActionItemStatusInput | null,
  type?: ModelActionItemTypeInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelStringInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  _null = "_null",
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
}


export type ModelSizeInput = {
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
};

export type ModelIDInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  size?: ModelSizeInput | null,
};

export type ModelActionItemStatusInput = {
  eq?: ActionItemStatus | null,
  ne?: ActionItemStatus | null,
};

export type ModelActionItemTypeInput = {
  eq?: ActionItemType | null,
  ne?: ActionItemType | null,
};

export type ModelActionItemConnection = {
  __typename: "ModelActionItemConnection",
  items:  Array<ActionItem | null >,
  nextToken?: string | null,
};

export type ModelStringKeyConditionInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
};

export type ModelChatMessageFilterInput = {
  and?: Array< ModelChatMessageFilterInput | null > | null,
  chatSessionId?: ModelIDInput | null,
  chatSessionIdUnderscoreAgentId?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  metadata?: ModelStringInput | null,
  not?: ModelChatMessageFilterInput | null,
  or?: Array< ModelChatMessageFilterInput | null > | null,
  owner?: ModelStringInput | null,
  parts?: ModelStringInput | null,
  responseComplete?: ModelBooleanInput | null,
  role?: ModelRolesInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelBooleanInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  eq?: boolean | null,
  ne?: boolean | null,
};

export type ModelRolesInput = {
  eq?: Roles | null,
  ne?: Roles | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelChatSessionFilterInput = {
  and?: Array< ModelChatSessionFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  mapBounds?: ModelStringInput | null,
  name?: ModelStringInput | null,
  not?: ModelChatSessionFilterInput | null,
  or?: Array< ModelChatSessionFilterInput | null > | null,
  owner?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelChatSessionConnection = {
  __typename: "ModelChatSessionConnection",
  items:  Array<ChatSession | null >,
  nextToken?: string | null,
};

export type ModelDataSourceConnectionFilterInput = {
  and?: Array< ModelDataSourceConnectionFilterInput | null > | null,
  catalogId?: ModelStringInput | null,
  connectionMetadata?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  createdBy?: ModelStringInput | null,
  description?: ModelStringInput | null,
  id?: ModelIDInput | null,
  lastQueryDate?: ModelStringInput | null,
  lastTestDate?: ModelStringInput | null,
  lastTestMessage?: ModelStringInput | null,
  lastTestStatus?: ModelStringInput | null,
  name?: ModelStringInput | null,
  not?: ModelDataSourceConnectionFilterInput | null,
  or?: Array< ModelDataSourceConnectionFilterInput | null > | null,
  owner?: ModelStringInput | null,
  queryCount?: ModelIntInput | null,
  secretArn?: ModelStringInput | null,
  status?: ModelDataSourceStatusInput | null,
  type?: ModelDataSourceTypeInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelIntInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
};

export type ModelDataSourceStatusInput = {
  eq?: DataSourceStatus | null,
  ne?: DataSourceStatus | null,
};

export type ModelDataSourceTypeInput = {
  eq?: DataSourceType | null,
  ne?: DataSourceType | null,
};

export type ModelDataSourceConnectionConnection = {
  __typename: "ModelDataSourceConnectionConnection",
  items:  Array<DataSourceConnection | null >,
  nextToken?: string | null,
};

export type ModelDocumentFilterInput = {
  and?: Array< ModelDocumentFilterInput | null > | null,
  chatSessionId?: ModelIDInput | null,
  contentType?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  description?: ModelStringInput | null,
  errorMessage?: ModelStringInput | null,
  fileSize?: ModelIntInput | null,
  id?: ModelIDInput | null,
  metadata?: ModelStringInput | null,
  not?: ModelDocumentFilterInput | null,
  or?: Array< ModelDocumentFilterInput | null > | null,
  s3Bucket?: ModelStringInput | null,
  s3Key?: ModelStringInput | null,
  status?: ModelDocumentStatusInput | null,
  title?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  uploadedAt?: ModelStringInput | null,
  uploadedBy?: ModelStringInput | null,
};

export type ModelDocumentStatusInput = {
  eq?: DocumentStatus | null,
  ne?: DocumentStatus | null,
};

export type ModelDocumentConnection = {
  __typename: "ModelDocumentConnection",
  items:  Array<Document | null >,
  nextToken?: string | null,
};

export type ModelFederatedCatalogFilterInput = {
  and?: Array< ModelFederatedCatalogFilterInput | null > | null,
  catalogArn?: ModelStringInput | null,
  catalogName?: ModelStringInput | null,
  connectionId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  databaseCount?: ModelIntInput | null,
  databases?: ModelStringInput | null,
  id?: ModelIDInput | null,
  lastSyncDate?: ModelStringInput | null,
  not?: ModelFederatedCatalogFilterInput | null,
  or?: Array< ModelFederatedCatalogFilterInput | null > | null,
  owner?: ModelStringInput | null,
  tableCount?: ModelIntInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelFederatedQueryHistoryFilterInput = {
  and?: Array< ModelFederatedQueryHistoryFilterInput | null > | null,
  connectionId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  dataScanedBytes?: ModelIntInput | null,
  database?: ModelStringInput | null,
  errorMessage?: ModelStringInput | null,
  estimatedCostUSD?: ModelFloatInput | null,
  executedBy?: ModelStringInput | null,
  executionTimeMs?: ModelIntInput | null,
  id?: ModelIDInput | null,
  not?: ModelFederatedQueryHistoryFilterInput | null,
  or?: Array< ModelFederatedQueryHistoryFilterInput | null > | null,
  owner?: ModelStringInput | null,
  queryExecutionId?: ModelStringInput | null,
  queryString?: ModelStringInput | null,
  rowCount?: ModelIntInput | null,
  status?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelFloatInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
};

export type ModelMapLayerFilterInput = {
  and?: Array< ModelMapLayerFilterInput | null > | null,
  athenaDatabase?: ModelStringInput | null,
  athenaQuery?: ModelStringInput | null,
  chatSessionId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  description?: ModelStringInput | null,
  geoJsonMapping?: ModelStringInput | null,
  id?: ModelIDInput | null,
  lastQueryExecutedAt?: ModelStringInput | null,
  name?: ModelStringInput | null,
  not?: ModelMapLayerFilterInput | null,
  or?: Array< ModelMapLayerFilterInput | null > | null,
  order?: ModelIntInput | null,
  owner?: ModelStringInput | null,
  queryError?: ModelStringInput | null,
  queryRefreshInterval?: ModelIntInput | null,
  source?: ModelStringInput | null,
  style?: ModelStringInput | null,
  type?: ModelMapLayerTypeInput | null,
  updatedAt?: ModelStringInput | null,
  visible?: ModelBooleanInput | null,
};

export type ModelMapLayerTypeInput = {
  eq?: MapLayerType | null,
  ne?: MapLayerType | null,
};

export type ModelIntKeyConditionInput = {
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
};

export type ModelMcpServerFilterInput = {
  and?: Array< ModelMcpServerFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  enabled?: ModelBooleanInput | null,
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  not?: ModelMcpServerFilterInput | null,
  or?: Array< ModelMcpServerFilterInput | null > | null,
  owner?: ModelStringInput | null,
  signRequestsWithAwsCreds?: ModelBooleanInput | null,
  updatedAt?: ModelStringInput | null,
  url?: ModelStringInput | null,
};

export type ModelMcpServerConnection = {
  __typename: "ModelMcpServerConnection",
  items:  Array<McpServer | null >,
  nextToken?: string | null,
};

export type ModelRetrievalResultFilterInput = {
  and?: Array< ModelRetrievalResultFilterInput | null > | null,
  chatSessionId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  messageId?: ModelIDInput | null,
  modelResponse?: ModelStringInput | null,
  not?: ModelRetrievalResultFilterInput | null,
  or?: Array< ModelRetrievalResultFilterInput | null > | null,
  query?: ModelStringInput | null,
  retrievedAt?: ModelStringInput | null,
  sources?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelRetrievalResultConnection = {
  __typename: "ModelRetrievalResultConnection",
  items:  Array<RetrievalResult | null >,
  nextToken?: string | null,
};

export type ModelSettingsFilterInput = {
  and?: Array< ModelSettingsFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  not?: ModelSettingsFilterInput | null,
  or?: Array< ModelSettingsFilterInput | null > | null,
  owner?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  value?: ModelStringInput | null,
};

export type ModelSettingsConnection = {
  __typename: "ModelSettingsConnection",
  items:  Array<Settings | null >,
  nextToken?: string | null,
};

export type ModelWorkoverJobFilterInput = {
  and?: Array< ModelWorkoverJobFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  description?: ModelStringInput | null,
  estimatedCost?: ModelStringInput | null,
  estimatedDuration?: ModelStringInput | null,
  id?: ModelIDInput | null,
  jobType?: ModelWorkoverJobTypeInput | null,
  location?: ModelStringInput | null,
  not?: ModelWorkoverJobFilterInput | null,
  or?: Array< ModelWorkoverJobFilterInput | null > | null,
  owner?: ModelStringInput | null,
  priority?: ModelWorkoverJobPriorityInput | null,
  rigAssigned?: ModelStringInput | null,
  scheduledDate?: ModelStringInput | null,
  status?: ModelWorkoverJobStatusInput | null,
  updatedAt?: ModelStringInput | null,
  wellName?: ModelStringInput | null,
};

export type ModelWorkoverJobTypeInput = {
  eq?: WorkoverJobType | null,
  ne?: WorkoverJobType | null,
};

export type ModelWorkoverJobPriorityInput = {
  eq?: WorkoverJobPriority | null,
  ne?: WorkoverJobPriority | null,
};

export type ModelWorkoverJobStatusInput = {
  eq?: WorkoverJobStatus | null,
  ne?: WorkoverJobStatus | null,
};

export type ModelWorkoverJobConnection = {
  __typename: "ModelWorkoverJobConnection",
  items:  Array<WorkoverJob | null >,
  nextToken?: string | null,
};

export type RetrieveAndGenerateReturnType = {
  __typename: "RetrieveAndGenerateReturnType",
  answer?: string | null,
  sources?: string | null,
};

export type ModelActionItemConditionInput = {
  action?: ModelStringInput | null,
  alertId?: ModelStringInput | null,
  and?: Array< ModelActionItemConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  description?: ModelStringInput | null,
  expectedValue?: ModelStringInput | null,
  not?: ModelActionItemConditionInput | null,
  or?: Array< ModelActionItemConditionInput | null > | null,
  owner?: ModelStringInput | null,
  risk?: ModelStringInput | null,
  source?: ModelStringInput | null,
  status?: ModelActionItemStatusInput | null,
  type?: ModelActionItemTypeInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateActionItemInput = {
  action: string,
  alertId: string,
  description: string,
  expectedValue?: string | null,
  id?: string | null,
  risk?: string | null,
  source: string,
  status: ActionItemStatus,
  type: ActionItemType,
};

export type ModelChatMessageConditionInput = {
  and?: Array< ModelChatMessageConditionInput | null > | null,
  chatSessionId?: ModelIDInput | null,
  chatSessionIdUnderscoreAgentId?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  metadata?: ModelStringInput | null,
  not?: ModelChatMessageConditionInput | null,
  or?: Array< ModelChatMessageConditionInput | null > | null,
  owner?: ModelStringInput | null,
  parts?: ModelStringInput | null,
  responseComplete?: ModelBooleanInput | null,
  role?: ModelRolesInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateChatMessageInput = {
  chatSessionId?: string | null,
  chatSessionIdUnderscoreAgentId?: string | null,
  createdAt?: string | null,
  id?: string | null,
  metadata?: string | null,
  owner?: string | null,
  parts: string,
  responseComplete?: boolean | null,
  role: Roles,
};

export type ModelChatSessionConditionInput = {
  and?: Array< ModelChatSessionConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  mapBounds?: ModelStringInput | null,
  name?: ModelStringInput | null,
  not?: ModelChatSessionConditionInput | null,
  or?: Array< ModelChatSessionConditionInput | null > | null,
  owner?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateChatSessionInput = {
  id?: string | null,
  mapBounds?: string | null,
  name?: string | null,
};

export type ModelDataSourceConnectionConditionInput = {
  and?: Array< ModelDataSourceConnectionConditionInput | null > | null,
  catalogId?: ModelStringInput | null,
  connectionMetadata?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  createdBy?: ModelStringInput | null,
  description?: ModelStringInput | null,
  lastQueryDate?: ModelStringInput | null,
  lastTestDate?: ModelStringInput | null,
  lastTestMessage?: ModelStringInput | null,
  lastTestStatus?: ModelStringInput | null,
  name?: ModelStringInput | null,
  not?: ModelDataSourceConnectionConditionInput | null,
  or?: Array< ModelDataSourceConnectionConditionInput | null > | null,
  owner?: ModelStringInput | null,
  queryCount?: ModelIntInput | null,
  secretArn?: ModelStringInput | null,
  status?: ModelDataSourceStatusInput | null,
  type?: ModelDataSourceTypeInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateDataSourceConnectionInput = {
  catalogId?: string | null,
  connectionMetadata: string,
  createdBy?: string | null,
  description?: string | null,
  id?: string | null,
  lastQueryDate?: string | null,
  lastTestDate?: string | null,
  lastTestMessage?: string | null,
  lastTestStatus?: string | null,
  name: string,
  queryCount?: number | null,
  secretArn: string,
  status: DataSourceStatus,
  type: DataSourceType,
};

export type ModelDocumentConditionInput = {
  and?: Array< ModelDocumentConditionInput | null > | null,
  chatSessionId?: ModelIDInput | null,
  contentType?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  description?: ModelStringInput | null,
  errorMessage?: ModelStringInput | null,
  fileSize?: ModelIntInput | null,
  metadata?: ModelStringInput | null,
  not?: ModelDocumentConditionInput | null,
  or?: Array< ModelDocumentConditionInput | null > | null,
  s3Bucket?: ModelStringInput | null,
  s3Key?: ModelStringInput | null,
  status?: ModelDocumentStatusInput | null,
  title?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  uploadedAt?: ModelStringInput | null,
  uploadedBy?: ModelStringInput | null,
};

export type CreateDocumentInput = {
  chatSessionId?: string | null,
  contentType: string,
  description?: string | null,
  errorMessage?: string | null,
  fileSize?: number | null,
  id?: string | null,
  metadata?: string | null,
  s3Bucket: string,
  s3Key: string,
  status?: DocumentStatus | null,
  title: string,
  uploadedAt: string,
  uploadedBy: string,
};

export type ModelFederatedCatalogConditionInput = {
  and?: Array< ModelFederatedCatalogConditionInput | null > | null,
  catalogArn?: ModelStringInput | null,
  catalogName?: ModelStringInput | null,
  connectionId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  databaseCount?: ModelIntInput | null,
  databases?: ModelStringInput | null,
  lastSyncDate?: ModelStringInput | null,
  not?: ModelFederatedCatalogConditionInput | null,
  or?: Array< ModelFederatedCatalogConditionInput | null > | null,
  owner?: ModelStringInput | null,
  tableCount?: ModelIntInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateFederatedCatalogInput = {
  catalogArn?: string | null,
  catalogName: string,
  connectionId: string,
  databaseCount?: number | null,
  databases?: string | null,
  id?: string | null,
  lastSyncDate?: string | null,
  tableCount?: number | null,
};

export type ModelFederatedQueryHistoryConditionInput = {
  and?: Array< ModelFederatedQueryHistoryConditionInput | null > | null,
  connectionId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  dataScanedBytes?: ModelIntInput | null,
  database?: ModelStringInput | null,
  errorMessage?: ModelStringInput | null,
  estimatedCostUSD?: ModelFloatInput | null,
  executedBy?: ModelStringInput | null,
  executionTimeMs?: ModelIntInput | null,
  not?: ModelFederatedQueryHistoryConditionInput | null,
  or?: Array< ModelFederatedQueryHistoryConditionInput | null > | null,
  owner?: ModelStringInput | null,
  queryExecutionId?: ModelStringInput | null,
  queryString?: ModelStringInput | null,
  rowCount?: ModelIntInput | null,
  status?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateFederatedQueryHistoryInput = {
  connectionId: string,
  dataScanedBytes?: number | null,
  database?: string | null,
  errorMessage?: string | null,
  estimatedCostUSD?: number | null,
  executedBy?: string | null,
  executionTimeMs?: number | null,
  id?: string | null,
  queryExecutionId?: string | null,
  queryString: string,
  rowCount?: number | null,
  status: string,
};

export type ModelMapLayerConditionInput = {
  and?: Array< ModelMapLayerConditionInput | null > | null,
  athenaDatabase?: ModelStringInput | null,
  athenaQuery?: ModelStringInput | null,
  chatSessionId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  description?: ModelStringInput | null,
  geoJsonMapping?: ModelStringInput | null,
  lastQueryExecutedAt?: ModelStringInput | null,
  name?: ModelStringInput | null,
  not?: ModelMapLayerConditionInput | null,
  or?: Array< ModelMapLayerConditionInput | null > | null,
  order?: ModelIntInput | null,
  owner?: ModelStringInput | null,
  queryError?: ModelStringInput | null,
  queryRefreshInterval?: ModelIntInput | null,
  source?: ModelStringInput | null,
  style?: ModelStringInput | null,
  type?: ModelMapLayerTypeInput | null,
  updatedAt?: ModelStringInput | null,
  visible?: ModelBooleanInput | null,
};

export type CreateMapLayerInput = {
  athenaDatabase: string,
  athenaQuery: string,
  chatSessionId: string,
  createdAt?: string | null,
  description?: string | null,
  geoJsonMapping: string,
  id?: string | null,
  lastQueryExecutedAt?: string | null,
  name: string,
  order?: number | null,
  owner?: string | null,
  queryError?: string | null,
  queryRefreshInterval?: number | null,
  source?: string | null,
  style?: string | null,
  type: MapLayerType,
  updatedAt?: string | null,
  visible?: boolean | null,
};

export type ModelMcpServerConditionInput = {
  and?: Array< ModelMcpServerConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  enabled?: ModelBooleanInput | null,
  name?: ModelStringInput | null,
  not?: ModelMcpServerConditionInput | null,
  or?: Array< ModelMcpServerConditionInput | null > | null,
  owner?: ModelStringInput | null,
  signRequestsWithAwsCreds?: ModelBooleanInput | null,
  updatedAt?: ModelStringInput | null,
  url?: ModelStringInput | null,
};

export type CreateMcpServerInput = {
  enabled?: boolean | null,
  headers?: Array< HeaderEntryInput | null > | null,
  id?: string | null,
  name: string,
  signRequestsWithAwsCreds?: boolean | null,
  tools?: Array< ToolInput | null > | null,
  url?: string | null,
};

export type HeaderEntryInput = {
  key?: string | null,
  value?: string | null,
};

export type ToolInput = {
  description?: string | null,
  name?: string | null,
  schema?: string | null,
};

export type ModelRetrievalResultConditionInput = {
  and?: Array< ModelRetrievalResultConditionInput | null > | null,
  chatSessionId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  messageId?: ModelIDInput | null,
  modelResponse?: ModelStringInput | null,
  not?: ModelRetrievalResultConditionInput | null,
  or?: Array< ModelRetrievalResultConditionInput | null > | null,
  query?: ModelStringInput | null,
  retrievedAt?: ModelStringInput | null,
  sources?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateRetrievalResultInput = {
  chatSessionId: string,
  id?: string | null,
  messageId: string,
  modelResponse?: string | null,
  query: string,
  retrievedAt: string,
  sources: string,
};

export type ModelSettingsConditionInput = {
  and?: Array< ModelSettingsConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  name?: ModelStringInput | null,
  not?: ModelSettingsConditionInput | null,
  or?: Array< ModelSettingsConditionInput | null > | null,
  owner?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  value?: ModelStringInput | null,
};

export type CreateSettingsInput = {
  id?: string | null,
  name?: string | null,
  value?: string | null,
};

export type ModelWorkoverJobConditionInput = {
  and?: Array< ModelWorkoverJobConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  description?: ModelStringInput | null,
  estimatedCost?: ModelStringInput | null,
  estimatedDuration?: ModelStringInput | null,
  jobType?: ModelWorkoverJobTypeInput | null,
  location?: ModelStringInput | null,
  not?: ModelWorkoverJobConditionInput | null,
  or?: Array< ModelWorkoverJobConditionInput | null > | null,
  owner?: ModelStringInput | null,
  priority?: ModelWorkoverJobPriorityInput | null,
  rigAssigned?: ModelStringInput | null,
  scheduledDate?: ModelStringInput | null,
  status?: ModelWorkoverJobStatusInput | null,
  updatedAt?: ModelStringInput | null,
  wellName?: ModelStringInput | null,
};

export type CreateWorkoverJobInput = {
  description: string,
  estimatedCost: string,
  estimatedDuration: string,
  financialMetrics: FinancialMetricsInput,
  id?: string | null,
  jobType: WorkoverJobType,
  location: string,
  priority: WorkoverJobPriority,
  rigAssigned?: string | null,
  scheduledDate: string,
  status: WorkoverJobStatus,
  wellName: string,
};

export type FinancialMetricsInput = {
  incrementalGasMCFD?: number | null,
  incrementalOilBOPD?: number | null,
  paybackMonths: number,
  presentValue: number,
  rateOfReturn: number,
};

export type DeleteActionItemInput = {
  id: string,
};

export type DeleteChatMessageInput = {
  id: string,
};

export type DeleteChatSessionInput = {
  id: string,
};

export type DeleteDataSourceConnectionInput = {
  id: string,
};

export type DeleteDocumentInput = {
  id: string,
};

export type DeleteFederatedCatalogInput = {
  id: string,
};

export type DeleteFederatedQueryHistoryInput = {
  id: string,
};

export type DeleteMapLayerInput = {
  id: string,
};

export type DeleteMcpServerInput = {
  id: string,
};

export type DeleteRetrievalResultInput = {
  id: string,
};

export type DeleteSettingsInput = {
  id: string,
};

export type DeleteWorkoverJobInput = {
  id: string,
};

export type AthenaQueryResult = {
  __typename: "AthenaQueryResult",
  columns?: Array< string | null > | null,
  data?: string | null,
  error?: string | null,
  nextToken?: string | null,
  queryExecutionId: string,
  rowCount?: number | null,
  status: AthenaQueryStatus,
};

export enum AthenaQueryStatus {
  CANCELLED = "CANCELLED",
  FAILED = "FAILED",
  QUEUED = "QUEUED",
  RUNNING = "RUNNING",
  SUCCEEDED = "SUCCEEDED",
}


export type MapLayerQueryResult = {
  __typename: "MapLayerQueryResult",
  error?: string | null,
  geoJsonData?: string | null,
  rowCount?: number | null,
  success: boolean,
};

export type ConnectionOperationResult = {
  __typename: "ConnectionOperationResult",
  catalogName?: string | null,
  error?: string | null,
  message?: string | null,
  secretArn?: string | null,
  success: boolean,
};

export type UpdateActionItemInput = {
  action?: string | null,
  alertId?: string | null,
  description?: string | null,
  expectedValue?: string | null,
  id: string,
  risk?: string | null,
  source?: string | null,
  status?: ActionItemStatus | null,
  type?: ActionItemType | null,
};

export type UpdateChatMessageInput = {
  chatSessionId?: string | null,
  chatSessionIdUnderscoreAgentId?: string | null,
  createdAt?: string | null,
  id: string,
  metadata?: string | null,
  owner?: string | null,
  parts?: string | null,
  responseComplete?: boolean | null,
  role?: Roles | null,
};

export type UpdateChatSessionInput = {
  id: string,
  mapBounds?: string | null,
  name?: string | null,
};

export type UpdateDataSourceConnectionInput = {
  catalogId?: string | null,
  connectionMetadata?: string | null,
  createdBy?: string | null,
  description?: string | null,
  id: string,
  lastQueryDate?: string | null,
  lastTestDate?: string | null,
  lastTestMessage?: string | null,
  lastTestStatus?: string | null,
  name?: string | null,
  queryCount?: number | null,
  secretArn?: string | null,
  status?: DataSourceStatus | null,
  type?: DataSourceType | null,
};

export type UpdateDocumentInput = {
  chatSessionId?: string | null,
  contentType?: string | null,
  description?: string | null,
  errorMessage?: string | null,
  fileSize?: number | null,
  id: string,
  metadata?: string | null,
  s3Bucket?: string | null,
  s3Key?: string | null,
  status?: DocumentStatus | null,
  title?: string | null,
  uploadedAt?: string | null,
  uploadedBy?: string | null,
};

export type UpdateFederatedCatalogInput = {
  catalogArn?: string | null,
  catalogName?: string | null,
  connectionId?: string | null,
  databaseCount?: number | null,
  databases?: string | null,
  id: string,
  lastSyncDate?: string | null,
  tableCount?: number | null,
};

export type UpdateFederatedQueryHistoryInput = {
  connectionId?: string | null,
  dataScanedBytes?: number | null,
  database?: string | null,
  errorMessage?: string | null,
  estimatedCostUSD?: number | null,
  executedBy?: string | null,
  executionTimeMs?: number | null,
  id: string,
  queryExecutionId?: string | null,
  queryString?: string | null,
  rowCount?: number | null,
  status?: string | null,
};

export type UpdateMapLayerInput = {
  athenaDatabase?: string | null,
  athenaQuery?: string | null,
  chatSessionId?: string | null,
  createdAt?: string | null,
  description?: string | null,
  geoJsonMapping?: string | null,
  id: string,
  lastQueryExecutedAt?: string | null,
  name?: string | null,
  order?: number | null,
  owner?: string | null,
  queryError?: string | null,
  queryRefreshInterval?: number | null,
  source?: string | null,
  style?: string | null,
  type?: MapLayerType | null,
  updatedAt?: string | null,
  visible?: boolean | null,
};

export type UpdateMcpServerInput = {
  enabled?: boolean | null,
  headers?: Array< HeaderEntryInput | null > | null,
  id: string,
  name?: string | null,
  signRequestsWithAwsCreds?: boolean | null,
  tools?: Array< ToolInput | null > | null,
  url?: string | null,
};

export type UpdateRetrievalResultInput = {
  chatSessionId?: string | null,
  id: string,
  messageId?: string | null,
  modelResponse?: string | null,
  query?: string | null,
  retrievedAt?: string | null,
  sources?: string | null,
};

export type UpdateSettingsInput = {
  id: string,
  name?: string | null,
  value?: string | null,
};

export type UpdateWorkoverJobInput = {
  description?: string | null,
  estimatedCost?: string | null,
  estimatedDuration?: string | null,
  financialMetrics?: FinancialMetricsInput | null,
  id: string,
  jobType?: WorkoverJobType | null,
  location?: string | null,
  priority?: WorkoverJobPriority | null,
  rigAssigned?: string | null,
  scheduledDate?: string | null,
  status?: WorkoverJobStatus | null,
  wellName?: string | null,
};

export type ModelSubscriptionActionItemFilterInput = {
  action?: ModelSubscriptionStringInput | null,
  alertId?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionActionItemFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  expectedValue?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionActionItemFilterInput | null > | null,
  owner?: ModelStringInput | null,
  risk?: ModelSubscriptionStringInput | null,
  source?: ModelSubscriptionStringInput | null,
  status?: ModelSubscriptionStringInput | null,
  type?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionStringInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  in?: Array< string | null > | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionIDInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  in?: Array< string | null > | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionChatMessageFilterInput = {
  and?: Array< ModelSubscriptionChatMessageFilterInput | null > | null,
  chatSessionId?: ModelSubscriptionIDInput | null,
  chatSessionIdUnderscoreAgentId?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  metadata?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionChatMessageFilterInput | null > | null,
  owner?: ModelStringInput | null,
  parts?: ModelSubscriptionStringInput | null,
  responseComplete?: ModelSubscriptionBooleanInput | null,
  role?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionBooleanInput = {
  eq?: boolean | null,
  ne?: boolean | null,
};

export type ModelSubscriptionChatSessionFilterInput = {
  and?: Array< ModelSubscriptionChatSessionFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  mapBounds?: ModelSubscriptionStringInput | null,
  name?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionChatSessionFilterInput | null > | null,
  owner?: ModelStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionDataSourceConnectionFilterInput = {
  and?: Array< ModelSubscriptionDataSourceConnectionFilterInput | null > | null,
  catalogId?: ModelSubscriptionStringInput | null,
  connectionMetadata?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  createdBy?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  lastQueryDate?: ModelSubscriptionStringInput | null,
  lastTestDate?: ModelSubscriptionStringInput | null,
  lastTestMessage?: ModelSubscriptionStringInput | null,
  lastTestStatus?: ModelSubscriptionStringInput | null,
  name?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionDataSourceConnectionFilterInput | null > | null,
  owner?: ModelStringInput | null,
  queryCount?: ModelSubscriptionIntInput | null,
  secretArn?: ModelSubscriptionStringInput | null,
  status?: ModelSubscriptionStringInput | null,
  type?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionIntInput = {
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  in?: Array< number | null > | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionDocumentFilterInput = {
  and?: Array< ModelSubscriptionDocumentFilterInput | null > | null,
  chatSessionId?: ModelSubscriptionIDInput | null,
  contentType?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  errorMessage?: ModelSubscriptionStringInput | null,
  fileSize?: ModelSubscriptionIntInput | null,
  id?: ModelSubscriptionIDInput | null,
  metadata?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionDocumentFilterInput | null > | null,
  s3Bucket?: ModelSubscriptionStringInput | null,
  s3Key?: ModelSubscriptionStringInput | null,
  status?: ModelSubscriptionStringInput | null,
  title?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  uploadedAt?: ModelSubscriptionStringInput | null,
  uploadedBy?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionFederatedCatalogFilterInput = {
  and?: Array< ModelSubscriptionFederatedCatalogFilterInput | null > | null,
  catalogArn?: ModelSubscriptionStringInput | null,
  catalogName?: ModelSubscriptionStringInput | null,
  connectionId?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  databaseCount?: ModelSubscriptionIntInput | null,
  databases?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  lastSyncDate?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionFederatedCatalogFilterInput | null > | null,
  owner?: ModelStringInput | null,
  tableCount?: ModelSubscriptionIntInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionFederatedQueryHistoryFilterInput = {
  and?: Array< ModelSubscriptionFederatedQueryHistoryFilterInput | null > | null,
  connectionId?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  dataScanedBytes?: ModelSubscriptionIntInput | null,
  database?: ModelSubscriptionStringInput | null,
  errorMessage?: ModelSubscriptionStringInput | null,
  estimatedCostUSD?: ModelSubscriptionFloatInput | null,
  executedBy?: ModelSubscriptionStringInput | null,
  executionTimeMs?: ModelSubscriptionIntInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionFederatedQueryHistoryFilterInput | null > | null,
  owner?: ModelStringInput | null,
  queryExecutionId?: ModelSubscriptionStringInput | null,
  queryString?: ModelSubscriptionStringInput | null,
  rowCount?: ModelSubscriptionIntInput | null,
  status?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionFloatInput = {
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  in?: Array< number | null > | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionMapLayerFilterInput = {
  and?: Array< ModelSubscriptionMapLayerFilterInput | null > | null,
  athenaDatabase?: ModelSubscriptionStringInput | null,
  athenaQuery?: ModelSubscriptionStringInput | null,
  chatSessionId?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  geoJsonMapping?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  lastQueryExecutedAt?: ModelSubscriptionStringInput | null,
  name?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionMapLayerFilterInput | null > | null,
  order?: ModelSubscriptionIntInput | null,
  owner?: ModelStringInput | null,
  queryError?: ModelSubscriptionStringInput | null,
  queryRefreshInterval?: ModelSubscriptionIntInput | null,
  source?: ModelSubscriptionStringInput | null,
  style?: ModelSubscriptionStringInput | null,
  type?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  visible?: ModelSubscriptionBooleanInput | null,
};

export type ModelSubscriptionMcpServerFilterInput = {
  and?: Array< ModelSubscriptionMcpServerFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  enabled?: ModelSubscriptionBooleanInput | null,
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionMcpServerFilterInput | null > | null,
  owner?: ModelStringInput | null,
  signRequestsWithAwsCreds?: ModelSubscriptionBooleanInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  url?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionRetrievalResultFilterInput = {
  and?: Array< ModelSubscriptionRetrievalResultFilterInput | null > | null,
  chatSessionId?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  messageId?: ModelSubscriptionIDInput | null,
  modelResponse?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionRetrievalResultFilterInput | null > | null,
  query?: ModelSubscriptionStringInput | null,
  retrievedAt?: ModelSubscriptionStringInput | null,
  sources?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionSettingsFilterInput = {
  and?: Array< ModelSubscriptionSettingsFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionSettingsFilterInput | null > | null,
  owner?: ModelStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  value?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionWorkoverJobFilterInput = {
  and?: Array< ModelSubscriptionWorkoverJobFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  estimatedCost?: ModelSubscriptionStringInput | null,
  estimatedDuration?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  jobType?: ModelSubscriptionStringInput | null,
  location?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionWorkoverJobFilterInput | null > | null,
  owner?: ModelStringInput | null,
  priority?: ModelSubscriptionStringInput | null,
  rigAssigned?: ModelSubscriptionStringInput | null,
  scheduledDate?: ModelSubscriptionStringInput | null,
  status?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  wellName?: ModelSubscriptionStringInput | null,
};

export type GetActionItemQueryVariables = {
  id: string,
};

export type GetActionItemQuery = {
  getActionItem?:  {
    __typename: "ActionItem",
    action: string,
    alertId: string,
    createdAt: string,
    description: string,
    expectedValue?: string | null,
    id: string,
    owner?: string | null,
    risk?: string | null,
    source: string,
    status: ActionItemStatus,
    type: ActionItemType,
    updatedAt: string,
  } | null,
};

export type GetChatMessageQueryVariables = {
  id: string,
};

export type GetChatMessageQuery = {
  getChatMessage?:  {
    __typename: "ChatMessage",
    chatSession?:  {
      __typename: "ChatSession",
      createdAt: string,
      id: string,
      mapBounds?: string | null,
      name?: string | null,
      owner?: string | null,
      updatedAt: string,
    } | null,
    chatSessionId?: string | null,
    chatSessionIdUnderscoreAgentId?: string | null,
    createdAt?: string | null,
    id: string,
    metadata?: string | null,
    owner?: string | null,
    parts: string,
    responseComplete?: boolean | null,
    role: Roles,
    updatedAt: string,
  } | null,
};

export type GetChatSessionQueryVariables = {
  id: string,
};

export type GetChatSessionQuery = {
  getChatSession?:  {
    __typename: "ChatSession",
    createdAt: string,
    id: string,
    mapBounds?: string | null,
    mapLayers?:  {
      __typename: "ModelMapLayerConnection",
      nextToken?: string | null,
    } | null,
    messages?:  {
      __typename: "ModelChatMessageConnection",
      nextToken?: string | null,
    } | null,
    name?: string | null,
    owner?: string | null,
    updatedAt: string,
  } | null,
};

export type GetDataSourceConnectionQueryVariables = {
  id: string,
};

export type GetDataSourceConnectionQuery = {
  getDataSourceConnection?:  {
    __typename: "DataSourceConnection",
    catalogId?: string | null,
    catalogs?:  {
      __typename: "ModelFederatedCatalogConnection",
      nextToken?: string | null,
    } | null,
    connectionMetadata: string,
    createdAt: string,
    createdBy?: string | null,
    description?: string | null,
    id: string,
    lastQueryDate?: string | null,
    lastTestDate?: string | null,
    lastTestMessage?: string | null,
    lastTestStatus?: string | null,
    name: string,
    owner?: string | null,
    queryCount?: number | null,
    queryHistory?:  {
      __typename: "ModelFederatedQueryHistoryConnection",
      nextToken?: string | null,
    } | null,
    secretArn: string,
    status: DataSourceStatus,
    type: DataSourceType,
    updatedAt: string,
  } | null,
};

export type GetDocumentQueryVariables = {
  id: string,
};

export type GetDocumentQuery = {
  getDocument?:  {
    __typename: "Document",
    chatSessionId?: string | null,
    contentType: string,
    createdAt: string,
    description?: string | null,
    errorMessage?: string | null,
    fileSize?: number | null,
    id: string,
    metadata?: string | null,
    s3Bucket: string,
    s3Key: string,
    status?: DocumentStatus | null,
    title: string,
    updatedAt: string,
    uploadedAt: string,
    uploadedBy: string,
  } | null,
};

export type GetFederatedCatalogQueryVariables = {
  id: string,
};

export type GetFederatedCatalogQuery = {
  getFederatedCatalog?:  {
    __typename: "FederatedCatalog",
    catalogArn?: string | null,
    catalogName: string,
    connection?:  {
      __typename: "DataSourceConnection",
      catalogId?: string | null,
      connectionMetadata: string,
      createdAt: string,
      createdBy?: string | null,
      description?: string | null,
      id: string,
      lastQueryDate?: string | null,
      lastTestDate?: string | null,
      lastTestMessage?: string | null,
      lastTestStatus?: string | null,
      name: string,
      owner?: string | null,
      queryCount?: number | null,
      secretArn: string,
      status: DataSourceStatus,
      type: DataSourceType,
      updatedAt: string,
    } | null,
    connectionId: string,
    createdAt: string,
    databaseCount?: number | null,
    databases?: string | null,
    id: string,
    lastSyncDate?: string | null,
    owner?: string | null,
    tableCount?: number | null,
    updatedAt: string,
  } | null,
};

export type GetFederatedQueryHistoryQueryVariables = {
  id: string,
};

export type GetFederatedQueryHistoryQuery = {
  getFederatedQueryHistory?:  {
    __typename: "FederatedQueryHistory",
    connection?:  {
      __typename: "DataSourceConnection",
      catalogId?: string | null,
      connectionMetadata: string,
      createdAt: string,
      createdBy?: string | null,
      description?: string | null,
      id: string,
      lastQueryDate?: string | null,
      lastTestDate?: string | null,
      lastTestMessage?: string | null,
      lastTestStatus?: string | null,
      name: string,
      owner?: string | null,
      queryCount?: number | null,
      secretArn: string,
      status: DataSourceStatus,
      type: DataSourceType,
      updatedAt: string,
    } | null,
    connectionId: string,
    createdAt: string,
    dataScanedBytes?: number | null,
    database?: string | null,
    errorMessage?: string | null,
    estimatedCostUSD?: number | null,
    executedBy?: string | null,
    executionTimeMs?: number | null,
    id: string,
    owner?: string | null,
    queryExecutionId?: string | null,
    queryString: string,
    rowCount?: number | null,
    status: string,
    updatedAt: string,
  } | null,
};

export type GetMapLayerQueryVariables = {
  id: string,
};

export type GetMapLayerQuery = {
  getMapLayer?:  {
    __typename: "MapLayer",
    athenaDatabase: string,
    athenaQuery: string,
    chatSession?:  {
      __typename: "ChatSession",
      createdAt: string,
      id: string,
      mapBounds?: string | null,
      name?: string | null,
      owner?: string | null,
      updatedAt: string,
    } | null,
    chatSessionId: string,
    createdAt?: string | null,
    description?: string | null,
    geoJsonMapping: string,
    id: string,
    lastQueryExecutedAt?: string | null,
    name: string,
    order?: number | null,
    owner?: string | null,
    queryError?: string | null,
    queryRefreshInterval?: number | null,
    source?: string | null,
    style?: string | null,
    type: MapLayerType,
    updatedAt?: string | null,
    visible?: boolean | null,
  } | null,
};

export type GetMcpServerQueryVariables = {
  id: string,
};

export type GetMcpServerQuery = {
  getMcpServer?:  {
    __typename: "McpServer",
    createdAt: string,
    enabled?: boolean | null,
    headers?:  Array< {
      __typename: "HeaderEntry",
      key?: string | null,
      value?: string | null,
    } | null > | null,
    id: string,
    name: string,
    owner?: string | null,
    signRequestsWithAwsCreds?: boolean | null,
    tools?:  Array< {
      __typename: "Tool",
      description?: string | null,
      name?: string | null,
      schema?: string | null,
    } | null > | null,
    updatedAt: string,
    url?: string | null,
  } | null,
};

export type GetRetrievalResultQueryVariables = {
  id: string,
};

export type GetRetrievalResultQuery = {
  getRetrievalResult?:  {
    __typename: "RetrievalResult",
    chatSessionId: string,
    createdAt: string,
    id: string,
    messageId: string,
    modelResponse?: string | null,
    query: string,
    retrievedAt: string,
    sources: string,
    updatedAt: string,
  } | null,
};

export type GetSettingsQueryVariables = {
  id: string,
};

export type GetSettingsQuery = {
  getSettings?:  {
    __typename: "Settings",
    createdAt: string,
    id: string,
    name?: string | null,
    owner?: string | null,
    updatedAt: string,
    value?: string | null,
  } | null,
};

export type GetWorkoverJobQueryVariables = {
  id: string,
};

export type GetWorkoverJobQuery = {
  getWorkoverJob?:  {
    __typename: "WorkoverJob",
    createdAt: string,
    description: string,
    estimatedCost: string,
    estimatedDuration: string,
    financialMetrics:  {
      __typename: "FinancialMetrics",
      incrementalGasMCFD?: number | null,
      incrementalOilBOPD?: number | null,
      paybackMonths: number,
      presentValue: number,
      rateOfReturn: number,
    },
    id: string,
    jobType: WorkoverJobType,
    location: string,
    owner?: string | null,
    priority: WorkoverJobPriority,
    rigAssigned?: string | null,
    scheduledDate: string,
    status: WorkoverJobStatus,
    updatedAt: string,
    wellName: string,
  } | null,
};

export type ListActionItemsQueryVariables = {
  filter?: ModelActionItemFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListActionItemsQuery = {
  listActionItems?:  {
    __typename: "ModelActionItemConnection",
    items:  Array< {
      __typename: "ActionItem",
      action: string,
      alertId: string,
      createdAt: string,
      description: string,
      expectedValue?: string | null,
      id: string,
      owner?: string | null,
      risk?: string | null,
      source: string,
      status: ActionItemStatus,
      type: ActionItemType,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListChatMessageByChatSessionIdAndCreatedAtQueryVariables = {
  chatSessionId: string,
  createdAt?: ModelStringKeyConditionInput | null,
  filter?: ModelChatMessageFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListChatMessageByChatSessionIdAndCreatedAtQuery = {
  listChatMessageByChatSessionIdAndCreatedAt?:  {
    __typename: "ModelChatMessageConnection",
    items:  Array< {
      __typename: "ChatMessage",
      chatSessionId?: string | null,
      chatSessionIdUnderscoreAgentId?: string | null,
      createdAt?: string | null,
      id: string,
      metadata?: string | null,
      owner?: string | null,
      parts: string,
      responseComplete?: boolean | null,
      role: Roles,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListChatMessageByChatSessionIdUnderscoreAgentIdAndCreatedAtQueryVariables = {
  chatSessionIdUnderscoreAgentId: string,
  createdAt?: ModelStringKeyConditionInput | null,
  filter?: ModelChatMessageFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListChatMessageByChatSessionIdUnderscoreAgentIdAndCreatedAtQuery = {
  listChatMessageByChatSessionIdUnderscoreAgentIdAndCreatedAt?:  {
    __typename: "ModelChatMessageConnection",
    items:  Array< {
      __typename: "ChatMessage",
      chatSessionId?: string | null,
      chatSessionIdUnderscoreAgentId?: string | null,
      createdAt?: string | null,
      id: string,
      metadata?: string | null,
      owner?: string | null,
      parts: string,
      responseComplete?: boolean | null,
      role: Roles,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListChatMessagesQueryVariables = {
  filter?: ModelChatMessageFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListChatMessagesQuery = {
  listChatMessages?:  {
    __typename: "ModelChatMessageConnection",
    items:  Array< {
      __typename: "ChatMessage",
      chatSessionId?: string | null,
      chatSessionIdUnderscoreAgentId?: string | null,
      createdAt?: string | null,
      id: string,
      metadata?: string | null,
      owner?: string | null,
      parts: string,
      responseComplete?: boolean | null,
      role: Roles,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListChatSessionsQueryVariables = {
  filter?: ModelChatSessionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListChatSessionsQuery = {
  listChatSessions?:  {
    __typename: "ModelChatSessionConnection",
    items:  Array< {
      __typename: "ChatSession",
      createdAt: string,
      id: string,
      mapBounds?: string | null,
      name?: string | null,
      owner?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListDataSourceConnectionsQueryVariables = {
  filter?: ModelDataSourceConnectionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListDataSourceConnectionsQuery = {
  listDataSourceConnections?:  {
    __typename: "ModelDataSourceConnectionConnection",
    items:  Array< {
      __typename: "DataSourceConnection",
      catalogId?: string | null,
      connectionMetadata: string,
      createdAt: string,
      createdBy?: string | null,
      description?: string | null,
      id: string,
      lastQueryDate?: string | null,
      lastTestDate?: string | null,
      lastTestMessage?: string | null,
      lastTestStatus?: string | null,
      name: string,
      owner?: string | null,
      queryCount?: number | null,
      secretArn: string,
      status: DataSourceStatus,
      type: DataSourceType,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListDocumentsQueryVariables = {
  filter?: ModelDocumentFilterInput | null,
  id?: string | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListDocumentsQuery = {
  listDocuments?:  {
    __typename: "ModelDocumentConnection",
    items:  Array< {
      __typename: "Document",
      chatSessionId?: string | null,
      contentType: string,
      createdAt: string,
      description?: string | null,
      errorMessage?: string | null,
      fileSize?: number | null,
      id: string,
      metadata?: string | null,
      s3Bucket: string,
      s3Key: string,
      status?: DocumentStatus | null,
      title: string,
      updatedAt: string,
      uploadedAt: string,
      uploadedBy: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListFederatedCatalogsQueryVariables = {
  filter?: ModelFederatedCatalogFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListFederatedCatalogsQuery = {
  listFederatedCatalogs?:  {
    __typename: "ModelFederatedCatalogConnection",
    items:  Array< {
      __typename: "FederatedCatalog",
      catalogArn?: string | null,
      catalogName: string,
      connectionId: string,
      createdAt: string,
      databaseCount?: number | null,
      databases?: string | null,
      id: string,
      lastSyncDate?: string | null,
      owner?: string | null,
      tableCount?: number | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListFederatedQueryHistoriesQueryVariables = {
  filter?: ModelFederatedQueryHistoryFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListFederatedQueryHistoriesQuery = {
  listFederatedQueryHistories?:  {
    __typename: "ModelFederatedQueryHistoryConnection",
    items:  Array< {
      __typename: "FederatedQueryHistory",
      connectionId: string,
      createdAt: string,
      dataScanedBytes?: number | null,
      database?: string | null,
      errorMessage?: string | null,
      estimatedCostUSD?: number | null,
      executedBy?: string | null,
      executionTimeMs?: number | null,
      id: string,
      owner?: string | null,
      queryExecutionId?: string | null,
      queryString: string,
      rowCount?: number | null,
      status: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListMapLayerByChatSessionIdAndOrderQueryVariables = {
  chatSessionId: string,
  filter?: ModelMapLayerFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  order?: ModelIntKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListMapLayerByChatSessionIdAndOrderQuery = {
  listMapLayerByChatSessionIdAndOrder?:  {
    __typename: "ModelMapLayerConnection",
    items:  Array< {
      __typename: "MapLayer",
      athenaDatabase: string,
      athenaQuery: string,
      chatSessionId: string,
      createdAt?: string | null,
      description?: string | null,
      geoJsonMapping: string,
      id: string,
      lastQueryExecutedAt?: string | null,
      name: string,
      order?: number | null,
      owner?: string | null,
      queryError?: string | null,
      queryRefreshInterval?: number | null,
      source?: string | null,
      style?: string | null,
      type: MapLayerType,
      updatedAt?: string | null,
      visible?: boolean | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListMapLayersQueryVariables = {
  filter?: ModelMapLayerFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMapLayersQuery = {
  listMapLayers?:  {
    __typename: "ModelMapLayerConnection",
    items:  Array< {
      __typename: "MapLayer",
      athenaDatabase: string,
      athenaQuery: string,
      chatSessionId: string,
      createdAt?: string | null,
      description?: string | null,
      geoJsonMapping: string,
      id: string,
      lastQueryExecutedAt?: string | null,
      name: string,
      order?: number | null,
      owner?: string | null,
      queryError?: string | null,
      queryRefreshInterval?: number | null,
      source?: string | null,
      style?: string | null,
      type: MapLayerType,
      updatedAt?: string | null,
      visible?: boolean | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListMcpServersQueryVariables = {
  filter?: ModelMcpServerFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMcpServersQuery = {
  listMcpServers?:  {
    __typename: "ModelMcpServerConnection",
    items:  Array< {
      __typename: "McpServer",
      createdAt: string,
      enabled?: boolean | null,
      id: string,
      name: string,
      owner?: string | null,
      signRequestsWithAwsCreds?: boolean | null,
      updatedAt: string,
      url?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListRetrievalResultsQueryVariables = {
  filter?: ModelRetrievalResultFilterInput | null,
  id?: string | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListRetrievalResultsQuery = {
  listRetrievalResults?:  {
    __typename: "ModelRetrievalResultConnection",
    items:  Array< {
      __typename: "RetrievalResult",
      chatSessionId: string,
      createdAt: string,
      id: string,
      messageId: string,
      modelResponse?: string | null,
      query: string,
      retrievedAt: string,
      sources: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListSettingsQueryVariables = {
  filter?: ModelSettingsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSettingsQuery = {
  listSettings?:  {
    __typename: "ModelSettingsConnection",
    items:  Array< {
      __typename: "Settings",
      createdAt: string,
      id: string,
      name?: string | null,
      owner?: string | null,
      updatedAt: string,
      value?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListWorkoverJobsQueryVariables = {
  filter?: ModelWorkoverJobFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListWorkoverJobsQuery = {
  listWorkoverJobs?:  {
    __typename: "ModelWorkoverJobConnection",
    items:  Array< {
      __typename: "WorkoverJob",
      createdAt: string,
      description: string,
      estimatedCost: string,
      estimatedDuration: string,
      id: string,
      jobType: WorkoverJobType,
      location: string,
      owner?: string | null,
      priority: WorkoverJobPriority,
      rigAssigned?: string | null,
      scheduledDate: string,
      status: WorkoverJobStatus,
      updatedAt: string,
      wellName: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type RetrieveAndGenerateQueryVariables = {
  query: string,
};

export type RetrieveAndGenerateQuery = {
  retrieveAndGenerate?:  {
    __typename: "RetrieveAndGenerateReturnType",
    answer?: string | null,
    sources?: string | null,
  } | null,
};

export type CreateActionItemMutationVariables = {
  condition?: ModelActionItemConditionInput | null,
  input: CreateActionItemInput,
};

export type CreateActionItemMutation = {
  createActionItem?:  {
    __typename: "ActionItem",
    action: string,
    alertId: string,
    createdAt: string,
    description: string,
    expectedValue?: string | null,
    id: string,
    owner?: string | null,
    risk?: string | null,
    source: string,
    status: ActionItemStatus,
    type: ActionItemType,
    updatedAt: string,
  } | null,
};

export type CreateChatMessageMutationVariables = {
  condition?: ModelChatMessageConditionInput | null,
  input: CreateChatMessageInput,
};

export type CreateChatMessageMutation = {
  createChatMessage?:  {
    __typename: "ChatMessage",
    chatSession?:  {
      __typename: "ChatSession",
      createdAt: string,
      id: string,
      mapBounds?: string | null,
      name?: string | null,
      owner?: string | null,
      updatedAt: string,
    } | null,
    chatSessionId?: string | null,
    chatSessionIdUnderscoreAgentId?: string | null,
    createdAt?: string | null,
    id: string,
    metadata?: string | null,
    owner?: string | null,
    parts: string,
    responseComplete?: boolean | null,
    role: Roles,
    updatedAt: string,
  } | null,
};

export type CreateChatSessionMutationVariables = {
  condition?: ModelChatSessionConditionInput | null,
  input: CreateChatSessionInput,
};

export type CreateChatSessionMutation = {
  createChatSession?:  {
    __typename: "ChatSession",
    createdAt: string,
    id: string,
    mapBounds?: string | null,
    mapLayers?:  {
      __typename: "ModelMapLayerConnection",
      nextToken?: string | null,
    } | null,
    messages?:  {
      __typename: "ModelChatMessageConnection",
      nextToken?: string | null,
    } | null,
    name?: string | null,
    owner?: string | null,
    updatedAt: string,
  } | null,
};

export type CreateDataSourceConnectionMutationVariables = {
  condition?: ModelDataSourceConnectionConditionInput | null,
  input: CreateDataSourceConnectionInput,
};

export type CreateDataSourceConnectionMutation = {
  createDataSourceConnection?:  {
    __typename: "DataSourceConnection",
    catalogId?: string | null,
    catalogs?:  {
      __typename: "ModelFederatedCatalogConnection",
      nextToken?: string | null,
    } | null,
    connectionMetadata: string,
    createdAt: string,
    createdBy?: string | null,
    description?: string | null,
    id: string,
    lastQueryDate?: string | null,
    lastTestDate?: string | null,
    lastTestMessage?: string | null,
    lastTestStatus?: string | null,
    name: string,
    owner?: string | null,
    queryCount?: number | null,
    queryHistory?:  {
      __typename: "ModelFederatedQueryHistoryConnection",
      nextToken?: string | null,
    } | null,
    secretArn: string,
    status: DataSourceStatus,
    type: DataSourceType,
    updatedAt: string,
  } | null,
};

export type CreateDocumentMutationVariables = {
  condition?: ModelDocumentConditionInput | null,
  input: CreateDocumentInput,
};

export type CreateDocumentMutation = {
  createDocument?:  {
    __typename: "Document",
    chatSessionId?: string | null,
    contentType: string,
    createdAt: string,
    description?: string | null,
    errorMessage?: string | null,
    fileSize?: number | null,
    id: string,
    metadata?: string | null,
    s3Bucket: string,
    s3Key: string,
    status?: DocumentStatus | null,
    title: string,
    updatedAt: string,
    uploadedAt: string,
    uploadedBy: string,
  } | null,
};

export type CreateFederatedCatalogMutationVariables = {
  condition?: ModelFederatedCatalogConditionInput | null,
  input: CreateFederatedCatalogInput,
};

export type CreateFederatedCatalogMutation = {
  createFederatedCatalog?:  {
    __typename: "FederatedCatalog",
    catalogArn?: string | null,
    catalogName: string,
    connection?:  {
      __typename: "DataSourceConnection",
      catalogId?: string | null,
      connectionMetadata: string,
      createdAt: string,
      createdBy?: string | null,
      description?: string | null,
      id: string,
      lastQueryDate?: string | null,
      lastTestDate?: string | null,
      lastTestMessage?: string | null,
      lastTestStatus?: string | null,
      name: string,
      owner?: string | null,
      queryCount?: number | null,
      secretArn: string,
      status: DataSourceStatus,
      type: DataSourceType,
      updatedAt: string,
    } | null,
    connectionId: string,
    createdAt: string,
    databaseCount?: number | null,
    databases?: string | null,
    id: string,
    lastSyncDate?: string | null,
    owner?: string | null,
    tableCount?: number | null,
    updatedAt: string,
  } | null,
};

export type CreateFederatedQueryHistoryMutationVariables = {
  condition?: ModelFederatedQueryHistoryConditionInput | null,
  input: CreateFederatedQueryHistoryInput,
};

export type CreateFederatedQueryHistoryMutation = {
  createFederatedQueryHistory?:  {
    __typename: "FederatedQueryHistory",
    connection?:  {
      __typename: "DataSourceConnection",
      catalogId?: string | null,
      connectionMetadata: string,
      createdAt: string,
      createdBy?: string | null,
      description?: string | null,
      id: string,
      lastQueryDate?: string | null,
      lastTestDate?: string | null,
      lastTestMessage?: string | null,
      lastTestStatus?: string | null,
      name: string,
      owner?: string | null,
      queryCount?: number | null,
      secretArn: string,
      status: DataSourceStatus,
      type: DataSourceType,
      updatedAt: string,
    } | null,
    connectionId: string,
    createdAt: string,
    dataScanedBytes?: number | null,
    database?: string | null,
    errorMessage?: string | null,
    estimatedCostUSD?: number | null,
    executedBy?: string | null,
    executionTimeMs?: number | null,
    id: string,
    owner?: string | null,
    queryExecutionId?: string | null,
    queryString: string,
    rowCount?: number | null,
    status: string,
    updatedAt: string,
  } | null,
};

export type CreateMapLayerMutationVariables = {
  condition?: ModelMapLayerConditionInput | null,
  input: CreateMapLayerInput,
};

export type CreateMapLayerMutation = {
  createMapLayer?:  {
    __typename: "MapLayer",
    athenaDatabase: string,
    athenaQuery: string,
    chatSession?:  {
      __typename: "ChatSession",
      createdAt: string,
      id: string,
      mapBounds?: string | null,
      name?: string | null,
      owner?: string | null,
      updatedAt: string,
    } | null,
    chatSessionId: string,
    createdAt?: string | null,
    description?: string | null,
    geoJsonMapping: string,
    id: string,
    lastQueryExecutedAt?: string | null,
    name: string,
    order?: number | null,
    owner?: string | null,
    queryError?: string | null,
    queryRefreshInterval?: number | null,
    source?: string | null,
    style?: string | null,
    type: MapLayerType,
    updatedAt?: string | null,
    visible?: boolean | null,
  } | null,
};

export type CreateMcpServerMutationVariables = {
  condition?: ModelMcpServerConditionInput | null,
  input: CreateMcpServerInput,
};

export type CreateMcpServerMutation = {
  createMcpServer?:  {
    __typename: "McpServer",
    createdAt: string,
    enabled?: boolean | null,
    headers?:  Array< {
      __typename: "HeaderEntry",
      key?: string | null,
      value?: string | null,
    } | null > | null,
    id: string,
    name: string,
    owner?: string | null,
    signRequestsWithAwsCreds?: boolean | null,
    tools?:  Array< {
      __typename: "Tool",
      description?: string | null,
      name?: string | null,
      schema?: string | null,
    } | null > | null,
    updatedAt: string,
    url?: string | null,
  } | null,
};

export type CreateRetrievalResultMutationVariables = {
  condition?: ModelRetrievalResultConditionInput | null,
  input: CreateRetrievalResultInput,
};

export type CreateRetrievalResultMutation = {
  createRetrievalResult?:  {
    __typename: "RetrievalResult",
    chatSessionId: string,
    createdAt: string,
    id: string,
    messageId: string,
    modelResponse?: string | null,
    query: string,
    retrievedAt: string,
    sources: string,
    updatedAt: string,
  } | null,
};

export type CreateSettingsMutationVariables = {
  condition?: ModelSettingsConditionInput | null,
  input: CreateSettingsInput,
};

export type CreateSettingsMutation = {
  createSettings?:  {
    __typename: "Settings",
    createdAt: string,
    id: string,
    name?: string | null,
    owner?: string | null,
    updatedAt: string,
    value?: string | null,
  } | null,
};

export type CreateWorkoverJobMutationVariables = {
  condition?: ModelWorkoverJobConditionInput | null,
  input: CreateWorkoverJobInput,
};

export type CreateWorkoverJobMutation = {
  createWorkoverJob?:  {
    __typename: "WorkoverJob",
    createdAt: string,
    description: string,
    estimatedCost: string,
    estimatedDuration: string,
    financialMetrics:  {
      __typename: "FinancialMetrics",
      incrementalGasMCFD?: number | null,
      incrementalOilBOPD?: number | null,
      paybackMonths: number,
      presentValue: number,
      rateOfReturn: number,
    },
    id: string,
    jobType: WorkoverJobType,
    location: string,
    owner?: string | null,
    priority: WorkoverJobPriority,
    rigAssigned?: string | null,
    scheduledDate: string,
    status: WorkoverJobStatus,
    updatedAt: string,
    wellName: string,
  } | null,
};

export type DeleteActionItemMutationVariables = {
  condition?: ModelActionItemConditionInput | null,
  input: DeleteActionItemInput,
};

export type DeleteActionItemMutation = {
  deleteActionItem?:  {
    __typename: "ActionItem",
    action: string,
    alertId: string,
    createdAt: string,
    description: string,
    expectedValue?: string | null,
    id: string,
    owner?: string | null,
    risk?: string | null,
    source: string,
    status: ActionItemStatus,
    type: ActionItemType,
    updatedAt: string,
  } | null,
};

export type DeleteChatMessageMutationVariables = {
  condition?: ModelChatMessageConditionInput | null,
  input: DeleteChatMessageInput,
};

export type DeleteChatMessageMutation = {
  deleteChatMessage?:  {
    __typename: "ChatMessage",
    chatSession?:  {
      __typename: "ChatSession",
      createdAt: string,
      id: string,
      mapBounds?: string | null,
      name?: string | null,
      owner?: string | null,
      updatedAt: string,
    } | null,
    chatSessionId?: string | null,
    chatSessionIdUnderscoreAgentId?: string | null,
    createdAt?: string | null,
    id: string,
    metadata?: string | null,
    owner?: string | null,
    parts: string,
    responseComplete?: boolean | null,
    role: Roles,
    updatedAt: string,
  } | null,
};

export type DeleteChatSessionMutationVariables = {
  condition?: ModelChatSessionConditionInput | null,
  input: DeleteChatSessionInput,
};

export type DeleteChatSessionMutation = {
  deleteChatSession?:  {
    __typename: "ChatSession",
    createdAt: string,
    id: string,
    mapBounds?: string | null,
    mapLayers?:  {
      __typename: "ModelMapLayerConnection",
      nextToken?: string | null,
    } | null,
    messages?:  {
      __typename: "ModelChatMessageConnection",
      nextToken?: string | null,
    } | null,
    name?: string | null,
    owner?: string | null,
    updatedAt: string,
  } | null,
};

export type DeleteDataSourceConnectionMutationVariables = {
  condition?: ModelDataSourceConnectionConditionInput | null,
  input: DeleteDataSourceConnectionInput,
};

export type DeleteDataSourceConnectionMutation = {
  deleteDataSourceConnection?:  {
    __typename: "DataSourceConnection",
    catalogId?: string | null,
    catalogs?:  {
      __typename: "ModelFederatedCatalogConnection",
      nextToken?: string | null,
    } | null,
    connectionMetadata: string,
    createdAt: string,
    createdBy?: string | null,
    description?: string | null,
    id: string,
    lastQueryDate?: string | null,
    lastTestDate?: string | null,
    lastTestMessage?: string | null,
    lastTestStatus?: string | null,
    name: string,
    owner?: string | null,
    queryCount?: number | null,
    queryHistory?:  {
      __typename: "ModelFederatedQueryHistoryConnection",
      nextToken?: string | null,
    } | null,
    secretArn: string,
    status: DataSourceStatus,
    type: DataSourceType,
    updatedAt: string,
  } | null,
};

export type DeleteDocumentMutationVariables = {
  condition?: ModelDocumentConditionInput | null,
  input: DeleteDocumentInput,
};

export type DeleteDocumentMutation = {
  deleteDocument?:  {
    __typename: "Document",
    chatSessionId?: string | null,
    contentType: string,
    createdAt: string,
    description?: string | null,
    errorMessage?: string | null,
    fileSize?: number | null,
    id: string,
    metadata?: string | null,
    s3Bucket: string,
    s3Key: string,
    status?: DocumentStatus | null,
    title: string,
    updatedAt: string,
    uploadedAt: string,
    uploadedBy: string,
  } | null,
};

export type DeleteFederatedCatalogMutationVariables = {
  condition?: ModelFederatedCatalogConditionInput | null,
  input: DeleteFederatedCatalogInput,
};

export type DeleteFederatedCatalogMutation = {
  deleteFederatedCatalog?:  {
    __typename: "FederatedCatalog",
    catalogArn?: string | null,
    catalogName: string,
    connection?:  {
      __typename: "DataSourceConnection",
      catalogId?: string | null,
      connectionMetadata: string,
      createdAt: string,
      createdBy?: string | null,
      description?: string | null,
      id: string,
      lastQueryDate?: string | null,
      lastTestDate?: string | null,
      lastTestMessage?: string | null,
      lastTestStatus?: string | null,
      name: string,
      owner?: string | null,
      queryCount?: number | null,
      secretArn: string,
      status: DataSourceStatus,
      type: DataSourceType,
      updatedAt: string,
    } | null,
    connectionId: string,
    createdAt: string,
    databaseCount?: number | null,
    databases?: string | null,
    id: string,
    lastSyncDate?: string | null,
    owner?: string | null,
    tableCount?: number | null,
    updatedAt: string,
  } | null,
};

export type DeleteFederatedQueryHistoryMutationVariables = {
  condition?: ModelFederatedQueryHistoryConditionInput | null,
  input: DeleteFederatedQueryHistoryInput,
};

export type DeleteFederatedQueryHistoryMutation = {
  deleteFederatedQueryHistory?:  {
    __typename: "FederatedQueryHistory",
    connection?:  {
      __typename: "DataSourceConnection",
      catalogId?: string | null,
      connectionMetadata: string,
      createdAt: string,
      createdBy?: string | null,
      description?: string | null,
      id: string,
      lastQueryDate?: string | null,
      lastTestDate?: string | null,
      lastTestMessage?: string | null,
      lastTestStatus?: string | null,
      name: string,
      owner?: string | null,
      queryCount?: number | null,
      secretArn: string,
      status: DataSourceStatus,
      type: DataSourceType,
      updatedAt: string,
    } | null,
    connectionId: string,
    createdAt: string,
    dataScanedBytes?: number | null,
    database?: string | null,
    errorMessage?: string | null,
    estimatedCostUSD?: number | null,
    executedBy?: string | null,
    executionTimeMs?: number | null,
    id: string,
    owner?: string | null,
    queryExecutionId?: string | null,
    queryString: string,
    rowCount?: number | null,
    status: string,
    updatedAt: string,
  } | null,
};

export type DeleteMapLayerMutationVariables = {
  condition?: ModelMapLayerConditionInput | null,
  input: DeleteMapLayerInput,
};

export type DeleteMapLayerMutation = {
  deleteMapLayer?:  {
    __typename: "MapLayer",
    athenaDatabase: string,
    athenaQuery: string,
    chatSession?:  {
      __typename: "ChatSession",
      createdAt: string,
      id: string,
      mapBounds?: string | null,
      name?: string | null,
      owner?: string | null,
      updatedAt: string,
    } | null,
    chatSessionId: string,
    createdAt?: string | null,
    description?: string | null,
    geoJsonMapping: string,
    id: string,
    lastQueryExecutedAt?: string | null,
    name: string,
    order?: number | null,
    owner?: string | null,
    queryError?: string | null,
    queryRefreshInterval?: number | null,
    source?: string | null,
    style?: string | null,
    type: MapLayerType,
    updatedAt?: string | null,
    visible?: boolean | null,
  } | null,
};

export type DeleteMcpServerMutationVariables = {
  condition?: ModelMcpServerConditionInput | null,
  input: DeleteMcpServerInput,
};

export type DeleteMcpServerMutation = {
  deleteMcpServer?:  {
    __typename: "McpServer",
    createdAt: string,
    enabled?: boolean | null,
    headers?:  Array< {
      __typename: "HeaderEntry",
      key?: string | null,
      value?: string | null,
    } | null > | null,
    id: string,
    name: string,
    owner?: string | null,
    signRequestsWithAwsCreds?: boolean | null,
    tools?:  Array< {
      __typename: "Tool",
      description?: string | null,
      name?: string | null,
      schema?: string | null,
    } | null > | null,
    updatedAt: string,
    url?: string | null,
  } | null,
};

export type DeleteRetrievalResultMutationVariables = {
  condition?: ModelRetrievalResultConditionInput | null,
  input: DeleteRetrievalResultInput,
};

export type DeleteRetrievalResultMutation = {
  deleteRetrievalResult?:  {
    __typename: "RetrievalResult",
    chatSessionId: string,
    createdAt: string,
    id: string,
    messageId: string,
    modelResponse?: string | null,
    query: string,
    retrievedAt: string,
    sources: string,
    updatedAt: string,
  } | null,
};

export type DeleteSettingsMutationVariables = {
  condition?: ModelSettingsConditionInput | null,
  input: DeleteSettingsInput,
};

export type DeleteSettingsMutation = {
  deleteSettings?:  {
    __typename: "Settings",
    createdAt: string,
    id: string,
    name?: string | null,
    owner?: string | null,
    updatedAt: string,
    value?: string | null,
  } | null,
};

export type DeleteWorkoverJobMutationVariables = {
  condition?: ModelWorkoverJobConditionInput | null,
  input: DeleteWorkoverJobInput,
};

export type DeleteWorkoverJobMutation = {
  deleteWorkoverJob?:  {
    __typename: "WorkoverJob",
    createdAt: string,
    description: string,
    estimatedCost: string,
    estimatedDuration: string,
    financialMetrics:  {
      __typename: "FinancialMetrics",
      incrementalGasMCFD?: number | null,
      incrementalOilBOPD?: number | null,
      paybackMonths: number,
      presentValue: number,
      rateOfReturn: number,
    },
    id: string,
    jobType: WorkoverJobType,
    location: string,
    owner?: string | null,
    priority: WorkoverJobPriority,
    rigAssigned?: string | null,
    scheduledDate: string,
    status: WorkoverJobStatus,
    updatedAt: string,
    wellName: string,
  } | null,
};

export type ExecuteAthenaQueryMutationVariables = {
  catalog?: string | null,
  database?: string | null,
  nextToken?: string | null,
  outputLocation?: string | null,
  queryExecutionId?: string | null,
  queryString?: string | null,
};

export type ExecuteAthenaQueryMutation = {
  executeAthenaQuery?:  {
    __typename: "AthenaQueryResult",
    columns?: Array< string | null > | null,
    data?: string | null,
    error?: string | null,
    nextToken?: string | null,
    queryExecutionId: string,
    rowCount?: number | null,
    status: AthenaQueryStatus,
  } | null,
};

export type ExecuteMapLayerQueryMutationVariables = {
  database: string,
  geoJsonMapping: string,
  layerId?: string | null,
  queryString: string,
};

export type ExecuteMapLayerQueryMutation = {
  executeMapLayerQuery?:  {
    __typename: "MapLayerQueryResult",
    error?: string | null,
    geoJsonData?: string | null,
    rowCount?: number | null,
    success: boolean,
  } | null,
};

export type ManageDataSourceConnectionMutationVariables = {
  action: string,
  input: string,
};

export type ManageDataSourceConnectionMutation = {
  manageDataSourceConnection?:  {
    __typename: "ConnectionOperationResult",
    catalogName?: string | null,
    error?: string | null,
    message?: string | null,
    secretArn?: string | null,
    success: boolean,
  } | null,
};

export type UpdateActionItemMutationVariables = {
  condition?: ModelActionItemConditionInput | null,
  input: UpdateActionItemInput,
};

export type UpdateActionItemMutation = {
  updateActionItem?:  {
    __typename: "ActionItem",
    action: string,
    alertId: string,
    createdAt: string,
    description: string,
    expectedValue?: string | null,
    id: string,
    owner?: string | null,
    risk?: string | null,
    source: string,
    status: ActionItemStatus,
    type: ActionItemType,
    updatedAt: string,
  } | null,
};

export type UpdateChatMessageMutationVariables = {
  condition?: ModelChatMessageConditionInput | null,
  input: UpdateChatMessageInput,
};

export type UpdateChatMessageMutation = {
  updateChatMessage?:  {
    __typename: "ChatMessage",
    chatSession?:  {
      __typename: "ChatSession",
      createdAt: string,
      id: string,
      mapBounds?: string | null,
      name?: string | null,
      owner?: string | null,
      updatedAt: string,
    } | null,
    chatSessionId?: string | null,
    chatSessionIdUnderscoreAgentId?: string | null,
    createdAt?: string | null,
    id: string,
    metadata?: string | null,
    owner?: string | null,
    parts: string,
    responseComplete?: boolean | null,
    role: Roles,
    updatedAt: string,
  } | null,
};

export type UpdateChatSessionMutationVariables = {
  condition?: ModelChatSessionConditionInput | null,
  input: UpdateChatSessionInput,
};

export type UpdateChatSessionMutation = {
  updateChatSession?:  {
    __typename: "ChatSession",
    createdAt: string,
    id: string,
    mapBounds?: string | null,
    mapLayers?:  {
      __typename: "ModelMapLayerConnection",
      nextToken?: string | null,
    } | null,
    messages?:  {
      __typename: "ModelChatMessageConnection",
      nextToken?: string | null,
    } | null,
    name?: string | null,
    owner?: string | null,
    updatedAt: string,
  } | null,
};

export type UpdateDataSourceConnectionMutationVariables = {
  condition?: ModelDataSourceConnectionConditionInput | null,
  input: UpdateDataSourceConnectionInput,
};

export type UpdateDataSourceConnectionMutation = {
  updateDataSourceConnection?:  {
    __typename: "DataSourceConnection",
    catalogId?: string | null,
    catalogs?:  {
      __typename: "ModelFederatedCatalogConnection",
      nextToken?: string | null,
    } | null,
    connectionMetadata: string,
    createdAt: string,
    createdBy?: string | null,
    description?: string | null,
    id: string,
    lastQueryDate?: string | null,
    lastTestDate?: string | null,
    lastTestMessage?: string | null,
    lastTestStatus?: string | null,
    name: string,
    owner?: string | null,
    queryCount?: number | null,
    queryHistory?:  {
      __typename: "ModelFederatedQueryHistoryConnection",
      nextToken?: string | null,
    } | null,
    secretArn: string,
    status: DataSourceStatus,
    type: DataSourceType,
    updatedAt: string,
  } | null,
};

export type UpdateDocumentMutationVariables = {
  condition?: ModelDocumentConditionInput | null,
  input: UpdateDocumentInput,
};

export type UpdateDocumentMutation = {
  updateDocument?:  {
    __typename: "Document",
    chatSessionId?: string | null,
    contentType: string,
    createdAt: string,
    description?: string | null,
    errorMessage?: string | null,
    fileSize?: number | null,
    id: string,
    metadata?: string | null,
    s3Bucket: string,
    s3Key: string,
    status?: DocumentStatus | null,
    title: string,
    updatedAt: string,
    uploadedAt: string,
    uploadedBy: string,
  } | null,
};

export type UpdateFederatedCatalogMutationVariables = {
  condition?: ModelFederatedCatalogConditionInput | null,
  input: UpdateFederatedCatalogInput,
};

export type UpdateFederatedCatalogMutation = {
  updateFederatedCatalog?:  {
    __typename: "FederatedCatalog",
    catalogArn?: string | null,
    catalogName: string,
    connection?:  {
      __typename: "DataSourceConnection",
      catalogId?: string | null,
      connectionMetadata: string,
      createdAt: string,
      createdBy?: string | null,
      description?: string | null,
      id: string,
      lastQueryDate?: string | null,
      lastTestDate?: string | null,
      lastTestMessage?: string | null,
      lastTestStatus?: string | null,
      name: string,
      owner?: string | null,
      queryCount?: number | null,
      secretArn: string,
      status: DataSourceStatus,
      type: DataSourceType,
      updatedAt: string,
    } | null,
    connectionId: string,
    createdAt: string,
    databaseCount?: number | null,
    databases?: string | null,
    id: string,
    lastSyncDate?: string | null,
    owner?: string | null,
    tableCount?: number | null,
    updatedAt: string,
  } | null,
};

export type UpdateFederatedQueryHistoryMutationVariables = {
  condition?: ModelFederatedQueryHistoryConditionInput | null,
  input: UpdateFederatedQueryHistoryInput,
};

export type UpdateFederatedQueryHistoryMutation = {
  updateFederatedQueryHistory?:  {
    __typename: "FederatedQueryHistory",
    connection?:  {
      __typename: "DataSourceConnection",
      catalogId?: string | null,
      connectionMetadata: string,
      createdAt: string,
      createdBy?: string | null,
      description?: string | null,
      id: string,
      lastQueryDate?: string | null,
      lastTestDate?: string | null,
      lastTestMessage?: string | null,
      lastTestStatus?: string | null,
      name: string,
      owner?: string | null,
      queryCount?: number | null,
      secretArn: string,
      status: DataSourceStatus,
      type: DataSourceType,
      updatedAt: string,
    } | null,
    connectionId: string,
    createdAt: string,
    dataScanedBytes?: number | null,
    database?: string | null,
    errorMessage?: string | null,
    estimatedCostUSD?: number | null,
    executedBy?: string | null,
    executionTimeMs?: number | null,
    id: string,
    owner?: string | null,
    queryExecutionId?: string | null,
    queryString: string,
    rowCount?: number | null,
    status: string,
    updatedAt: string,
  } | null,
};

export type UpdateMapLayerMutationVariables = {
  condition?: ModelMapLayerConditionInput | null,
  input: UpdateMapLayerInput,
};

export type UpdateMapLayerMutation = {
  updateMapLayer?:  {
    __typename: "MapLayer",
    athenaDatabase: string,
    athenaQuery: string,
    chatSession?:  {
      __typename: "ChatSession",
      createdAt: string,
      id: string,
      mapBounds?: string | null,
      name?: string | null,
      owner?: string | null,
      updatedAt: string,
    } | null,
    chatSessionId: string,
    createdAt?: string | null,
    description?: string | null,
    geoJsonMapping: string,
    id: string,
    lastQueryExecutedAt?: string | null,
    name: string,
    order?: number | null,
    owner?: string | null,
    queryError?: string | null,
    queryRefreshInterval?: number | null,
    source?: string | null,
    style?: string | null,
    type: MapLayerType,
    updatedAt?: string | null,
    visible?: boolean | null,
  } | null,
};

export type UpdateMcpServerMutationVariables = {
  condition?: ModelMcpServerConditionInput | null,
  input: UpdateMcpServerInput,
};

export type UpdateMcpServerMutation = {
  updateMcpServer?:  {
    __typename: "McpServer",
    createdAt: string,
    enabled?: boolean | null,
    headers?:  Array< {
      __typename: "HeaderEntry",
      key?: string | null,
      value?: string | null,
    } | null > | null,
    id: string,
    name: string,
    owner?: string | null,
    signRequestsWithAwsCreds?: boolean | null,
    tools?:  Array< {
      __typename: "Tool",
      description?: string | null,
      name?: string | null,
      schema?: string | null,
    } | null > | null,
    updatedAt: string,
    url?: string | null,
  } | null,
};

export type UpdateRetrievalResultMutationVariables = {
  condition?: ModelRetrievalResultConditionInput | null,
  input: UpdateRetrievalResultInput,
};

export type UpdateRetrievalResultMutation = {
  updateRetrievalResult?:  {
    __typename: "RetrievalResult",
    chatSessionId: string,
    createdAt: string,
    id: string,
    messageId: string,
    modelResponse?: string | null,
    query: string,
    retrievedAt: string,
    sources: string,
    updatedAt: string,
  } | null,
};

export type UpdateSettingsMutationVariables = {
  condition?: ModelSettingsConditionInput | null,
  input: UpdateSettingsInput,
};

export type UpdateSettingsMutation = {
  updateSettings?:  {
    __typename: "Settings",
    createdAt: string,
    id: string,
    name?: string | null,
    owner?: string | null,
    updatedAt: string,
    value?: string | null,
  } | null,
};

export type UpdateWorkoverJobMutationVariables = {
  condition?: ModelWorkoverJobConditionInput | null,
  input: UpdateWorkoverJobInput,
};

export type UpdateWorkoverJobMutation = {
  updateWorkoverJob?:  {
    __typename: "WorkoverJob",
    createdAt: string,
    description: string,
    estimatedCost: string,
    estimatedDuration: string,
    financialMetrics:  {
      __typename: "FinancialMetrics",
      incrementalGasMCFD?: number | null,
      incrementalOilBOPD?: number | null,
      paybackMonths: number,
      presentValue: number,
      rateOfReturn: number,
    },
    id: string,
    jobType: WorkoverJobType,
    location: string,
    owner?: string | null,
    priority: WorkoverJobPriority,
    rigAssigned?: string | null,
    scheduledDate: string,
    status: WorkoverJobStatus,
    updatedAt: string,
    wellName: string,
  } | null,
};

export type OnAthenaQueryResultSubscriptionVariables = {
  queryExecutionId: string,
};

export type OnAthenaQueryResultSubscription = {
  onAthenaQueryResult?:  {
    __typename: "AthenaQueryResult",
    columns?: Array< string | null > | null,
    data?: string | null,
    error?: string | null,
    nextToken?: string | null,
    queryExecutionId: string,
    rowCount?: number | null,
    status: AthenaQueryStatus,
  } | null,
};

export type OnCreateActionItemSubscriptionVariables = {
  filter?: ModelSubscriptionActionItemFilterInput | null,
  owner?: string | null,
};

export type OnCreateActionItemSubscription = {
  onCreateActionItem?:  {
    __typename: "ActionItem",
    action: string,
    alertId: string,
    createdAt: string,
    description: string,
    expectedValue?: string | null,
    id: string,
    owner?: string | null,
    risk?: string | null,
    source: string,
    status: ActionItemStatus,
    type: ActionItemType,
    updatedAt: string,
  } | null,
};

export type OnCreateChatMessageSubscriptionVariables = {
  filter?: ModelSubscriptionChatMessageFilterInput | null,
  owner?: string | null,
};

export type OnCreateChatMessageSubscription = {
  onCreateChatMessage?:  {
    __typename: "ChatMessage",
    chatSession?:  {
      __typename: "ChatSession",
      createdAt: string,
      id: string,
      mapBounds?: string | null,
      name?: string | null,
      owner?: string | null,
      updatedAt: string,
    } | null,
    chatSessionId?: string | null,
    chatSessionIdUnderscoreAgentId?: string | null,
    createdAt?: string | null,
    id: string,
    metadata?: string | null,
    owner?: string | null,
    parts: string,
    responseComplete?: boolean | null,
    role: Roles,
    updatedAt: string,
  } | null,
};

export type OnCreateChatSessionSubscriptionVariables = {
  filter?: ModelSubscriptionChatSessionFilterInput | null,
  owner?: string | null,
};

export type OnCreateChatSessionSubscription = {
  onCreateChatSession?:  {
    __typename: "ChatSession",
    createdAt: string,
    id: string,
    mapBounds?: string | null,
    mapLayers?:  {
      __typename: "ModelMapLayerConnection",
      nextToken?: string | null,
    } | null,
    messages?:  {
      __typename: "ModelChatMessageConnection",
      nextToken?: string | null,
    } | null,
    name?: string | null,
    owner?: string | null,
    updatedAt: string,
  } | null,
};

export type OnCreateDataSourceConnectionSubscriptionVariables = {
  filter?: ModelSubscriptionDataSourceConnectionFilterInput | null,
  owner?: string | null,
};

export type OnCreateDataSourceConnectionSubscription = {
  onCreateDataSourceConnection?:  {
    __typename: "DataSourceConnection",
    catalogId?: string | null,
    catalogs?:  {
      __typename: "ModelFederatedCatalogConnection",
      nextToken?: string | null,
    } | null,
    connectionMetadata: string,
    createdAt: string,
    createdBy?: string | null,
    description?: string | null,
    id: string,
    lastQueryDate?: string | null,
    lastTestDate?: string | null,
    lastTestMessage?: string | null,
    lastTestStatus?: string | null,
    name: string,
    owner?: string | null,
    queryCount?: number | null,
    queryHistory?:  {
      __typename: "ModelFederatedQueryHistoryConnection",
      nextToken?: string | null,
    } | null,
    secretArn: string,
    status: DataSourceStatus,
    type: DataSourceType,
    updatedAt: string,
  } | null,
};

export type OnCreateDocumentSubscriptionVariables = {
  filter?: ModelSubscriptionDocumentFilterInput | null,
};

export type OnCreateDocumentSubscription = {
  onCreateDocument?:  {
    __typename: "Document",
    chatSessionId?: string | null,
    contentType: string,
    createdAt: string,
    description?: string | null,
    errorMessage?: string | null,
    fileSize?: number | null,
    id: string,
    metadata?: string | null,
    s3Bucket: string,
    s3Key: string,
    status?: DocumentStatus | null,
    title: string,
    updatedAt: string,
    uploadedAt: string,
    uploadedBy: string,
  } | null,
};

export type OnCreateFederatedCatalogSubscriptionVariables = {
  filter?: ModelSubscriptionFederatedCatalogFilterInput | null,
  owner?: string | null,
};

export type OnCreateFederatedCatalogSubscription = {
  onCreateFederatedCatalog?:  {
    __typename: "FederatedCatalog",
    catalogArn?: string | null,
    catalogName: string,
    connection?:  {
      __typename: "DataSourceConnection",
      catalogId?: string | null,
      connectionMetadata: string,
      createdAt: string,
      createdBy?: string | null,
      description?: string | null,
      id: string,
      lastQueryDate?: string | null,
      lastTestDate?: string | null,
      lastTestMessage?: string | null,
      lastTestStatus?: string | null,
      name: string,
      owner?: string | null,
      queryCount?: number | null,
      secretArn: string,
      status: DataSourceStatus,
      type: DataSourceType,
      updatedAt: string,
    } | null,
    connectionId: string,
    createdAt: string,
    databaseCount?: number | null,
    databases?: string | null,
    id: string,
    lastSyncDate?: string | null,
    owner?: string | null,
    tableCount?: number | null,
    updatedAt: string,
  } | null,
};

export type OnCreateFederatedQueryHistorySubscriptionVariables = {
  filter?: ModelSubscriptionFederatedQueryHistoryFilterInput | null,
  owner?: string | null,
};

export type OnCreateFederatedQueryHistorySubscription = {
  onCreateFederatedQueryHistory?:  {
    __typename: "FederatedQueryHistory",
    connection?:  {
      __typename: "DataSourceConnection",
      catalogId?: string | null,
      connectionMetadata: string,
      createdAt: string,
      createdBy?: string | null,
      description?: string | null,
      id: string,
      lastQueryDate?: string | null,
      lastTestDate?: string | null,
      lastTestMessage?: string | null,
      lastTestStatus?: string | null,
      name: string,
      owner?: string | null,
      queryCount?: number | null,
      secretArn: string,
      status: DataSourceStatus,
      type: DataSourceType,
      updatedAt: string,
    } | null,
    connectionId: string,
    createdAt: string,
    dataScanedBytes?: number | null,
    database?: string | null,
    errorMessage?: string | null,
    estimatedCostUSD?: number | null,
    executedBy?: string | null,
    executionTimeMs?: number | null,
    id: string,
    owner?: string | null,
    queryExecutionId?: string | null,
    queryString: string,
    rowCount?: number | null,
    status: string,
    updatedAt: string,
  } | null,
};

export type OnCreateMapLayerSubscriptionVariables = {
  filter?: ModelSubscriptionMapLayerFilterInput | null,
  owner?: string | null,
};

export type OnCreateMapLayerSubscription = {
  onCreateMapLayer?:  {
    __typename: "MapLayer",
    athenaDatabase: string,
    athenaQuery: string,
    chatSession?:  {
      __typename: "ChatSession",
      createdAt: string,
      id: string,
      mapBounds?: string | null,
      name?: string | null,
      owner?: string | null,
      updatedAt: string,
    } | null,
    chatSessionId: string,
    createdAt?: string | null,
    description?: string | null,
    geoJsonMapping: string,
    id: string,
    lastQueryExecutedAt?: string | null,
    name: string,
    order?: number | null,
    owner?: string | null,
    queryError?: string | null,
    queryRefreshInterval?: number | null,
    source?: string | null,
    style?: string | null,
    type: MapLayerType,
    updatedAt?: string | null,
    visible?: boolean | null,
  } | null,
};

export type OnCreateMcpServerSubscriptionVariables = {
  filter?: ModelSubscriptionMcpServerFilterInput | null,
  owner?: string | null,
};

export type OnCreateMcpServerSubscription = {
  onCreateMcpServer?:  {
    __typename: "McpServer",
    createdAt: string,
    enabled?: boolean | null,
    headers?:  Array< {
      __typename: "HeaderEntry",
      key?: string | null,
      value?: string | null,
    } | null > | null,
    id: string,
    name: string,
    owner?: string | null,
    signRequestsWithAwsCreds?: boolean | null,
    tools?:  Array< {
      __typename: "Tool",
      description?: string | null,
      name?: string | null,
      schema?: string | null,
    } | null > | null,
    updatedAt: string,
    url?: string | null,
  } | null,
};

export type OnCreateRetrievalResultSubscriptionVariables = {
  filter?: ModelSubscriptionRetrievalResultFilterInput | null,
};

export type OnCreateRetrievalResultSubscription = {
  onCreateRetrievalResult?:  {
    __typename: "RetrievalResult",
    chatSessionId: string,
    createdAt: string,
    id: string,
    messageId: string,
    modelResponse?: string | null,
    query: string,
    retrievedAt: string,
    sources: string,
    updatedAt: string,
  } | null,
};

export type OnCreateSettingsSubscriptionVariables = {
  filter?: ModelSubscriptionSettingsFilterInput | null,
  owner?: string | null,
};

export type OnCreateSettingsSubscription = {
  onCreateSettings?:  {
    __typename: "Settings",
    createdAt: string,
    id: string,
    name?: string | null,
    owner?: string | null,
    updatedAt: string,
    value?: string | null,
  } | null,
};

export type OnCreateWorkoverJobSubscriptionVariables = {
  filter?: ModelSubscriptionWorkoverJobFilterInput | null,
  owner?: string | null,
};

export type OnCreateWorkoverJobSubscription = {
  onCreateWorkoverJob?:  {
    __typename: "WorkoverJob",
    createdAt: string,
    description: string,
    estimatedCost: string,
    estimatedDuration: string,
    financialMetrics:  {
      __typename: "FinancialMetrics",
      incrementalGasMCFD?: number | null,
      incrementalOilBOPD?: number | null,
      paybackMonths: number,
      presentValue: number,
      rateOfReturn: number,
    },
    id: string,
    jobType: WorkoverJobType,
    location: string,
    owner?: string | null,
    priority: WorkoverJobPriority,
    rigAssigned?: string | null,
    scheduledDate: string,
    status: WorkoverJobStatus,
    updatedAt: string,
    wellName: string,
  } | null,
};

export type OnDeleteActionItemSubscriptionVariables = {
  filter?: ModelSubscriptionActionItemFilterInput | null,
  owner?: string | null,
};

export type OnDeleteActionItemSubscription = {
  onDeleteActionItem?:  {
    __typename: "ActionItem",
    action: string,
    alertId: string,
    createdAt: string,
    description: string,
    expectedValue?: string | null,
    id: string,
    owner?: string | null,
    risk?: string | null,
    source: string,
    status: ActionItemStatus,
    type: ActionItemType,
    updatedAt: string,
  } | null,
};

export type OnDeleteChatMessageSubscriptionVariables = {
  filter?: ModelSubscriptionChatMessageFilterInput | null,
  owner?: string | null,
};

export type OnDeleteChatMessageSubscription = {
  onDeleteChatMessage?:  {
    __typename: "ChatMessage",
    chatSession?:  {
      __typename: "ChatSession",
      createdAt: string,
      id: string,
      mapBounds?: string | null,
      name?: string | null,
      owner?: string | null,
      updatedAt: string,
    } | null,
    chatSessionId?: string | null,
    chatSessionIdUnderscoreAgentId?: string | null,
    createdAt?: string | null,
    id: string,
    metadata?: string | null,
    owner?: string | null,
    parts: string,
    responseComplete?: boolean | null,
    role: Roles,
    updatedAt: string,
  } | null,
};

export type OnDeleteChatSessionSubscriptionVariables = {
  filter?: ModelSubscriptionChatSessionFilterInput | null,
  owner?: string | null,
};

export type OnDeleteChatSessionSubscription = {
  onDeleteChatSession?:  {
    __typename: "ChatSession",
    createdAt: string,
    id: string,
    mapBounds?: string | null,
    mapLayers?:  {
      __typename: "ModelMapLayerConnection",
      nextToken?: string | null,
    } | null,
    messages?:  {
      __typename: "ModelChatMessageConnection",
      nextToken?: string | null,
    } | null,
    name?: string | null,
    owner?: string | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteDataSourceConnectionSubscriptionVariables = {
  filter?: ModelSubscriptionDataSourceConnectionFilterInput | null,
  owner?: string | null,
};

export type OnDeleteDataSourceConnectionSubscription = {
  onDeleteDataSourceConnection?:  {
    __typename: "DataSourceConnection",
    catalogId?: string | null,
    catalogs?:  {
      __typename: "ModelFederatedCatalogConnection",
      nextToken?: string | null,
    } | null,
    connectionMetadata: string,
    createdAt: string,
    createdBy?: string | null,
    description?: string | null,
    id: string,
    lastQueryDate?: string | null,
    lastTestDate?: string | null,
    lastTestMessage?: string | null,
    lastTestStatus?: string | null,
    name: string,
    owner?: string | null,
    queryCount?: number | null,
    queryHistory?:  {
      __typename: "ModelFederatedQueryHistoryConnection",
      nextToken?: string | null,
    } | null,
    secretArn: string,
    status: DataSourceStatus,
    type: DataSourceType,
    updatedAt: string,
  } | null,
};

export type OnDeleteDocumentSubscriptionVariables = {
  filter?: ModelSubscriptionDocumentFilterInput | null,
};

export type OnDeleteDocumentSubscription = {
  onDeleteDocument?:  {
    __typename: "Document",
    chatSessionId?: string | null,
    contentType: string,
    createdAt: string,
    description?: string | null,
    errorMessage?: string | null,
    fileSize?: number | null,
    id: string,
    metadata?: string | null,
    s3Bucket: string,
    s3Key: string,
    status?: DocumentStatus | null,
    title: string,
    updatedAt: string,
    uploadedAt: string,
    uploadedBy: string,
  } | null,
};

export type OnDeleteFederatedCatalogSubscriptionVariables = {
  filter?: ModelSubscriptionFederatedCatalogFilterInput | null,
  owner?: string | null,
};

export type OnDeleteFederatedCatalogSubscription = {
  onDeleteFederatedCatalog?:  {
    __typename: "FederatedCatalog",
    catalogArn?: string | null,
    catalogName: string,
    connection?:  {
      __typename: "DataSourceConnection",
      catalogId?: string | null,
      connectionMetadata: string,
      createdAt: string,
      createdBy?: string | null,
      description?: string | null,
      id: string,
      lastQueryDate?: string | null,
      lastTestDate?: string | null,
      lastTestMessage?: string | null,
      lastTestStatus?: string | null,
      name: string,
      owner?: string | null,
      queryCount?: number | null,
      secretArn: string,
      status: DataSourceStatus,
      type: DataSourceType,
      updatedAt: string,
    } | null,
    connectionId: string,
    createdAt: string,
    databaseCount?: number | null,
    databases?: string | null,
    id: string,
    lastSyncDate?: string | null,
    owner?: string | null,
    tableCount?: number | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteFederatedQueryHistorySubscriptionVariables = {
  filter?: ModelSubscriptionFederatedQueryHistoryFilterInput | null,
  owner?: string | null,
};

export type OnDeleteFederatedQueryHistorySubscription = {
  onDeleteFederatedQueryHistory?:  {
    __typename: "FederatedQueryHistory",
    connection?:  {
      __typename: "DataSourceConnection",
      catalogId?: string | null,
      connectionMetadata: string,
      createdAt: string,
      createdBy?: string | null,
      description?: string | null,
      id: string,
      lastQueryDate?: string | null,
      lastTestDate?: string | null,
      lastTestMessage?: string | null,
      lastTestStatus?: string | null,
      name: string,
      owner?: string | null,
      queryCount?: number | null,
      secretArn: string,
      status: DataSourceStatus,
      type: DataSourceType,
      updatedAt: string,
    } | null,
    connectionId: string,
    createdAt: string,
    dataScanedBytes?: number | null,
    database?: string | null,
    errorMessage?: string | null,
    estimatedCostUSD?: number | null,
    executedBy?: string | null,
    executionTimeMs?: number | null,
    id: string,
    owner?: string | null,
    queryExecutionId?: string | null,
    queryString: string,
    rowCount?: number | null,
    status: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteMapLayerSubscriptionVariables = {
  filter?: ModelSubscriptionMapLayerFilterInput | null,
  owner?: string | null,
};

export type OnDeleteMapLayerSubscription = {
  onDeleteMapLayer?:  {
    __typename: "MapLayer",
    athenaDatabase: string,
    athenaQuery: string,
    chatSession?:  {
      __typename: "ChatSession",
      createdAt: string,
      id: string,
      mapBounds?: string | null,
      name?: string | null,
      owner?: string | null,
      updatedAt: string,
    } | null,
    chatSessionId: string,
    createdAt?: string | null,
    description?: string | null,
    geoJsonMapping: string,
    id: string,
    lastQueryExecutedAt?: string | null,
    name: string,
    order?: number | null,
    owner?: string | null,
    queryError?: string | null,
    queryRefreshInterval?: number | null,
    source?: string | null,
    style?: string | null,
    type: MapLayerType,
    updatedAt?: string | null,
    visible?: boolean | null,
  } | null,
};

export type OnDeleteMcpServerSubscriptionVariables = {
  filter?: ModelSubscriptionMcpServerFilterInput | null,
  owner?: string | null,
};

export type OnDeleteMcpServerSubscription = {
  onDeleteMcpServer?:  {
    __typename: "McpServer",
    createdAt: string,
    enabled?: boolean | null,
    headers?:  Array< {
      __typename: "HeaderEntry",
      key?: string | null,
      value?: string | null,
    } | null > | null,
    id: string,
    name: string,
    owner?: string | null,
    signRequestsWithAwsCreds?: boolean | null,
    tools?:  Array< {
      __typename: "Tool",
      description?: string | null,
      name?: string | null,
      schema?: string | null,
    } | null > | null,
    updatedAt: string,
    url?: string | null,
  } | null,
};

export type OnDeleteRetrievalResultSubscriptionVariables = {
  filter?: ModelSubscriptionRetrievalResultFilterInput | null,
};

export type OnDeleteRetrievalResultSubscription = {
  onDeleteRetrievalResult?:  {
    __typename: "RetrievalResult",
    chatSessionId: string,
    createdAt: string,
    id: string,
    messageId: string,
    modelResponse?: string | null,
    query: string,
    retrievedAt: string,
    sources: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteSettingsSubscriptionVariables = {
  filter?: ModelSubscriptionSettingsFilterInput | null,
  owner?: string | null,
};

export type OnDeleteSettingsSubscription = {
  onDeleteSettings?:  {
    __typename: "Settings",
    createdAt: string,
    id: string,
    name?: string | null,
    owner?: string | null,
    updatedAt: string,
    value?: string | null,
  } | null,
};

export type OnDeleteWorkoverJobSubscriptionVariables = {
  filter?: ModelSubscriptionWorkoverJobFilterInput | null,
  owner?: string | null,
};

export type OnDeleteWorkoverJobSubscription = {
  onDeleteWorkoverJob?:  {
    __typename: "WorkoverJob",
    createdAt: string,
    description: string,
    estimatedCost: string,
    estimatedDuration: string,
    financialMetrics:  {
      __typename: "FinancialMetrics",
      incrementalGasMCFD?: number | null,
      incrementalOilBOPD?: number | null,
      paybackMonths: number,
      presentValue: number,
      rateOfReturn: number,
    },
    id: string,
    jobType: WorkoverJobType,
    location: string,
    owner?: string | null,
    priority: WorkoverJobPriority,
    rigAssigned?: string | null,
    scheduledDate: string,
    status: WorkoverJobStatus,
    updatedAt: string,
    wellName: string,
  } | null,
};

export type OnUpdateActionItemSubscriptionVariables = {
  filter?: ModelSubscriptionActionItemFilterInput | null,
  owner?: string | null,
};

export type OnUpdateActionItemSubscription = {
  onUpdateActionItem?:  {
    __typename: "ActionItem",
    action: string,
    alertId: string,
    createdAt: string,
    description: string,
    expectedValue?: string | null,
    id: string,
    owner?: string | null,
    risk?: string | null,
    source: string,
    status: ActionItemStatus,
    type: ActionItemType,
    updatedAt: string,
  } | null,
};

export type OnUpdateChatMessageSubscriptionVariables = {
  filter?: ModelSubscriptionChatMessageFilterInput | null,
  owner?: string | null,
};

export type OnUpdateChatMessageSubscription = {
  onUpdateChatMessage?:  {
    __typename: "ChatMessage",
    chatSession?:  {
      __typename: "ChatSession",
      createdAt: string,
      id: string,
      mapBounds?: string | null,
      name?: string | null,
      owner?: string | null,
      updatedAt: string,
    } | null,
    chatSessionId?: string | null,
    chatSessionIdUnderscoreAgentId?: string | null,
    createdAt?: string | null,
    id: string,
    metadata?: string | null,
    owner?: string | null,
    parts: string,
    responseComplete?: boolean | null,
    role: Roles,
    updatedAt: string,
  } | null,
};

export type OnUpdateChatSessionSubscriptionVariables = {
  filter?: ModelSubscriptionChatSessionFilterInput | null,
  owner?: string | null,
};

export type OnUpdateChatSessionSubscription = {
  onUpdateChatSession?:  {
    __typename: "ChatSession",
    createdAt: string,
    id: string,
    mapBounds?: string | null,
    mapLayers?:  {
      __typename: "ModelMapLayerConnection",
      nextToken?: string | null,
    } | null,
    messages?:  {
      __typename: "ModelChatMessageConnection",
      nextToken?: string | null,
    } | null,
    name?: string | null,
    owner?: string | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateDataSourceConnectionSubscriptionVariables = {
  filter?: ModelSubscriptionDataSourceConnectionFilterInput | null,
  owner?: string | null,
};

export type OnUpdateDataSourceConnectionSubscription = {
  onUpdateDataSourceConnection?:  {
    __typename: "DataSourceConnection",
    catalogId?: string | null,
    catalogs?:  {
      __typename: "ModelFederatedCatalogConnection",
      nextToken?: string | null,
    } | null,
    connectionMetadata: string,
    createdAt: string,
    createdBy?: string | null,
    description?: string | null,
    id: string,
    lastQueryDate?: string | null,
    lastTestDate?: string | null,
    lastTestMessage?: string | null,
    lastTestStatus?: string | null,
    name: string,
    owner?: string | null,
    queryCount?: number | null,
    queryHistory?:  {
      __typename: "ModelFederatedQueryHistoryConnection",
      nextToken?: string | null,
    } | null,
    secretArn: string,
    status: DataSourceStatus,
    type: DataSourceType,
    updatedAt: string,
  } | null,
};

export type OnUpdateDocumentSubscriptionVariables = {
  filter?: ModelSubscriptionDocumentFilterInput | null,
};

export type OnUpdateDocumentSubscription = {
  onUpdateDocument?:  {
    __typename: "Document",
    chatSessionId?: string | null,
    contentType: string,
    createdAt: string,
    description?: string | null,
    errorMessage?: string | null,
    fileSize?: number | null,
    id: string,
    metadata?: string | null,
    s3Bucket: string,
    s3Key: string,
    status?: DocumentStatus | null,
    title: string,
    updatedAt: string,
    uploadedAt: string,
    uploadedBy: string,
  } | null,
};

export type OnUpdateFederatedCatalogSubscriptionVariables = {
  filter?: ModelSubscriptionFederatedCatalogFilterInput | null,
  owner?: string | null,
};

export type OnUpdateFederatedCatalogSubscription = {
  onUpdateFederatedCatalog?:  {
    __typename: "FederatedCatalog",
    catalogArn?: string | null,
    catalogName: string,
    connection?:  {
      __typename: "DataSourceConnection",
      catalogId?: string | null,
      connectionMetadata: string,
      createdAt: string,
      createdBy?: string | null,
      description?: string | null,
      id: string,
      lastQueryDate?: string | null,
      lastTestDate?: string | null,
      lastTestMessage?: string | null,
      lastTestStatus?: string | null,
      name: string,
      owner?: string | null,
      queryCount?: number | null,
      secretArn: string,
      status: DataSourceStatus,
      type: DataSourceType,
      updatedAt: string,
    } | null,
    connectionId: string,
    createdAt: string,
    databaseCount?: number | null,
    databases?: string | null,
    id: string,
    lastSyncDate?: string | null,
    owner?: string | null,
    tableCount?: number | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateFederatedQueryHistorySubscriptionVariables = {
  filter?: ModelSubscriptionFederatedQueryHistoryFilterInput | null,
  owner?: string | null,
};

export type OnUpdateFederatedQueryHistorySubscription = {
  onUpdateFederatedQueryHistory?:  {
    __typename: "FederatedQueryHistory",
    connection?:  {
      __typename: "DataSourceConnection",
      catalogId?: string | null,
      connectionMetadata: string,
      createdAt: string,
      createdBy?: string | null,
      description?: string | null,
      id: string,
      lastQueryDate?: string | null,
      lastTestDate?: string | null,
      lastTestMessage?: string | null,
      lastTestStatus?: string | null,
      name: string,
      owner?: string | null,
      queryCount?: number | null,
      secretArn: string,
      status: DataSourceStatus,
      type: DataSourceType,
      updatedAt: string,
    } | null,
    connectionId: string,
    createdAt: string,
    dataScanedBytes?: number | null,
    database?: string | null,
    errorMessage?: string | null,
    estimatedCostUSD?: number | null,
    executedBy?: string | null,
    executionTimeMs?: number | null,
    id: string,
    owner?: string | null,
    queryExecutionId?: string | null,
    queryString: string,
    rowCount?: number | null,
    status: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateMapLayerSubscriptionVariables = {
  filter?: ModelSubscriptionMapLayerFilterInput | null,
  owner?: string | null,
};

export type OnUpdateMapLayerSubscription = {
  onUpdateMapLayer?:  {
    __typename: "MapLayer",
    athenaDatabase: string,
    athenaQuery: string,
    chatSession?:  {
      __typename: "ChatSession",
      createdAt: string,
      id: string,
      mapBounds?: string | null,
      name?: string | null,
      owner?: string | null,
      updatedAt: string,
    } | null,
    chatSessionId: string,
    createdAt?: string | null,
    description?: string | null,
    geoJsonMapping: string,
    id: string,
    lastQueryExecutedAt?: string | null,
    name: string,
    order?: number | null,
    owner?: string | null,
    queryError?: string | null,
    queryRefreshInterval?: number | null,
    source?: string | null,
    style?: string | null,
    type: MapLayerType,
    updatedAt?: string | null,
    visible?: boolean | null,
  } | null,
};

export type OnUpdateMcpServerSubscriptionVariables = {
  filter?: ModelSubscriptionMcpServerFilterInput | null,
  owner?: string | null,
};

export type OnUpdateMcpServerSubscription = {
  onUpdateMcpServer?:  {
    __typename: "McpServer",
    createdAt: string,
    enabled?: boolean | null,
    headers?:  Array< {
      __typename: "HeaderEntry",
      key?: string | null,
      value?: string | null,
    } | null > | null,
    id: string,
    name: string,
    owner?: string | null,
    signRequestsWithAwsCreds?: boolean | null,
    tools?:  Array< {
      __typename: "Tool",
      description?: string | null,
      name?: string | null,
      schema?: string | null,
    } | null > | null,
    updatedAt: string,
    url?: string | null,
  } | null,
};

export type OnUpdateRetrievalResultSubscriptionVariables = {
  filter?: ModelSubscriptionRetrievalResultFilterInput | null,
};

export type OnUpdateRetrievalResultSubscription = {
  onUpdateRetrievalResult?:  {
    __typename: "RetrievalResult",
    chatSessionId: string,
    createdAt: string,
    id: string,
    messageId: string,
    modelResponse?: string | null,
    query: string,
    retrievedAt: string,
    sources: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateSettingsSubscriptionVariables = {
  filter?: ModelSubscriptionSettingsFilterInput | null,
  owner?: string | null,
};

export type OnUpdateSettingsSubscription = {
  onUpdateSettings?:  {
    __typename: "Settings",
    createdAt: string,
    id: string,
    name?: string | null,
    owner?: string | null,
    updatedAt: string,
    value?: string | null,
  } | null,
};

export type OnUpdateWorkoverJobSubscriptionVariables = {
  filter?: ModelSubscriptionWorkoverJobFilterInput | null,
  owner?: string | null,
};

export type OnUpdateWorkoverJobSubscription = {
  onUpdateWorkoverJob?:  {
    __typename: "WorkoverJob",
    createdAt: string,
    description: string,
    estimatedCost: string,
    estimatedDuration: string,
    financialMetrics:  {
      __typename: "FinancialMetrics",
      incrementalGasMCFD?: number | null,
      incrementalOilBOPD?: number | null,
      paybackMonths: number,
      presentValue: number,
      rateOfReturn: number,
    },
    id: string,
    jobType: WorkoverJobType,
    location: string,
    owner?: string | null,
    priority: WorkoverJobPriority,
    rigAssigned?: string | null,
    scheduledDate: string,
    status: WorkoverJobStatus,
    updatedAt: string,
    wellName: string,
  } | null,
};
