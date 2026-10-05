import React from 'react';
import { CalendarIcon, CheckIcon, RepeatIcon, XIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import { Offer } from '../../types/marketplace';
import { formatDate, formatMoney } from '../../utils/format';

interface OfferCardProps {
  offer: Offer;
  authorLabel: string;
  onAccept?: () => void;
  onCounter?: () => void;
  onDecline?: () => void;
  acceptLabel?: string;
  compact?: boolean;
}

const statusStyles: Record<Offer['status'], string> = {
  pending: 'bg-primary-50 text-primary-700',
  accepted: 'bg-accent-50 text-accent-800',
  declined: 'bg-rose-50 text-rose-700',
  countered: 'bg-slate-100 text-slate-600'
};

const statusLabel: Record<Offer['status'], string> = {
  pending: 'Awaiting response',
  accepted: 'Accepted',
  declined: 'Declined',
  countered: 'Superseded by counter'
};

export function OfferCard({ offer, authorLabel, onAccept, onCounter, onDecline, acceptLabel = 'Accept offer', compact = false }: OfferCardProps) {
  const hasActions = !!(onAccept || onCounter || onDecline);

  return (
    <div className={`rounded-2xl border bg-white ${offer.status === 'pending' ? 'border-primary-200' : 'border-slate-200'} ${compact ? 'p-4' : 'p-5'}`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            {offer.from === 'freelancer' ? 'Offer' : 'Counter-offer'} · {authorLabel}
          </p>
          <p className={`mt-1 font-extrabold tracking-tight text-slate-900 ${compact ? 'text-xl' : 'text-2xl'}`}>{formatMoney(offer.price)}</p>
        </div>
        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[offer.status]}`}>{statusLabel[offer.status]}</span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-slate-700">{offer.scope}</p>
      <p className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-slate-600">
        <CalendarIcon className="h-4 w-4 text-slate-400" aria-hidden="true" />
        Delivery by {formatDate(offer.deliveryDate)}
      </p>
      {hasActions &&
      <div className="mt-5 flex flex-wrap gap-2">
          {onAccept && <Button onClick={onAccept} leftIcon={<CheckIcon className="h-4 w-4" aria-hidden="true" />}>{acceptLabel}</Button>}
          {onCounter && <Button variant="secondary" onClick={onCounter} leftIcon={<RepeatIcon className="h-4 w-4" aria-hidden="true" />}>Counter</Button>}
          {onDecline && <Button variant="danger" onClick={onDecline} leftIcon={<XIcon className="h-4 w-4" aria-hidden="true" />}>Decline</Button>}
        </div>
      }
    </div>);

}