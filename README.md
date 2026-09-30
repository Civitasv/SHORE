# SHORE

**Our destination is the sea of stars.**

SHORE is an original, code-rendered English music video project about humanity, machines, memory, and the decision to keep moving beyond every known horizon.

The working song title is **NO SHORE**.

## Current state

Foundation development has started:
- creative/production specification;
- full 12-plate treatment;
- style bible;
- deterministic browser film engine;
- provisional 4-minute timeline;
- first two plates: **BOOT** and **NAMING**.

The final audio has not been produced yet, so all current scene times are provisional.

## Preview

Requires Bun.

```sh
cd app
bun install
bun run dev
```

Open the Vite URL in a browser.

Controls:
- Space — play/pause
- Left/Right — seek ±1 second
- Shift+Left/Right — seek ±5 seconds
- , / . — step one 60 fps frame
- [ / ] — previous/next plate
- L — loop current plate
- H — hide/show transport

You can also open `?t=18&scale=2`. `?export=1` hides the transport for headless rendering.

## Documents

- `docs/SPEC.md` — creative and production specification
- `docs/TREATMENT.md` — plate-by-plate treatment
- `docs/STYLE_BIBLE.md` — visual rules
- `docs/ENGINE.md` — renderer architecture
- `docs/PRODUCTION.md` — production phases
- `lyrics/NO_SHORE.md` — working English lyrics

## Core rule

Every exported frame must be deterministic:

```
frame = render(songTime)
```

The browser preview and final offline renderer will use the same scene engine.

> There is no final shore.
