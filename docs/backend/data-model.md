# Garden Coach — Data Model

## Core Entities

### User
The gardener using the app.

```
User {
  id: uuid (PK)
  email: string (unique, indexed)
  username: string (unique, nullable, indexed)
  display_name: string
  avatar_url: string (nullable)
  location: {
    zip_code: string
    hardiness_zone: string (e.g., "7a")
    lat: float (nullable)
    lng: float (nullable)
    last_frost_date: date (nullable, computed from zip/lat-lng)
    first_frost_date: date (nullable, computed from zip/lat-lng)
  }
  preferences: {
    units: enum (metric, imperial)
    notification_enabled: boolean
    privacy_level: enum (public, friends, private)
  }
  created_at: timestamp
  updated_at: timestamp
  last_active_at: timestamp
}
```

**Indexes**: `email`, `username`, `location.zip_code`, `location.hardiness_zone`

---

### Garden
A physical growing space belonging to a user.

```
Garden {
  id: uuid (PK)
  user_id: uuid (FK -> User.id)
  name: string
  description: text (nullable)
  type: enum (raised_bed, in_ground, container, greenhouse, indoor, other)
  dimensions: {
    length: float (nullable)
    width: float (nullable)
    area_sqft: float (nullable, computed or manual)
  }
  sun_exposure: enum (full_sun, partial_sun, partial_shade, full_shade)
  y_axis_degrees: float (default: 0, clockwise from true north for positive Y axis; 0 = north, 90 = east)
  default_view_rotation_degrees: float (default: 0, clockwise UI rotation used for initial visualization only)
  soil_type: enum (clay, loam, sand, silt, mix, unknown) (nullable)
  water_source: enum (hose, drip, rain, well, municipal, other) (nullable)
  location: {
    zip_code: string
    hardiness_zone: string
  }
  coordinate_system: enum (meters, feet) (default: meters)
  is_active: boolean (default: true)
  created_at: timestamp
  updated_at: timestamp
}
```

**Indexes**: `user_id`, `is_active`

---

### GardenZone
Named sub-areas inside a garden for structured placement and rendering.

```
GardenZone {
  id: uuid (PK)
  garden_id: uuid (FK -> Garden.id)

  name: string (e.g., "Bed A", "Row 3", "Container West")
  zone_type: enum (bed, row, container, section, other)

  geometry: {
    x: float (required, zone origin in garden coordinate system)
    y: float (required, zone origin in garden coordinate system)
    width: float (required)
    height: float (required)
    rotation_degrees: float (nullable)
  }

  display_order: int (default: 0)
  is_active: boolean (default: true)

  created_at: timestamp
  updated_at: timestamp
}
```

**Indexes**: `garden_id`, `zone_type`, `is_active`, `display_order`

---

### Crop
Reference catalog of general crop types. Provides default values that can be overridden by specific Varieties.

```
Crop {
  id: uuid (PK)
  common_name: string (indexed)
  scientific_name: string (nullable)
  category: enum (vegetable, fruit, herb, flower, other)
  
  growing_info: {
    days_to_germination: int (nullable, default value)
    days_to_harvest: int (nullable, default value - varieties can override)
    spacing_inches: float (nullable, default value - varieties can override)
    row_spacing_inches: float (nullable)
    depth_inches: float (nullable)
    sun_requirement: enum (full_sun, partial_sun, partial_shade, shade)
    water_frequency: enum (daily, every_2_days, every_3_days, weekly, low)
  }
  
  temperature_tolerance: {
    min_germination_temp_f: int (nullable)
    optimal_growth_temp_range_f: [int, int] (nullable, e.g., [60, 85])
    max_fruit_set_temp_f: int (nullable, default - varieties can override)
    max_night_temp_for_fruit_set_f: int (nullable)
    heat_tolerance_rating: enum (very_low, low, moderate, high, very_high) (nullable, default)
    cold_tolerance_rating: enum (very_low, low, moderate, high, very_high) (nullable)
  } (nullable)
  
  planting_schedule: {
    method: enum (direct_seed, transplant, both)
    indoor_start_weeks_before_last_frost: int (nullable)
    outdoor_plant_weeks_relative_to_last_frost: int (can be negative for before, positive for after)
    succession_planting_interval_weeks: int (nullable, for continuous harvest)
    fall_planting_weeks_before_first_frost: int (nullable)
  } (nullable)
  
  yield_info: {
    avg_yield_per_plant: float (nullable, in lbs or count)
    avg_yield_per_foot: float (nullable, for row crops)
    yield_unit: enum (lbs, oz, kg, count, bunches)
    harvest_window_days: int (nullable, how long plant produces)
  } (nullable)
  
  companion_plants: uuid[] (FK -> Crop.id, nullable)
  antagonist_plants: uuid[] (FK -> Crop.id, nullable)
  
  image_url: string (nullable)
  description: text (nullable)
  
  created_at: timestamp
  updated_at: timestamp
}
```

**Indexes**: `common_name`, `category`

**Note**: Most Crops will have associated Varieties for specific recommendations.

---

### Variety
Specific cultivars/varieties of a Crop with distinct characteristics. Inherits defaults from parent Crop.

```
Variety {
  id: uuid (PK)
  crop_id: uuid (FK -> Crop.id, indexed)
  variety_name: string (indexed, e.g., "Cherokee Purple", "Sungold")
  common_name: string (e.g., "Cherokee Purple Tomato")
  scientific_name: string (nullable, usually same as parent crop)
  seed_type: enum (hybrid, heirloom, open_pollinated)
  
  growing_info: {
    days_to_germination: int (nullable, overrides crop default)
    days_to_harvest: int (nullable, overrides crop default - CRITICAL for variety differences)
    spacing_inches: float (nullable, overrides crop default - varies with growth habit)
    row_spacing_inches: float (nullable, overrides crop default)
    depth_inches: float (nullable, overrides crop default)
    sun_requirement: enum (full_sun, partial_sun, partial_shade, shade) (nullable, overrides)
    water_frequency: enum (daily, every_2_days, every_3_days, weekly, low) (nullable, overrides)
  } (nullable, if null use parent Crop defaults)
  
  temperature_tolerance: {
    min_germination_temp_f: int (nullable, overrides)
    optimal_growth_temp_range_f: [int, int] (nullable, overrides)
    max_fruit_set_temp_f: int (nullable, CRITICAL - e.g., Phoenix 97°F vs Brandywine 88°F)
    max_night_temp_for_fruit_set_f: int (nullable, overrides)
    heat_tolerance_rating: enum (very_low, low, moderate, high, very_high) (nullable, overrides)
    cold_tolerance_rating: enum (very_low, low, moderate, high, very_high) (nullable, overrides)
  } (nullable, if null use parent Crop defaults)
  
  growth_habit: string (nullable, e.g., "determinate", "indeterminate", "bush", "vining", "compact", "dwarf")
  fruit_size: string (nullable, e.g., "large", "medium", "small", "1 oz", "8-12 oz")
  fruit_description: text (nullable, e.g., "Deep purplish-red beefsteak, meaty")
  flavor_profile: text (nullable, e.g., "Sweet, rich, complex old-fashioned tomato flavor")
  
  disease_resistance: string[] (nullable, e.g., ["verticillium_wilt", "fusarium_wilt", "powdery_mildew"])
  best_uses: string[] (nullable, e.g., ["fresh_eating", "slicing", "sauce", "canning"])
  special_characteristics: text (nullable, unique features, awards, history)
  
  yield_info: {
    avg_yield_per_plant: float (nullable, overrides crop default - variety-specific productivity)
    avg_yield_per_foot: float (nullable, overrides crop default)
    yield_unit: enum (lbs, oz, kg, count, bunches) (nullable, overrides crop default)
    harvest_window_days: int (nullable, overrides crop default)
  } (nullable, if null use parent Crop defaults)
  
  source_urls: string[] (nullable, seed company URLs for purchasing)
  
  created_at: timestamp
  updated_at: timestamp
}
```

**Indexes**: `crop_id`, `variety_name`, `seed_type`

**Query Pattern**: 
```javascript
// Application logic merges variety overrides with crop defaults
const effectiveDaysToHarvest = variety.growing_info?.days_to_harvest 
                            ?? crop.growing_info.days_to_harvest;
const effectiveHeatTolerance = variety.temperature_tolerance?.heat_tolerance_rating 
                            ?? crop.temperature_tolerance?.heat_tolerance_rating;
```

---

### Planting
An instance of a crop planted in a garden.

```
Planting {
  id: uuid (PK)
  garden_id: uuid (FK -> Garden.id)
  crop_id: uuid (FK -> Crop.id)
  variety_id: uuid (FK -> Variety.id, nullable)
  zone_id: uuid (FK -> GardenZone.id, nullable)
  
  quantity: int (nullable, number of plants for transplants)
  row_length_ft: float (nullable, for direct-seeded crops)
  location_note: string (nullable, e.g., "north corner", "bed 2")
  placement: {
    x: float (nullable, plant/row anchor in garden or zone coordinates)
    y: float (nullable)
    width: float (nullable, occupied width in selected coordinate system)
    height: float (nullable, occupied height in selected coordinate system)
    row_index: int (nullable, for row layouts)
    slot_index: int (nullable, for row/slot layouts)
    anchor: enum (center, top_left, top_right, bottom_left, bottom_right) (default: center)
  } (nullable)
  
  planted_date: date (nullable, when seeds/transplants went in)
  germination_date: date (nullable)
  first_harvest_date: date (nullable)
  last_harvest_date: date (nullable)
  removed_date: date (nullable, when plant removed/died)
  
  status: enum (planned, seeded, germinated, transplanted, growing, harvesting, finished, failed)
  
  notes: text (nullable)
  
  created_at: timestamp
  updated_at: timestamp
}
```

**Indexes**: `garden_id`, `zone_id`, `crop_id`, `variety_id`, `status`, `planted_date`

**Note**: `variety_id` is nullable for backwards compatibility, but recommended to specify for accurate recommendations.

---

### Task
Actionable to-do items for gardens.

```
Task {
  id: uuid (PK)
  garden_id: uuid (FK -> Garden.id, nullable for user-level tasks)
  planting_id: uuid (FK -> Planting.id, nullable)
  user_id: uuid (FK -> User.id)
  
  title: string
  description: text (nullable)
  task_type: enum (water, fertilize, prune, weed, harvest, pest_control, plant, transplant, mulch, other)
  
  due_date: date (nullable)
  scheduled_time: time (nullable)
  
  status: enum (pending, in_progress, completed, skipped, cancelled)
  completed_at: timestamp (nullable)
  
  priority: enum (low, medium, high)
  
  recurrence: {
    enabled: boolean
    frequency: enum (daily, weekly, biweekly, monthly, custom)
    interval: int (nullable, for custom frequency)
    end_date: date (nullable)
  } (nullable)
  
  created_at: timestamp
  updated_at: timestamp
}
```

**Indexes**: `user_id`, `garden_id`, `status`, `due_date`, `planting_id`

---

### Harvest
Records of produce harvested from plantings.

```
Harvest {
  id: uuid (PK)
  planting_id: uuid (FK -> Planting.id)
  user_id: uuid (FK -> User.id)
  
  harvest_date: date
  quantity: float
  unit: enum (lbs, oz, kg, g, count, bunches, heads, other)
  
  quality: enum (excellent, good, fair, poor) (nullable)
  notes: text (nullable)
  image_url: string (nullable)
  
  created_at: timestamp
  updated_at: timestamp
}
```

**Indexes**: `planting_id`, `user_id`, `harvest_date`

---

### Post
Social feed posts for sharing garden updates.

```
Post {
  id: uuid (PK)
  user_id: uuid (FK -> User.id)
  garden_id: uuid (FK -> Garden.id, nullable)
  planting_id: uuid (FK -> Planting.id, nullable)
  harvest_id: uuid (FK -> Harvest.id, nullable)
  
  content: text
  images: string[] (array of image URLs)
  
  visibility: enum (public, followers, private)
  
  like_count: int (default: 0, denormalized)
  comment_count: int (default: 0, denormalized)
  
  created_at: timestamp
  updated_at: timestamp
}
```

**Indexes**: `user_id`, `created_at` (for feed sorting), `visibility`

---

### Comment
Comments on posts.

```
Comment {
  id: uuid (PK)
  post_id: uuid (FK -> Post.id)
  user_id: uuid (FK -> User.id)
  parent_comment_id: uuid (FK -> Comment.id, nullable, for replies)
  
  content: text
  
  like_count: int (default: 0)
  
  created_at: timestamp
  updated_at: timestamp
}
```

**Indexes**: `post_id`, `user_id`, `parent_comment_id`

---

### Like
Likes on posts or comments.

```
Like {
  id: uuid (PK)
  user_id: uuid (FK -> User.id)
  
  likeable_type: enum (post, comment)
  likeable_id: uuid (polymorphic FK)
  
  created_at: timestamp
}
```

**Indexes**: `user_id`, composite unique index on `(user_id, likeable_type, likeable_id)`

---

### Follow
User follow relationships.

```
Follow {
  id: uuid (PK)
  follower_id: uuid (FK -> User.id)
  following_id: uuid (FK -> User.id)
  
  created_at: timestamp
}
```

**Indexes**: composite unique on `(follower_id, following_id)`, `following_id`

---

### CropListing
Crops offered for trade/sale by users.

```
CropListing {
  id: uuid (PK)
  user_id: uuid (FK -> User.id)
  planting_id: uuid (FK -> Planting.id, nullable)
  crop_id: uuid (FK -> Crop.id)
  
  title: string
  description: text (nullable)
  quantity: float
  unit: enum (lbs, oz, kg, g, count, bunches, heads, other)
  
  listing_type: enum (trade, free, sale)
  price: float (nullable, for sale listings)
  currency: string (nullable, e.g., "USD")
  
  location: {
    zip_code: string
    pickup_instructions: text (nullable)
  }
  
  status: enum (active, pending, completed, cancelled)
  available_date: date (nullable)
  expiration_date: date (nullable)
  
  images: string[] (array of image URLs)
  
  created_at: timestamp
  updated_at: timestamp
}
```

**Indexes**: `user_id`, `crop_id`, `status`, `location.zip_code`, `available_date`

---

### Trade
A trade/exchange transaction between users.

```
Trade {
  id: uuid (PK)
  listing_id: uuid (FK -> CropListing.id)
  requester_id: uuid (FK -> User.id)
  owner_id: uuid (FK -> User.id)
  
  status: enum (requested, accepted, declined, completed, cancelled)
  
  offered_items: jsonb (nullable, what requester offers in trade)
  message: text (nullable)
  
  accepted_at: timestamp (nullable)
  completed_at: timestamp (nullable)
  
  created_at: timestamp
  updated_at: timestamp
}
```

**Indexes**: `listing_id`, `requester_id`, `owner_id`, `status`

---

### PlantingPlan
Seasonal planting plans/templates generated or saved by user.

```
PlantingPlan {
  id: uuid (PK)
  user_id: uuid (FK -> User.id)
  garden_id: uuid (FK -> Garden.id, nullable)
  
  name: string
  season: enum (spring, summer, fall, winter, year_round)
  year: int
  
  is_template: boolean (default: false)
  is_active: boolean (default: true)
  
  crops: jsonb (array of {crop_id, variety_id, quantity, plant_date, harvest_date_estimate})
  preview_start_date: date (nullable, baseline date for simulation)
  simulation_assumptions: jsonb (nullable, weather/growth assumptions for deterministic previews)
  
  notes: text (nullable)
  
  created_at: timestamp
  updated_at: timestamp
}
```

**Indexes**: `user_id`, `garden_id`, `is_active`, `season`

---

### PlanStep
Ordered proposed actions used to preview how a garden changes over time.

```
PlanStep {
  id: uuid (PK)
  planting_plan_id: uuid (FK -> PlantingPlan.id)
  garden_id: uuid (FK -> Garden.id)

  step_number: int (required, unique within a planting plan)
  action_type: enum (plant, transplant, harvest, remove, prune, thin, amend_soil, irrigate, other)
  status: enum (proposed, approved, applied, skipped) (default: proposed)

  effective_date: date (nullable, planned execution date)
  title: string
  description: text (nullable)

  target: {
    planting_id: uuid (nullable, for existing plantings)
    crop_id: uuid (nullable, for new planting proposals)
    variety_id: uuid (nullable)
    zone_id: uuid (nullable)
  }

  delta: {
    quantity_change: int (nullable, e.g., -2 for remove/thin)
    placement_override: jsonb (nullable, same shape as Planting.placement)
    expected_status_after_step: enum (planned, seeded, germinated, transplanted, growing, harvesting, finished, failed) (nullable)
  } (nullable)

  metadata: jsonb (nullable, planner/agent rationale)

  created_at: timestamp
  updated_at: timestamp
}
```

**Indexes**: `planting_plan_id`, composite unique on `(planting_plan_id, step_number)`, `garden_id`, `action_type`, `status`, `effective_date`

---

### PlanPreviewSnapshot
Materialized "what the garden looks like" state after each proposed step.

```
PlanPreviewSnapshot {
  id: uuid (PK)
  planting_plan_id: uuid (FK -> PlantingPlan.id)
  plan_step_id: uuid (FK -> PlanStep.id)
  garden_id: uuid (FK -> Garden.id)

  snapshot_type: enum (before_step, after_step)
  as_of_date: date

  rendered_state: jsonb (required, normalized array of visual items with crop/variety, placement, and state)
  change_summary: jsonb (nullable, added/updated/removed items for diff view)

  generated_by: enum (system, user, agent)
  generated_at: timestamp
}
```

**Indexes**: `planting_plan_id`, `plan_step_id`, `garden_id`, composite unique on `(plan_step_id, snapshot_type)`

---

### Notification
User notifications.

```
Notification {
  id: uuid (PK)
  user_id: uuid (FK -> User.id)
  
  type: enum (task_due, harvest_ready, comment, like, follow, trade_request, system)
  
  title: string
  message: text
  
  related_type: enum (task, post, comment, trade, harvest, user, other) (nullable)
  related_id: uuid (nullable)
  
  is_read: boolean (default: false)
  read_at: timestamp (nullable)
  
  created_at: timestamp
}
```

**Indexes**: `user_id`, `is_read`, `created_at`

---

## Relationships Summary

```
User (1) ----< (many) Garden
User (1) ----< (many) Task
User (1) ----< (many) Post
User (1) ----< (many) CropListing
User (1) ----< (many) Notification

Garden (1) ----< (many) Planting
Garden (1) ----< (many) Task
Garden (1) ----< (many) PlantingPlan
Garden (1) ----< (many) GardenZone
GardenZone (1) ----< (many) Planting

Crop (1) ----< (many) Planting
Crop (1) ----< (many) CropListing

Planting (1) ----< (many) Task
Planting (1) ----< (many) Harvest

Post (1) ----< (many) Comment
Post (1) ----< (many) Like

CropListing (1) ----< (many) Trade

PlantingPlan (1) ----< (many) PlanStep
PlanStep (1) ----< (many) PlanPreviewSnapshot

User (many) ----< Follow >---- (many) User
```

---

## Design Notes

### Normalization & Performance
- Denormalized counts (`like_count`, `comment_count`) on `Post` for fast feed rendering; updated via triggers or application logic
- Consider read replicas for feed queries
- `location.zip_code` and `location.hardiness_zone` indexed for localized queries (trading, community features)

### Extensibility
- `Crop` table is a reference catalog; can be seeded from USDA/extension service data and augmented by admins
- `PlantingPlan.crops` stored as JSONB for flexibility; can be normalized later if complex queries needed
- `Task.recurrence` JSONB allows future expansion without schema changes

### Temporal Previews & Visualization
- Keep `PlanStep.step_number` immutable once published to preserve deterministic replay
- Generate and cache `PlanPreviewSnapshot` for each step (`before_step` and `after_step`) to avoid recomputing every UI interaction
- Use `Garden.coordinate_system` + `GardenZone.geometry` + `Planting.placement` to support 2D rendering regardless of bed/container layout
- Use `Garden.y_axis_degrees` as the canonical coordinate-axis direction and `Garden.default_view_rotation_degrees` for initial UI framing
- Store only normalized scene state in `rendered_state`; derive presentation-only values (colors, icons) in the frontend

### Privacy & Security
- `User.preferences.privacy_level` controls post visibility and profile discoverability
- `Post.visibility` allows granular sharing
- `CropListing.location` only shares zip code, not exact address

### Scalability Considerations
- Partition `Task` and `Notification` by `user_id` if scaling to millions of users
- Archive old `Harvest` and `Post` records annually
- Use CDN for `images` arrays (store URLs, not blobs)

### Future Extensions
- Weather integration: add `WeatherEvent` table linked to gardens
- Sensors: add `SensorReading` table for IoT devices
- Achievements/badges: add `Achievement` and `UserAchievement` tables
- Messages: add `Conversation` and `Message` tables for direct messaging

---

## Recommended Tech Stack

**Database**: PostgreSQL (JSONB support, strong indexing, spatial extensions for future location features)

**ORM/Query Builder**: 
- Prisma (TypeScript/Node.js) — great DX, type safety
- SQLAlchemy (Python) — mature, flexible
- Ent (Go) — code-gen schema-first

**Caching**: Redis for session, feed cache, real-time notifications

**File Storage**: S3 or Cloudflare R2 for images

**Search**: Elasticsearch or Typesense for crop/user search (optional, can start with Postgres full-text)

---

## Next Steps

1. Choose stack (Node.js/Python/Go)
2. Set up PostgreSQL + migration tool
3. Seed `Crop` table with common vegetables/herbs
4. Build initial API endpoints for User, Garden, Planting, Task
5. Implement task generator logic (natural language → tasks)
