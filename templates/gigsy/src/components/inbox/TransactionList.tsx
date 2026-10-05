import React from 'react';
import { NavLink } from 'react-router-dom';
import { InboxIcon } from 'lucide-react';
import { Avatar } from '../Avatar';
import { StatusBadge } from '../ui/StatusBadge';
import { EmptyState } from '../ui/EmptyState';
import { ButtonLink } from '../ui/ButtonLink';
import { Transaction, TxRole } from '../../types/marketplace';
import { formatDate } from '../../utils/format';
import { getListing, getUser } from '../../utils/lookup';

interface TransactionListProps {
  transactions: Transaction[];
  role: TxRole;
}

export function TransactionList({ transactions, role }: TransactionListProps) {
  if (transactions.length === 0) {
    return (
      <EmptyState
        className="m-4 border-slate-200"
        icon={<InboxIcon className="h-6 w-6" />}
        title={role === 'client' ? 'No quote requests yet' : 'No client requests yet'}
        text={
        role === 'client' ?
        'Find a freelancer and describe your project to get your first offer.' :
        'Publish a service so clients can send you project briefs.'
        }
        action={
        role === 'client' ? <ButtonLink to="/s" size="sm">Browse services</ButtonLink> : <ButtonLink to="/create-listing" size="sm">Create a listing</ButtonLink>
        } />);


  }

  return (
    <ul className="divide-y divide-slate-100">
      {transactions.map((tx) => {
        const other = getUser(role === 'client' ? tx.freelancerId : tx.clientId);
        const listing = getListing(tx.listingId);
        return (
          <li key={tx.id}>
            <NavLink
              to={`/inbox/${tx.id}`}
              className={({ isActive }) =>
              `relative flex gap-3 px-4 py-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500 ${
              isActive ? 'bg-primary-50' : 'hover:bg-slate-50'}`

              }>
              
              {({ isActive }) =>
              <>
                  {isActive && <span className="absolute inset-y-0 left-0 w-1 bg-primary-600" aria-hidden="true" />}
                  <Avatar name={other?.name ?? 'User'} alt="" src={other?.avatar} size="md" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className={`truncate text-sm ${tx.unread ? 'font-bold text-slate-900' : 'font-semibold text-slate-800'}`}>
                        {other?.name}
                        {other?.company && <span className="font-normal text-slate-500"> · {other.company}</span>}
                      </p>
                      <time dateTime={tx.updatedAt} className="shrink-0 text-xs text-slate-500">{formatDate(tx.updatedAt, 'MMM d')}</time>
                    </div>
                    <p className="mt-0.5 truncate text-sm text-slate-600">{listing?.title}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <StatusBadge status={tx.status} />
                      {tx.unread &&
                    <span className="h-2.5 w-2.5 rounded-full bg-primary-600" aria-label="Unread" />
                    }
                    </div>
                  </div>
                </>
              }
            </NavLink>
          </li>);

      })}
    </ul>);

}