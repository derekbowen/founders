import React from 'react';
import { PlusIcon, Trash2Icon } from 'lucide-react';
import { Input } from '../Input';
import { Toggle } from '../Toggle';
import type { ListingDraft } from '../../hooks/useListingWizard';

interface StepProps {
  draft: ListingDraft;
  update: (patch: Partial<ListingDraft>) => void;
  showErrors: boolean;
}

export function CredentialsStep({ draft, update, showErrors }: StepProps) {
  const patch = (id: string, field: 'title' | 'institution' | 'year', value: string) =>
  update({ credentials: draft.credentials.map((c) => c.id === id ? { ...c, [field]: value } : c) });

  const hasOne = draft.credentials.some((c) => c.title.trim() && c.institution.trim());

  return (
    <div className="space-y-5">
      {draft.credentials.map((c, i) =>
      <div key={c.id} className="rounded-2xl border border-ink-200 p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-semibold text-ink-900">Credential {i + 1}</p>
            {draft.credentials.length > 1 &&
          <button
            type="button"
            onClick={() => update({ credentials: draft.credentials.filter((x) => x.id !== c.id) })}
            className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-sm text-red-700 hover:bg-red-50">
            
                <Trash2Icon size={14} aria-hidden="true" /> Remove
              </button>
          }
          </div>
          <div className="grid gap-4 sm:grid-cols-[1fr_1fr_120px]">
            <Input id={`cred-title-${c.id}`} label="Degree or certificate" placeholder="B.S. Chemistry" value={c.title} onChange={(e) => patch(c.id, 'title', e.target.value)} />
            <Input id={`cred-inst-${c.id}`} label="Institution" placeholder="UC Davis" value={c.institution} onChange={(e) => patch(c.id, 'institution', e.target.value)} />
            <Input id={`cred-year-${c.id}`} label="Year" inputMode="numeric" placeholder="2015" maxLength={4} value={c.year} onChange={(e) => patch(c.id, 'year', e.target.value.replace(/\D/g, ''))} />
          </div>
        </div>
      )}
      {showErrors && !hasOne && <p className="text-sm text-red-600">Add at least one degree or certificate.</p>}
      <button
        type="button"
        onClick={() => update({ credentials: [...draft.credentials, { id: `c${Date.now()}`, title: '', institution: '', year: '' }] })}
        className="inline-flex items-center gap-1.5 rounded-xl border border-dashed border-primary-300 px-4 py-2.5 text-sm font-medium text-primary-700 hover:bg-primary-50">
        
        <PlusIcon size={16} aria-hidden="true" /> Add another credential
      </button>
      <div className="flex items-start justify-between gap-4 rounded-2xl bg-ink-50 p-4">
        <div>
          <p className="text-sm font-medium text-ink-900">Background check</p>
          <p className="mt-0.5 text-sm text-ink-600">Required to teach learners under 18. Free and usually done within 48 hours.</p>
        </div>
        <Toggle checked={draft.backgroundCheck} onChange={(v) => update({ backgroundCheck: v })} aria-label="Consent to background check" />
      </div>
    </div>);

}