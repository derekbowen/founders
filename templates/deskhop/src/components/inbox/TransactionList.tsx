import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { InboxIcon } from 'lucide-react';
import { Avatar } from '../Avatar';
import type { Transaction, TxStatus } from '../../types/transaction';
import { getListing, getUser } from '../../utils/lookup';
import { formatDate } from '../../utils/time';
import { EmptyState } from '../ui/EmptyState';
import { StatusBadge, statusMeta } from './StatusBadge';

interface TransactionListProps {
  transactions: Transaction[];
  role: 'customer' | 'provider';
  activeId?: string;
}

const filters: (TxStatus | 'all')[] = ['all', 'requested', 'confirmed', 'checked-in', 'completed', 'cancelled'];

export function TransactionList({ transactions, role, activeId }: TransactionListProps) {
  const [filter, setFilter] = useState<TxStatus | 'all'>('all');
  const visible = filter === 'all' ? transactions : transactions.filter((t) => t.status === filter);

  return (
    <div>
      <div className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-3" role="group" aria-label="Filter by status">
        {filters.map((f) => {
          const count = f === 'all' ? transactions.length : transactions.filter((t) => t.status === f).length;
          return (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`chip shrink-0 !px-2.5 !py-1 !text-xs ${filter === f ? 'chip-active' : ''}`}>
              
              {f === 'all' ? 'All' : statusMeta[f].label}
              <span className="text-ink-subtle">{count}</span>
            </button>);

        })}
      </div>

      {visible.length === 0 ?
      <EmptyState
        icon={InboxIcon}
        title="Nothing here yet"
        description={
        role === 'customer' ?
        'Bookings you make will show up here.' :
        'Booking requests for your spaces will show up here.'
        }
        action={
        role === 'customer' ?
        <Link to="/s" className="btn-primary">Find a space</Link> :

        <Link to="/listings/new" className="btn-primary">List a space</Link>

        } /> :


      <ul className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white">
          {visible.map((t) => {
          const listing = getListing(t.listingId);
          const other = getUser(role === 'customer' ? t.providerId : t.customerId);
          const last = t.messages[t.messages.length - 1];
          const isActive = t.id === activeId;
          const needsAction = role === 'provider' && t.status === 'requested';
          return (
            <li key={t.id}>
                <Link
                to={`/inbox/${t.id}`}
                aria-current={isActive ? 'page' : undefined}
                className={`focus-ring flex gap-3 p-4 transition-colors ${isActive ? 'bg-brand-50' : 'hover:bg-mist'}`}>
                
                  <div className="relative shrink-0">
                    <Avatar name={other?.name ?? 'User'} alt={other?.name ?? 'User'} size="md" />
                    {needsAction &&
                  <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-amber-500 ring-2 ring-white" aria-label="Needs your response" />
                  }
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="truncate text-sm font-semibold">{other?.name}</p>
                      <StatusBadge status={t.status} />
                    </div>
                    <p className="truncate text-sm text-ink">{listing?.title}</p>
                    <p className="mt-0.5 truncate text-xs text-ink-muted">
                      {formatDate(t.date, 'EEE d MMM')} · {t.mode === 'day' ? 'Full day' : `${t.start}–${t.end}`} · {t.seats}{' '}
                      {t.seats === 1 ? 'seat' : 'seats'}
                    </p>
                    {last && <p className="mt-1 truncate text-xs text-ink-subtle">“{last.text}”</p>}
                  </div>
                </Link>
              </li>);

        })}
        </ul>
      }
    </div>);

}