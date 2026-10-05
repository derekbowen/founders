import React from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { AlertCircleIcon, ArrowLeftIcon, CalendarXIcon } from 'lucide-react';
import { Input } from '../components/Input';
import { CardForm } from '../components/checkout/CardForm';
import { ReservationSummary } from '../components/checkout/ReservationSummary';
import { RequireAuth } from '../components/common/RequireAuth';
import { EmptyState } from '../components/common/EmptyState';
import { useCheckout } from '../hooks/useCheckout';
import { getListing } from '../utils/lookup';
import { getQuote } from '../utils/pricing';
import { buttonClass, fieldClass, labelClass, textareaClass } from '../utils/styles';
import { formatMoney } from '../utils/format';
import { vehicleSizes } from '../data/vehicles';
import { fitsVehicle } from '../utils/listings';
import type { UnitType, VehicleSize } from '../types/listing';

export function Checkout() {
  return (
    <RequireAuth title="Log in to reserve this spot">
      <CheckoutContent />
    </RequireAuth>);

}

function CheckoutContent() {
  const { id } = useParams();
  const [params] = useSearchParams();
  const listing = getListing(id);
  const arrive = params.get('arrive') ?? '';
  const leave = params.get('leave') ?? '';
  const unit = params.get('unit') as UnitType ?? 'hour';
  const c = useCheckout(listing, arrive, leave, unit, params.get('plate') ?? '');

  const quote = listing ? getQuote(listing, arrive, leave, unit) : null;

  if (!listing || !quote || !quote.valid) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20">
        <EmptyState
          icon={<CalendarXIcon size={24} aria-hidden />}
          title="Your reservation details are incomplete"
          text="Pick a spot and choose your arrive and leave times to continue to checkout."
          action={<Link to={listing ? `/l/${listing.id}` : '/s'} className={buttonClass('primary')}>Back to spot</Link>} />
        
      </div>);

  }

  const tooBig = !fitsVehicle(listing.maxVehicle, c.vehicle.size);

  return (
    <div className="w-full bg-canvas pb-16">
      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 lg:px-8">
        <Link to={`/l/${listing.id}?${new URLSearchParams({ arrive, leave }).toString()}`} className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-ink">
          <ArrowLeftIcon size={16} aria-hidden /> Back to spot
        </Link>
        <h1 className="mt-4 text-3xl font-bold tracking-tight">{listing.instantBook ? 'Confirm and pay' : 'Request to reserve'}</h1>

        <form onSubmit={c.submit} noValidate className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_400px]">
          <div className="space-y-6">
            <Step n={1} title="Vehicle details">
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  id="co-plate"
                  label="License plate"
                  value={c.vehicle.plate}
                  onChange={(e) => c.setVehicle({ ...c.vehicle, plate: e.target.value.toUpperCase() })}
                  error={c.vehicleErrors.plate}
                  maxLength={8} />
                
                <Input
                  id="co-make"
                  label="Make & model"
                  placeholder="Subaru Outback"
                  value={c.vehicle.makeModel}
                  onChange={(e) => c.setVehicle({ ...c.vehicle, makeModel: e.target.value })}
                  error={c.vehicleErrors.makeModel} />
                
                <Input
                  id="co-color"
                  label="Color (optional)"
                  placeholder="Navy"
                  value={c.vehicle.color}
                  onChange={(e) => c.setVehicle({ ...c.vehicle, color: e.target.value })} />
                
                <div>
                  <label htmlFor="co-size" className={labelClass}>
                    Vehicle size
                  </label>
                  <select
                    id="co-size"
                    value={c.vehicle.size}
                    onChange={(e) => c.setVehicle({ ...c.vehicle, size: e.target.value as VehicleSize })}
                    className={fieldClass}>
                    
                    {vehicleSizes.map((v) =>
                    <option key={v}>{v}</option>
                    )}
                  </select>
                </div>
              </div>
              {tooBig &&
              <p className="mt-3 flex items-start gap-2 rounded-lg bg-accent/20 p-3 text-sm text-ink">
                  <AlertCircleIcon size={16} className="mt-0.5 shrink-0 text-warning" aria-hidden />
                  This spot fits vehicles up to {listing.maxVehicle}. Please double-check your vehicle will fit.
                </p>
              }
            </Step>

            <Step n={2} title="Message your host" optional>
              <label htmlFor="co-msg" className="sr-only">
                Message
              </label>
              <textarea
                id="co-msg"
                rows={3}
                value={c.message}
                onChange={(e) => c.setMessage(e.target.value)}
                placeholder="Let them know when you’ll arrive or ask about access."
                className={textareaClass} />
              
            </Step>

            <Step n={3} title="Payment">
              <CardForm value={c.card} errors={c.cardErrors} onChange={c.setCard} />
            </Step>

            {c.formError &&
            <p role="alert" className="flex items-center gap-2 rounded-lg bg-danger/10 p-3 text-sm font-medium text-danger">
                <AlertCircleIcon size={16} aria-hidden /> {c.formError}
              </p>
            }

            <button type="submit" className={buttonClass('accent', 'lg', 'w-full sm:w-auto sm:min-w-64')} disabled={c.submitting}>
              {c.submitting ?
              <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink border-t-transparent" aria-hidden />
                  Processing…
                </> :

              `${listing.instantBook ? 'Pay' : 'Request'} ${formatMoney(quote.total)}`
              }
            </button>
            <p className="text-xs text-muted">
              By selecting the button, you agree to the{' '}
              <Link to="/terms" className="underline hover:text-ink">
                Terms of service
              </Link>{' '}
              and cancellation policy.
              {!listing.instantBook && ' Your card is only charged when the host confirms.'}
            </p>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <ReservationSummary listing={listing} quote={quote} arrive={arrive} leave={leave} unit={unit} plate={c.vehicle.plate} />
          </aside>
        </form>
      </div>
    </div>);

}

function Step({ n, title, optional, children }: {n: number;title: string;optional?: boolean;children: React.ReactNode;}) {
  return (
    <section className="rounded-2xl border border-line bg-surface p-5 sm:p-6" aria-labelledby={`step-${n}`}>
      <h2 id={`step-${n}`} className="mb-4 flex items-center gap-3 text-lg font-bold">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-navy text-xs font-bold text-white">{n}</span>
        {title}
        {optional && <span className="text-sm font-normal text-muted">Optional</span>}
      </h2>
      {children}
    </section>);

}