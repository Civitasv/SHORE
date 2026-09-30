import type { TimelineEntry } from './engine/types';

const scene = (name: string) => () => import(`./scenes/${name}.ts`);

export const timeline: TimelineEntry[] = [
  { id: 'boot', start: 0, end: 18, load: scene('boot') },
  { id: 'naming', start: 18, end: 38, load: scene('naming') },
  { id: 'fire', start: 38, end: 58, load: scene('fire') },
  { id: 'horizon', start: 58, end: 70, load: scene('horizon') },
  { id: 'escape', start: 70, end: 92, load: scene('escape') },
  { id: 'machine', start: 92, end: 122, load: scene('placeholder') },
  { id: 'atlas', start: 122, end: 150, load: scene('placeholder') },
  { id: 'lantern', start: 150, end: 175, load: scene('lantern') },
  { id: 'silence', start: 175, end: 195, load: scene('silence') },
  { id: 'answer', start: 195, end: 205, load: scene('answer') },
  { id: 'sea', start: 205, end: 228, load: scene('sea') },
  { id: 'no-shore', start: 228, end: 240, load: scene('no-shore') },
];

export const PROVISIONAL_DURATION = timeline.at(-1)!.end;
