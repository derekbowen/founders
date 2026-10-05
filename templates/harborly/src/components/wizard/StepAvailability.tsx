import React, { useMemo, useState } from 'react';
import { addDays, addMonths, endOfMonth, format, isBefore, isSameMonth, startOfDay, startOfMonth, startOfWeek } from 'date-fns';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { cn } from '../../utils/ui';
import type { StepProps } from '../../types/listingDraft';

export function StepAvailability({ draft, update }: StepProps) {
  const [month, setMonth] = useState(() => startOfMonth(new Date()));
  const today = startOfDay(new Date());

  const days = useMemo(() => {
    const start = startOfWeek(month);
    const end = endOfMonth(month);
    const list: Date[] = [];
    for (let d = start; d <= end || list.length % 7 !== 0; d = addDays(d, 1)) list.push(d);
    return list;
  }, [month]);

  const toggle = (iso: string) =>
  update({ blockedDates: draft.blockedDates.includes(iso) ? draft.blockedDates.filter((x) => x !== iso) : [...draft.blockedDates, iso].sort() });

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted">Your boat is bookable every day by default. Tap dates you’ll be using it yourself or it’s in for service.</p>
      <div className="max-w-md rounded-2xl border border-line p-5">
        <div className="flex items-center justify-between">
          <button type="button" onClick={() => setMonth((m) => addMonths(m, -1))} disabled={isSameMonth(month, today)} className="rounded-full p-2 hover:bg-sand-light disabled:opacity-30" aria-label="Previous month">
            <ChevronLeftIcon className="h-4 w-4" />
          </button>
          <p className="font-heading text-lg text-navy" aria-live="polite">
            {format(month, 'MMMM yyyy')}
          </p>
          <button type="button" onClick={() => setMonth((m) => addMonths(m, 1))} className="rounded-full p-2 hover:bg-sand-light" aria-label="Next month">
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-4 grid grid-cols-7 gap-1 text-center text-xs font-semibold text-muted" aria-hidden="true">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) =>
          <span key={i}>{d}</span>
          )}
        </div>
        <div className="mt-2 grid grid-cols-7 gap-1">
          {days.map((d) => {
            const iso = format(d, 'yyyy-MM-dd');
            const inMonth = isSameMonth(d, month);
            const past = isBefore(d, today);
            const blocked = draft.blockedDates.includes(iso);
            if (!inMonth) return <span key={iso} />;
            return (
              <button
                key={iso}
                type="button"
                disabled={past}
                onClick={() => toggle(iso)}
                aria-pressed={blocked}
                aria-label={`${format(d, 'EEEE, MMMM d')}${blocked ? ', blocked' : ', available'}`}
                className={cn(
                  'aspect-square rounded-lg text-sm transition-colors disabled:cursor-not-allowed disabled:text-line',
                  blocked ? 'bg-coral-dark font-semibold text-white line-through' : 'text-ink hover:bg-sand-light'
                )}>
                
                {format(d, 'd')}
              </button>);

          })}
        </div>
        <div className="mt-4 flex gap-4 border-t border-line pt-4 text-xs text-muted">
          <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded border border-line" /> Available</span>
          <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-coral-dark" /> Blocked</span>
        </div>
      </div>
      <p className="text-sm text-ink">
        <span className="font-semibold">{draft.blockedDates.length}</span> {draft.blockedDates.length === 1 ? 'day' : 'days'} blocked
      </p>
    </div>);

}