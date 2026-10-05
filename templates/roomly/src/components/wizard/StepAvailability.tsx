import React from 'react';
import { stayLengthOptions } from '../../data/features';
import { fieldStyles } from '../../utils/styles';
import { formatMonths } from '../../utils/format';
import type { WizardStepProps } from '../../hooks/useListingWizard';

export function StepAvailability({ draft, update, errors }: WizardStepProps) {
  return (
    <div className="space-y-6">
      <div className="max-w-xs">
        <label htmlFor="w-from" className={fieldStyles.label}>
          Available from
        </label>
        <input
          id="w-from"
          type="date"
          min="2026-10-01"
          value={draft.availableFrom}
          onChange={(e) => update('availableFrom', e.target.value)}
          className={fieldStyles.control}
          aria-invalid={!!errors.availableFrom} />
        
        {errors.availableFrom && <p className={fieldStyles.error}>{errors.availableFrom}</p>}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="w-min" className={fieldStyles.label}>
            Minimum stay
          </label>
          <select id="w-min" value={draft.minStay} onChange={(e) => update('minStay', Number(e.target.value))} className={fieldStyles.control}>
            {stayLengthOptions.map((m) =>
            <option key={m} value={m}>
                {formatMonths(m)}
              </option>
            )}
          </select>
        </div>
        <div>
          <label htmlFor="w-max" className={fieldStyles.label}>
            Maximum stay
          </label>
          <select
            id="w-max"
            value={draft.maxStay ?? 'none'}
            onChange={(e) => update('maxStay', e.target.value === 'none' ? null : Number(e.target.value))}
            className={fieldStyles.control}
            aria-invalid={!!errors.maxStay}>
            
            {stayLengthOptions.map((m) =>
            <option key={m} value={m}>
                {formatMonths(m)}
              </option>
            )}
            <option value="none">No maximum</option>
          </select>
          {errors.maxStay && <p className={fieldStyles.error}>{errors.maxStay}</p>}
        </div>
      </div>
      <div className="rounded-2xl border border-navy-100 bg-navy-50 p-5 text-sm text-navy-700">
        <p className="font-semibold text-navy-900">Tip for medium-term stays</p>
        <p className="mt-1">
          Rooms with a minimum stay of 3–6 months get the most inquiries from interns and exchange students.
        </p>
      </div>
    </div>);

}