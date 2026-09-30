import { mono } from '../engine/draw';
import { P } from '../engine/palette';

export interface BeaconOptions {
  radius?: number;
  alpha?: number;
  color?: string;
  halo?: string;
  glow?: number;
  rings?: number;
  ringGap?: number;
  label?: string;
  labelAlpha?: number;
}

export function drawBeacon(
  g: CanvasRenderingContext2D,
  x: number,
  y: number,
  options: BeaconOptions = {},
) {
  const {
    radius = 4,
    alpha = 1,
    color = P.core,
    halo = P.star,
    glow = 16,
    rings = 0,
    ringGap = 10,
    label,
    labelAlpha = alpha * 0.62,
  } = options;

  if (alpha <= 0) return;

  g.save();
  g.globalAlpha = alpha;
  g.fillStyle = color;
  g.shadowColor = halo;
  g.shadowBlur = glow;
  g.beginPath();
  g.arc(x, y, radius, 0, Math.PI * 2);
  g.fill();
  g.restore();

  if (rings > 0) {
    g.save();
    g.strokeStyle = halo;
    g.lineWidth = 1;
    for (let i = 1; i <= rings; i += 1) {
      g.globalAlpha = alpha * (0.24 / i);
      g.beginPath();
      g.arc(x, y, radius + ringGap * i, 0, Math.PI * 2);
      g.stroke();
    }
    g.restore();
  }

  if (label) mono(g, label, x + radius + 16, y + 5, 12, labelAlpha);
}
