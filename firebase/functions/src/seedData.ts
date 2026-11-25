import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const moduleDir = dirname(fileURLToPath(import.meta.url));
// Compiled output lands in lib/, so ../data resolves to functions/data/
// regardless of whether this runs from src/ (ts-node) or lib/ (deployed).
const dataDir = join(moduleDir, "..", "data");

/**
 * Loads a bundled catalog seed file as-is (no re-typing). These JSON files
 * are a literal copy of forge-core's Sources/ForgeCore/Resources/*.json —
 * the single source of truth for catalog shape. There is no cross-language
 * codegen in this stack, so this copy is a manual-sync point: if
 * forge-core's exercises.json/equipment.json changes, re-copy it here
 * before re-seeding.
 */
export function loadBundledSeed(filename: "exercises.json" | "equipment.json"): Array<Record<string, unknown>> {
  const raw = readFileSync(join(dataDir, filename), "utf-8");
  return JSON.parse(raw) as Array<Record<string, unknown>>;
}
