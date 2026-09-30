# SHORE Code Map

| Area | Contract | Implementation |
| --- | --- | --- |
| Creative thesis / production constraints | `docs/SPEC.md` | whole project |
| Plate-by-plate direction | `docs/TREATMENT.md` | `app/src/scenes/` |
| Visual language | `docs/STYLE_BIBLE.md` | `app/src/motifs/`, palette and draw primitives |
| Engine architecture | `docs/ENGINE.md` | `app/src/engine/` |
| Production sequencing | `docs/PRODUCTION.md` | project workflow |
| Song text | `lyrics/NO_SHORE.md` | future aligned lyric data |
| Timeline / edit | semantic lyric + beat anchors | `app/src/timeline.ts` |
| Film transport / export bridge | deterministic preview | `app/src/main.ts` |
| Rendering surface | 1920×1080 logical frame | `app/src/engine/surface.ts` |
| Core frame execution | `render(t)` | `app/src/engine/engine.ts` |
| Shared draw primitives | low-level Canvas2D | `app/src/engine/draw.ts` |
| Shared semantic motifs | point / field / signal | `app/src/motifs/` |
| Timing data | final song is authoritative | `data/` |
| CI | GitHub Actions | `.github/workflows/ci.yml` |

## Dependency direction

```text
creative + engine contracts
          ↓
    shared engine/motifs
          ↓
       scenes
          ↓
       timeline
          ↓
 preview/export bridge
```

Scenes may consume shared engine/motif APIs. Shared engine/motif code must not depend on a specific scene.

## Current scene state

Implemented:
- BOOT
- NAMING
- LANTERN
- SILENCE
- ANSWER

Development placeholders:
- FIRE
- HORIZON
- ESCAPE
- MACHINE
- ATLAS
- SEA
- NO_SHORE
