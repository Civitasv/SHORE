import { line, mono } from '../engine/draw';
import { P } from '../engine/palette';
import { drawBeacon } from './beacon';
import { drawCoordinateField, drawEarthMark } from './field';

export const ESCAPE_EARTH = { x: 620, y: 650, radius: 190 } as const;
export const ESCAPE_DESTINATIONS = [
  [1260, 268],
  [1430, 332],
  [1600, 286],
  [1710, 410],
] as const;

export function escapeBezier(t: number): [number, number] {
  const p0: [number, number] = [980, 420];
  const p1: [number, number] = [1160, 210];
  const p2: [number, number] = [1730, 540];
  const u = 1 - t;
  return [
    u * u * p0[0] + 2 * u * t * p1[0] + t * t * p2[0],
    u * u * p0[1] + 2 * u * t * p1[1] + t * t * p2[1],
  ];
}

export function escapePathUntil(progress: number): [number, number][] {
  const pts: [number, number][] = [];
  const n = Math.max(2, Math.ceil(48 * progress));
  for (let i = 0; i <= n; i += 1) {
    pts.push(escapeBezier((i / n) * progress));
  }
  return pts;
}

export function drawResolvedEscape(g: CanvasRenderingContext2D, alpha = 1) {
  if (alpha <= 0) return;

  drawEarthMark(g, ESCAPE_EARTH.x, ESCAPE_EARTH.y, ESCAPE_EARTH.radius, 0.48 * alpha);
  mono(g, 'EARTH', ESCAPE_EARTH.x, 882, 11, 0.32 * alpha, P.ash, 'center');
  drawCoordinateField(g, 0.5 * alpha, 144);

  line(g, escapePathUntil(1), 0.82 * alpha, 1.6, P.star);
  line(g, [[1730, 540], [1840, 540]], 0.62 * alpha, 1.4, P.star);

  ESCAPE_DESTINATIONS.forEach(([x, y]) => {
    drawBeacon(g, x, y, {
      radius: 2.2,
      alpha: 0.42 * alpha,
      color: P.bone,
      halo: P.bone,
      glow: 4,
    });
  });

  drawBeacon(g, 1840, 540, {
    radius: 4,
    alpha: 0.98 * alpha,
    color: P.core,
    halo: P.star,
    glow: 18,
  });

  mono(g, 'ESCAPE VECTOR / OPEN', 1160, 854, 11, 0.62 * alpha, P.bone);
}
