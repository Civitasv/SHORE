import { LOGICAL_HEIGHT, LOGICAL_WIDTH } from './types';

export class FilmSurface {
  readonly ctx: CanvasRenderingContext2D;

  constructor(
    readonly canvas: HTMLCanvasElement,
    readonly scale: number,
  ) {
    canvas.width = LOGICAL_WIDTH * scale;
    canvas.height = LOGICAL_HEIGHT * scale;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) throw new Error('Canvas2D is unavailable');
    this.ctx = ctx;
  }

  begin() {
    this.ctx.setTransform(this.scale, 0, 0, this.scale, 0, 0);
    this.ctx.imageSmoothingEnabled = true;
  }

  png() {
    return this.canvas.toDataURL('image/png');
  }
}
