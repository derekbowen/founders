import React from 'react';
import { Input } from '../Input';
import { Toggle } from '../Toggle';
import { vehicleExamples, vehicleSizes } from '../../data/vehicles';
import { labelClass } from '../../utils/styles';
import type { StepProps } from '../../types/listingDraft';

export function SizeStep({ draft, update, errors }: StepProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <Input id="w-len" label="Length (ft)" type="number" min={0} value={draft.lengthFt} onChange={(e) => update({ lengthFt: e.target.value })} error={errors.lengthFt} />
        <Input id="w-wid" label="Width (ft)" type="number" min={0} value={draft.widthFt} onChange={(e) => update({ widthFt: e.target.value })} error={errors.widthFt} />
        <Input
          id="w-clr"
          label="Height clearance (ft)"
          type="number"
          min={0}
          placeholder="No limit"
          value={draft.clearanceFt}
          onChange={(e) => update({ clearanceFt: e.target.value })}
          error={errors.clearanceFt} />
        
      </div>

      <fieldset>
        <legend className={labelClass}>Largest vehicle that fits</legend>
        <div className="grid gap-2 sm:grid-cols-5" role="radiogroup">
          {vehicleSizes.map((v) => {
            const selected = draft.maxVehicle === v;
            return (
              <button
                key={v}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => update({ maxVehicle: v })}
                className={`rounded-xl border-2 p-3 text-left transition-colors ${selected ? 'border-navy bg-navy text-white' : 'border-line hover:border-ink/30'}`}>
                
                <span className="block text-sm font-semibold">{v}</span>
                <span className={`mt-0.5 block text-xs ${selected ? 'text-white/70' : 'text-muted'}`}>{vehicleExamples[v]}</span>
              </button>);

          })}
        </div>
      </fieldset>

      <div className="divide-y divide-line rounded-xl border border-line">
        <div className="flex items-center justify-between gap-4 p-4">
          <div>
            <p className="font-medium">Covered</p>
            <p className="text-sm text-muted">Protected from rain and sun.</p>
          </div>
          <Toggle checked={draft.covered} onChange={(v) => update({ covered: v })} aria-label="Covered" />
        </div>
        <div className="flex items-center justify-between gap-4 p-4">
          <div>
            <p className="font-medium">EV charging</p>
            <p className="text-sm text-muted">A charger drivers can use during their booking.</p>
          </div>
          <Toggle checked={draft.evCharging} onChange={(v) => update({ evCharging: v })} aria-label="EV charging" />
        </div>
      </div>
    </div>);

}