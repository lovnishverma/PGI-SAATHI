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

});
