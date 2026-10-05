import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon, PartyPopperIcon } from 'lucide-react';
import { AmenitiesStep } from '../components/wizard/AmenitiesStep';
import { DetailsStep } from '../components/wizard/DetailsStep';
import { HoursStep } from '../components/wizard/HoursStep';
import { LocationStep } from '../components/wizard/LocationStep';
import { PhotosStep } from '../components/wizard/PhotosStep';
import { PricingStep } from '../components/wizard/PricingStep';
import { SeatsStep } from '../components/wizard/SeatsStep';
import { BrandButton } from '../components/ui/BrandButton';
import { useAuth } from '../contexts/AuthContext';
import { useListingWizard, wizardSteps } from '../hooks/useListingWizard';
import { formatMoney } from '../utils/format';
import { getSpaceType } from '../utils/lookup';

export function CreateListing() {
  const w = useListingWizard();
  const { user } = useAuth();
  const current = wizardSteps[w.step];
  const isLast = w.step === wizardSteps.length - 1;
  const stepProps = { draft: w.draft, update: w.update, errors: w.errors };

  if (w.published) {
    const type = getSpaceType(w.draft.spaceType);
    return (
      <div className="container-page max-w-2xl py-16 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand-50 text-brand-700">
          <PartyPopperIcon size={26} aria-hidden="true" />
        </span>
        <h1 className="mt-5 text-3xl font-semibold">Your space is submitted!</h1>
        <p className="mt-2 text-ink-muted">Our team reviews new listings within 24 hours. We’ll email you as soon as it’s live.</p>
        <div className="mx-auto mt-8 flex max-w-md gap-4 rounded-2xl border border-line bg-white p-4 text-left shadow-card">
          {w.draft.photos[0] && <img src={w.draft.photos[0]} alt="" className="h-20 w-24 rounded-xl object-cover" />}
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">{type.label} · Pending review</p>
            <p className="truncate font-semibold">{w.draft.title}</p>
            <p className="text-sm text-ink-muted">{w.draft.city} · {w.draft.seats} {w.draft.seats === 1 ? type.unit.one : type.unit.many}</p>
            <p className="mt-1 text-sm"><strong>{formatMoney(Number(w.draft.pricePerHour))}</strong> /hour · <strong>{formatMoney(Number(w.draft.pricePerDay))}</strong> /day</p>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to={`/u/${user?.id ?? 'u-me'}`} className="btn-primary">Go to your profile</Link>
          <Link to="/account/payouts" className="btn-secondary">Set up payouts</Link>
          <button type="button" onClick={w.restart} className="btn-secondary">List another space</button>
        </div>
      </div>);

  }

  return (
    <div className="container-page py-8 lg:py-12">
      <div className="grid gap-10 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside>
          <p className="eyebrow">List your space</p>
          <p className="mt-2 text-sm text-ink-muted lg:hidden">
            Step {w.step + 1} of {wizardSteps.length}
          </p>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-mist lg:hidden" aria-hidden="true">
            <div className="h-full rounded-full bg-brand-700 transition-all" style={{ width: `${(w.step + 1) / wizardSteps.length * 100}%` }} />
          </div>
          <ol className="mt-6 hidden space-y-1 lg:block">
            {wizardSteps.map((s, i) => {
              const done = i < w.step || i <= w.maxReached && i !== w.step;
              const active = i === w.step;
              const reachable = i <= w.maxReached;
              return (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => w.goTo(i)}
                    disabled={!reachable}
                    aria-current={active ? 'step' : undefined}
                    className={`focus-ring flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors disabled:cursor-not-allowed ${
                    active ? 'bg-brand-50 font-semibold text-brand-900' : reachable ? 'text-ink hover:bg-mist' : 'text-ink-subtle'}`
                    }>
                    
                    <span
                      className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-bold ${
                      active ? 'bg-brand-700 text-white' : done ? 'bg-brand-100 text-brand-800' : 'border border-line text-ink-subtle'}`
                      }>
                      
                      {done && !active ? <CheckIcon size={13} aria-hidden="true" /> : i + 1}
                    </span>
                    {s.title}
                  </button>
                </li>);

            })}
          </ol>
        </aside>

        <div className="max-w-2xl">
          <h1 className="text-3xl font-semibold">{current.title}</h1>
          <p className="mt-1 text-ink-muted">{current.subtitle}</p>

          <div className="mt-8 rounded-2xl border border-line bg-white p-5 sm:p-7">
            {w.step === 0 && <DetailsStep {...stepProps} />}
            {w.step === 1 && <SeatsStep {...stepProps} />}
            {w.step === 2 && <AmenitiesStep {...stepProps} />}
            {w.step === 3 && <LocationStep {...stepProps} />}
            {w.step === 4 && <PricingStep {...stepProps} />}
            {w.step === 5 && <HoursStep {...stepProps} />}
            {w.step === 6 && <PhotosStep {...stepProps} />}
          </div>

          <div className="mt-6 flex items-center justify-between gap-3">
            <BrandButton tone="ghost" onClick={w.back} disabled={w.step === 0} leftIcon={<ArrowLeftIcon size={16} aria-hidden="true" />}>
              Back
            </BrandButton>
            <BrandButton
              onClick={w.next}
              loading={w.publishing}
              size="large"
              rightIcon={isLast ? undefined : <ArrowRightIcon size={16} aria-hidden="true" />}>
              
              {isLast ? 'Publish listing' : 'Continue'}
            </BrandButton>
          </div>
        </div>
      </div>
    </div>);

}