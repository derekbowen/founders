import React from 'react';
import { CheckIcon, XIcon } from 'lucide-react';

interface IncludedListProps {
  included: string[];
  notIncluded: string[];
}

export function IncludedList({ included, notIncluded }: IncludedListProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div className="rounded-2xl bg-accent-50 p-5">
        <h3 className="text-sm font-semibold text-accent-800">What's included</h3>
        <ul className="mt-3 space-y-2.5">
          {included.map((item) =>
          <li key={item} className="flex gap-2.5 text-sm text-slate-800">
              <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent-700" aria-hidden />
              {item}
            </li>
          )}
        </ul>
      </div>
      <div className="rounded-2xl bg-sand-100 p-5">
        <h3 className="text-sm font-semibold text-slate-800">Not included</h3>
        <ul className="mt-3 space-y-2.5">
          {notIncluded.map((item) =>
          <li key={item} className="flex gap-2.5 text-sm text-slate-700">
              <XIcon className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" aria-hidden />
              {item}
            </li>
          )}
        </ul>
      </div>
    </div>);

}