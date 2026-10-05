import React, { useState } from 'react';
import { Link, Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ChevronLeftIcon, AlertTriangleIcon, CalendarIcon, ClockIcon, UsersIcon, ShipWheelIcon } from 'lucide-react';
import { toast } from 'sonner';
import { CardForm, validateCard, type CardErrors, type CardValues } from '../components/checkout/CardForm';
import { PriceBreakdown } from '../components/PriceBreakdown';
import { Button } from '../components/ui/Button';
import { useMarketplace } from '../contexts/MarketplaceContext';
import { experienceOptions, cancellationPolicies, packages } from '../data/booking';
import { formatDate } from '../utils/format';
import { getPriceBreakdown, formatMoney } from '../utils/pricing';
import { cn, inputClass } from '../utils/ui';
import type { PackageId } from '../types/marketplace';

export function Checkout() {
  const { id = '' } = useParams();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { getListing, getUser, createTransaction } = useMarketplace();
  const listing = getListing(id);

  const date = params.get('date') ?? '';
  const pkg = params.get('pkg') as PackageId ?? 'full';
  const departure = params.get('dep') ?? packages.find((p) => p.id === pkg)?.departures[0] ?? '';
  const guests = Number(params.get('guests') ?? 2);
  const [withCaptain, setWithCaptain] = useState(params.get('captain') === '1' || listing?.captainMode === 'required');
  const [experience, setExperience] = useState('');
  const [message, setMessage] = useState('');
  const [card, setCard] = useState<CardValues>({ name: '', number: '', expiry: '', cvc: '', zip: '' });
  const [cardErrors, setCardErrors] = useState<CardErrors>({});
  const [expError, setExpError] = useState('');
  const [agree, setAgree] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!listing || !date) return <Navigate to={listing ? `/l/${listing.id}` : '/s'} replace />;

  const owner = getUser(listing.ownerId);
  const isBareboat = listing.captainMode === 'none' || listing.captainMode === 'optional' && !withCaptain;
  const needsCaptainWarning = isBareboat && experience === 'none';
  const total = getPriceBreakdown(listing, pkg, withCaptain).total;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateCard(card);
    setCardErrors(errs);
    const expErr = !experience ? 'Tell the owner about your boating experience.' : needsCaptainWarning ? 'Bareboat trips need prior experience or a license.' : '';
    setExpError(expErr);
    if (Object.keys(errs).length || expErr || !agree) {
      if (!agree && !expErr && !Object.keys(errs).length) toast.error('Please accept the rental terms to continue.');
      return;
    }
    setSubmitting(true);
    window.setTimeout(() => {
      const txId = createTransaction({ listingId: listing.id, tripDate: date, pkg, departure, withCaptain: !isBareboat, guests, experience, message });
      toast.success('Request sent! The owner usually responds within a few hours.');
      navigate(`/inbox/trips/${txId}`);
    }, 1200);
  };

  const sectionTitle = 'flex items-center gap-3 font-heading text-xl text-navy';
  const step = 'flex h-7 w-7 items-center justify-center rounded-full bg-navy font-sans text-xs font-bold text-white';

  return (
    <div className="w-full bg-sand-light/50">
      <div className="mx-auto max-w-content px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <Link to={`/l/${listing.id}`} className="inline-flex items-center gap-1 text-sm font-medium text-muted hover:text-navy">
          <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" /> Back to listing
        </Link>
        <h1 className="mt-3 font-heading text-3xl text-navy sm:text-4xl">Request to book</h1>

        <form onSubmit={submit} noValidate className="mt-8 grid gap-8 lg:grid-cols-[1fr_420px]">
          <div className="space-y-6">
            <section className="rounded-3xl border border-line bg-white p-6 sm:p-8" aria-labelledby="exp-heading">
              <h2 id="exp-heading" className={sectionTitle}>
                <span className={step}>1</span> Your boating experience
              </h2>
              <p className="mt-2 text-sm text-muted">{isBareboat ? 'You’ll be operating this boat yourself, so the owner needs to know your experience.' : 'Your captain handles the boat — this just helps them plan your day.'}</p>
              <fieldset className="mt-5 space-y-3">
                <legend className="sr-only">Experience level</legend>
                {experienceOptions.map((o) =>
                <label key={o.id} className={cn('flex cursor-pointer gap-3 rounded-xl border p-4 transition-colors', experience === o.id ? 'border-navy ring-1 ring-navy' : 'border-line hover:border-navy/40')}>
                    <input
                    type="radio"
                    name="experience"
                    value={o.id}
                    checked={experience === o.id}
                    onChange={() => {
                      setExperience(o.id);
                      setExpError('');
                    }}
                    className="mt-0.5 h-4 w-4 accent-navy" />
                  
                    <span>
                      <span className="block text-sm font-medium text-ink">{o.label}</span>
                      <span className="block text-xs text-muted">{o.hint}</span>
                    </span>
                  </label>
                )}
              </fieldset>
              {needsCaptainWarning &&
              <div className="mt-4 flex flex-col gap-3 rounded-xl border border-warning/30 bg-warning/5 p-4 sm:flex-row sm:items-center">
                  <AlertTriangleIcon className="h-5 w-5 shrink-0 text-warning" aria-hidden="true" />
                  <p className="flex-1 text-sm text-ink">Bareboat trips require experience or a boater card.{listing.captainMode === 'optional' && ` Add a captain for ${formatMoney(pkg === 'half' ? listing.pricing.captainHalfDay : listing.pricing.captainFullDay)}?`}</p>
                  {listing.captainMode === 'optional' &&
                <Button size="sm" onClick={() => setWithCaptain(true)}>
                      Add captain
                    </Button>
                }
                </div>
              }
              {expError && !needsCaptainWarning &&
              <p role="alert" className="mt-3 text-sm font-medium text-danger">
                  {expError}
                </p>
              }
            </section>

            <section className="rounded-3xl border border-line bg-white p-6 sm:p-8" aria-labelledby="msg-heading">
              <h2 id="msg-heading" className={sectionTitle}>
                <span className={step}>2</span> Message {owner?.name.split(' ')[0] ?? 'the owner'}
              </h2>
              <label htmlFor="msg" className="mt-2 block text-sm text-muted">
                Share the occasion, who’s coming and anything you’d like to plan.
              </label>
              <textarea id="msg" rows={4} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Hi! We’re celebrating a birthday and would love to stop somewhere for a swim…" className={inputClass + ' mt-3 resize-y'} />
            </section>

            <section className="rounded-3xl border border-line bg-white p-6 sm:p-8" aria-labelledby="pay-heading">
              <h2 id="pay-heading" className={sectionTitle}>
                <span className={step}>3</span> Payment
              </h2>
              <p className="mb-5 mt-2 text-sm text-muted">Your card is authorized now and charged only if the owner accepts.</p>
              <CardForm values={card} errors={cardErrors} onChange={setCard} />
              <label className="mt-6 flex cursor-pointer items-start gap-3 text-sm text-ink">
                <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-0.5 h-4 w-4 accent-navy" />
                <span>
                  I agree to the{' '}
                  <Link to="/terms" className="font-semibold underline underline-offset-2">
                    rental terms
                  </Link>
                  , the {cancellationPolicies[listing.cancellation].label.toLowerCase()} cancellation policy and a refundable fuel deposit hold.
                </span>
              </label>
            </section>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start" aria-label="Trip summary">
            <div className="overflow-hidden rounded-3xl border border-line bg-white">
              <img src={listing.images[0]} alt="" className="h-44 w-full object-cover" />
              <div className="p-6">
                <h2 className="font-heading text-xl text-navy">{listing.title}</h2>
                <p className="mt-1 text-sm text-muted">{listing.marina.name}</p>
                <ul className="mt-5 space-y-2.5 text-sm text-ink">
                  <li className="flex items-center gap-2.5">
                    <CalendarIcon className="h-4 w-4 text-coral-dark" aria-hidden="true" />
                    {formatDate(date)}
                  </li>
                  <li className="flex items-center gap-2.5">
                    <ClockIcon className="h-4 w-4 text-coral-dark" aria-hidden="true" />
                    {packages.find((p) => p.id === pkg)?.label} · {departure}
                  </li>
                  <li className="flex items-center gap-2.5">
                    <UsersIcon className="h-4 w-4 text-coral-dark" aria-hidden="true" />
                    {guests} {guests === 1 ? 'guest' : 'guests'}
                  </li>
                  <li className="flex items-center gap-2.5">
                    <ShipWheelIcon className="h-4 w-4 text-coral-dark" aria-hidden="true" />
                    {isBareboat ? 'Bareboat — you’re the skipper' : 'Captain included'}
                    {listing.captainMode === 'optional' &&
                    <button type="button" onClick={() => setWithCaptain((c) => !c)} className="ml-auto text-xs font-semibold text-navy underline underline-offset-2">
                        {withCaptain ? 'Remove' : 'Add'}
                      </button>
                    }
                  </li>
                </ul>
                <div className="mt-6 border-t border-line pt-5">
                  <PriceBreakdown listing={listing} pkg={pkg} withCaptain={withCaptain} />
                </div>
                <Button type="submit" variant="accent" size="lg" className="mt-6 w-full" loading={submitting}>
                  {submitting ? 'Sending request…' : `Request to book · ${formatMoney(total)}`}
                </Button>
              </div>
            </div>
          </aside>
        </form>
      </div>
    </div>);

}