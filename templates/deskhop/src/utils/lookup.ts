import { listings } from '../data/listings';
import { reviews } from '../data/reviews';
import { spaceTypes } from '../data/spaceTypes';
import { users } from '../data/users';
import type { Listing, SpaceTypeId, SpaceTypeInfo } from '../types/listing';
import type { Review, User } from '../types/user';

export function getListing(id: string | undefined): Listing | undefined {
  return listings.find((l) => l.id === id);
}

export function getUser(id: string | undefined): User | undefined {
  return users.find((u) => u.id === id);
}

export function getSpaceType(id: SpaceTypeId): SpaceTypeInfo {
  return spaceTypes.find((t) => t.id === id) ?? spaceTypes[0];
}

export function getListingReviews(listingId: string): Review[] {
  return reviews.filter((r) => r.listingId === listingId);
}

export function getHostListings(hostId: string): Listing[] {
  return listings.filter((l) => l.hostId === hostId);
}

export function getHostReviews(hostId: string): Review[] {
  const ids = new Set(getHostListings(hostId).map((l) => l.id));
  return reviews.filter((r) => ids.has(r.listingId));
}

export function unitNoun(listing: Listing, count: number): string {
  const t = getSpaceType(listing.spaceType);
  return count === 1 ? t.unit.one : t.unit.many;
}