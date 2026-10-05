import React from 'react';
import { CheckIcon, XIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import type { TimelineStep } from '../../utils/transactions';

export function Timeline({ steps }: {steps: TimelineStep[];}) {
  return (
    <ol className="space-y-0">
      {steps.map((s, i) =>
      <li key={s.label} className="relative flex gap-3 pb-5 last:pb-0">
          {i < steps.length - 1 && <span className="absolute left-[11px] top-6 h-full w-0.5 bg-slate-200" aria-hidden />}
          <span
          className={twMerge(
            'relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2',
            s.state === 'done' && 'border-accent-700 bg-accent-700 text-white',
            s.state === 'current' && 'border-primary-600 bg-white',
            s.state === 'upcoming' && 'border-slate-300 bg-white',
            s.state === 'failed' && 'border-red-600 bg-red-600 text-white'
          )}>
          
            {s.state === 'done' && <CheckIcon className="h-3.5 w-3.5" aria-hidden />}
            {s.state === 'failed' && <XIcon className="h-3.5 w-3.5" aria-hidden />}
            {s.state === 'current' && <span className="h-2 w-2 rounded-full bg-primary-600" />}
          </span>
          <div>
            <p className={twMerge('text-sm font-semibold', s.state === 'upcoming' ? 'text-slate-500' : 'text-slate-900')}>{s.label}</p>
            <p className="text-xs text-slate-600">{s.detail}</p>
          </div>
        </li>
      )}
    </ol>);

}