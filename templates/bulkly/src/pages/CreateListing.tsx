import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon, ImageIcon } from 'lucide-react';
import { CategoryStep } from '../components/listing-wizard/CategoryStep';
import { PhotosStep } from '../components/listing-wizard/PhotosStep';
import { PricingStep } from '../components/listing-wizard/PricingStep';
import { ProductStep } from '../components/listing-wizard/ProductStep';
import { ShippingStep } from '../components/listing-wizard/ShippingStep';
import { StockStep } from '../components/listing-wizard/StockStep';
import { WizardStepper } from '../components/listing-wizard/WizardStepper';
import { BrandButton } from '../components/ui/BrandButton';
import { ButtonLink } from '../components/ui/ButtonLink';
import { useAuth } from '../contexts/AuthContext';
import { useListingWizard, wizardSteps } from '../hooks/useListingWizard';
import { getBrand } from '../utils/catalog';
import { formatCurrency, getMarginPercent } from '../utils/pricing';

const stepComponents = [ProductStep, CategoryStep, PricingStep, StockStep, ShippingStep, PhotosStep];

export function CreateListing() {
  const w = useListingWizard();
  const { user } = useAuth();
  const StepComponent = stepComponents[w.step];
  const base = parseFloat(w.draft.basePrice) || 0;
  const msrp = parseFloat(w.draft.msrp) || 0;

  if (w.published) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent-400 text-primary-950">
          <CheckIcon className="h-8 w-8" aria-hidden="true" />
        </div>
        <h1 className="mt-6 text-2xl font-semibold tracking-tight text-slate-900">“{w.draft.title}” is live</h1>
        <p className="mt-2 text-sm text-slate-600">
          Your listing is now visible to verified retailers. You’ll get an inbox notification and email for every new order.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink to={`/brands/${user?.ownedBrandId ?? 'fern-field'}`}>View brand profile</ButtonLink>
          <BrandButton variant="secondary" onClick={w.reset}>
            Create another listing
          </BrandButton>
        </div>
      </div>);

  }

  const isLast = w.step === wizardSteps.length - 1;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Create a wholesale listing</h1>
        <p className="mt-1 text-sm text-slate-600">Set up case packs, tiered pricing and stock so retailers can order by the case.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[240px_1fr] xl:grid-cols-[240px_1fr_280px]">
        <aside>
          <div className="lg:sticky lg:top-32">
            <WizardStepper step={w.step} completed={w.completed} onSelect={w.goTo} />
          </div>
        </aside>

        <section className="rounded-xl border border-slate-200 bg-white" aria-labelledby="step-title">
          <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary-600">
              Step {w.step + 1} of {wizardSteps.length}
            </p>
            <h2 id="step-title" className="mt-0.5 text-lg font-semibold text-slate-900">
              {wizardSteps[w.step].title}
            </h2>
          </div>
          <div className="px-5 py-6 sm:px-6">
            <AnimatePresence mode="wait">
              <motion.div key={w.step} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }} transition={{ duration: 0.15 }}>
                <StepComponent draft={w.draft} errors={w.errors} update={w.update} />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex items-center justify-between border-t border-slate-100 px-5 py-4 sm:px-6">
            <BrandButton variant="ghost" onClick={w.back} disabled={w.step === 0}>
              <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
              Back
            </BrandButton>
            <BrandButton variant={isLast ? 'accent' : 'primary'} onClick={w.next} loading={w.publishing}>
              {isLast ? 'Publish listing' : 'Continue'}
              {!isLast && <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />}
            </BrandButton>
          </div>
        </section>

        <aside className="hidden xl:block" aria-label="Listing preview">
          <div className="sticky top-32 overflow-hidden rounded-xl border border-slate-200 bg-white">
            <p className="border-b border-slate-100 px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-slate-500">Retailer preview</p>
            <div className="flex aspect-square items-center justify-center bg-slate-100">
              {w.draft.photos[0] ?
              <img src={w.draft.photos[0].url} alt="" className="h-full w-full object-cover" /> :

              <ImageIcon className="h-8 w-8 text-slate-300" aria-hidden="true" />
              }
            </div>
            <div className="p-4">
              <p className="text-xs text-slate-500">{getBrand(user?.ownedBrandId)?.name ?? 'Your brand'}</p>
              <p className="mt-0.5 text-sm font-semibold text-slate-900">{w.draft.title || 'Product name'}</p>
              <p className="mt-2 text-lg font-semibold tabular-nums text-primary-900">
                {base ? formatCurrency(base) : '$—'} <span className="text-xs font-normal text-slate-500">/ unit wholesale</span>
              </p>
              <div className="mt-1 flex items-center justify-between text-xs">
                <span className="text-slate-600">MSRP {msrp ? formatCurrency(msrp) : '—'}</span>
                {base > 0 && msrp > 0 &&
                <span className="rounded bg-accent-100 px-1.5 py-0.5 font-semibold text-accent-900">{getMarginPercent(base, msrp)}% margin</span>
                }
              </div>
              <div className="mt-3 flex justify-between border-t border-slate-100 pt-2.5 text-xs text-slate-600">
                <span>Min {w.draft.minOrderCases || 1} case(s)</span>
                <span>{w.draft.casePack || '—'} units / case</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>);

}