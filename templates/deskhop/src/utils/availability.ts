import type { Listing } from '../types/listing';

function hash(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

/** Deterministic mock availability: how many units are still free for a slot. */
export function seatsLeft(listing: Listing, date?: string, start = 'day'): number {
  if (!date) return listing.seats;
  const h = hash(`${listing.id}|${date}|${start}`);
  if (listing.seats === 1) return h % 6 === 0 ? 0 : 1;
  const booked = Math.floor(h % 100 / 100 * listing.seats * 0.75);
  return Math.max(0, listing.seats - booked);
}