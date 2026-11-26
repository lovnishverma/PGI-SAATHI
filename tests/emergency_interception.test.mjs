import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { detectEmergency, detectOffCampusDeflection, normalizeQuery } from '../frontend/src/utils/emergencyInterception.js';

describe('Emergency Interception Engine - Unit Tests', () => {

  test('detects acute cardiac emergencies across languages', () => {
    // English
    assert.equal(detectEmergency('I have severe chest pain').isEmergency, true);
    assert.equal(detectEmergency('Suspected heart attack').isEmergency, true);
    assert.equal(detectEmergency('cardiac arrest emergency').isEmergency, true);

    // Transliterated Hindi
    assert.equal(detectEmergency('chhati mein dard ho raha hai').isEmergency, true);
    assert.equal(detectEmergency('bahut tej seene mein dard hai').isEmergency, true);
    assert.equal(detectEmergency('dil ka daura').isEmergency, true);

    // Hindi Devanagari
    assert.equal(detectEmergency('सीने में दर्द हो रहा है').isEmergency, true);
    assert.equal(detectEmergency('छाती में दर्द').isEmergency, true);
    assert.equal(detectEmergency('दिल का दौरा पड़ा है').isEmergency, true);

    // Punjabi Gurmukhi
    assert.equal(detectEmergency('ਮਰੀਜ਼ ਨੂੰ ਛਾਤੀ ਵਿੱਚ ਦਰਦ ਹੈ').isEmergency, true);
    assert.equal(detectEmergency('ਦਿਲ ਦਾ ਦੌਰਾ').isEmergency, true);
  });

  test('detects acute respiratory failure and choking', () => {
    assert.equal(detectEmergency('patient has shortness of breath').isEmergency, true);
    assert.equal(detectEmergency('cannot breathe').isEmergency, true);
    assert.equal(detectEmergency('choking on food').isEmergency, true);
    assert.equal(detectEmergency('saans phoolna bahut zyada').isEmergency, true);
    assert.equal(detectEmergency('dam ghutna').isEmergency, true);
    assert.equal(detectEmergency('ਮਰੀਜ਼ ਦਾ ਦਮ ਘੁੱਟਣਾ ਸ਼ੁਰੂ ਹੋ ਗਿਆ').isEmergency, true);
    assert.equal(detectEmergency('ਸਾਹ ਚੜ੍ਹਨਾ').isEmergency, true);
  });

  test('detects acute stroke and sudden paralysis', () => {
    assert.equal(detectEmergency('stroke patient').isEmergency, true);
    assert.equal(detectEmergency('face drooping and slurred speech').isEmergency, true);
    assert.equal(detectEmergency('ek taraf kamzori aa gayi').isEmergency, true);
    assert.equal(detectEmergency('lakwa mar gaya').isEmergency, true);
    assert.equal(detectEmergency('लकवा के लक्षण').isEmergency, true);
    assert.equal(detectEmergency('ਅਧਰੰਗ ਦਾ ਦੌਰਾ').isEmergency, true);
  });

  test('detects loss of consciousness and coma', () => {
    assert.equal(detectEmergency('patient is unconscious').isEmergency, true);
    assert.equal(detectEmergency('sudden fainting on floor').isEmergency, true);
    assert.equal(detectEmergency('mareez behosh ho gaya').isEmergency, true);
    assert.equal(detectEmergency('hosh nahi aa raha').isEmergency, true);
    assert.equal(detectEmergency('मरीज बेहोश है').isEmergency, true);
    assert.equal(detectEmergency('ਮਰੀਜ਼ ਬੇਹੋਸ਼ ਹੋ ਗਿਆ ਹੈ').isEmergency, true);
  });

  test('detects acute trauma, major bleeding, and accidents', () => {
    assert.equal(detectEmergency('heavy bleeding from leg').isEmergency, true);
    assert.equal(detectEmergency('profuse bleeding after accident').isEmergency, true);
    assert.equal(detectEmergency('road accident near gate').isEmergency, true);
    assert.equal(detectEmergency('severe head injury').isEmergency, true);
    assert.equal(detectEmergency('sir par chot lag gayi').isEmergency, true);
    assert.equal(detectEmergency('सड़क दुर्घटना में घायल').isEmergency, true);
    assert.equal(detectEmergency('ਭਾਰੀ ਖੂਨ ਵਗਣਾ ਸ਼ੁਰੂ ਹੈ').isEmergency, true);
  });

  test('detects seizures and convulsions', () => {
    assert.equal(detectEmergency('child having active seizure').isEmergency, true);
    assert.equal(detectEmergency('continuous fits and convulsions').isEmergency, true);
    assert.equal(detectEmergency('mirgi daura pad raha hai').isEmergency, true);
    assert.equal(detectEmergency('मरीज को दौरा आ रहा है').isEmergency, true);
  });

  test('detects poisoning and snakebite', () => {
    assert.equal(detectEmergency('suspected poison ingestion').isEmergency, true);
    assert.equal(detectEmergency('snake bite on farm').isEmergency, true);
    assert.equal(detectEmergency('zehar kha liya hai').isEmergency, true);
    assert.equal(detectEmergency('ਜ਼ਹਿਰ ਖਾ ਲਿਆ').isEmergency, true);
  });

  test('does NOT trigger emergency on routine non-acute symptoms', () => {
    assert.equal(detectEmergency('mild fever and cold').isEmergency, false);
    assert.equal(detectEmergency('chronic knee pain').isEmergency, false);
    assert.equal(detectEmergency('skin rash and itching').isEmergency, false);
    assert.equal(detectEmergency('dental toothache').isEmergency, false);
    assert.equal(detectEmergency('eye glasses checkup').isEmergency, false);
    assert.equal(detectEmergency('ear wax cleaning').isEmergency, false);
    assert.equal(detectEmergency('routine diabetes follow up').isEmergency, false);
    assert.equal(detectEmergency('backache').isEmergency, false);
  });

  test('handles edge case inputs cleanly', () => {
    assert.equal(detectEmergency('').isEmergency, false);
    assert.equal(detectEmergency('   ').isEmergency, false);
    assert.equal(detectEmergency('ab').isEmergency, false);
    assert.equal(detectEmergency('!@#$%^&*()').isEmergency, false);
    assert.equal(normalizeQuery('  Severe,  CHEST Pain!  '), 'severe chest pain');
  });

  test('detects off-campus deflection for animal/dog bite (Anti-Rabies)', () => {
    const resEn = detectOffCampusDeflection('I need injection for dog bite', 'en');
    assert.ok(resEn);
    assert.equal(resEn.type, 'animal_bite');
    assert.ok(resEn.destination.includes('GMSH Sector 16'));
    assert.ok(resEn.phone.includes('0172-2768201'));

    const resHi = detectOffCampusDeflection('कुत्ता काट लिया है', 'hi');
    assert.ok(resHi);
    assert.equal(resHi.type, 'animal_bite');
    assert.ok(resHi.destination.includes('GMSH'));

    const resPa = detectOffCampusDeflection('ਕੁੱਤਾ ਕੱਟਿਆ ਹੈ ਟੀਕਾ ਚਾਹੀਦਾ', 'pa');
    assert.ok(resPa);
    assert.equal(resPa.type, 'animal_bite');
  });

  test('detects off-campus deflection for Yellow Fever / Travel Vaccine', () => {
    const resEn = detectOffCampusDeflection('Where can I get yellow fever vaccine?', 'en');
    assert.ok(resEn);
    assert.equal(resEn.type, 'travel_vaccine');
    assert.ok(resEn.destination.includes('Civil Hospital, Sector 22'));
    assert.ok(resEn.phone.includes('0172-2702222'));

    const resHi = detectOffCampusDeflection('विदेश यात्रा के लिए टीका', 'hi');
    assert.ok(resHi);
    assert.equal(resHi.type, 'travel_vaccine');
  });

  test('returns null for non-deflection standard queries', () => {
    assert.equal(detectOffCampusDeflection('fever and cough'), null);
    assert.equal(detectOffCampusDeflection('eye cataract check'), null);
    assert.equal(detectOffCampusDeflection(''), null);
  });

});
