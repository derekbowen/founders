/** Converts "#D23A22" → "210 58 34" for use inside rgb(var(--x) / alpha). */
export function hexToRgbChannels(hex: string): string {
  const clean = hex.replace('#', '');
  const full = clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean;
  const n = parseInt(full, 16);
  return `${n >> 16 & 255} ${n >> 8 & 255} ${n & 255}`;
}