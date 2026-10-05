import React from 'react';
import { CheckIcon } from 'lucide-react';
import { steps } from '../../hooks/usePostJobForm';
import { cn } from '../../utils/styles';

interface WizardNavProps {
  current: number;
  maxReached: number;
  onSelect: (i: number) => void;
}

export function WizardNav({ current, maxReached, onSelect }: WizardNavProps) {
  return (
    <>
      <div className="lg:hidden">
        <div className="flex items-center justify-between text-sm">
          <p className="font-extrabold text-ink-900">{steps[current].label}</p>
          <p className="font-semibold text-ink-500">
            Step {current + 1} of {steps.length}
          </p>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink-200" role="progressbar" aria-valuemin={1} aria-valuemax={steps.length} aria-valuenow={current + 1}>
          <div className="h-full rounded-full bg-primary-600 transition-all" style={{ width: `${(current + 1) / steps.length * 100}%` }} />
        </div>
      </div>
      <nav aria-label="Post a job steps" className="hidden lg:block">
        <ol className="space-y-1">
          {steps.map((s, i) => {
            const done = i < current || i <= maxReached && i !== current;
            const reachable = i <= maxReached;
            return (
              <li key={s.id}>
                <button
                  type="button"
                  disabled={!reachable}
                  onClick={() => onSelect(i)}
                  aria-current={i === current ? 'step' : undefined}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors',
                    i === current ? 'bg-white shadow-card ring-1 ring-ink-200' : reachable ? 'hover:bg-white/70' : 'cursor-not-allowed opacity-60'
                  )}>
                  
                  <span
                    className={cn(
                      'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-extrabold',
                      i === current ?
                      'bg-primary-600 text-white' :
                      done ?
                      'bg-emerald-600 text-white' :
                      'border-2 border-ink-300 text-ink-500'
                    )}>
                    
                    {done && i !== current ? <CheckIcon className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" /> : i + 1}
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-ink-900">{s.label}</span>
                    <span className="block text-xs text-ink-500">{s.description}</span>
                  </span>
                </button>
              </li>);

          })}
        </ol>
      </nav>
    </>);

}