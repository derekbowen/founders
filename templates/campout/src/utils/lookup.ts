import { listings } from '../data/listings';
import { reviews } from '../data/reviews';
import { siteTypes } from '../data/siteTypes';
import { users } from '../data/users';
import type { Listing, SiteType } from '../types/listing';
import type { Review, User } from '../types/user';

export function getListing(id: string | undefined): Listing | undefined {
  return listings.find((l) => l.id === id);
}

export function getUser(id: string): User {
  return users.find((u) => u.id === id) ?? users[0];
}

export function findUser(id: string | undefined): User | undefined {
  return users.find((u) => u.id === id);
}

export function getSiteType(key: SiteType) {
  return siteTypes.find((s) => s.key === key) ?? siteTypes[0];
}

export function getHostListings(hostId: string): Listing[] {
  return listings.filter((l) => l.hostId === hostId);
}

export function getListingReviews(listingId: string): Review[] {
  return reviews.filter((r) => r.listingId === listingId);
}

export function getHostReviews(hostId: string): Review[] {
  const ids = getHostListings(hostId).map((l) => l.id);
  return reviews.filter((r) => ids.includes(r.listingId));
}