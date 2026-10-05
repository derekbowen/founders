import React from 'react';
import { Input } from '../Input';
import { Toggle } from '../Toggle';
import { brand } from '../../data/brand';
import { calculateTutorEarnings } from '../../utils/pricing';
import { formatMoney } from '../../utils/format';
import type { ListingDraft } from '../../hooks/useListingWizard';

interface StepProps {
  draft: ListingDraft;
  update: (patch: Partial<ListingDraft>) => void;
  showErrors: boolean;
}

export function PricingStep({ draft, update, showErrors }: StepProps) {
  const invalidRate = draft.hourlyRate < 10 || draft.hourlyRate > 300;
  const patchPackage = (lessons: number, patch: Partial<ListingDraft['packages'][number]>) =>
  update({ packages: draft.packages.map((p) => p.lessons === lessons ? { ...p, ...patch } : p) });

  return (
    <div className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2 sm:items-start">
        <Input
          id="hourly-rate"
          label="Hourly rate (USD)"
          type="number"
          min={10}
          max={300}
          startAdornment={<span className="text-ink-500">$</span>}
          value={String(draft.hourlyRate)}
          onChange={(e) => update({ hourlyRate: Number(e.target.value) })}
          helperText="Most tutors in your subjects charge $35–$65."
          error={showErrors && invalidRate ? 'Enter a rate between $10 and $300' : undefined} />
        
        <div className="rounded-2xl bg-primary-50 p-4">
          <p className="text-sm text-primary-900">You'll earn per hour</p>
          <p className="mt-1 text-3xl font-semibold text-ink-900">{formatMoney(calculateTutorEarnings(draft.hourlyRate || 0))}</p>
          <p className="mt-1 text-xs text-primary-900">After {Math.round(brand.tutorCommissionRate * 100)}% {brand.name} commission</p>
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold text-ink-900">Lesson packages</p>
        <p className="mt-0.5 text-sm text-ink-600">Offer a discount when learners prepay for multiple lessons.</p>
        <ul className="mt-3 space-y-2">
          {draft.packages.map((p) =>
          <li key={p.lessons} className="flex flex-wrap items-center gap-4 rounded-2xl border border-ink-200 p-4">
              <Toggle checked={p.enabled} onChange={(v) => patchPackage(p.lessons, { enabled: v })} aria-label={`Offer ${p.lessons}-lesson package`} />
              <p className="flex-1 text-sm font-medium text-ink-900">{p.lessons}-lesson package</p>
              <label className="flex items-center gap-2 text-sm text-ink-700">
                Discount
                <select
                value={p.discountPercent}
                disabled={!p.enabled}
                onChange={(e) => patchPackage(p.lessons, { discountPercent: Number(e.target.value) })}
                className="h-9 rounded-lg border border-ink-200 px-2 text-sm disabled:bg-ink-50 disabled:text-ink-400">
                
                  {[0, 5, 8, 10, 12, 15, 20].map((n) =>
                <option key={n} value={n}>{n}%</option>
                )}
                </select>
              </label>
              {p.enabled &&
            <p className="w-full text-xs text-ink-500 sm:w-auto">
                  Learner pays {formatMoney(draft.hourlyRate * p.lessons * (1 - p.discountPercent / 100))} for {p.lessons} hours
                </p>
            }
            </li>
          )}
        </ul>
      </div>

      <div className="flex items-start justify-between gap-4 rounded-2xl bg-accent-50 p-4">
        <div>
          <p className="text-sm font-medium text-ink-900">Offer a 50% off first lesson</p>
          <p className="mt-0.5 text-sm text-ink-600">Tutors with a trial offer get booked 2× faster.</p>
        </div>
        <Toggle checked={draft.trialLesson} onChange={(v) => update({ trialLesson: v })} aria-label="Offer discounted trial lesson" />
      </div>
    </div>);

}