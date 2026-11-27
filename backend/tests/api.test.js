const { describe, it, before, after } = require('node:test');
const assert = require('node:assert/strict');

process.env.NODE_ENV = 'test';
process.env.ADMIN_API_KEY = 'test-admin-secret';
process.env.FEEDBACK_RATE_LIMIT_MAX = '50';

const app = require('../src/server');

let server;
let baseUrl;

before(async () => {
  await new Promise(resolve => {
    server = app.listen(0, () => {
      const { port } = server.address();
      baseUrl = `http://127.0.0.1:${port}`;
      resolve();
    });
  });
});

after(async () => {
  if (server) {
    await new Promise(resolve => server.close(resolve));
  }
});

async function request(path, options = {}) {
  const res = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    }
  });
  const body = await res.json();
  return { status: res.status, headers: res.headers, body };
}

describe('PGI Saathi Backend API', () => {
  it('GET /health returns healthy status', async () => {
    const { status, body } = await request('/health');
    assert.equal(status, 200);
    assert.equal(body.status, 'healthy');
  });

  it('GET /api/departments returns published departments with governance fields', async () => {
    const { status, body } = await request('/api/departments');
    assert.equal(status, 200);
    assert.equal(body.success, true);
    assert.ok(body.count > 0);
    assert.ok(body.data[0].verified_at);
    assert.equal(typeof body.data[0].is_stale, 'boolean');
  });

  it('GET /api/departments?search=fever filters matching departments', async () => {
    const { status, body } = await request('/api/departments?search=fever');
    assert.equal(status, 200);
    assert.equal(body.success, true);
    assert.ok(body.count >= 1);
  });

  it('GET /api/departments/:id returns department with building details and 404 for unknown', async () => {
    const { data: list } = (await request('/api/departments')).body;
    const firstId = list[0].id;

    const okRes = await request(`/api/departments/${firstId}`);
    assert.equal(okRes.status, 200);
    assert.equal(okRes.body.data.id, firstId);
    assert.ok(okRes.body.data.building);

    const notFound = await request('/api/departments/nonexistent-dept-999');
    assert.equal(notFound.status, 404);
  });

  it('GET /api/buildings and /api/buildings/:id return buildings', async () => {
    const { status, body } = await request('/api/buildings');
    assert.equal(status, 200);
    assert.ok(body.count >= 6);

    const acc = await request('/api/buildings/acc');
    assert.equal(acc.status, 200);
    assert.equal(acc.body.data.id, 'acc');
    assert.ok(Array.isArray(acc.body.data.departments));
  });

  it('GET /api/finder returns guided matches with non-diagnostic disclaimer', async () => {
    const missing = await request('/api/finder');
    assert.equal(missing.status, 400);

    const { status, body } = await request('/api/finder?q=chest');
    assert.equal(status, 200);
    assert.equal(body.success, true);
    assert.match(body.disclaimer, /not a medical diagnosis/i);
    assert.ok(body.count >= 1);
  });

  it('GET /api/schedule, /api/emergency, /api/samples, /api/golden-rules return data', async () => {
    for (const ep of ['/api/schedule', '/api/emergency', '/api/samples', '/api/golden-rules']) {
      const { status, body } = await request(ep);
      assert.equal(status, 200, `Expected 200 for ${ep}`);
      assert.equal(body.success, true);
    }
  });

  describe('Feedback & Zero-PII Protection', () => {
    it('rejects short messages and PII payloads', async () => {
      const tooShort = await request('/api/feedback', {
        method: 'POST',
        body: JSON.stringify({ category: 'general', message: 'hi' })
      });
      assert.equal(tooShort.status, 400);

      const withPhone = await request('/api/feedback', {
        method: 'POST',
        body: JSON.stringify({ category: 'general', message: 'Call me on 9876543210 about OPD' })
      });
      assert.equal(withPhone.status, 400);

      const withAadhaar = await request('/api/feedback', {
        method: 'POST',
        body: JSON.stringify({ category: 'general', message: 'My number is 1234 5678 9012' })
      });
      assert.equal(withAadhaar.status, 400);

      const withForbiddenKey = await request('/api/feedback', {
        method: 'POST',
        body: JSON.stringify({ category: 'general', message: 'Room number changed', cr_number: '123456' })
      });
      assert.equal(withForbiddenKey.status, 400);
    });

    it('accepts valid anonymous feedback', async () => {
      const res = await request('/api/feedback', {
        method: 'POST',
        body: JSON.stringify({
          category: 'incorrect_room',
          message: 'Sample collection counter sign moved near Room 127 entrance.'
        })
      });
      assert.equal(res.status, 201);
      assert.equal(res.body.success, true);
      assert.ok(res.body.id);
    });
  });

  describe('Admin Governance & Audit Logs', () => {
    const authHeader = { Authorization: 'Bearer test-admin-secret' };

    it('rejects unauthenticated or invalid admin requests', async () => {
      const noAuth = await request('/api/admin/departments');
      assert.equal(noAuth.status, 401);

      const badAuth = await request('/api/admin/departments', {
        headers: { Authorization: 'Bearer wrong-token' }
      });
      assert.equal(badAuth.status, 403);
    });

    it('allows admin to update, verify, hide draft, review feedback, and view audit logs', async () => {
      const listRes = await request('/api/admin/departments', { headers: authHeader });
      assert.equal(listRes.status, 200);
      const deptId = listRes.body.data[0].id;

      // Mark as draft -> should disappear from public /api/departments
      const draftRes = await request(`/api/admin/departments/${deptId}`, {
        method: 'PATCH',
        headers: authHeader,
        body: JSON.stringify({ status: 'draft' })
      });
      assert.equal(draftRes.status, 200);
      assert.equal(draftRes.body.data.status, 'draft');

      const publicCheck = await request(`/api/departments/${deptId}`);
      assert.equal(publicCheck.status, 404);

      // Verify & publish again -> should reappear in public /api/departments
      const verifyRes = await request(`/api/admin/departments/${deptId}/verify`, {
        method: 'POST',
        headers: authHeader
      });
      assert.equal(verifyRes.status, 200);
      assert.equal(verifyRes.body.data.status, 'published');
      assert.equal(verifyRes.body.data.is_stale, false);

      const publicRestored = await request(`/api/departments/${deptId}`);
      assert.equal(publicRestored.status, 200);

      // Review feedback submitted earlier
      const fbList = await request('/api/admin/feedback', { headers: authHeader });
      assert.equal(fbList.status, 200);
      assert.ok(fbList.body.count >= 1);
      const fbId = fbList.body.data[0].id;

      const fbResolve = await request(`/api/admin/feedback/${fbId}`, {
        method: 'PATCH',
        headers: authHeader,
        body: JSON.stringify({ status: 'resolved', resolution_note: 'Verified signage.' })
      });
      assert.equal(fbResolve.status, 200);
      assert.equal(fbResolve.body.data.status, 'resolved');

      // Audit logs recorded all mutations
      const logsRes = await request('/api/admin/audit-logs', { headers: authHeader });
      assert.equal(logsRes.status, 200);
      assert.ok(logsRes.body.count >= 3);
    });
  });
});
