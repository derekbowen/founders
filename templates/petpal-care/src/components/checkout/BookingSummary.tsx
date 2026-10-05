import React from 'react';
import { CalendarIcon, ClockIcon, PawPrintIcon } from 'lucide-react';
import { ServiceIcon } from '../common/ServiceIcon';
import { StarRating } from '../common/StarRating';
import { formatDateRange, formatMoney, formatTime, pluralize } from '../../utils/format';
import type { PriceBreakdown } from '../../utils/pricing';
import type { Listing, PriceVariant, ServiceMeta } from '../../types/listing';

interface BookingSummaryProps {
  listing: Listing;
  meta: ServiceMeta;
  variant: PriceVariant;
  start: string;
  end?: string;
  time?: string;
  pets: number;
  breakdown: PriceBreakdown;
}

export function BookingSummary({ listing, meta, variant, start, end, time, pets, breakdown }: BookingSummaryProps) {
  return (
    <div className="card overflow-hidden">
      <div className="flex gap-4 p-5">
        <img src={listing.photos[0]} alt="" className="h-20 w-24 shrink-0 rounded-2xl object-cover" />
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-wide text-ink-500">{listing.sitter.name}</p>
          <p className="line-clamp-2 font-extrabold leading-snug text-ink-900">{listing.title}</p>
          <div className="mt-1">
            <StarRating rating={listing.rating} count={listing.reviewCount} />
          </div>
        </div>
      </div>
      <div className="space-y-2.5 border-t border-ink-100 px-5 py-4 text-sm">
        <p className="flex items-center gap-2 font-bold text-ink-900">
          <ServiceIcon serviceId={meta.id} className="h-4 w-4 text-accent-700" />
          {meta.name} · {variant.label}
        </p>
        <p className="flex items-center gap-2 text-ink-700">
          <CalendarIcon className="h-4 w-4 text-accent-700" aria-hidden="true" />
          {formatDateRange(start, end)}
          {meta.unitType === 'night' && ` · ${pluralize(breakdown.units, 'night')}`}
        </p>
        {time &&
        <p className="flex items-center gap-2 text-ink-700">
            <ClockIcon className="h-4 w-4 text-accent-700" aria-hidden="true" />
            Starts at {formatTime(time)}
            {variant.durationMinutes ? ` · ${variant.durationMinutes} min` : ''}
          </p>
        }
        <p className="flex items-center gap-2 text-ink-700">
          <PawPrintIcon className="h-4 w-4 text-accent-700" aria-hidden="true" />
          {pluralize(pets, 'pet')}
        </p>
      </div>
      <dl className="space-y-2 border-t border-ink-100 px-5 py-4 text-sm">
        {breakdown.lineItems.map((li) =>
        <div key={li.label} className="flex justify-between gap-3">
            <dt className="text-ink-700">{li.label}</dt>
            <dd className="font-bold text-ink-900">{formatMoney(li.amount, true)}</dd>
          </div>
        )}
        <div className="flex justify-between">
          <dt className="text-ink-700">Service fee</dt>
          <dd className="font-bold text-ink-900">{formatMoney(breakdown.serviceFee, true)}</dd>
        </div>
        <div className="flex justify-between border-t border-ink-100 pt-3 text-base">
          <dt className="font-extrabold text-ink-900">Total (USD)</dt>
          <dd className="font-black text-ink-900">{formatMoney(breakdown.total, true)}</dd>
        </div>
      </dl>
      <p className="border-t border-ink-100 bg-ink-50 px-5 py-4 text-xs leading-relaxed text-ink-600">
        <span className="font-bold text-ink-800">Free cancellation</span> up to 3 days before the start date. 50% refund up to 24 hours before.
      </p>
    </div>);

}