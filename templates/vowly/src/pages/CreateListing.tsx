import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeftIcon, ArrowRightIcon, SendIcon } from "lucide-react";
import { useListingDraft } from "../components/wizard/useListingDraft";
import { WizardNav } from "../components/wizard/WizardNav";
import { PublishSuccess } from "../components/wizard/PublishSuccess";
import { BusinessDetailsStep } from "../components/wizard/steps/BusinessDetailsStep";
import { CategoryStylesStep } from "../components/wizard/steps/CategoryStylesStep";
import { PackagesStep } from "../components/wizard/steps/PackagesStep";
import { ServiceAreaStep } from "../components/wizard/steps/ServiceAreaStep";
import { PortfolioStep } from "../components/wizard/steps/PortfolioStep";
import { Button } from "../components/ui/Button";

export function CreateListing() {
  const wizard = useListingDraft();
  const { step, stepIndex, isLast, next, back, published } = wizard;

  if (published) return <PublishSuccess wizard={wizard} />;

  const content = {
    details: <BusinessDetailsStep wizard={wizard} />,
    category: <CategoryStylesStep wizard={wizard} />,
    packages: <PackagesStep wizard={wizard} />,
    area: <ServiceAreaStep wizard={wizard} />,
    photos: <PortfolioStep wizard={wizard} />
  }[step.id];

  return (
    <div className="mx-auto max-w-content px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <header className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-dark">List your business</p>
        <h1 className="mt-2 font-display text-5xl font-semibold text-ink">Create your listing</h1>
        <p className="mt-2 text-sm text-muted">Free to list. Couples contact you through inquiries — no commissions, no payment processing.</p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-12">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <WizardNav wizard={wizard} />
        </aside>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            next();
          }}
          noValidate
          className="rounded-3xl border border-line bg-surface">
          
          <div className="border-b border-line px-6 py-5 sm:px-8">
            <h2 className="font-display text-3xl font-semibold text-ink">{step.label}</h2>
            <p className="text-sm text-muted">{step.description}</p>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.18 }}
              className="px-6 py-6 sm:px-8 sm:py-8">
              
              {content}
            </motion.div>
          </AnimatePresence>
          <div className="flex items-center justify-between gap-3 border-t border-line px-6 py-4 sm:px-8">
            <Button variant="ghost" onClick={back} disabled={stepIndex === 0}>
              <ArrowLeftIcon aria-hidden="true" className="h-4 w-4" />
              Back
            </Button>
            <Button type="submit">
              {isLast ? "Publish listing" : "Continue"}
              {isLast ? <SendIcon aria-hidden="true" className="h-4 w-4" /> : <ArrowRightIcon aria-hidden="true" className="h-4 w-4" />}
            </Button>
          </div>
        </form>
      </div>
    </div>);

}