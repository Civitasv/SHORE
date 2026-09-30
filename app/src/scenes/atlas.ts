import { clear, line, mono } from '../engine/draw';
import { lerp, remap, smoothstep } from '../engine/math';
import { P } from '../engine/palette';
import type { Scene } from '../engine/types';
import { drawBeacon, drawOutlineBeacon } from '../motifs/beacon';
import { drawCoordinateField, drawEarthMark } from '../motifs/field';
import { drawSharedGraph, graphPoint } from '../motifs/graph';

const selectedEdges = [14, 12, 6, 2] as const;
const prunedEdges = [4, 8] as const;
const destination: [number, number] = [1770, 540];

const scene: Scene = {
  render(g, ctx) {
    clear(g);
    const t = ctx.localT;

    const becomeMap = smoothstep(remap(t, 4.0, 15.0));
    const collapse = smoothstep(remap(t, 22.0, 28.0));
    const graphScale = lerp(1, 0.84, becomeMap);

    drawCoordinateField(g, becomeMap * (1 - collapse) * 0.7, 144);

    drawSharedGraph(g, 1, {
      alpha: 1 - collapse,
      scale: graphScale,
      technical: 1 - becomeMap,
      labels: 0.85 * (1 - collapse),
      highlightEdges: selectedEdges,
      prunedEdges,
    });

    const input = graphPoint(0, graphScale);
    const routeIn = smoothstep(remap(t, 7.0, 12.0)) * (1 - collapse);
    line(g, [input, destination], routeIn * 0.55, 1.5, P.star);

    const destIn = smoothstep(remap(t, 9.0, 13.0)) * (1 - collapse);
    drawOutlineBeacon(g, destination[0], destination[1], {
      radius: 5,
      alpha: destIn * 0.62,
      color: P.bone,
      halo: P.bone,
      glow: 5,
      label: 'UNKNOWN',
    });

    const routeProgress = smoothstep(remap(t, 8.0, 21.0));
    const start = graphPoint(8, graphScale);
    const hx = lerp(start[0], destination[0], routeProgress);
    const hy = lerp(start[1] - 10, destination[1] - 10, routeProgress);
    const mx = lerp(start[0], destination[0], routeProgress);
    const my = lerp(start[1] + 10, destination[1] + 10, routeProgress);

    drawBeacon(g, hx, hy, {
      radius: 3.7,
      alpha: (1 - collapse) * 0.9,
      color: P.core,
      halo: P.star,
      glow: 13,
    });
    drawOutlineBeacon(g, mx, my, {
      radius: 4.5,
      alpha: (1 - collapse) * 0.84,
      color: P.bone,
      halo: P.bone,
      glow: 4,
    });

    const sideBySide = smoothstep(remap(t, 9.5, 13.0)) * (1 - smoothstep(remap(t, 20.0, 23.0)));
    mono(g, 'SIDE BY SIDE / ROUTE NOT FINAL', 960, 928, 13, sideBySide * 0.58, P.bone, 'center');
    mono(g, 'CANDIDATES 3   PRUNED 2   FORWARD 1', 96, 984, 10, becomeMap * (1 - collapse) * 0.38, P.ash);

    if (collapse > 0) {
      drawCoordinateField(g, collapse * 0.9, 96);
      drawEarthMark(g, 960, 540, 148, collapse * 0.88);
      line(g, [[1108, 540], [1780, 540]], collapse * 0.46, 1.2, P.star);
      drawBeacon(g, 1780, 540, {
        radius: 2.8,
        alpha: collapse * 0.45,
        color: P.bone,
        halo: P.bone,
        glow: 3,
      });
      mono(g, 'EARTH / NAV ORIGIN', 960, 724, 10, collapse * 0.38, P.ash, 'center');
    }
  },
};

export default scene;
