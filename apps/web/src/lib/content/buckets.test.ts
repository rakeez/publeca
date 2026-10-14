import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { BUCKETS } from "./buckets.ts";

const serviceSlugs = readdirSync(fileURLToPath(new URL("./services", import.meta.url)))
  .filter((f) => f.endsWith(".ts"))
  .map((f) => f.replace(/\.ts$/, ""));

test("every service belongs to exactly one bucket", () => {
  for (const slug of serviceSlugs) {
    const owners = BUCKETS.filter((b) => b.services.includes(slug)).map((b) => b.id);
    assert.equal(owners.length, 1, `${slug} is in ${owners.length} buckets: ${owners.join(", ")}`);
  }
});

test("buckets only list services that exist", () => {
  for (const b of BUCKETS) for (const slug of b.services) assert.ok(serviceSlugs.includes(slug), `${b.id} lists unknown ${slug}`);
});

test("bucket copy carries no figures (no invented numbers)", () => {
  for (const b of BUCKETS) {
    const text = [b.label, b.who, b.value, b.problem].join(" ");
    assert.ok(!/\d/.test(text), `${b.id}: ${text}`);
  }
});
