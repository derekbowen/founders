import { categories } from "../data/categories";
import { owners } from "../data/owners";
import { reviews } from "../data/reviews";
import { vendors } from "../data/vendors";
import type { Category, CategoryId, Owner, Review, Vendor } from "../types/marketplace";

export function getVendorBySlug(slug: string): Vendor | undefined {
  return vendors.find((v) => v.slug === slug);
}

export function getVendorById(id: string): Vendor | undefined {
  return vendors.find((v) => v.id === id);
}

export function getCategory(id: CategoryId | string): Category | undefined {
  return categories.find((c) => c.id === id);
}

export function getOwner(id: string): Owner | undefined {
  return owners.find((o) => o.id === id);
}

export function getVendorReviews(vendorId: string): Review[] {
  return reviews.filter((r) => r.vendorId === vendorId);
}

export function getVendorsByOwner(ownerId: string): Vendor[] {
  return vendors.filter((v) => v.ownerId === ownerId);
}

export function countByCategory(id: CategoryId): number {
  return vendors.filter((v) => v.category === id).length;
}

export function getSimilarVendors(vendor: Vendor, limit = 3): Vendor[] {
  return vendors.
  filter((v) => v.id !== vendor.id && v.category === vendor.category).
  concat(vendors.filter((v) => v.id !== vendor.id && v.category !== vendor.category && v.city === vendor.city)).
  slice(0, limit);
}

export function priceLabel(vendor: Vendor): string {
  return vendor.priceUnit;
}