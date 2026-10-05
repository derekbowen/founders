import React from 'react';
import { CalendarIcon, ClockIcon, UsersIcon } from 'lucide-react';
import { brand } from '../../data/brand';
import type { BookingDetails, Listing } from '../../types/listing';
import { formatMoney } from '../../utils/format';
import { getSpaceType } from '../../utils/lookup';
import type { Quote } from '../../utils/pricing';
import { formatDate } from '../../utils/time';
import { Rating } from '../listing/Rating';

interface CheckoutSummaryProps {
  listing: Listing;
  booking: BookingDetails;
  quote: Quote;
}

export function CheckoutSummary({ listing, booking, quote }: CheckoutSummaryProps) {
  const type = getSpaceType(listing.spaceType);
  const unit = booking.seats === 1 ? type.unit.one : type.unit.many;
  return (
    <div className="rounded-2xl border border-line bg-white p-5 shadow-card sm:p-6">
      <div className="flex gap-4">
        <img src={listing.images[0]} alt="" className="h-24 w-28 shrink-0 rounded-xl object-cover" />
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">{type.label}</p>
          <p className="mt-0.5 font-semibold leading-snug">{listing.title}</p>
          <p className="text-sm text-ink-muted">
            {listing.neighborhood}, {listing.city}
          </p>
          <Rating value={listing.rating} count={listing.reviewCount} className="mt-1" />
        </div>
      </div>

      <ul className="mt-5 space-y-2.5 border-t border-line pt-5 text-sm">
        <li className="flex items-center gap-2.5">
          <CalendarIcon size={16} className="text-ink-subtle" aria-hidden="true" /> {formatDate(booking.date)}
        </li>
        <li className="flex items-center gap-2.5">
          <ClockIcon size={16} className="text-ink-subtle" aria-hidden="true" />
          {booking.mode === 'day' ? `Full day · ${booking.start} – ${booking.end}` : `${booking.start} – ${booking.end}`}
        </li>
        <li className="flex items-center gap-2.5">
          <UsersIcon size={16} className="text-ink-subtle" aria-hidden="true" /> {booking.seats} {unit}
          {type.bookBy === 'space' && ` · up to ${listing.capacity * booking.seats} people`}
        </li>
      </ul>

      <dl className="mt-5 space-y-2 border-t border-line pt-5 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-ink-muted">
            {formatMoney(quote.unitPrice)} × {quote.units} {quote.unitLabel} × {booking.seats} {unit}
          </dt>
          <dd className="tabular-nums">{formatMoney(quote.subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-ink-muted">Service fee ({brand.serviceFeePercent}%)</dt>
          <dd className="tabular-nums">{formatMoney(quote.serviceFee)}</dd>
        </div>
        <div className="flex justify-between border-t border-line pt-3 text-base font-semibold">
          <dt>Total ({brand.currency})</dt>
          <dd className="tabular-nums">{formatMoney(quote.total)}</dd>
        </div>
      </dl>
      <p className="mt-3 text-xs text-ink-muted">Prices include VAT where applicable. A full invoice is emailed after your booking.</p>
    </div>);

}