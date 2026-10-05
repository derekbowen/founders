import React from 'react';
import { useListings } from '../../contexts/ListingsContext';
import { ProductCard } from '../product/ProductCard';
import { SectionHeader } from '../ui/SectionHeader';

export function NewFromMakers() {
  const { listings } = useListings();
  const newest = [...listings].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 8);

  return (
    <section className="container-page py-16">
      <SectionHeader
        eyebrow="Fresh out of the kiln"
        title="New from makers"
        description="Just listed this week by independent studios across the country."
        link={{ to: '/s?sort=newest', label: 'See everything new' }} />
      
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
        {newest.map((l) =>
        <ProductCard key={l.id} listing={l} />
        )}
      </div>
    </section>);

}