# SHORE Agent Collaboration Contract

## Purpose

SHORE is an original English-song, code-rendered generative film. The durable product is both the finished film and the deterministic film engine that produces it.

The creative contract is defined by `docs/SPEC.md`, `docs/TREATMENT.md`, and `docs/STYLE_BIBLE.md`. The technical contract is defined by `docs/ENGINE.md`.

## Working rules

1. Start at `Code.md`, then read the relevant creative/engine spec, then source and validation.
2. Preserve the core invariant: an exported frame is a deterministic function of song time and committed timing data.
3. Do not use wall-clock time, network state, unseeded randomness, or preview-only state to determine film pixels.
4. Final audio is authoritative. Hard-coded provisional seconds must eventually yield to aligned lyric/beat data.
5. Reuse shared motifs before creating scene-local substitutes. Point, line, map, orbit, signal, constellation and lyric-path semantics must stay consistent.
6. A transition should transform an object already present in the outgoing plate whenever possible; arbitrary dissolves are a fallback, not a default.
7. Do not introduce generic sci-fi filler: neon HUDs, decorative particles, Matrix rain, glowing brains, stock nebulae, or unrelated spectacle.
8. Typography is image content, not a permanent subtitle layer. Lyric timing must be readable and semantically integrated.
9. Preview and offline export must use the same scene implementation.
10. Visual changes need visual evidence. For choreography, transitions, camera, exposure, typography or composition, attach a still, contact sheet, cut sheet or short range render.
11. Heavy final-quality rendering does not belong in ordinary PR CI. CI validates deterministic structure, type safety and preview build; render evidence is produced deliberately when needed.
12. CI is GitHub Actions. This public repository does not use CNB.
13. Never claim Green without executing the applicable checks.
14. Only original, licensed or clearly redistributable assets may enter the repository. Record attribution/license requirements when an external asset is added.
15. When required checks are Green, no blocking review/thread exists, the branch is mergeable, and scope is complete, squash-merge.

## TypeScript baseline

- TypeScript 7.
- ESM.
- Bun + Vite.
- Three.js/WebGL2 and Canvas2D are rendering backends; scene semantics should not be coupled unnecessarily to one backend.
- 1920×1080 is the logical coordinate system.
- Physical render scale may increase resolution without changing authored layout.

## Completion checklist

- behavior/timeline validation updated when applicable;
- `cd app && bun run check:timeline`;
- `cd app && bun run typecheck`;
- `cd app && bun run build`;
- visual evidence supplied for visual changes;
- no nondeterministic film state introduced;
- shared motif/engine boundary respected;
- docs/treatment/style updated when contracts change;
- semantic Conventional Commit message.
