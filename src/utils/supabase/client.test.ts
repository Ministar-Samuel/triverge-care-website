import { test, mock } from "node:test";
import assert from "node:assert";

test("createClient creates a browser client with correct environment variables", async (t) => {
  const originalUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const originalKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "test-anon-key";

  t.after(() => {
    if (originalUrl !== undefined) {
      process.env.NEXT_PUBLIC_SUPABASE_URL = originalUrl;
    } else {
      delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    }

    if (originalKey !== undefined) {
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = originalKey;
    } else {
      delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    }
  });

  const createBrowserClientMock = mock.fn((url: string, key: string) => ({
    url,
    key,
    type: "browser-client",
  }));

  mock.module("@supabase/ssr", {
    namedExports: {
      createBrowserClient: createBrowserClientMock,
    },
  });

  const { createClient } = await import("./client.ts");

  const client = createClient();

  assert.strictEqual(createBrowserClientMock.mock.calls.length, 1);
  const callArgs = createBrowserClientMock.mock.calls[0].arguments;
  assert.strictEqual(callArgs[0], "https://example.supabase.co");
  assert.strictEqual(callArgs[1], "test-anon-key");

  assert.strictEqual((client as any).url, "https://example.supabase.co");
  assert.strictEqual((client as any).key, "test-anon-key");
  assert.strictEqual((client as any).type, "browser-client");
});
