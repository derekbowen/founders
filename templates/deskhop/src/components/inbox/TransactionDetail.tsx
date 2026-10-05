import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarIcon, ClockIcon, ReceiptIcon, UsersIcon } from 'lucide-react';
import { useTransactions } from '../../contexts/TransactionsContext';
import type { Transaction } from '../../types/transaction';
import { formatMoney } from '../../utils/format';
import { getListing, getSpaceType, getUser } from '../../utils/lookup';
import { getQuote } from '../../utils/pricing';
import { formatDate } from '../../utils/time';
import { ChatPanel } from './ChatPanel';
import { DoorAccessCard } from './DoorAccessCard';
import { StatusBadge } from './StatusBadge';
import { TransactionActions } from './TransactionActions';
import { TransactionTimeline } from './TransactionTimeline';

interface TransactionDetailProps {
  tx: Transaction;
  currentUserId: string;
}

export function TransactionDetail({ tx, currentUserId }: TransactionDetailProps) {
  const { updateStatus, sendMessage } = useTransactions();
  const listing = getListing(tx.listingId);
  if (!listing) return null;

  const viewer = tx.providerId === currentUserId ? 'provider' : 'customer';
  const other = getUser(viewer === 'provider' ? tx.customerId : tx.providerId);
  const type = getSpaceType(listing.spaceType);
  const quote = getQuote(listing, tx);
  const payout = viewer === 'provider' ? quote.subtotal * 0.9 : quote.total;

  const headline: Record<Transaction['status'], string> = {
    requested:
    viewer === 'provider' ?
    `${other?.firstName} wants to book ${tx.seats} ${tx.seats === 1 ? type.unit.one : type.unit.many}` :
    `Waiting for ${other?.firstName} to confirm`,
    confirmed: viewer === 'provider' ? 'Booking confirmed' : 'You’re all set!',
    'checked-in': viewer === 'provider' ? `${other?.firstName} is checked in` : 'You’re checked in — enjoy your day',
    completed: 'Booking completed',
    cancelled: 'Booking cancelled'
  };

  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-2xl border border-line bg-white">
        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:p-6">
          <img src={listing.images[0]} alt="" className="h-20 w-full rounded-xl object-cover sm:w-28" />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge status={tx.status} />
              <span className="text-xs text-ink-subtle">#{tx.id.replace('tx-', '')}</span>
            </div>
            <h2 className="mt-1.5 font-sans text-lg font-semibold">{headline[tx.status]}</h2>
            <Link to={`/l/${listing.id}`} className="link text-sm">
              {listing.title}
            </Link>
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-px border-t border-line bg-line sm:grid-cols-4">
          {[
          { icon: CalendarIcon, label: 'Date', value: formatDate(tx.date, 'EEE d MMM') },
          { icon: ClockIcon, label: 'Time', value: tx.mode === 'day' ? 'Full day' : `${tx.start} – ${tx.end}` },
          {
            icon: UsersIcon,
            label: type.unit.many.charAt(0).toUpperCase() + type.unit.many.slice(1),
            value: String(tx.seats)
          },
          { icon: ReceiptIcon, label: viewer === 'provider' ? 'Your payout' : 'Total paid', value: formatMoney(payout) }].
          map((d) =>
          <div key={d.label} className="bg-white px-5 py-3.5">
              <dt className="flex items-center gap-1.5 text-xs text-ink-muted">
                <d.icon size={13} aria-hidden="true" /> {d.label}
              </dt>
              <dd className="mt-0.5 text-sm font-semibold">{d.value}</dd>
            </div>
          )}
        </dl>

        {!(viewer === 'provider' && (tx.status === 'completed' || tx.status === 'cancelled')) ?
        <div className="border-t border-line p-5 sm:px-6">
            <TransactionActions tx={tx} viewer={viewer} onStatus={(s) => updateStatus(tx.id, s)} />
            {tx.companyName &&
          <p className="mt-3 text-xs text-ink-muted">Invoice to {tx.companyName}</p>
          }
          </div> :
        null}
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_260px]">
        <div className="space-y-6">
          <DoorAccessCard tx={tx} listing={listing} viewer={viewer} />
          <ChatPanel
            messages={tx.messages}
            currentUserId={currentUserId}
            otherName={other?.firstName ?? 'them'}
            onSend={(text) => sendMessage(tx.id, currentUserId, text)}
            disabled={tx.status === 'cancelled'} />
          
        </div>
        <section aria-labelledby="timeline-heading" className="h-fit rounded-2xl border border-line bg-white p-5">
          <h3 id="timeline-heading" className="mb-4 font-sans text-sm font-semibold">Booking timeline</h3>
          <TransactionTimeline tx={tx} />
        </section>
      </div>
    </div>);

}