import { clear, line, mono } from '../engine/draw';
import { outExpo, remap, smoothstep } from '../engine/math';
import { P } from '../engine/palette';
import type { Scene } from '../engine/types';
import { drawBeacon } from '../motifs/beacon';
import { drawCoordinateField, drawEarthMark } from '../motifs/field';

function bezier(t: number): [number, number] {
  const p0: [number, number] = [980, 420];
  const p1: [number, number] = [1160, 210];
  const p2: [number, number] = [1730, 540];
  const u = 1 - t;
  return [
    u * u * p0[0] + 2 * u * t * p1[0] + t * t * p2[0],
    u * u * p0[1] + 2 * u * t * p1[1] + t * t * p2[1],
  ];
}

function pathUntil(progress: number): [number, number][] {
  const pts: [number, number][] = [];
  const n = Math.max(2, Math.ceil(48 * progress));
  for (let i = 0; i <= n; i += 1) pts.push(bezier((i / n) * progress));
  return pts;
}

const destinations = [
  [1260, 268],
  [1430, 332],
  [1600, 286],
  [1710, 410],
] as const;

const scene: Scene = {
  render(g, ctx) {
    clear(g);
    const t = ctx.localT;

    drawEarthMark(g, 620, 650, 190, 0.48);
    mono(g, 'EARTH', 620, 882, 11, 0.32, P.ash, 'center');

    const grid = smoothstep(remap(t, 7.0, 13.0));
    drawCoordinateField(g, grid * 0.5, 144);

    const harbor = 1 - smoothstep(remap(t, 2.0, 5.0));
    g.save();
    g.globalAlpha = harbor * 0.42;
    g.strokeStyle = P.ash;
    g.lineWidth = 1.2;
    g.beginPath();
    g.arc(620, 650, 285, -1.34, 0.32);
    g.stroke();
    g.restore();
    mono(g, 'HARBOR', 876, 526, 11, harbor * 0.44);

    const progress = outExpo(remap(t, 4.0, 18.0));
    line(g, pathUntil(progress), 0.82, 1.6, P.star);
    const [px, py] = bezier(progress);
    drawBeacon(g, px, py, {
      radius: 4,
      alpha: 0.98,
      color: P.core,
      halo: P.star,
      glow: 18,
      rings: t > 4.5 && t < 8.0 ? 1 : 0,
    });

    const vector = smoothstep(remap(t, 4.0, 7.0));
    mono(g, 'ESCAPE VECTOR / OPEN', 1160, 854, 11, vector * 0.62, P.bone);

    destinations.forEach(([x, y], i) => {
      const a = smoothstep(remap(t, 10 + i * 0.7, 12.2 + i * 0.7));
      drawBeacon(g, x, y, {
        radius: 2.2,
        alpha: a * 0.42,
        color: P.bone,
        halo: P.bone,
        glow: 4,
      });
    });

    const lyric = smoothstep(remap(t, 5.5, 8.5)) * (1 - smoothstep(remap(t, 17, 21)));
    mono(g, 'WE WERE NEVER BORN FOR HARBOR', 960, 952, 14, lyric * 0.68, P.bone, 'center');

    const handoff = smoothstep(remap(t, 18.0, 21.8));
    line(g, [[px, py], [1840, 540]], handoff * 0.62, 1.4, P.star);
  },
};

export default scene;
