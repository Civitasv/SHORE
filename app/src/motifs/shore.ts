export function shoreY(x: number) {
  return 540 + Math.sin(x * 0.007) * 52 + Math.sin(x * 0.017 + 1.3) * 21;
}

export function shorePoints(x0 = 300, x1 = 1620, step = 18): [number, number][] {
  const pts: [number, number][] = [];
  for (let x = x0; x <= x1; x += step) pts.push([x, shoreY(x)]);
  return pts;
}
