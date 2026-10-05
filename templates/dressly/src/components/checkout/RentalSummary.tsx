import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarIcon, SparklesIcon } from 'lucide-react';
import type { Listing, RentalDays } from '../../types/marketplace';
import type { PriceBreakdown } from '../../utils/pricing';
import { formatMoney, longDate, shortDate, sizeLabel } from '../../utils/format';

interface RentalSummaryProps {
  listing: Listing;
  days: RentalDays;
  eventDate: Date;
  start: Date;
  end: Date;
  breakdown: PriceBreakdown;
}

export function RentalSummary({ listing, days, eventDate, start, end, breakdown }: RentalSummaryProps) {
  return (
    <div className="border border-line bg-paper">
      <div className="flex gap-4 border-b border-line p-5">
        <img src={listing.image} alt="" className="h-28 w-20 shrink-0 object-cover" />
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-eyebrow text-ink">{listing.designer}</p>
          <Link to={`/l/${listing.id}`} className="mt-1 block font-display text-xl leading-snug text-ink hover:underline">
            {listing.title}
          </Link>
          <p className="mt-1 text-xs text-muted">
            {sizeLabel(listing.size)} · {listing.fit}
          </p>
        </div>
      </div>
      <div className="space-y-3 border-b border-line p-5 text-sm">
        <div className="flex items-start gap-3">
          <CalendarIcon size={16} className="mt-0.5 text-accent-dark" aria-hidden="true" />
          <div>
            <p className="text-ink">Event: {longDate(eventDate)}</p>
            <p className="text-xs text-muted">
              {days}-day rental · arrives {shortDate(start)}, return by {shortDate(end)}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <SparklesIcon size={16} className="mt-0.5 text-accent-dark" aria-hidden="true" />
          <p className="text-xs text-muted">Professional cleaning included. Just send it back as is.</p>
        </div>
      </div>
      <dl className="space-y-2 p-5 text-sm">
        {breakdown.lines.map((l) =>
        <div key={l.label} className="flex justify-between">
            <dt className="text-muted">{l.label}</dt>
            <dd className={l.note ? 'text-accent-dark' : 'text-ink'}>{l.note ?? formatMoney(l.amount)}</dd>
          </div>
        )}
        <div className="flex justify-between border-t border-line pt-3 text-base font-semibold">
          <dt>Total due</dt>
          <dd>{formatMoney(breakdown.total)}</dd>
        </div>
      </dl>
    </div>);

}