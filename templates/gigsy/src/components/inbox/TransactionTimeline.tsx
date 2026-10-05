import React from 'react';
import { Transaction } from '../../types/marketplace';
import { formatDate } from '../../utils/format';
import { statusMeta } from '../../utils/txStatus';

export function TransactionTimeline({ tx }: {tx: Transaction;}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5" aria-labelledby="timeline-heading">
      <h2 id="timeline-heading" className="text-sm font-bold text-slate-900">Timeline</h2>
      <ol className="mt-4">
        {tx.timeline.map((event, i) => {
          const last = i === tx.timeline.length - 1;
          return (
            <li key={event.id} className="relative flex gap-3 pb-5 last:pb-0">
              {!last && <span className="absolute left-[7px] top-4 h-full w-px bg-slate-200" aria-hidden="true" />}
              <span className={`relative mt-1 h-3.5 w-3.5 shrink-0 rounded-full ring-4 ring-white ${last ? statusMeta[event.status].dot : 'bg-slate-300'}`} aria-hidden="true" />
              <div className="min-w-0">
                <p className={`text-sm ${last ? 'font-semibold text-slate-900' : 'text-slate-700'}`}>{event.label}</p>
                <time dateTime={event.at} className="text-xs text-slate-500">{formatDate(event.at, 'MMM d, h:mm a')}</time>
              </div>
            </li>);

        })}
      </ol>
    </section>);

}