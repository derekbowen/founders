import React, { useMemo, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { differenceInCalendarDays, format } from 'date-fns';
import { ArrowLeftIcon, CalendarXIcon, ShieldCheckIcon } from 'lucide-react';
import { toast } from 'sonner';
import { BookingSummary } from '../components/checkout/BookingSummary';
import { CardForm } from '../components/checkout/CardForm';
import { PetSelector } from '../components/checkout/PetSelector';
import { Button } from '../components/ui/Button';
import { ButtonLink } from '../components/ui/ButtonLink';
import { CheckboxField } from '../components/ui/CheckboxField';
import { EmptyState } from '../components/ui/EmptyState';
import { TextArea } from '../components/ui/TextArea';
import { useBookings } from '../contexts/BookingsContext';
import { brand } from '../data/brand';
import { listings } from '../data/listings';
import { useCardForm } from '../hooks/useCardForm';
import { dayFromOffset, formatMoney, fromInputDate, pluralize } from '../utils/format';
import { computeBreakdown, getService } from '../utils/pricing';

export function Checkout() {
  const { id } = useParams();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { pets, addPet, addTransaction } = useBookings();
  const card = useCardForm();

  const listing = listings.find((l) => l.id === id);
  const offering = listing?.services.find((s) => s.serviceId === params.get('service'));
  const variation = offering?.variations.find((v) => v.id === params.get('variation')) ?? offering?.variations[0];
  const service = offering ? getService(offering.serviceId) : null;
  const startDate = fromInputDate(params.get('start') ?? '');
  const endDate = fromInputDate(params.get('end') ?? '');
  const time = params.get('time') ?? '';
  const requestedPets = Math.max(1, Number(params.get('pets')) || 1);
  const units = service?.unitType === 'night' && startDate && endDate ? differenceInCalendarDays(endDate, startDate) : startDate ? 1 : 0;

  const [selected, setSelected] = useState<string[]>(() => pets.slice(0, requestedPets).map((p) => p.id));
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [message, setMessage] = useState('');
  const [agree, setAgree] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [petError, setPetError] = useState('');
  const [agreeError, setAgreeError] = useState('');

  const petCount = Math.max(1, selected.length);
  const breakdown = useMemo(
    () =>
    variation && offering && service ?
    computeBreakdown({ unitPrice: variation.price, units: Math.max(units, 1), pets: petCount, extraPetPrice: offering.extraPetPrice, unitLabel: service.unitLabel }) :
    null,
    [variation, offering, service, units, petCount]
  );

  if (!listing || !offering || !variation || !service || !startDate || units <= 0 || !breakdown) {
    return (
      <div className="mx-auto w-full max-w-2xl px-4 py-24">
        <EmptyState
          icon={<CalendarXIcon className="h-7 w-7" />}
          title="Your booking details are incomplete"
          text="Pick a service, dates and number of pets on the sitter’s page to continue to checkout."
          action={<ButtonLink to={listing ? `/l/${listing.id}` : '/s'}>{listing ? `Back to ${listing.sitter.firstName}’s listing` : 'Browse sitters'}</ButtonLink>} />
        
      </div>);

  }

  const selectedPets = pets.filter((p) => selected.includes(p.id));
  const dateText =
  service.unitType === 'night' && endDate ?
  `${format(startDate, 'EEE, MMM d')} → ${format(endDate, 'EEE, MMM d')} · ${units} ${pluralize('night', units)}` :
  `${format(startDate, 'EEE, MMM d')} at ${time}`;

  const togglePet = (petId: string) => {
    setPetError('');
    setSelected((list) => {
      if (list.includes(petId)) return list.filter((x) => x !== petId);
      if (list.length >= listing.maxPets) {
        setPetError(`${listing.sitter.firstName} can care for up to ${listing.maxPets} ${pluralize('pet', listing.maxPets)} at a time.`);
        return list;
      }
      return [...list, petId];
    });
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    let ok = true;
    if (selected.length === 0) {
      setPetError('Select at least one pet.');
      ok = false;
    } else if (!listing.acceptsCats && selectedPets.some((p) => p.species === 'Cat')) {
      setPetError(`${listing.sitter.firstName} doesn’t accept cats. Please deselect any cats.`);
      ok = false;
    }
    if (!card.validate()) ok = false;
    if (!agree) {
      setAgreeError('Please accept the terms to continue.');
      ok = false;
    }
    if (!ok) {
      toast.error('Please fix the highlighted fields.');
      return;
    }
    setSubmitting(true);
    window.setTimeout(() => {
      const startDay = differenceInCalendarDays(startDate, dayFromOffset(0));
      const txId = addTransaction({
        role: 'customer',
        listingId: listing.id,
        listingTitle: listing.title,
        counterpartName: listing.sitter.name,
        counterpartAvatar: listing.sitter.avatar,
        petNames: selectedPets.map((p) => p.name),
        petPhoto: selectedPets[0]?.photo,
        serviceId: offering.serviceId,
        variationLabel: variation.label,
        unitPrice: variation.price,
        extraPetPrice: offering.extraPetPrice,
        startDay,
        endDay: service.unitType === 'night' ? startDay + units : undefined,
        time: service.unitType === 'fixed' ? time : undefined,
        pets: selected.length,
        note: message
      });
      toast.success(`Request sent to ${listing.sitter.firstName}!`);
      navigate(`/order/${txId}`);
    }, 1200);
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <Link to={`/l/${listing.id}`} className="inline-flex items-center gap-1.5 text-sm font-bold text-stone-600 hover:text-stone-900">
        <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" /> Back to listing
      </Link>
      <h1 className="mt-4 text-3xl font-black tracking-tight text-stone-900 sm:text-4xl">Request to book</h1>

      <form onSubmit={submit} className="mt-8 grid gap-10 lg:grid-cols-[1fr_400px]" noValidate>
        <div className="space-y-10">
          <section aria-labelledby="pets-heading">
            <h2 id="pets-heading" className="text-xl font-black text-stone-900">
              Who’s staying?
            </h2>
            <div className="mt-2">
              <PetSelector
                pets={pets}
                selected={selected}
                onToggle={togglePet}
                notes={notes}
                onNoteChange={(petId, value) => setNotes((n) => ({ ...n, [petId]: value }))}
                onAddPet={(pet) => {
                  const created = addPet(pet);
                  if (selected.length < listing.maxPets) setSelected((s) => [...s, created.id]);
                }}
                maxPets={listing.maxPets}
                error={petError} />
              
            </div>
          </section>

          <section aria-labelledby="message-heading" className="border-t border-stone-200 pt-10">
            <h2 id="message-heading" className="text-xl font-black text-stone-900">
              Say hello to {listing.sitter.firstName}
            </h2>
            <TextArea
              id="checkout-message"
              containerClassName="mt-4"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`Hi ${listing.sitter.firstName}! Tell us a bit about your pet’s routine and anything you’d like to know…`}
              hint="Optional, but sitters are more likely to accept requests with a personal message." />
            
          </section>

          <section aria-labelledby="payment-heading" className="border-t border-stone-200 pt-10">
            <h2 id="payment-heading" className="text-xl font-black text-stone-900">
              Payment
            </h2>
            <p className="mt-1 text-sm text-stone-500">Your card is authorized now and charged only when {listing.sitter.firstName} accepts.</p>
            <div className="mt-5">
              <CardForm card={card} />
            </div>
          </section>

          <section className="border-t border-stone-200 pt-8">
            <CheckboxField
              id="agree-terms"
              checked={agree}
              onChange={(v) => {
                setAgree(v);
                setAgreeError('');
              }}
              label={
              <>
                  I agree to the{' '}
                  <Link to="/terms" className="text-primary-700 underline">
                    Terms of service
                  </Link>{' '}
                  and cancellation policy
                </>
              }
              description="Free cancellation until the sitter accepts. 48+ hours before the start date: full refund excluding the service fee." />
            
            {agreeError && <p className="mt-2 text-sm font-semibold text-red-600">{agreeError}</p>}
            <Button type="submit" size="lg" className="mt-6 w-full sm:w-auto" loading={submitting}>
              {submitting ? 'Sending request…' : `Request to book · ${formatMoney(breakdown.total)}`}
            </Button>
          </section>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <BookingSummary
            photo={listing.photos[0]}
            title={listing.title}
            subtitle={`Hosted by ${listing.sitter.name} · ${listing.neighborhood}`}
            serviceId={offering.serviceId}
            serviceLabel={service.label}
            variationLabel={variation.label}
            dateText={dateText}
            petsText={selectedPets.length ? selectedPets.map((p) => p.name).join(', ') : 'No pets selected'}
            breakdown={breakdown} />
          
          <div className="flex gap-3 rounded-2xl bg-accent-50 p-4 text-sm text-accent-900">
            <ShieldCheckIcon className="h-5 w-5 shrink-0 text-accent-700" aria-hidden="true" />
            <p>
              <span className="font-extrabold">Covered by the {brand.guaranteeName}.</span> Reservation protection and 24/7 support for every booking.
            </p>
          </div>
        </aside>
      </form>
    </div>);

}