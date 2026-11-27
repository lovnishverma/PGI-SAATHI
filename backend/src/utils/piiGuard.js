/**
 * Zero-PII Guard for PGI Saathi (SRS Section 7.2 & Firestore Rules alignment).
 * Rejects payloads containing patient identifiers, CR numbers, Aadhaar, phone numbers, or emails.
 */

const FORBIDDEN_KEYS = [
  'cr_number',
  'aadhaar',
  'medical_report',
  'prescription',
  'patient_name',
  'phone',
  'email'
];

const FORBIDDEN_KEYWORDS = [
  'cr number',
  'cr no',
  'aadhaar',
  'prescription',
  'patient name',
  'report pdf'
];

const PII_PATTERNS = [
  { name: 'aadhaar_number', regex: /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/ },
  { name: 'mobile_number', regex: /(?:\+91[\s-]?)?\b[6-9]\d{9}\b/ },
  { name: 'cr_number', regex: /\bCR[\s.:#-]*\d{5,}\b/i },
  { name: 'email_address', regex: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i }
];

function validateNoPII(body, message) {
  if (body && typeof body === 'object') {
    for (const key of FORBIDDEN_KEYS) {
      if (Object.prototype.hasOwnProperty.call(body, key)) {
        return {
          valid: false,
          reason: `Forbidden field "${key}" is not allowed for patient privacy.`
        };
      }
    }
  }

  const lower = message.toLowerCase();
  for (const kw of FORBIDDEN_KEYWORDS) {
    if (lower.includes(kw)) {
      return {
        valid: false,
        reason: 'For patient confidentiality, please do not include CR numbers, patient identifiers, or medical reports.'
      };
    }
  }

  for (const pattern of PII_PATTERNS) {
    if (pattern.regex.test(message)) {
      return {
        valid: false,
        reason: 'For patient confidentiality, please remove phone numbers, Aadhaar/CR numbers, or email addresses before submitting.'
      };
    }
  }

  return { valid: true };
}

module.exports = {
  FORBIDDEN_KEYS,
  validateNoPII
};
