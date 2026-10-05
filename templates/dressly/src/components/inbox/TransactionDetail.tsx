import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, PackageIcon, StoreIcon } from 'lucide-react';
import { brand } from '../../data/brand';
import type { Transaction, TxStatus } from '../../types/marketplace';
import { formatMoney, fromToday, shortDate } from '../../utils/format';
import { getBreakdown, rentalWindow } from '../../utils/pricing';
import { getListing, getUser } from '../../utils/lookup';
import { btn } from '../../utils/styles';
import { StatusBadge } from '../StatusBadge';
import { UserAvatar } from '../UserAvatar';
import { ChatThread } from './ChatThread';
import { ReturnLabel } from './ReturnLabel';
import { TransactionTimeline } from './TransactionTimeline';

interface TransactionDetailProps {
  tx: Transaction;
  onStatus: (s: TxStatus) => void;
  onSend: (text: string) => void;
  onBack: () => void;
}

interface Action {
  label: string;
  next: TxStatus;
  variant: 'primary' | 'outline';
}

function actionsFor(tx: Transaction): {hint: string;actions: Action[];} {
  const isLender = tx.role === 'lender';
  switch (tx.status) {
    case 'requested':
      return isLender ?
      {
        hint: 'Respond within 24 hours or the request expires.',
        actions: [
        { label: 'Accept request', next: 'confirmed', variant: 'primary' },
        { label: 'Decline', next: 'declined', variant: 'outline' }]

      } :
      { hint: 'Waiting for the lender to confirm.', actions: [{ label: 'Cancel request', next: 'declined', variant: 'outline' }] };
    case 'confirmed':
      return isLender ?
      {
        hint: tx.delivery === 'ship' ? 'Ship 2–3 days before the start date.' : 'Hand over on the start date.',
        actions: [{ label: tx.delivery === 'ship' ? 'Mark as shipped' : 'Mark as picked up', next: 'shipped', variant: 'primary' }]
      } :
      { hint: 'Confirmed! The lender will ship it soon.', actions: [] };
    case 'shipped':
      return isLender ?
      { hint: 'On its way to your renter.', actions: [] } :
      { hint: 'Enjoy your event — mark it worn afterwards.', actions: [{ label: 'Mark as worn', next: 'worn', variant: 'primary' }] };
    case 'worn':
      return isLender ?
      { hint: 'Waiting for the renter to send it back.', actions: [] } :
      { hint: 'Send it back with the prepaid label — no cleaning needed.', actions: [{ label: 'I’ve sent it back', next: 'returned', variant: 'primary' }] };
    case 'returned':
      return isLender ?
      { hint: 'Inspect the dress, then complete to release your payout.', actions: [{ label: 'Confirm & complete', next: 'completed', variant: 'primary' }] } :
      { hint: 'Return in transit. We’ll let you know when it arrives.', actions: [] };
    default:
      return { hint: '', actions: [] };
  }
}

export function TransactionDetail({ tx, onStatus, onSend, onBack }: TransactionDetailProps) {
  const listing = getListing(tx.listingId);
  const other = getUser(tx.counterpartyId);
  if (!listing || !other) return null;
  const event = fromToday(tx.startOffset + 1);
  const { start, end } = rentalWindow(event, tx.days);
  const breakdown = getBreakdown(listing, tx.days, tx.delivery);
  const { hint, actions } = actionsFor(tx);
  const showLabel = tx.role === 'renter' && tx.delivery === 'ship' && ['shipped', 'worn'].includes(tx.status);

  return (
    <div>
      <button type="button" onClick={onBack} className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink lg:hidden">
        <ArrowLeftIcon size={14} aria-hidden="true" /> All conversations
      </button>

      <div className="flex flex-col gap-5 border-b border-line pb-6 sm:flex-row sm:items-start">
        <img src={listing.image} alt="" className="h-28 w-20 shrink-0 object-cover" />
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <StatusBadge status={tx.status} />
            <span className="text-xs text-muted">#{tx.id.toUpperCase()}</span>
          </div>
          <Link to={`/l/${listing.id}`} className="mt-2 block font-display text-2xl leading-tight hover:underline">
            {listing.designer} — {listing.title}
          </Link>
          <p className="mt-1 text-sm text-muted">
            {shortDate(start)} – {shortDate(end)} · {tx.days}-day rental ·{' '}
            {tx.delivery === 'ship' ?
            <span className="inline-flex items-center gap-1"><PackageIcon size={12} aria-hidden="true" /> Shipping</span> :

            <span className="inline-flex items-center gap-1"><StoreIcon size={12} aria-hidden="true" /> Pickup</span>
            }
          </p>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-xs text-muted">{tx.role === 'lender' ? 'Your payout' : 'Total'}</p>
          <p className="font-display text-2xl">
            {formatMoney(
              tx.role === 'lender' ?
              Math.round(breakdown.rental * (1 - brand.fees.lenderCommissionRate)) :
              breakdown.total
            )}
          </p>
        </div>
      </div>

      {(hint || actions.length > 0) &&
      <div className="mt-6 flex flex-col gap-3 bg-cream p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-ink">{hint}</p>
          <div className="flex gap-2">
            {actions.map((a) =>
          <button key={a.label} type="button" onClick={() => onStatus(a.next)} className={btn(a.variant, 'sm')}>
                {a.label}
              </button>
          )}
          </div>
        </div>
      }

      <div className="mt-8 grid gap-10 xl:grid-cols-[1fr_260px]">
        <section aria-labelledby="chat-heading">
          <div className="mb-4 flex items-center gap-3">
            <UserAvatar user={other} size="md" />
            <div>
              <h2 id="chat-heading" className="text-sm font-medium">
                {other.name}
              </h2>
              <Link to={`/closet/${other.id}`} className="text-xs text-muted hover:text-ink">
                {tx.role === 'renter' ? 'Lender' : 'Renter'} · {other.city}
              </Link>
            </div>
          </div>
          <ChatThread messages={tx.messages} counterparty={other} onSend={onSend} />
        </section>
        <aside className="space-y-8">
          <div>
            <h2 className="mb-4 text-[11px] font-semibold uppercase tracking-eyebrow text-muted">Timeline</h2>
            <TransactionTimeline tx={tx} />
          </div>
          {showLabel && <ReturnLabel txId={tx.id} />}
        </aside>
      </div>
    </div>);

}