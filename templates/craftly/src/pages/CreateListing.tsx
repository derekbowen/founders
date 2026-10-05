import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeftIcon, ArrowRightIcon, ImageIcon, RocketIcon } from 'lucide-react';
import { wizardSteps } from '../data/listingWizard';
import { categories } from '../data/categories';
import { useListingWizard } from '../hooks/useListingWizard';
import { WizardStepper } from '../components/wizard/WizardStepper';
import { DetailsStep } from '../components/wizard/DetailsStep';
import { CategoryStep } from '../components/wizard/CategoryStep';
import { VariationsStep } from '../components/wizard/VariationsStep';
import { PricingStep } from '../components/wizard/PricingStep';
import { ShippingStep } from '../components/wizard/ShippingStep';
import { PhotosStep } from '../components/wizard/PhotosStep';
import { Button } from '../components/ui/Button';
import { formatPrice } from '../utils/format';

export function CreateListing() {
  const w = useListingWizard();
  const props = { draft: w.draft, update: w.update, errors: w.errors };
  const steps = [DetailsStep, CategoryStep, VariationsStep, PricingStep, ShippingStep, PhotosStep];
  const StepComponent = steps[w.step];
  const current = wizardSteps[w.step];
  const category = categories.find((c) => c.id === w.draft.categoryId);

  return (
    <div className="container-page py-8 lg:py-12">
      <p className="eyebrow">New listing</p>
      <h1 className="mt-1 text-4xl font-medium tracking-tight">List a handmade piece</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[240px_1fr] xl:grid-cols-[240px_1fr_260px]">
        <aside>
          <div className="lg:sticky lg:top-32">
            <WizardStepper step={w.step} maxVisited={w.maxVisited} onSelect={w.goTo} />
          </div>
        </aside>

        <section className="card p-6 sm:p-8" aria-labelledby="step-title">
          <h2 id="step-title" className="text-2xl font-medium">{current.label}</h2>
          <p className="mt-1 text-sm text-muted">{current.description}</p>
          <div className="mt-8">
            <AnimatePresence mode="wait">
              <motion.div key={w.step} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }} transition={{ duration: 0.15 }}>
                <StepComponent {...props} />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="mt-10 flex items-center justify-between border-t border-line pt-6">
            <Button variant="ghost" onClick={w.back} disabled={w.step === 0} leftIcon={<ArrowLeftIcon className="h-4 w-4" />}>
              Back
            </Button>
            {w.isLast ?
            <Button onClick={w.publish} loading={w.publishing} leftIcon={<RocketIcon className="h-4 w-4" />}>
                Publish listing
              </Button> :

            <Button onClick={w.next} rightIcon={<ArrowRightIcon className="h-4 w-4" />}>
                Continue
              </Button>
            }
          </div>
        </section>

        <aside className="hidden xl:block" aria-label="Listing preview">
          <div className="sticky top-32">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">Preview</p>
            <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-subtle">
              {w.draft.photos[0] ?
              <img src={w.draft.photos[0]} alt="" className="h-full w-full object-cover" /> :

              <div className="flex h-full flex-col items-center justify-center text-muted">
                  <ImageIcon className="h-8 w-8" aria-hidden />
                  <span className="mt-2 text-xs">Cover photo</span>
                </div>
              }
            </div>
            <p className="mt-3 line-clamp-2 text-sm font-medium">{w.draft.title || 'Your listing title'}</p>
            <p className="text-xs text-muted">{category?.name ?? 'Category'}</p>
            <p className="mt-1 text-sm font-semibold">{w.draft.price ? formatPrice(Number(w.draft.price)) : '$—'}</p>
            {w.draft.madeToOrder && <span className="mt-2 inline-block rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-semibold text-accent-ink">Made to order</span>}
          </div>
        </aside>
      </div>
    </div>);

}