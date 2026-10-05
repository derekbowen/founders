import React from 'react';
import { Toggle } from '../Toggle';
import { surfaceOptionsBySport } from '../../data/listingDraft';
import { sports } from '../../data/sports';
import { StepProps } from '../../types/listingDraft';

export function SportSurfaceStep({ draft, update }: StepProps) {
  return (
    <div className="space-y-7">
      <fieldset>
        <legend className="field-label">Sport</legend>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {sports.map((s) => {
            const active = draft.sport === s.id;
            return (
              <button
                key={s.id}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => update({ sport: s.id, surface: '' })}
                className={`group flex items-center gap-3 overflow-hidden rounded-xl border p-2 text-left transition-colors ${active ? 'border-brand bg-brand-soft ring-1 ring-brand' : 'border-slate-200 bg-white hover:border-brand'}`}>
                
                <img src={s.image} alt="" className="h-12 w-12 rounded-lg object-cover" />
                <span className="font-display text-xl font-bold uppercase">{s.label}</span>
              </button>);

          })}
        </div>
      </fieldset>
      <fieldset>
        <legend className="field-label">Surface</legend>
        <div className="flex flex-wrap gap-2">
          {surfaceOptionsBySport[draft.sport].map((surface) =>
          <button key={surface} type="button" aria-pressed={draft.surface === surface} onClick={() => update({ surface })} className={`chip ${draft.surface === surface ? 'chip-active' : ''}`}>
              {surface}
            </button>
          )}
        </div>
      </fieldset>
      <fieldset>
        <legend className="field-label">Indoor or outdoor</legend>
        <div className="grid max-w-sm grid-cols-2 gap-1 rounded-xl bg-slate-100 p-1">
          {(['indoor', 'outdoor'] as const).map((s) =>
          <button key={s} type="button" aria-pressed={draft.setting === s} onClick={() => update({ setting: s })} className={`rounded-lg py-2 text-sm font-semibold capitalize ${draft.setting === s ? 'bg-white shadow-sm' : 'text-slate-600 hover:text-ink'}`}>
              {s}
            </button>
          )}
        </div>
      </fieldset>
      <Toggle label="Court has lights for evening play" checked={draft.lights} onChange={(v) => update({ lights: v })} />
    </div>);

}