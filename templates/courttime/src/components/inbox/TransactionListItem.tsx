import React from 'react';
import { Badge } from '../Badge';
import { listings } from '../../data/listings';
import { users } from '../../data/users';
import { Transaction } from '../../types/marketplace';
import { dateFromOffset, formatDateShort, formatTimeRange } from '../../utils/format';
import { statusMeta } from '../../utils/transactions';

interface TransactionListItemProps {
  tx: Transaction;
  active: boolean;
  onSelect: () => void;
}

export function TransactionListItem({ tx, active, onSelect }: TransactionListItemProps) {
  const listing = listings.find((l) => l.id === tx.listingId);
  const other = users.find((u) => u.id === tx.counterpartyId);
  const meta = statusMeta[tx.status];
  const last = tx.messages[tx.messages.length - 1];

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-current={active ? 'true' : undefined}
      className={`flex w-full gap-3 rounded-xl border p-3 text-left transition-colors ${active ? 'border-brand bg-brand-soft' : 'border-transparent bg-white hover:border-slate-200 hover:bg-slate-50'}`}>
      
      <img src={listing?.images[0]} alt="" className="h-14 w-14 shrink-0 rounded-lg object-cover" />
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="truncate text-sm font-semibold">{listing?.title}</p>
          <Badge variant={meta.variant} size="small">{meta.label}</Badge>
        </div>
        <p className="text-xs text-slate-600">
          {formatDateShort(dateFromOffset(tx.dayOffset))} · {formatTimeRange(tx.startHour, tx.hours)}
        </p>
        <p className="mt-0.5 truncate text-xs text-slate-500">
          {tx.role === 'provider' ? other?.name : listing?.clubName}
          {last ? ` — ${last.text}` : ''}
        </p>
      </div>
    </button>);

}