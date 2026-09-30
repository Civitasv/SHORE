# SHORE Current State

## Product state

SHORE has a locked first-pass creative direction and a working deterministic browser preview foundation.

Working song: **NO SHORE**  
Core line: **Our destination is the sea of stars.**

## Implemented

- project specification, treatment, style bible and engine specification;
- 12-plate provisional edit;
- deterministic Canvas2D film surface;
- scene loading with diagnostic fallback;
- play/pause, seek, frame-step, plate navigation and loop controls;
- browser export/debug bridge through `window.__shore`;
- shared semantic motifs for shoreline, beacon, coordinate field, signal pulse and constellation;
- BOOT plate;
- NAMING plate;
- FIRE plate;
- HORIZON plate;
- ESCAPE plate;
- LANTERN plate;
- SILENCE plate;
- ANSWER plate;
- SEA plate;
- NO_SHORE plate;
- semantic BOOT → NAMING → FIRE → HORIZON → ESCAPE first-act chain;
- complete provisional ending arc: LANTERN → SILENCE → ANSWER → SEA → NO_SHORE;
- timeline structural validation;
- GitHub Actions CI and PR evidence workflow.

## Architecture baseline

- every exported frame is determined by film time and committed data;
- preview and export share scene code;
- 1920×1080 is the authored logical space;
- higher-resolution output scales physical rendering rather than upscaling a 1080p bitmap;
- point → line → map is the primary visual grammar;
- the full star field is withheld until SEA;
- final song timing will replace provisional seconds.

## Remaining work

### Song
- finalize lyrics after singing/meter pass;
- produce/select final English performance and mix.

### Analysis
- vocal separation;
- word-level forced alignment;
- beat/downbeat/onset/loudness analysis;
- committed `data/lyrics.json` and `data/audio.json`.

### Engine
- WebGL/Three.js layer;
- lyric-path system;
- post stack;
- temporal supersampling;
- Playwright/FFmpeg offline renderer;
- still/contact-sheet/cut-sheet render modes.

### Plates
- MACHINE
- ATLAS

The only remaining scene placeholders are the human-machine middle act. MACHINE must receive ESCAPE's trajectory; ATLAS must turn its computational graph into the route that LANTERN later strips away.
