import React from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckIcon, PartyPopperIcon } from 'lucide-react';
import { AboutStep } from '../components/createListing/AboutStep';
import { ServicesStep } from '../components/createListing/ServicesStep';
import { HomeStep } from '../components/createListing/HomeStep';
import { PetPreferencesStep } from '../components/createListing/PetPreferencesStep';
import { AvailabilityStep } from '../components/createListing/AvailabilityStep';
import { PhotosStep } from '../components/createListing/PhotosStep';
import { useListingWizard } from '../hooks/useListingWizard';
import { wizardSteps } from '../data/wizard';
import { currentUser } from '../data/currentUser';
import type { StepProps, WizardStepId } from '../types/wizard';

const stepComponents: Record<WizardStepId, React.ComponentType<StepProps>> = {
  about: AboutStep,
  services: ServicesStep,
  home: HomeStep,
  pets: PetPreferencesStep,
  availability: AvailabilityStep,
  photos: PhotosStep
};

export function CreateListing() {
  const w = useListingWizard();
  const StepComponent = stepComponents[w.step.id];

  if (w.published) {
    return (
      <div className="container-page flex min-h-[70vh] items-center justify-center py-16">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="card w-full max-w-lg overflow-hidden text-center">
          {w.draft.photos[0] && <img src={w.draft.photos[0]} alt="" className="h-48 w-full object-cover" />}
          <div className="p-8">
            <div className="mx-auto -mt-16 flex h-16 w-16 items-center justify-center rounded-full bg-primary-500 text-ink-900 ring-4 ring-white">
              <PartyPopperIcon className="h-8 w-8" aria-hidden="true" />
            </div>
            <h1 className="mt-5 text-2xl font-black text-ink-900">Your listing is live!</h1>
            <p className="mt-2 text-ink-700">
              “{w.draft.title}” is now visible to pet owners in {w.draft.neighborhood}. We’ll notify you as soon as a booking request comes in.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Link to={`/profile/${currentUser.id}`} className="btn btn-md btn-primary">
                View my profile
              </Link>
              <Link to="/inbox/sales" className="btn btn-md btn-secondary">
                Go to inbox
              </Link>
            </div>
          </div>
        </motion.div>
      </div>);

  }

  return (
    <div className="container-page py-8 lg:py-12">
      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        {/* Step navigation */}
        <aside>
          <h1 className="text-2xl font-black text-ink-900">Create your listing</h1>
          <p className="mt-1 text-sm text-ink-600">
            Step {w.index + 1} of {wizardSteps.length}
          </p>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-ink-200 lg:hidden">
            <div className="h-full rounded-full bg-primary-500 transition-all" style={{ width: `${(w.index + 1) / wizardSteps.length * 100}%` }} />
          </div>
          <ol className="mt-6 hidden space-y-1 lg:block">
            {wizardSteps.map((s, i) => {
              const done = w.completed.includes(s.id);
              const active = i === w.index;
              const reachable = i <= w.index || w.completed.includes(wizardSteps[i - 1]?.id);
              return (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => w.goTo(i)}
                    disabled={!reachable}
                    aria-current={active ? 'step' : undefined}
                    className={`flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition disabled:cursor-not-allowed ${active ? 'bg-white shadow-soft' : reachable ? 'hover:bg-white/70' : 'opacity-60'}`}>
                    
                    <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-black ${done && !active ? 'bg-accent-600 text-white' : active ? 'bg-primary-500 text-ink-900' : 'bg-ink-200 text-ink-600'}`}>
                      {done && !active ? <CheckIcon className="h-4 w-4" strokeWidth={3} aria-hidden="true" /> : i + 1}
                    </span>
                    <span>
                      <span className="block text-sm font-extrabold text-ink-900">{s.title}</span>
                      <span className="block text-xs text-ink-600">{s.description}</span>
                    </span>
                  </button>
                </li>);

            })}
          </ol>
        </aside>

        {/* Step content */}
        <section className="card p-6 sm:p-8" aria-labelledby="step-title">
          <p className="eyebrow">Step {w.index + 1}</p>
          <h2 id="step-title" className="mt-1 text-2xl font-black text-ink-900">
            {w.step.title}
          </h2>
          <p className="mt-1 text-sm text-ink-600">{w.step.description}</p>
          <div className="mt-6">
            <AnimatePresence mode="wait">
              <motion.div key={w.step.id} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.18 }}>
                <StepComponent draft={w.draft} update={w.update} errors={w.errors} />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="mt-8 flex items-center justify-between border-t border-ink-100 pt-6">
            <button type="button" onClick={w.back} disabled={w.index === 0} className="btn btn-md btn-ghost">
              Back
            </button>
            <button type="button" onClick={w.next} className="btn btn-md btn-primary">
              {w.isLast ? 'Publish listing' : 'Save & continue'}
            </button>
          </div>
        </section>
      </div>
    </div>);

}