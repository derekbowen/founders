import React from 'react';
import { Link, useLocation, useParams, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, CalendarIcon, CheckCircle2Icon, ClockIcon, LockIcon, ShieldCheckIcon, TicketXIcon, UsersIcon } from 'lucide-react';
import { CardForm } from '../components/checkout/CardForm';
import { Button } from '../components/ui/Button';
import { TextField } from '../components/ui/TextField';
import { TextArea } from '../components/ui/TextArea';
import { SelectField } from '../components/ui/SelectField';
import { EmptyState } from '../components/ui/EmptyState';
import { StarRating } from '../components/ui/StarRating';
import { useAuth } from '../contexts/AuthContext';
import { useCheckout } from '../hooks/useCheckout';
import { dietaryOptions } from '../data/options';
import { brand } from '../data/brand';
import { getDestination, getExperience, getHost } from '../utils/lookup';
import { formatDate, formatDuration, formatPrice, formatTime, pluralize } from '../utils/format';

export function Checkout() {
  const { id } = useParams();
  const [params] = useSearchParams();
  const location = useLocation();
  const { user } = useAuth();
  const experience = getExperience(id);
  const date = params.get('date') ?? '';
  const time = params.get('time') ?? '';
  const guests = Math.max(1, Number(params.get('guests')) || 1);
  const privateGroup = params.get('private') === '1';
  const c = useCheckout(experience, guests, privateGroup, date, time);

  if (!experience || !date || !time || !c.price) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24">
        <EmptyState icon={TicketXIcon} title="Booking details missing" description="Pick a date and departure time on the experience page to continue." action={<Button to={experience ? `/l/${experience.id}` : '/s'}>Choose a departure</Button>} />
      </div>);

  }

  const host = getHost(experience.hostId);
  const destination = getDestination(experience.destinationId);

  if (c.status === 'success') {
    return (
      <div className="bg-sand-50 px-4 py-20">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-lg rounded-3xl bg-white p-8 text-center shadow-card sm:p-10">
          <CheckCircle2Icon className="mx-auto h-14 w-14 text-accent-600" aria-hidden />
          <h1 className="mt-4 text-2xl font-bold text-slate-900">You're booked!</h1>
          <p className="mt-2 text-slate-600">
            {host?.name.split(' ')[0]} will confirm your spot shortly. We've sent the details to {user?.email}.
          </p>
          <div className="mt-6 rounded-2xl bg-sand-100 p-4 text-left text-sm text-slate-700">
            <p className="font-semibold text-slate-900">{experience.title}</p>
            <p className="mt-1">{formatDate(date, 'EEEE, MMMM d')} · {formatTime(time)} · {pluralize(guests, 'guest')}</p>
            <p className="mt-1">Total {formatPrice(c.price.total, true)}</p>
          </div>
          <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:justify-center">
            <Button to={`/inbox/trips/${c.txId}`}>View booking in inbox</Button>
            <Button to="/s" variant="outline">Keep exploring</Button>
          </div>
        </motion.div>
      </div>);

  }

  const card = 'rounded-3xl border border-slate-200 bg-white p-6 sm:p-8';

  return (
    <div className="bg-sand-50">
      <div className="mx-auto max-w-page px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <Link to={`/l/${experience.id}?date=${date}&guests=${guests}`} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-900">
          <ArrowLeftIcon className="h-4 w-4" aria-hidden />Back to experience
        </Link>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">Confirm and pay</h1>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_420px]">
          <div className="order-2 space-y-6 lg:order-1">
            {!user ?
            <div className={card}>
                <h2 className="text-xl font-semibold text-slate-900">Log in to book</h2>
                <p className="mt-2 text-sm text-slate-600">You need an account to complete your booking and message your host.</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <Button to={`/login?redirect=${encodeURIComponent(location.pathname + location.search)}`}>Log in</Button>
                  <Button to={`/signup?redirect=${encodeURIComponent(location.pathname + location.search)}`} variant="outline">Create account</Button>
                </div>
              </div> :

            <form onSubmit={c.submit} noValidate className="space-y-6">
                <section className={card} aria-labelledby="guests-title">
                  <h2 id="guests-title" className="text-xl font-semibold text-slate-900">Guest details</h2>
                  <p className="mt-1 text-sm text-slate-600">Names help your host prepare. Dietary needs are shared only with them.</p>
                  <div className="mt-6 space-y-5">
                    {c.guestList.map((g, i) =>
                  <div key={i} className="grid gap-3 rounded-2xl bg-sand-50 p-4 sm:grid-cols-[1fr_200px]">
                        <TextField
                      label={i === 0 ? 'Lead guest' : `Guest ${i + 1}`}
                      value={g.name}
                      placeholder="Full name"
                      onChange={(e) => c.updateGuest(i, { name: e.target.value })}
                      error={c.guestErrors[i]} />
                    
                        <SelectField
                      label="Dietary needs"
                      value={g.dietary}
                      onChange={(e) => c.updateGuest(i, { dietary: e.target.value })}
                      options={dietaryOptions.map((d) => ({ value: d, label: d }))} />
                    
                      </div>
                  )}
                    <TextArea label="Allergies or other notes (optional)" rows={3} value={c.notes} onChange={(e) => c.setNotes(e.target.value)} placeholder="e.g. severe shellfish allergy, mobility needs" />
                  </div>
                </section>

                <section className={card} aria-labelledby="msg-title">
                  <h2 id="msg-title" className="text-xl font-semibold text-slate-900">Message your host</h2>
                  <TextArea className="mt-4" label={`Say hello to ${host?.name.split(' ')[0]} (optional)`} rows={3} value={c.message} onChange={(e) => c.setMessage(e.target.value)} placeholder="Tell them what you're excited about or ask a question." />
                </section>

                <section className={card} aria-labelledby="pay-title">
                  <h2 id="pay-title" className="mb-5 text-xl font-semibold text-slate-900">Payment</h2>
                  <CardForm values={c.card} errors={c.cardErrors} onChange={c.setCard} />
                </section>

                <p className="text-xs text-slate-600">
                  By selecting the button below, you agree to the <Link to="/terms" className="font-semibold underline">Terms of Service</Link> and the host's cancellation policy.
                </p>
                <Button type="submit" size="lg" fullWidth loading={c.status === 'processing'} leftIcon={<LockIcon className="h-4 w-4" />} className="sm:w-auto">
                  {c.status === 'processing' ? 'Processing payment…' : `Confirm and pay ${formatPrice(c.price.total, true)}`}
                </Button>
              </form>
            }
          </div>

          <aside className="order-1 lg:order-2 lg:sticky lg:top-24 lg:self-start" aria-label="Booking summary">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
              <img src={experience.image} alt="" className="h-44 w-full object-cover" />
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-accent-700">{destination?.city} · {formatDuration(experience.durationHours)}</p>
                <h2 className="mt-1 text-lg font-semibold text-slate-900">{experience.title}</h2>
                <StarRating rating={experience.rating} count={experience.reviewCount} className="mt-1" />
                <ul className="mt-5 space-y-2.5 border-t border-slate-100 pt-5 text-sm text-slate-700">
                  <li className="flex items-center gap-2.5"><CalendarIcon className="h-4 w-4 text-slate-500" aria-hidden />{formatDate(date, 'EEEE, MMMM d, yyyy')}</li>
                  <li className="flex items-center gap-2.5"><ClockIcon className="h-4 w-4 text-slate-500" aria-hidden />{formatTime(time)} departure</li>
                  <li className="flex items-center gap-2.5"><UsersIcon className="h-4 w-4 text-slate-500" aria-hidden />{pluralize(guests, 'guest')}{privateGroup && ' · Private group'}</li>
                </ul>
                <dl className="mt-5 space-y-2 border-t border-slate-100 pt-5 text-sm">
                  <div className="flex justify-between text-slate-700">
                    <dt>{privateGroup ? 'Private group rate' : `${formatPrice(experience.pricePerPerson)} × ${pluralize(guests, 'guest')}`}</dt>
                    <dd>{formatPrice(c.price.subtotal, true)}</dd>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <dt>Service fee</dt>
                    <dd>{formatPrice(c.price.serviceFee, true)}</dd>
                  </div>
                  <div className="flex justify-between border-t border-slate-100 pt-3 text-base font-semibold text-slate-900">
                    <dt>Total ({brand.currency})</dt>
                    <dd>{formatPrice(c.price.total, true)}</dd>
                  </div>
                </dl>
                <p className="mt-5 flex gap-2 rounded-xl bg-accent-50 p-3 text-xs text-accent-900">
                  <ShieldCheckIcon className="h-4 w-4 shrink-0" aria-hidden />
                  Free cancellation until 24 hours before {formatTime(time)} on {formatDate(date, 'MMM d')}.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>);

}