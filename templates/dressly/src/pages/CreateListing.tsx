import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon } from 'lucide-react';
import { DetailsStep } from '../components/wizard/DetailsStep';
import { DesignerSizeStep } from '../components/wizard/DesignerSizeStep';
import { MeasurementsStep } from '../components/wizard/MeasurementsStep';
import { PricingStep } from '../components/wizard/PricingStep';
import { AvailabilityStep } from '../components/wizard/AvailabilityStep';
import { PhotosStep } from '../components/wizard/PhotosStep';
import type { DraftUpdater, ListingDraft } from '../types/draft';
import { btn, cx, eyebrow } from '../utils/styles';

const initialDraft: ListingDraft = {
  title: '',
  description: '',
  occasions: [],
  color: '',
  length: '',
  designer: '',
  size: null,
  fit: 'True to size',
  stretch: 'No stretch',
  fitNotes: '',
  bust: '',
  waist: '',
  hips: '',
  dressLength: '',
  retailPrice: '',
  price4: '',
  price8: '',
  delivery: ['ship'],
  blocked: [],
  notice: '2',
  photos: []
};

const steps = [
{ id: 'details', label: 'Item details', blurb: 'Tell renters what makes this dress special.', Component: DetailsStep, valid: (d: ListingDraft) => d.title.trim().length > 3 && d.occasions.length > 0 && !!d.length },
{ id: 'designer', label: 'Designer & size', blurb: 'Help renters find their perfect fit.', Component: DesignerSizeStep, valid: (d: ListingDraft) => !!d.designer.trim() && d.size !== null },
{ id: 'measurements', label: 'Measurements', blurb: 'Precise measurements mean fewer fit surprises.', Component: MeasurementsStep, valid: (d: ListingDraft) => !!d.bust && !!d.waist && !!d.hips && !!d.dressLength },
{ id: 'pricing', label: 'Rental pricing', blurb: 'Set your 4-day and 8-day prices.', Component: PricingStep, valid: (d: ListingDraft) => Number(d.price4) > 0 && Number(d.price8) > Number(d.price4) && d.delivery.length > 0 },
{ id: 'availability', label: 'Availability', blurb: 'Block any dates the dress isn’t available.', Component: AvailabilityStep, valid: () => true },
{ id: 'photos', label: 'Photos', blurb: 'Great photos rent dresses. Add at least one.', Component: PhotosStep, valid: (d: ListingDraft) => d.photos.length > 0 }];


export function CreateListing() {
  const [draft, setDraft] = useState<ListingDraft>(initialDraft);
  const [current, setCurrent] = useState(0);
  const [attempted, setAttempted] = useState(false);
  const [published, setPublished] = useState(false);

  const set: DraftUpdater = (key, value) => setDraft((d) => ({ ...d, [key]: value }));
  const step = steps[current];
  const StepComponent = step.Component;
  const stepValid = step.valid(draft);
  const furthestValid = steps.findIndex((s) => !s.valid(draft));
  const maxReachable = furthestValid === -1 ? steps.length - 1 : furthestValid;

  const next = () => {
    if (!stepValid) {
      setAttempted(true);
      return;
    }
    setAttempted(false);
    if (current === steps.length - 1) setPublished(true);else
    setCurrent((c) => c + 1);
  };

  if (published) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-ink text-paper">
          <CheckIcon size={28} aria-hidden="true" />
        </span>
        <p className={`${eyebrow} mt-8`}>Listing published</p>
        <h1 className="mt-3 font-display text-4xl md:text-5xl">{draft.title || 'Your dress'} is live.</h1>
        <p className="mt-4 text-muted">
          We’ll notify you as soon as someone requests it. Most new listings get their first request within a week.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/closet/me" className={btn('primary', 'lg')}>View your closet</Link>
          <button
            type="button"
            onClick={() => {
              setDraft(initialDraft);
              setCurrent(0);
              setPublished(false);
            }}
            className={btn('outline', 'lg')}>
            
            List another
          </button>
        </div>
      </div>);

  }

  return (
    <div className="mx-auto max-w-[1200px] px-4 pb-20 pt-8 md:px-8 md:pt-12">
      <p className={eyebrow}>Lend your wardrobe</p>
      <h1 className="mt-2 font-display text-4xl md:text-5xl">List a dress</h1>

      <div className="mt-10 grid gap-10 lg:grid-cols-[240px_1fr]">
        <nav aria-label="Listing steps">
          <ol className="no-scrollbar flex gap-2 overflow-x-auto lg:flex-col lg:gap-0">
            {steps.map((s, i) => {
              const done = i < current && s.valid(draft);
              const active = i === current;
              const reachable = i <= maxReachable;
              return (
                <li key={s.id} className="shrink-0">
                  <button
                    type="button"
                    disabled={!reachable && i > current}
                    onClick={() => setCurrent(i)}
                    aria-current={active ? 'step' : undefined}
                    className={cx(
                      'flex w-full items-center gap-3 border-b-2 px-1 py-3 text-left text-sm transition lg:border-b-0 lg:border-l-2 lg:pl-4',
                      active ? 'border-ink font-medium text-ink' : 'border-transparent text-muted hover:text-ink',
                      'disabled:cursor-not-allowed disabled:opacity-50'
                    )}>
                    
                    <span
                      className={cx(
                        'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[11px]',
                        done ? 'border-ink bg-ink text-paper' : active ? 'border-ink' : 'border-line'
                      )}>
                      
                      {done ? <CheckIcon size={12} aria-hidden="true" /> : i + 1}
                    </span>
                    <span className="whitespace-nowrap">{s.label}</span>
                  </button>
                </li>);

            })}
          </ol>
        </nav>

        <section aria-labelledby="step-heading" className="min-w-0">
          <div className="border-b border-line pb-5">
            <p className="text-xs text-muted">Step {current + 1} of {steps.length}</p>
            <h2 id="step-heading" className="mt-1 font-display text-3xl">{step.label}</h2>
            <p className="mt-1 text-sm text-muted">{step.blurb}</p>
            <div className="mt-4 h-0.5 w-full bg-line" aria-hidden="true">
              <motion.div className="h-full bg-accent-dark" animate={{ width: `${(current + 1) / steps.length * 100}%` }} />
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.2 }}
              className="py-8">
              
              <StepComponent draft={draft} set={set} />
            </motion.div>
          </AnimatePresence>

          {attempted && !stepValid &&
          <p role="alert" className="mb-4 text-sm text-[#9b2c2c]">
              Please complete the required fields in this step to continue.
            </p>
          }

          <div className="flex items-center justify-between border-t border-line pt-6">
            <button
              type="button"
              onClick={() => setCurrent((c) => Math.max(0, c - 1))}
              disabled={current === 0}
              className={btn('ghost', 'md')}>
              
              <ArrowLeftIcon size={14} aria-hidden="true" /> Back
            </button>
            <button type="button" onClick={next} className={btn('primary', 'md')}>
              {current === steps.length - 1 ? 'Publish listing' : 'Continue'}
              {current < steps.length - 1 && <ArrowRightIcon size={14} aria-hidden="true" />}
            </button>
          </div>
        </section>
      </div>
    </div>);

}