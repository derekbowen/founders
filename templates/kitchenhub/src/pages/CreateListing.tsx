import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon, CircleCheckIcon, ImageIcon } from 'lucide-react';
import { AvailabilityStep } from '../components/wizard/AvailabilityStep';
import { CertificationsStep } from '../components/wizard/CertificationsStep';
import { EquipmentStep } from '../components/wizard/EquipmentStep';
import { KitchenDetailsStep } from '../components/wizard/KitchenDetailsStep';
import { PhotosStep } from '../components/wizard/PhotosStep';
import { PricingStep } from '../components/wizard/PricingStep';
import { StorageStep } from '../components/wizard/StorageStep';
import { Button } from '../components/ui/Button';
import { ButtonLink } from '../components/ui/ButtonLink';
import { useAuth } from '../contexts/AuthContext';
import { currentUserId } from '../data/hosts';
import { useListingWizard, wizardSteps } from '../hooks/useListingWizard';
import type { WizardStepProps } from '../types/wizard';
import { formatMoney } from '../utils/format';
import { cn, containerClass, focusRing } from '../utils/styles';

const stepComponents: React.ComponentType<WizardStepProps>[] = [
KitchenDetailsStep,
EquipmentStep,
StorageStep,
CertificationsStep,
PricingStep,
AvailabilityStep,
PhotosStep];


export function CreateListingPage() {
  const { user } = useAuth();
  const { draft, update, step, errors, completed, published, next, back, goTo, reset } = useListingWizard();
  const Step = stepComponents[step];
  const isLast = step === wizardSteps.length - 1;

  if (published) {
    return (
      <div className={cn(containerClass, 'max-w-2xl py-20 text-center')}>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-accent-soft text-accent">
            <CircleCheckIcon className="h-8 w-8" aria-hidden="true" />
          </span>
          <h1 className="mt-6 font-heading text-4xl font-bold uppercase tracking-tight text-steel-900">Submitted for review</h1>
          <p className="mx-auto mt-3 max-w-md text-steel-600">
            Our trust team will verify your health permit for <strong className="text-steel-900">{draft.title}</strong> within one business day. We’ll email you as soon as it’s live.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink to={`/profile/${user?.id ?? currentUserId}`} size="lg">View your profile</ButtonLink>
            <Button variant="outline" size="lg" onClick={reset}>List another kitchen</Button>
          </div>
        </motion.div>
      </div>);

  }

  return (
    <div className="bg-steel-50">
      <div className={cn(containerClass, 'py-8 lg:py-12')}>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">For kitchen owners</p>
        <h1 className="mt-1 font-heading text-4xl font-bold uppercase tracking-tight text-steel-900">List your kitchen</h1>

        {/* Mobile progress */}
        <div className="mt-6 lg:hidden">
          <div className="flex justify-between text-sm">
            <span className="font-semibold text-steel-900">{wizardSteps[step].label}</span>
            <span className="text-steel-500">Step {step + 1} of {wizardSteps.length}</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-steel-200">
            <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${(step + 1) / wizardSteps.length * 100}%` }} />
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)] xl:grid-cols-[260px_minmax(0,1fr)_300px]">
          <nav aria-label="Listing steps" className="hidden lg:block">
            <ol className="space-y-1">
              {wizardSteps.map((s, i) => {
                const done = completed.includes(i);
                const current = i === step;
                const reachable = i <= step || completed.includes(i - 1);
                return (
                  <li key={s.key}>
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      disabled={!reachable}
                      aria-current={current ? 'step' : undefined}
                      className={cn('flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition-colors disabled:cursor-not-allowed', focusRing, current ? 'bg-white shadow-card' : reachable && 'hover:bg-white/70')}>
                      
                      <span className={cn('mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-bold', done ? 'bg-accent text-white' : current ? 'bg-primary text-white' : 'bg-steel-200 text-steel-600')}>
                        {done ? <CheckIcon className="h-3.5 w-3.5" aria-hidden="true" /> : i + 1}
                      </span>
                      <span>
                        <span className={cn('block text-sm font-semibold', current || done ? 'text-steel-900' : 'text-steel-500')}>{s.label}</span>
                        <span className="block text-xs text-steel-500">{s.description}</span>
                      </span>
                    </button>
                  </li>);

              })}
            </ol>
          </nav>

          <section className="rounded-2xl border border-steel-200 bg-white shadow-card" aria-labelledby="step-heading">
            <div className="border-b border-steel-200 px-6 py-5">
              <h2 id="step-heading" className="font-heading text-2xl font-semibold uppercase tracking-wide text-steel-900">{wizardSteps[step].label}</h2>
              <p className="text-sm text-steel-500">{wizardSteps[step].description}</p>
            </div>
            <motion.div key={step} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }} className="p-6">
              <Step draft={draft} update={update} errors={errors} />
            </motion.div>
            <div className="flex items-center justify-between border-t border-steel-200 px-6 py-4">
              <Button variant="ghost" onClick={back} disabled={step === 0}>
                <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
                Back
              </Button>
              <Button variant={isLast ? 'accent' : 'primary'} onClick={next}>
                {isLast ? 'Publish listing' : 'Save & continue'}
                {!isLast && <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />}
              </Button>
            </div>
          </section>

          <aside className="hidden xl:block" aria-label="Listing preview">
            <div className="sticky top-24">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-steel-500">Preview</p>
              <div className="overflow-hidden rounded-2xl border border-steel-200 bg-white shadow-card">
                <div className="grid aspect-[4/3] place-items-center bg-steel-100 text-steel-400">
                  {draft.photos[0] ? <img src={draft.photos[0]} alt="" className="h-full w-full object-cover" /> : <ImageIcon className="h-8 w-8" aria-hidden="true" />}
                </div>
                <div className="p-4">
                  <p className="font-semibold text-steel-900">{draft.title || 'Your kitchen name'}</p>
                  <p className="text-sm text-steel-500">{[draft.neighborhood, draft.city].filter(Boolean).join(', ') || 'Neighborhood, City'}</p>
                  <p className="mt-2 text-sm">
                    <span className="font-semibold text-steel-900">{formatMoney(draft.pricePerHour)}</span>
                    <span className="text-steel-500"> / hour · {draft.minHours}h min</span>
                  </p>
                  <p className="mt-2 text-xs text-steel-500">
                    {draft.equipment.reduce((s, c) => s + c.items.length, 0)} equipment items · {Object.values(draft.storage).filter((s) => s.enabled).length} storage types
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>);

}