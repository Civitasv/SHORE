import { line } from '../engine/draw';
import { lerp } from '../engine/math';
import { P } from '../engine/palette';
import { drawBeacon } from './beacon';

export interface StarNode {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  parent: number | null;
}

function unit(seed: number, index: number, salt: number) {
  let x = (seed ^ Math.imul(index + 1, 0x9e3779b1) ^ salt) >>> 0;
  x ^= x >>> 16;
  x = Math.imul(x, 0x7feb352d);
  x ^= x >>> 15;
  x = Math.imul(x, 0x846ca68b);
  x ^= x >>> 16;
  return (x >>> 0) / 0xffffffff;
}

export function makeConstellation(seed: number, count: number): StarNode[] {
  const nodes: StarNode[] = [
    { x: 720, y: 540, radius: 4, alpha: 0.95, parent: null },
    { x: 1500, y: 540, radius: 4, alpha: 0.95, parent: 0 },
  ];

  for (let i = 2; i < count; i += 1) {
    const x = 160 + unit(seed, i, 0x41c64e6d) * 1600;
    const y = 140 + unit(seed, i, 0x3039) * 800;

    let parent = 0;
    let nearest = Number.POSITIVE_INFINITY;
    for (let j = 0; j < nodes.length; j += 1) {
      const p = nodes[j]!;
      const d = (p.x - x) ** 2 + (p.y - y) ** 2;
      if (d < nearest) {
        nearest = d;
        parent = j;
      }
    }

    nodes.push({
      x,
      y,
      radius: 1.4 + unit(seed, i, 0x5bd1e995) * 1.9,
      alpha: 0.46 + unit(seed, i, 0x27d4eb2d) * 0.48,
      parent,
    });
  }

  return nodes;
}

function transform(node: StarNode, scale: number, cx = 960, cy = 540): [number, number] {
  return [lerp(cx, node.x, scale), lerp(cy, node.y, scale)];
}

export function drawConstellation(
  g: CanvasRenderingContext2D,
  nodes: readonly StarNode[],
  progress: number,
  options: { alpha?: number; scale?: number; technical?: number } = {},
) {
  const alpha = options.alpha ?? 1;
  const scale = options.scale ?? 1;
  const technical = options.technical ?? 0;
  const visible = Math.max(2, Math.min(nodes.length, 2 + Math.floor((nodes.length - 2) * progress)));

  for (let i = 1; i < visible; i += 1) {
    const node = nodes[i]!;
    const parent = node.parent === null ? null : nodes[node.parent];
    if (!parent) continue;
    const a = transform(parent, scale);
    const b = transform(node, scale);
    line(g, [a, b], alpha * (0.12 + technical * 0.15), technical > 0.5 ? 1.2 : 1, technical > 0.5 ? P.star : P.ash);
  }

  for (let i = 0; i < visible; i += 1) {
    const node = nodes[i]!;
    const [x, y] = transform(node, scale);
    drawBeacon(g, x, y, {
      radius: node.radius * (i < 2 ? 1 : 0.72),
      alpha: alpha * node.alpha,
      color: i < 2 ? P.core : P.bone,
      halo: i < 2 ? P.star : P.bone,
      glow: i < 2 ? 15 : 5,
    });
  }
}

export function drawCatalog(
  g: CanvasRenderingContext2D,
  seed: number,
  count: number,
  alpha: number,
  scale = 1,
) {
  if (alpha <= 0) return;

  for (let i = 0; i < count; i += 1) {
    const x0 = 72 + unit(seed, i, 0xa511e9b3) * 1776;
    const y0 = 54 + unit(seed, i, 0x63d83595) * 972;
    const x = lerp(960, x0, scale);
    const y = lerp(540, y0, scale);
    const a = alpha * (0.18 + unit(seed, i, 0x9e3779b9) * 0.62);
    const r = 0.55 + unit(seed, i, 0x7f4a7c15) * 1.35;

    g.save();
    g.globalAlpha = a;
    g.fillStyle = P.bone;
    g.beginPath();
    g.arc(x, y, r, 0, Math.PI * 2);
    g.fill();
    g.restore();
  }
}
