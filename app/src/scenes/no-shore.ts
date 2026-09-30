import { clear, line, mono } from '../engine/draw';
import { lerp, remap, smoothstep } from '../engine/math';
import { P } from '../engine/palette';
import type { Scene } from '../engine/types';
import { drawBeacon } from '../motifs/beacon';
import { drawCatalog } from '../motifs/constellation';

const scene: Scene = {
  render(g, ctx) {
    clear(g);
    const t = ctx.localT;

    const fieldFade = 1 - smoothstep(remap(t, 5.5, 10.0));
    drawCatalog(g, 0x4e4f5348, 156, fieldFade * 0.23, 0.9);

    const panelIn = smoothstep(remap(t, 0.4, 2.0));
    const panelOut = 1 - smoothstep(remap(t, 6.2, 8.0));
    const panel = panelIn * panelOut;

    const x = 520;
    const y = 300;
    line(g, [[x, y], [1400, y]], panel * 0.26, 1, P.ash);
    line(g, [[x, y + 344], [1400, y + 344]], panel * 0.12, 1, P.ash);

    mono(g, 'MISSION OBJECTIVE', x, y + 62, 11, panel * 0.5);
    mono(g, 'THE SEA OF STARS', x, y + 104, 29, panel * 0.95, P.bone);

    mono(g, 'DESTINATION', x, y + 180, 11, panel * 0.5);
    mono(g, 'NO FINAL COORDINATES', x, y + 220, 19, panel * 0.84, P.bone);

    mono(g, 'STATUS', x, y + 296, 11, panel * 0.5);
    mono(g, 'IN PROGRESS', x, y + 336, 19, panel * 0.96, P.star);

    const depart = smoothstep(remap(t, 6.4, 11.6));
    const px = lerp(960, 1870, depart);
    const py = lerp(760, 704, depart);

    const path = smoothstep(remap(t, 6.0, 7.2));
    line(g, [[960, 760], [px, py]], path * 0.3, 1.2, P.star);
    drawBeacon(g, px, py, {
      radius: 4,
      alpha: 0.96,
      color: P.core,
      halo: P.star,
      glow: 18,
    });

    const title = smoothstep(remap(t, 8.0, 9.3));
    mono(g, 'NO SHORE.', 960, 474, 28, title * 0.9, P.bone, 'center');

    const status = smoothstep(remap(t, 9.0, 10.2));
    mono(g, 'CONTINUE', 960, 520, 11, status * 0.42, P.ash, 'center');
  },
};

export default scene;
