import { clear, line, mono, point } from '../engine/draw';
import { remap, smoothstep } from '../engine/math';
import { P } from '../engine/palette';
import type { Scene } from '../engine/types';

const scene: Scene = {
  render(g, ctx) {
    clear(g);
    const p = smoothstep(remap(ctx.localT, 0, Math.min(2, ctx.duration * 0.2)));
    line(g, [[280, 540], [1640, 540]], p * 0.2, 1, P.ash);
    point(g, 960, 540, 3, p, 12 * p);
    mono(g, ctx.entry.id.toUpperCase(), 960, 500, 26, p, P.bone, 'center');
    mono(g, 'PLATE IN DEVELOPMENT', 960, 582, 13, p * 0.6, P.ash, 'center');
  },
};

export default scene;
