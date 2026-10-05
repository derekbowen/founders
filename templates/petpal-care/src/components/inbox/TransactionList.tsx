import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from '../Avatar';
import { StatusBadge } from '../common/StatusBadge';
import { getListingById, getServiceMeta } from '../../utils/listing';
import { formatDateRange } from '../../utils/format';
import type { Transaction } from '../../types/transaction';

interface TransactionListProps {
  items: Transaction[];
  tab: string;
  activeId?: string;
}

export function TransactionList({ items, tab, activeId }: TransactionListProps) {
  return (
    <ul className="divide-y divide-ink-100">
      {items.map((t) => {
        const listing = getListingById(t.listingId);
        const last = t.messages[t.messages.length - 1];
        const active = t.id === activeId;
        return (
          <li key={t.id}>
            <Link
              to={`/inbox/${tab}/${t.id}`}
              aria-current={active ? 'page' : undefined}
              className={`flex gap-3 px-4 py-4 transition focus-visible:bg-ink-100 focus-visible:outline-none ${active ? 'bg-primary-50' : 'hover:bg-ink-50'}`}>
              
              <Avatar name={t.counterpartName} alt={t.counterpartName} size="md" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate font-extrabold text-ink-900">{t.counterpartName}</p>
                  <StatusBadge status={t.status} />
                </div>
                <p className="truncate text-sm font-semibold text-ink-700">
                  {getServiceMeta(t.serviceId)?.name} · {t.petNames.join(' & ')}
                </p>
                <p className="text-xs text-ink-600">
                  {formatDateRange(t.start, t.end)}
                  {t.role === 'customer' && listing ? ` · ${listing.neighborhood}` : ''}
                </p>
                {last && <p className="mt-1 truncate text-sm text-ink-600">{last.from === 'me' ? 'You: ' : ''}{last.text}</p>}
              </div>
            </Link>
          </li>);

      })}
    </ul>);

}