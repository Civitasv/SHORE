# SHORE

**Our destination is the sea of stars.**

SHORE is an original, code-rendered English music video project about humanity, machines, memory, and the decision to keep moving beyond every known horizon.

The working song title is **NO SHORE**.

## Current state

The project has a complete **first-pass provisional 4-minute film**:
- all 12 plates have dedicated deterministic scenes;
- no timeline placeholder remains;
- the point → line → map visual grammar runs from BOOT to NO_SHORE;
- GitHub Actions validates timeline structure, TypeScript and the production preview build;
- a separate manual Render Review workflow produces plate/cut/ending contact sheets for visual review.

The final song audio has not been produced yet, so scene timing and lyric choreography are intentionally provisional.

## Preview

Requires Bun.

```sh
cd app
bun install
bun run dev
```

Controls:
- Space — play/pause
- Left/Right — seek ±1 second
- Shift+Left/Right — seek ±5 seconds
- , / . — step one 60 fps frame
- [ / ] — previous/next plate
- L — loop current plate
- H — hide/show transport

You can also open `?t=150&scale=2`. `?export=1` hides the transport for headless rendering.

## Review sheets

With Google Chrome installed:

```sh
cd app
bun run render:review
```

This writes:
- `out/review/plates.png` — one representative frame per plate;
- `out/review/cuts.png` — T−100 ms, T−1 frame, T+1 frame, T+100 ms around every scene boundary;
- `out/review/ending.png` — denser coverage of LANTERN through NO_SHORE.

The same renderer is available as the **Render Review** manual GitHub Actions workflow and uploads the sheets as an artifact.

## Documents

- `docs/SPEC.md` — creative and production specification
- `docs/TREATMENT.md` — plate-by-plate treatment
- `docs/STYLE_BIBLE.md` — visual rules
- `docs/ENGINE.md` — renderer architecture
- `docs/PRODUCTION.md` — production phases
- `lyrics/NO_SHORE.md` — working English lyrics
- `State.md` — implemented and remaining work
- `Code.md` — repository map

## Core rule

Every exported frame must be deterministic:

```
frame = render(songTime)
```

The browser preview and offline review renderer use the same scene implementation.

> There is no final shore.
