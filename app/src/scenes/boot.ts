import { clear, line, mono, point, reveal } from '../engine/draw';
import { outExpo, remap, smoothstep } from '../engine/math';
import { P } from '../engine/palette';
import type { Scene } from '../engine/types';

const scene: Scene = {
  render(g, ctx) {
    clear(g);

    const t = ctx.localT;
    const cx = 960;
    const cy = 540;

    const pointIn = smoothstep(remap(t, 0.8, 2.2));
    const pulse = 0.72 + Math.sin(t * Math.PI * 2 * 0.85) * 0.18;
    point(g, cx, cy, 3.5, pointIn, 20 * pointIn * pulse);

    const q = smoothstep(remap(t, 3.0, 5.8));
    mono(g, reveal('WHERE ARE WE?', q), cx, cy - 72, 18, q, P.ash, 'center');

    const earth = smoothstep(remap(t, 6.2, 7.4));
    mono(g, reveal('EARTH', earth), cx, cy + 88, 24, earth, P.bone, 'center');

    const rule = outExpo(remap(t, 9.0, 14.0));
    const x1 = cx + 340 * rule;
    line(g, [[cx, cy], [x1, cy]], Math.min(1, rule * 1.4), 1.5, P.star);
    if (rule > 0.02) point(g, x1, cy, 2.5, rule, 14 * rule);

    const second = smoothstep(remap(t, 12.2, 15.2));
    mono(
      g,
      reveal('WHERE ARE WE GOING?', second),
      cx,
      cy + 168,
      15,
      second * 0.78,
      P.ash,
      'center',
    );

    const unknown = smoothstep(remap(t, 15.0, 16.7));
    mono(g, reveal('UNKNOWN', unknown), cx, cy + 204, 17, unknown, P.star, 'center');

    const footer = smoothstep(remap(t, 16.2, 17.4));
    mono(g, 'MISSION / 00', 96, 984, 12, footer * 0.55);
    mono(g, 'STATUS / BEGIN', 1824, 984, 12, footer * 0.55, P.ash, 'right');
  },
};

export default scene;
