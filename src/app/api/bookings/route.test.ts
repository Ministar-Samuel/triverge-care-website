import { test } from 'node:test';
import assert from 'node:assert';
import { POST } from './route.ts';

test('POST returns 400 when missing client_name', async () => {
    const req = new Request('http://localhost', {
        method: 'POST',
        body: JSON.stringify({
            service_type: 'Consultation',
            scheduled_time: '2023-10-10T10:00:00Z'
        })
    });

    const res = await POST(req);
    assert.strictEqual(res.status, 400);
    const data = await res.json();
    assert.strictEqual(data.error, 'client_name, service_type, and scheduled_time are required');
});

test('POST returns 400 when missing service_type', async () => {
    const req = new Request('http://localhost', {
        method: 'POST',
        body: JSON.stringify({
            client_name: 'Test Client',
            scheduled_time: '2023-10-10T10:00:00Z'
        })
    });

    const res = await POST(req);
    assert.strictEqual(res.status, 400);
});

test('POST returns 400 when missing scheduled_time', async () => {
    const req = new Request('http://localhost', {
        method: 'POST',
        body: JSON.stringify({
            client_name: 'Test Client',
            service_type: 'Consultation'
        })
    });

    const res = await POST(req);
    assert.strictEqual(res.status, 400);
});
