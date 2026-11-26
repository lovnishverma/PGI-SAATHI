/**
 * PGI Saathi - Privacy & Data Sanitization Utility
 * Strictly protects patient confidentiality by identifying and rejecting
 * personal identifiers (CR numbers, Aadhaar numbers, phone numbers, emails).
 */

// Indian Mobile Number: 10 digits starting with 6, 7, 8, or 9
const PHONE_REGEX = /\b[6-9]\d{9}\b/;
// International / Formatted Phone: +91-XXXXX-XXXXX, 0172-XXXXXXX, etc.
const FORMATTED_PHONE_REGEX = /(?:\+91[- ]?)?[6-9]\d{4}[- ]?\d{5}\b/;

// Aadhaar: 12 digits, often formatted as XXXX XXXX XXXX or XXXXXXXXXXXX
const AADHAAR_REGEX = /\b\d{4}\s?\d{4}\s?\d{4}\b/;

// PGIMER Central Registration (CR) number variations
// Examples: CR 202401234567, CR NO: 123456, 10-12 continuous digits
const CR_EXPLICIT_REGEX = /\b(?:cr\s*(?:no\.?|num(?:ber)?)?|c\.r\.?)\s*[:#-]?\s*\d{4,14}\b/i;
const LONG_DIGIT_SEQUENCE_REGEX = /\b\d{10,14}\b/;

// Email Address
const EMAIL_REGEX = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;

// Medical Document and Patient Record terms
const PHI_KEYWORDS = [
  'cr number',
  'cr no',
  'cr card',
  'aadhaar',
  'aadhar',
  'patient name',
  'mريض ka naam',
  'prescription photo',
  'report pdf',
  'discharge summary attached',
  'biopsy report',
  'patient phone'
];

/**
 * Validates feedback text for privacy compliance.
 * @param {string} text - User input string
 * @returns {{ isValid: boolean, error?: string, sanitizedLength: number }}
 */
export function validateFeedbackPrivacy(text) {
  if (!text || typeof text !== 'string') {
    return {
      isValid: false,
      error: "Message must be provided as text."
    };
  }

  const trimmed = text.trim();

  if (trimmed.length < 5) {
    return {
      isValid: false,
      error: "Message must be at least 5 characters long."
    };
  }

  if (trimmed.length > 1200) {
    return {
      isValid: false,
      error: "Message exceeds maximum allowed length of 1200 characters."
    };
  }

  const lower = trimmed.toLowerCase();

  // Check explicit keywords
  for (const kw of PHI_KEYWORDS) {
    if (lower.includes(kw)) {
      return {
        isValid: false,
        error: "For patient confidentiality, please do not include CR numbers, patient identifiers, or medical records."
      };
    }
  }

  // Check CR Number pattern
  if (CR_EXPLICIT_REGEX.test(trimmed)) {
    return {
      isValid: false,
      error: "Hospital Central Registration (CR) number detected. For privacy, never share patient card numbers."
    };
  }

  // Check Aadhaar pattern
  if (AADHAAR_REGEX.test(trimmed)) {
    return {
      isValid: false,
      error: "Possible 12-digit Aadhaar / National ID detected. Please remove sensitive government IDs."
    };
  }

  // Check Mobile / Phone pattern
  if (PHONE_REGEX.test(trimmed) || FORMATTED_PHONE_REGEX.test(trimmed)) {
    return {
      isValid: false,
      error: "Personal phone number detected. Please remove personal contact numbers."
    };
  }

  // Check Email pattern
  if (EMAIL_REGEX.test(trimmed)) {
    return {
      isValid: false,
      error: "Email address detected. Please do not submit personal contact details."
    };
  }

  // Check long digit sequence (potential patient account/ID)
  if (LONG_DIGIT_SEQUENCE_REGEX.test(trimmed)) {
    return {
      isValid: false,
      error: "Long identification number detected. Please do not submit patient identifiers."
    };
  }

  return {
    isValid: true,
    sanitizedLength: trimmed.length
  };
}
