/**
 * Curated fallback heroes for city pages that don't have a unique
 * hero_image_url stored. Picked deterministically by slug so the same city
 * always renders the same fallback (stable og:image, no layout flash).
 */
const HERO_FALLBACKS = [
  // Wide pool / backyard / lifestyle photos, all 1600x900-ish.
  "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1600&h=900&q=80",
  "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1600&h=900&q=80",
  "https://images.unsplash.com/photo-1505881502353-a1986add3762?auto=format&fit=crop&w=1600&h=900&q=80",
  "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1600&h=900&q=80",
  "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1600&h=900&q=80",
  "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1600&h=900&q=80",
  "https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?auto=format&fit=crop&w=1600&h=900&q=80",
  "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1600&h=900&q=80",
];

function hashSlug(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) {
    h = (h * 31 + slug.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

export function pickFallbackHero(slug: string): string {
  return HERO_FALLBACKS[hashSlug(slug) % HERO_FALLBACKS.length];
}

/** Resolve the hero image URL for a city, with deterministic fallback. */
export function resolveCityHero(slug: string, storedUrl: string | null | undefined): string {
  if (storedUrl && storedUrl.trim()) return storedUrl;
  return pickFallbackHero(slug);
}
