import { line } from '../engine/draw';
import { P } from '../engine/palette';

export function drawCoordinateField(
  g: CanvasRenderingContext2D,
  alpha: number,
  spacing = 96,
) {
  if (alpha <= 0) return;

  for (let x = 96; x <= 1824; x += spacing) {
    const major = (x - 96) % (spacing * 4) === 0;
    line(g, [[x, 72], [x, 1008]], alpha * (major ? 0.11 : 0.045), major ? 1.2 : 1, P.ash);
  }

  for (let y = 72; y <= 1008; y += spacing) {
    const major = (y - 72) % (spacing * 4) === 0;
    line(g, [[96, y], [1824, y]], alpha * (major ? 0.11 : 0.045), major ? 1.2 : 1, P.ash);
  }
}

export function drawEarthMark(
  g: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  alpha: number,
) {
  if (alpha <= 0 || radius <= 0) return;

  g.save();
  g.globalAlpha = alpha;
  g.strokeStyle = P.bone;
  g.lineWidth = Math.max(1, Math.min(2, radius / 70));

  g.beginPath();
  g.arc(x, y, radius, 0, Math.PI * 2);
  g.stroke();

  g.globalAlpha = alpha * 0.36;
  g.beginPath();
  g.ellipse(x, y, radius * 0.42, radius, 0, 0, Math.PI * 2);
  g.stroke();

  g.beginPath();
  g.ellipse(x, y, radius * 0.78, radius, 0, 0, Math.PI * 2);
  g.stroke();

  g.beginPath();
  g.ellipse(x, y, radius, radius * 0.34, 0, 0, Math.PI * 2);
  g.stroke();

  g.restore();
}
