import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { SendIcon, CheckIcon, XIcon, CalendarIcon, ClockIcon, UsersIcon, ShipWheelIcon, ReceiptIcon, MapPinIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';
import { StatusBadge } from '../ui/StatusBadge';
import { useMarketplace } from '../../contexts/MarketplaceContext';
import { getTimeline, statusMeta } from '../../utils/transactions';
import { formatDate, formatDateTime } from '../../utils/format';
import { formatMoney, getPackage, getPriceBreakdown } from '../../utils/pricing';
import { cn, inputClass } from '../../utils/ui';
import type { Transaction, TxStatus } from '../../types/marketplace';

export function TransactionDetail({ tx, tab }: {tx: Transaction;tab: 'trips' | 'listings';}) {
  const { getListing, getUser, currentUser, updateStatus, sendMessage, toggleChecklist } = useMarketplace();
  const [draft, setDraft] = useState('');
  const endRef = useRef<HTMLDivElement>(null);
  const listing = getListing(tx.listingId);
  const other = getUser(tab === 'trips' ? tx.providerId : tx.customerId);
  const isProvider = tab === 'listings';

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'nearest' });
  }, [tx.messages.length]);

  if (!listing) return null;
  const price = getPriceBreakdown(listing, tx.pkg, tx.withCaptain);
  const timeline = getTimeline(tx);
  const doneCount = tx.checklist.filter((c) => c.done).length;
  const showChecklist = tx.status !== 'cancelled';

  const act = (status: TxStatus, msg: string) => {
    updateStatus(tx.id, status);
    toast.success(msg);
  };

  const actions: React.ReactNode[] = [];
  if (tx.status === 'requested' && isProvider) {
    actions.push(
      <Button key="decline" variant="danger" size="sm" onClick={() => act('cancelled', 'Request declined')}>
        <XIcon className="h-4 w-4" aria-hidden="true" /> Decline
      </Button>,
      <Button key="accept" size="sm" onClick={() => act('confirmed', 'Booking accepted — the renter has been charged')}>
        <CheckIcon className="h-4 w-4" aria-hidden="true" /> Accept request
      </Button>
    );
  }
  if (tx.status === 'requested' && !isProvider) actions.push(<Button key="c" variant="danger" size="sm" onClick={() => act('cancelled', 'Request withdrawn')}>Withdraw request</Button>);
  if (tx.status === 'confirmed' && isProvider) actions.push(<Button key="d" size="sm" onClick={() => act('on-the-water', 'Trip started — have a great day!')}>Mark as departed</Button>);
  if (tx.status === 'confirmed' && !isProvider) actions.push(<Button key="c" variant="danger" size="sm" onClick={() => act('cancelled', 'Booking cancelled')}>Cancel booking</Button>);
  if (tx.status === 'on-the-water' && isProvider) actions.push(<Button key="f" size="sm" onClick={() => act('completed', 'Trip completed — deposit will be released')}>Mark trip complete</Button>);
  if (tx.status === 'completed' && !isProvider) actions.push(<Button key="r" variant="accent" size="sm" onClick={() => toast.success('Thanks! Your review has been submitted.')}>Leave a review</Button>);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) return;
    sendMessage(tx.id, draft.trim());
    setDraft('');
  };

  return (
    <div className="flex h-full flex-col">
      <header className="border-b border-line p-5 sm:p-6">
        <div className="flex flex-wrap items-start gap-4">
          <img src={listing.images[0]} alt="" className="h-16 w-20 rounded-xl object-cover" />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge status={tx.status} />
              <span className="text-xs text-muted">#{tx.id.toUpperCase()}</span>
            </div>
            <h2 className="mt-1.5 font-heading text-xl text-navy">
              <Link to={`/l/${listing.id}`} className="hover:underline">
                {listing.title}
              </Link>
            </h2>
            <p className="text-sm text-muted">
              {isProvider ? 'Requested by' : 'Hosted by'}{' '}
              <Link to={`/u/${other?.id}`} className="font-medium text-ink hover:underline">
                {other?.name}
              </Link>
            </p>
          </div>
          {actions.length > 0 && <div className="flex w-full flex-wrap gap-2 sm:w-auto">{actions}</div>}
        </div>
        <p className="mt-4 rounded-xl bg-sand-light px-4 py-2.5 text-sm text-ink/85">{statusMeta[tx.status].description}</p>
      </header>

      <div className="grid flex-1 lg:grid-cols-[1fr_320px]">
        <section className="flex min-h-[420px] flex-col border-line lg:border-r" aria-label="Messages">
          <ol className="flex-1 space-y-4 overflow-y-auto p-5 sm:p-6">
            {tx.messages.length === 0 && <li className="py-10 text-center text-sm text-muted">No messages yet. Say hello and share your plans for the day.</li>}
            {tx.messages.map((m) => {
              const mine = m.senderId === currentUser.id;
              const sender = getUser(m.senderId);
              return (
                <li key={m.id} className={cn('flex items-end gap-2.5', mine && 'flex-row-reverse')}>
                  <Avatar initials={sender?.initials ?? '?'} seed={m.senderId} size="xs" />
                  <div className={cn('max-w-[80%]', mine && 'text-right')}>
                    <p className={cn('inline-block rounded-2xl px-4 py-2.5 text-left text-sm leading-relaxed', mine ? 'rounded-br-md bg-navy text-white' : 'rounded-bl-md bg-sand-light text-ink')}>{m.text}</p>
                    <p className="mt-1 text-[11px] text-muted">{formatDateTime(m.sentAt)}</p>
                  </div>
                </li>);

            })}
            <div ref={endRef} />
          </ol>
          <form onSubmit={send} className="flex gap-2 border-t border-line p-4">
            <label htmlFor="chat-input" className="sr-only">
              Message {other?.name}
            </label>
            <input id="chat-input" value={draft} onChange={(e) => setDraft(e.target.value)} placeholder={`Message ${other?.name.split(' ')[0] ?? ''}…`} className={inputClass + ' rounded-full'} />
            <Button type="submit" size="md" disabled={!draft.trim()} aria-label="Send message" className="px-4">
              <SendIcon className="h-4 w-4" />
            </Button>
          </form>
        </section>

        <aside className="space-y-8 border-t border-line p-5 sm:p-6 lg:border-t-0" aria-label="Trip details">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Trip details</h3>
            <ul className="mt-3 space-y-2.5 text-sm text-ink">
              <li className="flex gap-2.5"><CalendarIcon className="h-4 w-4 shrink-0 text-coral-dark" aria-hidden="true" />{formatDate(tx.tripDate)}</li>
              <li className="flex gap-2.5"><ClockIcon className="h-4 w-4 shrink-0 text-coral-dark" aria-hidden="true" />{getPackage(tx.pkg).label} · {tx.departure}</li>
              <li className="flex gap-2.5"><UsersIcon className="h-4 w-4 shrink-0 text-coral-dark" aria-hidden="true" />{tx.guests} guests</li>
              <li className="flex gap-2.5"><ShipWheelIcon className="h-4 w-4 shrink-0 text-coral-dark" aria-hidden="true" />{tx.withCaptain ? 'Captained' : 'Bareboat'}</li>
              <li className="flex gap-2.5"><MapPinIcon className="h-4 w-4 shrink-0 text-coral-dark" aria-hidden="true" />{listing.marina.name}</li>
              <li className="flex gap-2.5"><ReceiptIcon className="h-4 w-4 shrink-0 text-coral-dark" aria-hidden="true" />{isProvider ? `You earn ${formatMoney(price.subtotal)}` : `Total ${formatMoney(price.total)}`}</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Timeline</h3>
            <ol className="mt-4">
              {timeline.map((s, i) =>
              <li key={s.status} className="relative flex gap-3 pb-5 last:pb-0">
                  {i < timeline.length - 1 && <span className={cn('absolute left-[9px] top-5 h-full w-px', s.state === 'done' ? 'bg-navy' : 'bg-line')} aria-hidden="true" />}
                  <span
                  className={cn(
                    'relative mt-0.5 flex h-[19px] w-[19px] shrink-0 items-center justify-center rounded-full border-2',
                    s.state === 'done' && 'border-navy bg-navy text-white',
                    s.state === 'current' && 'border-coral-dark bg-white',
                    s.state === 'upcoming' && 'border-line bg-white',
                    s.state === 'cancelled' && 'border-danger bg-danger text-white'
                  )}
                  aria-hidden="true">
                  
                    {s.state === 'done' && <CheckIcon className="h-3 w-3" />}
                    {s.state === 'cancelled' && <XIcon className="h-3 w-3" />}
                    {s.state === 'current' && <span className="h-2 w-2 rounded-full bg-coral-dark" />}
                  </span>
                  <div>
                    <p className={cn('text-sm', s.state === 'upcoming' ? 'text-muted' : 'font-medium text-ink')}>{s.label}</p>
                    {s.at && <p className="text-xs text-muted">{formatDateTime(s.at)}</p>}
                  </div>
                </li>
              )}
            </ol>
          </div>

          {showChecklist &&
          <div>
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Pre-departure checklist</h3>
                <span className="text-xs font-semibold text-navy">
                  {doneCount}/{tx.checklist.length}
                </span>
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-line" role="progressbar" aria-valuemin={0} aria-valuemax={tx.checklist.length} aria-valuenow={doneCount} aria-label="Checklist progress">
                <div className="h-full rounded-full bg-success transition-all" style={{ width: `${doneCount / tx.checklist.length * 100}%` }} />
              </div>
              <ul className="mt-4 space-y-2">
                {tx.checklist.map((c) =>
              <li key={c.id}>
                    <label className="flex cursor-pointer items-start gap-3 rounded-lg p-1.5 text-sm hover:bg-sand-light">
                      <input type="checkbox" checked={c.done} onChange={() => toggleChecklist(tx.id, c.id)} disabled={isProvider || tx.status === 'completed'} className="mt-0.5 h-4 w-4 accent-navy" />
                      <span className={cn(c.done ? 'text-muted line-through' : 'text-ink')}>{c.label}</span>
                    </label>
                  </li>
              )}
              </ul>
              {isProvider && <p className="mt-2 text-xs text-muted">The renter completes this checklist before departure.</p>}
            </div>
          }
        </aside>
      </div>
    </div>);

}