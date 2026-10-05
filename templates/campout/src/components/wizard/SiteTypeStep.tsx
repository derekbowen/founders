import React from 'react';
import { CircleCheckIcon } from 'lucide-react';
import { siteTypes } from '../../data/siteTypes';
import type { WizardStepProps } from '../../types/wizard';

export function SiteTypeStep({ draft, update }: WizardStepProps) {
  return (
    <div role="radiogroup" aria-label="Site type" className="grid gap-3 sm:grid-cols-2">
      {siteTypes.map((t) => {
        const active = draft.siteType === t.key;
        return (
          <button
            key={t.key}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => update({ siteType: t.key })}
            className={`relative flex items-start gap-4 rounded-2xl border-2 p-5 text-left transition ${
            active ? 'border-primary-700 bg-primary-50' : 'border-sand-200 bg-white hover:border-sand-400'}`
            }>
            
            <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl ${active ? 'bg-primary-700 text-white' : 'bg-sand-100 text-primary-700'}`}>
              <t.icon size={24} aria-hidden="true" />
            </span>
            <span>
              <span className="block font-serif text-lg font-bold text-ink-900">{t.label}</span>
              <span className="mt-0.5 block text-sm text-ink-500">{t.description}</span>
            </span>
            {active && <CircleCheckIcon size={20} className="absolute right-4 top-4 text-primary-700" aria-hidden="true" />}
          </button>);

      })}
    </div>);

}