// Run with: npm test (node's built-in runner with native TypeScript type stripping).
import { test } from "node:test";
import assert from "node:assert/strict";
import { FOCUS, MAX_FOCUS, QUESTIONS, isComplete, messageFor, planFor, type Answers } from "./intake.ts";

const full: Answers = {
  business: "established",
  answerTo: "board",
  revenue: "paid",
  tracking: "platforms",
  tried: ["agency"],
  blocker: "spend",
};

test("event organizers are routed to the events arm", () => {
  assert.deepEqual(planFor({ business: "events" }), { kind: "events" });
  assert.equal(isComplete({ business: "events" }), true);
});

test("a plan needs every question answered", () => {
  assert.equal(isComplete({ business: "established" }), false);
  assert.equal(isComplete(full), true);
});

test("the stated blocker comes first", () => {
  const plan = planFor({ ...full, blocker: "systems", tracking: "yes", revenue: "referrals" });
  assert.equal(plan.kind, "growth");
  if (plan.kind !== "growth") return;
  assert.equal(plan.focus[0]!.id, "systems");
});

test("untracked spend lands on tracking once, carrying every answer that produced it", () => {
  const plan = planFor(full);
  if (plan.kind !== "growth") return assert.fail("expected growth plan");
  const tracking = plan.focus.filter((f) => f.id === "tracking");
  assert.equal(tracking.length, 1);
  assert.equal(plan.focus[0]!.id, "tracking");
  // blocker + tracking + revenue all point here, each named in the reader's words
  assert.equal(tracking[0]!.because.length, 3);
  assert.ok(tracking[0]!.because.includes("Not knowing which spend makes money"));
  assert.ok(!plan.focus.some((f) => f.id === "spend"));
});

test("with working tracking, spend is reviewed by channel instead", () => {
  const plan = planFor({ ...full, tracking: "yes" });
  if (plan.kind !== "growth") return assert.fail();
  assert.ok(plan.focus.some((f) => f.id === "spend"));
  assert.ok(!plan.focus.some((f) => f.id === "tracking"));
});

test("never more than the maximum number of items, and every item is labelled", () => {
  const plan = planFor({
    business: "established",
    answerTo: "nobody",
    revenue: "sales",
    tracking: "traffic",
    tried: ["agency", "consultant", "website", "hire"],
    blocker: "which",
  });
  if (plan.kind !== "growth") return assert.fail();
  assert.equal(plan.focus.length, MAX_FOCUS);
  for (const f of plan.focus) {
    assert.ok(f.because.length > 0, `${f.id} has no reason`);
    assert.equal(f.title, FOCUS[f.id].title);
  }
});

test("the opportunity map is added when nothing else pointed there", () => {
  const plan = planFor({ ...full, tried: ["nothing"], tracking: "yes", revenue: "paid", blocker: "owner" });
  if (plan.kind !== "growth") return assert.fail();
  const opp = plan.focus.find((f) => f.id === "opportunities");
  assert.ok(opp);
  assert.deepEqual(opp.because, []);
});

test("the start follows the business", () => {
  const p = (business: string) => {
    const plan = planFor({ ...full, business });
    return plan.kind === "growth" ? plan.start.pkg : "events";
  };
  assert.equal(p("established"), "Growth Diagnostic");
  assert.equal(p("product"), "Go-to-Market Sprint");
  assert.equal(p("portfolio"), "Portfolio Growth Review");
});

test("no output contains a digit (no scores, forecasts or invented numbers)", () => {
  for (const business of ["established", "product", "portfolio"]) {
    const plan = planFor({ ...full, business });
    if (plan.kind !== "growth") continue;
    const text = JSON.stringify({ focus: plan.focus, reporting: plan.reporting });
    // Package shapes spell their durations out ("About three weeks"); nothing here is a figure.
    assert.ok(!/\d/.test(text), text);
  }
});

test("the WhatsApp message carries the reader's answers verbatim", () => {
  const plan = planFor(full);
  const msg = messageFor(full, plan);
  assert.match(msg, /Growth Diagnostic/);
  const tracking = QUESTIONS.find((q) => q.id === "tracking")!.options.find((o) => o.id === "platforms")!.label;
  assert.ok(msg.includes(tracking));
});
