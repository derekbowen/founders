import React from 'react';
import { CalendarIcon } from 'lucide-react';
import { OfferActions } from './OfferActions';
import type { Offer, OfferState, Transaction, UserRole } from '../../types/marketplace';
import { formatDate, formatMoney, formatTimestamp } from '../../utils/format';
import { cn } from '../../utils/styles';

interface OfferCardProps {
  tx: Transaction;
  offer: Offer;
  isFirst: boolean;
  isMine: boolean;
  authorName: string;
  canRespond: boolean;
  viewerRole: UserRole;
}

const stateStyles: Record<OfferState, {label: string;className: string;}> = {
  active: { label: 'Awaiting response', className: 'bg-sky-50 text-sky-800 ring-sky-200' },
  superseded: { label: 'Countered', className: 'bg-ink-100 text-ink-600 ring-ink-200' },
  accepted: { label: 'Accepted', className: 'bg-emerald-50 text-emerald-800 ring-emerald-200' },
  declined: { label: 'Declined', className: 'bg-red-50 text-red-800 ring-red-200' }
};

export function OfferCard({ tx, offer, isFirst, isMine, authorName, canRespond, viewerRole }: OfferCardProps) {
  const state = stateStyles[offer.state];
  const muted = offer.state === 'superseded';
  return (
    <div className={cn('flex', isMine ? 'justify-end' : 'justify-start')}>
      <article
        id={offer.state === 'active' ? 'active-offer' : undefined}
        className={cn(
          'w-full max-w-md scroll-mt-24 rounded-2xl border bg-white p-4 shadow-card',
          offer.state === 'active' && canRespond ? 'border-primary-400 ring-2 ring-primary-100' : 'border-ink-200',
          muted && 'opacity-75'
        )}
        aria-label={`${isFirst ? 'Offer' : 'Counter-offer'} from ${authorName}`}>
        
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-bold uppercase tracking-wide text-ink-500">
            {isFirst ? 'Offer' : 'Counter-offer'} · {isMine ? 'You' : authorName}
          </p>
          <span className={cn('rounded-full px-2 py-0.5 text-[11px] font-bold ring-1 ring-inset', state.className)}>
            {state.label}
          </span>
        </div>
        <p className={cn('mt-2 text-3xl font-extrabold text-ink-900', muted && 'line-through decoration-ink-400')}>
          {formatMoney(offer.amount)}
        </p>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-600">
          <CalendarIcon className="h-4 w-4" aria-hidden="true" />
          Earliest: {formatDate(offer.earliestDate, 'EEE, MMM d')}
        </p>
        {offer.message && <p className="mt-3 text-sm leading-relaxed text-ink-700">{offer.message}</p>}
        <p className="mt-3 text-xs text-ink-500">{formatTimestamp(offer.createdAt)}</p>
        {offer.state === 'active' && canRespond && <OfferActions tx={tx} offer={offer} role={viewerRole} />}
      </article>
    </div>);

}