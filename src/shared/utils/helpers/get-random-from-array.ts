export function getRandomFromArray<T = unknown>(arr: T[]): T | undefined {
  if (arr.length === 0) return undefined;
  const idx = Math.floor(Math.random() * arr.length);
  return arr[idx];
}
