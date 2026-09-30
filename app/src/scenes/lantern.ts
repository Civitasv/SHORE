import { clear, line, mono } from '../engine/draw';
import { lerp, remap, smoothstep } from '../engine/math';
import { P } from '../engine/palette';
import type { Scene } from '../engine/types';
import { drawBeacon } from '../motifs/beacon';
import { drawCoordinateField, drawEarthMark } from '../motifs/field';

const SYSTEMS = [
  ['NAV', 4.0],
  ['MODEL', 7.0],
  ['NETWORK', 10.0],
  ['DISPLAY', 13.0],
] as const;

const scene: Scene = {
  render(g, ctx) {
    clear(g);
    const t = ctx.localT;

    const display = 1 - smoothstep(remap(t, 10.0, 14.0));
    drawCoordinateField(g, display);

    const retreat = smoothstep(remap(t, 2.5, 18.0));
    const earthX = lerp(960, 340, retreat);
    const earthY = 540;
    const earthRadius = lerp(148, 5, retreat);

    const routeAlpha = 1 - smoothstep(remap(t, 18.0, 24.0));
    line(g, [[earthX + earthRadius, earthY], [1780, earthY]], routeAlpha * 0.46, 1.2, P.star);

    if (earthRadius > 12) {
      drawEarthMark(g, earthX, earthY, earthRadius, 0.86);
    } else {
      drawBeacon(g, earthX, earthY, {
        radius: earthRadius,
        alpha: 0.96,
        color: P.core,
        halo: P.star,
        glow: 20,
        rings: t > 17 ? 1 : 0,
      });
    }

    SYSTEMS.forEach(([name, off], i) => {
      const switched = smoothstep(remap(t, off, off + 1.15));
      const alpha = (1 - smoothstep(remap(t, 14.0, 19.0))) * 0.82;
      mono(g, name, 116, 128 + i * 34, 13, alpha * (1 - switched * 0.62), P.bone);
      mono(g, switched > 0.5 ? 'OFF' : 'ONLINE', 262, 128 + i * 34, 12, alpha * 0.72, switched > 0.5 ? P.star : P.ash);
    });

    const scaleReadout = 1 - smoothstep(remap(t, 13.0, 18.0));
    mono(g, 'MAP SCALE', 1688, 116, 11, scaleReadout * 0.52, P.ash, 'right');
    mono(g, `×${Math.round(1 + retreat * 9999).toLocaleString('en-US')}`, 1688, 146, 16, scaleReadout * 0.82, P.bone, 'right');

    const label = smoothstep(remap(t, 13.0, 17.0));
    mono(g, 'EARTH', earthX + 26, earthY - 10, 13, label * 0.88, P.bone);
    mono(g, 'DISTANCE INCREASING', earthX + 26, earthY + 16, 11, label * 0.58, P.ash);

    const thought = smoothstep(remap(t, 15.0, 20.0)) * (1 - smoothstep(remap(t, 22.0, 24.5)));
    mono(g, 'SMALL ENOUGH TO HOLD IN ONE GLANCE', 960, 886, 14, thought * 0.62, P.ash, 'center');

    const last = smoothstep(remap(t, 21.0, 24.5));
    if (last > 0) {
      g.save();
      g.globalAlpha = last * 0.9;
      g.fillStyle = P.void;
      g.fillRect(0, 0, 1920, 1080);
      g.restore();

      drawBeacon(g, 340, 540, {
        radius: 4,
        alpha: 0.88,
        color: P.core,
        halo: P.star,
        glow: 18,
      });
      mono(g, 'EARTH', 366, 536, 11, last * 0.44);
    }
  },
};

export default scene;
