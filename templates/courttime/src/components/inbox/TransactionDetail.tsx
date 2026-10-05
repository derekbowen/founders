import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, CalendarIcon, ClockIcon, UsersIcon } from 'lucide-react';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { useToast } from '../ToastProvider';
import { BookingTimeline } from './BookingTimeline';
import { ChatThread } from './ChatThread';
import { InvitePlayers } from './InvitePlayers';
import { useBookings } from '../../contexts/BookingContext';
import { listings } from '../../data/listings';
import { users } from '../../data/users';
import { Transaction, TransactionStatus } from '../../types/marketplace';
import { dateFromOffset, formatDateLong, formatMoney, formatTimeRange, pluralize } from '../../utils/format';
import { getBookingQuote } from '../../utils/pricing';
import { statusMeta } from '../../utils/transactions';

export function TransactionDetail({ tx, onBack }: {tx: Transaction;onBack: () => void;}) {
  const { updateTransaction } = useBookings();
  const { addToast } = useToast();
  const listing = listings.find((l) => l.id === tx.listingId);
  const other = users.find((u) => u.id === tx.counterpartyId);
  if (!listing) return null;

  const meta = statusMeta[tx.status];
  const quote = getBookingQuote({ listing, bookingType: tx.bookingType, hours: tx.hours, seats: tx.seats, addOnIds: tx.addOnIds });
  const otherName = tx.role === 'provider' ? other?.name ?? 'Player' : listing.clubName;
  const isUpcoming = tx.dayOffset >= 0;
  const canInvite = tx.role === 'customer' && (tx.status === 'booked' || tx.status === 'confirmed');

  const setStatus = (status: TransactionStatus, message: string) => {
    updateTransaction(tx.id, { status });
    addToast({ type: status === 'cancelled' ? 'warning' : 'success', message });
  };

  return (
    <div className="space-y-5">
      <button type="button" onClick={onBack} className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-brand lg:hidden">
        <ArrowLeftIcon size={16} aria-hidden="true" /> All bookings
      </button>

      <header className="card flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
        <img src={listing.images[0]} alt="" className="h-20 w-full rounded-xl object-cover sm:w-28" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={meta.variant}>{meta.label}</Badge>
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              {tx.bookingType === 'openplay' ? `Open play · ${pluralize(tx.seats, 'seat')}` : 'Private court'}
            </span>
          </div>
          <h2 className="mt-1 font-display text-2xl font-bold uppercase leading-tight">
            <Link to={`/listing/${listing.id}`} className="hover:text-brand">{listing.title}</Link>
          </h2>
          <p className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-600">
            <span className="inline-flex items-center gap-1"><CalendarIcon size={14} aria-hidden="true" /> {formatDateLong(dateFromOffset(tx.dayOffset))}</span>
            <span className="inline-flex items-center gap-1"><ClockIcon size={14} aria-hidden="true" /> {formatTimeRange(tx.startHour, tx.hours)}</span>
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {tx.role === 'provider' && tx.status === 'booked' &&
          <>
              <button type="button" className="btn btn-primary btn-md" onClick={() => setStatus('confirmed', 'Booking confirmed')}>Accept</button>
              <Button variant="secondary" onClick={() => setStatus('cancelled', 'Booking declined and refunded')}>Decline</Button>
            </>
          }
          {tx.role === 'provider' && tx.status === 'confirmed' &&
          <>
              <button type="button" className="btn btn-primary btn-md" onClick={() => setStatus('played', 'Marked as played — payout on the way')}>Mark played</button>
              <Button variant="secondary" onClick={() => setStatus('no-show', 'Marked as no-show')}>No-show</Button>
            </>
          }
          {tx.role === 'customer' && isUpcoming && (tx.status === 'booked' || tx.status === 'confirmed') &&
          <Button variant="destructive" onClick={() => setStatus('cancelled', 'Booking cancelled')}>Cancel booking</Button>
          }
          {tx.role === 'customer' && tx.status === 'played' &&
          <Link to={`/listing/${listing.id}`} className="btn btn-accent btn-md">Book again</Link>
          }
        </div>
      </header>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
        <ChatThread tx={tx} otherName={otherName} />
        <div className="space-y-5">
          {canInvite && <InvitePlayers txId={tx.id} />}
          <section className="card p-5" aria-labelledby={`timeline-${tx.id}`}>
            <h3 id={`timeline-${tx.id}`} className="mb-4 text-sm font-semibold">Booking timeline</h3>
            <BookingTimeline tx={tx} />
          </section>
          <section className="card p-5" aria-labelledby={`summary-${tx.id}`}>
            <h3 id={`summary-${tx.id}`} className="flex items-center gap-2 text-sm font-semibold"><UsersIcon size={16} className="text-brand" aria-hidden="true" /> Players</h3>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {tx.players.map((p) =>
              <li key={p} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium">{p}</li>
              )}
            </ul>
            <dl className="mt-4 space-y-1.5 border-t border-slate-100 pt-4 text-sm">
              {quote.lines.map((line) =>
              <div key={line.label} className="flex justify-between gap-3"><dt className="text-slate-600">{line.label}</dt><dd>{formatMoney(line.amount)}</dd></div>
              )}
              <div className="flex justify-between gap-3"><dt className="text-slate-600">Service fee</dt><dd>{formatMoney(quote.fee)}</dd></div>
              <div className="flex justify-between gap-3 pt-1 font-bold">
                <dt>{tx.role === 'provider' ? 'Your payout' : 'Total paid'}</dt>
                <dd>{formatMoney(tx.role === 'provider' ? quote.subtotal : quote.total)}</dd>
              </div>
            </dl>
          </section>
        </div>
      </div>
    </div>);

}