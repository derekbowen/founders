import React from 'react';
import { BrandCard } from '../brand/BrandCard';
import { SectionHeading } from '../ui/SectionHeading';
import { trendingBrandIds } from '../../data/landing';
import { getBrand } from '../../utils/catalog';
import type { Brand } from '../../types/marketplace';

export function TrendingBrands() {
  const list = trendingBrandIds.map((id) => getBrand(id)).filter((b): b is Brand => Boolean(b));
  return (
    <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Trending brands"
        title="Reordered most by retailers this month"
        description="Brands with the highest reorder rate across cafés and boutiques."
        linkLabel="See all products"
        linkTo="/search" />
      
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((b) =>
        <BrandCard key={b.id} brand={b} />
        )}
      </div>
    </section>);

}