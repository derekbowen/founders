import { brands } from '../data/brands';
import { categories } from '../data/categories';
import { products } from '../data/products';
import { reviews } from '../data/reviews';
import type { Brand, Category, Product, Review } from '../types/marketplace';

export function getProduct(id: string | undefined): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getBrand(id: string | undefined): Brand | undefined {
  return brands.find((b) => b.id === id);
}

export function getCategory(id: string | undefined): Category | undefined {
  return categories.find((c) => c.id === id);
}

export function getBrandProducts(brandId: string): Product[] {
  return products.filter((p) => p.brandId === brandId);
}

export function getProductReviews(productId: string): Review[] {
  return reviews.filter((r) => r.productId === productId);
}

export function getBrandReviews(brandId: string): Review[] {
  return reviews.filter((r) => r.brandId === brandId);
}

/** Fixed "today" for the mock catalog so "New" badges stay stable. */
const REFERENCE_DATE = new Date('2026-10-01');

export function isNewListing(listedAt: string): boolean {
  const days = (REFERENCE_DATE.getTime() - new Date(listedAt).getTime()) / 86_400_000;
  return days <= 14;
}

export function getCategoryCount(categoryId: string): number {
  return products.filter((p) => p.categoryId === categoryId).length;
}