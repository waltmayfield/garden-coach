import { a } from '@aws-amplify/backend';

/**
 * Map Schema
 * Models for managing map layers and visualizations
 */
export const mapSchema = a.schema({
  
  MapLayerType: a.enum(["point", "line", "polygon", "heatmap", "geojson"]),

  MapLayer: a.model({
    chatSessionId: a.id().required(),
    chatSession: a.belongsTo("ChatSession", "chatSessionId"),
    
    // Layer metadata
    name: a.string().required(),
    type: a.ref("MapLayerType").required(),
    visible: a.boolean().default(true),
    
    // Query-based layer support
    athenaQuery: a.string().required(), // SQL query to generate GeoJSON
    athenaDatabase: a.string().required(), // Database for the query
    queryRefreshInterval: a.integer(), // Minutes between auto-refresh (0 = manual only)
    lastQueryExecutedAt: a.datetime(), // Track when query was last run
    queryError: a.string(), // Store any query execution errors
    
    // GeoJSON mapping configuration for query results
    geoJsonMapping: a.json().required(), // Instructions for converting query results to GeoJSON
    // Example: { 
    //   geometryType: "Point",
    //   longitudeField: "longitude", 
    //   latitudeField: "latitude",
    //   propertyFields: ["name", "status", "type"]
    // }
    
    // Style configuration (colors, icons, stroke width, etc.)
    style: a.json(),
    
    // Layer order for z-index
    order: a.integer().default(0),
    
    // Metadata from AI
    description: a.string(),
    source: a.string(), // e.g., "user-input", "ai-analysis", "athena-query"
    
    // Auto-generated fields
    owner: a.string(),
    createdAt: a.datetime(),
    updatedAt: a.datetime(),
  })
    .secondaryIndexes((index) => [
      index("chatSessionId").sortKeys(["order"])
    ])
    .authorization((allow) => [
      allow.owner(), 
      allow.authenticated().to(["read", "create", "update", "delete"]), 
      allow.guest().to(["read"])
    ]),

  // GeoJSON mapping configuration type
  GeoJsonMappingConfig: a.customType({
    geometryType: a.string().required(), // "Point", "LineString", "Polygon"
    longitudeField: a.string(), // For Point geometry
    latitudeField: a.string(), // For Point geometry
    coordinatesField: a.string(), // For LineString/Polygon (field containing coordinate array)
    propertyFields: a.string().array(), // Fields to include in feature properties
  }),
});
