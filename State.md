# SHORE Current State

## Product state

SHORE has a complete first-pass, four-minute provisional film from BOOT through NO_SHORE. Every timeline plate has a dedicated deterministic scene implementation.

Working song: **NO SHORE**  
Core line: **Our destination is the sea of stars.**

## Implemented

- project specification, treatment, style bible and engine specification;
- complete 12-plate provisional edit;
- deterministic Canvas2D film surface;
- scene loading with diagnostic fallback;
- play/pause, seek, frame-step, plate navigation and loop controls;
- browser export/debug bridge through `window.__shore`;
- shared semantic motifs for shoreline, escape trajectory, beacon, coordinate field, signal pulse, computational/navigation graph and constellation;
- BOOT → NAMING → FIRE → HORIZON → ESCAPE first-act chain;
- MACHINE → ATLAS human-machine co-navigation middle act;
- LANTERN → SILENCE → ANSWER → SEA → NO_SHORE ending arc;
- plate contact-sheet renderer;
- four-frame-per-boundary cut-sheet renderer;
- critical ending review sheet;
- automatic/manual GitHub Actions Render Review artifact workflow;
- first contact-sheet review completed;
- timeline structural validation;
- GitHub Actions CI and PR evidence workflow.

## Architecture baseline

- every exported frame is determined by film time and committed data;
- preview and review render use the same scene code;
- 1920×1080 is the authored logical space;
- higher-resolution output scales physical rendering rather than upscaling a 1080p bitmap;
- point → line → map is the primary visual grammar;
- the full star field is withheld until SEA;
- final song timing will replace provisional seconds;
- MACHINE and ATLAS reuse one graph geometry rather than cutting to unrelated visuals;
- major scene boundaries should preserve an outgoing object into the incoming scene before changing its meaning.

## Visual review findings — pass 1

Confirmed strengths:
- HORIZON has a clear scale-change read;
- LANTERN → SILENCE → ANSWER carries the intended emotional reduction;
- SEA releases the withheld star-field language late;
- NO_SHORE resolves to continuation rather than arrival.

Continuity fixes implemented after the first cut sheet:
- ESCAPE → MACHINE now carries the resolved Earth/trajectory frame into the graph scene before dissolving it;
- ANSWER resolves its return wave into the two-point connection before SEA begins;
- SEA → NO_SHORE now shares the exact final constellation/catalog frame and dissolves it into the mission state;
- MACHINE/ATLAS graph contrast and label hierarchy are raised for review-scale readability.

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
- full offline video renderer with FFmpeg;
- WebGL/Three.js layer where 3D depth materially improves a plate;
- lyric-path system;
- post stack;
- temporal supersampling.

### Visual review / polish
- compare the second review sheets against pass 1;
- continue refining typography hierarchy and exposure where the contact sheet reads too uniformly dark;
- refine choreography after final audio exists;
- remove any transition that still does not read as a semantic morph.

There are no timeline placeholders remaining. The next blocking creative asset is the actual song, while visual review can continue in parallel through the review-sheet workflow.
