import { timeline } from '../src/timeline';

const EPSILON = 1e-9;

function fail(message: string): never {
  throw new Error(`timeline validation failed: ${message}`);
}

if (timeline.length === 0) fail('timeline is empty');

const ids = new Set<string>();
let cursor = 0;

for (const [index, entry] of timeline.entries()) {
  if (!entry.id.trim()) fail(`entry ${index} has an empty id`);
  if (ids.has(entry.id)) fail(`duplicate id "${entry.id}"`);
  ids.add(entry.id);

  if (!Number.isFinite(entry.start) || !Number.isFinite(entry.end)) {
    fail(`${entry.id} has non-finite bounds`);
  }
  if (entry.end <= entry.start) fail(`${entry.id} has non-positive duration`);
  if (Math.abs(entry.start - cursor) > EPSILON) {
    fail(`${entry.id} starts at ${entry.start}, expected contiguous start ${cursor}`);
  }
  if (typeof entry.load !== 'function') fail(`${entry.id} has no scene loader`);

  cursor = entry.end;
}

console.log(`timeline ok: ${timeline.length} plates, ${cursor.toFixed(3)}s provisional duration`);
