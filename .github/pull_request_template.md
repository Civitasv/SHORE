## Summary

-

## Visual intent

- What changes on screen, and why does it belong to the song/treatment?

## Evidence

- [ ] Representative still(s) attached when applicable
- [ ] Contact sheet / cut sheet attached for choreography or transition changes when applicable
- [ ] Timing evidence attached for lyric/beat-sensitive changes when applicable

## Validation

- [ ] `cd app && bun run check:timeline`
- [ ] `cd app && bun run typecheck`
- [ ] `cd app && bun run build`

## Creative / architecture impact

- [ ] Point → line → map motif remains semantically consistent
- [ ] Deterministic `render(t)` contract is preserved
- [ ] Shared behavior lives in engine/motif code rather than duplicated scene code
- [ ] Treatment/style/engine docs updated when their contracts change

## Notes

Validation that cannot run must be marked pending rather than assumed Green.
