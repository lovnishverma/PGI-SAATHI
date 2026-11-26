import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { 
  authoritativeDirectory, 
  validateDepartment, 
  validateBuilding, 
  filterPublished 
} from '../frontend/src/data/authoritativeDirectory.js';

describe('Authoritative Data Governance & Schemas', () => {

  test('metadata contains required provenance fields', () => {
    const meta = authoritativeDirectory.metadata;
    assert.ok(meta.source, 'Metadata source must be defined');
    assert.ok(meta.version, 'Metadata version must be defined');
    assert.ok(meta.verified_at, 'Metadata verified_at date must be defined');
    assert.ok(meta.reviewer_role, 'Metadata reviewer_role must be defined');
    assert.equal(meta.status, 'published');
  });

  test('all departments validate against domain schema and are published', () => {
    const depts = authoritativeDirectory.departments;
    assert.ok(depts.length >= 10, 'Must have at least 10 baseline departments');

    for (const dept of depts) {
      assert.ok(validateDepartment(dept), `Department ${dept.id} failed validation`);
      assert.equal(dept.status, 'published', `Department ${dept.id} must be published`);
      assert.ok(dept.verified_at, `Department ${dept.id} must have verified_at date`);
      assert.ok(dept.reviewer_role, `Department ${dept.id} must have reviewer_role`);
      assert.ok(dept.source_reference, `Department ${dept.id} must cite source reference`);
    }
  });

  test('all buildings validate and all department foreign keys resolve', () => {
    const buildings = authoritativeDirectory.buildings;
    const buildingIds = new Set(buildings.map(b => b.id));

    assert.ok(buildings.length >= 5, 'Must have all main PGIMER center buildings');

    for (const bldg of buildings) {
      assert.ok(validateBuilding(bldg), `Building ${bldg.id} failed validation`);
      assert.equal(bldg.status, 'published', `Building ${bldg.id} must be published`);
    }

    // Foreign key check
    for (const dept of authoritativeDirectory.departments) {
      assert.ok(
        buildingIds.has(dept.building_id), 
        `Department ${dept.id} references non-existent building ${dept.building_id}`
      );
    }
  });

  test('filterPublished strictly excludes drafts, reviews, and withdrawn records', () => {
    const mockList = [
      { id: '1', status: 'published', name: 'Active Dept' },
      { id: '2', status: 'draft', name: 'Draft Dept' },
      { id: '3', status: 'review', name: 'Review Dept' },
      { id: '4', status: 'withdrawn', name: 'Deprecated Dept' },
      { id: '5', name: 'Missing Status Dept' }
    ];

    const publishedOnly = filterPublished(mockList);
    assert.equal(publishedOnly.length, 1);
    assert.equal(publishedOnly[0].id, '1');
  });

  test('OPD schedule contains weekday and Saturday rules', () => {
    const schedule = authoritativeDirectory.opd_schedule;
    assert.equal(schedule.status, 'published');
    assert.ok(schedule.weekdays.registration_timings.includes('8:00 AM'));
    assert.ok(schedule.weekdays.registration_timings.includes('11:00 AM'));
    assert.ok(schedule.saturday_and_holidays.registration_timings.includes('10:30 AM'));
  });

  test('patient_journey_steps contains 6-step chronological walkthrough', () => {
    const steps = authoritativeDirectory.patient_journey_steps;
    assert.ok(Array.isArray(steps));
    assert.equal(steps.length, 6, 'Must contain exactly 6 chronological journey steps');
    for (const s of steps) {
      assert.ok(s.step >= 1 && s.step <= 6);
      assert.ok(s.title && s.hindi_title && s.punjabi_title, 'Step must have titles in 3 languages');
      assert.ok(s.desc && s.hindi_desc && s.punjabi_desc, 'Step must have descriptions in 3 languages');
      assert.equal(s.status, 'published');
    }
  });

  test('new_opd_floor_directory accurately maps Ground to 5th Floor layout', () => {
    const floors = authoritativeDirectory.new_opd_floor_directory;
    assert.ok(Array.isArray(floors));
    assert.equal(floors.length, 6, 'Must cover Ground floor through 5th floor (6 levels)');
    
    // Check key departments verified from ground reality
    const ground = floors.find(f => f.floor.includes('Ground'));
    assert.ok(ground.services.some(s => s.includes('Registration') || s.includes('CR Card')));
    
    const first = floors.find(f => f.floor.includes('1st'));
    assert.ok(first.services.some(s => s.includes('127') || s.includes('Blood')));

    const third = floors.find(f => f.floor.includes('3rd'));
    assert.ok(third.services.some(s => s.includes('Internal Medicine')));
  });

  test('amrit_pharmacies covers in-campus 24x7 HLL subsidized outlets', () => {
    const pharmacies = authoritativeDirectory.amrit_pharmacies;
    assert.ok(Array.isArray(pharmacies));
    assert.ok(pharmacies.length >= 5, 'Must list at least 5 in-campus AMRIT pharmacy locations');
    for (const p of pharmacies) {
      assert.ok(p.id && p.name && p.location);
      assert.ok(p.discounts.includes('%'), 'Must state discount percentage (e.g. 50%-70%)');
      assert.equal(p.status, 'published');
    }
  });

  test('sarais_and_amenities covers patient night shelters and dharamshalas', () => {
    const sarais = authoritativeDirectory.sarais_and_amenities;
    assert.ok(Array.isArray(sarais));
    assert.ok(sarais.length >= 3, 'Must list at least 3 major sarais (Infosys, Rotary, Hans Raj)');
    for (const s of sarais) {
      assert.ok(s.id && s.name && s.location);
      assert.equal(s.status, 'published');
    }
  });

});
