const dataStore = require('../utils/dataStore');
const cache = require('../utils/cache');

const ALLOWED_STATUSES = ['published', 'stale', 'draft'];
const ALLOWED_FEEDBACK_STATUSES = ['pending', 'reviewed', 'resolved'];

const DEPT_UPDATABLE_FIELDS = [
  'name',
  'hindi_name',
  'punjabi_name',
  'building_id',
  'concerns',
  'notes',
  'referral_needed',
  'status',
  'room',
  'timings',
  'phone'
];

const BUILDING_UPDATABLE_FIELDS = [
  'name',
  'hindi_name',
  'punjabi_name',
  'description',
  'reception_phone',
  'landmark',
  'is_separate_building',
  'status'
];

function pickAllowed(body, allowedFields) {
  const picked = {};
  for (const field of allowedFields) {
    if (Object.prototype.hasOwnProperty.call(body, field) && body[field] !== undefined) {
      picked[field] = body[field];
    }
  }
  return picked;
}

async function writeAuditLog({ actor, action, targetCollection, targetId, changes }) {
  const entry = {
    actor_uid: actor?.uid || 'unknown',
    actor_email: actor?.email || null,
    action,
    target_collection: targetCollection,
    target_id: targetId,
    changes,
    created_at: new Date().toISOString()
  };

  if (dataStore.isFirebaseConnected && dataStore.db) {
    await dataStore.db.collection('audit_logs').add({
      ...entry,
      created_at: dataStore.admin.firestore.Timestamp.now()
    });
  } else {
    dataStore.mockStore.audit_logs.unshift({
      id: 'audit_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
      ...entry
    });
  }
}

exports.getDepartments = async (req, res) => {
  try {
    const { status } = req.query;
    const { data, source } = await dataStore.getDepartments({ includeDrafts: true });
    let depts = data;
    if (status) {
      depts = depts.filter(d => d.status === status);
    }
    return res.json({ success: true, count: depts.length, data: depts, source });
  } catch (error) {
    console.error('Admin getDepartments error:', error);
    return res.status(500).json({ success: false, error: 'Failed to fetch departments' });
  }
};

exports.updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = pickAllowed(req.body || {}, DEPT_UPDATABLE_FIELDS);

    if (updates.status && !ALLOWED_STATUSES.includes(updates.status)) {
      return res.status(400).json({
        success: false,
        error: `Invalid status. Must be one of: ${ALLOWED_STATUSES.join(', ')}`
      });
    }

    if (Object.keys(updates).length === 0 && !req.body?.mark_verified) {
      return res.status(400).json({ success: false, error: 'No valid fields provided to update.' });
    }

    const { data: existing } = await dataStore.getDepartmentById(id, { includeDrafts: true });
    if (!existing) {
      return res.status(404).json({ success: false, error: 'Department not found' });
    }

    const nowIso = new Date().toISOString();
    if (req.body?.mark_verified === true || updates.status === 'published') {
      updates.verified_at = nowIso;
    }

    if (dataStore.isFirebaseConnected && dataStore.db) {
      const firestoreUpdates = { ...updates };
      if (firestoreUpdates.verified_at) {
        firestoreUpdates.verified_at = dataStore.admin.firestore.Timestamp.now();
      }
      await dataStore.db.collection('departments').doc(id).update(firestoreUpdates);
      cache.invalidate('departments:');
    } else {
      const idx = dataStore.mockStore.departments.findIndex(d => d.id === id);
      dataStore.mockStore.departments[idx] = {
        ...dataStore.mockStore.departments[idx],
        ...updates
      };
    }

    await writeAuditLog({
      actor: req.admin,
      action: 'update_department',
      targetCollection: 'departments',
      targetId: id,
      changes: updates
    });

    const { data: updated } = await dataStore.getDepartmentById(id, { includeDrafts: true });
    return res.json({ success: true, data: updated });
  } catch (error) {
    console.error('Admin updateDepartment error:', error);
    return res.status(500).json({ success: false, error: 'Failed to update department' });
  }
};

exports.verifyDepartment = async (req, res) => {
  req.body = { status: 'published', mark_verified: true };
  return exports.updateDepartment(req, res);
};

exports.getBuildings = async (req, res) => {
  try {
    const { status } = req.query;
    const { data, source } = await dataStore.getBuildings({ includeDrafts: true });
    let buildings = data;
    if (status) {
      buildings = buildings.filter(b => b.status === status);
    }
    return res.json({ success: true, count: buildings.length, data: buildings, source });
  } catch (error) {
    console.error('Admin getBuildings error:', error);
    return res.status(500).json({ success: false, error: 'Failed to fetch buildings' });
  }
};

exports.updateBuilding = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = pickAllowed(req.body || {}, BUILDING_UPDATABLE_FIELDS);

    if (updates.status && !ALLOWED_STATUSES.includes(updates.status)) {
      return res.status(400).json({
        success: false,
        error: `Invalid status. Must be one of: ${ALLOWED_STATUSES.join(', ')}`
      });
    }

    if (Object.keys(updates).length === 0 && !req.body?.mark_verified) {
      return res.status(400).json({ success: false, error: 'No valid fields provided to update.' });
    }

    const { data: existing } = await dataStore.getBuildingById(id, { includeDrafts: true });
    if (!existing) {
      return res.status(404).json({ success: false, error: 'Building not found' });
    }

    const nowIso = new Date().toISOString();
    if (req.body?.mark_verified === true || updates.status === 'published') {
      updates.verified_at = nowIso;
    }

    if (dataStore.isFirebaseConnected && dataStore.db) {
      const firestoreUpdates = { ...updates };
      if (firestoreUpdates.verified_at) {
        firestoreUpdates.verified_at = dataStore.admin.firestore.Timestamp.now();
      }
      await dataStore.db.collection('buildings').doc(id).update(firestoreUpdates);
      cache.invalidate('buildings:');
    } else {
      const idx = dataStore.mockStore.buildings.findIndex(b => b.id === id);
      dataStore.mockStore.buildings[idx] = {
        ...dataStore.mockStore.buildings[idx],
        ...updates
      };
    }

    await writeAuditLog({
      actor: req.admin,
      action: 'update_building',
      targetCollection: 'buildings',
      targetId: id,
      changes: updates
    });

    const { data: updated } = await dataStore.getBuildingById(id, { includeDrafts: true });
    return res.json({ success: true, data: updated });
  } catch (error) {
    console.error('Admin updateBuilding error:', error);
    return res.status(500).json({ success: false, error: 'Failed to update building' });
  }
};

exports.getFeedback = async (req, res) => {
  try {
    const { status, category } = req.query;

    if (dataStore.isFirebaseConnected && dataStore.db) {
      let query = dataStore.db.collection('feedback').orderBy('created_at', 'desc').limit(100);
      if (category) {
        query = dataStore.db.collection('feedback')
          .where('category', '==', category)
          .orderBy('created_at', 'desc')
          .limit(100);
      }
      const snapshot = await query.get();
      let items = snapshot.docs.map(doc => {
        const d = doc.data();
        return { id: doc.id, ...d, created_at: dataStore.toIsoString(d.created_at) };
      });
      if (status) items = items.filter(f => f.status === status);
      return res.json({ success: true, count: items.length, data: items, source: 'firestore' });
    }

    let items = [...dataStore.mockStore.feedback];
    if (status) items = items.filter(f => f.status === status);
    if (category) items = items.filter(f => f.category === category);
    return res.json({ success: true, count: items.length, data: items, source: 'seed_fallback' });
  } catch (error) {
    console.error('Admin getFeedback error:', error);
    return res.status(500).json({ success: false, error: 'Failed to fetch feedback' });
  }
};

exports.updateFeedbackStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, resolution_note } = req.body || {};

    if (!ALLOWED_FEEDBACK_STATUSES.includes(status)) {
      return res.status(400).json({
        success: false,
        error: `Invalid feedback status. Must be one of: ${ALLOWED_FEEDBACK_STATUSES.join(', ')}`
      });
    }

    const updates = {
      status,
      reviewed_at: new Date().toISOString(),
      reviewed_by: req.admin?.uid || 'admin'
    };
    if (typeof resolution_note === 'string' && resolution_note.trim()) {
      updates.resolution_note = resolution_note.trim().slice(0, 500);
    }

    if (dataStore.isFirebaseConnected && dataStore.db) {
      const docRef = dataStore.db.collection('feedback').doc(id);
      const doc = await docRef.get();
      if (!doc.exists) {
        return res.status(404).json({ success: false, error: 'Feedback entry not found' });
      }
      await docRef.update(updates);
      await writeAuditLog({
        actor: req.admin,
        action: 'update_feedback',
        targetCollection: 'feedback',
        targetId: id,
        changes: updates
      });
      return res.json({ success: true, data: { id, ...doc.data(), ...updates } });
    }

    const idx = dataStore.mockStore.feedback.findIndex(f => f.id === id);
    if (idx === -1) {
      return res.status(404).json({ success: false, error: 'Feedback entry not found' });
    }
    dataStore.mockStore.feedback[idx] = { ...dataStore.mockStore.feedback[idx], ...updates };

    await writeAuditLog({
      actor: req.admin,
      action: 'update_feedback',
      targetCollection: 'feedback',
      targetId: id,
      changes: updates
    });

    return res.json({ success: true, data: dataStore.mockStore.feedback[idx] });
  } catch (error) {
    console.error('Admin updateFeedbackStatus error:', error);
    return res.status(500).json({ success: false, error: 'Failed to update feedback status' });
  }
};

exports.getAuditLogs = async (req, res) => {
  try {
    const limit = Math.min(Math.max(Number(req.query.limit) || 50, 1), 200);

    if (dataStore.isFirebaseConnected && dataStore.db) {
      const snapshot = await dataStore.db
        .collection('audit_logs')
        .orderBy('created_at', 'desc')
        .limit(limit)
        .get();
      const logs = snapshot.docs.map(doc => {
        const d = doc.data();
        return { id: doc.id, ...d, created_at: dataStore.toIsoString(d.created_at) };
      });
      return res.json({ success: true, count: logs.length, data: logs, source: 'firestore' });
    }

    const logs = dataStore.mockStore.audit_logs.slice(0, limit);
    return res.json({ success: true, count: logs.length, data: logs, source: 'seed_fallback' });
  } catch (error) {
    console.error('Admin getAuditLogs error:', error);
    return res.status(500).json({ success: false, error: 'Failed to fetch audit logs' });
  }
};
