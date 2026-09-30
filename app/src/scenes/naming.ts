import { clear, line, mono, point } from '../engine/draw';
import { lerp, remap, smoothstep } from '../engine/math';
import { P } from '../engine/palette';
import type { Scene } from '../engine/types';
import { shoreY } from '../motifs/shore';

const lights = [
  [1180, 330, 'A-01'],
  [1375, 410, 'A-02'],
  [1510, 295, 'A-03'],
  [740, 360, 'A-04'],
  [520, 440, 'A-05'],
  [350, 320, 'A-06'],
] as const;

const scene: Scene = {
  render(g, ctx) {
    clear(g);

    const t = ctx.localT;
    const cx = 960;
    const cy = 540;

    line(g, [[cx, cy], [1300, cy]], 1, 1.5, P.star);
    point(g, 1300, cy, 2.5, 1, 12);

    const axis = smoothstep(remap(t, 0.6, 3.8));
    line(g, [[360, cy], [1560, cy]], axis * 0.35, 1, P.ash);
    line(g, [[cx, 250], [cx, 810]], axis * 0.18, 1, P.ash);

    const named = smoothstep(remap(t, 2.4, 8.0));
    lights.forEach(([x, y, name], i) => {
      const a = smoothstep(remap(named, i / lights.length, (i + 1.2) / lights.length));
      point(g, x, y, 3, a, 10 * a);
      line(g, [[x + 8, y - 6], [x + 54, y - 32]], a * 0.35, 1, P.ash);
      mono(g, name, x + 60, y - 34, 12, a * 0.68);
    });

    const connect = smoothstep(remap(t, 6.5, 11.0));
    const route: [number, number][] = [
      [350, 320],
      [520, 440],
      [740, 360],
      [960, 540],
      [1180, 330],
      [1375, 410],
      [1510, 295],
    ];
    for (let i = 0; i < route.length - 1; i += 1) {
      const p = smoothstep(remap(connect, i / (route.length - 1), (i + 1) / (route.length - 1)));
      if (p <= 0) continue;
      const a = route[i]!;
      const b = route[i + 1]!;
      line(g, [a, [lerp(a[0], b[0], p), lerp(a[1], b[1], p)]], 0.55, 1.4, P.bone);
    }

    const morph = smoothstep(remap(t, 11.0, 18.0));
    if (morph > 0) {
      const pts: [number, number][] = [];
      for (let x = 300; x <= 1620; x += 18) pts.push([x, lerp(cy, shoreY(x), morph)]);
      line(g, pts, 0.85, 1.6, P.star);
      g.save();
      g.globalAlpha = morph;
      g.fillStyle = P.void;
      g.fillRect(0, 0, 1920, 260 * morph);
      g.restore();
    }

    const label = smoothstep(remap(t, 13.2, 16.8));
    mono(g, 'KNOWN SHORE / SCALE 01', 96, 984, 12, label * 0.55);
    mono(g, 'A MAP IS A PROMISE WITH AN EDGE', 1824, 984, 12, label * 0.7, P.ash, 'right');
  },
};

export default scene;
