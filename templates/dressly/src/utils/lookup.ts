import { listings } from '../data/listings';
import { users } from '../data/users';
import { reviews } from '../data/reviews';
import { occasions } from '../data/taxonomy';
import type { Listing, Review, User } from '../types/marketplace';

export function getListing(id: string | undefined): Listing | undefined {
  return listings.find((l) => l.id === id);
}

export function getUser(id: string | undefined): User | undefined {
  return users.find((u) => u.id === id);
}

export function reviewsForListing(listingId: string): Review[] {
  return reviews.filter((r) => r.listingId === listingId);
}

export function reviewsForLender(lenderId: string): Review[] {
  const ids = listings.filter((l) => l.lenderId === lenderId).map((l) => l.id);
  return reviews.filter((r) => ids.includes(r.listingId));
}

export function listingsByLender(lenderId: string): Listing[] {
  return listings.filter((l) => l.lenderId === lenderId);
}

export function occasionLabel(slug: string): string {
  return occasions.find((o) => o.slug === slug)?.label ?? slug;
}