const dataStore = require('../utils/dataStore');

const FINDER_DISCLAIMER = 'This is navigational guidance, not a medical diagnosis. In case of acute or life-threatening symptoms, go directly to Emergency / ATC.';

function matchesSearch(dept, query) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const tokens = q.split(/\s+/).filter(Boolean);

  const haystack = [
    dept.name,
    dept.hindi_name,
    dept.punjabi_name,
    dept.notes,
    dept.building_id,
    ...(Array.isArray(dept.concerns) ? dept.concerns : [])
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  return tokens.every(token => haystack.includes(token));
}

exports.getDepartments = async (req, res) => {
  try {
    const { building, search } = req.query;
    const { data, source } = await dataStore.getDepartments({ includeDrafts: false });

    let depts = data;
    if (building) {
      depts = depts.filter(d => d.building_id === building);
    }
    if (search) {
      depts = depts.filter(d => matchesSearch(d, search));
    }

    res.set('Cache-Control', 'public, max-age=300');
    return res.json({ success: true, count: depts.length, data: depts, source });
  } catch (error) {
    console.error('Error in getDepartments:', error);
    return res.status(500).json({ success: false, error: 'Failed to fetch departments' });
  }
};

exports.getDepartmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data: dept, source } = await dataStore.getDepartmentById(id, { includeDrafts: false });

    if (!dept) {
      return res.status(404).json({ success: false, error: 'Department not found' });
    }

    const { data: building } = await dataStore.getBuildingById(dept.building_id, { includeDrafts: false });

    res.set('Cache-Control', 'public, max-age=300');
    return res.json({
      success: true,
      data: { ...dept, building: building || null },
      source
    });
  } catch (error) {
    console.error('Error in getDepartmentById:', error);
    return res.status(500).json({ success: false, error: 'Failed to fetch department' });
  }
};

exports.getBuildings = async (req, res) => {
  try {
    const { separate_only } = req.query;
    const { data, source } = await dataStore.getBuildings({ includeDrafts: false });

    let buildings = data;
    if (separate_only === 'true') {
      buildings = buildings.filter(b => b.is_separate_building === true);
    }

    res.set('Cache-Control', 'public, max-age=300');
    return res.json({ success: true, count: buildings.length, data: buildings, source });
  } catch (error) {
    console.error('Error in getBuildings:', error);
    return res.status(500).json({ success: false, error: 'Failed to fetch buildings' });
  }
};

exports.getBuildingById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data: building, source } = await dataStore.getBuildingById(id, { includeDrafts: false });

    if (!building) {
      return res.status(404).json({ success: false, error: 'Building not found' });
    }

    const { data: allDepts } = await dataStore.getDepartments({ includeDrafts: false });
    const departments = allDepts.filter(d => d.building_id === id);

    res.set('Cache-Control', 'public, max-age=300');
    return res.json({
      success: true,
      data: { ...building, departments },
      source
    });
  } catch (error) {
    console.error('Error in getBuildingById:', error);
    return res.status(500).json({ success: false, error: 'Failed to fetch building' });
  }
};

exports.findDepartment = async (req, res) => {
  try {
    const q = (req.query.q || req.query.concern || '').trim();
    if (!q) {
      return res.status(400).json({
        success: false,
        error: 'Query parameter "q" (concern or symptom keyword) is required.'
      });
    }

    const { data: depts, source } = await dataStore.getDepartments({ includeDrafts: false });
    const { data: buildings } = await dataStore.getBuildings({ includeDrafts: false });
    const buildingMap = new Map(buildings.map(b => [b.id, b]));

    const lowerQ = q.toLowerCase();
    const matches = depts
      .map(dept => {
        let score = 0;
        if (dept.name?.toLowerCase().includes(lowerQ)) score += 3;
        if (dept.concerns?.some(c => c.toLowerCase() === lowerQ)) score += 5;
        else if (dept.concerns?.some(c => c.toLowerCase().includes(lowerQ) || lowerQ.includes(c.toLowerCase()))) score += 3;
        if (dept.hindi_name?.includes(q) || dept.punjabi_name?.includes(q)) score += 3;
        if (score === 0 && matchesSearch(dept, q)) score += 1;

        return {
          ...dept,
          building: buildingMap.get(dept.building_id) || null,
          _score: score
        };
      })
      .filter(d => d._score > 0)
      .sort((a, b) => b._score - a._score)
      .map(({ _score, ...rest }) => rest);

    return res.json({
      success: true,
      query: q,
      disclaimer: FINDER_DISCLAIMER,
      count: matches.length,
      data: matches,
      source
    });
  } catch (error) {
    console.error('Error in findDepartment:', error);
    return res.status(500).json({ success: false, error: 'Failed to run department finder' });
  }
};

exports.getSchedule = async (req, res) => {
  try {
    const { data, source } = await dataStore.getSystemConfig('opd_schedule', dataStore.rawSeed?.opd_schedule || {});
    res.set('Cache-Control', 'public, max-age=300');
    return res.json({ success: true, data, source });
  } catch (error) {
    console.error('Error in getSchedule:', error);
    return res.status(500).json({ success: false, error: 'Failed to fetch OPD schedule' });
  }
};

exports.getEmergencyGuidance = async (req, res) => {
  try {
    const fallback = {
      warning_signs: dataStore.rawSeed?.emergency_warning_signs || [],
      instruction: dataStore.rawSeed?.emergency_instruction || ''
    };
    const { data, source } = await dataStore.getSystemConfig('emergency_guidance', fallback);
    res.set('Cache-Control', 'public, max-age=300');
    return res.json({ success: true, data, source });
  } catch (error) {
    console.error('Error in getEmergencyGuidance:', error);
    return res.status(500).json({ success: false, error: 'Failed to fetch emergency guidance' });
  }
};

exports.getSampleProtocols = async (req, res) => {
  try {
    const fallback = dataStore.rawSeed?.sample_collection || [];
    const { data, source } = await dataStore.getSystemConfig('sample_collection', fallback);
    res.set('Cache-Control', 'public, max-age=300');
    return res.json({ success: true, data, source });
  } catch (error) {
    console.error('Error in getSampleProtocols:', error);
    return res.status(500).json({ success: false, error: 'Failed to fetch sample protocols' });
  }
};

exports.getGoldenRules = async (req, res) => {
  try {
    const fallback = { rules: dataStore.rawSeed?.golden_rules || [] };
    const { data, source } = await dataStore.getSystemConfig('golden_rules', fallback);
    const rules = Array.isArray(data) ? data : (data.rules || []);
    res.set('Cache-Control', 'public, max-age=300');
    return res.json({ success: true, count: rules.length, data: rules, source });
  } catch (error) {
    console.error('Error in getGoldenRules:', error);
    return res.status(500).json({ success: false, error: 'Failed to fetch golden rules' });
  }
};
