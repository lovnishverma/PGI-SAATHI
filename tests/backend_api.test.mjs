import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import app from '../backend/src/server.js';

describe('Backend REST API Contract & Controllers', () => {
  let server;
  let baseUrl;

  before(async () => {
    await new Promise((resolve) => {
      server = app.listen(0, () => {
        const port = server.address().port;
        baseUrl = `http://127.0.0.1:${port}`;
        resolve();
      });
    });
  });

  after(async () => {
    if (server) {
      await new Promise((resolve) => server.close(resolve));
    }
  });

  test('GET /health returns healthy status and service version', async () => {
    const res = await fetch(`${baseUrl}/health`);
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.status, 'healthy');
    assert.equal(body.version, '2.2.0');
    assert.ok(body.timestamp);
  });

  test('GET /api/departments returns published departments', async () => {
    const res = await fetch(`${baseUrl}/api/departments`);
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.success, true);
    assert.ok(body.count > 0);
    assert.ok(Array.isArray(body.data));

    // Assert strictly published
    for (const d of body.data) {
      assert.equal(d.status, 'published');
    }
  });

  test('GET /api/departments?building=acc filters strictly by building', async () => {
    const res = await fetch(`${baseUrl}/api/departments?building=acc`);
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.success, true);
    for (const d of body.data) {
      assert.equal(d.building_id, 'acc');
    }
  });

  test('GET /api/buildings returns published campus buildings', async () => {
    const res = await fetch(`${baseUrl}/api/buildings`);
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.success, true);
    assert.ok(body.count >= 5);
    const ids = body.data.map(b => b.id);
    assert.ok(ids.includes('new_opd'));
    assert.ok(ids.includes('acc'));
    assert.ok(ids.includes('apc'));
    assert.ok(ids.includes('aec'));
  });

  test('GET /api/schedule returns verified OPD timings', async () => {
    const res = await fetch(`${baseUrl}/api/schedule`);
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.success, true);
    assert.ok(body.data.weekdays.registration_timings.includes('8:00 AM'));
  });

  test('POST /api/feedback rejects PII (phone number)', async () => {
    const res = await fetch(`${baseUrl}/api/feedback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        category: 'incorrect_room',
        message: 'Please call me at 9876543210 about room 127.'
      })
    });
    assert.equal(res.status, 400);
    const body = await res.json();
    assert.equal(body.success, false);
    assert.match(body.error, /phone number/i);
  });

  test('POST /api/feedback rejects payload shorter than 5 chars', async () => {
    const res = await fetch(`${baseUrl}/api/feedback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category: 'general', message: 'Bad' })
    });
    assert.equal(res.status, 400);
  });

  test('POST /api/feedback accepts clean navigation feedback with honest persistence reporting', async () => {
    const res = await fetch(`${baseUrl}/api/feedback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        category: 'incorrect_room',
        message: 'The blood collection counter room was updated on the noticeboard.'
      })
    });
    assert.ok(res.status === 200 || res.status === 201);
    const body = await res.json();
    assert.equal(body.success, true);
    assert.ok(body.id);
  });

});
