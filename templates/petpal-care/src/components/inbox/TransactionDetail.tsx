import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon, StarIcon } from 'lucide-react';
import { parseISO } from 'date-fns';
import { Avatar } from '../Avatar';
import { Tab, TabList, TabPanel, Tabs } from '../Tabs';
import { useToast } from '../ToastProvider';
import { StatusBadge } from '../common/StatusBadge';
import { ServiceIcon } from '../common/ServiceIcon';
import { ChatThread } from './ChatThread';
import { PhotoFeed } from './PhotoFeed';
import { StatusTimeline } from './StatusTimeline';
import { getListingById, getListingService, getServiceMeta } from '../../utils/listing';
import { calculateBreakdown } from '../../utils/pricing';
import { formatDateRange, formatMoney, formatTime } from '../../utils/format';
import { brand } from '../../data/brand';
import type { Transaction, TransactionStatus } from '../../types/transaction';

interface TransactionDetailProps {
  tx: Transaction;
  backTo: string;
  onStatus: (status: TransactionStatus) => void;
  onSend: (text: string) => void;
  onPhoto: (caption: string) => void;
}

export function TransactionDetail({ tx, backTo, onStatus, onSend, onPhoto }: TransactionDetailProps) {
  const { addToast } = useToast();
  const [reviewing, setReviewing] = useState(false);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [reviewed, setReviewed] = useState(false);

  const listing = getListingById(tx.listingId)!;
  const meta = getServiceMeta(tx.serviceId)!;
  const variant = getListingService(listing, tx.serviceId)?.variants.find((v) => v.id === tx.variantId);
  const breakdown = calculateBreakdown({
    listing,
    serviceId: tx.serviceId,
    variantId: tx.variantId,
    start: parseISO(tx.start),
    end: tx.end ? parseISO(tx.end) : null,
    petCount: tx.petNames.length
  });
  const isProvider = tx.role === 'provider';
  const payout = breakdown ? breakdown.subtotal * (1 - brand.marketplace.providerFeeRate) : 0;

  const act = (status: TransactionStatus, message: string) => {
    onStatus(status);
    addToast({ type: 'success', message });
  };

  const actions: {label: string;onClick: () => void;style: string;}[] = [];
  if (isProvider) {
    if (tx.status === 'requested') {
      actions.push({ label: 'Accept request', onClick: () => act('confirmed', 'Booking confirmed'), style: 'btn-primary' });
      actions.push({ label: 'Decline', onClick: () => act('cancelled', 'Request declined'), style: 'btn-danger' });
    }
    if (tx.status === 'confirmed') actions.push({ label: 'Check in pets', onClick: () => act('in-care', 'Stay started — pets are in your care'), style: 'btn-primary' });
    if (tx.status === 'in-care') actions.push({ label: 'Mark as completed', onClick: () => act('completed', 'Stay completed'), style: 'btn-primary' });
  } else {
    if (tx.status === 'requested') actions.push({ label: 'Cancel request', onClick: () => act('cancelled', 'Request cancelled'), style: 'btn-danger' });
    if (tx.status === 'confirmed') actions.push({ label: 'Cancel booking', onClick: () => act('cancelled', 'Booking cancelled'), style: 'btn-danger' });
  }

  const statusNote: Record<TransactionStatus, string> = {
    requested: isProvider ? `${tx.counterpartName.split(' ')[0]} is waiting for your response. Requests expire after 24 hours.` : `Waiting for ${tx.counterpartName.split(' ')[0]} to respond.`,
    confirmed: isProvider ? 'Confirmed! Check pets in when the stay begins.' : 'Your sitter confirmed. Exact address is now shared below.',
    'in-care': isProvider ? 'Pets are in your care. Share photo updates to keep the owner in the loop.' : 'Your pet is in care. Photo updates appear in the feed.',
    completed: isProvider ? 'Stay completed. Payout is on its way.' : 'Stay completed. How did it go?',
    cancelled: 'No charges were made for this booking.'
  };

  return (
    <div className="p-4 sm:p-6">
      <Link to={backTo} className="mb-4 inline-flex items-center gap-1 text-sm font-bold text-ink-700 hover:text-ink-900 lg:hidden">
        <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" /> All conversations
      </Link>

      <header className="flex flex-wrap items-center gap-4">
        <Avatar name={tx.counterpartName} alt={tx.counterpartName} size="lg" />
        <div className="min-w-0 flex-1">
          <h2 className="text-xl font-black text-ink-900">{tx.counterpartName}</h2>
          <p className="text-sm text-ink-600">
            {isProvider ? 'Pet owner' : 'Sitter'} ·{' '}
            <Link to={`/l/${listing.id}`} className="link font-semibold">
              {listing.title}
            </Link>
          </p>
        </div>
        <StatusBadge status={tx.status} />
      </header>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_320px]">
        <div className="card order-2 p-4 sm:p-5 xl:order-1">
          <Tabs key={tx.id} defaultTab="messages" variant="underlined">
            <TabList>
              <Tab id="messages">Messages</Tab>
              <Tab id="photos" badge={tx.photoUpdates.length ? String(tx.photoUpdates.length) : undefined}>
                Photo updates
              </Tab>
            </TabList>
            <TabPanel id="messages" className="pt-5">
              <ChatThread messages={tx.messages} counterpartName={tx.counterpartName} onSend={onSend} disabled={tx.status === 'cancelled'} />
            </TabPanel>
            <TabPanel id="photos" className="pt-5">
              <PhotoFeed
                updates={tx.photoUpdates}
                canPost={isProvider && tx.status === 'in-care'}
                onPost={(c) => {
                  onPhoto(c);
                  addToast({ type: 'success', message: 'Photo update shared' });
                }}
                emptyText={isProvider ? 'Photo updates can be shared once pets are checked in.' : 'Your sitter will post photos here once the stay begins.'} />
              
            </TabPanel>
          </Tabs>
        </div>

        <aside className="order-1 space-y-4 xl:order-2">
          <div className="card p-5">
            <StatusTimeline status={tx.status} />
            <p className="mt-4 text-sm text-ink-700">{statusNote[tx.status]}</p>
            {actions.length > 0 &&
            <div className="mt-4 flex flex-wrap gap-2">
                {actions.map((a) =>
              <button key={a.label} type="button" onClick={a.onClick} className={`btn btn-md flex-1 ${a.style}`}>
                    {a.label}
                  </button>
              )}
              </div>
            }
            {tx.status === 'completed' && !isProvider && !reviewed &&
            <div className="mt-4">
                {reviewing ?
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setReviewed(true);
                  setReviewing(false);
                  addToast({ type: 'success', message: 'Thanks for your review!' });
                }}
                className="space-y-3">
                
                    <div className="flex gap-1" role="radiogroup" aria-label="Rating">
                      {[1, 2, 3, 4, 5].map((n) =>
                  <button key={n} type="button" role="radio" aria-checked={rating === n} aria-label={`${n} stars`} onClick={() => setRating(n)}>
                          <StarIcon className="h-7 w-7" fill={n <= rating ? 'currentColor' : 'none'} style={{ color: n <= rating ? 'rgb(var(--primary-500))' : 'rgb(var(--ink-300))' }} aria-hidden="true" />
                        </button>
                  )}
                    </div>
                    <label htmlFor="review-text" className="sr-only">
                      Review
                    </label>
                    <textarea id="review-text" rows={3} value={reviewText} onChange={(e) => setReviewText(e.target.value)} className="field resize-none" placeholder={`How was ${tx.petNames[0]}’s experience?`} />
                    <button type="submit" disabled={!reviewText.trim()} className="btn btn-md btn-primary w-full">
                      Submit review
                    </button>
                  </form> :

              <button type="button" onClick={() => setReviewing(true)} className="btn btn-md btn-primary w-full">
                    Leave a review
                  </button>
              }
              </div>
            }
            {reviewed && <p className="mt-4 rounded-2xl bg-accent-50 p-3 text-sm font-bold text-accent-800">Review submitted — thank you!</p>}
            {tx.status === 'cancelled' && !isProvider &&
            <Link to={`/l/${listing.id}`} className="btn btn-md btn-secondary mt-4 w-full">
                Book again
              </Link>
            }
          </div>

          <div className="card p-5">
            <h3 className="font-extrabold text-ink-900">Booking details</h3>
            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between gap-3">
                <dt className="text-ink-600">Service</dt>
                <dd className="flex items-center gap-1.5 text-right font-bold text-ink-900">
                  <ServiceIcon serviceId={tx.serviceId} className="h-4 w-4 text-accent-700" />
                  {meta.name}
                </dd>
              </div>
              {variant &&
              <div className="flex justify-between gap-3">
                  <dt className="text-ink-600">Option</dt>
                  <dd className="text-right font-bold text-ink-900">{variant.label}</dd>
                </div>
              }
              <div className="flex justify-between gap-3">
                <dt className="text-ink-600">{tx.end ? 'Dates' : 'Date'}</dt>
                <dd className="text-right font-bold text-ink-900">{formatDateRange(tx.start, tx.end)}</dd>
              </div>
              {tx.sessionTime &&
              <div className="flex justify-between gap-3">
                  <dt className="text-ink-600">Time</dt>
                  <dd className="text-right font-bold text-ink-900">{formatTime(tx.sessionTime)}</dd>
                </div>
              }
              <div className="flex justify-between gap-3">
                <dt className="text-ink-600">Pets</dt>
                <dd className="text-right font-bold text-ink-900">{tx.petNames.join(', ')}</dd>
              </div>
            </dl>
            {breakdown &&
            <dl className="mt-4 space-y-2 border-t border-ink-100 pt-4 text-sm">
                {breakdown.lineItems.map((li) =>
              <div key={li.label} className="flex justify-between gap-3">
                    <dt className="text-ink-600">{li.label}</dt>
                    <dd className="font-bold text-ink-900">{formatMoney(li.amount, true)}</dd>
                  </div>
              )}
                {isProvider ?
              <>
                    <div className="flex justify-between gap-3">
                      <dt className="text-ink-600">{brand.name} fee ({Math.round(brand.marketplace.providerFeeRate * 100)}%)</dt>
                      <dd className="font-bold text-ink-900">−{formatMoney(breakdown.subtotal - payout, true)}</dd>
                    </div>
                    <div className="flex justify-between border-t border-ink-100 pt-2 text-base">
                      <dt className="font-extrabold text-ink-900">You earn</dt>
                      <dd className="font-black text-accent-700">{formatMoney(payout, true)}</dd>
                    </div>
                  </> :

              <>
                    <div className="flex justify-between gap-3">
                      <dt className="text-ink-600">Service fee</dt>
                      <dd className="font-bold text-ink-900">{formatMoney(breakdown.serviceFee, true)}</dd>
                    </div>
                    <div className="flex justify-between border-t border-ink-100 pt-2 text-base">
                      <dt className="font-extrabold text-ink-900">Total</dt>
                      <dd className="font-black text-ink-900">{formatMoney(breakdown.total, true)}</dd>
                    </div>
                  </>
              }
              </dl>
            }
          </div>
        </aside>
      </div>
    </div>);

}