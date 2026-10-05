import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon, PartyPopperIcon } from 'lucide-react';
import { RequireAuth } from '../components/common/RequireAuth';
import { DetailsStep } from '../components/wizard/DetailsStep';
import { LocationStep } from '../components/wizard/LocationStep';
import { SizeStep } from '../components/wizard/SizeStep';
import { PricingStep } from '../components/wizard/PricingStep';
import { AvailabilityStep } from '../components/wizard/AvailabilityStep';
import { PhotosStep } from '../components/wizard/PhotosStep';
import { emptyDraft, wizardSteps } from '../data/wizard';
import { validateStep } from '../utils/listingDraft';
import { buttonClass } from '../utils/styles';
import { formatMoney } from '../utils/format';
import type { DraftErrors, ListingDraft, StepProps, WizardStepId } from '../types/listingDraft';

const stepComponents: Record<WizardStepId, React.ComponentType<StepProps>> = {
  details: DetailsStep,
  location: LocationStep,
  size: SizeStep,
  pricing: PricingStep,
  availability: AvailabilityStep,
  photos: PhotosStep
};

export function CreateListing() {
  return (
    <RequireAuth title="Log in to list your space">
      <Wizard />
    </RequireAuth>);

}

function Wizard() {
  const [draft, setDraft] = useState<ListingDraft>(emptyDraft);
  const [index, setIndex] = useState(0);
  const [maxVisited, setMaxVisited] = useState(0);
  const [errors, setErrors] = useState<DraftErrors>({});
  const [publishing, setPublishing] = useState(false);
  const [published, setPublished] = useState(false);

  const step = wizardSteps[index];
  const StepComponent = stepComponents[step.id];
  const isLast = index === wizardSteps.length - 1;

  const update = (patch: Partial<ListingDraft>) => {
    setDraft((d) => ({ ...d, ...patch }));
    setErrors((e) => {
      const next = { ...e };
      Object.keys(patch).forEach((k) => delete next[k as keyof ListingDraft]);
      return next;
    });
  };

  const next = () => {
    const e = validateStep(step.id, draft);
    setErrors(e);
    if (Object.keys(e).length) return;
    if (isLast) {
      setPublishing(true);
      window.setTimeout(() => {
        setPublishing(false);
        setPublished(true);
      }, 1200);
      return;
    }
    setIndex(index + 1);
    setMaxVisited((m) => Math.max(m, index + 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goTo = (i: number) => {
    if (i <= maxVisited) {
      setErrors({});
      setIndex(i);
    }
  };

  if (published) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-accent">
          <PartyPopperIcon size={28} aria-hidden />
        </span>
        <h1 className="mt-6 text-3xl font-bold tracking-tight">Your spot is live!</h1>
        <p className="mt-2 text-muted">
          “{draft.title}” is now visible to drivers{draft.hourlyEnabled ? ` from ${formatMoney(Number(draft.hourlyPrice))}/hr` : ''}. We’ll message you when the first request comes in.
        </p>
        {draft.photos[0] && <img src={draft.photos[0]} alt="" className="mx-auto mt-8 aspect-[4/3] w-full max-w-sm rounded-2xl object-cover" />}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/inbox?tab=hosting" className={buttonClass('primary')}>
            Go to hosting inbox
          </Link>
          <button
            type="button"
            onClick={() => {
              setDraft(emptyDraft);
              setIndex(0);
              setMaxVisited(0);
              setPublished(false);
            }}
            className={buttonClass('secondary')}>
            
            List another space
          </button>
        </div>
      </div>);

  }

  return (
    <div className="w-full bg-canvas pb-16">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 pt-8 sm:px-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:px-8">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <p className="text-sm font-semibold uppercase tracking-wider text-muted">List your space</p>
          <p className="mt-1 text-sm text-muted">
            Step {index + 1} of {wizardSteps.length}
          </p>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-line lg:hidden">
            <div className="h-full bg-accent transition-all" style={{ width: `${(index + 1) / wizardSteps.length * 100}%` }} />
          </div>
          <ol className="mt-5 hidden space-y-1 lg:block">
            {wizardSteps.map((s, i) => {
              const done = i < index || i <= maxVisited && i !== index && Object.keys(validateStep(s.id, draft)).length === 0;
              const current = i === index;
              return (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => goTo(i)}
                    disabled={i > maxVisited}
                    aria-current={current ? 'step' : undefined}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors disabled:cursor-not-allowed ${
                    current ? 'bg-navy font-semibold text-white' : 'hover:bg-surface disabled:opacity-50 disabled:hover:bg-transparent'}`
                    }>
                    
                    <span
                      className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-bold ${
                      current ? 'bg-accent text-ink' : done ? 'bg-success text-white' : 'border border-line bg-surface'}`
                      }>
                      
                      {done && !current ? <CheckIcon size={12} aria-hidden /> : i + 1}
                    </span>
                    {s.title}
                  </button>
                </li>);

            })}
          </ol>
        </aside>

        <section className="rounded-2xl border border-line bg-surface p-5 sm:p-8" aria-labelledby="step-title">
          <AnimatePresence mode="wait">
            <motion.div key={step.id} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.18 }}>
              <h1 id="step-title" className="text-2xl font-bold tracking-tight">
                {step.title}
              </h1>
              <p className="mt-1 text-muted">{step.description}</p>
              <div className="mt-8">
                <StepComponent draft={draft} update={update} errors={errors} />
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex items-center justify-between border-t border-line pt-6">
            <button type="button" onClick={() => setIndex(Math.max(0, index - 1))} disabled={index === 0} className={buttonClass('ghost')}>
              <ArrowLeftIcon size={16} aria-hidden /> Back
            </button>
            <button type="button" onClick={next} disabled={publishing} className={buttonClass(isLast ? 'accent' : 'primary', 'md', 'min-w-36')}>
              {publishing ?
              <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink border-t-transparent" aria-hidden /> Publishing…
                </> :
              isLast ?
              'Publish listing' :

              <>
                  Continue <ArrowRightIcon size={16} aria-hidden />
                </>
              }
            </button>
          </div>
        </section>
      </div>
    </div>);

}