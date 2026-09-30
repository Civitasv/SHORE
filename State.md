# SHORE Current State

## Product state

SHORE now has a complete first-pass, four-minute provisional film from BOOT through NO_SHORE. Every timeline plate has a dedicated deterministic scene implementation.

Working song: **NO SHORE**  
Core line: **Our destination is the sea of stars.**

## Implemented

- project specification, treatment, style bible and engine specification;
- complete 12-plate provisional edit;
- deterministic Canvas2D film surface;
- scene loading with diagnostic fallback;
- play/pause, seek, frame-step, plate navigation and loop controls;
- browser export/debug bridge through `window.__shore`;
- shared semantic motifs for shoreline, beacon, coordinate field, signal pulse, computational/navigation graph and constellation;
- BOOT → NAMING → FIRE → HORIZON → ESCAPE first-act chain;
- MACHINE → ATLAS human-machine co-navigation middle act;
- LANTERN → SILENCE → ANSWER → SEA → NO_SHORE ending arc;
- timeline structural validation;
- GitHub Actions CI and PR evidence workflow.

## Architecture baseline

- every exported frame is determined by film time and committed data;
- preview and export share scene code;
- 1920×1080 is the authored logical space;
- higher-resolution output scales physical rendering rather than upscaling a 1080p bitmap;
- point → line → map is the primary visual grammar;
- the full star field is withheld until SEA;
- final song timing will replace provisional seconds;
- MACHINE and ATLAS reuse one graph geometry rather than cutting to unrelated visuals.

## Remaining work

### Song — blocking for final edit
- finalize lyrics after singing/meter pass;
- produce/select final English performance and mix.

### Analysis — after final song
- vocal separation;
- word-level forced alignment;
- beat/downbeat/onset/loudness analysis;
- committed `data/lyrics.json` and `data/audio.json`;
- replace provisional scene timings with lyric/beat anchors.

### Engine / production quality
- WebGL/Three.js layer where 3D depth materially improves a plate;
- lyric-path system;
- post stack;
- temporal supersampling;
- Playwright/FFmpeg offline renderer;
- still/contact-sheet/cut-sheet render modes.

### Visual review / polish
- render representative stills for every plate;
- review every boundary at T−100 ms / T−1 frame / T+1 frame / T+100 ms;
- refine choreography, typography hierarchy, exposure and motion after the final audio exists;
- remove any transition that does not read as a semantic morph.

There are no timeline placeholders remaining. The next blocking creative asset is the actual song.
