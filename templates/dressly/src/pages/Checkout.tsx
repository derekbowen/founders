import React, { useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, CheckIcon, MapPinIcon, PackageIcon, SearchXIcon, StoreIcon } from 'lucide-react';
import { Input } from '../components/Input';
import { EmptyState } from '../components/EmptyState';
import { CardForm, validateCard, type CardState } from '../components/checkout/CardForm';
import { RentalSummary } from '../components/checkout/RentalSummary';
import type { DeliveryMethod, RentalDays } from '../types/marketplace';
import { formatMoney, parseIsoDate, shortDate } from '../utils/format';
import { getBreakdown, rentalWindow } from '../utils/pricing';
import { getListing, getUser } from '../utils/lookup';
import { btn, cx, eyebrow } from '../utils/styles';

export function Checkout() {
  const { id } = useParams();
  const [params] = useSearchParams();
  const listing = getListing(id);
  const eventDate = parseIsoDate(params.get('event'));
  const days = (params.get('days') === '8' ? 8 : 4) as RentalDays;
  const initialDelivery = (params.get('delivery') === 'pickup' ? 'pickup' : 'ship') as DeliveryMethod;

  const [delivery, setDelivery] = useState<DeliveryMethod>(initialDelivery);
  const [address, setAddress] = useState({ line1: '245 W 17th St', line2: 'Apt 4C', city: 'New York', state: 'NY', zip: '10011' });
  const [card, setCard] = useState<CardState>({ name: '', number: '', expiry: '', cvc: '', zip: '' });
  const [errors, setErrors] = useState<Partial<Record<keyof CardState, string>>>({});
  const [message, setMessage] = useState('');
  const [agree, setAgree] = useState(false);
  const [status, setStatus] = useState<'idle' | 'processing' | 'success'>('idle');

  if (!listing || !eventDate) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24">
        <EmptyState
          icon={SearchXIcon}
          title="Your rental details are missing"
          text="Pick a dress and an event date to start checkout."
          action={
          <Link to="/s" className={btn('primary', 'md')}>
              Browse dresses
            </Link>
          } />
        
      </div>);

  }

  const lender = getUser(listing.lenderId);
  const breakdown = getBreakdown(listing, days, delivery);
  const { start, end } = rentalWindow(eventDate, days);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateCard(card);
    setErrors(errs);
    if (Object.keys(errs).length || !agree) return;
    setStatus('processing');
    setTimeout(() => setStatus('success'), 1600);
  };

  if (status === 'success') {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <motion.span
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-ink text-paper">
          
          <CheckIcon size={28} aria-hidden="true" />
        </motion.span>
        <p className={`${eyebrow} mt-8`}>Request sent</p>
        <h1 className="mt-3 font-display text-4xl md:text-5xl">You’re almost red-carpet ready.</h1>
        <p className="mt-4 text-muted">
          {lender?.name.split(' ')[0] ?? 'Your lender'} usually replies {lender?.responseTime}. Your card is
          authorized for {formatMoney(breakdown.total)} and charged only once they confirm. The dress arrives{' '}
          {shortDate(start)}.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/inbox?tab=rentals" className={btn('primary', 'lg')}>
            View in inbox
          </Link>
          <Link to="/s" className={btn('outline', 'lg')}>
            Keep browsing
          </Link>
        </div>
      </div>);

  }

  return (
    <div className="mx-auto max-w-[1200px] px-4 pb-20 pt-8 md:px-8">
      <Link to={`/l/${listing.id}`} className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink">
        <ArrowLeftIcon size={14} aria-hidden="true" /> Back to dress
      </Link>
      <h1 className="mt-4 font-display text-4xl md:text-5xl">Checkout</h1>

      <form onSubmit={submit} className="mt-10 grid gap-10 lg:grid-cols-[1fr_400px] lg:gap-14" noValidate>
        <div className="space-y-10">
          <section aria-labelledby="delivery-heading">
            <h2 id="delivery-heading" className="flex items-center gap-3 font-display text-2xl">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink font-sans text-xs text-paper">1</span>
              Delivery
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2" role="radiogroup" aria-label="Delivery method">
              {(['ship', 'pickup'] as DeliveryMethod[]).map((m) => {
                const allowed = listing.delivery.includes(m);
                const active = delivery === m;
                const Icon = m === 'ship' ? PackageIcon : StoreIcon;
                return (
                  <button
                    key={m}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    disabled={!allowed}
                    onClick={() => setDelivery(m)}
                    className={cx(
                      'flex items-start gap-3 border p-4 text-left transition disabled:cursor-not-allowed disabled:opacity-40',
                      active ? 'border-ink bg-cream' : 'border-line hover:border-ink'
                    )}>
                    
                    <Icon size={18} className="mt-0.5" aria-hidden="true" />
                    <span>
                      <span className="block text-sm font-medium">
                        {m === 'ship' ? 'Ship to my address' : 'Local pickup'}
                      </span>
                      <span className="block text-xs text-muted">
                        {!allowed ?
                        'Not offered by this lender' :
                        m === 'ship' ?
                        `Round-trip, prepaid return label · ${formatMoney(14)}` :
                        `Free · meet ${lender?.name.split(' ')[0]} in ${lender?.city}`}
                      </span>
                    </span>
                  </button>);

              })}
            </div>

            {delivery === 'ship' ?
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Input label="Street address" value={address.line1} onChange={(e) => setAddress({ ...address, line1: e.target.value })} autoComplete="address-line1" />
                </div>
                <div className="sm:col-span-2">
                  <Input label="Apartment, suite (optional)" value={address.line2} onChange={(e) => setAddress({ ...address, line2: e.target.value })} autoComplete="address-line2" />
                </div>
                <Input label="City" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} autoComplete="address-level2" />
                <div className="grid grid-cols-2 gap-4">
                  <Input label="State" value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} autoComplete="address-level1" />
                  <Input label="ZIP" value={address.zip} onChange={(e) => setAddress({ ...address, zip: e.target.value })} autoComplete="postal-code" />
                </div>
              </div> :

            <div className="mt-6 flex items-start gap-3 bg-cream p-5 text-sm">
                <MapPinIcon size={18} className="mt-0.5 shrink-0 text-accent-dark" aria-hidden="true" />
                <div>
                  <p className="font-medium text-ink">Pickup near {lender?.city}</p>
                  <p className="mt-1 text-muted">
                    The exact address is shared once {lender?.name.split(' ')[0]} confirms. Pick up on {shortDate(start)},
                    return by {shortDate(end)}.
                  </p>
                </div>
              </div>
            }
          </section>

          <section aria-labelledby="payment-heading">
            <h2 id="payment-heading" className="flex items-center gap-3 font-display text-2xl">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink font-sans text-xs text-paper">2</span>
              Payment
            </h2>
            <div className="mt-5">
              <CardForm card={card} onChange={setCard} errors={errors} />
            </div>
          </section>

          <section aria-labelledby="message-heading">
            <h2 id="message-heading" className="flex items-center gap-3 font-display text-2xl">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink font-sans text-xs text-paper">3</span>
              Say hello <span className="font-sans text-sm text-muted">(optional)</span>
            </h2>
            <label htmlFor="message" className="sr-only">Message to lender</label>
            <textarea
              id="message"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`Tell ${lender?.name.split(' ')[0] ?? 'the lender'} about your event, your height, or any fit questions…`}
              className="mt-5 w-full border border-line bg-paper p-3 text-sm focus:border-ink focus:outline-none" />
            
          </section>

          <label className="flex items-start gap-3 text-sm text-muted">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="mt-0.5 h-4 w-4 accent-[rgb(var(--c-ink))]" />
            
            <span>
              I agree to the <Link to="/terms" className="text-ink underline">rental terms</Link>, including returning the dress
              by {shortDate(end)} and the late fee policy.
            </span>
          </label>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <RentalSummary listing={listing} days={days} eventDate={eventDate} start={start} end={end} breakdown={breakdown} />
          <button
            type="submit"
            disabled={status === 'processing' || !agree}
            className={btn('primary', 'lg', 'mt-4 w-full')}>
            
            {status === 'processing' ?
            <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-paper/40 border-t-paper" aria-hidden="true" />
                Processing…
              </> :

            `Request to rent · ${formatMoney(breakdown.total)}`
            }
          </button>
          {!agree && <p className="mt-2 text-center text-xs text-muted">Accept the rental terms to continue.</p>}
        </aside>
      </form>
    </div>);

}