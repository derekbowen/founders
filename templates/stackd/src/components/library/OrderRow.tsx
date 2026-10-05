import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon, MessageCircleIcon } from 'lucide-react';
import type { Order } from '../../types/marketplace';
import { useStore } from '../../contexts/StoreContext';
import { StatusPill } from '../common/StatusPill';
import { formatDate, formatMoneyExact } from '../../utils/format';

export function OrderRow({ order }: {order: Order;}) {
  const { getListing } = useStore();
  const listing = getListing(order.listingSlug);
  if (!listing) return null;
  const last = order.messages[order.messages.length - 1];

  return (
    <li>
      <Link
        to={`/inbox/${order.id}`}
        className="group flex items-center gap-4 rounded-xl border border-ink/15 bg-white p-3 transition hover:border-ink hover:shadow-pop-sm sm:p-4">
        
        <img src={listing.cover} alt="" className="h-16 w-16 shrink-0 rounded-lg border border-ink/20 object-cover sm:h-20 sm:w-24" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="truncate font-display font-semibold">{listing.title}</p>
          </div>
          <p className="mt-0.5 text-sm text-muted">
            {order.role === 'buyer' ? `by ${order.counterpartyName}` : `Bought by ${order.counterpartyName}`} · {formatDate(order.createdAt)}
          </p>
          {last &&
          <p className="mt-1 hidden items-center gap-1.5 truncate text-xs text-muted sm:flex">
              <MessageCircleIcon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span className="truncate">
                {last.from === 'me' ? 'You: ' : ''}
                {last.text}
              </span>
            </p>
          }
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1.5">
          <StatusPill status={order.status} />
          <span className="font-display text-sm font-bold">{order.amount === 0 ? 'Free' : formatMoneyExact(order.amount)}</span>
        </div>
        <ChevronRightIcon className="hidden h-5 w-5 text-muted transition group-hover:translate-x-0.5 group-hover:text-ink sm:block" aria-hidden="true" />
      </Link>
    </li>);

}