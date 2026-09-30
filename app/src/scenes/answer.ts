import { clear, line, mono } from '../engine/draw';
import { lerp, remap, smoothstep } from '../engine/math';
import { P } from '../engine/palette';
import type { Scene } from '../engine/types';
import { drawBeacon } from '../motifs/beacon';
import { drawCarrier, drawSignalPulse } from '../motifs/signal';

const scene: Scene = {
  render(g, ctx) {
    clear(g);
    const t = ctx.localT;

    const sourceX = 720;
    const targetX = 1500;
    const y = 540;

    drawBeacon(g, sourceX, y, {
      radius: 4,
      alpha: 0.88,
      color: P.core,
      halo: P.star,
      glow: 16,
    });

    drawCarrier(g, sourceX, targetX, y, 0.055);

    const arrival = lerp(0.92, 1, smoothstep(remap(t, 0.0, 1.2)));
    drawSignalPulse(g, {
      x0: sourceX,
      x1: targetX,
      y,
      progress: arrival,
      amplitude: 22,
      wavelength: 92,
      tail: 0.42,
      phase: 0.25,
      alpha: 0.9 * (1 - smoothstep(remap(t, 1.2, 2.6))),
      width: 1.4,
    });

    const targetIn = smoothstep(remap(t, 1.25, 2.35));
    const warm = smoothstep(remap(t, 2.2, 3.6));

    drawBeacon(g, targetX, y, {
      radius: 4,
      alpha: targetIn * (1 - warm),
      color: P.bone,
      halo: P.bone,
      glow: 9,
    });
    drawBeacon(g, targetX, y, {
      radius: 4,
      alpha: targetIn * warm,
      color: P.core,
      halo: P.star,
      glow: 18,
      rings: t > 2.8 && t < 5.0 ? 2 : 0,
    });

    const replyProgress = smoothstep(remap(t, 3.5, 7.4));
    const replyAlpha =
      smoothstep(remap(t, 3.1, 4.0)) *
      (1 - smoothstep(remap(t, 8.1, 9.75)));

    drawSignalPulse(g, {
      x0: targetX,
      x1: sourceX,
      y,
      progress: replyProgress,
      amplitude: 17,
      wavelength: 72,
      tail: 0.48,
      phase: 1.32,
      alpha: replyAlpha,
      width: 1.6,
      color: P.core,
    });

    const response =
      smoothstep(remap(t, 3.1, 4.8)) *
      (1 - smoothstep(remap(t, 8.4, 9.6)));

    mono(g, 'RESPONSE', targetX, 474, 12, response * 0.76, P.bone, 'center');
    mono(g, 'PHASE SHIFT +0.17', targetX, 498, 10, response * 0.42, P.ash, 'center');

    const connect = smoothstep(remap(t, 7.1, 9.55));
    line(g, [[sourceX, y], [targetX, y]], connect * 0.42, 1.2, P.star);

    const sentence =
      smoothstep(remap(t, 5.2, 7.8)) *
      (1 - smoothstep(remap(t, 8.45, 9.8)));

    mono(g, 'AND SOMEWHERE, ANOTHER ANSWERS.', 1110, 654, 14, sentence * 0.72, P.bone, 'center');
  },
};

export default scene;
