import React from 'react';
import { CheckIcon, XIcon } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { TimelineEvent } from '../../types/transaction';

export function BookingTimeline({ events }: {events: TimelineEvent[];}) {
  return (
    <ol className="relative space-y-5" aria-label="Booking timeline">
      {events.map((e, i) => {
        const last = i === events.length - 1;
        return (
          <li key={`${e.label}-${i}`} className="relative flex gap-3">
            {!last && <span aria-hidden className={`absolute left-[11px] top-7 h-[calc(100%-4px)] w-0.5 ${e.state === 'done' ? 'bg-primary-300' : 'bg-ink-200'}`} />}
            <span
              className={`relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
              e.state === 'done' ?
              'bg-primary-600 text-white' :
              e.state === 'current' ?
              'bg-white ring-2 ring-primary-500' :
              e.state === 'cancelled' ?
              'bg-ink-200 text-ink-700' :
              'bg-white ring-2 ring-ink-200'}`
              }>
              
              {e.state === 'done' && <CheckIcon className="h-3.5 w-3.5" aria-hidden />}
              {e.state === 'cancelled' && <XIcon className="h-3.5 w-3.5" aria-hidden />}
              {e.state === 'current' && <span className="h-2 w-2 rounded-full bg-primary-500" aria-hidden />}
            </span>
            <div className="-mt-0.5">
              <p className={`text-sm font-semibold ${e.state === 'upcoming' ? 'text-ink-500' : 'text-ink-900'}`}>
                {e.label}
                {e.state === 'current' && <span className="sr-only"> (current step)</span>}
              </p>
              {e.at && <p className="text-xs text-ink-600">{format(parseISO(e.at), 'MMM d, h:mm a')}</p>}
            </div>
          </li>);

      })}
    </ol>);

}