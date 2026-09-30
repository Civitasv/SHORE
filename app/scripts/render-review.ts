#!/usr/bin/env bun
import { chromium, type Page } from 'playwright-core';
import { mkdirSync } from 'node:fs';
import path from 'node:path';

const APP = path.resolve(import.meta.dir, '..');
const ROOT = path.resolve(APP, '..');
const OUT = path.join(ROOT, 'out', 'review');
const FPS = 60;

const opt = (name: string, fallback?: string) => {
  const argv = process.argv.slice(2);
  const i = argv.indexOf(`--${name}`);
  return i >= 0 ? argv[i + 1] : fallback;
};

async function reachable(url: string) {
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(1200) });
    return response.ok;
  } catch {
    return false;
  }
}

async function ensureServer() {
  const requested = opt('url', 'http://127.0.0.1:5173')!;
  if (await reachable(requested)) return { url: requested, stop: () => {} };

  const port = 5300 + Math.floor(Math.random() * 400);
  const process = Bun.spawn(
    ['bunx', 'vite', '--host', '127.0.0.1', '--port', String(port), '--strictPort'],
    {
      cwd: APP,
      stdout: 'ignore',
      stderr: 'inherit',
      env: { ...Bun.env, SHORE_REVIEW: '1' },
    },
  );

  const url = `http://127.0.0.1:${port}`;
  for (let i = 0; i < 100; i += 1) {
    if (await reachable(url)) return { url, stop: () => process.kill() };
    await Bun.sleep(100);
  }

  process.kill();
  throw new Error('Vite review server did not become reachable');
}

async function openPage(url: string) {
  const browser = await chromium.launch({
    channel: (opt('channel', 'chrome') as 'chrome'),
    headless: true,
    args: ['--disable-background-timer-throttling', '--disable-renderer-backgrounding'],
  });

  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1,
  });

  const errors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('pageerror', (error) => errors.push(error.message));

  await page.goto(`${url}/?export=1`);
  await page.waitForFunction(() => (window as any).__shore?.ready === true, null, { timeout: 60_000 });

  const sceneErrors: string[] = await page.evaluate(() => (window as any).__shore.errors);
  errors.push(...sceneErrors);

  return { browser, page, errors };
}

async function renderSheet(
  page: Page,
  times: number[],
  labels: string[],
  cols: number,
  out: string,
) {
  const dataUrl = await page.evaluate(
    ({ times, labels, cols }) => {
      const shore = (window as any).__shore;
      const src = document.getElementById('film') as HTMLCanvasElement;
      const cellW = 480;
      const cellH = 270;
      const labelH = 24;
      const gap = 4;
      const rows = Math.ceil(times.length / cols);

      const sheet = document.createElement('canvas');
      sheet.width = cols * cellW + (cols + 1) * gap;
      sheet.height = rows * (cellH + labelH) + (rows + 1) * gap;
      const g = sheet.getContext('2d')!;

      g.fillStyle = '#111214';
      g.fillRect(0, 0, sheet.width, sheet.height);

      for (let i = 0; i < times.length; i += 1) {
        const t = times[i]!;
        shore.still(t);

        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = gap + col * (cellW + gap);
        const y = gap + row * (cellH + labelH + gap);

        g.fillStyle = '#17191d';
        g.fillRect(x, y, cellW, labelH);
        g.fillStyle = '#ece9e1';
        g.font = '12px ui-monospace, SFMono-Regular, Menlo, monospace';
        g.textBaseline = 'middle';
        g.fillText(`${labels[i] ?? ''}  ${t.toFixed(3)}s`, x + 8, y + labelH / 2);

        g.drawImage(src, x, y + labelH, cellW, cellH);
      }

      return sheet.toDataURL('image/png');
    },
    { times, labels, cols },
  );

  mkdirSync(path.dirname(out), { recursive: true });
  await Bun.write(out, Buffer.from(dataUrl.split(',')[1]!, 'base64'));
  console.log(out);
}

async function representativePlates(page: Page) {
  const timeline: { id: string; start: number; end: number }[] = await page.evaluate(
    () => (window as any).__shore.timeline,
  );
  const times = timeline.map((entry) => (entry.start + entry.end) / 2);
  const labels = timeline.map((entry) => entry.id.toUpperCase());
  await renderSheet(page, times, labels, 4, path.join(OUT, 'plates.png'));
}

async function cutSheet(page: Page) {
  const timeline: { id: string; start: number; end: number }[] = await page.evaluate(
    () => (window as any).__shore.timeline,
  );

  const times: number[] = [];
  const labels: string[] = [];
  for (let i = 1; i < timeline.length; i += 1) {
    const current = timeline[i]!;
    const previous = timeline[i - 1]!;
    const t = current.start;
    const transition = `${previous.id.toUpperCase()} → ${current.id.toUpperCase()}`;
    const offsets = [
      [-0.1, 'T−100ms'],
      [-1 / FPS, 'T−1f'],
      [1 / FPS, 'T+1f'],
      [0.1, 'T+100ms'],
    ] as const;

    for (const [offset, suffix] of offsets) {
      times.push(Math.max(0, t + offset));
      labels.push(`${transition} / ${suffix}`);
    }
  }

  await renderSheet(page, times, labels, 4, path.join(OUT, 'cuts.png'));
}

async function endingSheet(page: Page) {
  const times = [150, 156, 164, 174.9, 178, 186, 194.9, 196, 199, 204.9, 208, 216, 227.9, 230, 236, 239.8];
  const labels = times.map((t) => `ENDING ${t.toFixed(1)}`);
  await renderSheet(page, times, labels, 4, path.join(OUT, 'ending.png'));
}

const { url, stop } = await ensureServer();
const { browser, page, errors } = await openPage(url);

try {
  await representativePlates(page);
  await cutSheet(page);
  await endingSheet(page);

  if (errors.length) {
    throw new Error(`browser/scene errors:\n${errors.join('\n')}`);
  }

  console.log('review sheets complete');
} finally {
  await browser.close();
  stop();
}
