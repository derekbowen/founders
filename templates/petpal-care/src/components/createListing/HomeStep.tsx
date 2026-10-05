import React from 'react';
import { Toggle } from '../Toggle';
import { Input } from '../Input';
import type { HomeDetails, YardType } from '../../types/listing';
import type { StepProps } from '../../types/wizard';

const homeTypes: HomeDetails['homeType'][] = ['House', 'Apartment', 'Townhouse', 'Condo', 'Loft'];
const yards: {id: YardType;label: string;hint: string;}[] = [
{ id: 'fenced', label: 'Fenced yard', hint: 'Fully enclosed' },
{ id: 'unfenced', label: 'Unfenced yard', hint: 'Open outdoor space' },
{ id: 'none', label: 'No yard', hint: 'Walks only' }];

const kidsOptions = ['No children', 'Children under 5', 'Children 5–12', 'Teenagers'];

export function HomeStep({ draft, update }: StepProps) {
  return (
    <div className="space-y-7">
      <fieldset>
        <legend className="field-label">Home type</legend>
        <div className="flex flex-wrap gap-2">
          {homeTypes.map((h) =>
          <button key={h} type="button" aria-pressed={draft.homeType === h} onClick={() => update({ homeType: h })} className={`chip ${draft.homeType === h ? 'chip-active' : ''}`}>
              {h}
            </button>
          )}
        </div>
      </fieldset>

      <fieldset>
        <legend className="field-label">Outdoor space</legend>
        <div className="grid gap-2 sm:grid-cols-3">
          {yards.map((y) =>
          <button
            key={y.id}
            type="button"
            aria-pressed={draft.yard === y.id}
            onClick={() => update({ yard: y.id })}
            className={`rounded-2xl border px-4 py-3 text-left transition ${draft.yard === y.id ? 'border-primary-500 bg-primary-50' : 'border-ink-200 hover:border-ink-400'}`}>
            
              <span className="block text-sm font-extrabold text-ink-900">{y.label}</span>
              <span className="block text-xs text-ink-600">{y.hint}</span>
            </button>
          )}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="kids" className="field-label">
            Children at home
          </label>
          <select id="kids" value={draft.childrenAtHome} onChange={(e) => update({ childrenAtHome: e.target.value })} className="field">
            {kidsOptions.map((k) =>
            <option key={k}>{k}</option>
            )}
          </select>
        </div>
        <Input id="other-pets" label="Other pets at home" placeholder="Leave blank if none" value={draft.otherPets} onChange={(e) => update({ otherPets: e.target.value })} />
      </div>

      <ul className="divide-y divide-ink-100 rounded-3xl border border-ink-200 px-5">
        <li className="flex items-center justify-between gap-4 py-4">
          <div>
            <p className="text-sm font-bold text-ink-900">I’m home full-time</p>
            <p className="text-xs text-ink-600">Someone is home with pets most of the day</p>
          </div>
          <Toggle checked={draft.fullTimeHome} onChange={(v) => update({ fullTimeHome: v })} aria-label="Home full-time" />
        </li>
        <li className="flex items-center justify-between gap-4 py-4">
          <div>
            <p className="text-sm font-bold text-ink-900">Smoke-free home</p>
            <p className="text-xs text-ink-600">No smoking indoors</p>
          </div>
          <Toggle checked={draft.smokeFree} onChange={(v) => update({ smokeFree: v })} aria-label="Smoke-free home" />
        </li>
      </ul>
    </div>);

}