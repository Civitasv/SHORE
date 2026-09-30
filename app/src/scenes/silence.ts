import { clear, line, mono } from '../engine/draw';
import { remap, smoothstep } from '../engine/math';
import { P } from '../engine/palette';
import type { Scene } from '../engine/types';
import { drawBeacon } from '../motifs/beacon';
import { drawCarrier, drawSignalPulse } from '../motifs/signal';

const scene: Scene = {
  render(g, ctx) {
    clear(g);
    const t = ctx.localT;

    const earthAlpha = 0.42 - smoothstep(remap(t, 0.0, 8.0)) * 0.24;
    drawBeacon(g, 340, 540, {
      radius: 3.5,
      alpha: earthAlpha,
      color: P.core,
      halo: P.star,
      glow: 12,
    });

    const sourceX = 720;
    const sourceY = 540;
    const sourceIn = smoothstep(remap(t, 0.5, 2.5));
    line(g, [[340, 540], [sourceX, sourceY]], sourceIn * 0.13, 1, P.ash);
    drawBeacon(g, sourceX, sourceY, {
      radius: 4,
      alpha: 0.9,
      color: P.core,
      halo: P.star,
      glow: 18,
      rings: t > 6 && t < 10 ? 2 : 0,
    });

    const callText = smoothstep(remap(t, 5.2, 7.6)) * (1 - smoothstep(remap(t, 13.5, 17.0)));
    mono(g, 'ONE LIGHT CALLS', sourceX, 472, 13, callText * 0.68, P.bone, 'center');

    const progress = 0.92 * smoothstep(remap(t, 8.0, 19.8));
    const signalAlpha = smoothstep(remap(t, 7.4, 9.0));
    drawCarrier(g, sourceX, 1500, sourceY, signalAlpha * 0.08);
    drawSignalPulse(g, {
      x0: sourceX,
      x1: 1500,
      y: sourceY,
      progress,
      amplitude: 22,
      wavelength: 92,
      tail: 0.42,
      phase: 0.25,
      alpha: signalAlpha,
      width: 1.4,
    });

    const cross = smoothstep(remap(t, 10.0, 13.0)) * (1 - smoothstep(remap(t, 18.0, 20.0)));
    mono(g, 'ONE LIGHT CROSSES SILENCE', 1110, 650, 12, cross * 0.38, P.ash, 'center');

    const tx = smoothstep(remap(t, 7.2, 8.4));
    mono(g, 'TX / 01', sourceX - 22, 584, 10, tx * 0.34, P.ash, 'right');
  },
};

export default scene;
