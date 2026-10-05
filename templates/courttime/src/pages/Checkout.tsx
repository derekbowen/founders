import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, CalendarIcon, ClockIcon, CreditCardIcon, LockIcon, PlusIcon, ShoppingCartIcon, UsersIcon, XIcon } from 'lucide-react';
import { Input } from '../components/Input';
import { Checkbox } from '../components/Checkbox';
import { LoadingSpinner } from '../components/Button';
import { EmptyState } from '../components/common/EmptyState';
import { useBookings } from '../contexts/BookingContext';
import { listings } from '../data/listings';
import { useCheckout } from '../hooks/useCheckout';
import { detectCardBrand } from '../utils/card';
import { formatDateLong, formatMoney, formatTimeRange, fromDateKey, pluralize } from '../utils/format';
import { getBookingQuote } from '../utils/pricing';

export function Checkout() {
  const { draft } = useBookings();
  const listing = listings.find((l) => l.id === draft?.listingId);
  const checkout = useCheckout(draft, listing);

  if (!draft || !listing) {
    return (
      <div className="container-page py-16">
        <EmptyState
          icon={<ShoppingCartIcon size={26} />}
          title="Nothing to check out"
          description="Pick a court, date and time first — your booking summary will show up here."
          action={<Link to="/search" className="btn btn-primary btn-md">Find a court</Link>} />
        
      </div>);

  }

  const quote = getBookingQuote({ listing, bookingType: draft.bookingType, hours: draft.hours, seats: draft.seats, addOnIds: draft.addOnIds });
  const brandName = detectCardBrand(checkout.card.number);
  const { errors } = checkout;

  return (
    <div className="container-page py-8 lg:py-12">
      <Link to={`/listing/${listing.id}`} className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-brand">
        <ArrowLeftIcon size={16} aria-hidden="true" /> Back to court
      </Link>
      <h1 className="heading-lg mt-3">Confirm and pay</h1>

      <form onSubmit={checkout.submit} noValidate className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_400px]">
        <div className="space-y-6">
          <section className="card p-6" aria-labelledby="players-heading">
            <div className="flex items-center justify-between gap-3">
              <h2 id="players-heading" className="heading-md flex items-center gap-2"><UsersIcon size={20} className="text-brand" aria-hidden="true" /> Players</h2>
              <span className="text-sm text-slate-500">{checkout.players.length} / {checkout.maxPlayers}</span>
            </div>
            <p className="mt-1 text-sm text-slate-600">
              {draft.bookingType === 'openplay' ? 'One name per seat so the host can check everyone in.' : 'Optional — add who’s playing so the club can check you in faster.'}
            </p>
            <div className="mt-4 space-y-3">
              {checkout.players.map((player, i) =>
              <div key={i} className="flex items-end gap-2">
                  <div className="flex-1">
                    <Input
                    id={`player-${i}`}
                    label={i === 0 ? 'Lead player' : `Player ${i + 1}`}
                    value={player}
                    placeholder="Full name"
                    onChange={(e) => checkout.setPlayer(i, e.target.value)}
                    error={i === 0 ? errors.players : undefined} />
                  
                  </div>
                  {checkout.canEditPlayerCount && i > 0 &&
                <button type="button" onClick={() => checkout.removePlayer(i)} className="btn btn-ghost btn-sm mb-0.5" aria-label={`Remove player ${i + 1}`}>
                      <XIcon size={16} />
                    </button>
                }
                </div>
              )}
            </div>
            {checkout.canEditPlayerCount && checkout.players.length < checkout.maxPlayers &&
            <button type="button" onClick={checkout.addPlayer} className="btn btn-outline btn-sm mt-4">
                <PlusIcon size={16} aria-hidden="true" /> Add player
              </button>
            }
          </section>

          <section className="card p-6" aria-labelledby="payment-heading">
            <div className="flex items-center justify-between gap-3">
              <h2 id="payment-heading" className="heading-md flex items-center gap-2"><CreditCardIcon size={20} className="text-brand" aria-hidden="true" /> Payment</h2>
              <span className="inline-flex items-center gap-1 text-xs text-slate-500"><LockIcon size={12} aria-hidden="true" /> Secured by Stripe</span>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Input
                  id="card-number"
                  label="Card number"
                  inputMode="numeric"
                  autoComplete="cc-number"
                  placeholder="1234 1234 1234 1234"
                  value={checkout.card.number}
                  onChange={(e) => checkout.updateCard('number', e.target.value)}
                  error={errors.number}
                  helperText="Test card: 4242 4242 4242 4242"
                  endAdornment={<span className="text-xs font-semibold text-slate-500">{brandName ?? 'Card'}</span>} />
                
              </div>
              <Input id="card-expiry" label="Expiry" inputMode="numeric" autoComplete="cc-exp" placeholder="MM / YY" value={checkout.card.expiry} onChange={(e) => checkout.updateCard('expiry', e.target.value)} error={errors.expiry} />
              <Input id="card-cvc" label="CVC" inputMode="numeric" autoComplete="cc-csc" placeholder="123" value={checkout.card.cvc} onChange={(e) => checkout.updateCard('cvc', e.target.value)} error={errors.cvc} />
              <Input id="card-name" label="Name on card" autoComplete="cc-name" value={checkout.card.name} onChange={(e) => checkout.updateCard('name', e.target.value)} error={errors.name} />
              <Input id="card-zip" label="ZIP code" inputMode="numeric" autoComplete="postal-code" placeholder="78704" value={checkout.card.zip} onChange={(e) => checkout.updateCard('zip', e.target.value)} error={errors.zip} />
            </div>
            <div className="mt-4">
              <Checkbox label="Save this card for faster booking" defaultChecked />
            </div>
          </section>

          <section className="card p-6" aria-labelledby="note-heading">
            <h2 id="note-heading" className="heading-md">Message to the host</h2>
            <label htmlFor="host-note" className="sr-only">Message to the host</label>
            <textarea id="host-note" rows={3} value={checkout.note} onChange={(e) => checkout.setNote(e.target.value)} placeholder="Anything the club should know? (optional)" className="field mt-3 resize-none" />
          </section>
        </div>

        <aside className="self-start lg:sticky lg:top-24">
          <div className="card overflow-hidden">
            <div className="flex gap-4 border-b border-slate-100 p-5">
              <img src={listing.images[0]} alt="" className="h-20 w-24 shrink-0 rounded-xl object-cover" />
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{listing.clubName}</p>
                <p className="font-semibold leading-snug">{listing.title}</p>
                <span className="mt-1 inline-block rounded-full bg-brand-soft px-2 py-0.5 text-xs font-semibold text-brand-dark">
                  {draft.bookingType === 'openplay' ? `Open play · ${pluralize(draft.seats, 'seat')}` : 'Private court'}
                </span>
              </div>
            </div>
            <dl className="space-y-3 p-5 text-sm">
              <div className="flex items-center gap-2"><CalendarIcon size={16} className="text-brand" aria-hidden="true" /><dt className="sr-only">Date</dt><dd>{formatDateLong(fromDateKey(draft.dateKey))}</dd></div>
              <div className="flex items-center gap-2"><ClockIcon size={16} className="text-brand" aria-hidden="true" /><dt className="sr-only">Time</dt><dd>{formatTimeRange(draft.startHour, draft.hours)} · {pluralize(draft.hours, 'hour')}</dd></div>
            </dl>
            <dl className="space-y-2 border-t border-slate-100 p-5 text-sm">
              {quote.lines.map((line) =>
              <div key={line.label} className="flex justify-between gap-3"><dt className="text-slate-600">{line.label}</dt><dd>{formatMoney(line.amount)}</dd></div>
              )}
              <div className="flex justify-between gap-3"><dt className="text-slate-600">Service fee</dt><dd>{formatMoney(quote.fee)}</dd></div>
              <div className="flex justify-between gap-3 border-t border-slate-100 pt-3 text-base font-bold"><dt>Total (USD)</dt><dd>{formatMoney(quote.total)}</dd></div>
            </dl>
            <div className="border-t border-slate-100 p-5">
              <button type="submit" disabled={checkout.submitting} className="btn btn-primary btn-lg w-full">
                {checkout.submitting ? <><LoadingSpinner className="h-4 w-4" /> Processing…</> : `Confirm & pay ${formatMoney(quote.total)}`}
              </button>
              <p className="mt-3 text-xs leading-relaxed text-slate-500">
                {listing.cancellationPolicy} By booking you agree to the <Link to="/terms" className="underline hover:text-brand">Terms of service</Link>.
              </p>
            </div>
          </div>
        </aside>
      </form>
    </div>);

}