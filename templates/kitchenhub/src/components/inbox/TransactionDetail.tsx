import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, CircleCheckIcon, InfoIcon } from 'lucide-react';
import { cleaningChecklist } from '../../data/catalog';
import type { BookingStatus, Transaction } from '../../types/marketplace';
import { formatDate, formatMoney, formatTimeRange } from '../../utils/format';
import { getListing, storageLabel } from '../../utils/listings';
import { calcBreakdown } from '../../utils/pricing';
import { cn, focusRing } from '../../utils/styles';
import { Button } from '../ui/Button';
import { BookingTimeline } from './BookingTimeline';
import { ChatThread } from './ChatThread';
import { CleaningChecklist } from './CleaningChecklist';
import { StatusBadge } from './StatusBadge';

interface TransactionDetailProps {
  tx: Transaction;
  onSend: (text: string) => void;
  onTransition: (status: BookingStatus, label: string) => void;
  onToggleChecklist: (itemId: string) => void;
}

const panelTitle = 'mb-3 font-heading text-sm font-semibold uppercase tracking-widest text-steel-900';

export function TransactionDetail({ tx, onSend, onTransition, onToggleChecklist }: TransactionDetailProps) {
  const listing = getListing(tx.listingId);
  const [reviewed, setReviewed] = useState(false);
  const isHost = tx.role === 'provider';
  const first = tx.counterpartName.split(' ')[0];
  const checklistComplete = tx.checklistDone.length === cleaningChecklist.length;
  const breakdown = listing ? calcBreakdown(listing, tx.hours, tx.storage) : null;
  const payout = breakdown ? breakdown.total - breakdown.serviceFee : 0;

  const action = (() => {
    switch (tx.status) {
      case 'requested':
        return isHost ?
        {
          text: `${first} wants to book ${formatDate(tx.date, 'EEE, MMM d')}. Respond within 24 hours to keep your response rate.`,
          buttons:
          <>
                  <Button variant="danger" size="sm" onClick={() => onTransition('cancelled', 'You declined the request')}>Decline</Button>
                  <Button variant="accent" size="sm" onClick={() => onTransition('approved', 'You approved the booking')}>Accept request</Button>
                </>

        } :
        {
          text: `Waiting for ${first} to respond. You won’t be charged until they accept.`,
          buttons: <Button variant="outline" size="sm" onClick={() => onTransition('cancelled', 'Request withdrawn by you')}>Withdraw request</Button>
        };
      case 'approved':
        return isHost ?
        {
          text: 'Booking confirmed. Door code and address have been shared with the renter.',
          buttons: <Button variant="dark" size="sm" onClick={() => onTransition('in-session', 'Session started')}>Start session</Button>
        } :
        {
          text: 'Booking confirmed! Address and door code are in your confirmation email.',
          buttons:
          <>
                  <Button variant="outline" size="sm" onClick={() => onTransition('cancelled', 'Cancelled by you')}>Cancel booking</Button>
                  <Button variant="dark" size="sm" onClick={() => onTransition('in-session', 'Checked in — session started')}>Check in</Button>
                </>

        };
      case 'in-session':
        return {
          text: checklistComplete ? 'Checklist complete — ready to sign off.' : 'Complete the cleaning checklist to finish the session.',
          buttons:
          <Button variant="accent" size="sm" disabled={!checklistComplete} onClick={() => onTransition('completed', 'Cleaning signed off — session completed')}>
              Sign off & complete
            </Button>

        };
      case 'completed':
        return isHost ?
        { text: `Payout of ${formatMoney(payout)} is scheduled for Friday.`, buttons: null } :
        {
          text: reviewed ? 'Thanks — your review helps other food businesses.' : `How was ${listing?.title}?`,
          buttons: reviewed ? null : <Button variant="dark" size="sm" onClick={() => setReviewed(true)}>Leave a review</Button>
        };
      default:
        return { text: 'This booking was cancelled. No charges were made.', buttons: null };
    }
  })();

  return (
    <div className="flex h-full flex-col">
      <header className="flex items-center gap-3 border-b border-steel-200 px-4 py-3 sm:px-6">
        <Link to="/inbox" aria-label="Back to inbox" className={cn('grid h-9 w-9 shrink-0 place-items-center rounded-full hover:bg-steel-100 lg:hidden', focusRing)}>
          <ArrowLeftIcon className="h-5 w-5" aria-hidden="true" />
        </Link>
        <img src={listing?.images[0]} alt="" className="hidden h-11 w-11 rounded-lg object-cover sm:block" />
        <div className="min-w-0 flex-1">
          <h2 className="truncate font-semibold text-steel-900">
            {tx.counterpartName} <span className="font-normal text-steel-500">· {tx.counterpartBusiness}</span>
          </h2>
          <Link to={`/kitchens/${tx.listingId}`} className="truncate text-sm text-steel-500 hover:text-steel-900 hover:underline">{listing?.title}</Link>
        </div>
        <StatusBadge status={tx.status} />
      </header>

      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-steel-200 bg-steel-50 px-4 py-3 sm:px-6">
        <p className="flex items-center gap-2 text-sm text-steel-700">
          {tx.status === 'completed' ? <CircleCheckIcon className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" /> : <InfoIcon className="h-4 w-4 shrink-0 text-steel-500" aria-hidden="true" />}
          {action.text}
        </p>
        {action.buttons && <div className="flex gap-2">{action.buttons}</div>}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto xl:grid xl:grid-cols-[minmax(0,1fr)_340px] xl:overflow-hidden">
        <ChatThread messages={tx.messages} counterpartName={tx.counterpartName} onSend={onSend} disabled={tx.status === 'cancelled'} />
        <aside className="space-y-8 border-t border-steel-200 p-5 xl:overflow-y-auto xl:border-l xl:border-t-0" aria-label="Booking details">
          <section>
            <h3 className={panelTitle}>Booking</h3>
            <dl className="space-y-2 text-sm">
              {[
              ['Date', formatDate(tx.date)],
              ['Time', formatTimeRange(tx.startHour, tx.hours)],
              ['Hours', `${tx.hours} hours`],
              ['Storage', tx.storage.length ? tx.storage.map(storageLabel).join(', ') : 'None'],
              [isHost ? 'Your payout' : 'Total', formatMoney(isHost ? payout : breakdown?.total ?? 0)]].
              map(([k, v]) =>
              <div key={k} className="flex justify-between gap-4">
                  <dt className="text-steel-500">{k}</dt>
                  <dd className="text-right font-medium text-steel-900">{v}</dd>
                </div>
              )}
            </dl>
          </section>
          <section>
            <h3 className={panelTitle}>Cleaning sign-off</h3>
            <CleaningChecklist txId={tx.id} done={tx.checklistDone} editable={tx.status === 'in-session'} onToggle={onToggleChecklist} />
          </section>
          <section>
            <h3 className={panelTitle}>Timeline</h3>
            <BookingTimeline events={tx.timeline} status={tx.status} />
          </section>
        </aside>
      </div>
    </div>);

}