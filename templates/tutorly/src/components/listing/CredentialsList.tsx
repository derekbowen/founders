import React from 'react';
import { AwardIcon, BadgeCheckIcon, ClockIcon } from 'lucide-react';
import type { Credential } from '../../types/marketplace';

export function CredentialsList({ items }: {items: Credential[];}) {
  return (
    <ul className="space-y-3">
      {items.map((c) =>
      <li key={c.title} className="flex items-start gap-3 rounded-2xl border border-ink-200 p-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-100 text-accent-800">
            <AwardIcon size={20} aria-hidden="true" />
          </span>
          <div className="flex-1">
            <p className="font-medium text-ink-900">{c.title}</p>
            <p className="text-sm text-ink-600">{c.institution} · {c.year}</p>
          </div>
          {c.verified ?
        <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-800">
              <BadgeCheckIcon size={13} aria-hidden="true" /> Verified
            </span> :

        <span className="inline-flex items-center gap-1 rounded-full bg-ink-100 px-2 py-0.5 text-xs font-medium text-ink-600">
              <ClockIcon size={13} aria-hidden="true" /> Pending
            </span>
        }
        </li>
      )}
    </ul>);

}