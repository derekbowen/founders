import React from 'react';
import { ProductCard } from '../product/ProductCard';
import { SectionHeading } from '../ui/SectionHeading';
import { featuredProductIds } from '../../data/landing';
import { getProduct } from '../../utils/catalog';
import type { Product } from '../../types/marketplace';

export function FeaturedProducts() {
  const list = featuredProductIds.map((id) => getProduct(id)).filter((p): p is Product => Boolean(p));
  return (
    <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="New & noteworthy" title="Fresh on the marketplace" linkLabel="Shop all products" linkTo="/search?sort=newest" />
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {list.map((p) =>
        <ProductCard key={p.id} product={p} />
        )}
      </div>
    </section>);

}