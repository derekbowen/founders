import React from 'react';
import { NavLink } from 'react-router-dom';
import type { Transaction } from '../../types/marketplace';
import { formatDate, formatTimeRange } from '../../utils/format';
import { getListing } from '../../utils/listings';
import { cn } from '../../utils/styles';
import { StatusBadge } from './StatusBadge';

export function TransactionList({ items }: {items: Transaction[];}) {
  return (
    <ul className="divide-y divide-steel-100">
      {items.map((t) => {
        const listing = getListing(t.listingId);
        const last = t.messages[t.messages.length - 1];
        return (
          <li key={t.id}>
            <NavLink
              to={`/inbox/${t.id}`}
              className={({ isActive }) =>
              cn(
                'flex gap-3 border-l-4 px-4 py-4 transition-colors focus-visible:bg-steel-50 focus-visible:outline-none',
                isActive ? 'border-primary bg-steel-50' : 'border-transparent hover:bg-steel-50'
              )
              }>
              
              <img src={listing?.images[0]} alt="" className="h-14 w-14 shrink-0 rounded-lg object-cover" />
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="truncate text-sm font-semibold text-steel-900">{t.counterpartName}</p>
                  <StatusBadge status={t.status} />
                </div>
                <p className="truncate text-xs text-steel-500">{listing?.title}</p>
                <p className="mt-0.5 text-xs font-medium text-steel-700">
                  {formatDate(t.date, 'MMM d')} · {formatTimeRange(t.startHour, t.hours)}
                </p>
                {last &&
                <p className="mt-1 truncate text-xs text-steel-500">
                    {last.from === 'me' ? 'You: ' : ''}
                    {last.text}
                  </p>
                }
              </div>
            </NavLink>
          </li>);

      })}
    </ul>);

}