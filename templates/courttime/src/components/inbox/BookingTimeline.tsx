import React from 'react';
import { CheckIcon, XIcon } from 'lucide-react';
import { Transaction } from '../../types/marketplace';
import { getTimeline } from '../../utils/transactions';

export function BookingTimeline({ tx }: {tx: Transaction;}) {
  const steps = getTimeline(tx);
  return (
    <ol className="space-y-0">
      {steps.map((step, i) => {
        const last = i === steps.length - 1;
        const dot =
        step.state === 'done' ?
        'bg-brand text-white' :
        step.state === 'current' ?
        'bg-accent text-ink ring-4 ring-accent/30' :
        step.state === 'cancelled' ?
        'bg-red-500 text-white' :
        'border-2 border-slate-300 bg-white';
        return (
          <li key={step.label} className="relative flex gap-3 pb-5 last:pb-0">
            {!last && <span className="absolute left-[11px] top-6 h-full w-0.5 bg-slate-200" aria-hidden="true" />}
            <span className={`relative z-10 grid h-6 w-6 shrink-0 place-items-center rounded-full ${dot}`} aria-hidden="true">
              {step.state === 'done' && <CheckIcon size={13} strokeWidth={3} />}
              {step.state === 'cancelled' && <XIcon size={13} strokeWidth={3} />}
            </span>
            <div>
              <p className={`text-sm font-semibold ${step.state === 'upcoming' ? 'text-slate-500' : ''}`}>{step.label}</p>
              <p className="text-xs text-slate-500">{step.detail}</p>
            </div>
          </li>);

      })}
    </ol>);

}