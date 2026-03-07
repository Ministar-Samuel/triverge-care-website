import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

test('Security check: users API route requires authentication and authorization', () => {
    const routePath = path.join(process.cwd(), 'src/app/api/users/route.ts');
    const content = fs.readFileSync(routePath, 'utf8');

    // Check for standard auth logic
    assert.ok(content.includes('const supabaseAuth = await createClient();'), 'Missing createClient() initialization');
    assert.ok(content.includes('await supabaseAuth.auth.getUser()'), 'Missing getUser() call to authenticate');
    assert.ok(content.includes("error: 'Unauthorized'"), 'Missing Unauthorized error return');

    // Check for authorization logic
    assert.ok(content.includes(".from('profiles')"), 'Missing profile fetch');
    assert.ok(content.includes(".select('role')"), 'Missing role selection');
    assert.ok(content.includes("profile.role !== 'admin'"), 'Missing admin role check');
    assert.ok(content.includes("profile.role !== 'super_admin'"), 'Missing super_admin role check');
    assert.ok(content.includes("error: 'Forbidden: Admin access required'"), 'Missing Forbidden error return');
});

test('Security check: users/[id] API route requires authentication and authorization', () => {
    const routePath = path.join(process.cwd(), 'src/app/api/users/[id]/route.ts');
    const content = fs.readFileSync(routePath, 'utf8');

    // Check for standard auth logic
    assert.ok(content.includes('const supabaseAuth = await createClient();'), 'Missing createClient() initialization');
    assert.ok(content.includes('await supabaseAuth.auth.getUser()'), 'Missing getUser() call to authenticate');
    assert.ok(content.includes("error: 'Unauthorized'"), 'Missing Unauthorized error return');

    // Check for authorization logic
    assert.ok(content.includes(".from('profiles')"), 'Missing profile fetch');
    assert.ok(content.includes(".select('role')"), 'Missing role selection');
    assert.ok(content.includes("profile.role !== 'admin'"), 'Missing admin role check');
    assert.ok(content.includes("profile.role !== 'super_admin'"), 'Missing super_admin role check');
    assert.ok(content.includes("error: 'Forbidden: Admin access required'"), 'Missing Forbidden error return');

    // Make sure we have the checks twice for both handlers in the file
    const authOccurrences = (content.match(/await supabaseAuth\.auth\.getUser\(\)/g) || []).length;
    assert.strictEqual(authOccurrences, 2, 'Missing auth check for both PATCH and DELETE');
});
