import React from 'react';
import { formatMessageTime } from '../../utils/format';
import type { TimelineEvent } from '../../types/transaction';

export function TransactionTimeline({ events }: {events: TimelineEvent[];}) {
  return (
    <ol className="relative space-y-4 pl-6">
      <span className="absolute bottom-2 left-[7px] top-2 w-px bg-line" aria-hidden />
      {events.map((e, i) => {
        const latest = i === events.length - 1;
        return (
          <li key={e.id} className="relative">
            <span
              className={`absolute -left-6 top-1 h-[15px] w-[15px] rounded-full border-2 ${
              latest ? 'border-ink bg-accent' : 'border-line bg-surface'}`
              }
              aria-hidden />
            
            <p className={`text-sm ${latest ? 'font-semibold' : ''}`}>{e.label}</p>
            <p className="text-xs text-muted">{formatMessageTime(e.at)}</p>
          </li>);

      })}
    </ol>);

}