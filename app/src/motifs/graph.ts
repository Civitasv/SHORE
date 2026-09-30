import { line, mono } from '../engine/draw';
import { lerp, remap, smoothstep } from '../engine/math';
import { P } from '../engine/palette';
import { drawBeacon, drawOutlineBeacon } from './beacon';

export type GraphKind = 'input' | 'memory' | 'hypothesis' | 'merge' | 'agent';

export interface GraphNode {
  id: string;
  x: number;
  y: number;
  kind: GraphKind;
}

export interface GraphEdge {
  from: number;
  to: number;
}

export const SHARED_GRAPH_NODES: readonly GraphNode[] = [
  { id: 'input', x: 1500, y: 540, kind: 'input' },
  { id: 'mem-a', x: 1260, y: 360, kind: 'memory' },
  { id: 'mem-b', x: 1260, y: 540, kind: 'memory' },
  { id: 'mem-c', x: 1260, y: 720, kind: 'memory' },
  { id: 'hyp-a', x: 1010, y: 300, kind: 'hypothesis' },
  { id: 'hyp-b', x: 1010, y: 450, kind: 'hypothesis' },
  { id: 'hyp-c', x: 1010, y: 630, kind: 'hypothesis' },
  { id: 'hyp-d', x: 1010, y: 780, kind: 'hypothesis' },
  { id: 'merge', x: 760, y: 540, kind: 'merge' },
  { id: 'human', x: 500, y: 450, kind: 'agent' },
  { id: 'machine', x: 500, y: 630, kind: 'agent' },
];

export const SHARED_GRAPH_EDGES: readonly GraphEdge[] = [
  { from: 0, to: 1 },
  { from: 0, to: 2 },
  { from: 0, to: 3 },
  { from: 1, to: 4 },
  { from: 1, to: 5 },
  { from: 2, to: 5 },
  { from: 2, to: 6 },
  { from: 3, to: 6 },
  { from: 3, to: 7 },
  { from: 4, to: 8 },
  { from: 5, to: 8 },
  { from: 6, to: 8 },
  { from: 7, to: 8 },
  { from: 8, to: 9 },
  { from: 8, to: 10 },
];

export function graphPoint(index: number, scale = 1, cx = 960, cy = 540): [number, number] {
  const node = SHARED_GRAPH_NODES[index]!;
  return [lerp(cx, node.x, scale), lerp(cy, node.y, scale)];
}

function drawTechnicalNode(
  g: CanvasRenderingContext2D,
  node: GraphNode,
  x: number,
  y: number,
  alpha: number,
) {
  if (node.kind === 'memory') {
    g.save();
    g.globalAlpha = alpha;
    g.strokeStyle = P.bone;
    g.lineWidth = 1.2;
    g.strokeRect(x - 16, y - 11, 32, 22);
    g.restore();
    return;
  }

  if (node.kind === 'merge') {
    g.save();
    g.translate(x, y);
    g.rotate(Math.PI / 4);
    g.globalAlpha = alpha;
    g.strokeStyle = P.star;
    g.lineWidth = 1.3;
    g.strokeRect(-7, -7, 14, 14);
    g.restore();
    return;
  }

  if (node.id === 'human') {
    drawBeacon(g, x, y, { radius: 4, alpha, color: P.core, halo: P.star, glow: 12 });
    return;
  }

  drawOutlineBeacon(g, x, y, {
    radius: node.kind === 'input' ? 5 : 4,
    alpha,
    color: P.bone,
    halo: P.bone,
    glow: 4,
  });
}

export function drawSharedGraph(
  g: CanvasRenderingContext2D,
  progress: number,
  options: {
    alpha?: number;
    scale?: number;
    technical?: number;
    labels?: number;
    highlightEdges?: readonly number[];
    prunedEdges?: readonly number[];
  } = {},
) {
  const alpha = options.alpha ?? 1;
  const scale = options.scale ?? 1;
  const technical = options.technical ?? 1;
  const labels = options.labels ?? 0;
  const highlight = options.highlightEdges ?? [];
  const pruned = options.prunedEdges ?? [];
  const baseEdgeAlpha = lerp(0.22, 0.36, technical);

  SHARED_GRAPH_EDGES.forEach((edge, i) => {
    const edgeP = smoothstep(
      remap(progress, i / SHARED_GRAPH_EDGES.length, (i + 1.7) / SHARED_GRAPH_EDGES.length),
    );
    if (edgeP <= 0) return;

    const a = graphPoint(edge.from, scale);
    const b = graphPoint(edge.to, scale);
    const end: [number, number] = [lerp(a[0], b[0], edgeP), lerp(a[1], b[1], edgeP)];
    const hi = highlight.includes(i);
    const cut = pruned.includes(i);

    line(
      g,
      [a, end],
      alpha * (cut ? 0.14 : hi ? 0.78 : baseEdgeAlpha),
      hi ? 1.8 : 1.1,
      hi ? P.star : P.ash,
    );

    if (cut && edgeP > 0.9) {
      const mx = (a[0] + b[0]) / 2;
      const my = (a[1] + b[1]) / 2;
      line(g, [[mx - 7, my - 7], [mx + 7, my + 7]], alpha * 0.58, 1.2, P.star);
      line(g, [[mx - 7, my + 7], [mx + 7, my - 7]], alpha * 0.58, 1.2, P.star);
    }
  });

  SHARED_GRAPH_NODES.forEach((node, i) => {
    const nodeP = smoothstep(
      remap(progress, i / SHARED_GRAPH_NODES.length, (i + 2) / SHARED_GRAPH_NODES.length),
    );
    if (nodeP <= 0) return;

    const [x, y] = graphPoint(i, scale);

    if (technical > 0.5) {
      drawTechnicalNode(g, node, x, y, alpha * nodeP);
    } else {
      const outlined = node.id === 'machine';
      const fn = outlined ? drawOutlineBeacon : drawBeacon;
      fn(g, x, y, {
        radius: node.kind === 'agent' ? 3.5 : 2.6,
        alpha: alpha * nodeP * 0.92,
        color: outlined ? P.bone : P.core,
        halo: outlined ? P.bone : P.star,
        glow: outlined ? 4 : 8,
      });
    }

    if (labels > 0) {
      const prefix = technical > 0.5 ? node.kind.toUpperCase() : 'RTE';
      mono(
        g,
        `${prefix} / ${String(i + 1).padStart(2, '0')}`,
        x + 14,
        y - 12,
        9,
        alpha * labels * 0.62,
      );
    }
  });
}
