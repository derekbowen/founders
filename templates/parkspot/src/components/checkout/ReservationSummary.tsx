import React from 'react';
import { CalendarClockIcon, CarIcon, ShieldCheckIcon } from 'lucide-react';
import { PriceBreakdown } from '../listing/PriceBreakdown';
import { Rating } from '../common/Rating';
import { formatDateTime } from '../../utils/format';
import type { Listing, UnitType } from '../../types/listing';
import type { Quote } from '../../utils/pricing';

interface ReservationSummaryProps {
  listing: Listing;
  quote: Quote;
  arrive: string;
  leave: string;
  unit: UnitType;
  plate: string;
}

export function ReservationSummary({ listing, quote, arrive, leave, unit, plate }: ReservationSummaryProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface">
      <div className="flex gap-4 border-b border-line p-5">
        <img src={listing.photos[0]} alt="" className="h-20 w-24 shrink-0 rounded-xl object-cover" />
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">{listing.spotType} · {listing.neighborhood}</p>
          <h2 className="mt-0.5 line-clamp-2 font-semibold leading-snug">{listing.title}</h2>
          <div className="mt-1">
            <Rating value={listing.rating} count={listing.reviewCount} />
          </div>
        </div>
      </div>
      <dl className="space-y-3 border-b border-line p-5 text-sm">
        <div className="flex items-start gap-3">
          <CalendarClockIcon size={16} className="mt-0.5 text-muted" aria-hidden />
          <div>
            <dt className="text-xs text-muted">Arrive</dt>
            <dd className="font-medium">{formatDateTime(arrive)}</dd>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <CalendarClockIcon size={16} className="mt-0.5 text-muted" aria-hidden />
          <div>
            <dt className="text-xs text-muted">Leave</dt>
            <dd className="font-medium">{formatDateTime(leave)}</dd>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <CarIcon size={16} className="mt-0.5 text-muted" aria-hidden />
          <div>
            <dt className="text-xs text-muted">Plate · Booking type</dt>
            <dd className="font-medium">
              {plate || '—'} · {unit === 'hour' ? 'Hourly' : 'Daily'}
            </dd>
          </div>
        </div>
      </dl>
      <div className="p-5">
        <PriceBreakdown quote={quote} />
      </div>
      <div className="flex gap-3 bg-canvas p-5 text-xs text-muted">
        <ShieldCheckIcon size={16} className="shrink-0 text-success" aria-hidden />
        Free cancellation up to 2 hours before arrival. After that, 50% is refunded.
      </div>
    </div>);

}