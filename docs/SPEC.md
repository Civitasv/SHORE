# SHORE — Production Specification

## 1. Project

**Project:** SHORE  
**Working song title:** NO SHORE  
**Core line:** *Our destination is the sea of stars.*  
**Format:** original English song + fully code-rendered generative music video  
**Target:** 16:9, 1920×1080/60 preview master; true 3840×2160/60 final render  
**Creative premise:** Humanity begins at one point on one shore. Every act of curiosity extends a line beyond a known boundary. The film turns that line into writing, coastlines, circuits, trajectories, radio signals and finally constellations.

SHORE is not a visualization of “space technology”. It is a film about the instinct to continue.

## 2. Narrative thesis

The film begins by asking:

> WHERE ARE WE?

The answer is:

> EARTH

It then asks:

> WHERE ARE WE GOING?

For most of the film the answer remains:

> UNKNOWN

The final answer is not a coordinate:

> THE SEA OF STARS

The final system state is deliberately **IN PROGRESS**, never COMPLETE.

## 3. Creative principles

1. **One evolving visual grammar.** A point becomes a cursor; the cursor draws a line; the line becomes a shore; the shore becomes an orbit; the orbit becomes a trajectory; the trajectory becomes a signal; the signal becomes a constellation.
2. **No literal storyboard illustration.** Lyrics are translated into transformations and visual ideas, not stock footage equivalents.
3. **Meaning before spectacle.** Every major visual event must have a narrative or musical reason.
4. **Restraint creates payoff.** The first two thirds avoid full “space beauty”. The star field is earned late.
5. **Code-native motion.** Scenes should use geometry, typography, simulation and shaders rather than pre-rendered generative video.
6. **Deterministic film.** Every frame is a pure function of song time plus committed timing data.
7. **Preview equals export.** Browser preview and offline render share the same scene engine.
8. **Song-aware edit.** Semantic anchors come from aligned words; cuts and large motion resolve on beats/downbeats.
9. **Originality.** Learn from the production methods of pdoom-video and world-execute-me-dsh-pv, not their visual identities or scene concepts.
10. **No final shore.** The ending must imply continuation rather than arrival.

## 4. Emotional arc

| Act | Emotional state | Visual state |
|---|---|---|
| I — Point | solitude, curiosity | black field, one point, sparse type |
| II — Line | discovery, construction | maps, writing, measurement, invention |
| III — Escape | courage, acceleration | orbit, launch, trajectory, machine collaboration |
| IV — Dark | distance, doubt, silence | UI disappears, Earth becomes a tiny lamp |
| V — Answer | connection, awe | signal answered, constellation, sea of stars |

## 5. Song target

Working target: **3:40–4:00**, 4/4, approximately **116–122 BPM**.

Musical direction:
- cinematic electronic / synth rock rather than trailer music;
- intimate first verse;
- controlled first chorus;
- denser machine rhythm in verse 2;
- vacuum-like bridge;
- final chorus with the widest harmonic and spatial image;
- outro returns to a single point rather than ending on a giant impact.

The actual mix becomes authoritative. Timing must be derived from the final audio, not hard-coded from the demo arrangement.

## 6. Visual motifs

### 6.1 THE POINT
The first visible object. It can mean:
- cursor;
- person;
- star;
- signal source;
- map marker;
- destination;
- another intelligence.

### 6.2 THE LINE
The central motif. It can mean:
- typed stroke;
- shoreline;
- timeline;
- waveform;
- circuit trace;
- orbit;
- spacecraft trajectory;
- radio wave;
- constellation connection.

The viewer should gradually realize these are the same object.

### 6.3 THE MAP
The film repeatedly invents maps and then exceeds them:
- local coordinate plane;
- coast chart;
- historical timeline;
- Earth orbit map;
- solar system;
- interstellar chart;
- constellation.

Each new map should contain the previous scale as something small.

## 7. Typography

Typography is part of the image, not subtitles.

Voices:
- **Human / lyric:** geometric grotesk, warm and highly legible.
- **Machine / measurement:** restrained mono.
- **Wonder / rare poetic register:** serif italic, used sparingly.

Per-word lyric state:
- unsung: 25–35% luminance;
- active word: warm stellar accent;
- completed: bone/white;
- long held notes may stretch width, tracking or geometry.

No permanent karaoke strip.

## 8. Color

Primary palette:
- space black: #050608
- graphite: #17191D
- bone: #ECE9E1
- ash: #85878C
- stellar gold: #FFB84D
- hot core: #FFF1C2

Optional late-film deep blue-gray may appear as reflected environmental light, never neon cyan.

Rules:
- only stellar gold/hot core bloom strongly;
- stars are not multicolored decoration;
- full saturated color is rare;
- final chorus expands luminosity more than hue count.

## 9. Camera and motion

Motion language:
- deliberate holds;
- strong out-expo launches;
- in-out cubic travel;
- physical inertia for maps and camera rigs;
- cuts on structural beats;
- whips only when scale changes;
- avoid perpetual floating.

Camera scale is narrative:
- macro cursor;
- desk/map;
- city/Earth;
- orbital;
- solar;
- interstellar.

## 10. Film structure

Initial target: 12 plates.

1. BOOT — one point / “where are we?”
2. NAMING — humanity names lights and draws maps
3. FIRE — stone → flame → writing → signal
4. HORIZON — shoreline becomes orbit
5. ESCAPE — first chorus / leave Earth
6. MACHINE — computation and human-machine co-navigation
7. ATLAS — DAG/network becomes navigation graph
8. LANTERN — Earth recedes; systems shut down
9. SILENCE — a signal crosses black
10. ANSWER — a second point responds
11. SEA — final chorus; constellation opens into star field
12. NO_SHORE — final mission state: IN PROGRESS

Exact boundaries must be derived from aligned lyrics and beat data.

## 11. Technical goals

- TypeScript, Three.js/WebGL2, Canvas2D where appropriate.
- Vite + Bun development environment.
- Deterministic scene API: `render(ctx, t)`.
- 1920×1080 logical coordinate space.
- Resolution-independent physical render scale.
- Headless Chrome export through Playwright.
- FFmpeg encode with BT.709 tagging.
- Word alignment and beat analysis stored as committed JSON.
- Adaptive temporal supersampling for high-motion frames.
- Still, contact-sheet, cut-sheet, performance and video render modes.
- Scene errors isolated so one broken plate does not prevent previewing the rest.

## 12. Acceptance criteria for v1 film

The film is complete when:
- all lyrics are visually represented and word-synchronized;
- every plate has a distinct composition but shares the motif system;
- every scene boundary is reviewed with cut sheets;
- preview and export produce equivalent frames at a given `t`;
- no major effect depends on nondeterministic wall-clock state;
- 1080p60 full render completes without scene errors;
- 4K60 final render is a true physical-resolution render;
- the last frame reads as continuation, not completion.
