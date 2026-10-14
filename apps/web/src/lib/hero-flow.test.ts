import { test } from "node:test";
import assert from "node:assert/strict";
import { bezier, layoutFlow, particleAt } from "./hero-flow.ts";

const band = { top: 100, height: 300 };
const L = layoutFlow(1200, band, 5, 5);

test("every stream starts at the left edge inside the band and ends on the node", () => {
  assert.equal(L.streams.length, 5);
  for (const s of L.streams) {
    assert.equal(s.p0.x, 0);
    assert.ok(s.p0.y > band.top && s.p0.y < band.top + band.height);
    const end = bezier(s, 1);
    assert.deepEqual(end, L.node);
  }
});

test("stream origins are evenly spaced and do not overlap", () => {
  const ys = L.streams.map((s) => s.p0.y);
  const gaps = ys.slice(1).map((y, i) => y - ys[i]!);
  for (const g of gaps) assert.ok(Math.abs(g - gaps[0]!) < 1e-9 && g > 0);
});

test("the spine is horizontal from the node to the right edge, and stages sit on it in order", () => {
  assert.equal(L.spineEnd.y, L.node.y);
  assert.equal(L.spineEnd.x, 1200);
  assert.equal(L.stages.length, 5);
  for (let i = 0; i < L.stages.length; i++) {
    const st = L.stages[i]!;
    assert.equal(st.y, L.node.y);
    assert.ok(st.x > L.node.x && st.x < 1200);
    if (i > 0) assert.ok(st.x > L.stages[i - 1]!.x);
  }
});

test("particles converge: wide at the origin, tight at the node, thin along the spine", () => {
  const spreadAt = (p: number) => Math.abs(particleAt(L, 0, p, 1).y - particleAt(L, 0, p, -1).y);
  assert.ok(spreadAt(0) > spreadAt(0.9));
  assert.ok(spreadAt(1.5) <= spreadAt(1));
  const onSpine = particleAt(L, 2, 1.5, 0);
  assert.equal(onSpine.y, L.node.y);
  assert.ok(onSpine.x > L.node.x && onSpine.x < 1200);
});

test("compact layout keeps everything on screen", () => {
  const C = layoutFlow(375, { top: 0, height: 260 }, 5, 5, true);
  for (const st of C.stages) assert.ok(st.x > C.node.x && st.x < 375);
  assert.ok(C.node.x > 0 && C.node.x < 375);
});
