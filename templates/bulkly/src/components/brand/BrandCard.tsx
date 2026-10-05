import React from 'react';
import { MapPinIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BrandMonogram } from '../ui/BrandMonogram';
import { RatingStars } from '../ui/RatingStars';
import { ValueTags } from '../ui/ValueTags';
import type { Brand } from '../../types/marketplace';
import { getBrandProducts } from '../../utils/catalog';
import { formatCurrency } from '../../utils/pricing';

export function BrandCard({ brand }: {brand: Brand;}) {
  const covers = getBrandProducts(brand.id).slice(0, 3);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-lift">
      <div className="grid h-36 grid-cols-3 gap-0.5 bg-slate-100">
        {covers.map((p) =>
        <img key={p.id} src={p.image} alt="" loading="lazy" className="h-full w-full object-cover" />
        )}
      </div>
      <div className="relative flex flex-1 flex-col px-4 pb-4">
        <div className="-mt-6 mb-2 rounded-xl ring-4 ring-white w-fit">
          <BrandMonogram brand={brand} size="md" />
        </div>
        <h3 className="text-base font-semibold text-slate-900">
          <Link to={`/brands/${brand.id}`} className="after:absolute after:inset-0 focus-visible:outline-none">
            {brand.name}
          </Link>
        </h3>
        <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
          <MapPinIcon className="h-3 w-3" aria-hidden="true" />
          {brand.location}
        </p>
        <p className="mt-2 line-clamp-2 text-sm text-slate-600">{brand.tagline}</p>
        <div className="mt-3">
          <ValueTags values={brand.values} />
        </div>
        <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
          <RatingStars rating={brand.rating} count={brand.reviewCount} />
          <span className="text-slate-600">
            Min <span className="font-semibold text-slate-800">{formatCurrency(brand.minOrderValue).replace('.00', '')}</span>
          </span>
        </div>
      </div>
    </article>);

}