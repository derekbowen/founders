/** Converts "#7856de" into "120 86 222" for use in rgb(var(--x) / alpha) */
export function hexToChannels(hex: string): string {
  const clean = hex.replace('#', '');
  const full = clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean;
  const n = parseInt(full, 16);
  return `${n >> 16 & 255} ${n >> 8 & 255} ${n & 255}`;
}