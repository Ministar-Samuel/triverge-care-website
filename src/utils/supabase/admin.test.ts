import { test } from "node:test";
import assert from "node:assert";
import { createAdminClient } from "./admin.ts";

test("admin supabase client", async (t) => {
    // Save original environment variables
    const originalEnv = {
        NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
        SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    };

    t.after(() => {
        // Restore original environment variables safely
        if (originalEnv.NEXT_PUBLIC_SUPABASE_URL !== undefined) {
            process.env.NEXT_PUBLIC_SUPABASE_URL = originalEnv.NEXT_PUBLIC_SUPABASE_URL;
        } else {
            delete process.env.NEXT_PUBLIC_SUPABASE_URL;
        }

        if (originalEnv.SUPABASE_SERVICE_ROLE_KEY !== undefined) {
            process.env.SUPABASE_SERVICE_ROLE_KEY = originalEnv.SUPABASE_SERVICE_ROLE_KEY;
        } else {
            delete process.env.SUPABASE_SERVICE_ROLE_KEY;
        }
    });

    await t.test("creates client with correct environment variables", () => {
        process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
        process.env.SUPABASE_SERVICE_ROLE_KEY = "test-service-key-123";

        const client = createAdminClient();

        // Assert that the client was created and holds the correct URL and key internally.
        // We cast to `any` because these internal properties are not exposed on the SupabaseClient type.
        assert.strictEqual((client as any).supabaseUrl, "https://example.supabase.co");
        assert.strictEqual((client as any).supabaseKey, "test-service-key-123");
    });

    await t.test("throws error when NEXT_PUBLIC_SUPABASE_URL is missing", () => {
        process.env.NEXT_PUBLIC_SUPABASE_URL = "";
        process.env.SUPABASE_SERVICE_ROLE_KEY = "test-service-key-123";

        assert.throws(
            () => createAdminClient(),
            /supabaseUrl is required/
        );
    });

    await t.test("throws error when SUPABASE_SERVICE_ROLE_KEY is missing", () => {
        process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
        process.env.SUPABASE_SERVICE_ROLE_KEY = "";

        assert.throws(
            () => createAdminClient(),
            /supabaseKey is required/
        );
    });
});
