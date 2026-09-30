# Timing data

The current browser timeline is intentionally provisional because the final song performance does not exist yet.

When the final mix is selected, this directory will contain:
- `lyrics.json` — line/word timing from forced alignment;
- `audio.json` — BPM, beats, downbeats, onsets, loudness and sections.

Scene boundaries will then be derived from those files rather than the provisional seconds in `app/src/timeline.ts`.
