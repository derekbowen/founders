import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2Icon } from 'lucide-react';
import { Avatar } from '../Avatar';
import { StatusBadge } from '../common/StatusBadge';
import { ChatThread } from './ChatThread';
import { AccessCodeCard } from './AccessCodeCard';
import { TransactionTimeline } from './TransactionTimeline';
import { PriceBreakdown } from '../listing/PriceBreakdown';
import { useTransactions } from '../../contexts/TransactionsContext';
import { getListing, getUser } from '../../utils/lookup';
import { getQuote } from '../../utils/pricing';
import { formatDateTime } from '../../utils/format';
import { buttonClass } from '../../utils/styles';
import type { Transaction } from '../../types/transaction';

interface TransactionDetailProps {
  tx: Transaction;
  currentUserId: string;
  justBooked?: boolean;
}

export function TransactionDetail({ tx, currentUserId, justBooked }: TransactionDetailProps) {
  const { sendMessage, transition } = useTransactions();
  const role = tx.customerId === currentUserId ? 'customer' : 'provider';
  const listing = getListing(tx.listingId);
  const other = getUser(role === 'customer' ? tx.providerId : tx.customerId);
  if (!listing || !other) return null;
  const quote = getQuote(listing, tx.arrive, tx.leave, tx.unit);

  const actions = getActions(tx, role);

  return (
    <div className="space-y-5">
      {justBooked &&
      <div role="status" className="flex items-start gap-3 rounded-2xl bg-success/10 p-4 text-sm text-success">
          <CheckCircle2Icon size={18} className="mt-0.5 shrink-0" aria-hidden />
          <div>
            <p className="font-semibold">{tx.status === 'Confirmed' ? 'You’re booked!' : 'Request sent!'}</p>
            <p className="text-ink/80">
              {tx.status === 'Confirmed' ?
            'Your spot is confirmed. Reveal the access code below when you’re on your way.' :
            `${other.name.split(' ')[0]} usually responds ${other.responseTime}. We’ll notify you as soon as they confirm.`}
            </p>
          </div>
        </div>
      }

      <header className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-5 sm:flex-row sm:items-center">
        <img src={listing.photos[0]} alt="" className="h-16 w-20 shrink-0 rounded-xl object-cover" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={tx.status} />
            <span className="text-xs text-muted">#{tx.id.toUpperCase()}</span>
          </div>
          <Link to={`/l/${listing.id}`} className="mt-1 block truncate text-lg font-bold hover:underline">
            {listing.title}
          </Link>
          <p className="flex items-center gap-2 text-sm text-muted">
            <Avatar name={other.name} alt={other.name} src={other.avatar} size="xs" />
            {role === 'customer' ? 'Hosted by' : 'Booked by'}{' '}
            <Link to={`/u/${other.id}`} className="font-medium text-ink hover:underline">
              {other.name}
            </Link>
          </p>
        </div>
        {actions.length > 0 &&
        <div className="flex flex-wrap gap-2">
            {actions.map((a) =>
          <button key={a.label} type="button" onClick={() => transition(tx.id, a.to, a.event)} className={buttonClass(a.variant, 'sm')}>
                {a.label}
              </button>
          )}
          </div>
        }
      </header>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="order-2 xl:order-1">
          <ChatThread
            messages={tx.messages}
            currentUserId={currentUserId}
            otherName={other.name.split(' ')[0]}
            onSend={(text) => sendMessage(tx.id, currentUserId, text)}
            disabled={tx.status === 'Cancelled'} />
          
        </div>
        <div className="order-1 space-y-5 xl:order-2">
          <AccessCodeCard listing={listing} status={tx.status} role={role} />

          <section className="rounded-2xl border border-line bg-surface p-5" aria-labelledby="res-details">
            <h3 id="res-details" className="text-sm font-semibold">Reservation</h3>
            <dl className="mt-3 space-y-2 text-sm">
              <Row label="Arrive" value={formatDateTime(tx.arrive)} />
              <Row label="Leave" value={formatDateTime(tx.leave)} />
              <Row label="Vehicle" value={tx.vehicle} />
              <Row label="Plate" value={tx.plate} mono />
            </dl>
            <div className="mt-4 border-t border-line pt-4">
              <PriceBreakdown quote={quote} perspective={role === 'customer' ? 'driver' : 'host'} />
            </div>
          </section>

          <section className="rounded-2xl border border-line bg-surface p-5" aria-labelledby="timeline">
            <h3 id="timeline" className="mb-4 text-sm font-semibold">Timeline</h3>
            <TransactionTimeline events={tx.timeline} />
          </section>
        </div>
      </div>
    </div>);

}

function Row({ label, value, mono }: {label: string;value: string;mono?: boolean;}) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-muted">{label}</dt>
      <dd className={`text-right font-medium ${mono ? 'font-mono tracking-wider' : ''}`}>{value}</dd>
    </div>);

}

type Action = {
  label: string;
  to: Transaction['status'];
  event: string;
  variant: 'primary' | 'accent' | 'secondary' | 'danger';
};

function getActions(tx: Transaction, role: 'customer' | 'provider'): Action[] {
  if (role === 'provider') {
    if (tx.status === 'Requested')
    return [
    { label: 'Decline', to: 'Cancelled', event: 'Declined by host', variant: 'danger' },
    { label: 'Accept', to: 'Confirmed', event: 'Confirmed by host', variant: 'accent' }];

    return [];
  }
  switch (tx.status) {
    case 'Requested':
      return [{ label: 'Cancel request', to: 'Cancelled', event: 'Request withdrawn by driver', variant: 'danger' }];
    case 'Confirmed':
      return [
      { label: 'Cancel', to: 'Cancelled', event: 'Cancelled by driver · full refund', variant: 'danger' },
      { label: 'I’ve arrived', to: 'Active', event: 'Parking started', variant: 'primary' }];

    case 'Active':
      return [{ label: 'End parking', to: 'Completed', event: 'Parking completed', variant: 'primary' }];
    default:
      return [];
  }
}