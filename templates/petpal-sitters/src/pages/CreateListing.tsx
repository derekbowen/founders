import React from 'react';
import { CheckIcon, PartyPopperIcon } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { ButtonLink } from '../components/ui/ButtonLink';
import { StepAbout } from '../components/wizard/StepAbout';
import { StepAvailability } from '../components/wizard/StepAvailability';
import { StepHome } from '../components/wizard/StepHome';
import { StepPets } from '../components/wizard/StepPets';
import { StepPhotos } from '../components/wizard/StepPhotos';
import { StepServices } from '../components/wizard/StepServices';
import { brand } from '../data/brand';
import { useListingWizard, wizardSteps } from '../hooks/useListingWizard';
import { cn } from '../utils/cn';

export function CreateListing() {
  const wizard = useListingWizard();
  const { step, stepIndex, completed, goTo, next, back, isLast, published, state } = wizard;

  if (published) {
    return (
      <div className="mx-auto w-full max-w-xl px-4 py-20 text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-primary-100 text-primary-700">
          <PartyPopperIcon className="h-8 w-8" aria-hidden="true" />
        </span>
        <h1 className="mt-6 text-3xl font-black tracking-tight text-stone-900">Your listing is submitted!</h1>
        <p className="mt-3 text-[17px] leading-relaxed text-stone-600">
          Thanks, {state.displayName || 'friend'}. Our team reviews new sitters within 24 hours. We’ll email you as soon as “{state.headline}” is live on {brand.name}.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink to="/profile">View my profile</ButtonLink>
          <ButtonLink to="/account/payouts" variant="secondary">
            Set up payouts
          </ButtonLink>
        </div>
      </div>);

  }

  const StepComponent = { about: StepAbout, services: StepServices, home: StepHome, pets: StepPets, availability: StepAvailability, photos: StepPhotos }[step.id];

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <p className="text-sm font-extrabold uppercase tracking-wider text-primary-700">Become a sitter</p>
      <h1 className="mt-1 text-3xl font-black tracking-tight text-stone-900 sm:text-4xl">Create your listing</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
        <nav aria-label="Listing steps">
          <ol className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:flex-col lg:gap-1 lg:px-0">
            {wizardSteps.map((s, i) => {
              const done = completed.includes(s.id);
              const active = i === stepIndex;
              return (
                <li key={s.id} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => goTo(i)}
                    aria-current={active ? 'step' : undefined}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-colors',
                      active ? 'bg-white shadow-card ring-1 ring-stone-100' : 'hover:bg-white/70'
                    )}>
                    
                    <span
                      className={cn(
                        'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-black',
                        done ? 'bg-accent-600 text-white' : active ? 'bg-primary-500 text-stone-900' : 'bg-stone-200 text-stone-500'
                      )}>
                      
                      {done ? <CheckIcon className="h-4 w-4" strokeWidth={3} aria-hidden="true" /> : i + 1}
                    </span>
                    <span className={cn('whitespace-nowrap text-[15px] font-extrabold', active ? 'text-stone-900' : 'text-stone-600')}>{s.label}</span>
                  </button>
                </li>);

            })}
          </ol>
          <div className="mt-6 hidden rounded-2xl bg-accent-50 p-4 text-sm text-accent-900 lg:block">
            <p className="font-extrabold">Tip</p>
            <p className="mt-1">Listings with 5+ photos and a detailed bio get 3× more booking requests.</p>
          </div>
        </nav>

        <section className="rounded-3xl bg-white p-6 shadow-card ring-1 ring-stone-100 sm:p-8" aria-labelledby="step-heading">
          <p className="text-sm font-bold text-stone-500">
            Step {stepIndex + 1} of {wizardSteps.length}
          </p>
          <h2 id="step-heading" className="mt-1 text-2xl font-black text-stone-900">
            {step.label}
          </h2>
          <p className="mt-1 text-[15px] text-stone-600">{step.description}</p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-stone-100">
            <div className="h-full rounded-full bg-primary-500 transition-all duration-300" style={{ width: `${(stepIndex + 1) / wizardSteps.length * 100}%` }} />
          </div>

          <div className="mt-8">
            <StepComponent wizard={wizard} />
          </div>

          <div className="mt-10 flex items-center justify-between border-t border-stone-100 pt-6">
            <Button variant="ghost" onClick={back} disabled={stepIndex === 0}>
              Back
            </Button>
            <Button onClick={next} size="lg">
              {isLast ? 'Publish listing' : 'Save & continue'}
            </Button>
          </div>
        </section>
      </div>
    </div>);

}