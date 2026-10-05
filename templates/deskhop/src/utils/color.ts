export function hexToRgbTriplet(hex: string): string {
  const clean = hex.replace('#', '');
  const full =
  clean.length === 3 ?
  clean.
  split('').
  map((c) => c + c).
  join('') :
  clean;
  const num = parseInt(full, 16);
  const r = num >> 16 & 255;
  const g = num >> 8 & 255;
  const b = num & 255;
  return `${r} ${g} ${b}`;
}