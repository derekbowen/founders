import React from 'react';
import { CheckIcon, XIcon } from 'lucide-react';
import type { Transaction, TransactionEventType } from '../../types/marketplace';
import { formatTimestamp } from '../../utils/format';
import { cn } from '../../utils/styles';

const steps: {type: TransactionEventType;label: string;}[] = [
{ type: 'offer', label: 'Offer sent' },
{ type: 'accepted', label: 'Offer accepted' },
{ type: 'paid', label: 'Payment secured' },
{ type: 'marked_done', label: 'Pro marked done' },
{ type: 'completed', label: 'Completion confirmed' }];


export function Timeline({ tx }: {tx: Transaction;}) {
  const counters = tx.events.filter((e) => e.type === 'counter').length;
  const declined = tx.events.find((e) => e.type === 'declined');
  const visible = declined ? steps.slice(0, 1) : steps;

  return (
    <section aria-labelledby={`timeline-${tx.id}`} className="rounded-2xl border border-ink-200 bg-white p-5">
      <h2 id={`timeline-${tx.id}`} className="text-sm font-extrabold text-ink-900">
        Timeline
      </h2>
      <ol className="mt-4 space-y-0">
        {visible.map((step, i) => {
          const ev = tx.events.find((e) => e.type === step.type);
          const done = Boolean(ev);
          const isLast = i === visible.length - 1 && !declined;
          return (
            <li key={step.type} className="relative flex gap-3 pb-5 last:pb-0">
              {!isLast &&
              <span
                className={cn('absolute left-[11px] top-6 h-[calc(100%-16px)] w-0.5', done ? 'bg-emerald-300' : 'bg-ink-200')}
                aria-hidden="true" />

              }
              <span
                className={cn(
                  'relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full',
                  done ? 'bg-emerald-600 text-white' : 'border-2 border-ink-300 bg-white'
                )}>
                
                {done && <CheckIcon className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />}
              </span>
              <div className="-mt-0.5">
                <p className={cn('text-sm font-bold', done ? 'text-ink-900' : 'text-ink-500')}>
                  {step.label}
                  {step.type === 'offer' && counters > 0 &&
                  <span className="ml-1.5 text-xs font-semibold text-amber-700">
                      +{counters} counter{counters > 1 ? 's' : ''}
                    </span>
                  }
                </p>
                <p className="text-xs text-ink-500">{ev ? formatTimestamp(ev.createdAt) : 'Pending'}</p>
              </div>
            </li>);

        })}
        {declined &&
        <li className="relative flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink-400 text-white">
              <XIcon className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
            </span>
            <div className="-mt-0.5">
              <p className="text-sm font-bold text-ink-900">Declined</p>
              <p className="text-xs text-ink-500">{formatTimestamp(declined.createdAt)}</p>
            </div>
          </li>
        }
      </ol>
    </section>);

}