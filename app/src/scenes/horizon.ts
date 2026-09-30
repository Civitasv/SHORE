import { clear, line, mono } from '../engine/draw';
import { lerp, remap, smoothstep } from '../engine/math';
import { P } from '../engine/palette';
import type { Scene } from '../engine/types';
import { drawBeacon } from '../motifs/beacon';

const scene: Scene = {
  render(g, ctx) {
    clear(g);
    const t = ctx.localT;
    const pull = smoothstep(remap(t, 0, 8.8));
    const cx = lerp(960, 620, pull);
    const cy = lerp(1180, 650, pull);
    const radius = lerp(760, 190, pull);

    g.save();
    g.globalAlpha = 0.88;
    g.strokeStyle = P.star;
    g.lineWidth = 1.6;
    g.beginPath();
    g.arc(cx, cy, radius, 0, Math.PI * 2);
    g.stroke();
    g.restore();

    const angle = lerp(-Math.PI / 2, -0.58, pull);
    const px = cx + Math.cos(angle) * radius;
    const py = cy + Math.sin(angle) * radius;

    drawBeacon(g, px, py, {
      radius: 3.5,
      alpha: 0.95,
      color: P.core,
      halo: P.star,
      glow: 16,
    });

    const scaleLabel = pull < 0.33 ? '1 km' : pull < 0.68 ? '100 km' : '10,000 km';
    mono(g, scaleLabel, 1660, 154, 13, 0.58, P.ash, 'right');
    mono(g, 'HORIZON / SCALE CHANGING', 96, 984, 11, 0.42);

    const escape = smoothstep(remap(t, 8.4, 12));
    if (escape > 0) {
      const ex = lerp(px, 980, escape);
      const ey = lerp(py, 420, escape);
      line(g, [[px, py], [ex, ey]], escape * 0.72, 1.4, P.star);
      drawBeacon(g, ex, ey, {
        radius: 3.5,
        alpha: escape,
        color: P.core,
        halo: P.star,
        glow: 16,
      });
    }
  },
};

export default scene;
