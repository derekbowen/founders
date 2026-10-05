import { certifications, keyEquipment, segments, storageTypes } from '../data/catalog';
import { hosts } from '../data/hosts';
import { listings } from '../data/listings';
import { reviews } from '../data/reviews';
import type {
  CertificationKey,
  EquipmentKey,
  Listing,
  SegmentKey,
  StorageType } from
'../types/marketplace';

export const getListing = (id?: string) => listings.find((l) => l.id === id);
export const getHost = (id?: string) => hosts.find((h) => h.id === id);
export const getListingsByHost = (hostId: string) => listings.filter((l) => l.hostId === hostId);
export const getReviewsForListing = (listingId: string) => reviews.filter((r) => r.listingId === listingId);

export function getReviewsForHost(hostId: string) {
  const ids = getListingsByHost(hostId).map((l) => l.id);
  return reviews.filter((r) => ids.includes(r.listingId));
}

export const equipmentLabel = (key: EquipmentKey) => keyEquipment.find((e) => e.key === key)?.label ?? key;
export const storageLabel = (key: StorageType) => storageTypes.find((s) => s.key === key)?.label ?? key;
export const certificationLabel = (key: CertificationKey) =>
certifications.find((c) => c.key === key)?.label ?? key;
export const segmentLabel = (key: SegmentKey) => segments.find((s) => s.key === key)?.label ?? key;

export function startHourOptions(listing: Listing): number[] {
  const out: number[] = [];
  const last = listing.access247 ? 23 : listing.closeHour - listing.minHours;
  const first = listing.access247 ? 0 : listing.openHour;
  for (let h = first; h <= last; h += 1) out.push(h);
  return out;
}

export function durationOptions(listing: Listing, startHour: number): number[] {
  const max = listing.access247 ? 12 : Math.min(12, listing.closeHour - startHour);
  const out: number[] = [];
  for (let h = listing.minHours; h <= max; h += 1) out.push(h);
  return out;
}

export function hoursLabel(listing: Listing): string {
  return listing.access247 ? 'Open 24/7 with keycard access' : `Open daily ${formatShortHour(listing.openHour)}–${formatShortHour(listing.closeHour)}`;
}

function formatShortHour(h: number): string {
  const hh = h % 24;
  if (hh === 0) return 'midnight';
  const suffix = hh < 12 ? 'am' : 'pm';
  return `${hh % 12 === 0 ? 12 : hh % 12}${suffix}`;
}