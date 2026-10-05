import React from 'react';
import { Counter } from '../Counter';
import type { WizardStepProps } from '../../types/wizard';

export function CapacityStep({ draft, update }: WizardStepProps) {
  return (
    <div className="card divide-y divide-sand-200 px-5">
      <div className="py-5">
        <Counter label="Number of sites" description="Separate pitches you’ll rent out" value={draft.sites} min={1} max={20} onChange={(v) => update({ sites: v })} />
      </div>
      <div className="py-5">
        <Counter label="Campers per site" description="Including kids" value={draft.maxCampers} min={1} max={20} onChange={(v) => update({ maxCampers: v })} />
      </div>
      <div className="py-5">
        <Counter label="Vehicles per site" value={draft.maxVehicles} min={0} max={6} onChange={(v) => update({ maxVehicles: v })} />
      </div>
      <div className="py-5">
        <label className="flex items-center justify-between gap-4">
          <span>
            <span className="block text-sm font-medium text-ink-900">Max RV / trailer length</span>
            <span className="block text-xs text-ink-500">Set to 0 if RVs can’t reach your sites</span>
          </span>
          <span className="flex items-center gap-2">
            <input
              type="number"
              min={0}
              max={60}
              value={draft.maxVehicleLength}
              onChange={(e) => update({ maxVehicleLength: Math.max(0, Math.min(60, Number(e.target.value) || 0)) })}
              className="input w-20 text-center"
              aria-label="Max vehicle length in feet" />
            
            <span className="text-sm text-ink-500">ft</span>
          </span>
        </label>
      </div>
    </div>);

}