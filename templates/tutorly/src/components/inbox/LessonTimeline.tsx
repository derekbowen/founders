import React from 'react';
import { format, parseISO } from 'date-fns';
import type { TimelineEvent } from '../../types/marketplace';

export function LessonTimeline({ events }: {events: TimelineEvent[];}) {
  return (
    <div className="rounded-2xl border border-ink-200 bg-white p-4">
      <h3 className="text-sm font-semibold text-ink-900">Activity</h3>
      <ol className="mt-4 space-y-4">
        {events.map((e, i) =>
        <li key={e.id} className="relative flex gap-3 pl-1">
            {i < events.length - 1 && <span className="absolute left-[9px] top-5 h-full w-px bg-ink-200" aria-hidden="true" />}
            <span
            className={`relative mt-1 h-3 w-3 shrink-0 rounded-full border-2 ${
            i === events.length - 1 ? 'border-primary-600 bg-primary-600' : 'border-ink-300 bg-white'}`
            }
            aria-hidden="true" />
          
            <div>
              <p className="text-sm text-ink-800">{e.label}</p>
              <p className="text-xs text-ink-500">{format(parseISO(e.at), 'MMM d, yyyy · h:mm a')}</p>
            </div>
          </li>
        )}
      </ol>
    </div>);

}