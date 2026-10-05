import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckIcon, PartyPopperIcon } from 'lucide-react';
import { toast } from 'sonner';
import { StepDetails } from '../components/wizard/StepDetails';
import { StepSpecs } from '../components/wizard/StepSpecs';
import { StepCaptain } from '../components/wizard/StepCaptain';
import { StepLocation } from '../components/wizard/StepLocation';
import { StepPricing } from '../components/wizard/StepPricing';
import { StepAvailability } from '../components/wizard/StepAvailability';
import { StepPhotos } from '../components/wizard/StepPhotos';
import { Button } from '../components/ui/Button';
import { useMarketplace } from '../contexts/MarketplaceContext';
import { emptyDraft, wizardSteps } from '../data/listingOptions';
import { draftToListing, validateStep } from '../utils/listingDraft';
import { cn } from '../utils/ui';
import type { DraftErrors, ListingDraft, StepProps, WizardStepId } from '../types/listingDraft';

const stepComponents: Record<WizardStepId, React.ComponentType<StepProps>> = {
  details: StepDetails,
  specs: StepSpecs,
  captain: StepCaptain,
  location: StepLocation,
  pricing: StepPricing,
  availability: StepAvailability,
  photos: StepPhotos
};

export function CreateListing() {
  const { addListing, currentUser } = useMarketplace();
  const [draft, setDraft] = useState<ListingDraft>(emptyDraft);
  const [index, setIndex] = useState(0);
  const [completed, setCompleted] = useState<Set<WizardStepId>>(new Set());
  const [errors, setErrors] = useState<DraftErrors>({});
  const [publishedId, setPublishedId] = useState<string | null>(null);
  const [publishing, setPublishing] = useState(false);

  const step = wizardSteps[index];
  const StepComponent = stepComponents[step.id];
  const isLast = index === wizardSteps.length - 1;

  const update = (patch: Partial<ListingDraft>) => {
    setDraft((d) => ({ ...d, ...patch }));
    setErrors((e) => {
      const next = { ...e };
      (Object.keys(patch) as (keyof ListingDraft)[]).forEach((k) => delete next[k]);
      return next;
    });
  };

  const goTo = (i: number) => {
    // Allow jumping back freely, or forward only to steps already completed.
    if (i <= index || wizardSteps.slice(0, i).every((s) => completed.has(s.id))) {
      setErrors({});
      setIndex(i);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const next = () => {
    const errs = validateStep(step.id, draft);
    setErrors(errs);
    if (Object.keys(errs).length) {
      toast.error('Please fix the highlighted fields.');
      return;
    }
    setCompleted((c) => new Set(c).add(step.id));
    if (isLast) {
      const firstIncomplete = wizardSteps.findIndex((s) => Object.keys(validateStep(s.id, draft)).length > 0);
      if (firstIncomplete !== -1) {
        setIndex(firstIncomplete);
        setErrors(validateStep(wizardSteps[firstIncomplete].id, draft));
        return;
      }
      setPublishing(true);
      window.setTimeout(() => {
        const listing = draftToListing(draft, currentUser.id);
        addListing(listing);
        setPublishedId(listing.id);
        setPublishing(false);
      }, 900);
      return;
    }
    setErrors({});
    setIndex(index + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (publishedId) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success">
          <PartyPopperIcon className="h-7 w-7" aria-hidden="true" />
        </span>
        <h1 className="mt-6 font-heading text-4xl text-navy">Your boat is live!</h1>
        <p className="mt-3 text-muted">“{draft.title}” now appears in search. You’ll get a notification in your inbox when a guest requests a trip.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button to={`/l/${publishedId}`}>View listing</Button>
          <Button to="/inbox/listings" variant="outline">
            Go to inbox
          </Button>
        </div>
      </div>);

  }

  return (
    <div className="w-full bg-sand-light/50">
      <div className="mx-auto grid max-w-content gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[280px_1fr] lg:px-8 lg:py-12">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <h1 className="font-heading text-2xl text-navy">List your boat</h1>
          <p className="mt-1 text-sm text-muted">
            Step {index + 1} of {wizardSteps.length}
          </p>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-line lg:hidden">
            <div className="h-full bg-navy transition-all" style={{ width: `${(index + 1) / wizardSteps.length * 100}%` }} />
          </div>
          <nav aria-label="Listing steps" className="mt-6 hidden lg:block">
            <ol className="space-y-1">
              {wizardSteps.map((s, i) => {
                const done = completed.has(s.id);
                const active = i === index;
                return (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      aria-current={active ? 'step' : undefined}
                      className={cn('flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors', active ? 'bg-white shadow-card' : 'hover:bg-white/70')}>
                      
                      <span className={cn('flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold', done ? 'bg-success text-white' : active ? 'bg-navy text-white' : 'border border-line bg-white text-muted')}>
                        {done ? <CheckIcon className="h-3.5 w-3.5" aria-hidden="true" /> : i + 1}
                      </span>
                      <span>
                        <span className={cn('block text-sm font-semibold', active ? 'text-navy' : 'text-ink')}>{s.label}</span>
                        <span className="block text-xs text-muted">{s.description}</span>
                      </span>
                    </button>
                  </li>);

              })}
            </ol>
          </nav>
        </aside>

        <section className="rounded-3xl border border-line bg-white" aria-labelledby="step-title">
          <div className="border-b border-line px-6 py-5 sm:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-coral-dark">Step {index + 1}</p>
            <h2 id="step-title" className="mt-1 font-heading text-2xl text-navy">
              {step.label}
            </h2>
            <p className="text-sm text-muted">{step.description}</p>
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={step.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.18 }} className="px-6 py-8 sm:px-8">
              <StepComponent draft={draft} update={update} errors={errors} />
            </motion.div>
          </AnimatePresence>
          <div className="flex items-center justify-between gap-3 border-t border-line px-6 py-4 sm:px-8">
            <Button variant="ghost" onClick={() => goTo(index - 1)} disabled={index === 0}>
              Back
            </Button>
            <Button variant={isLast ? 'accent' : 'primary'} onClick={next} loading={publishing}>
              {isLast ? 'Publish listing' : 'Save & continue'}
            </Button>
          </div>
        </section>
      </div>
    </div>);

}