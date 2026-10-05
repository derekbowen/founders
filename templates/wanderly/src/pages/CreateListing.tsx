import React, { useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon, PartyPopperIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { Button } from '../components/ui/Button';
import { DetailsStep } from '../components/wizard/DetailsStep';
import { CategoryStep } from '../components/wizard/CategoryStep';
import { ItineraryStep } from '../components/wizard/ItineraryStep';
import { GroupSizeStep } from '../components/wizard/GroupSizeStep';
import { ScheduleStep } from '../components/wizard/ScheduleStep';
import { PricingStep } from '../components/wizard/PricingStep';
import { MeetingPointStep } from '../components/wizard/MeetingPointStep';
import { PhotosStep } from '../components/wizard/PhotosStep';
import { wizardSteps, type WizardStepSlug } from '../data/wizardSteps';
import { useListingDraft } from '../hooks/useListingDraft';
import type { WizardStepProps } from '../types/listingDraft';

const stepComponents: Record<WizardStepSlug, React.ComponentType<WizardStepProps>> = {
  details: DetailsStep,
  category: CategoryStep,
  itinerary: ItineraryStep,
  'group-size': GroupSizeStep,
  schedule: ScheduleStep,
  pricing: PricingStep,
  'meeting-point': MeetingPointStep,
  photos: PhotosStep
};

export function CreateListing() {
  const { step } = useParams();
  const navigate = useNavigate();
  const { draft, update, isComplete } = useListingDraft();
  const [published, setPublished] = useState(false);
  const [publishing, setPublishing] = useState(false);

  const index = wizardSteps.findIndex((s) => s.slug === step);
  if (index === -1) return <Navigate to="/host/new/details" replace />;

  const current = wizardSteps[index];
  const StepComponent = stepComponents[current.slug];
  const isLast = index === wizardSteps.length - 1;
  const completeCount = wizardSteps.filter((s) => isComplete(s.slug)).length;
  const allComplete = completeCount === wizardSteps.length;

  const publish = () => {
    setPublishing(true);
    window.setTimeout(() => {
      setPublishing(false);
      setPublished(true);
    }, 1200);
  };

  if (published) {
    return (
      <div className="bg-sand-50 px-4 py-20">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-lg rounded-3xl bg-white p-10 text-center shadow-card">
          <PartyPopperIcon className="mx-auto h-14 w-14 text-primary-600" aria-hidden />
          <h1 className="mt-4 text-2xl font-bold text-slate-900">Your experience is submitted!</h1>
          <p className="mt-2 text-slate-600">
            “{draft.title}” is in review. Our team usually approves new listings within 24 hours — we'll email you when it's live.
          </p>
          <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:justify-center">
            <Button to="/inbox/hosting">Go to hosting inbox</Button>
            <Button to="/account/payouts" variant="outline">Set up payouts</Button>
          </div>
        </motion.div>
      </div>);

  }

  return (
    <div className="bg-sand-50">
      <div className="mx-auto grid max-w-page gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[280px_1fr] lg:px-8 lg:py-12">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Create an experience</h1>
          <div className="mt-3 flex items-center gap-3">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200">
              <motion.div className="h-full rounded-full bg-accent-600" animate={{ width: `${completeCount / wizardSteps.length * 100}%` }} />
            </div>
            <span className="text-xs font-semibold text-slate-600">{completeCount}/{wizardSteps.length}</span>
          </div>
          <nav aria-label="Listing steps" className="mt-6">
            <ol className="flex gap-2 overflow-x-auto pb-2 scrollbar-none lg:flex-col lg:gap-1 lg:pb-0">
              {wizardSteps.map((s, i) => {
                const active = s.slug === current.slug;
                const done = isComplete(s.slug);
                return (
                  <li key={s.slug} className="shrink-0">
                    <Link
                      to={`/host/new/${s.slug}`}
                      aria-current={active ? 'step' : undefined}
                      className={twMerge(
                        'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                        active ? 'bg-white text-slate-900 shadow-card' : 'text-slate-600 hover:bg-white/70 hover:text-slate-900'
                      )}>
                      
                      <span
                        className={twMerge(
                          'flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold',
                          done ? 'bg-accent-700 text-white' : active ? 'bg-primary-600 text-white' : 'bg-slate-200 text-slate-600'
                        )}>
                        
                        {done ? <CheckIcon className="h-3.5 w-3.5" aria-hidden /> : i + 1}
                      </span>
                      <span className="whitespace-nowrap">{s.label}</span>
                      {done && <span className="sr-only">(complete)</span>}
                    </Link>
                  </li>);

              })}
            </ol>
          </nav>
        </aside>

        <section className="rounded-3xl border border-slate-200 bg-white" aria-labelledby="step-title">
          <div className="border-b border-slate-100 px-6 py-6 sm:px-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary-700">Step {index + 1} of {wizardSteps.length}</p>
            <h2 id="step-title" className="mt-1 text-2xl font-bold text-slate-900">{current.label}</h2>
            <p className="mt-1 text-sm text-slate-600">{current.description}</p>
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={current.slug} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.18 }} className="px-6 py-8 sm:px-8">
              <StepComponent draft={draft} update={update} />
            </motion.div>
          </AnimatePresence>
          <div className="flex items-center justify-between gap-3 border-t border-slate-100 px-6 py-5 sm:px-8">
            <Button
              variant="ghost"
              leftIcon={<ArrowLeftIcon className="h-4 w-4" />}
              disabled={index === 0}
              onClick={() => navigate(`/host/new/${wizardSteps[index - 1].slug}`)}>
              
              Back
            </Button>
            {isLast ?
            <div className="flex items-center gap-3">
                {!allComplete && <span className="hidden text-sm text-slate-600 sm:inline">Complete all steps to publish</span>}
                <Button onClick={publish} disabled={!allComplete} loading={publishing}>Publish experience</Button>
              </div> :

            <Button
              rightIcon={<ArrowRightIcon className="h-4 w-4" />}
              onClick={() => navigate(`/host/new/${wizardSteps[index + 1].slug}`)}>
              
                {isComplete(current.slug) ? 'Next' : 'Skip for now'}
              </Button>
            }
          </div>
        </section>
      </div>
    </div>);

}