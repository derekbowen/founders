import React from 'react';
import { BadgeCheckIcon } from 'lucide-react';
import { certifications } from '../../data/catalog';
import type { WizardStepProps } from '../../types/wizard';
import { toggleValue } from '../../utils/search';
import { cn, focusRing, inputClass } from '../../utils/styles';
import { Field } from '../ui/Field';
import { Toggle } from '../ui/Toggle';

export function CertificationsStep({ draft, update, errors }: WizardStepProps) {
  return (
    <div className="space-y-6">
      <fieldset>
        <legend className="mb-3 text-sm font-medium text-steel-800">Which certifications does your kitchen hold?</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {certifications.map((c) => {
            const active = draft.certifications.includes(c.key);
            return (
              <button
                key={c.key}
                type="button"
                aria-pressed={active}
                onClick={() => update({ certifications: toggleValue(draft.certifications, c.key) })}
                className={cn('flex items-start gap-3 rounded-xl border p-4 text-left transition-colors', focusRing, active ? 'border-accent bg-accent-soft' : 'border-steel-200 hover:border-steel-400')}>
                
                <BadgeCheckIcon className={cn('mt-0.5 h-5 w-5 shrink-0', active ? 'text-accent' : 'text-steel-300')} aria-hidden="true" />
                <span>
                  <span className="block text-sm font-semibold text-steel-900">{c.label}</span>
                  <span className="block text-xs text-steel-500">{c.description}</span>
                </span>
              </button>);

          })}
        </div>
        {errors.certifications && <p className="mt-2 text-sm font-medium text-primary" role="alert">{errors.certifications}</p>}
      </fieldset>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Health permit number" htmlFor="wz-permit" error={errors.permitNumber}>
          <input id="wz-permit" value={draft.permitNumber} onChange={(e) => update({ permitNumber: e.target.value })} className={cn(inputClass, errors.permitNumber && 'border-primary')} placeholder="CHI-HD-2026-04817" aria-invalid={!!errors.permitNumber} />
        </Field>
        <Field label="Permit expiry" htmlFor="wz-permit-exp" optional>
          <input id="wz-permit-exp" type="month" value={draft.permitExpiry} onChange={(e) => update({ permitExpiry: e.target.value })} className={inputClass} />
        </Field>
      </div>
      <div className="rounded-xl border border-steel-200 p-4">
        <Toggle
          checked={draft.insuranceRequired}
          onChange={(v) => update({ insuranceRequired: v })}
          label="Require renter insurance"
          description="Renters must upload a $1M general liability certificate naming you. Strongly recommended." />
        
      </div>
    </div>);

}