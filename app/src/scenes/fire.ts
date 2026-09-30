import { clear, line, mono } from '../engine/draw';
import { lerp, smoothstep } from '../engine/math';
import { P } from '../engine/palette';
import type { Scene } from '../engine/types';
import { shoreY } from '../motifs/shore';

const X0 = 300;
const X1 = 1620;
const STEP = 18;

function stoneY(x: number) {
  const chip = (Math.floor((x - X0) / 58) % 5) - 2;
  return 540 + chip * 16 + Math.sin(x * 0.031) * 11;
}

function flameY(x: number) {
  const d = (x - 960) / 220;
  return 610 - Math.exp(-d * d) * 240 + Math.sin(x * 0.045) * 18;
}

function writingY(x: number) {
  const u = (x - X0) / (X1 - X0);
  return 540 + Math.sin(u * Math.PI * 6) * 54 + Math.sin(u * Math.PI * 14) * 17;
}

function telegraphY(x: number) {
  const bit = Math.floor((x - X0) / 84) % 2;
  return 540 + (bit ? -42 : 42);
}

function waveY(x: number) {
  return 540 + Math.sin((x - X0) * 0.034) * 44;
}

function circuitY(x: number) {
  const band = Math.floor((x - X0) / 132) % 4;
  return 540 + [-66, -20, 48, 8][band]!;
}

function limbY(x: number) {
  const r = 760;
  const cy = 1180;
  const dx = x - 960;
  return cy - Math.sqrt(Math.max(0, r * r - dx * dx));
}

const shapes = [shoreY, stoneY, flameY, writingY, telegraphY, waveY, circuitY, limbY];
const labels = ['SHORE', 'STONE', 'FLAME', 'WRITING', 'SIGNAL', 'WAVE', 'CIRCUIT', 'HORIZON'];

const scene: Scene = {
  render(g, ctx) {
    clear(g);
    const t = ctx.localT;
    const phase = Math.min(shapes.length - 1.001, t / (ctx.duration / (shapes.length - 1)));
    const i = Math.floor(phase);
    const q = smoothstep(phase - i);
    const a = shapes[i]!;
    const b = shapes[Math.min(i + 1, shapes.length - 1)]!;

    const pts: [number, number][] = [];
    for (let x = X0; x <= X1; x += STEP) pts.push([x, lerp(a(x), b(x), q)]);
    line(g, pts, 0.92, 1.7, P.star);

    const name = labels[Math.min(i + (q > 0.55 ? 1 : 0), labels.length - 1)]!;
    const labelAlpha = 0.28 + Math.sin(Math.min(1, q) * Math.PI) * 0.42;
    mono(g, name, 960, 740, 13, labelAlpha, P.bone, 'center');

    const sequence = t < 16 ? 'STONE → SIGNAL → SPARK → FLAME' : 'THE LINE REMEMBERS EVERY FORM';
    mono(g, sequence, 960, 824, 11, 0.28, P.ash, 'center');
  },
};

export default scene;
