import React from 'react';
import { MapPinIcon } from 'lucide-react';
import type { WizardStepProps } from '../../types/wizard';

export function LocationStep({ draft, update }: WizardStepProps) {
  return (
    <div className="space-y-5">
      <label className="block">
        <span className="label">Listing title</span>
        <input className="input" value={draft.title} onChange={(e) => update({ title: e.target.value })} placeholder="e.g. Creekside Meadow Tent Sites" maxLength={60} />
        <span className="mt-1.5 block text-xs text-ink-500">{draft.title.length}/60 · Lead with what makes it special.</span>
      </label>
      <label className="block">
        <span className="label">Street address</span>
        <div className="relative">
          <MapPinIcon size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" aria-hidden="true" />
          <input className="input pl-10" value={draft.address} onChange={(e) => update({ address: e.target.value })} placeholder="6620 Skyliners Rd" />
        </div>
      </label>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="label">Town</span>
          <input className="input" value={draft.town} onChange={(e) => update({ town: e.target.value })} placeholder="Bend" />
        </label>
        <label className="block">
          <span className="label">State / region</span>
          <input className="input" value={draft.region} onChange={(e) => update({ region: e.target.value })} placeholder="Oregon" />
        </label>
      </div>
      <label className="block">
        <span className="label">Directions & arrival instructions</span>
        <textarea
          className="input min-h-[120px] resize-y"
          value={draft.directions}
          onChange={(e) => update({ directions: e.target.value })}
          placeholder="Turn at the green gate with the horseshoe sign. Gate code is shared after booking. Follow orange stakes to your site…" />
        
        <span className="mt-1.5 block text-xs text-ink-500">Shared with campers only once their booking is confirmed.</span>
      </label>
    </div>);

}