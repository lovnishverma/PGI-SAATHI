/**
 * Vernacular & phonetic search matcher for PGI Saathi (Phase 2).
 * Handles common Hindi/Punjabi/Hinglish/English spelling variations
 * and provides privacy-preserving local query aggregation (zero PII).
 */

const SYNONYM_GROUPS = [
  ['fever', 'bukhar', 'bukhaar', 'jwar', 'tap', 'temperature', 'बुखार', 'ਬੁਖਾਰ', 'medicine', 'general'],
  ['cough', 'khansi', 'khaansi', 'asthma', 'dama', 'saans', 'sans', 'breathing', 'chest', 'tb', 'khasi', 'खांसी', 'सांस', 'ਖੰਘ', 'ਸਾਹ'],
  ['heart', 'dil', 'cardiac', 'cardiology', 'dhadkan', 'palpitation', 'angioplasty', 'bp', 'blood pressure', 'दिल', 'हृदय', 'ਦਿਲ'],
  ['eye', 'eyes', 'ankh', 'aankh', 'aankhen', 'ankho', 'nazar', 'chashma', 'motiyabind', 'cataract', 'retina', 'dhundhla', 'आंख', 'आँख', 'नेत्र', 'ਅੱਖ', 'ਅੱਖਾਂ'],
  ['child', 'children', 'bacha', 'bachcha', 'baccha', 'bachhe', 'bachche', 'baby', 'infant', 'kid', 'paediatrics', 'pediatrics', 'vaccination', 'teeka', 'बच्चा', 'बच्चे', 'ਬੱਚਾ', 'ਬੱਚੇ'],
  ['bone', 'bones', 'haddi', 'haddiyan', 'joint', 'joints', 'jod', 'ghutna', 'ghutne', 'knee', 'kamar', 'back', 'fracture', 'ortho', 'arthritis', 'हड्डी', 'जोड़', 'घुटना', 'ਹੱਡੀ', 'ਗੋਡੇ'],
  ['kidney', 'gurda', 'gurde', 'renal', 'dialysis', 'creatinine', 'stone', 'pathri', 'peshab', 'urine', 'prostate', 'गुर्दा', 'पेशाब', 'पथरी', 'ਗੁਰਦਾ', 'ਪਿਸ਼ਾਬ'],
  ['stomach', 'pet', 'pait', 'liver', 'jaundice', 'piliya', 'peeliya', 'gas', 'acidity', 'jalan', 'ulcer', 'hepatitis', 'gastro', 'पेट', 'लिवर', 'पीलिया', 'ਪੇਟ', 'ਲਿਵਰ'],
  ['brain', 'dimag', 'dimaag', 'sar', 'sir', 'headache', 'mirgi', 'seizure', 'fits', 'nerve', 'nas', 'nason', 'paralysis', 'lakwa', 'tremor', 'दिमाग', 'नस', 'मिर्गी', 'ਦਿਮਾਗ', 'ਨਸਾਂ'],
  ['ear', 'kan', 'kaan', 'nose', 'nak', 'naak', 'throat', 'gala', 'ent', 'tonsil', 'hearing', 'कान', 'नाक', 'गला', 'ਕੰਨ', 'ਨੱਕ', 'ਗਲਾ'],
  ['tooth', 'teeth', 'dant', 'daant', 'dental', 'masuda', 'gum', 'jaw', 'दांत', 'ਦੰਦ'],
  ['skin', 'chamdi', 'khujli', 'rash', 'allergy', 'daag', 'eczema', 'hair', 'baal', 'त्वचा', 'खुजली', 'ਚਮੜੀ', 'ਖੁਜਲੀ'],
  ['women', 'woman', 'mahila', 'aurat', 'pregnant', 'pregnancy', 'garbh', 'delivery', 'periods', 'gynae', 'gynecology', 'महिला', 'गर्भावस्था', 'ਇਸਤਰੀ'],
  ['trauma', 'accident', 'chot', 'injury', 'bleeding', 'burn', 'emergency', 'चोट', 'दुर्घटना', 'ਸੱਟ'],
  ['sugar', 'diabetes', 'madhumeh', 'thyroid', 'hormone', 'शुगर', 'मधुमेह', 'ਸ਼ੂਗਰ'],
  ['surgery', 'operation', 'hernia', 'gallbladder', 'pitta', 'lump', 'gilti', 'सर्जरी', 'ऑपरेशन', 'ਸਰਜਰੀ'],
  ['cancer', 'tumor', 'tumour', 'chemo', 'radiation', 'oncology', 'कैंसर', 'ਕੈਂਸਰ']
];

/**
 * Normalize Hinglish/Romanized spellings so common phonetic variants match.
 */
export function normalizeVernacular(text) {
  if (!text) return '';
  return text
    .toLowerCase()
    .trim()
    .replace(/aa+/g, 'a')
    .replace(/ee+/g, 'i')
    .replace(/oo+/g, 'u')
    .replace(/([a-z])\1+/g, '$1') // collapse doubled consonants like chh/bb/tt
    .replace(/\s+/g, ' ');
}

/**
 * Expand a query string into normalized tokens + matching vernacular synonyms.
 */
export function expandSearchTokens(query) {
  const raw = (query || '').toLowerCase().trim();
  const norm = normalizeVernacular(raw);
  if (!raw) return [];

  const words = Array.from(new Set([...raw.split(/\s+/), ...norm.split(/\s+/)])).filter(Boolean);
  const expanded = new Set(words);

  for (const group of SYNONYM_GROUPS) {
    const normalizedGroup = group.map(normalizeVernacular);
    const hit = words.some(
      (w) =>
        group.some((term) => term.includes(w) || (w.length >= 3 && term.startsWith(w))) ||
        normalizedGroup.some((term) => term.includes(w) || (w.length >= 3 && term.startsWith(w)))
    );
    if (hit) {
      group.forEach((term) => expanded.add(term));
      normalizedGroup.forEach((term) => expanded.add(term));
    }
  }

  return Array.from(expanded);
}

/**
 * Score and filter departments for a query. Higher score = better match.
 */
export function matchDepartments(departments, query, selectedBuilding = 'all') {
  const q = (query || '').toLowerCase().trim();
  const qNorm = normalizeVernacular(q);
  const tokens = expandSearchTokens(q);

  const results = [];

  for (const dept of departments) {
    if (selectedBuilding !== 'all' && dept.building_id !== selectedBuilding) {
      continue;
    }
    if (!q) {
      results.push({ dept, score: 1 });
      continue;
    }

    let score = 0;
    const nameEn = (dept.name || '').toLowerCase();
    const nameHi = dept.hindi_name || '';
    const namePa = dept.punjabi_name || '';
    const concerns = (dept.concerns || []).map((c) => c.toLowerCase());
    const concernsNorm = concerns.map(normalizeVernacular);
    const notes = (dept.notes || '').toLowerCase();

    // Direct query matches get highest weight
    if (nameEn.includes(q) || nameHi.includes(q) || namePa.includes(q)) {
      score += 10;
    }
    if (concerns.some((c) => c.includes(q)) || concernsNorm.some((c) => c.includes(qNorm))) {
      score += 8;
    }
    if (notes.includes(q)) {
      score += 3;
    }

    // Vernacular synonym expansion matches
    for (const token of tokens) {
      if (token.length < 2) continue;
      if (nameEn.includes(token) || nameHi.includes(token) || namePa.includes(token)) {
        score += 4;
      }
      if (concerns.some((c) => c.includes(token)) || concernsNorm.some((c) => c.includes(token))) {
        score += 3;
      }
    }

    if (score > 0) {
      results.push({ dept, score });
    }
  }

  results.sort((a, b) => b.score - a.score);
  return results.map((r) => r.dept);
}

const ANALYTICS_STORAGE_KEY = 'pgi_saathi_search_stats';

/**
 * Privacy-preserving local search query counter.
 * Rejects numbers (>=4 digits) and long strings to avoid storing any PII/CR numbers.
 */
export function recordLocalSearchStat(query, resultCount) {
  try {
    const clean = (query || '').trim().toLowerCase();
    if (clean.length < 3 || clean.length > 32) return;
    if (/\d{4,}/.test(clean)) return; // Never record anything resembling CR/phone/Aadhaar

    const stats = JSON.parse(localStorage.getItem(ANALYTICS_STORAGE_KEY) || '{"terms":{},"zeroHits":{}}');
    stats.terms[clean] = (stats.terms[clean] || 0) + 1;
    if (resultCount === 0) {
      stats.zeroHits[clean] = (stats.zeroHits[clean] || 0) + 1;
    }
    localStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(stats));
  } catch {
    // Ignore storage quota errors
  }
}
