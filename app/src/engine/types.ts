export const LOGICAL_WIDTH = 1920;
export const LOGICAL_HEIGHT = 1080;
export const FPS = 60;

export interface TimelineEntry {
  id: string;
  start: number;
  end: number;
  load: () => Promise<SceneModule>;
  params?: Record<string, unknown>;
}

export interface FilmContext {
  t: number;
  localT: number;
  duration: number;
  dt: number;
  frame: number;
  width: number;
  height: number;
  scale: number;
  seed: number;
  entry: TimelineEntry;
}

export interface Scene {
  render(g: CanvasRenderingContext2D, ctx: FilmContext): void;
}

export interface SceneModule {
  default: Scene;
}
