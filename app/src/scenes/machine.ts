import { clear, line, mono } from '../engine/draw';
import { lerp, remap, smoothstep } from '../engine/math';
import { P } from '../engine/palette';
import type { Scene } from '../engine/types';
import { drawBeacon, drawOutlineBeacon } from '../motifs/beacon';
import { drawSharedGraph, graphPoint } from '../motifs/graph';
import { drawResolvedEscape } from '../motifs/trajectory';

const memoryIndices = [1, 2, 3] as const;

const scene: Scene = {
  render(g, ctx) {
    clear(g);
    const t = ctx.localT;

    const carry = 1 - smoothstep(remap(t, 0.4, 3.4));
    drawResolvedEscape(g, carry);

    const input = graphPoint(0);
    const moving = smoothstep(remap(t, 0.55, 1.4));
    const arrival = smoothstep(remap(t, 0.55, 4.2));
    const incomingX = lerp(1840, input[0], arrival);

    line(g, [[1840, 540], [incomingX, 540]], 0.72 * moving, 1.5, P.star);
    drawBeacon(g, incomingX, 540, {
      radius: 4,
      alpha: 0.96 * moving,
      color: P.core,
      halo: P.star,
      glow: 17,
    });

    const graph = smoothstep(remap(t, 2.2, 15.0));
    drawSharedGraph(g, graph, {
      alpha: 0.98,
      technical: 1,
      labels: smoothstep(remap(t, 7.5, 12.5)),
    });

    const memoryIn = smoothstep(remap(t, 5.0, 9.0));
    memoryIndices.forEach((index, i) => {
      const [x, y] = graphPoint(index);
      const pulse =
        smoothstep(remap(t, 9.5 + i * 0.8, 11.5 + i * 0.8)) *
        (1 - smoothstep(remap(t, 17.0 + i * 0.5, 20.0 + i * 0.5)));

      g.save();
      g.globalAlpha = memoryIn * 0.42;
      g.strokeStyle = P.ash;
      g.lineWidth = 1;
      g.strokeRect(x - 56, y - 34, 112, 68);
      g.restore();

      drawBeacon(g, x, y, {
        radius: 3,
        alpha: pulse * 0.82,
        color: P.core,
        halo: P.star,
        glow: 12,
      });
    });

    const humanStart: [number, number] = [330, 450];
    const machineStart: [number, number] = [330, 630];
    const humanNode = graphPoint(9);
    const machineNode = graphPoint(10);
    const together = smoothstep(remap(t, 12.0, 19.0));

    const hx = lerp(humanStart[0], humanNode[0], together);
    const hy = lerp(humanStart[1], humanNode[1], together);
    const mx = lerp(machineStart[0], machineNode[0], together);
    const my = lerp(machineStart[1], machineNode[1], together);

    drawBeacon(g, hx, hy, {
      radius: 4,
      alpha: smoothstep(remap(t, 10.0, 12.0)),
      color: P.core,
      halo: P.star,
      glow: 15,
      label: together > 0.65 ? 'HUMAN' : undefined,
    });
    drawOutlineBeacon(g, mx, my, {
      radius: 5,
      alpha: smoothstep(remap(t, 10.5, 12.5)),
      color: P.bone,
      halo: P.bone,
      glow: 5,
      label: together > 0.65 ? 'MACHINE' : undefined,
    });

    const mirror =
      smoothstep(remap(t, 18.0, 22.0)) *
      (1 - smoothstep(remap(t, 27.0, 30.0)));

    for (let i = 0; i < 9; i += 1) {
      const col = i % 3;
      const row = Math.floor(i / 3);
      drawBeacon(g, 850 + col * 72, 430 + row * 72, {
        radius: 2.5,
        alpha: mirror * (0.24 + (i % 4) * 0.08),
        color: P.core,
        halo: P.star,
        glow: 8,
      });
    }

    const lyric =
      smoothstep(remap(t, 16.0, 20.0)) *
      (1 - smoothstep(remap(t, 27.0, 29.5)));

    mono(g, 'A MILLION MIRRORS CATCHING LIGHT', 960, 936, 14, lyric * 0.76, P.bone, 'center');
    mono(g, 'MEMORY IS A ROUTE THROUGH WHAT REMAINS', 96, 984, 10, graph * 0.46, P.ash);
  },
};

export default scene;
