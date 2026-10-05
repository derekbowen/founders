import { differenceInCalendarDays, startOfToday } from 'date-fns';
import { listings } from '../data/listings';
import { reviews } from '../data/reviews';
import { services } from '../data/services';
import type { Listing, ListingService, Review, ServiceMeta } from '../types/listing';

export function getListingById(id: string | undefined): Listing | undefined {
  return listings.find((l) => l.id === id);
}

export function getListingsBySitter(sitterId: string): Listing[] {
  return listings.filter((l) => l.sitter.id === sitterId);
}

export function getServiceMeta(serviceId: string): ServiceMeta | undefined {
  return services.find((s) => s.id === serviceId);
}

export function getListingService(listing: Listing, serviceId: string): ListingService | undefined {
  return listing.services.find((s) => s.serviceId === serviceId);
}

export function getReviewsForListing(listingId: string): Review[] {
  return reviews.filter((r) => r.listingId === listingId);
}

export function getReviewsForSitter(sitterId: string): Review[] {
  const ids = getListingsBySitter(sitterId).map((l) => l.id);
  return reviews.filter((r) => ids.includes(r.listingId));
}

/** Cheapest price for a service (or the listing's first service when none is given). */
export function getStartingPrice(listing: Listing, serviceId?: string) {
  const service =
  serviceId && getListingService(listing, serviceId) ||
  getListingService(listing, 'boarding') ||
  listing.services[0];
  const meta = getServiceMeta(service.serviceId);
  const price = Math.min(...service.variants.map((v) => v.price));
  return { price, unitLabel: meta?.unitLabel ?? 'night', serviceId: service.serviceId };
}

export function isDateBlocked(listing: Listing, date: Date): boolean {
  const offset = differenceInCalendarDays(date, startOfToday());
  if (offset < 0) return true;
  return listing.blockedDayOffsets.includes(offset);
}