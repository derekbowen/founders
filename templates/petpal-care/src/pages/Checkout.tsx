import React, { useMemo, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2Icon, ChevronLeftIcon } from 'lucide-react';
import { parseISO } from 'date-fns';
import { BookingSummary } from '../components/checkout/BookingSummary';
import { PetSelector } from '../components/checkout/PetSelector';
import { CardForm, validateCard, type CardErrors, type CardValues } from '../components/checkout/CardForm';
import { EmptyState } from '../components/common/EmptyState';
import { useToast } from '../components/ToastProvider';
import { myPets } from '../data/currentUser';
import { getListingById, getListingService, getServiceMeta } from '../utils/listing';
import { calculateBreakdown } from '../utils/pricing';
import { formatMoney } from '../utils/format';
import type { Pet } from '../types/user';

export function Checkout() {
  const { listingId } = useParams();
  const [params] = useSearchParams();
  const { addToast } = useToast();
  const listing = getListingById(listingId);

  const serviceId = params.get('service') ?? '';
  const variantId = params.get('variant') ?? '';
  const start = params.get('start') ?? '';
  const end = params.get('end') ?? undefined;
  const time = params.get('time') ?? undefined;
  const petCount = Math.max(1, Number(params.get('pets')) || 1);

  const [pets, setPets] = useState<Pet[]>(myPets);
  const [selected, setSelected] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [card, setCard] = useState<CardValues>({ number: '', expiry: '', cvc: '', name: '', postal: '' });
  const [cardErrors, setCardErrors] = useState<CardErrors>({});
  const [petError, setPetError] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const breakdown = useMemo(
    () =>
    listing ?
    calculateBreakdown({ listing, serviceId, variantId, start: start ? parseISO(start) : null, end: end ? parseISO(end) : null, petCount }) :
    null,
    [listing, serviceId, variantId, start, end, petCount]
  );

  const service = listing ? getListingService(listing, serviceId) : undefined;
  const variant = service?.variants.find((v) => v.id === variantId);
  const meta = getServiceMeta(serviceId);

  if (!listing || !breakdown || !variant || !meta) {
    return (
      <div className="container-page py-16">
        <EmptyState
          title="This booking link is incomplete"
          description="Head back to the listing to choose a service, dates and number of pets."
          action={
          <Link to={listing ? `/l/${listing.id}` : '/search'} className="btn btn-md btn-primary">
              {listing ? 'Back to listing' : 'Browse sitters'}
            </Link>
          } />
        
      </div>);

  }

  const togglePet = (id: string) => {
    setPetError('');
    setSelected((s) => s.includes(id) ? s.filter((x) => x !== id) : s.length >= petCount ? [...s.slice(1), id] : [...s, id]);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateCard(card);
    setCardErrors(errs);
    const petsOk = selected.length === petCount;
    setPetError(petsOk ? '' : `Please select ${petCount === 1 ? 'a pet' : `${petCount} pets`} for this booking.`);
    if (!petsOk || Object.keys(errs).length) return;
    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      addToast({ type: 'success', message: `Request sent to ${listing.sitter.firstName}` });
    }, 1400);
  };

  if (status === 'success') {
    const names = pets.filter((p) => selected.includes(p.id)).map((p) => p.name);
    return (
      <div className="container-page flex min-h-[70vh] items-center justify-center py-16">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="card w-full max-w-lg p-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent-100 text-accent-700">
            <CheckCircle2Icon className="h-9 w-9" aria-hidden="true" />
          </div>
          <h1 className="mt-5 text-2xl font-black text-ink-900">Request sent!</h1>
          <p className="mt-2 text-ink-700">
            {listing.sitter.firstName} usually responds {listing.sitter.responseTime}. We’ve authorized {formatMoney(breakdown.total, true)} on your card — you’ll only be charged if the request is accepted.
          </p>
          <p className="mt-3 text-sm font-semibold text-ink-600">Pets: {names.join(', ')}</p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/inbox/orders" className="btn btn-md btn-primary">
              Go to inbox
            </Link>
            <Link to="/search" className="btn btn-md btn-secondary">
              Keep browsing
            </Link>
          </div>
        </motion.div>
      </div>);

  }

  return (
    <div className="container-page py-8 lg:py-12">
      <Link to={`/l/${listing.id}`} className="inline-flex items-center gap-1 text-sm font-bold text-ink-700 hover:text-ink-900">
        <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" /> Back to listing
      </Link>
      <h1 className="mt-3 text-3xl font-black tracking-tight text-ink-900">Request to book</h1>

      <form onSubmit={submit} noValidate className="mt-8 grid gap-8 lg:grid-cols-[1fr_400px]">
        <div className="order-2 space-y-6 lg:order-1">
          <section className="card p-6" aria-labelledby="pets-step">
            <h2 id="pets-step" className="text-lg font-black text-ink-900">
              <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary-100 text-sm text-primary-800">1</span>
              Who’s staying?
            </h2>
            <div className="mt-4">
              <PetSelector
                pets={pets}
                selected={selected}
                required={petCount}
                onToggle={togglePet}
                onAdd={(p) => {
                  setPets((ps) => [...ps, p]);
                  togglePet(p.id);
                }}
                onNotesChange={(id, notes) => setPets((ps) => ps.map((p) => p.id === id ? { ...p, careNotes: notes } : p))}
                error={petError} />
              
            </div>
          </section>

          <section className="card p-6" aria-labelledby="message-step">
            <h2 id="message-step" className="text-lg font-black text-ink-900">
              <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary-100 text-sm text-primary-800">2</span>
              Say hello to {listing.sitter.firstName}
            </h2>
            <label htmlFor="message" className="sr-only">
              Message to sitter
            </label>
            <textarea
              id="message"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`Share a bit about your pet and your trip. ${listing.sitter.firstName} will see this with your request.`}
              className="field mt-4 resize-none" />
            
          </section>

          <section className="card p-6" aria-labelledby="payment-step">
            <h2 id="payment-step" className="text-lg font-black text-ink-900">
              <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary-100 text-sm text-primary-800">3</span>
              Payment
            </h2>
            <div className="mt-4">
              <CardForm values={card} errors={cardErrors} onChange={setCard} />
            </div>
          </section>

          <div>
            <button type="submit" disabled={status === 'submitting'} className="btn btn-lg btn-primary w-full sm:w-auto">
              {status === 'submitting' ?
              <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink-900 border-t-transparent" aria-hidden="true" />
                  Sending request…
                </> :

              `Send request · ${formatMoney(breakdown.total, true)}`
              }
            </button>
            <p className="mt-3 text-xs text-ink-600">
              By sending a request you agree to the{' '}
              <Link to="/terms" className="link">
                Terms of Service
              </Link>{' '}
              and the cancellation policy. You won’t be charged until {listing.sitter.firstName} accepts.
            </p>
          </div>
        </div>

        <aside className="order-1 lg:order-2">
          <div className="lg:sticky lg:top-24">
            <BookingSummary listing={listing} meta={meta} variant={variant} start={start} end={end} time={time} pets={petCount} breakdown={breakdown} />
          </div>
        </aside>
      </form>
    </div>);

}