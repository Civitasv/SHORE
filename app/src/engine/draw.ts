import { P } from './palette';

export function clear(g: CanvasRenderingContext2D) {
  g.fillStyle = P.void;
  g.fillRect(0, 0, 1920, 1080);
}

export function point(
  g: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  alpha = 1,
  glow = 0,
) {
  g.save();
  g.globalAlpha = alpha;
  g.fillStyle = P.core;
  g.shadowColor = P.star;
  g.shadowBlur = glow;
  g.beginPath();
  g.arc(x, y, radius, 0, Math.PI * 2);
  g.fill();
  g.restore();
}

export function line(
  g: CanvasRenderingContext2D,
  pts: readonly [number, number][],
  alpha = 1,
  width = 2,
  color: string = P.bone,
) {
  if (pts.length < 2) return;
  g.save();
  g.globalAlpha = alpha;
  g.strokeStyle = color;
  g.lineWidth = width;
  g.lineCap = 'round';
  g.lineJoin = 'round';
  g.beginPath();
  g.moveTo(pts[0]![0], pts[0]![1]);
  for (let i = 1; i < pts.length; i += 1) g.lineTo(pts[i]![0], pts[i]![1]);
  g.stroke();
  g.restore();
}

export function mono(
  g: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  size = 20,
  alpha = 1,
  color: string = P.ash,
  align: CanvasTextAlign = 'left',
) {
  g.save();
  g.globalAlpha = alpha;
  g.fillStyle = color;
  g.font = `500 ${size}px "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace`;
  g.textAlign = align;
  g.textBaseline = 'alphabetic';
  g.fillText(text, x, y);
  g.restore();
}

export function reveal(text: string, p: number) {
  const count = Math.max(0, Math.min(text.length, Math.floor(text.length * p + 0.001)));
  return text.slice(0, count);
}
