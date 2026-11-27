const path = require('path');
const fs = require('fs');
const { db, admin, isFirebaseConnected } = require('../config/firebase');
const cache = require('./cache');

const STALE_THRESHOLD_DAYS = Number(process.env.STALE_THRESHOLD_DAYS || 90);
const MS_PER_DAY = 24 * 60 * 60 * 1000;

const seedPath = path.join(__dirname, '../../../seed_data/pgi_directory_seed.json');
let rawSeed = {};
try {
  rawSeed = JSON.parse(fs.readFileSync(seedPath, 'utf-8'));
} catch (err) {
  console.warn('Could not read local seed JSON:', err.message);
}

const defaultVerifiedAt = rawSeed?.metadata?.verified_at
  ? new Date(rawSeed.metadata.verified_at).toISOString()
  : new Date().toISOString();

// Mutable in-memory store for Standalone/Mock mode
const mockStore = {
  departments: (rawSeed.departments || []).map(d => ({
    ...d,
    status: d.status || 'published',
    verified_at: d.verified_at || defaultVerifiedAt
  })),
  buildings: (rawSeed.buildings || []).map(b => ({
    ...b,
    status: b.status || 'published',
    verified_at: b.verified_at || defaultVerifiedAt
  })),
  feedback: [],
  audit_logs: []
};

function toIsoString(val) {
  if (!val) return null;
  if (typeof val === 'string') return val;
  if (val instanceof Date) return val.toISOString();
  if (typeof val.toDate === 'function') return val.toDate().toISOString();
  if (typeof val._seconds === 'number') return new Date(val._seconds * 1000).toISOString();
  return null;
}

function enrichGovernance(item) {
  const verifiedAtIso = toIsoString(item.verified_at) || defaultVerifiedAt;
  const status = item.status || 'published';
  const ageDays = Math.floor((Date.now() - new Date(verifiedAtIso).getTime()) / MS_PER_DAY);
  const isStale = status === 'stale' || (Number.isFinite(ageDays) && ageDays > STALE_THRESHOLD_DAYS);

  return {
    ...item,
    status,
    verified_at: verifiedAtIso,
    is_stale: isStale
  };
}

async function getDepartments({ includeDrafts = false } = {}) {
  let depts = null;
  let source = 'seed_fallback';

  if (isFirebaseConnected && db) {
    const cached = cache.get('departments:all');
    if (cached) {
      depts = cached;
      source = 'firestore_cache';
    } else {
      const snapshot = await db.collection('departments').get();
      if (!snapshot.empty) {
        depts = snapshot.docs.map(doc => enrichGovernance({ id: doc.id, ...doc.data() }));
        cache.set('departments:all', depts);
        source = 'firestore';
      }
    }
  }

  if (!depts) {
    depts = mockStore.departments.map(enrichGovernance);
    source = 'seed_fallback';
  }

  if (!includeDrafts) {
    depts = depts.filter(d => d.status !== 'draft');
  }

  return { data: depts, source };
}

async function getDepartmentById(id, { includeDrafts = false } = {}) {
  const { data, source } = await getDepartments({ includeDrafts });
  const dept = data.find(d => d.id === id) || null;
  return { data: dept, source };
}

async function getBuildings({ includeDrafts = false } = {}) {
  let buildings = null;
  let source = 'seed_fallback';

  if (isFirebaseConnected && db) {
    const cached = cache.get('buildings:all');
    if (cached) {
      buildings = cached;
      source = 'firestore_cache';
    } else {
      const snapshot = await db.collection('buildings').get();
      if (!snapshot.empty) {
        buildings = snapshot.docs.map(doc => enrichGovernance({ id: doc.id, ...doc.data() }));
        cache.set('buildings:all', buildings);
        source = 'firestore';
      }
    }
  }

  if (!buildings) {
    buildings = mockStore.buildings.map(enrichGovernance);
    source = 'seed_fallback';
  }

  if (!includeDrafts) {
    buildings = buildings.filter(b => b.status !== 'draft');
  }

  return { data: buildings, source };
}

async function getBuildingById(id, { includeDrafts = false } = {}) {
  const { data, source } = await getBuildings({ includeDrafts });
  const building = data.find(b => b.id === id) || null;
  return { data: building, source };
}

async function getSystemConfig(docId, fallbackData) {
  if (isFirebaseConnected && db) {
    const cacheKey = `system_config:${docId}`;
    const cached = cache.get(cacheKey);
    if (cached) {
      return { data: cached, source: 'firestore_cache' };
    }
    const doc = await db.collection('system_config').doc(docId).get();
    if (doc.exists) {
      const data = doc.data();
      cache.set(cacheKey, data);
      return { data, source: 'firestore' };
    }
  }
  return { data: fallbackData, source: 'seed_fallback' };
}

module.exports = {
  rawSeed,
  mockStore,
  db,
  admin,
  isFirebaseConnected,
  enrichGovernance,
  toIsoString,
  getDepartments,
  getDepartmentById,
  getBuildings,
  getBuildingById,
  getSystemConfig
};
