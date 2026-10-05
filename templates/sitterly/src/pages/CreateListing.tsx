import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon, PartyPopperIcon } from 'lucide-react';
import { BrandButton, buttonLinkClass } from '../components/ui/BrandButton';
import { AboutStep } from '../components/listing-wizard/AboutStep';
import { ExperienceStep } from '../components/listing-wizard/ExperienceStep';
import { CertificationsStep } from '../components/listing-wizard/CertificationsStep';
import { RatesStep } from '../components/listing-wizard/RatesStep';
import { AvailabilityStep } from '../components/listing-wizard/AvailabilityStep';
import { ServiceAreaStep } from '../components/listing-wizard/ServiceAreaStep';
import { PhotoStep } from '../components/listing-wizard/PhotoStep';
import { useListingDraft, validateStep } from '../hooks/useListingDraft';
import { wizardSteps } from '../data/wizardSteps';
import { WizardStepId } from '../types/listingDraft';

export function CreateListing() {
  const [params, setParams] = useSearchParams();
  const { draft, update, toggleSlot } = useListingDraft();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [published, setPublished] = useState(false);
  const [publishing, setPublishing] = useState(false);

  const stepId = (wizardSteps.find((s) => s.id === params.get('step'))?.id ?? 'about') as WizardStepId;
  const index = wizardSteps.findIndex((s) => s.id === stepId);
  const step = wizardSteps[index];
  const isLast = index === wizardSteps.length - 1;
  const completed = wizardSteps.map((s) => Object.keys(validateStep(s.id, draft)).length === 0);

  const goTo = (id: WizardStepId) => {
    setErrors({});
    setParams({ step: id });
    window.scrollTo({ top: 0 });
  };

  const next = () => {
    const e = validateStep(stepId, draft);
    setErrors(e);
    if (Object.keys(e).length) {
      document.getElementById(Object.keys(e)[0])?.focus();
      return;
    }
    if (isLast) {
      const firstIncomplete = wizardSteps.findIndex((_, i) => !completed[i]);
      if (firstIncomplete !== -1) return goTo(wizardSteps[firstIncomplete].id);
      setPublishing(true);
      window.setTimeout(() => {setPublishing(false);setPublished(true);}, 1000);
      return;
    }
    goTo(wizardSteps[index + 1].id);
  };

  if (published) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent-100 text-accent-700">
          <PartyPopperIcon className="h-8 w-8" aria-hidden />
        </span>
        <h1 className="mt-6 font-heading text-3xl font-bold text-ink-900">You’re almost live, {draft.displayName.split(' ')[0] || 'friend'}!</h1>
        <p className="mt-3 text-ink-600">Your listing is submitted. Once your background check clears (usually 1–3 days), families in {draft.neighborhood} will be able to book you.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/u/emma-larsen" className={buttonLinkClass('primary', 'lg')}>Preview your profile</Link>
          <Link to="/inbox?tab=jobs" className={buttonLinkClass('outline', 'lg')}>Go to sitting jobs</Link>
        </div>
      </div>);

  }

  const stepProps = { draft, update, errors };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="grid gap-10 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside>
          <p className="text-sm font-bold uppercase tracking-wider text-primary-700">Become a sitter</p>
          <h1 className="mt-1 font-heading text-2xl font-bold text-ink-900">Create your listing</h1>
          <div className="mt-4 lg:hidden">
            <div className="flex justify-between text-xs font-semibold text-ink-600">
              <span>Step {index + 1} of {wizardSteps.length}</span>
              <span>{step.title}</span>
            </div>
            <div className="mt-2 h-2 rounded-full bg-ink-200" role="progressbar" aria-valuemin={1} aria-valuemax={wizardSteps.length} aria-valuenow={index + 1}>
              <div className="h-2 rounded-full bg-primary-600 transition-all" style={{ width: `${(index + 1) / wizardSteps.length * 100}%` }} />
            </div>
          </div>
          <nav aria-label="Listing steps" className="mt-6 hidden lg:block">
            <ol className="space-y-1">
              {wizardSteps.map((s, i) => {
                const active = s.id === stepId;
                return (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => goTo(s.id)}
                      aria-current={active ? 'step' : undefined}
                      className={`flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition ${active ? 'bg-white shadow-soft ring-1 ring-ink-200' : 'hover:bg-white/70'}`}>
                      
                      <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${completed[i] ? 'bg-primary-600 text-white' : active ? 'bg-primary-100 text-primary-800 ring-2 ring-primary-500' : 'bg-ink-100 text-ink-600'}`}>
                        {completed[i] ? <CheckIcon className="h-4 w-4" aria-label="Complete" /> : i + 1}
                      </span>
                      <span className={`text-sm font-semibold ${active ? 'text-ink-900' : 'text-ink-700'}`}>{s.title}</span>
                    </button>
                  </li>);

              })}
            </ol>
          </nav>
        </aside>

        <section aria-labelledby="step-heading" className="rounded-[2rem] border border-ink-200 bg-white p-6 sm:p-8">
          <h2 id="step-heading" className="font-heading text-2xl font-bold text-ink-900">{step.title}</h2>
          <p className="mt-1 text-ink-600">{step.description}</p>
          <div className="mt-8">
            {stepId === 'about' && <AboutStep {...stepProps} />}
            {stepId === 'experience' && <ExperienceStep {...stepProps} />}
            {stepId === 'certifications' && <CertificationsStep {...stepProps} />}
            {stepId === 'rates' && <RatesStep {...stepProps} />}
            {stepId === 'availability' && <AvailabilityStep {...stepProps} onToggle={toggleSlot} />}
            {stepId === 'service-area' && <ServiceAreaStep {...stepProps} />}
            {stepId === 'photo' && <PhotoStep {...stepProps} />}
          </div>
          <div className="mt-10 flex items-center justify-between border-t border-ink-200 pt-6">
            {index > 0 ?
            <BrandButton tone="ghost" leftIcon={<ArrowLeftIcon size={16} />} onClick={() => goTo(wizardSteps[index - 1].id)}>Back</BrandButton> :

            <span />
            }
            <BrandButton size="lg" onClick={next} loading={publishing} rightIcon={isLast ? undefined : <ArrowRightIcon size={16} />}>
              {isLast ? 'Publish listing' : 'Continue'}
            </BrandButton>
          </div>
        </section>
      </div>
    </div>);

}