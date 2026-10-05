import React from 'react';
import { CalendarIcon, ClockIcon, ShieldCheckIcon, UsersIcon } from 'lucide-react';
import { Sitter } from '../../types/sitter';
import { PriceBreakdown } from '../../utils/pricing';
import { formatCurrency, formatDate, formatTime } from '../../utils/format';
import { Rating } from '../ui/Rating';

interface BookingSummaryProps {
  sitter: Sitter;
  date: string;
  start: string;
  end: string;
  kids: number;
  breakdown: PriceBreakdown;
}

export function BookingSummary({ sitter, date, start, end, kids, breakdown: b }: BookingSummaryProps) {
  return (
    <div className="rounded-3xl border border-ink-200 bg-white p-6 shadow-soft">
      <div className="flex items-center gap-4">
        <img src={sitter.photo} alt="" className="h-16 w-16 rounded-2xl object-cover" />
        <div>
          <p className="font-heading text-lg font-bold text-ink-900">{sitter.name}</p>
          <Rating value={sitter.rating} count={sitter.reviewCount} />
        </div>
      </div>
      <ul className="mt-5 space-y-2.5 border-t border-ink-200 pt-5 text-sm text-ink-700">
        <li className="flex items-center gap-2.5"><CalendarIcon className="h-4 w-4 text-primary-600" aria-hidden />{formatDate(date, 'EEEE, MMMM d, yyyy')}</li>
        <li className="flex items-center gap-2.5"><ClockIcon className="h-4 w-4 text-primary-600" aria-hidden />{formatTime(start)} – {formatTime(end)} · {b.hours} hours</li>
        <li className="flex items-center gap-2.5"><UsersIcon className="h-4 w-4 text-primary-600" aria-hidden />{kids} {kids === 1 ? 'child' : 'children'}</li>
      </ul>
      <dl className="mt-5 space-y-2 border-t border-ink-200 pt-5 text-sm">
        <div className="flex justify-between"><dt className="text-ink-600">${sitter.hourlyRate} × {b.hours} hours</dt><dd>{formatCurrency(b.base)}</dd></div>
        {b.extraChildren > 0 &&
        <div className="flex justify-between"><dt className="text-ink-600">Additional {b.extraChildren === 1 ? 'child' : 'children'}</dt><dd>{formatCurrency(b.extraCharge)}</dd></div>
        }
        <div className="flex justify-between"><dt className="text-ink-600">Booking & safety fee</dt><dd>{formatCurrency(b.fee)}</dd></div>
        <div className="flex justify-between border-t border-ink-200 pt-3 text-base font-bold text-ink-900"><dt>Total (USD)</dt><dd>{formatCurrency(b.total)}</dd></div>
      </dl>
      <div className="mt-5 flex gap-2.5 rounded-2xl bg-primary-50 p-4 text-xs leading-relaxed text-primary-900">
        <ShieldCheckIcon className="h-4 w-4 shrink-0 text-primary-700" aria-hidden />
        Free cancellation up to 24 hours before. Your card is only charged when {sitter.name.split(' ')[0]} accepts.
      </div>
    </div>);

}