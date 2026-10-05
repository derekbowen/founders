import React from 'react';
import { UsersIcon } from 'lucide-react';
import { Counter } from '../ui/Counter';
import { ToggleRow } from './ToggleRow';
import type { WizardStepProps } from '../../types/listingDraft';

export function GroupSizeStep({ draft, update }: WizardStepProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-5 rounded-2xl border border-slate-200 p-5">
        <Counter
          label="Seats per departure"
          description="Maximum guests on each departure"
          value={draft.maxGuests}
          min={Math.max(2, draft.minGuests)}
          max={30}
          onChange={(v) => update({ maxGuests: v })} />
        
        <div className="border-t border-slate-100" />
        <Counter
          label="Minimum guests to run"
          description="We'll auto-cancel and refund if this isn't met 24h before"
          value={draft.minGuests}
          min={1}
          max={draft.maxGuests}
          onChange={(v) => update({ minGuests: v })} />
        
      </div>
      <div className="flex items-center gap-3 rounded-2xl bg-accent-50 p-4 text-sm text-accent-900">
        <UsersIcon className="h-5 w-5 shrink-0" aria-hidden />
        <p>
          Guests can book individual seats. Each departure shows "<strong>{draft.maxGuests} seats left</strong>" until it fills up.
        </p>
      </div>
      <ToggleRow
        label="Allow private group bookings"
        description="A single group can reserve an entire departure for a flat price"
        checked={draft.privateGroupsEnabled}
        onChange={(v) => update({ privateGroupsEnabled: v })} />
      
      <ToggleRow
        label="Wheelchair accessible"
        description="Step-free route, accessible venues and restrooms"
        checked={draft.wheelchairAccessible}
        onChange={(v) => update({ wheelchairAccessible: v })} />
      
    </div>);

}