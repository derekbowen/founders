import React, { useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CalendarIcon, CarIcon, CircleCheckIcon, ChevronLeftIcon, TentIcon, UsersIcon } from 'lucide-react';
import { CardForm, validateCard } from '../components/checkout/CardForm';
import type { CardDetails, CardErrors } from '../components/checkout/CardForm';
import { PriceBreakdownList } from '../components/listing/PriceBreakdownList';
import { EmptyState } from '../components/EmptyState';
import { Rating } from '../components/Rating';
import { brand } from '../data/brand';
import { formatMoney } from '../utils/currency';
import { formatDay, formatRange, nightsBetween } from '../utils/dates';
import { getListing, getSiteType, getUser } from '../utils/lookup';
import { computeBreakdown } from '../utils/pricing';

const arrivalWindows = ['12:00 PM – 2:00 PM', '2:00 PM – 4:00 PM', '4:00 PM – 6:00 PM', '6:00 PM – 8:00 PM', '8:00 PM – 10:00 PM'];

const cancellationCopy = {
  Flexible: 'Full refund if you cancel at least 24 hours before check-in.',
  Moderate: 'Full refund if you cancel at least 5 days before check-in.',
  Strict: '50% refund if you cancel at least 7 days before check-in.'
};

export function Checkout() {
  const { id } = useParams();
  const [params] = useSearchParams();
  const listing = getListing(id);
  const start = params.get('start') ?? '';
  const end = params.get('end') ?? '';
  const campers = Number(params.get('campers')) || 1;
  const vehicles = Number(params.get('vehicles')) || 0;

  const [arrival, setArrival] = useState(arrivalWindows[2]);
  const [message, setMessage] = useState('');
  const [card, setCard] = useState<CardDetails>({ number: '', expiry: '', cvc: '', name: '', postal: '' });
  const [errors, setErrors] = useState<CardErrors>({});
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState<'idle' | 'processing' | 'done'>('idle');

  const nights = nightsBetween(start, end);

  if (!listing || nights <= 0) {
    return (
      <div className="container-page py-20">
        <EmptyState
          icon={CalendarIcon}
          title="Choose your dates first"
          description="We need check-in and check-out dates before you can book."
          action={
          <Link to={listing ? `/l/${listing.id}` : '/s'} className="btn-primary">
              {listing ? 'Back to site' : 'Browse sites'}
            </Link>
          } />
        
      </div>);

  }

  const host = getUser(listing.hostId);
  const type = getSiteType(listing.siteType);
  const breakdown = computeBreakdown(listing, nights, campers);
  const editLink = `/l/${listing.id}?start=${start}&end=${end}&campers=${campers}`;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = validateCard(card);
    setErrors(v);
    if (Object.keys(v).length || !agreed) return;
    setStatus('processing');
    setTimeout(() => setStatus('done'), 1400);
  };

  if (status === 'done') {
    return (
      <div className="container-page max-w-2xl py-16">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="card p-8 text-center shadow-card md:p-12">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary-50 text-primary-700">
            <CircleCheckIcon size={34} aria-hidden="true" />
          </span>
          <h1 className="mt-6 text-3xl font-extrabold text-ink-900">{listing.instantBook ? 'You’re booked!' : 'Request sent'}</h1>
          <p className="mt-3 text-ink-600">
            {listing.instantBook ?
            `${listing.title} is yours for ${formatRange(start, end)}. Directions and arrival instructions are now in your inbox.` :
            `${host.name} usually responds ${host.responseTime ?? 'within a day'}. Your card is authorized but won’t be charged unless they accept.`}
          </p>
          <div className="mx-auto mt-8 flex max-w-sm items-center gap-4 rounded-2xl border border-sand-200 p-3 text-left">
            <img src={listing.images[0]} alt="" className="h-16 w-20 rounded-xl object-cover" />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-ink-900">{listing.title}</p>
              <p className="text-xs text-ink-500">
                {formatRange(start, end)} · arrive {arrival}
              </p>
              <p className="text-xs font-semibold text-ink-900">{formatMoney(breakdown.total)} total</p>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/inbox" className="btn-primary btn-lg">
              Go to inbox
            </Link>
            <Link to="/s" className="btn-outline btn-lg">
              Keep exploring
            </Link>
          </div>
        </motion.div>
      </div>);

  }

  return (
    <div className="container-page py-8 md:py-12">
      <Link to={editLink} className="inline-flex items-center gap-1 text-sm font-medium text-ink-600 hover:text-ink-900">
        <ChevronLeftIcon size={16} aria-hidden="true" /> Back to site
      </Link>
      <h1 className="mt-3 text-3xl font-extrabold text-ink-900 md:text-4xl">{listing.instantBook ? 'Confirm and pay' : 'Request to book'}</h1>

      <form onSubmit={submit} className="mt-8 grid gap-10 lg:grid-cols-[1fr_400px]" noValidate>
        <div className="space-y-8">
          <section className="card p-6" aria-labelledby="trip-heading">
            <div className="flex items-center justify-between">
              <h2 id="trip-heading" className="text-xl font-bold">
                Your trip
              </h2>
              <Link to={editLink} className="text-sm font-semibold text-primary-700 underline-offset-4 hover:underline">
                Edit
              </Link>
            </div>
            <dl className="mt-5 grid gap-5 sm:grid-cols-3">
              <TripFact icon={CalendarIcon} label="Dates" value={formatRange(start, end)} sub={`${nights} ${nights === 1 ? 'night' : 'nights'}`} />
              <TripFact icon={UsersIcon} label="Campers" value={`${campers} ${campers === 1 ? 'camper' : 'campers'}`} sub={`${listing.includedCampers} included`} />
              <TripFact icon={CarIcon} label="Vehicles" value={`${vehicles} ${vehicles === 1 ? 'vehicle' : 'vehicles'}`} sub={listing.maxVehicleLength ? `Up to ${listing.maxVehicleLength} ft` : 'No RVs'} />
            </dl>
            <div className="mt-6 grid gap-4 border-t border-sand-200 pt-6 sm:grid-cols-2">
              <p className="text-sm text-ink-600">
                <span className="block font-semibold text-ink-900">Check-in</span>
                {formatDay(start)} after {listing.checkIn}
              </p>
              <p className="text-sm text-ink-600">
                <span className="block font-semibold text-ink-900">Check-out</span>
                {formatDay(end)} before {listing.checkOut}
              </p>
            </div>
          </section>

          <section className="card p-6" aria-labelledby="arrival-heading">
            <h2 id="arrival-heading" className="text-xl font-bold">
              Arrival
            </h2>
            <label className="mt-4 block">
              <span className="label">Estimated arrival time</span>
              <select className="input" value={arrival} onChange={(e) => setArrival(e.target.value)}>
                {arrivalWindows.map((w) =>
                <option key={w}>{w}</option>
                )}
              </select>
              <span className="mt-1.5 block text-xs text-ink-500">Helps {host.name.split(' ')[0]} have your site ready. Check-in opens at {listing.checkIn}.</span>
            </label>
            <label className="mt-5 block">
              <span className="label">Message to {host.name.split(' ')[0]} (optional)</span>
              <textarea
                className="input min-h-[96px] resize-y"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Say hello, share who’s coming and anything about your rig or pets." />
              
            </label>
          </section>

          <section className="card p-6" aria-labelledby="payment-heading">
            <h2 id="payment-heading" className="text-xl font-bold">
              Payment
            </h2>
            <div className="mt-4">
              <CardForm value={card} errors={errors} onChange={setCard} />
            </div>
          </section>

          <section className="space-y-4">
            <div className="rounded-2xl bg-sand-100 p-5 text-sm text-ink-700">
              <p className="font-semibold text-ink-900">{listing.cancellation} cancellation policy</p>
              <p className="mt-1">{cancellationCopy[listing.cancellation]}</p>
            </div>
            <label className="flex items-start gap-3 text-sm text-ink-700">
              <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-0.5 h-4 w-4 rounded border-sand-400 accent-primary-700" />
              <span>
                I agree to the host’s site rules, {brand.name}’s{' '}
                <Link to="/terms" className="font-semibold text-primary-700 underline">
                  Terms
                </Link>{' '}
                and the cancellation policy.
              </span>
            </label>
            <button type="submit" className="btn-accent btn-lg w-full sm:w-auto" disabled={status === 'processing' || !agreed}>
              {status === 'processing' ?
              <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" aria-hidden="true" />
                  Processing…
                </> :
              listing.instantBook ?
              `Confirm and pay ${formatMoney(breakdown.total)}` :

              'Send booking request'
              }
            </button>
          </section>
        </div>

        <aside>
          <div className="card sticky top-24 p-6 shadow-card">
            <div className="flex gap-4 border-b border-sand-200 pb-5">
              <img src={listing.images[0]} alt="" className="h-24 w-28 shrink-0 rounded-xl object-cover" />
              <div className="min-w-0">
                <p className="inline-flex items-center gap-1 text-xs font-semibold text-primary-700">
                  <TentIcon size={12} aria-hidden="true" /> {type.label}
                </p>
                <p className="mt-1 font-serif font-bold leading-snug text-ink-900">{listing.title}</p>
                <div className="mt-1">
                  <Rating value={listing.rating} count={listing.reviewCount} />
                </div>
              </div>
            </div>
            <h2 className="mt-5 font-sans text-sm font-semibold uppercase tracking-wider text-ink-500">Price details</h2>
            <div className="mt-3">
              <PriceBreakdownList breakdown={breakdown} />
            </div>
          </div>
        </aside>
      </form>
    </div>);

}

function TripFact({ icon: Icon, label, value, sub }: {icon: typeof CalendarIcon;label: string;value: string;sub: string;}) {
  return (
    <div className="flex gap-3">
      <Icon size={20} className="mt-0.5 shrink-0 text-primary-700" aria-hidden="true" />
      <div>
        <dt className="text-xs font-semibold uppercase tracking-wider text-ink-500">{label}</dt>
        <dd className="font-semibold text-ink-900">{value}</dd>
        <dd className="text-xs text-ink-500">{sub}</dd>
      </div>
    </div>);

}