import React from 'react';
import { CheckIcon, XIcon } from 'lucide-react';
import type { TransactionStatus } from '../../types/transaction';

const steps: {id: TransactionStatus;label: string;}[] = [
{ id: 'requested', label: 'Requested' },
{ id: 'confirmed', label: 'Confirmed' },
{ id: 'in-care', label: 'In care' },
{ id: 'completed', label: 'Completed' }];


export function StatusTimeline({ status }: {status: TransactionStatus;}) {
  if (status === 'cancelled') {
    return (
      <div className="flex items-center gap-2 rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
        <XIcon className="h-4 w-4" aria-hidden="true" /> This booking was cancelled.
      </div>);

  }
  const current = steps.findIndex((s) => s.id === status);
  return (
    <ol className="flex items-center" aria-label="Booking progress">
      {steps.map((s, i) => {
        const done = i < current || status === 'completed';
        const active = i === current && status !== 'completed';
        return (
          <li key={s.id} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-1">
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-black ${
                done ? 'bg-accent-600 text-white' : active ? 'bg-primary-500 text-ink-900 ring-4 ring-primary-100' : 'bg-ink-100 text-ink-500'}`
                }
                aria-current={active ? 'step' : undefined}>
                
                {done ? <CheckIcon className="h-4 w-4" strokeWidth={3} aria-hidden="true" /> : i + 1}
              </span>
              <span className={`whitespace-nowrap text-[11px] font-bold ${active || done ? 'text-ink-900' : 'text-ink-500'}`}>{s.label}</span>
            </div>
            {i < steps.length - 1 && <span className={`mx-1 mb-5 h-0.5 flex-1 rounded-full ${i < current || status === 'completed' ? 'bg-accent-600' : 'bg-ink-200'}`} />}
          </li>);

      })}
    </ol>);

}