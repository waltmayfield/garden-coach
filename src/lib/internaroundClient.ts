import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';

export const internaroundClient = generateClient<Schema>();

export function normalizeList(value: string): string[] {
  return value
    .split(/\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}
