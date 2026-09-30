# SHORE — Style Bible

## Tone

Precise, humane, quiet enough to make scale feel large.

The film should feel designed by an observatory, a cartographer and a type designer—not by a generic “sci-fi UI” generator.

Avoid:
- purple/cyan cyberpunk;
- Matrix rain;
- glowing brains;
- generic neural-network spheres;
- decorative star particles from the first frame;
- photoreal rockets used as spectacle;
- lens-flare soup;
- permanent HUD chrome;
- centered lyric subtitles.

## Palette

| Token | Hex | Role |
|---|---:|---|
| VOID | #050608 | deep background |
| GRAPHITE | #17191D | panels / secondary fields |
| BONE | #ECE9E1 | primary type / geometry |
| ASH | #85878C | secondary type |
| STAR | #FFB84D | active signal / sung word |
| CORE | #FFF1C2 | rare hot centre |

Only STAR and CORE receive obvious bloom.

## Grid

Logical frame: 1920×1080.

Safe area:
- x: 96–1824
- y: 72–1008

Base grid:
- 12 columns;
- 24 px micro-grid;
- 96 px major spacing unit.

Scenes may break the grid only on a meaningful musical event.

## Type roles

### Voice
A modern grotesk with strong width/weight range. Used for lyrics and human statements.

### Machine
IBM Plex Mono or equivalent OFL mono. Used for coordinates, state, measurements and system messages.

### Wonder
A restrained serif italic. Used at most a few times for lines about wonder/memory—not as a default “poetic” filter.

## Type animation

Allowed:
- weight interpolation;
- width interpolation;
- tracking;
- path layout;
- reveal by geometry;
- transformation into lines/maps.

Avoid:
- random character scrambling as filler;
- constant glitch;
- bounce-per-word karaoke.

## Lines

Hairlines are a primary visual material.

At 1080p:
- fine: 1 px;
- standard: 1.5–2 px;
- structural: 3 px.

At physical 4K render, widths scale with output scale rather than being upscaled bitmaps.

## Stars

Stars are data points before they are scenery.

Early film:
- 0–20 visible points.

Middle:
- tens of navigational points, mostly dim.

Final chorus:
- dense field permitted.

Random star fields must use seeded deterministic PRNG.

## Grain and post

Subtle film grain may unify plates but must not erase line precision.

Post order:
1. scene render;
2. selective bloom/halation;
3. exposure/grade;
4. temporal accumulation/motion blur;
5. grain/dither;
6. UI/debug overlay (preview only).

## Motion

Preferred eases:
- outExpo for launches;
- inOutCubic for camera travel;
- critically damped spring for settling instruments;
- linear only for physically constant signals/trajectories.

Every scene needs periods of stillness.

## Reusable motifs

Implement in shared modules, not separately per scene:
- Point;
- TravelingLine;
- CoordinateGrid;
- MapLabel;
- Orbit;
- SignalPulse;
- Constellation;
- LyricPath.

Shared motifs must keep semantic consistency across plates.
