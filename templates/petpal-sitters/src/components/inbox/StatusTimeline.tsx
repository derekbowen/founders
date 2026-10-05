import React from 'react';
import { CheckIcon, XIcon } from 'lucide-react';
import { statusMeta, statusOrder } from '../../data/statuses';
import type { TransactionStatus } from '../../types/marketplace';
import { cn } from '../../utils/cn';

export function StatusTimeline({ status }: {status: TransactionStatus;}) {
  if (status === 'cancelled') {
    return (
      <div className="flex items-center gap-3 rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-red-100">
          <XIcon className="h-4 w-4" aria-hidden="true" />
        </span>
        {statusMeta.cancelled.description}
      </div>);

  }
  const current = statusOrder.indexOf(status);
  return (
    <ol className="flex items-center" aria-label="Booking progress">
      {statusOrder.map((s, i) => {
        const done = i < current || status === 'completed';
        const active = i === current && status !== 'completed';
        return (
          <li key={s} className={cn('flex items-center', i < statusOrder.length - 1 && 'flex-1')} aria-current={active ? 'step' : undefined}>
            <div className="flex flex-col items-center gap-1.5">
              <span
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full text-xs font-black',
                  done && 'bg-accent-600 text-white',
                  active && 'bg-primary-500 text-stone-900 ring-4 ring-primary-100',
                  !done && !active && 'bg-stone-100 text-stone-400'
                )}>
                
                {done ? <CheckIcon className="h-4 w-4" strokeWidth={3} aria-hidden="true" /> : i + 1}
              </span>
              <span className={cn('whitespace-nowrap text-xs font-bold', done || active ? 'text-stone-800' : 'text-stone-400')}>{statusMeta[s].label}</span>
            </div>
            {i < statusOrder.length - 1 && <span className={cn('mx-2 mb-5 h-0.5 flex-1 rounded-full', i < current || status === 'completed' ? 'bg-accent-600' : 'bg-stone-200')} />}
          </li>);

      })}
    </ol>);

}