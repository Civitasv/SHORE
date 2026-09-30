import { line } from '../engine/draw';
import { clamp01, lerp } from '../engine/math';
import { P } from '../engine/palette';

export interface SignalPulseOptions {
  x0: number;
  x1: number;
  y: number;
  progress: number;
  amplitude?: number;
  wavelength?: number;
  tail?: number;
  phase?: number;
  alpha?: number;
  width?: number;
  color?: string;
}

export function drawCarrier(
  g: CanvasRenderingContext2D,
  x0: number,
  x1: number,
  y: number,
  alpha = 0.12,
) {
  line(g, [[x0, y], [x1, y]], alpha, 1, P.ash);
}

export function drawSignalPulse(
  g: CanvasRenderingContext2D,
  options: SignalPulseOptions,
) {
  const {
    x0,
    x1,
    y,
    progress,
    amplitude = 24,
    wavelength = 84,
    tail = 0.34,
    phase = 0,
    alpha = 1,
    width = 1.5,
    color = P.star,
  } = options;

  const p = clamp01(progress);
  if (p <= 0 || alpha <= 0) return;

  const start = Math.max(0, p - tail);
  const span = Math.max(0.0001, p - start);
  const distance = Math.abs(x1 - x0);
  const cycles = distance / Math.max(8, wavelength);
  const pts: [number, number][] = [];
  const steps = Math.max(24, Math.ceil(distance * span / 8));

  for (let i = 0; i <= steps; i += 1) {
    const q = i / steps;
    const u = lerp(start, p, q);
    const envelope = Math.pow(Math.sin(Math.PI * q), 1.7);
    const carrier = Math.sin(u * cycles * Math.PI * 2 + phase);
    pts.push([lerp(x0, x1, u), y + carrier * amplitude * envelope]);
  }

  line(g, pts, alpha, width, color);

  const headX = lerp(x0, x1, p);
  g.save();
  g.globalAlpha = alpha;
  g.fillStyle = P.core;
  g.shadowColor = color;
  g.shadowBlur = 18;
  g.beginPath();
  g.arc(headX, y, 2.5, 0, Math.PI * 2);
  g.fill();
  g.restore();
}
