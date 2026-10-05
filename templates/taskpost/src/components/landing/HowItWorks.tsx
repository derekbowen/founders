import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRightIcon } from 'lucide-react';
import { ButtonLink } from '../ui/ButtonLink';
import { howItWorks } from '../../data/howItWorks';
import type { UserRole } from '../../types/marketplace';
import { cn } from '../../utils/styles';

export function HowItWorks() {
  const [side, setSide] = useState<UserRole>('customer');
  const steps = howItWorks[side];

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="how-heading">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-primary-700">How it works</p>
          <h2 id="how-heading" className="mt-2 text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
            Simple for both sides
          </h2>
        </div>
        <div role="tablist" aria-label="Choose your side" className="inline-flex w-fit rounded-xl bg-ink-200/70 p-1">
          {(['customer', 'pro'] as UserRole[]).map((r) =>
          <button
            key={r}
            role="tab"
            type="button"
            aria-selected={side === r}
            onClick={() => setSide(r)}
            className={cn(
              'rounded-lg px-4 py-2 text-sm font-bold transition-colors',
              side === r ? 'bg-white text-ink-900 shadow-sm' : 'text-ink-600 hover:text-ink-900'
            )}>
            
              {r === 'customer' ? 'I need a job done' : 'I’m a pro'}
            </button>
          )}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.ol
          key={side}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18 }}
          className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          
          {steps.map((step, i) =>
          <li key={step.title} className="relative rounded-2xl border border-ink-200 bg-white p-6 shadow-card">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600 text-sm font-extrabold text-white">
                {i + 1}
              </span>
              <h3 className="mt-5 text-lg font-extrabold text-ink-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">{step.text}</p>
            </li>
          )}
        </motion.ol>
      </AnimatePresence>

      <div className="mt-8">
        {side === 'customer' ?
        <ButtonLink to="/post-job" rightIcon={<ArrowRightIcon className="h-4 w-4" />}>
            Post your first job
          </ButtonLink> :

        <ButtonLink to="/search" variant="dark" rightIcon={<ArrowRightIcon className="h-4 w-4" />}>
            Browse open jobs
          </ButtonLink>
        }
      </div>
    </section>);

}