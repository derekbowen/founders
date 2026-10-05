import React from 'react';
import { FileTextIcon, HandshakeIcon, MessagesSquareIcon } from 'lucide-react';
import { howItWorksSteps } from '../../data/marketing';

const icons = {
  describe: FileTextIcon,
  offers: MessagesSquareIcon,
  hire: HandshakeIcon
};

export function HowItWorks() {
  return (
    <section className="border-y border-slate-200 bg-white" aria-labelledby="how-heading">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary-600">How quotes work</p>
          <h2 id="how-heading" className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">From brief to hire in three steps</h2>
        </div>
        <div className="relative mt-10">
        <div className="absolute left-0 right-0 top-7 hidden h-px bg-slate-200 md:block" aria-hidden="true" />
        <ol className="relative grid gap-6 md:grid-cols-3">
          {howItWorksSteps.map((step, i) => {
              const Icon = icons[step.icon];
              return (
                <li key={step.title} className="relative rounded-2xl border border-slate-200 bg-slate-50 p-6 md:border-0 md:bg-transparent md:p-0">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-600 text-white ring-8 ring-white">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                    <span className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-accent-400 text-xs font-bold text-accent-900">{i + 1}</span>
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-bold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.text}</p>
              </li>);

            })}
        </ol>
        </div>
      </div>
    </section>);

}