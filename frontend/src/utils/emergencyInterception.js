/**
 * PGI Saathi - Emergency Interception & Clinical Safety Utility
 * 
 * CRITICAL SAFETY DIRECTIVE:
 * Ordinary keyword matching must NEVER intercept or downgrade a medical emergency.
 * When an acute or life-threatening symptom is searched, routine OPD clinic matching
 * is immediately halted and intercepted with immediate 24x7 emergency instructions.
 */

export const EMERGENCY_PATTERNS = [
  // Cardiac: chest + pain, heart + attack, cardiac arrest, dil + daura, seene/chhati + dard
  {
    matches: (q) => (
      (q.includes('chest') && q.includes('pain')) ||
      (q.includes('heart') && (q.includes('attack') || q.includes('arrest') || q.includes('failure'))) ||
      q.includes('cardiac arrest') || q.includes('cardiac emergency') ||
      ((q.includes('seene') || q.includes('chhati') || q.includes('chhathi') || q.includes('chaati')) && q.includes('dard')) ||
      ((q.includes('dil') || q.includes('hriday')) && (q.includes('daura') || q.includes('attack') || q.includes('problem'))) ||
      q.includes('सीने में दर्द') || q.includes('छाती में दर्द') || q.includes('दिल का दौरा') ||
      q.includes('ਛਾਤੀ ਵਿੱਚ ਦਰਦ') || q.includes('ਦਿਲ ਦਾ ਦੌਰਾ')
    ),
    label: "Acute Chest Pain / Heart Emergency"
  },

  // Respiratory Failure / Choking / Suffocation
  {
    matches: (q) => (
      (q.includes('breath') && (q.includes('short') || q.includes('difficult') || q.includes('cannot') || q.includes('stop') || q.includes('less'))) ||
      q.includes('choking') || q.includes('suffocat') || q.includes('dam ghut') ||
      ((q.includes('saans') || q.includes('saah')) && (q.includes('phool') || q.includes('charh') || q.includes('ghut') || q.includes('takleef') || q.includes('ruk') || q.includes('nahi aa'))) ||
      q.includes('सांस फूलना') || q.includes('सांस नहीं') || q.includes('दम घुट') ||
      q.includes('ਸਾਹ ਚੜ੍ਹਨਾ') || q.includes('ਦਮ ਘੁੱਟ')
    ),
    label: "Severe Respiratory Distress / Choking"
  },

  // Stroke / Paralysis / Facial Drooping
  {
    matches: (q) => (
      q.includes('stroke') || q.includes('paralys') || q.includes('face droop') || q.includes('slurred speech') ||
      (q.includes('ek taraf') && q.includes('kamzor')) ||
      q.includes('lakwa') || q.includes('adhrang') ||
      q.includes('लकवा') || q.includes('अधरंग') || q.includes('ਅਧਰੰਗ')
    ),
    label: "Possible Stroke / Acute Paralysis"
  },

  // Unconscious / Non-responsive / Coma
  {
    matches: (q) => (
      q.includes('unconscious') || q.includes('faint') || q.includes('collapsed') ||
      q.includes('behosh') || q.includes('hosh nahi') ||
      q.includes('बेहोश') || q.includes('ਬੇਹੋਸ਼')
    ),
    label: "Loss of Consciousness / Unresponsive"
  },

  // Major Trauma / Bleeding / Head Injury
  {
    matches: (q) => (
      ((q.includes('bleed') || q.includes('blood')) && (q.includes('heavy') || q.includes('profuse') || q.includes('severe') || q.includes('unstop'))) ||
      q.includes('accident') || q.includes('trauma') || q.includes('head injury') ||
      ((q.includes('khoon') || q.includes('khun')) && (q.includes('beh') || q.includes('ruk nahi') || q.includes('zyada') || q.includes('bahut'))) ||
      (q.includes('sir') && q.includes('chot')) ||
      q.includes('भारी खून') || q.includes('सड़क दुर्घटना') || q.includes('ਭਾਰੀ ਖੂਨ')
    ),
    label: "Acute Trauma / Severe Bleeding"
  },

  // Active Seizures / Convulsions
  {
    matches: (q) => (
      q.includes('seizure') || q.includes('convulsion') || q.includes('fits') ||
      (q.includes('mirgi') && q.includes('daura')) ||
      q.includes('दौरा') || q.includes('ਦੌਰਾ')
    ),
    label: "Active Seizures / Convulsions"
  },

  // Poisoning / Snakebite
  {
    matches: (q) => (
      q.includes('poison') || q.includes('snake bite') || q.includes('snakebite') ||
      q.includes('zehar') || q.includes('सांप का काटना') || q.includes('ਜ਼ਹਿਰ')
    ),
    label: "Suspected Poisoning / Snakebite"
  }
];

/**
 * Normalizes input text for safety evaluation.
 * Strips punctuation, collapses whitespaces, lowercases.
 * @param {string} query
 * @returns {string}
 */
export function normalizeQuery(query) {
  if (!query) return '';
  return query
    .toLowerCase()
    .replace(/[.,/#!$%^&*;:{}=\-_`~()?"'’]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Evaluates whether a search query represents an acute medical emergency.
 * @param {string} query
 * @returns {{ isEmergency: boolean, matchedTerm?: string, label?: string }}
 */
export function detectEmergency(query) {
  const normalized = normalizeQuery(query);
  if (!normalized || normalized.length < 3) {
    return { isEmergency: false };
  }

  for (const pattern of EMERGENCY_PATTERNS) {
    if (pattern.matches(normalized)) {
      return {
        isEmergency: true,
        label: pattern.label
      };
    }
  }

  return { isEmergency: false };
}

/**
 * Off-Campus Patient Deflection Patterns
 * Handles specific searches where patients mistakenly arrive at PGIMER tertiary care
 * instead of the authorized municipal/civil facilities (e.g. routine dog bites / yellow fever).
 */
export const DEFLECTION_PATTERNS = [
  {
    type: 'animal_bite',
    matches: (q) => (
      q.includes('dog bite') || q.includes('kutta') || q.includes('rabies') || 
      q.includes('animal bite') || q.includes('monkey bite') || q.includes('cat bite') || 
      q.includes('billi') || q.includes('bandar') || q.includes('कुत्ता') || 
      q.includes('काट') || q.includes('ਕੁੱਤਾ') || q.includes('anti rabies') || q.includes('arv')
    ),
    badge: 'Off-Campus Referral (GMSH 16)',
    phone: '0172-2768201',
    phoneLabel: 'GMSH-16: 0172-2768201',
    titles: {
      en: 'Dog / Animal Bite (Anti-Rabies Notice)',
      hi: 'कुत्ते / जानवर के काटने पर ध्यान दें',
      pa: 'ਕੁੱਤੇ / ਜਾਨਵਰ ਦੇ ਕੱਟਣ ਬਾਰੇ ਅਹਿਮ ਜਾਣਕਾਰੀ'
    },
    warnings: {
      en: 'PGIMER does NOT run a routine outpatient Anti-Rabies Vaccination (ARV) clinic. Rushing to PGI queues will cause dangerous delays in post-exposure treatment.',
      hi: 'पीजीआई (PGIMER) में सामान्य एंटी-रेबीज इंजेक्शन (Anti-Rabies Vaccine) नहीं लगाया जाता है। पीजीआई में कतार में खड़े होकर समय व्यर्थ न करें।',
      pa: 'ਪੀਜੀਆਈ (PGIMER) ਵਿਖੇ ਐਂਟੀ-ਰੇਬੀਜ਼ ਟੀਕੇ (Anti-Rabies Vaccine) ਨਹੀਂ ਲੱਗਦੇ। ਲਾਈਨ ਵਿੱਚ ਖੜ੍ਹੇ ਹੋ ਕੇ ਕੀਮਤੀ ਸਮਾਂ ਖਰਾਬ ਨਾ ਕਰੋ।'
    },
    destinations: {
      en: 'Designated 24x7 Anti-Rabies Centre: GMSH Sector 16 (Emergency ARV Counter) or Civil Hospital Sector 22, Chandigarh. (PGI ATC only handles severe surgical/mangling trauma).',
      hi: 'एंटी-रेबीज इंजेक्शन के लिए तुरंत यहां जाएं: GMSH सेक्टर 16 (24 घंटे इमरजेंसी इंजेक्शन रूम) या सिविल अस्पताल सेक्टर 22, चंडीगढ़।',
      pa: 'ਐਂਟੀ-ਰੇਬੀਜ਼ ਟੀਕੇ ਲਈ ਤੁਰੰਤ ਇੱਥੇ ਜਾਓ: ਜੀ.ਐੱਮ.ਐੱਸ.ਐੱਚ. ਸੈਕਟਰ 16 (24 ਘੰਟੇ ਐਮਰਜੈਂਸੀ ਰੂਮ) ਜਾਂ ਸਿਵਲ ਹਸਪਤਾਲ ਸੈਕਟਰ 22, ਚੰਡੀਗੜ੍ਹ।'
    }
  },
  {
    type: 'travel_vaccine',
    matches: (q) => (
      q.includes('yellow fever') || q.includes('travel vaccine') || 
      q.includes('peela bukhar') || q.includes('international vaccine') || 
      q.includes('ਯੈਲੋ ਫੀਵਰ') ||
      ((q.includes('विदेश') || q.includes('travel') || q.includes('international') || q.includes('videsh')) && 
       (q.includes('टीका') || q.includes('teeka') || q.includes('tika') || q.includes('vaccin') || q.includes('ਟੀਕਾ')))
    ),
    badge: 'Civil Hospital Sec 22 Only',
    phone: '0172-2702222',
    phoneLabel: 'Civil Hosp 22: 0172-2702222',
    titles: {
      en: 'Yellow Fever / International Travel Vaccine Notice',
      hi: 'येलो फीवर / विदेश यात्रा टीकाकरण सूचना',
      pa: 'ਯੈਲੋ ਫੀਵਰ / ਵਿਦੇਸ਼ ਯਾਤਰਾ ਟੀਕਾਕਰਨ ਸੂਚਨਾ'
    },
    warnings: {
      en: 'PGIMER is NOT an authorized Yellow Fever / International Travel Vaccination centre.',
      hi: 'पीजीआई (PGIMER) में विदेश यात्रा के लिए अनिवार्य येलो फीवर का टीका नहीं लगाया जाता।',
      pa: 'ਪੀਜੀਆਈ (PGIMER) ਵਿਖੇ ਅੰਤਰਰਾਸ਼ਟਰੀ ਯਾਤਰਾ ਲਈ ਯੈਲੋ ਫੀਵਰ ਦਾ ਟੀਕਾ ਉਪਲਬਧ ਨਹੀਂ ਹੈ।'
    },
    destinations: {
      en: 'Official Authorized Centre: Civil Hospital, Sector 22, Chandigarh (Authorized Yellow Fever Vaccination & International Certificate Centre).',
      hi: 'चंडीगढ़ में अधिकृत केंद्र: सिविल अस्पताल, सेक्टर 22 (Civil Hospital Sector 22), चंडीगढ़।',
      pa: 'ਚੰਡੀਗੜ੍ਹ ਵਿੱਚ ਅਧਿਕਾਰਤ ਕੇਂਦਰ: ਸਿਵਲ ਹਸਪਤਾਲ, ਸੈਕਟਰ 22, ਚੰਡੀਗੜ੍ਹ।'
    }
  }
];

/**
 * Checks if a search query matches an off-campus deflection condition.
 * @param {string} query
 * @param {string} [lang='en']
 * @returns {object|null}
 */
export function detectOffCampusDeflection(query, lang = 'en') {
  const normalized = normalizeQuery(query);
  if (!normalized || normalized.length < 3) {
    return null;
  }

  for (const pattern of DEFLECTION_PATTERNS) {
    if (pattern.matches(normalized)) {
      return {
        type: pattern.type,
        badge: pattern.badge,
        phone: pattern.phone,
        phoneLabel: pattern.phoneLabel,
        title: pattern.titles[lang] || pattern.titles.en,
        warning: pattern.warnings[lang] || pattern.warnings.en,
        destination: pattern.destinations[lang] || pattern.destinations.en
      };
    }
  }

  return null;
}

