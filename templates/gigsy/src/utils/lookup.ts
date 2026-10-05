import { categories } from '../data/categories';
import { listings } from '../data/listings';
import { reviews } from '../data/reviews';
import { users } from '../data/users';
import { Category, CategoryId, Listing, Review, User } from '../types/marketplace';

export function getUser(id: string): User | undefined {
  return users.find((u) => u.id === id);
}

export function getListing(id: string): Listing | undefined {
  return listings.find((l) => l.id === id);
}

export function getCategory(id: CategoryId): Category | undefined {
  return categories.find((c) => c.id === id);
}

export function getListingsByFreelancer(freelancerId: string): Listing[] {
  return listings.filter((l) => l.freelancerId === freelancerId);
}

export function getReviewsForListing(listingId: string): Review[] {
  return reviews.filter((r) => r.listingId === listingId);
}

export function getReviewsForFreelancer(freelancerId: string): Review[] {
  return reviews.filter((r) => r.freelancerId === freelancerId);
}

export function countListingsInCategory(id: CategoryId): number {
  return listings.filter((l) => l.category === id).length;
}