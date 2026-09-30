import { clear, line, mono } from '../engine/draw';
import { lerp, outExpo, remap, smoothstep } from '../engine/math';
import { P } from '../engine/palette';
import type { Scene } from '../engine/types';
import { drawBeacon } from '../motifs/beacon';
import { drawCoordinateField, drawEarthMark } from '../motifs/field';
import {
  ESCAPE_DESTINATIONS,
  ESCAPE_EARTH,
  escapeBezier,
  escapePathUntil,
} from '../motifs/trajectory';

const scene: Scene = {
  render(g, ctx) {
    clear(g);
    const t = ctx.localT;

    drawEarthMark(g, ESCAPE_EARTH.x, ESCAPE_EARTH.y, ESCAPE_EARTH.radius, 0.48);
    mono(g, 'EARTH', ESCAPE_EARTH.x, 882, 11, 0.32, P.ash, 'center');

    const grid = smoothstep(remap(t, 7.0, 13.0));
    drawCoordinateField(g, grid * 0.5, 144);

    const harbor = 1 - smoothstep(remap(t, 2.0, 5.0));
    g.save();
    g.globalAlpha = harbor * 0.42;
    g.strokeStyle = P.ash;
    g.lineWidth = 1.2;
    g.beginPath();
    g.arc(ESCAPE_EARTH.x, ESCAPE_EARTH.y, 285, -1.34, 0.32);
    g.stroke();
    g.restore();
    mono(g, 'HARBOR', 876, 526, 11, harbor * 0.44);

    const progress = outExpo(remap(t, 4.0, 18.0));
    line(g, escapePathUntil(progress), 0.82, 1.6, P.star);
    const [px, py] = escapeBezier(progress);

    const handoff = smoothstep(remap(t, 18.0, 21.8));
    drawBeacon(g, px, py, {
      radius: 4,
      alpha: 0.98 * (1 - handoff),
      color: P.core,
      halo: P.star,
      glow: 18,
      rings: t > 4.5 && t < 8.0 ? 1 : 0,
    });

    const handoffX = lerp(px, 1840, handoff);
    const handoffY = lerp(py, 540, handoff);
    if (handoff > 0) {
      line(g, [[px, py], [handoffX, handoffY]], handoff * 0.62, 1.4, P.star);
      drawBeacon(g, handoffX, handoffY, {
        radius: 4,
        alpha: 0.98 * handoff,
        color: P.core,
        halo: P.star,
        glow: 18,
      });
    }

    const vector = smoothstep(remap(t, 4.0, 7.0));
    mono(g, 'ESCAPE VECTOR / OPEN', 1160, 854, 11, vector * 0.62, P.bone);

    ESCAPE_DESTINATIONS.forEach(([x, y], i) => {
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
  },
};

export default scene;
