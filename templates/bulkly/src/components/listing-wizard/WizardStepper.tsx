import React from 'react';
import { CheckIcon } from 'lucide-react';
import { wizardSteps } from '../../hooks/useListingWizard';

interface WizardStepperProps {
  step: number;
  completed: number[];
  onSelect: (index: number) => void;
}

export function WizardStepper({ step, completed, onSelect }: WizardStepperProps) {
  return (
    <nav aria-label="Listing steps">
      <p className="mb-3 text-xs font-semibold text-slate-500 lg:hidden">
        Step {step + 1} of {wizardSteps.length} · {wizardSteps[step].title}
      </p>
      <div className="mb-2 h-1.5 overflow-hidden rounded-full bg-slate-200 lg:hidden">
        <div className="h-full rounded-full bg-primary-700 transition-all" style={{ width: `${(step + 1) / wizardSteps.length * 100}%` }} />
      </div>
      <ol className="hidden space-y-1 lg:block">
        {wizardSteps.map((s, i) => {
          const done = completed.includes(i);
          const current = i === step;
          const reachable = done || i <= step || completed.includes(i - 1);
          return (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => onSelect(i)}
                disabled={!reachable}
                aria-current={current ? 'step' : undefined}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                current ? 'bg-primary-50' : reachable ? 'hover:bg-slate-100' : 'cursor-not-allowed opacity-60'}`
                }>
                
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  done && !current ?
                  'bg-accent-400 text-primary-950' :
                  current ?
                  'bg-primary-700 text-white' :
                  'border-2 border-slate-300 text-slate-500'}`
                  }>
                  
                  {done && !current ? <CheckIcon className="h-4 w-4" aria-hidden="true" /> : i + 1}
                </span>
                <span>
                  <span className={`block text-sm font-semibold ${current ? 'text-primary-900' : 'text-slate-800'}`}>{s.title}</span>
                  <span className="block text-xs text-slate-500">{s.description}</span>
                </span>
              </button>
            </li>);

        })}
      </ol>
    </nav>);

}