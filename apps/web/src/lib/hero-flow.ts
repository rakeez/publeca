/**
 * Geometry for the home hero flow canvas (playbook §4.4 / R3, modeled on Surge's hero):
 * five department streams enter from the left, converge on one node (the forward-deployed
 * growth executive), then run as one spine through the five stages to the right edge.
 *
 * Pure functions only, so the shape is unit-tested (hero-flow.test.ts) and the component only
 * animates particles along it. Keep this file free of DOM and React.
 */

export interface Pt {
  x: number;
  y: number;
}

export interface Stream {
  p0: Pt;
  p1: Pt;
  p2: Pt;
  p3: Pt;
}

export interface FlowLayout {
  streams: Stream[];
  node: Pt;
  /** Spine runs from the node to `spineEnd` at the node's height. */
  spineEnd: Pt;
  /** Centers of the stage modules along the spine. */
  stages: Pt[];
  /** Vertical spread of particles around a stream at its origin (px). */
  spread: number;
}

/** A point on a cubic Bézier at t ∈ [0, 1]. */
export function bezier(s: Stream, t: number): Pt {
  const u = 1 - t;
  const a = u * u * u;
  const b = 3 * u * u * t;
  const c = 3 * u * t * t;
  const d = t * t * t;
  return {
    x: a * s.p0.x + b * s.p1.x + c * s.p2.x + d * s.p3.x,
    y: a * s.p0.y + b * s.p1.y + c * s.p2.y + d * s.p3.y,
  };
}

/**
 * Lay out the flow inside a band of the hero.
 * @param width   canvas width (px)
 * @param band    the band's top and height inside the canvas (px)
 * @param count   number of streams
 * @param stageCount number of stage modules on the spine
 * @param compact narrow screens: the node sits further left and the spread is tighter
 * @param insetRight room kept clear at the right end of the spine (for the outcome label)
 */
export function layoutFlow(
  width: number,
  band: { top: number; height: number },
  count: number,
  stageCount: number,
  compact = false,
  insetRight = compact ? 16 : Math.min(140, width * 0.08)
): FlowLayout {
  const spineY = band.top + band.height / 2;
  const nodeX = width * (compact ? 0.26 : 0.36);
  const node = { x: nodeX, y: spineY };
  const streams: Stream[] = [];
  for (let i = 0; i < count; i++) {
    // Origins spread evenly down the band, inset from its edges.
    const y0 = band.top + band.height * (0.1 + (0.8 * (i + 0.5)) / count);
    streams.push({
      p0: { x: 0, y: y0 },
      p1: { x: nodeX * 0.45, y: y0 },
      p2: { x: nodeX * 0.62, y: spineY },
      p3: node,
    });
  }
  const spineEnd = { x: width, y: spineY };
  // Stages sit between the node (plus room for its label) and the right edge.
  // Clear of the node's label: ~70px half-width on phones, ~130px on desktop.
  const start = nodeX + (compact ? 92 : 150);
  const end = width - insetRight;
  const stages: Pt[] = [];
  for (let i = 0; i < stageCount; i++) {
    stages.push({ x: start + ((end - start) * (i + 0.5)) / stageCount, y: spineY });
  }
  return { streams, node, spineEnd, stages, spread: band.height * (compact ? 0.07 : 0.11) };
}

/**
 * Where a particle is. `p` runs 0→1 along its stream's curve, then 1→2 along the spine.
 * `offset` ∈ [-1, 1] spreads particles around the path; the spread narrows to a thin
 * bundle as streams converge and stays thin along the spine.
 */
export function particleAt(layout: FlowLayout, stream: number, p: number, offset: number): Pt {
  const s = layout.streams[stream]!;
  if (p <= 1) {
    const pt = bezier(s, p);
    const narrowing = 1 - p * p; // wide at the origin, tight at the node
    return { x: pt.x, y: pt.y + offset * layout.spread * (0.25 + 0.75 * narrowing) };
  }
  const q = Math.min(p - 1, 1);
  return {
    x: layout.node.x + (layout.spineEnd.x - layout.node.x) * q,
    y: layout.node.y + offset * layout.spread * 0.25,
  };
}
