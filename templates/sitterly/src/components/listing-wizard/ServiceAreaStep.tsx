import React from 'react';
import { Toggle } from '../Toggle';
import { SelectField } from '../ui/SelectField';
import { ServiceAreaMap } from '../maps/ServiceAreaMap';
import { StepProps } from '../../hooks/useListingDraft';
import { neighborhoods, radiusOptions } from '../../data/wizardSteps';

export function ServiceAreaStep({ draft, update }: StepProps) {
  const hood = neighborhoods.find((n) => n.name === draft.neighborhood) ?? neighborhoods[0];
  return (
    <div className="space-y-6">
      <SelectField label="Home neighborhood" value={draft.neighborhood} onChange={(e) => update({ neighborhood: e.target.value })} options={neighborhoods.map((n) => ({ value: n.name, label: n.name }))} className="max-w-sm" />
      <fieldset>
        <legend className="text-sm font-bold text-ink-900">How far will you travel?</legend>
        <div className="mt-3 flex flex-wrap gap-2" role="radiogroup" aria-label="Travel radius">
          {radiusOptions.map((r) => {
            const on = draft.serviceRadiusMiles === r;
            return (
              <button key={r} type="button" role="radio" aria-checked={on} onClick={() => update({ serviceRadiusMiles: r })} className={`rounded-full px-4 py-2 text-sm font-semibold ring-1 ring-inset transition ${on ? 'bg-primary-600 text-white ring-primary-600' : 'bg-white text-ink-700 ring-ink-200 hover:ring-ink-400'}`}>
                {r} mi
              </button>);

          })}
        </div>
      </fieldset>
      <ServiceAreaMap lat={hood.lat} lng={hood.lng} radiusMiles={draft.serviceRadiusMiles} className="h-64" />
      <Toggle label="I have a car and can do pickups" checked={draft.hasCar} onChange={(v) => update({ hasCar: v })} />
    </div>);

}