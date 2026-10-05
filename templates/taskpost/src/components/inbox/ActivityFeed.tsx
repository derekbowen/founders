import React, { useEffect, useRef } from 'react';
import { CheckCircle2Icon, CreditCardIcon, StarIcon, WrenchIcon, XCircleIcon } from 'lucide-react';
import { OfferCard } from './OfferCard';
import { useApp } from '../../hooks/useApp';
import type { Message, Offer, Transaction, TransactionEvent } from '../../types/marketplace';
import { formatTimestamp } from '../../utils/format';
import { cn } from '../../utils/styles';
import { viewerRole, whoseTurn } from '../../utils/transactions';

type FeedItem =
{kind: 'offer';at: string;offer: Offer;index: number;} |
{kind: 'message';at: string;message: Message;} |
{kind: 'event';at: string;event: TransactionEvent;};

const eventIcons = {
  accepted: CheckCircle2Icon,
  declined: XCircleIcon,
  paid: CreditCardIcon,
  marked_done: WrenchIcon,
  completed: CheckCircle2Icon,
  reviewed: StarIcon
} as const;

export function ActivityFeed({ tx }: {tx: Transaction;}) {
  const { user, getUser } = useApp();
  const endRef = useRef<HTMLDivElement>(null);
  const role = viewerRole(tx, user?.id ?? '');
  const canRespond = whoseTurn(tx) === role;

  const items: FeedItem[] = [
  ...tx.offers.map((offer, index) => ({ kind: 'offer' as const, at: offer.createdAt, offer, index })),
  ...tx.messages.map((message) => ({ kind: 'message' as const, at: message.createdAt, message })),
  ...tx.events.
  filter((e) => e.type !== 'offer' && e.type !== 'counter').
  map((event) => ({ kind: 'event' as const, at: event.createdAt, event }))].
  sort((a, b) => a.at.localeCompare(b.at));

  useEffect(() => {
    const el = endRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [items.length, tx.id]);

  const customerName = getUser(tx.customerId)?.name.split(' ')[0] ?? 'Customer';
  const proName = getUser(tx.proId)?.name.split(' ')[0] ?? 'Pro';

  return (
    <div
      ref={endRef}
      className="max-h-[62vh] min-h-[280px] space-y-4 overflow-y-auto px-1 py-2 lg:max-h-[calc(100vh-22rem)]"
      aria-live="polite">
      
      {items.map((item) => {
        if (item.kind === 'offer') {
          const authorRole = item.offer.by;
          return (
            <OfferCard
              key={item.offer.id}
              tx={tx}
              offer={item.offer}
              isFirst={item.index === 0}
              isMine={authorRole === role}
              authorName={authorRole === 'pro' ? proName : customerName}
              canRespond={canRespond}
              viewerRole={role} />);


        }
        if (item.kind === 'event') {
          const type = item.event.type as keyof typeof eventIcons;
          const Icon = eventIcons[type] ?? CheckCircle2Icon;
          return (
            <div key={item.event.id} className="flex items-center gap-3 py-1">
              <span className="h-px flex-1 bg-ink-200" aria-hidden="true" />
              <span
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold',
                  type === 'declined' ? 'bg-ink-100 text-ink-600' : 'bg-emerald-50 text-emerald-800'
                )}>
                
                <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                {item.event.label}
              </span>
              <span className="h-px flex-1 bg-ink-200" aria-hidden="true" />
            </div>);

        }
        const mine = item.message.senderId === user?.id;
        const sender = getUser(item.message.senderId);
        return (
          <div key={item.message.id} className={cn('flex', mine ? 'justify-end' : 'justify-start')}>
            <div className="max-w-[80%]">
              <div
                className={cn(
                  'rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
                  mine ? 'rounded-br-md bg-ink-900 text-white' : 'rounded-bl-md border border-ink-200 bg-white text-ink-800'
                )}>
                
                {item.message.text}
              </div>
              <p className={cn('mt-1 text-xs text-ink-500', mine && 'text-right')}>
                {mine ? 'You' : sender?.name.split(' ')[0]} · {formatTimestamp(item.message.createdAt)}
              </p>
            </div>
          </div>);

      })}
    </div>);

}