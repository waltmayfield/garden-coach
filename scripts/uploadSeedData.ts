#!/usr/bin/env tsx

import { createHash } from 'node:crypto';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { getConfiguredAmplifyClient, setAmplifyEnvVars } from '../utils/amplifyUtils';

const DATA_DIR = path.resolve(process.cwd(), 'data');
const CROPS_DIR = path.join(DATA_DIR, 'crops');
const VARIETIES_DIR = path.join(DATA_DIR, 'varieties');

const cropCategories = new Set(['vegetable', 'fruit', 'herb', 'flower', 'other']);
const seedTypes = new Set(['hybrid', 'heirloom', 'open_pollinated']);

type JsonObject = Record<string, unknown>;

function hashId(namespace: string, name: string): string {
  const digest = createHash('sha256').update(`${namespace}:${name}`).digest('hex');
  return `${namespace}_${digest.slice(0, 28)}`;
}

function asString(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim().length > 0 ? value.trim() : undefined;
}

function asStringArray(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const normalized = value
    .map((item) => (typeof item === 'string' ? item.trim() : String(item)))
    .filter(Boolean);
  return normalized.length > 0 ? normalized : [];
}

function asCategory(value: unknown): string {
  const category = asString(value)?.toLowerCase();
  return category && cropCategories.has(category) ? category : 'other';
}

function asSeedType(value: unknown): string | undefined {
  const normalized = asString(value)?.toLowerCase();
  if (!normalized) return undefined;
  if (normalized === 'heirloom_open_pollinated') return 'open_pollinated';
  return seedTypes.has(normalized) ? normalized : undefined;
}

function compact<T extends JsonObject>(input: T): T {
  return Object.fromEntries(
    Object.entries(input).filter(([, value]) => value !== undefined)
  ) as T;
}

function toJsonString(value: unknown): string | undefined {
  if (value === undefined) return undefined;
  return JSON.stringify(value);
}

async function readJsonFiles(dir: string): Promise<Array<{ filePath: string; json: JsonObject }>> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const jsonFiles = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.json'))
    .map((entry) => path.join(dir, entry.name))
    .sort();

  const loaded: Array<{ filePath: string; json: JsonObject }> = [];
  for (const filePath of jsonFiles) {
    const content = await fs.readFile(filePath, 'utf8');
    loaded.push({ filePath, json: JSON.parse(content) as JsonObject });
  }

  return loaded;
}

function toCropInput(raw: JsonObject, filePath: string): JsonObject {
  const commonName = asString(raw.common_name) ?? asString(raw.commonName);
  if (!commonName) {
    throw new Error(`Missing common_name/commonName in ${path.basename(filePath)}`);
  }

  const id =
    asString(raw.id) ??
    hashId('crop', commonName.toLowerCase());

  return compact({
    id,
    commonName,
    scientificName: asString(raw.scientific_name) ?? asString(raw.scientificName),
    category: asCategory(raw.category),
    growingInfo: toJsonString(raw.growing_info ?? raw.growingInfo),
    temperatureTolerance: toJsonString(raw.temperature_tolerance ?? raw.temperatureTolerance),
    plantingSchedule: toJsonString(raw.planting_schedule ?? raw.plantingSchedule),
    yieldInfo: toJsonString(raw.yield_info ?? raw.yieldInfo),
    companionPlantCropIds:
      asStringArray(raw.companion_plant_crop_ids) ??
      asStringArray(raw.companionPlantCropIds) ??
      asStringArray(raw.companion_plants),
    antagonistPlantCropIds:
      asStringArray(raw.antagonist_plant_crop_ids) ??
      asStringArray(raw.antagonistPlantCropIds) ??
      asStringArray(raw.antagonist_plants),
    imageUrl: asString(raw.image_url) ?? asString(raw.imageUrl),
    description: asString(raw.description),
  });
}

function toVarietyInput(raw: JsonObject, filePath: string): JsonObject {
  const varietyName = asString(raw.variety_name) ?? asString(raw.varietyName);
  if (!varietyName) {
    throw new Error(`Missing variety_name/varietyName in ${path.basename(filePath)}`);
  }

  const cropId =
    asString(raw.parent_crop_id) ??
    asString(raw.crop_id) ??
    asString(raw.cropId);
  if (!cropId) {
    throw new Error(`Missing parent_crop_id/crop_id/cropId in ${path.basename(filePath)}`);
  }

  const id =
    asString(raw.id) ??
    hashId('variety', `${cropId}:${varietyName.toLowerCase()}`);

  return compact({
    id,
    cropId,
    varietyName,
    commonName: asString(raw.common_name) ?? asString(raw.commonName),
    scientificName: asString(raw.scientific_name) ?? asString(raw.scientificName),
    seedType: asSeedType(raw.seed_type) ?? asSeedType(raw.seedType),
    growingInfo: toJsonString(raw.growing_info ?? raw.growingInfo),
    temperatureTolerance: toJsonString(raw.temperature_tolerance ?? raw.temperatureTolerance),
    growthHabit: asString(raw.growth_habit) ?? asString(raw.growthHabit),
    fruitSize: asString(raw.fruit_size) ?? asString(raw.fruitSize),
    fruitDescription: asString(raw.fruit_description) ?? asString(raw.fruitDescription),
    flavorProfile: asString(raw.flavor_profile) ?? asString(raw.flavorProfile),
    diseaseResistance: asStringArray(raw.disease_resistance) ?? asStringArray(raw.diseaseResistance),
    bestUses: asStringArray(raw.best_uses) ?? asStringArray(raw.bestUses),
    specialCharacteristics: asString(raw.special_characteristics) ?? asString(raw.specialCharacteristics),
    yieldInfo: toJsonString(raw.yield_info ?? raw.yieldInfo),
    sourceUrls: asStringArray(raw.source_urls) ?? asStringArray(raw.sourceUrls),
  });
}

function formatErrors(errors: Array<{ message?: string }> | undefined): string {
  if (!errors || errors.length === 0) return 'unknown error';
  return errors.map((error) => error.message ?? 'unknown error').join('; ');
}

const createCropMutation = /* GraphQL */ `
  mutation CreateCrop($input: CreateCropInput!) {
    createCrop(input: $input) { id }
  }
`;

const updateCropMutation = /* GraphQL */ `
  mutation UpdateCrop($input: UpdateCropInput!) {
    updateCrop(input: $input) { id }
  }
`;

const createVarietyMutation = /* GraphQL */ `
  mutation CreateVariety($input: CreateVarietyInput!) {
    createVariety(input: $input) { id }
  }
`;

const updateVarietyMutation = /* GraphQL */ `
  mutation UpdateVariety($input: UpdateVarietyInput!) {
    updateVariety(input: $input) { id }
  }
`;

async function runGraphql(
  client: { graphql: (args: { query: string; variables?: Record<string, unknown> }) => Promise<{ errors?: Array<{ message?: string }> }> },
  query: string,
  variables: Record<string, unknown>
): Promise<{ errors?: Array<{ message?: string }> }> {
  return client.graphql({ query, variables });
}

async function upsert(
  client: { graphql: (args: { query: string; variables?: Record<string, unknown> }) => Promise<{ errors?: Array<{ message?: string }> }> },
  modelName: 'Crop' | 'Variety',
  input: JsonObject
): Promise<'created' | 'updated'> {
  const createQuery = modelName === 'Crop' ? createCropMutation : createVarietyMutation;
  const updateQuery = modelName === 'Crop' ? updateCropMutation : updateVarietyMutation;

  const createResult = await runGraphql(client, createQuery, { input });
  if (!createResult.errors || createResult.errors.length === 0) {
    return 'created';
  }

  const updateResult = await runGraphql(client, updateQuery, { input });
  if (!updateResult.errors || updateResult.errors.length === 0) {
    return 'updated';
  }

  throw new Error(`${modelName} create failed: ${formatErrors(createResult.errors)} | update failed: ${formatErrors(updateResult.errors)}`);
}

async function main(): Promise<void> {
  const dryRun = process.argv.includes('--dry-run');

  const envResult = await setAmplifyEnvVars();
  if (!envResult.success) {
    throw new Error(`Failed to configure Amplify environment: ${String(envResult.error)}`);
  }

  const client = getConfiguredAmplifyClient() as unknown as {
    graphql: (args: { query: string; variables?: Record<string, unknown> }) => Promise<{ errors?: Array<{ message?: string }> }>;
  };

  const cropFiles = await readJsonFiles(CROPS_DIR);
  const varietyFiles = await readJsonFiles(VARIETIES_DIR);

  let created = 0;
  let updated = 0;

  for (const { filePath, json } of cropFiles) {
    const input = toCropInput(json, filePath);
    if (dryRun) {
      console.log(`[dry-run] Crop ${input.commonName} (${input.id})`);
      continue;
    }

    const result = await upsert(client, 'Crop', input);
    result === 'created' ? created++ : updated++;
    console.log(`Crop ${result}: ${input.commonName} (${input.id})`);
  }

  for (const { filePath, json } of varietyFiles) {
    const input = toVarietyInput(json, filePath);
    if (dryRun) {
      console.log(`[dry-run] Variety ${input.varietyName} (${input.id}) -> crop ${input.cropId}`);
      continue;
    }

    const result = await upsert(client, 'Variety', input);
    result === 'created' ? created++ : updated++;
    console.log(`Variety ${result}: ${input.varietyName} (${input.id}) -> crop ${input.cropId}`);
  }

  if (dryRun) {
    console.log(`\nDry run complete. Prepared ${cropFiles.length} crops and ${varietyFiles.length} varieties.`);
    return;
  }

  console.log(`\nSeed upload complete. Created: ${created}, Updated: ${updated}`);
}

main().catch((error) => {
  console.error('Seed upload failed:', error);
  process.exit(1);
});
