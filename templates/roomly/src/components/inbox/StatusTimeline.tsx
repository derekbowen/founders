import React from 'react';
import { CheckIcon, XIcon } from 'lucide-react';
import { inquiryStatuses } from '../../data/inquiryStatuses';
import { formatDateTime } from '../../utils/format';
import type { Inquiry, InquiryStatus } from '../../types/inquiry';

const steps: InquiryStatus[] = ['sent', 'replied', 'viewing', 'agreed'];

export function StatusTimeline({ inquiry }: {inquiry: Inquiry;}) {
  const reachedAt = (s: InquiryStatus) => inquiry.timeline.find((t) => t.status === s);
  const closedEvent = reachedAt('closed');
  const currentIndex = steps.indexOf(inquiry.status);

  return (
    <ol className="relative space-y-5">
      {steps.map((s, i) => {
        const event = reachedAt(s);
        const done = !!event;
        const isCurrent = i === currentIndex;
        const showLine = i < steps.length - 1 || closedEvent;
        return (
          <li key={s} className="relative flex gap-3">
            {showLine &&
            <span
              className={`absolute left-[11px] top-7 h-[calc(100%-4px)] w-0.5 ${done ? 'bg-primary-300' : 'bg-navy-100'}`}
              aria-hidden />

            }
            <span
              className={`relative z-10 grid h-6 w-6 shrink-0 place-items-center rounded-full ${
              done ?
              isCurrent ?
              'bg-primary-500 text-white ring-4 ring-primary-100' :
              'bg-primary-500 text-white' :
              'border-2 border-navy-200 bg-white'}`
              }>
              
              {done && <CheckIcon size={13} strokeWidth={3} />}
            </span>
            <div className="min-w-0 pb-1">
              <p className={`text-sm font-semibold ${done ? 'text-navy-900' : 'text-navy-400'}`}>
                {inquiryStatuses[s].label}
              </p>
              {event ?
              <p className="text-xs text-navy-500">
                  {formatDateTime(event.at)}
                  {s === 'viewing' && inquiry.viewingAt && ` · for ${formatDateTime(inquiry.viewingAt)}`}
                  {event.note && ` · ${event.note}`}
                </p> :

              <p className="text-xs text-navy-400">{inquiryStatuses[s].description}</p>
              }
            </div>
          </li>);

      })}
      {closedEvent &&
      <li className="relative flex gap-3">
          <span className="relative z-10 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-navy-400 text-white">
            <XIcon size={13} strokeWidth={3} />
          </span>
          <div>
            <p className="text-sm font-semibold text-navy-900">Closed</p>
            <p className="text-xs text-navy-500">
              {formatDateTime(closedEvent.at)}
              {closedEvent.note && ` · ${closedEvent.note}`}
            </p>
          </div>
        </li>
      }
    </ol>);

}