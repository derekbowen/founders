import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon, PartyPopperIcon } from 'lucide-react';
import { useListingDraft, wizardSteps } from '../hooks/useListingDraft';
import { DetailsStep } from '../components/createListing/DetailsStep';
import { CategoryStep } from '../components/createListing/CategoryStep';
import { PricingStep } from '../components/createListing/PricingStep';
import { PortfolioStep } from '../components/createListing/PortfolioStep';
import { FaqStep } from '../components/createListing/FaqStep';
import { ListingPreview } from '../components/createListing/ListingPreview';
import { Button } from '../components/ui/Button';
import { ButtonLink } from '../components/ui/ButtonLink';
import { useAuth } from '../contexts/AuthContext';

export function CreateListing() {
  const { user } = useAuth();
  const { draft, update, step, completed, errors, next, back, goTo, publish, publishing, published, reset } = useListingDraft();
  const isLast = step === wizardSteps.length - 1;
  const stepProps = { draft, update, errors };

  if (published) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-100 text-accent-700">
          <PartyPopperIcon className="h-7 w-7" aria-hidden="true" />
        </motion.div>
        <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900">Your listing is submitted</h1>
        <p className="mt-2 text-slate-600">“{draft.title}” is under review and usually goes live within 24 hours. We'll email you when it's published.</p>
        <div className="mx-auto mt-8 max-w-xs text-left"><ListingPreview draft={draft} user={user} /></div>
        <div className="mt-8 flex justify-center gap-3">
          <ButtonLink to={`/u/${user?.id}`}>View your profile</ButtonLink>
          <Button variant="secondary" onClick={reset}>Create another</Button>
        </div>
      </div>);

  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-semibold text-primary-700">Offer your services</p>
        <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900">Create a listing</h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)_300px]">
        <nav aria-label="Listing steps">
          <ol className="flex gap-2 overflow-x-auto pb-1 scrollbar-none lg:flex-col lg:gap-1">
            {wizardSteps.map((s, i) => {
              const done = completed.includes(i);
              const current = i === step;
              const reachable = i <= step || completed.includes(i - 1);
              return (
                <li key={s.id} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => goTo(i)}
                    disabled={!reachable}
                    aria-current={current ? 'step' : undefined}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors disabled:cursor-not-allowed ${
                    current ? 'bg-white shadow-sm ring-1 ring-slate-200' : reachable ? 'hover:bg-white' : 'opacity-60'}`
                    }>
                    
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                      done && !current ? 'bg-accent-400 text-accent-900' : current ? 'bg-primary-600 text-white' : 'bg-slate-200 text-slate-600'}`
                      }>
                      
                      {done && !current ? <CheckIcon className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" /> : i + 1}
                    </span>
                    <span className="min-w-0">
                      <span className={`block text-sm font-semibold ${current ? 'text-slate-900' : 'text-slate-700'}`}>{s.label}</span>
                      <span className="hidden text-xs text-slate-500 lg:block">{s.description}</span>
                    </span>
                  </button>
                </li>);

            })}
          </ol>
        </nav>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8" aria-labelledby="step-heading">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Step {step + 1} of {wizardSteps.length}</p>
          <h2 id="step-heading" className="mt-1 text-xl font-bold text-slate-900">{wizardSteps[step].label}</h2>
          <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-slate-100">
            <motion.div className="h-full rounded-full bg-primary-600" animate={{ width: `${(step + 1) / wizardSteps.length * 100}%` }} transition={{ duration: 0.3 }} />
          </div>

          <motion.div key={step} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="mt-8">
            {step === 0 && <DetailsStep {...stepProps} />}
            {step === 1 && <CategoryStep {...stepProps} />}
            {step === 2 && <PricingStep {...stepProps} />}
            {step === 3 && <PortfolioStep {...stepProps} />}
            {step === 4 && <FaqStep {...stepProps} />}
          </motion.div>

          <div className="mt-10 flex items-center justify-between border-t border-slate-100 pt-6">
            <Button variant="ghost" onClick={back} disabled={step === 0} leftIcon={<ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />}>
              Back
            </Button>
            {isLast ?
            <Button onClick={publish} loading={publishing}>Publish listing</Button> :

            <Button onClick={next} rightIcon={<ArrowRightIcon className="h-4 w-4" aria-hidden="true" />}>Continue</Button>
            }
          </div>
        </section>

        <aside className="hidden lg:block">
          <div className="sticky top-24"><ListingPreview draft={draft} user={user} /></div>
        </aside>
      </div>
    </div>);

}