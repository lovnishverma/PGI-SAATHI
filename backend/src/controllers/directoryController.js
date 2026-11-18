const path = require('path');
const fs = require('fs');
const { db, isFirebaseConnected } = require('../config/firebase');

// Load fallback seed data
const seedPath = path.join(__dirname, '../../../seed_data/pgi_directory_seed.json');
let seedData = null;
try {
  seedData = JSON.parse(fs.readFileSync(seedPath, 'utf-8'));
} catch (e) {
  console.warn("Could not read local seed JSON:", e.message);
}

exports.getDepartments = async (req, res) => {
  try {
    const { building, search } = req.query;

    if (isFirebaseConnected && db) {
      let query = db.collection('departments');
      if (building) {
        query = query.where('building_id', '==', building);
      }
      const snapshot = await query.get();
      if (!snapshot.empty) {
        let depts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        if (search) {
          const q = search.toLowerCase();
          depts = depts.filter(d => 
            d.name?.toLowerCase().includes(q) ||
            d.hindi_name?.includes(q) ||
            d.punjabi_name?.includes(q) ||
            d.concerns?.some(c => c.toLowerCase().includes(q))
          );
        }
        return res.json({ success: true, count: depts.length, data: depts, source: 'firestore' });
      }
    }

    // Fallback seed
    let depts = seedData?.departments || [];
    if (building) {
      depts = depts.filter(d => d.building_id === building);
    }
    if (search) {
      const q = search.toLowerCase();
      depts = depts.filter(d => 
        d.name?.toLowerCase().includes(q) ||
        d.hindi_name?.includes(q) ||
        d.punjabi_name?.includes(q) ||
        d.concerns?.some(c => c.toLowerCase().includes(q))
      );
    }
    return res.json({ success: true, count: depts.length, data: depts, source: 'seed_fallback' });
  } catch (error) {
    console.error("Error in getDepartments:", error);
    return res.status(500).json({ success: false, error: "Failed to fetch departments" });
  }
};

exports.getBuildings = async (req, res) => {
  try {
    if (isFirebaseConnected && db) {
      const snapshot = await db.collection('buildings').get();
      if (!snapshot.empty) {
        const buildings = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return res.json({ success: true, count: buildings.length, data: buildings, source: 'firestore' });
      }
    }

    return res.json({ 
      success: true, 
      count: seedData?.buildings?.length || 0, 
      data: seedData?.buildings || [], 
      source: 'seed_fallback' 
    });
  } catch (error) {
    console.error("Error in getBuildings:", error);
    return res.status(500).json({ success: false, error: "Failed to fetch buildings" });
  }
};

exports.getSchedule = async (req, res) => {
  try {
    if (isFirebaseConnected && db) {
      const doc = await db.collection('system_config').doc('opd_schedule').get();
      if (doc.exists) {
        return res.json({ success: true, data: doc.data(), source: 'firestore' });
      }
    }

    return res.json({ success: true, data: seedData?.opd_schedule || {}, source: 'seed_fallback' });
  } catch (error) {
    console.error("Error in getSchedule:", error);
    return res.status(500).json({ success: false, error: "Failed to fetch OPD schedule" });
  }
};

exports.getEmergencyGuidance = async (req, res) => {
  try {
    if (isFirebaseConnected && db) {
      const doc = await db.collection('system_config').doc('emergency_guidance').get();
      if (doc.exists) {
        return res.json({ success: true, data: doc.data(), source: 'firestore' });
      }
    }

    return res.json({
      success: true,
      data: {
        warning_signs: seedData?.emergency_warning_signs || [],
        instruction: seedData?.emergency_instruction || ""
      },
      source: 'seed_fallback'
    });
  } catch (error) {
    console.error("Error in getEmergencyGuidance:", error);
    return res.status(500).json({ success: false, error: "Failed to fetch emergency guidance" });
  }
};

exports.getSampleProtocols = async (req, res) => {
  try {
    if (isFirebaseConnected && db) {
      const doc = await db.collection('system_config').doc('sample_collection').get();
      if (doc.exists) {
        return res.json({ success: true, data: doc.data(), source: 'firestore' });
      }
    }

    return res.json({
      success: true,
      data: seedData?.sample_collection || [],
      source: 'seed_fallback'
    });
  } catch (error) {
    console.error("Error in getSampleProtocols:", error);
    return res.status(500).json({ success: false, error: "Failed to fetch sample protocols" });
  }
};
