# Crop Database Build Tracking

## Planned Categories

### Vegetables
- [ ] Tomatoes (heat-tolerant and standard varieties)
- [ ] Peppers (bell, jalapeño, serrano)
- [ ] Lettuce (heat-tolerant varieties)
- [ ] Carrots
- [ ] Beans (bush, pole)
- [ ] Squash (summer, zucchini)
- [ ] Cucumbers
- [ ] Onions
- [ ] Radishes
- [ ] Kale
- [ ] Broccoli
- [ ] Cauliflower
- [ ] Spinach
- [ ] Peas
- [ ] Corn
- [ ] Okra (heat-loving)
- [ ] Sweet Potatoes (heat-loving)

### Herbs
- [ ] Basil
- [ ] Cilantro/Coriander
- [ ] Parsley
- [ ] Mint
- [ ] Oregano
- [ ] Thyme
- [ ] Rosemary
- [ ] Dill
- [ ] Sage

### Fruits (common garden fruits)
- [ ] Strawberries
- [ ] Melons (watermelon, cantaloupe)

## Completed Crops

### Vegetables
- [x] Tomato (Standard) - `tomato-standard.json`
- [x] Tomato (Heat-Tolerant) - `tomato-heat-tolerant.json`
- [x] Bell Pepper - `bell-pepper.json`
- [x] Jalapeño Pepper - `jalapeno-pepper.json`
- [x] Lettuce (Leaf) - `lettuce-leaf.json`
- [x] Bush Beans (Green) - `bush-beans.json`
- [x] Carrot - `carrot.json`
- [x] Okra - `okra.json`

### Herbs
- [x] Basil - `basil.json`
- [x] Cilantro - `cilantro.json`
- [x] Parsley - `parsley.json`

## Specific Varieties (varieties/ folder)

### Tomato Varieties
- [x] Cherokee Purple - `varieties/cherokee-purple-tomato.json` - 72 days, heirloom, moderate heat tolerance
- [x] Sungold - `varieties/sungold-tomato.json` - 62 days, hybrid cherry, very sweet
- [x] San Marzano II - `varieties/san-marzano-tomato.json` - 80 days, paste/sauce, heirloom
- [x] Red Brandywine - `varieties/brandywine-tomato.json` - 78 days, beefsteak, low heat tolerance
- [x] Phoenix - `varieties/phoenix-tomato.json` - 70 days, heat-tolerant hybrid, determinate

### Pepper Varieties
- [x] California Wonder - `varieties/california-wonder-pepper.json` - 75 days, standard bell, heirloom

### Bean Varieties
- [x] Blue Lake 274 - `varieties/blue-lake-bean.json` - 55 days, bush bean, heirloom

### Lettuce Varieties
- [x] Jericho - `varieties/jericho-lettuce.json` - 48 days, heat-tolerant romaine

### Okra Varieties
- [x] Clemson Spineless - `varieties/clemson-spineless-okra.json` - 55 days, very heat-tolerant, heirloom

### Basil Varieties
- [x] Genovese Compact Improved - `varieties/genovese-basil.json` - 74 days, classic Italian

## Data Sources

- USDA Plant Hardiness Zone data
- Extension service guides (Texas A&M AgriLife, NC State, etc.)
- Academic research on heat tolerance
- Seed company growing guides (Johnny's Seeds, Burpee, Baker Creek)

## Validation Commands

```bash
# Count total crops
jq -s 'length' data/crops/*.json

# List all crop names
jq -r '.common_name' data/crops/*.json

# Find heat-tolerant crops
jq -r 'select(.temperature_tolerance.heat_tolerance_rating == "high" or .temperature_tolerance.heat_tolerance_rating == "very_high") | .common_name' data/crops/*.json

# Check crops with max_fruit_set_temp > 90F
jq -r 'select(.temperature_tolerance.max_fruit_set_temp_f > 90) | .common_name' data/crops/*.json
```
