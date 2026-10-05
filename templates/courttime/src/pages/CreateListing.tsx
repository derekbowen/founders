import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircleIcon, CheckIcon, PartyPopperIcon } from 'lucide-react';
import { Button } from '../components/Button';
import { AmenitiesStep } from '../components/wizard/AmenitiesStep';
import { DetailsStep } from '../components/wizard/DetailsStep';
import { HoursStep } from '../components/wizard/HoursStep';
import { LocationStep } from '../components/wizard/LocationStep';
import { PhotosStep } from '../components/wizard/PhotosStep';
import { PricingStep } from '../components/wizard/PricingStep';
import { SportSurfaceStep } from '../components/wizard/SportSurfaceStep';
import { initialListingDraft, wizardSteps } from '../data/listingDraft';
import { ListingDraft, StepProps, WizardStepId } from '../types/listingDraft';
import { formatMoney } from '../utils/format';
import { validateStep } from '../utils/listingDraft';

const stepComponents: Record<WizardStepId, (props: StepProps) => JSX.Element> = {
  details: DetailsStep,
  sport: SportSurfaceStep,
  amenities: AmenitiesStep,
  location: LocationStep,
  pricing: PricingStep,
  hours: HoursStep,
  photos: PhotosStep
};

export function CreateListing() {
  const [draft, setDraft] = useState<ListingDraft>(initialListingDraft);
  const [index, setIndex] = useState(0);
  const [completed, setCompleted] = useState<Set<WizardStepId>>(new Set());
  const [error, setError] = useState<string | null>(null);
  const [published, setPublished] = useState(false);

  const step = wizardSteps[index];
  const StepComponent = stepComponents[step.id];
  const isLast = index === wizardSteps.length - 1;
  const update = (patch: Partial<ListingDraft>) => {
    setDraft((prev) => ({ ...prev, ...patch }));
    setError(null);
  };

  const goTo = (target: number) => {
    if (target <= index || wizardSteps.slice(0, target).every((s) => completed.has(s.id))) {
      setIndex(target);
      setError(null);
    }
  };

  const next = () => {
    const problem = validateStep(step.id, draft);
    if (problem) return setError(problem);
    setCompleted((prev) => new Set(prev).add(step.id));
    if (isLast) setPublished(true);else
    setIndex(index + 1);
  };

  if (published) {
    return (
      <div className="container-page max-w-2xl py-16">
        <div className="card overflow-hidden text-center">
          {draft.photos[0] && <img src={draft.photos[0]} alt="" className="h-48 w-full object-cover" />}
          <div className="p-8">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-accent text-ink"><PartyPopperIcon size={26} aria-hidden="true" /></span>
            <h1 className="heading-lg mt-4">Your court is live</h1>
            <p className="mt-2 text-slate-600">
              <strong>{draft.title}</strong> at {draft.clubName} is now bookable from {formatMoney(draft.pricePerHour)}/hour
              {draft.openPlayEnabled ? ` with open-play seats at ${formatMoney(draft.pricePerSeat)}` : ''}.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link to="/inbox?tab=hosting" className="btn btn-primary btn-md">Go to hosting inbox</Link>
              <Link to="/profile/u-me" className="btn btn-outline btn-md">View your profile</Link>
            </div>
          </div>
        </div>
      </div>);

  }

  return (
    <div className="container-page py-8 lg:py-12">
      <p className="eyebrow">List your court</p>
      <h1 className="heading-lg mt-1">Create a listing</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
        <nav aria-label="Listing steps" className="lg:sticky lg:top-24 lg:self-start">
          <ol className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0">
            {wizardSteps.map((s, i) => {
              const done = completed.has(s.id);
              const active = i === index;
              return (
                <li key={s.id} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => goTo(i)}
                    aria-current={active ? 'step' : undefined}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${active ? 'bg-white font-semibold shadow-sm ring-1 ring-slate-200' : 'text-slate-600 hover:bg-white'}`}>
                    
                    <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-bold ${done ? 'bg-brand text-white' : active ? 'bg-accent text-ink' : 'bg-slate-200 text-slate-600'}`}>
                      {done ? <CheckIcon size={13} strokeWidth={3} aria-hidden="true" /> : i + 1}
                    </span>
                    {s.label}
                  </button>
                </li>);

            })}
          </ol>
        </nav>

        <section className="card p-6 sm:p-8" aria-labelledby="step-heading">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Step {index + 1} of {wizardSteps.length}</p>
          <h2 id="step-heading" className="heading-md mt-1">{step.label}</h2>
          <p className="mt-1 text-sm text-slate-600">{step.description}</p>
          <div className="mt-6">
            <AnimatePresence mode="wait">
              <motion.div key={step.id} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.16 }}>
                <StepComponent draft={draft} update={update} />
              </motion.div>
            </AnimatePresence>
          </div>
          {error &&
          <p className="mt-6 flex items-center gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-700" role="alert">
              <AlertCircleIcon size={16} aria-hidden="true" /> {error}
            </p>
          }
          <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
            <Button variant="tertiary" onClick={() => goTo(index - 1)} disabled={index === 0}>Back</Button>
            <button type="button" onClick={next} className="btn btn-primary btn-md">
              {isLast ? 'Publish listing' : 'Save & continue'}
            </button>
          </div>
        </section>
      </div>
    </div>);

}