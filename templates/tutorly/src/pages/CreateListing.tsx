import React from 'react';
import { Link } from 'react-router-dom';
import { CheckIcon, PartyPopperIcon } from 'lucide-react';
import { Button } from '../components/Button';
import { AboutStep } from '../components/listingWizard/AboutStep';
import { SubjectsStep } from '../components/listingWizard/SubjectsStep';
import { CredentialsStep } from '../components/listingWizard/CredentialsStep';
import { PricingStep } from '../components/listingWizard/PricingStep';
import { AvailabilityStep } from '../components/listingWizard/AvailabilityStep';
import { MediaStep } from '../components/listingWizard/MediaStep';
import { useAuth } from '../contexts/AuthContext';
import { useListingWizard } from '../hooks/useListingWizard';
import { wizardSteps } from '../data/listingWizard';
import { brandButton, linkButton } from '../utils/buttonStyles';

const stepComponents = {
  about: AboutStep,
  subjects: SubjectsStep,
  credentials: CredentialsStep,
  pricing: PricingStep,
  availability: AvailabilityStep,
  media: MediaStep
};

export function CreateListingPage() {
  const { user } = useAuth();
  const wizard = useListingWizard(`${user.firstName} ${user.lastName}`);
  const { draft, update, step, stepIndex, isLast, goNext, goBack, goTo, isStepComplete, published, showErrors } = wizard;
  const StepComponent = stepComponents[step.id];

  if (published) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center sm:px-6">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-accent-300 text-ink-900">
          <PartyPopperIcon size={30} aria-hidden="true" />
        </span>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-ink-900">Your listing is submitted!</h1>
        <p className="mt-3 text-ink-600">
          Our trust team will review your credentials within 24–48 hours. We'll email you at {user.email} as soon as
          you're live. Meanwhile, set up payouts so you can get paid.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/account/payouts" className={`${linkButton.base} ${linkButton.primary}`}>Set up payouts</Link>
          <Link to="/tutors/me" className={`${linkButton.base} ${linkButton.secondary}`}>Preview listing</Link>
        </div>
      </div>);

  }

  return (
    <div className="bg-ink-50">
      <div className="mx-auto max-w-page px-4 py-8 sm:px-6 md:py-12">
        <p className="text-sm font-medium text-primary-700">Become a tutor</p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-ink-900">Create your tutor listing</h1>

        <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
          <nav aria-label="Listing steps" className="lg:sticky lg:top-24 lg:self-start">
            <ol className="flex gap-2 overflow-x-auto pb-2 scrollbar-none lg:flex-col lg:gap-1 lg:overflow-visible">
              {wizardSteps.map((s, i) => {
                const active = i === stepIndex;
                const done = isStepComplete(s.id);
                return (
                  <li key={s.id} className="shrink-0">
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      aria-current={active ? 'step' : undefined}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition ${
                      active ? 'bg-white font-semibold text-ink-900 shadow-card' : 'text-ink-600 hover:bg-white/70'}`
                      }>
                      
                      <span
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                        done ? 'bg-primary-600 text-white' : active ? 'bg-accent-400 text-ink-900' : 'bg-ink-200 text-ink-600'}`
                        }>
                        
                        {done ? <CheckIcon size={14} aria-label="Complete" /> : i + 1}
                      </span>
                      <span className="whitespace-nowrap">{s.title}</span>
                    </button>
                  </li>);

              })}
            </ol>
          </nav>

          <section className="rounded-3xl border border-ink-200 bg-white p-5 sm:p-8" aria-labelledby="step-title">
            <p className="text-sm text-ink-500">Step {stepIndex + 1} of {wizardSteps.length}</p>
            <h2 id="step-title" className="mt-1 text-2xl font-semibold text-ink-900">{step.title}</h2>
            <p className="mt-1 text-ink-600">{step.description}</p>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink-100">
              <div className="h-full rounded-full bg-primary-600 transition-all" style={{ width: `${(stepIndex + 1) / wizardSteps.length * 100}%` }} />
            </div>

            <div className="mt-8">
              <StepComponent draft={draft} update={update} showErrors={showErrors} />
            </div>

            <div className="mt-10 flex items-center justify-between border-t border-ink-200 pt-6">
              <Button className={brandButton.secondary} onClick={goBack} disabled={stepIndex === 0}>
                Back
              </Button>
              <Button className={isLast ? brandButton.accent : brandButton.primary} size="large" onClick={goNext}>
                {isLast ? 'Publish listing' : 'Save & continue'}
              </Button>
            </div>
          </section>
        </div>
      </div>
    </div>);

}