import { clear, line, mono } from '../engine/draw';
import { lerp, remap, smoothstep } from '../engine/math';
import { P } from '../engine/palette';
import type { Scene } from '../engine/types';
import { drawCatalog, drawConstellation, makeConstellation } from '../motifs/constellation';

const NODES = makeConstellation(0x53484f52, 42);

const scene: Scene = {
  render(g, ctx) {
    clear(g);
    const t = ctx.localT;

    const branch = smoothstep(remap(t, 0.6, 11.0));
    const technical = 1 - smoothstep(remap(t, 9.0, 16.0));
    const pullback = smoothstep(remap(t, 8.0, 21.0));
    const scale = lerp(1, 0.76, pullback);

    const catalogIn = smoothstep(remap(t, 9.0, 20.0));
    drawCatalog(g, 0x4e4f5348, 156, catalogIn * 0.55, lerp(1.12, 0.92, pullback));

    drawConstellation(g, NODES, branch, {
      alpha: 0.94,
      scale,
      technical,
    });

    const route = 1 - smoothstep(remap(t, 12.0, 18.0));
    const routeAlpha = lerp(0.42, 0.24, smoothstep(remap(t, 0.0, 2.0)));
    line(g, [[720, 540], [1500, 540]], route * routeAlpha, 1.2, P.star);

    const mapLabel = smoothstep(remap(t, 1.0, 3.0)) * technical;
    mono(g, 'ROUTE / 01', 720, 596, 10, mapLabel * 0.48);
    mono(g, 'CONTACT / 02', 1500, 596, 10, mapLabel * 0.48, P.ash, 'center');

    const nameShift = smoothstep(remap(t, 7.0, 12.0));
    mono(g, 'NAVIGATION GRAPH', 96, 104, 11, (1 - nameShift) * 0.42, P.ash);
    mono(
      g,
      'CONSTELLATION',
      96,
      104,
      11,
      nameShift * (1 - smoothstep(remap(t, 16, 20))) * 0.52,
      P.bone,
    );

    const noLast =
      smoothstep(remap(t, 11.5, 14.5)) *
      (1 - smoothstep(remap(t, 18.0, 21.0)));

    mono(g, 'THERE IS NO LAST DESTINATION', 960, 902, 15, noLast * 0.66, P.bone, 'center');

    const stars = smoothstep(remap(t, 16.0, 21.5));
    mono(g, 'ONLY DEEPER SEAS OF STARS', 960, 902, 15, stars * 0.78, P.star, 'center');

    const edge = smoothstep(remap(t, 19.0, 22.8));
    if (edge > 0) {
      line(g, [[960, 540], [1810, 486]], edge * 0.18, 1, P.star);
    }
  },
};

export default scene;
