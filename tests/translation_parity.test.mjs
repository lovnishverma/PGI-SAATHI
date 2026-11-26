import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { translations } from '../frontend/src/locales/translations.js';

describe('Multilingual Translation Parity (En / Hi / Pa)', () => {

  const enKeys = Object.keys(translations.en);
  const hiKeys = Object.keys(translations.hi);
  const paKeys = Object.keys(translations.pa);

  test('all supported languages have identical key sets', () => {
    assert.equal(enKeys.length, hiKeys.length, 'Hindi key count must match English');
    assert.equal(enKeys.length, paKeys.length, 'Punjabi key count must match English');

    const missingInHi = enKeys.filter(k => !(k in translations.hi));
    const missingInPa = enKeys.filter(k => !(k in translations.pa));

    assert.deepEqual(missingInHi, [], 'Hindi missing translation keys');
    assert.deepEqual(missingInPa, [], 'Punjabi missing translation keys');
  });

  test('no translation string is empty or blank', () => {
    for (const [lang, table] of Object.entries(translations)) {
      for (const [key, val] of Object.entries(table)) {
        if (typeof val === 'string') {
          assert.ok(val.trim().length > 0, `Language ${lang} has empty string for key ${key}`);
        } else if (Array.isArray(val)) {
          assert.ok(val.length > 0, `Language ${lang} has empty array for key ${key}`);
        }
      }
    }
  });

  test('checklist_items have identical item IDs across all locales', () => {
    const enChecklist = translations.en.checklist_items;
    const hiChecklist = translations.hi.checklist_items;
    const paChecklist = translations.pa.checklist_items;

    assert.equal(enChecklist.length, hiChecklist.length);
    assert.equal(enChecklist.length, paChecklist.length);

    const enIds = enChecklist.map(i => i.id);
    const hiIds = hiChecklist.map(i => i.id);
    const paIds = paChecklist.map(i => i.id);

    assert.deepEqual(enIds, hiIds);
    assert.deepEqual(enIds, paIds);
  });

});
