import { test } from "node:test";
import assert from "node:assert";
import { cn } from "./utils.ts";

test("cn utility function", async (t) => {
  await t.test("merges multiple string arguments", () => {
    const result = cn("text-red-500", "bg-blue-500");
    assert.strictEqual(result, "text-red-500 bg-blue-500");
  });

  await t.test("handles conditional classes", () => {
    assert.strictEqual(cn("base", true && "is-true", false && "is-false"), "base is-true");
  });

  await t.test("handles objects of classes", () => {
    assert.strictEqual(cn("base", { "is-active": true, "is-inactive": false }), "base is-active");
  });

  await t.test("handles arrays of classes", () => {
    assert.strictEqual(cn(["a", "b"], "c"), "a b c");
  });

  await t.test("resolves Tailwind CSS conflicts correctly", () => {
    // This verifies integration with tailwind-merge
    // conflicting padding: p-4 should override p-2
    assert.strictEqual(cn("p-2", "p-4"), "p-4");

    // conflicting text colors: text-blue-500 should override text-red-500
    assert.strictEqual(cn("text-red-500", "text-blue-500"), "text-blue-500");
  });

  await t.test("handles undefined and null inputs", () => {
    assert.strictEqual(cn("a", undefined, null, "b"), "a b");
  });
});
