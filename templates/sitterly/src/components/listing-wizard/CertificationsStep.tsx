import React from 'react';
import { ShieldCheckIcon } from 'lucide-react';
import { Checkbox } from '../Checkbox';
import { Toggle } from '../Toggle';
import { StepProps, toggleIn } from '../../hooks/useListingDraft';
import { certificationOptions, languageOptions } from '../../data/filterOptions';

export function CertificationsStep({ draft, update, errors }: StepProps) {
  return (
    <div className="space-y-8">
      <fieldset>
        <legend className="text-sm font-bold text-ink-900">Certifications</legend>
        <p className="mt-1 text-sm text-ink-600">We’ll ask you to upload certificates after publishing so we can verify them.</p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {certificationOptions.map((c) =>
          <div key={c} className="rounded-2xl bg-white p-3.5 ring-1 ring-ink-200">
              <Checkbox checked={draft.certifications.includes(c)} onChange={() => update({ certifications: toggleIn(draft.certifications, c) })} label={<span className="text-sm font-medium text-ink-900">{c}</span>} />
            </div>
          )}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-sm font-bold text-ink-900">Languages you speak</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {languageOptions.map((l) => {
            const on = draft.languages.includes(l);
            return (
              <button key={l} type="button" aria-pressed={on} onClick={() => update({ languages: toggleIn(draft.languages, l) })} className={`rounded-full px-3.5 py-1.5 text-sm font-medium ring-1 ring-inset transition ${on ? 'bg-primary-600 text-white ring-primary-600' : 'bg-white text-ink-700 ring-ink-200 hover:ring-ink-400'}`}>
                {l}
              </button>);

          })}
        </div>
      </fieldset>

      <Toggle label="I’m a non-smoker" checked={draft.nonSmoker} onChange={(v) => update({ nonSmoker: v })} />

      <div className={`rounded-3xl p-5 ring-1 ${errors.backgroundCheckConsent ? 'bg-red-50 ring-red-200' : 'bg-emerald-50 ring-emerald-200'}`}>
        <div className="flex gap-3">
          <ShieldCheckIcon className="h-6 w-6 shrink-0 text-emerald-700" aria-hidden />
          <div>
            <p className="font-semibold text-ink-900">Background check</p>
            <p className="mt-1 text-sm text-ink-700">Free for sitters. Includes identity verification, national criminal search and sex-offender registry. Usually takes 1–3 days.</p>
            <div className="mt-3">
              <Checkbox
                id="backgroundCheckConsent"
                checked={draft.backgroundCheckConsent}
                error={!!errors.backgroundCheckConsent}
                onChange={(e) => update({ backgroundCheckConsent: e.target.checked })}
                label={<span className="text-sm font-medium text-ink-900">I consent to a background check</span>} />
              
            </div>
            {errors.backgroundCheckConsent && <p role="alert" className="mt-2 text-xs font-medium text-red-700">{errors.backgroundCheckConsent}</p>}
          </div>
        </div>
      </div>
    </div>);

}