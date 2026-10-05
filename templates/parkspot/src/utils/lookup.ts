import { listings } from '../data/listings';
import { reviews } from '../data/reviews';
import { users } from '../data/users';

export const getListing = (id?: string) => listings.find((l) => l.id === id);

export const getUser = (id?: string) => users.find((u) => u.id === id);

export const getReviewsForListing = (listingId: string) => reviews.filter((r) => r.listingId === listingId);

export const getListingsByHost = (hostId: string) => listings.filter((l) => l.hostId === hostId);