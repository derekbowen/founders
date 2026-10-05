import React, { useState } from 'react';
import { addDays, addMonths, endOfMonth, format, isSameMonth, startOfMonth, startOfWeek } from 'date-fns';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import type { DraftUpdater, ListingDraft } from '../../types/draft';
import { fromToday, isoDate } from '../../utils/format';
import { cx, labelClass } from '../../utils/styles';

export function AvailabilityStep({ draft, set }: {draft: ListingDraft;set: DraftUpdater;}) {
  const [offset, setOffset] = useState(0);
  const month = addMonths(startOfMonth(fromToday(0)), offset);
  const start = startOfWeek(month, { weekStartsOn: 1 });
  const cells: Date[] = [];
  for (let d = start; d <= endOfMonth(month) || cells.length % 7 !== 0; d = addDays(d, 1)) cells.push(d);
  const today = fromToday(0);

  const toggle = (d: Date) => {
    const key = isoDate(d);
    set('blocked', draft.blocked.includes(key) ? draft.blocked.filter((k) => k !== key) : [...draft.blocked, key]);
  };

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted">
        Your dress is available every day by default. Tap dates to block them — e.g. when you’re wearing it yourself.
      </p>
      <div className="max-w-md border border-line p-5">
        <div className="mb-4 flex items-center justify-between">
          <button type="button" aria-label="Previous month" disabled={offset === 0} onClick={() => setOffset((o) => o - 1)} className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-cream disabled:opacity-30">
            <ChevronLeftIcon size={16} aria-hidden="true" />
          </button>
          <p className="font-display text-lg">{format(month, 'MMMM yyyy')}</p>
          <button type="button" aria-label="Next month" onClick={() => setOffset((o) => o + 1)} className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-cream">
            <ChevronRightIcon size={16} aria-hidden="true" />
          </button>
        </div>
        <div className="grid grid-cols-7 text-center text-[10px] font-semibold uppercase tracking-wider text-muted">
          {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((d) =>
          <span key={d} className="pb-2">{d}</span>
          )}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {cells.map((d) => {
            const inMonth = isSameMonth(d, month);
            const past = d < today;
            const blocked = draft.blocked.includes(isoDate(d));
            if (!inMonth) return <span key={d.toISOString()} aria-hidden="true" />;
            return (
              <button
                key={d.toISOString()}
                type="button"
                disabled={past}
                aria-pressed={blocked}
                aria-label={`${format(d, 'MMMM d')}${blocked ? ', blocked' : ', available'}`}
                onClick={() => toggle(d)}
                className={cx(
                  'h-10 text-sm transition',
                  past && 'cursor-not-allowed text-muted/40',
                  !past && !blocked && 'bg-paper text-ink hover:bg-cream',
                  blocked && 'bg-ink/90 text-paper line-through'
                )}>
                
                {format(d, 'd')}
              </button>);

          })}
        </div>
        <p className="mt-4 text-xs text-muted">{draft.blocked.length} date{draft.blocked.length === 1 ? '' : 's'} blocked</p>
      </div>
      <div className="max-w-md">
        <label htmlFor="notice" className={labelClass}>Minimum notice</label>
        <select
          id="notice"
          value={draft.notice}
          onChange={(e) => set('notice', e.target.value)}
          className="h-11 w-full border border-line bg-paper px-3 text-sm focus:border-ink focus:outline-none">
          
          <option value="2">2 days before the rental starts</option>
          <option value="4">4 days before</option>
          <option value="7">1 week before</option>
        </select>
      </div>
    </div>);

}