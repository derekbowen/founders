import React from 'react';
import { CalendarIcon, MapPinIcon } from 'lucide-react';
import { Avatar } from '../Avatar';
import { StarRating } from '../ui/StarRating';
import { brand } from '../../data/brand';
import type { Job, Offer, User } from '../../types/marketplace';
import { formatDate, formatMoney } from '../../utils/format';
import { customerFee, customerTotal } from '../../utils/transactions';

interface OrderSummaryProps {
  job: Job;
  pro: User;
  offer: Offer;
}

export function OrderSummary({ job, pro, offer }: OrderSummaryProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-card">
      <div className="flex gap-4 border-b border-ink-100 p-5">
        {job.photos[0] && <img src={job.photos[0]} alt="" className="h-20 w-24 shrink-0 rounded-lg object-cover" />}
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-wide text-ink-500">Job</p>
          <p className="mt-0.5 line-clamp-2 font-extrabold text-ink-900">{job.title}</p>
          <p className="mt-1 flex items-center gap-1 text-xs text-ink-600">
            <MapPinIcon className="h-3.5 w-3.5" aria-hidden="true" />
            {job.area}
          </p>
        </div>
      </div>
      <div className="space-y-4 border-b border-ink-100 p-5">
        <div className="flex items-center gap-3">
          <Avatar name={pro.name} alt={pro.name} size="md" />
          <div>
            <p className="font-extrabold text-ink-900">{pro.name}</p>
            {pro.rating !== undefined && <StarRating rating={pro.rating} count={pro.reviewCount} />}
          </div>
        </div>
        <p className="flex items-center gap-2 text-sm text-ink-700">
          <CalendarIcon className="h-4 w-4 text-ink-500" aria-hidden="true" />
          Earliest start: <strong>{formatDate(offer.earliestDate, 'EEEE, MMM d')}</strong>
        </p>
        {offer.message &&
        <blockquote className="rounded-xl bg-ink-50 p-3 text-sm italic text-ink-700">“{offer.message}”</blockquote>
        }
      </div>
      <dl className="space-y-2 p-5 text-sm">
        <div className="flex justify-between">
          <dt className="text-ink-600">Agreed price</dt>
          <dd className="font-bold text-ink-900">{formatMoney(offer.amount)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-ink-600">Service fee ({brand.fees.customerServiceRate * 100}%)</dt>
          <dd className="text-ink-800">{formatMoney(customerFee(offer.amount))}</dd>
        </div>
        <div className="flex justify-between border-t border-ink-200 pt-3 text-base">
          <dt className="font-extrabold text-ink-900">Total due today</dt>
          <dd className="font-extrabold text-ink-900">{formatMoney(customerTotal(offer.amount))}</dd>
        </div>
      </dl>
    </div>);

}