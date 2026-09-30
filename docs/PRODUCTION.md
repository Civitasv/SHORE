# SHORE — Production Plan

## Phase 0 — Foundation

Deliver:
- creative specification;
- treatment and style bible;
- browser engine;
- provisional timeline;
- BOOT plate;
- deterministic transport;
- still/export hook.

Exit condition: first plate is reviewable in browser without final song audio.

## Phase 1 — Song

Deliver:
- final English lyrics;
- music-generation/production brief;
- selected final mix;
- clean WAV/MP3 source committed or supplied locally depending on rights/size policy.

Then freeze the authoritative song duration.

## Phase 2 — Alignment

Deliver:
- vocal stem;
- forced word alignment;
- beat/downbeat/onset data;
- committed `data/lyrics.json`;
- committed `data/audio.json`.

Replace provisional timeline boundaries with lyric/beat anchors.

## Phase 3 — Motif library

Build shared:
- Point;
- TravelingLine;
- grid/map system;
- lyric path renderer;
- orbit;
- signal;
- constellation;
- post stack.

Do this before duplicating scene-specific equivalents.

## Phase 4 — Plates

Recommended implementation order based on dependency:

1. BOOT
2. NAMING
3. HORIZON
4. ESCAPE
5. MACHINE
6. ATLAS
7. LANTERN
8. SILENCE
9. ANSWER
10. SEA
11. FIRE
12. NO_SHORE

The emotionally critical sequence LANTERN → SILENCE → ANSWER should be prototyped before polishing the less risky middle plates.

## Phase 5 — Edit and continuity

- lyric readability pass;
- beat/cut pass;
- transition morph pass;
- exposure hierarchy;
- motif continuity;
- eliminate redundant movement.

## Phase 6 — Render quality

- temporal supersampling;
- post-processing;
- grain;
- 1080p60 master;
- 4K60 master;
- compression tests.

## Review artifacts

Every PR that changes visual choreography should include at least one of:
- still;
- contact sheet;
- cut sheet;
- short rendered range.

Do not review long scene changes only from code diffs.
