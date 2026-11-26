import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { validateFeedbackPrivacy } from '../frontend/src/utils/privacyValidator.js';

describe('Privacy Validator - Unit Tests', () => {

  test('allows safe and non-sensitive hospital navigation feedback', () => {
    const validMessages = [
      "Room 127 blood collection counter was shifted to Room 128.",
      "The OPD registration timing for special clinics starts at 9am instead of 8am.",
      "Punjabi translation for Ophthalmology has a small typo on signboards.",
      "Wheelchair ramp near Gate 1 needs clearer signage."
    ];

    for (const msg of validMessages) {
      const res = validateFeedbackPrivacy(msg);
      assert.equal(res.isValid, true, `Expected message to pass: "${msg}"`);
      assert.ok(res.sanitizedLength > 0);
    }
  });

  test('rejects 10-digit Indian mobile numbers', () => {
    const messagesWithPhone = [
      "Please call me back on 9876543210 regarding the room.",
      "My number is 8123456789.",
      "Contact 7012345678 if counter changes."
    ];

    for (const msg of messagesWithPhone) {
      const res = validateFeedbackPrivacy(msg);
      assert.equal(res.isValid, false);
      assert.match(res.error, /phone number/i);
    }
  });

  test('rejects 12-digit Aadhaar / National ID patterns', () => {
    const messagesWithAadhaar = [
      "Patient Aadhaar card number is 2345 6789 0123.",
      "My UID is 456789012345.",
      "Aadhaar 1234 5678 9012 verification pending."
    ];

    for (const msg of messagesWithAadhaar) {
      const res = validateFeedbackPrivacy(msg);
      assert.equal(res.isValid, false);
      assert.match(res.error, /aadhaar|national id|patient/i);
    }
  });

  test('rejects PGIMER Central Registration (CR) numbers', () => {
    const messagesWithCR = [
      "Patient CR number is 202401234567.",
      "Please check CR No: 987654321.",
      "Our CR card is 12345678."
    ];

    for (const msg of messagesWithCR) {
      const res = validateFeedbackPrivacy(msg);
      assert.equal(res.isValid, false);
      assert.match(res.error, /CR|patient/i);
    }
  });

  test('rejects email addresses', () => {
    const res = validateFeedbackPrivacy("Send updated schedule to patient.help@gmail.com please.");
    assert.equal(res.isValid, false);
    assert.match(res.error, /email address/i);
  });

  test('enforces minimum and maximum payload boundaries', () => {
    assert.equal(validateFeedbackPrivacy("Hi").isValid, false);
    assert.match(validateFeedbackPrivacy("Hi").error, /at least 5 characters/i);

    const longMessage = "a".repeat(1201);
    assert.equal(validateFeedbackPrivacy(longMessage).isValid, false);
    assert.match(validateFeedbackPrivacy(longMessage).error, /exceeds maximum allowed length/i);
  });

  test('rejects empty, null, or non-string inputs', () => {
    assert.equal(validateFeedbackPrivacy(null).isValid, false);
    assert.equal(validateFeedbackPrivacy(undefined).isValid, false);
    assert.equal(validateFeedbackPrivacy("   ").isValid, false);
  });

});
