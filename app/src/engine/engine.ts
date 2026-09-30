import { clear, mono } from './draw';
import { hashString } from './math';
import { P } from './palette';
import { FilmSurface } from './surface';
import {
  FPS,
  LOGICAL_HEIGHT,
  LOGICAL_WIDTH,
  type FilmContext,
  type Scene,
  type TimelineEntry,
} from './types';

const diagnosticScene: Scene = {
  render(g, ctx) {
    clear(g);
    mono(g, 'SCENE LOAD ERROR', 96, 120, 22, 1, P.star);
    mono(g, ctx.entry.id.toUpperCase(), 96, 164, 16, 1, P.bone);
  },
};

export class FilmEngine {
  private readonly scenes = new Map<string, Scene>();
  readonly errors: string[] = [];

  constructor(
    readonly surface: FilmSurface,
    readonly timeline: TimelineEntry[],
  ) {}

  get duration() {
    return this.timeline.at(-1)?.end ?? 0;
  }

  async prepare() {
    await Promise.all(
      this.timeline.map(async (entry) => {
        try {
          const module = await entry.load();
          this.scenes.set(entry.id, module.default);
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);
          this.errors.push(`${entry.id}: ${message}`);
          this.scenes.set(entry.id, diagnosticScene);
        }
      }),
    );
  }

  entryAt(t: number) {
    const clamped = Math.max(0, Math.min(this.duration - Number.EPSILON, t));
    return (
      this.timeline.find((entry) => clamped >= entry.start && clamped < entry.end) ??
      this.timeline.at(-1)!
    );
  }

  render(t: number) {
    const safeT = Math.max(0, Math.min(this.duration, t));
    const entry = this.entryAt(safeT);
    const scene = this.scenes.get(entry.id) ?? diagnosticScene;
    const ctx: FilmContext = {
      t: safeT,
      localT: safeT - entry.start,
      duration: entry.end - entry.start,
      dt: 1 / FPS,
      frame: Math.round(safeT * FPS),
      width: LOGICAL_WIDTH,
      height: LOGICAL_HEIGHT,
      scale: this.surface.scale,
      seed: hashString(entry.id),
      entry,
    };

    this.surface.begin();
    scene.render(this.surface.ctx, ctx);
    return entry;
  }
}
