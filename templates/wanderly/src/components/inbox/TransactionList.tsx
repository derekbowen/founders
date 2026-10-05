import React from 'react';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { StatusBadge } from './StatusBadge';
import type { Transaction } from '../../types/marketplace';
import { getExperience } from '../../utils/lookup';
import { formatDate, formatTime } from '../../utils/format';

interface TransactionListProps {
  items: Transaction[];
  activeId?: string;
  tab: string;
}

export function TransactionList({ items, activeId, tab }: TransactionListProps) {
  return (
    <ul className="divide-y divide-slate-100">
      {items.map((tx) => {
        const exp = getExperience(tx.experienceId);
        const last = tx.messages[tx.messages.length - 1];
        const active = tx.id === activeId;
        return (
          <li key={tx.id}>
            <Link
              to={`/inbox/${tab}/${tx.id}`}
              aria-current={active ? 'page' : undefined}
              className={twMerge(
                'flex gap-3 px-4 py-4 transition-colors hover:bg-sand-100 focus-visible:bg-sand-100 focus-visible:outline-none',
                active && 'bg-primary-50 hover:bg-primary-50'
              )}>
              
              <img src={exp?.image} alt="" className="h-14 w-14 shrink-0 rounded-xl object-cover" />
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="truncate text-sm font-semibold text-slate-900">{tx.counterpartName}</p>
                  <StatusBadge status={tx.status} className="shrink-0" />
                </div>
                <p className="truncate text-sm text-slate-700">{exp?.title}</p>
                <p className="mt-0.5 truncate text-xs text-slate-500">
                  {formatDate(tx.date, 'MMM d')} · {formatTime(tx.time)}
                  {last && ` · ${last.from === 'me' ? 'You: ' : ''}${last.text}`}
                </p>
              </div>
            </Link>
          </li>);

      })}
    </ul>);

}