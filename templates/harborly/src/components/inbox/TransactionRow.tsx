import React from 'react';
import { Link } from 'react-router-dom';
import { StatusBadge } from '../ui/StatusBadge';
import { useMarketplace } from '../../contexts/MarketplaceContext';
import { formatDate } from '../../utils/format';
import { cn } from '../../utils/ui';
import type { Transaction } from '../../types/marketplace';

interface TransactionRowProps {
  tx: Transaction;
  tab: 'trips' | 'listings';
  active: boolean;
}

export function TransactionRow({ tx, tab, active }: TransactionRowProps) {
  const { getListing, getUser } = useMarketplace();
  const listing = getListing(tx.listingId);
  const other = getUser(tab === 'trips' ? tx.providerId : tx.customerId);
  const last = tx.messages[tx.messages.length - 1];

  return (
    <Link
      to={`/inbox/${tab}/${tx.id}`}
      aria-current={active ? 'page' : undefined}
      className={cn('flex gap-3 rounded-2xl p-3 transition-colors', active ? 'bg-sand-light ring-1 ring-line' : 'hover:bg-sand-light/60')}>
      
      <img src={listing?.images[0]} alt="" className="h-16 w-16 shrink-0 rounded-xl object-cover" />
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="truncate text-sm font-semibold text-ink">{other?.name}</p>
          <StatusBadge status={tx.status} className="px-2 py-0.5 text-[11px]" />
        </div>
        <p className="truncate text-xs text-muted">{listing?.title}</p>
        <p className="mt-1 truncate text-xs text-ink/70">
          {formatDate(tx.tripDate, 'MMM d')} · {last ? last.text : 'No messages yet'}
        </p>
      </div>
    </Link>);

}