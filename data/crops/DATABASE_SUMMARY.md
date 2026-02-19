# Garden Coach Crop Database - Summary

## Database Structure

**Total Entries**: 21 crop files
- **11 general crop files** (base crop types in `data/crops/`)
- **10 specific variety files** (detailed varieties in `data/crops/varieties/`)

## Two-Tier System

### Tier 1: General Crops (`data/crops/*.json`)
Base crop types with common attributes across all varieties:
- Tomato (Standard)
- Tomato (Heat-Tolerant)
- Bell Pepper
- Jalapeño Pepper
- Lettuce (Leaf)
- Bush Beans (Green)
- Carrot
- Okra
- Basil
- Cilantro
- Parsley

### Tier 2: Specific Varieties (`data/crops/varieties/*.json`)
Detailed variety-specific information for precise plant selection:

#### Tomatoes (5 varieties)
- **Cherokee Purple** - 72 days, heirloom beefsteak, 8-12 oz fruits, moderate heat tolerance
- **Sungold** - 62 days, hybrid cherry, exceptionally sweet (9+ Brix), moderate heat
- **San Marzano II** - 80 days, paste/sauce, classic Italian, moderate heat
- **Red Brandywine** - 78 days, 1 lb beefsteak, low heat tolerance, best spring/fall
- **Phoenix** - 70 days, heat-tolerant hybrid, sets fruit at 97°F, perfect for Austin summers

#### Peppers (1 variety)
- **California Wonder** - 75 days, standard bell pepper, thick-walled, high heat tolerance

#### Beans (1 variety)
- **Blue Lake 274** - 55 days, bush bean, stringless, moderate heat tolerance

#### Lettuce (1 variety)
- **Jericho** - 48 days, heat-tolerant romaine, bolt-resistant, high heat tolerance

#### Okra (1 variety)
- **Clemson Spineless** - 55 days, very heat-tolerant (105°F), perfect for hot climates

#### Basil (1 variety)
- **Genovese Compact Improved** - 74 days, classic Italian, compact growth, high heat tolerance

## Heat Tolerance Ratings

### Very High (105°F+)
- Phoenix Tomato
- Clemson Spineless Okra

### High (90-95°F)
- California Wonder Pepper
- Jericho Lettuce
- Genovese Basil

### Moderate (85-90°F)
- Cherokee Purple Tomato
- Sungold Tomato
- San Marzano II Tomato
- Blue Lake Bean

### Low (<85°F)
- Red Brandywine Tomato (spring/fall only)

## Data Sources

All variety data sourced from reputable seed companies and extension services:
- Johnny's Selected Seeds (comprehensive variety charts)
- Baker Creek Heirloom Seeds
- Seed Savers Exchange
- Texas A&M AgriLife Extension
- University extension services (Georgia, Clemson, Iowa State, etc.)
- Fafard gardening resources

## Key Attributes Tracked

Each variety includes:
- **Growing info**: days to harvest, spacing, depth, sun/water requirements, growth habit
- **Temperature tolerance**: germination temps, optimal range, max fruit-set temp, heat/cold ratings
- **Planting schedule**: method (direct seed/transplant), timing relative to frost dates
- **Yield info**: per plant or per foot, harvest window, fruit size/texture
- **Disease resistance**: specific resistances noted
- **Flavor profile**: detailed taste descriptions
- **Best uses**: recommended cooking/eating methods
- **Source URLs**: links to original research

## Query Examples

```bash
# Find all very high heat-tolerant varieties
jq -r 'select(.temperature_tolerance.heat_tolerance_rating == "very_high") | .variety_name' data/crops/varieties/*.json

# List varieties by days to harvest
jq -r '"\(.growing_info.days_to_harvest) days: \(.variety_name)"' data/crops/varieties/*.json | sort -n

# Find varieties suitable for Austin summer (>90°F)
jq -r 'select(.temperature_tolerance.max_fruit_set_temp_f > 90) | "\(.variety_name): \(.temperature_tolerance.max_fruit_set_temp_f)°F"' data/crops/varieties/*.json

# Get all heirloom varieties
jq -r 'select(.seed_type | contains("heirloom")) | .variety_name' data/crops/varieties/*.json
```

## Next Steps

To expand the database:
1. Add more tomato varieties (Heatwave II, Arkansas Traveler, Black Krim, etc.)
2. Add pepper varieties (Jalapeño, Serrano, Poblano, specialty bells)
3. Add lettuce varieties (Red Sails, Buttercrunch, Oak Leaf)
4. Add herb varieties (Thai Basil, Lemon Basil, Italian Parsley)
5. Add cool-season crops (kale, broccoli, peas, spinach)
6. Add melons and squash varieties
