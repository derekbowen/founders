import React from 'react';
import { CheckIcon } from 'lucide-react';
import { wizardSteps } from '../../data/listingWizard';

interface WizardStepperProps {
  step: number;
  maxVisited: number;
  onSelect: (i: number) => void;
}

export function WizardStepper({ step, maxVisited, onSelect }: WizardStepperProps) {
  return (
    <>
      <div className="lg:hidden">
        <p className="text-xs font-medium text-muted">
          Step {step + 1} of {wizardSteps.length}
        </p>
        <div className="mt-2 flex gap-1.5" aria-hidden>
          {wizardSteps.map((s, i) =>
          <span key={s.id} className={`h-1.5 flex-1 rounded-full ${i <= step ? 'bg-primary' : 'bg-line'}`} />
          )}
        </div>
      </div>
      <ol className="hidden space-y-1 lg:block" aria-label="Listing steps">
        {wizardSteps.map((s, i) => {
          const active = i === step;
          const done = i < step || i <= maxVisited && i !== step;
          const reachable = i <= maxVisited;
          return (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => onSelect(i)}
                disabled={!reachable}
                aria-current={active ? 'step' : undefined}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${active ? 'bg-surface shadow-soft ring-1 ring-line' : reachable ? 'hover:bg-subtle' : 'cursor-not-allowed opacity-60'}`}>
                
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                  active ? 'bg-primary text-white' : done ? 'bg-accent-ink text-white' : 'border border-line text-muted'}`
                  }>
                  
                  {done && !active ? <CheckIcon className="h-3.5 w-3.5" aria-hidden /> : i + 1}
                </span>
                <span>
                  <span className={`block text-sm font-medium ${active ? 'text-ink' : 'text-ink/80'}`}>{s.label}</span>
                  <span className="block text-[11px] text-muted">{s.description}</span>
                </span>
              </button>
            </li>);

        })}
      </ol>
    </>);

}