import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon, ClockIcon, KeyRoundIcon, LockIcon, NavigationIcon } from 'lucide-react';
import { ChatThread } from './ChatThread';
import { StatusPill } from '../StatusPill';
import { useInbox } from '../../contexts/InboxContext';
import { brand } from '../../data/brand';
import type { Transaction, TransactionStatus } from '../../types/transaction';
import { formatMoney } from '../../utils/currency';
import { formatRange, nightsBetween } from '../../utils/dates';
import { getListing, getUser } from '../../utils/lookup';

interface Action {
  label: string;
  status: TransactionStatus;
  event: string;
  variant: 'primary' | 'outline';
}

function actionsFor(tx: Transaction, otherFirst: string): Action[] {
  if (tx.role === 'hosting') {
    if (tx.status === 'requested')
    return [
    { label: 'Accept request', status: 'booked', event: 'You accepted the request', variant: 'primary' },
    { label: 'Decline', status: 'cancelled', event: 'You declined the request', variant: 'outline' }];

    if (tx.status === 'booked') return [{ label: 'Mark as checked in', status: 'checked-in', event: `${otherFirst} checked in`, variant: 'primary' }];
    if (tx.status === 'checked-in') return [{ label: 'Complete stay', status: 'completed', event: 'Trip completed · payout sent', variant: 'primary' }];
    return [];
  }
  if (tx.status === 'requested') return [{ label: 'Withdraw request', status: 'cancelled', event: 'You withdrew the request', variant: 'outline' }];
  if (tx.status === 'booked')
  return [
  { label: 'I’ve arrived — check in', status: 'checked-in', event: 'You checked in', variant: 'primary' },
  { label: 'Cancel booking', status: 'cancelled', event: 'You cancelled · refund issued per policy', variant: 'outline' }];

  if (tx.status === 'checked-in') return [{ label: 'Check out', status: 'completed', event: 'You checked out', variant: 'primary' }];
  return [];
}

export function TransactionDetail({ tx, tab }: {tx: Transaction;tab: 'trips' | 'hosting';}) {
  const { sendMessage, transition } = useInbox();
  const listing = getListing(tx.listingId);
  const other = getUser(tx.otherUserId);
  if (!listing) return null;
  const otherFirst = other.name.split(' ')[0];
  const actions = actionsFor(tx, otherFirst);
  const nights = nightsBetween(tx.start, tx.end);
  const directionsUnlocked = tx.role === 'hosting' || ['booked', 'checked-in', 'completed'].includes(tx.status);
  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${listing.location.lat},${listing.location.lng}`;

  return (
    <div className="flex h-full min-h-0 flex-col">
      <header className="flex items-center gap-3 border-b border-sand-200 bg-white px-4 py-3 sm:px-6">
        <Link to={`/inbox?tab=${tab}`} className="btn-ghost -ml-2 px-2 lg:hidden" aria-label="Back to inbox">
          <ChevronLeftIcon size={20} />
        </Link>
        <img src={listing.images[0]} alt="" className="h-11 w-14 shrink-0 rounded-lg object-cover" />
        <div className="min-w-0 flex-1">
          <Link to={`/l/${listing.id}`} className="block truncate font-serif font-bold text-ink-900 hover:text-primary-700">
            {listing.title}
          </Link>
          <p className="truncate text-xs text-ink-500">
            {tx.role === 'trip' ? `Hosted by ${other.name}` : `Guest: ${other.name}`} · {formatRange(tx.start, tx.end)}
          </p>
        </div>
        <StatusPill status={tx.status} />
      </header>

      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto xl:flex-row xl:overflow-hidden">
        <div className="flex min-h-[420px] flex-1 flex-col bg-sand-50 xl:min-h-0">
          <ChatThread tx={tx} otherName={other.name} onSend={(text) => sendMessage(tx.id, text)} />
        </div>

        <aside className="space-y-4 overflow-y-auto border-t border-sand-200 bg-white p-4 sm:p-6 xl:w-[340px] xl:border-l xl:border-t-0">
          <section>
            <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-ink-500">Booking</h3>
            <dl className="mt-3 space-y-2 text-sm">
              {[
              ['Dates', `${formatRange(tx.start, tx.end)} · ${nights} nights`],
              ['Campers', String(tx.campers)],
              ['Vehicles', String(tx.vehicles)],
              ['Arrival', tx.arrivalTime],
              [tx.role === 'hosting' ? 'You earn' : 'Total paid', formatMoney(tx.role === 'hosting' ? Math.round(tx.total * (1 - brand.hostCommissionRate)) : tx.total)]].
              map(([k, v]) =>
              <div key={k} className="flex justify-between gap-4">
                  <dt className="text-ink-500">{k}</dt>
                  <dd className="text-right font-medium text-ink-900">{v}</dd>
                </div>
              )}
            </dl>
          </section>

          {actions.length > 0 &&
          <div className="flex flex-col gap-2 border-t border-sand-200 pt-4">
              {actions.map((a) =>
            <button
              key={a.label}
              type="button"
              onClick={() => transition(tx.id, a.status, a.event)}
              className={a.variant === 'primary' ? 'btn-primary w-full' : 'btn-outline w-full'}>
              
                  {a.label}
                </button>
            )}
            </div>
          }
          {tx.status === 'completed' && tx.role === 'trip' &&
          <Link to={`/l/${listing.id}`} className="btn-outline w-full">
              Book again
            </Link>
          }

          <section className="rounded-2xl border border-sand-200 bg-sand-50 p-4">
            <h3 className="flex items-center gap-2 font-serif text-base font-bold text-ink-900">
              <NavigationIcon size={16} className="text-primary-700" aria-hidden="true" /> Directions & arrival
            </h3>
            {directionsUnlocked ?
            <div className="mt-3 space-y-3 text-sm text-ink-700">
                <p>{listing.directions}</p>
                <p className="flex gap-2 rounded-xl bg-white p-3">
                  <KeyRoundIcon size={16} className="mt-0.5 shrink-0 text-accent-600" aria-hidden="true" />
                  <span>{listing.arrivalInstructions}</span>
                </p>
                <p className="flex items-center gap-2 text-xs text-ink-500">
                  <ClockIcon size={13} aria-hidden="true" /> Check-in after {listing.checkIn} · check-out by {listing.checkOut}
                </p>
                <a href={mapsUrl} target="_blank" rel="noreferrer" className="btn-accent w-full">
                  <NavigationIcon size={15} aria-hidden="true" /> Get directions
                </a>
              </div> :

            <p className="mt-3 flex gap-2 text-sm text-ink-600">
                <LockIcon size={15} className="mt-0.5 shrink-0" aria-hidden="true" />
                Gate codes and exact directions unlock once {otherFirst} accepts your request.
              </p>
            }
          </section>
        </aside>
      </div>
    </div>);

}