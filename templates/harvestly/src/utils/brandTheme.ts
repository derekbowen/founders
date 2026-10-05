import { brand, BrandColorKey } from "../data/brand";

function hexToTriplet(hex: string): string {
  const clean = hex.replace("#", "");
  const full =
  clean.length === 3 ?
  clean.
  split("").
  map((c) => c + c).
  join("") :
  clean;
  const num = parseInt(full, 16);
  return `${num >> 16 & 255} ${num >> 8 & 255} ${num & 255}`;
}

function toKebab(key: string): string {
  return key.replace(/([A-Z])/g, "-$1").toLowerCase();
}

/** CSS custom properties consumed by tailwind.config.js color tokens. */
export function brandCssVars(): Record<string, string> {
  const vars: Record<string, string> = {};
  (Object.keys(brand.colors) as BrandColorKey[]).forEach((key) => {
    vars[`--c-${toKebab(key)}`] = hexToTriplet(brand.colors[key]);
  });
  return vars;
}