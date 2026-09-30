import './style.css';
import { FilmEngine } from './engine/engine';
import { FPS } from './engine/types';
import { FilmSurface } from './engine/surface';
import { timeline } from './timeline';

declare global {
  interface Window {
    __shore: {
      ready: boolean;
      duration: number;
      timeline: { id: string; start: number; end: number }[];
      errors: string[];
      still: (t: number) => string;
      engine: FilmEngine;
    };
  }
}

function required<T extends Element>(selector: string): T {
  const element = document.querySelector<T>(selector);
  if (!element) throw new Error(`SHORE preview is missing ${selector}`);
  return element;
}

const canvas = required<HTMLCanvasElement>('#film');
const playButton = required<HTMLButtonElement>('#play');
const scrub = required<HTMLInputElement>('#scrub');
const sceneLabel = required<HTMLElement>('#scene');
const timeLabel = required<HTMLElement>('#time');
const transport = required<HTMLElement>('#transport');

const params = new URLSearchParams(location.search);
const scale = Math.max(1, Math.round(Number(params.get('scale') ?? 1)));
const exportMode = params.get('export') === '1';

const surface = new FilmSurface(canvas, scale);
const engine = new FilmEngine(surface, timeline);
await engine.prepare();

let t = Math.max(0, Math.min(engine.duration, Number(params.get('t') ?? 0)));
let playing = false;
let looping = false;
let lastNow = performance.now();

scrub.max = String(engine.duration);
if (exportMode) transport.classList.add('hidden');

const fmt = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds - m * 60;
  return `${String(m).padStart(2, '0')}:${s.toFixed(3).padStart(6, '0')}`;
};

const seek = (next: number) => {
  t = Math.max(0, Math.min(engine.duration, next));
};

const currentIndex = () => timeline.indexOf(engine.entryAt(t));

function render() {
  const entry = engine.render(t);
  sceneLabel.textContent = entry.id.toUpperCase();
  timeLabel.textContent = fmt(t);
  scrub.value = String(t);
  playButton.textContent = playing ? 'PAUSE' : 'PLAY';
}

function tick(now: number) {
  const dt = Math.min(0.1, Math.max(0, (now - lastNow) / 1000));
  lastNow = now;

  if (playing) {
    const entry = engine.entryAt(t);
    t += dt;
    if (looping && t >= entry.end) t = entry.start;
    if (t >= engine.duration) {
      t = engine.duration;
      playing = false;
    }
  }

  render();
  requestAnimationFrame(tick);
}

playButton.addEventListener('click', () => {
  playing = !playing;
  lastNow = performance.now();
});

scrub.addEventListener('input', () => {
  seek(Number(scrub.value));
});

window.addEventListener('keydown', (event) => {
  const key = event.key.toLowerCase();

  if (event.code === 'Space') {
    event.preventDefault();
    playing = !playing;
    lastNow = performance.now();
    return;
  }

  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
    const amount = event.shiftKey ? 5 : 1;
    seek(t + (event.key === 'ArrowRight' ? amount : -amount));
    return;
  }

  if (event.key === ',' || event.key === '.') {
    seek(t + (event.key === '.' ? 1 : -1) / FPS);
    return;
  }

  if (event.key === '[' || event.key === ']') {
    const dir = event.key === ']' ? 1 : -1;
    const next = Math.max(0, Math.min(timeline.length - 1, currentIndex() + dir));
    seek(timeline[next]!.start + 1 / FPS);
    return;
  }

  if (key === 'l') {
    looping = !looping;
    return;
  }

  if (key === 'h') transport.classList.toggle('hidden');
});

window.__shore = {
  ready: true,
  duration: engine.duration,
  timeline: timeline.map(({ id, start, end }) => ({ id, start, end })),
  errors: engine.errors,
  still(time: number) {
    seek(time);
    render();
    return surface.png();
  },
  engine,
};

render();
requestAnimationFrame(tick);
