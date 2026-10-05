/** Converts "#RRGGBB" into "R G B" channels for `rgb(var(--x) / alpha)`. */
export function hexToRgbChannels(hex: string): string {
  const clean = hex.replace('#', '');
  const full =
  clean.length === 3 ?
  clean.
  split('').
  map((c) => c + c).
  join('') :
  clean;
  const num = parseInt(full, 16);
  return `${num >> 16 & 255} ${num >> 8 & 255} ${num & 255}`;
}