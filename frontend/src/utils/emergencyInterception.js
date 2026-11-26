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
