# SHORE — Engine Specification

## 1. Principle

At export time the film is deterministic:

```
Frame = render(songTime, committedTimingData, seededSceneState)
```

No scene may depend on Date.now(), requestAnimationFrame phase, network state or unseeded Math.random().

## 2. Stack

- TypeScript
- Three.js / WebGL2
- Canvas2D for high-quality 2D typography where useful
- Vite
- Bun
- Playwright / headless Chrome
- FFmpeg
- Python analysis tools later for stems/alignment/audio features

## 3. Coordinate system

Scenes author in 1920×1080 logical pixels.

Physical rendering uses `scale`:
- 1 → 1920×1080
- 2 → 3840×2160

Projection helpers map logical coordinates to Three.js NDC/world units. Canvas2D layers render directly at physical scale.

## 4. Core interfaces

```ts
export interface FilmContext {
  t: number;
  dt: number;
  frame: number;
  width: number;
  height: number;
  scale: number;
  lyrics: Lyrics;
  audio: AudioData;
  seed: number;
}

export interface Scene {
  id: string;
  enter?(): void;
  render(ctx: FilmContext): void;
  dispose?(): void;
}
```

Timeline entries:
```ts
{
  id,
  start,
  end,
  load,
  params?,
  maxSamples?
}
```

## 5. Timeline

Final timeline boundaries should use semantic anchors:
- aligned lyric word/line start;
- nearest preceding beat;
- nearest downbeat for large transitions;
- explicit authored exceptions.

Before final audio exists, provisional timeline uses normalized sections so scene development can proceed.

## 6. Rendering layers

1. WebGL background / 3D geometry
2. WebGL lines / points / physically scaled primitives
3. Canvas typography / annotations
4. Post-processing
5. Preview-only transport/debug UI

Scene modules should not directly own the transport controls.

## 7. Preview API

Browser exposes a stable debug/export bridge:

```ts
window.__shore = {
  ready,
  duration,
  timeline,
  still(t, samples?, shutter?),
  stream(options),
  engine,
  errors
}
```

Controls:
- Space: play/pause
- Left/Right: seek ±1 s
- Shift+Left/Right: ±5 s
- , / . : previous/next frame
- [ / ] : previous/next plate
- L: loop plate
- H: hide transport
- D: debug overlays

## 8. Offline render

Headless Chrome loads the exact app used for preview.

Modes:
- `stills`
- `sheet`
- `cuts`
- `perf`
- `video`

Video path:
```
Engine -> RGBA frames -> WebSocket/pipe -> FFmpeg -> H.264/H.265
```

Output is tagged BT.709.

## 9. Temporal supersampling

Each output frame integrates samples across a shutter interval.

Draft:
- 1–4 samples.

Final adaptive ladder:
- 4
- 12
- 36
- 108
- 324

Adaptive selection stops when added samples no longer materially alter the frame within tolerance. Scene entries may cap sampling for known noisy shaders.

Any stochastic effect sampled temporally must use either:
- frame-stable seeded noise; or
- intentionally time-continuous noise.

## 10. Audio data

Committed data shape:

```ts
interface AudioData {
  duration: number;
  bpm: number;
  beats: number[];
  downbeats: number[];
  onsets: number[];
  sections: { name: string; start: number; end: number }[];
  loudness?: { hop: number; values: number[] };
}
```

## 11. Lyrics data

```ts
interface Word {
  text: string;
  start: number;
  end: number;
}

interface LyricLine {
  text: string;
  start: number;
  end: number;
  words: Word[];
}
```

Scene code queries words by content; it should not duplicate raw timings.

## 12. Fault isolation

Scene loading is lazy. A broken scene:
- records an error;
- renders a diagnostic plate;
- does not prevent other plates from previewing.

## 13. Performance budget

1080p preview target on recent desktop:
- ordinary 2D scenes: < 8 ms/frame;
- moderate 3D: < 16 ms/frame;
- heavy final-only scenes may exceed real-time but require a proxy mode.

4K export prioritizes fidelity over real-time performance.

## 14. Testing

Automated:
- timeline is contiguous and non-overlapping;
- all scene modules load;
- deterministic same-`t` render hash for stable fixtures;
- no NaN/Infinity in timing data;
- all aligned words are ordered;
- export bridge boots.

Visual:
- representative still per plate;
- contact sheet;
- cut sheet around every boundary.

## 15. Initial milestone

Foundation PR must prove:
- browser preview boots;
- transport is deterministic;
- a provisional timeline can switch scenes;
- BOOT scene renders from one point into the first line;
- architecture does not require final audio to begin visual development.
