import React from 'react';
import { MapPinIcon, MessageCircleIcon } from 'lucide-react';
import { BrandMonogram } from '../ui/BrandMonogram';
import { ButtonLink } from '../ui/ButtonLink';
import { RatingStars } from '../ui/RatingStars';
import { ValueTags } from '../ui/ValueTags';
import type { Brand } from '../../types/marketplace';
import { formatCurrency } from '../../utils/pricing';

export function BrandSummaryCard({ brand }: {brand: Brand;}) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5" aria-label={`About ${brand.name}`}>
      <div className="flex items-start gap-4">
        <BrandMonogram brand={brand} size="lg" />
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Sold by</p>
          <h2 className="text-lg font-semibold text-slate-900">{brand.name}</h2>
          <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
            <MapPinIcon className="h-3 w-3" aria-hidden="true" />
            {brand.location} · Since {brand.founded}
          </p>
          <div className="mt-2">
            <RatingStars rating={brand.rating} count={brand.reviewCount} />
          </div>
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-slate-600">{brand.story}</p>
      <div className="mt-4">
        <ValueTags values={brand.values} size="md" />
      </div>
      <dl className="mt-4 grid grid-cols-3 gap-3 border-t border-slate-100 pt-4 text-sm">
        <div>
          <dt className="text-xs text-slate-500">Brand minimum</dt>
          <dd className="font-semibold tabular-nums text-slate-900">{formatCurrency(brand.minOrderValue).replace('.00', '')}</dd>
        </div>
        <div>
          <dt className="text-xs text-slate-500">Retailers</dt>
          <dd className="font-semibold tabular-nums text-slate-900">{brand.retailerCount}</dd>
        </div>
        <div>
          <dt className="text-xs text-slate-500">Response</dt>
          <dd className="font-semibold text-slate-900">{brand.responseTime.replace('Replies within ', '< ')}</dd>
        </div>
      </dl>
      <div className="mt-4 flex gap-2">
        <ButtonLink to={`/brands/${brand.id}`} variant="secondary" className="flex-1">
          View brand
        </ButtonLink>
        <ButtonLink to="/inbox/purchases" variant="ghost" className="flex-1">
          <MessageCircleIcon className="h-4 w-4" aria-hidden="true" />
          Message
        </ButtonLink>
      </div>
    </section>);

}