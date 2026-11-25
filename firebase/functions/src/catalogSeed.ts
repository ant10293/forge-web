import { HttpsError, onCall } from "firebase-functions/v2/https";
import { FieldValue, getFirestore } from "firebase-admin/firestore";
import { loadBundledSeed } from "./seedData.js";

const FIRESTORE_BATCH_LIMIT = 400; // Firestore's hard limit is 500 writes/batch

async function writeCollection(collectionName: string, items: Array<Record<string, unknown>>): Promise<number> {
  const db = getFirestore();
  let written = 0;
  for (let i = 0; i < items.length; i += FIRESTORE_BATCH_LIMIT) {
    const chunk = items.slice(i, i + FIRESTORE_BATCH_LIMIT);
    const batch = db.batch();
    for (const item of chunk) {
      const id = item.id;
      if (typeof id !== "string" || id.length === 0) continue;
      batch.set(db.collection(collectionName).doc(id), item);
      written += 1;
    }
    await batch.commit();
  }
  return written;
}

/**
 * One-time/occasional admin bootstrap: seeds the `exercises` and
 * `equipment` Firestore collections from forge-core's bundled catalog
 * JSON (see seedData.ts), and bumps `catalog/meta` so clients know to
 * sync. This stands in for the real admin-console catalog editor (not
 * built yet, per the plan's forge-web phase) — once that exists, it
 * becomes the primary way the catalog changes, and this function stays
 * useful as a re-seed/reset tool.
 *
 * Requires the caller's ID token to carry a custom `admin` claim. No
 * mechanism grants that claim yet — it must be set once, manually, via
 * the Firebase Admin SDK (e.g. `getAuth().setCustomUserClaims(uid, {
 * admin: true })` run locally against the project), since a deployed
 * function that could grant admin to anyone would itself be a privilege-
 * escalation hole.
 */
export const seedCatalogFromBundledData = onCall(async (request) => {
  if (request.auth?.token?.admin !== true) {
    throw new HttpsError("permission-denied", "Admin access required.");
  }

  const exercises = loadBundledSeed("exercises.json");
  const equipment = loadBundledSeed("equipment.json");

  const exercisesWritten = await writeCollection("exercises", exercises);
  const equipmentWritten = await writeCollection("equipment", equipment);

  await getFirestore()
    .collection("catalog")
    .doc("meta")
    .set(
      {
        exerciseVersion: FieldValue.increment(1),
        equipmentVersion: FieldValue.increment(1),
      },
      { merge: true }
    );

  return { exercisesWritten, equipmentWritten };
});
