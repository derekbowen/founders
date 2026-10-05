import React from 'react';
import { CalendarIcon, ClockIcon, PackageIcon, TimerIcon } from 'lucide-react';
import type { Listing, StorageType } from '../../types/marketplace';
import { formatDate, formatTimeRange } from '../../utils/format';
import { storageLabel } from '../../utils/listings';
import type { PriceBreakdown } from '../../utils/pricing';
import { PriceBreakdownList } from '../listing/PriceBreakdownList';
import { StarRating } from '../ui/StarRating';

interface BookingSummaryProps {
  listing: Listing;
  date: string;
  startHour: number;
  hours: number;
  storage: StorageType[];
  breakdown: PriceBreakdown;
}

export function BookingSummary({ listing, date, startHour, hours, storage, breakdown }: BookingSummaryProps) {
  const rows = [
  { icon: CalendarIcon, label: 'Date', value: formatDate(date) },
  { icon: ClockIcon, label: 'Time', value: formatTimeRange(startHour, hours) },
  { icon: TimerIcon, label: 'Duration', value: `${hours} hours` },
  { icon: PackageIcon, label: 'Storage', value: storage.length ? storage.map(storageLabel).join(', ') : 'None' }];


  return (
    <div className="overflow-hidden rounded-2xl border border-steel-200 bg-white shadow-card">
      <div className="flex gap-4 border-b border-steel-200 p-5">
        <img src={listing.images[0]} alt="" className="h-20 w-24 shrink-0 rounded-lg object-cover" />
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-steel-500">{listing.neighborhood}, {listing.city}</p>
          <h2 className="mt-0.5 line-clamp-2 font-semibold text-steel-900">{listing.title}</h2>
          <StarRating rating={listing.rating} count={listing.reviewCount} className="mt-1" />
        </div>
      </div>
      <dl className="space-y-3 border-b border-steel-200 p-5 text-sm">
        {rows.map((r) =>
        <div key={r.label} className="flex items-start gap-3">
            <r.icon className="mt-0.5 h-4 w-4 shrink-0 text-steel-500" aria-hidden="true" />
            <dt className="w-20 shrink-0 text-steel-500">{r.label}</dt>
            <dd className="font-medium text-steel-900">{r.value}</dd>
          </div>
        )}
      </dl>
      <div className="p-5">
        <h3 className="mb-3 text-sm font-semibold text-steel-900">Price details</h3>
        <PriceBreakdownList breakdown={breakdown} />
        <p className="mt-4 rounded-lg bg-steel-50 p-3 text-xs leading-relaxed text-steel-600">
          Free cancellation until 48 hours before your session. Storage renews monthly until cancelled.
        </p>
      </div>
    </div>);

}