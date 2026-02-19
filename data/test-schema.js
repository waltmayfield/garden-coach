#!/usr/bin/env node

/**
 * Schema validation tests for Garden Coach data files
 * 
 * Validates:
 * 1. All crop files have correct schema
 * 2. All variety files have correct schema
 * 3. Variety parent_crop_id references exist in crops
 * 4. No orphaned varieties (missing parent crop)
 */

const fs = require('fs');
const path = require('path');

// Color output helpers
const colors = {
  green: (text) => `\x1b[32m${text}\x1b[0m`,
  red: (text) => `\x1b[31m${text}\x1b[0m`,
  yellow: (text) => `\x1b[33m${text}\x1b[0m`,
  blue: (text) => `\x1b[34m${text}\x1b[0m`,
  bold: (text) => `\x1b[1m${text}\x1b[0m`,
};

// Required fields for each schema
const CROP_REQUIRED_FIELDS = [
  'id',
  'common_name',
  'scientific_name',
  'category',
  'varieties',
  'growing_info',
  'temperature_tolerance',
  'planting_schedule',
  'yield_info',
  'companion_plants',
  'antagonist_plants',
  'description',
  'source_urls'
];

const VARIETY_REQUIRED_FIELDS = [
  'id',
  'variety_name',
  'parent_crop_id',
  'common_name',
  'scientific_name',
  'seed_type',
  'growing_info',
  'temperature_tolerance',
  'growth_habit',
  'fruit_size',
  'fruit_description',
  'flavor_profile',
  'disease_resistance',
  'best_uses',
  'special_characteristics',
  'source_urls'
];

let errorCount = 0;
let warningCount = 0;

function log(message, type = 'info') {
  const prefix = {
    error: colors.red('✗'),
    warning: colors.yellow('⚠'),
    success: colors.green('✓'),
    info: colors.blue('ℹ'),
  }[type] || '';
  
  console.log(`${prefix} ${message}`);
  
  if (type === 'error') errorCount++;
  if (type === 'warning') warningCount++;
}

function loadJsonFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    log(`Failed to parse ${path.basename(filePath)}: ${error.message}`, 'error');
    return null;
  }
}

function validateFields(obj, requiredFields, fileName, type) {
  const missingFields = [];
  
  for (const field of requiredFields) {
    if (!(field in obj)) {
      missingFields.push(field);
    }
  }
  
  if (missingFields.length > 0) {
    log(`${fileName} missing ${type} fields: ${missingFields.join(', ')}`, 'error');
    return false;
  }
  
  return true;
}

function validateCropSchema(crop, fileName) {
  if (!validateFields(crop, CROP_REQUIRED_FIELDS, fileName, 'crop')) {
    return false;
  }
  
  // Validate nested growing_info
  if (!crop.growing_info.days_to_harvest && !crop.growing_info.days_to_germination) {
    log(`${fileName}: growing_info should have days_to_harvest or days_to_germination`, 'warning');
    warningCount++;
  }
  
  // Validate temperature_tolerance has heat_tolerance_rating
  if (crop.temperature_tolerance && !crop.temperature_tolerance.heat_tolerance_rating) {
    log(`${fileName}: missing heat_tolerance_rating in temperature_tolerance`, 'warning');
  }
  
  // Validate category enum
  const validCategories = ['vegetable', 'fruit', 'herb', 'flower', 'other'];
  if (!validCategories.includes(crop.category)) {
    log(`${fileName}: invalid category "${crop.category}"`, 'error');
    return false;
  }
  
  return true;
}

function validateVarietySchema(variety, fileName) {
  if (!validateFields(variety, VARIETY_REQUIRED_FIELDS, fileName, 'variety')) {
    return false;
  }
  
  // Validate seed_type enum
  const validSeedTypes = ['hybrid', 'heirloom', 'open_pollinated', 'heirloom_open_pollinated'];
  if (!validSeedTypes.includes(variety.seed_type)) {
    log(`${fileName}: invalid seed_type "${variety.seed_type}"`, 'warning');
  }
  
  // Validate days_to_harvest exists somewhere
  if (!variety.growing_info?.days_to_harvest) {
    log(`${fileName}: variety missing days_to_harvest (should override or inherit from crop)`, 'warning');
  }
  
  // Validate disease_resistance is array
  if (!Array.isArray(variety.disease_resistance)) {
    log(`${fileName}: disease_resistance must be an array`, 'error');
    return false;
  }
  
  // Validate best_uses is array
  if (!Array.isArray(variety.best_uses)) {
    log(`${fileName}: best_uses must be an array`, 'error');
    return false;
  }
  
  return true;
}

function getAllFiles(dirPath, extension = '.json') {
  return fs.readdirSync(dirPath)
    .filter(file => file.endsWith(extension))
    .map(file => path.join(dirPath, file));
}

function main() {
  console.log(colors.bold('\n=== Garden Coach Data Schema Validation ===\n'));
  
  const cropsDir = path.join(__dirname, 'crops');
  const varietiesDir = path.join(__dirname, 'varieties');
  
  // Load all crops
  console.log(colors.bold('📁 Loading crops...'));
  const cropFiles = getAllFiles(cropsDir);
  const crops = new Map();
  
  for (const filePath of cropFiles) {
    const fileName = path.basename(filePath);
    const crop = loadJsonFile(filePath);
    
    if (crop) {
      if (validateCropSchema(crop, fileName)) {
        crops.set(crop.id, { ...crop, fileName });
        log(`${fileName} - valid`, 'success');
      }
    }
  }
  
  console.log(`\nLoaded ${crops.size} crops\n`);
  
  // Load all varieties
  console.log(colors.bold('📁 Loading varieties...'));
  const varietyFiles = getAllFiles(varietiesDir);
  const varieties = new Map();
  
  for (const filePath of varietyFiles) {
    const fileName = path.basename(filePath);
    const variety = loadJsonFile(filePath);
    
    if (variety) {
      if (validateVarietySchema(variety, fileName)) {
        varieties.set(variety.id, { ...variety, fileName });
        log(`${fileName} - valid`, 'success');
      }
    }
  }
  
  console.log(`\nLoaded ${varieties.size} varieties\n`);
  
  // Validate relationships
  console.log(colors.bold('🔗 Validating relationships...\n'));
  
  const varietiesByCrop = new Map();
  
  for (const [varietyId, variety] of varieties) {
    const parentCropId = variety.parent_crop_id;
    
    // Check if parent crop exists
    if (!crops.has(parentCropId)) {
      log(`${variety.fileName}: parent_crop_id "${parentCropId}" not found in crops`, 'error');
    } else {
      // Track varieties by crop
      if (!varietiesByCrop.has(parentCropId)) {
        varietiesByCrop.set(parentCropId, []);
      }
      varietiesByCrop.get(parentCropId).push(variety);
      
      log(`${variety.fileName} → ${crops.get(parentCropId).fileName} (${crops.get(parentCropId).common_name})`, 'success');
    }
  }
  
  // Report crops without varieties
  console.log(colors.bold('\n📊 Summary by Crop:\n'));
  
  for (const [cropId, crop] of crops) {
    const cropVarieties = varietiesByCrop.get(cropId) || [];
    if (cropVarieties.length === 0) {
      log(`${crop.common_name} (${crop.fileName}): No varieties defined`, 'warning');
    } else {
      const varietyNames = cropVarieties.map(v => v.variety_name).join(', ');
      console.log(`${colors.green('✓')} ${colors.bold(crop.common_name)}: ${cropVarieties.length} varieties (${varietyNames})`);
    }
  }
  
  // Final summary
  console.log(colors.bold('\n=== Validation Summary ===\n'));
  console.log(`Crops validated: ${crops.size}`);
  console.log(`Varieties validated: ${varieties.size}`);
  console.log(`Relationships verified: ${varietiesByCrop.size} crops have varieties`);
  
  if (errorCount > 0) {
    console.log(`\n${colors.red(colors.bold(`Errors: ${errorCount}`))}`);
  }
  
  if (warningCount > 0) {
    console.log(`${colors.yellow(colors.bold(`Warnings: ${warningCount}`))}`);
  }
  
  if (errorCount === 0 && warningCount === 0) {
    console.log(`\n${colors.green(colors.bold('✓ All validations passed!'))}\n`);
    process.exit(0);
  } else if (errorCount === 0) {
    console.log(`\n${colors.yellow(colors.bold('⚠ Validation passed with warnings'))}\n`);
    process.exit(0);
  } else {
    console.log(`\n${colors.red(colors.bold('✗ Validation failed'))}\n`);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { validateCropSchema, validateVarietySchema };
