import React from 'react';
import { Link } from 'react-router-dom';
import { InboxIcon } from 'lucide-react';
import { Avatar } from '../Avatar';
import { EmptyState } from '../EmptyState';
import { StatusPill } from '../StatusPill';
import type { Transaction } from '../../types/transaction';
import { formatRange, formatShortTimestamp } from '../../utils/dates';
import { getListing, getUser } from '../../utils/lookup';

interface ConversationListProps {
  items: Transaction[];
  activeId?: string;
  tab: 'trips' | 'hosting';
}

export function ConversationList({ items, activeId, tab }: ConversationListProps) {
  if (items.length === 0) {
    return (
      <div className="p-4">
        <EmptyState
          icon={InboxIcon}
          title={tab === 'trips' ? 'No trips yet' : 'No hosting requests yet'}
          description={tab === 'trips' ? 'When you book a site, your trip and host chat will appear here.' : 'Requests from campers for your land will show up here.'}
          action={
          <Link to={tab === 'trips' ? '/s' : '/l/new'} className="btn-primary">
              {tab === 'trips' ? 'Find a site' : 'List your land'}
            </Link>
          } />
        
      </div>);

  }
  return (
    <ul className="divide-y divide-sand-200">
      {items.map((t) => {
        const listing = getListing(t.listingId);
        const other = getUser(t.otherUserId);
        const last = t.messages[t.messages.length - 1];
        const active = t.id === activeId;
        return (
          <li key={t.id}>
            <Link
              to={`/inbox/${t.id}?tab=${tab}`}
              aria-current={active ? 'page' : undefined}
              className={`flex gap-3 px-4 py-4 transition-colors ${active ? 'bg-primary-50' : 'hover:bg-sand-100'}`}>
              
              <Avatar name={other.name} alt={other.name} size="md" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-semibold text-ink-900">{other.name}</p>
                  <span className="shrink-0 text-xs text-ink-500">{formatShortTimestamp(t.updatedAt)}</span>
                </div>
                <p className="truncate text-xs text-ink-600">
                  {listing?.title} · {formatRange(t.start, t.end)}
                </p>
                {last && <p className="mt-1 truncate text-sm text-ink-500">{last.fromMe ? 'You: ' : ''}{last.text}</p>}
                <div className="mt-2">
                  <StatusPill status={t.status} />
                </div>
              </div>
            </Link>
          </li>);

      })}
    </ul>);

}