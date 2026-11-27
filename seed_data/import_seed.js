/**
 * PGI Saathi - Firestore Seed Ingestion Script
 * Ingests baseline directory, buildings, and guidance data into Cloud Firestore.
 * 
 * Usage:
 *   1. Set GOOGLE_APPLICATION_CREDENTIALS=<path-to-serviceAccountKey.json>
 *   2. Run: node seed_data/import_seed.js
 */

const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Initialize Firebase Admin
if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.applicationDefault()
    });
    console.log("✅ Firebase Admin initialized with application default credentials.");
  } catch (err) {
    console.warn("⚠️ Could not load default credentials. Ensure GOOGLE_APPLICATION_CREDENTIALS is set.");
    process.exit(1);
  }
}

const db = admin.firestore();

async function importSeedData() {
  const seedFilePath = path.join(__dirname, 'pgi_directory_seed.json');
  const rawData = fs.readFileSync(seedFilePath, 'utf-8');
  const seed = JSON.parse(rawData);

  console.log("🚀 Starting PGI Saathi Firestore Seed Upload...");

  // 1. Upload Buildings
  console.log(`📦 Seeding ${seed.buildings.length} buildings...`);
  const buildingsBatch = db.batch();
  for (const b of seed.buildings) {
    const docRef = db.collection('buildings').doc(b.id);
    buildingsBatch.set(docRef, {
      ...b,
      status: 'published',
      verified_at: admin.firestore.Timestamp.now(),
      created_at: admin.firestore.Timestamp.now()
    }, { merge: true });
  }
  await buildingsBatch.commit();
  console.log("✅ Buildings successfully written to Firestore.");

  // 2. Upload Departments
  console.log(`📦 Seeding ${seed.departments.length} departments...`);
  const deptsBatch = db.batch();
  for (const d of seed.departments) {
    const docRef = db.collection('departments').doc(d.id);
    deptsBatch.set(docRef, {
      ...d,
      status: 'published',
      verified_at: admin.firestore.Timestamp.now(),
      created_at: admin.firestore.Timestamp.now()
    }, { merge: true });
  }
  await deptsBatch.commit();
  console.log("✅ Departments successfully written to Firestore.");

  // 3. Upload Guidance & Metadata
  console.log("📦 Seeding system guidance, schedules, and emergency protocols...");
  await db.collection('system_config').doc('opd_schedule').set({
    ...seed.opd_schedule,
    updated_at: admin.firestore.Timestamp.now()
  });
  await db.collection('system_config').doc('emergency_guidance').set({
    warning_signs: seed.emergency_warning_signs,
    instruction: seed.emergency_instruction,
    updated_at: admin.firestore.Timestamp.now()
  });
  await db.collection('system_config').doc('sample_collection').set({
    protocols: seed.sample_collection,
    updated_at: admin.firestore.Timestamp.now()
  });
  await db.collection('system_config').doc('golden_rules').set({
    rules: seed.golden_rules || [],
    updated_at: admin.firestore.Timestamp.now()
  });

  console.log("🎉 Firestore database seeding complete for PGI Saathi (Spark Plan Serverless)!");
}

importSeedData().catch(err => {
  console.error("❌ Error importing seed data:", err);
  process.exit(1);
});
