import React from 'react';
import type { BookingStatus, TimelineEvent } from '../../types/marketplace';
import { formatDate } from '../../utils/format';
import { cn } from '../../utils/styles';

const nextStep: Partial<Record<BookingStatus, string>> = {
  requested: 'Awaiting host response',
  approved: 'Session check-in',
  'in-session': 'Cleaning sign-off'
};

export function BookingTimeline({ events, status }: {events: TimelineEvent[];status: BookingStatus;}) {
  const pending = nextStep[status];
  return (
    <ol className="relative space-y-4 border-l-2 border-steel-200 pl-5">
      {events.map((e, i) =>
      <li key={`${e.label}-${e.at}`} className="relative">
          <span
          className={cn(
            'absolute -left-[27px] top-1 h-3 w-3 rounded-full border-2 border-white',
            i === events.length - 1 ? status === 'cancelled' ? 'bg-primary' : 'bg-accent' : 'bg-steel-400'
          )}
          aria-hidden="true" />
        
          <p className="text-sm font-medium text-steel-900">{e.label}</p>
          <p className="text-xs text-steel-500">{formatDate(e.at, 'MMM d, h:mm a')}</p>
        </li>
      )}
      {pending &&
      <li className="relative">
          <span className="absolute -left-[27px] top-1 h-3 w-3 rounded-full border-2 border-dashed border-steel-400 bg-white" aria-hidden="true" />
          <p className="text-sm text-steel-500">{pending}</p>
          <p className="text-xs text-steel-400">Next step</p>
        </li>
      }
    </ol>);

}