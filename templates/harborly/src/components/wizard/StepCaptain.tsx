import React from 'react';
import { ShipWheelIcon, UserCheckIcon, KeyRoundIcon } from 'lucide-react';
import { Field } from '../ui/Field';
import { cn, inputClass } from '../../utils/ui';
import type { ListingDraft, StepProps } from '../../types/listingDraft';
import type { CaptainMode } from '../../types/marketplace';

const modes: {id: CaptainMode;title: string;text: string;icon: typeof ShipWheelIcon;}[] = [
{ id: 'required', title: 'Captain required', text: 'Every trip runs with your captain. Best for yachts and large boats.', icon: ShipWheelIcon },
{ id: 'optional', title: 'Captain optional', text: 'Guests choose: skipper themselves or add your captain.', icon: UserCheckIcon },
{ id: 'none', title: 'Bareboat only', text: 'Licensed guests operate the boat. No captain offered.', icon: KeyRoundIcon }];


export function StepCaptain({ draft, update, errors }: StepProps) {
  const money = (key: 'captainHalfDay' | 'captainFullDay', label: string) =>
  <Field label={label} htmlFor={`w-${key}`} error={errors[key]}>
      <div className="relative">
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-muted">$</span>
        <input id={`w-${key}`} type="number" inputMode="numeric" value={draft[key]} onChange={(e) => update({ [key]: e.target.value } as Partial<ListingDraft>)} className={cn(inputClass, 'pl-7', errors[key] && 'border-danger')} />
      </div>
    </Field>;


  return (
    <div className="space-y-6">
      <fieldset>
        <legend className="mb-3 text-sm font-medium text-ink">How is your boat operated?</legend>
        <div className="grid gap-3 md:grid-cols-3">
          {modes.map(({ id, title, text, icon: Icon }) =>
          <label key={id} className={cn('flex cursor-pointer flex-col rounded-2xl border p-5 transition-colors', draft.captainMode === id ? 'border-navy ring-1 ring-navy' : 'border-line hover:border-navy/40')}>
              <input type="radio" name="w-captain" checked={draft.captainMode === id} onChange={() => update({ captainMode: id })} className="sr-only" />
              <Icon className="h-6 w-6 text-coral-dark" aria-hidden="true" />
              <span className="mt-3 font-semibold text-ink">{title}</span>
              <span className="mt-1 text-xs leading-relaxed text-muted">{text}</span>
            </label>
          )}
        </div>
      </fieldset>

      {draft.captainMode !== 'none' ?
      <div className="space-y-5 rounded-2xl border border-line p-5">
          <p className="text-sm font-semibold text-ink">Captain details</p>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Captain name" htmlFor="w-cname" error={errors.captainName}>
              <input id="w-cname" value={draft.captainName} onChange={(e) => update({ captainName: e.target.value })} className={cn(inputClass, errors.captainName && 'border-danger')} />
            </Field>
            <Field label="USCG license" htmlFor="w-clicense" error={errors.captainLicense} hint="e.g. OUPV (6-Pack) or 100-Ton Master">
              <input id="w-clicense" value={draft.captainLicense} onChange={(e) => update({ captainLicense: e.target.value })} className={cn(inputClass, errors.captainLicense && 'border-danger')} />
            </Field>
            {money('captainHalfDay', 'Captain fee · half day')}
            {money('captainFullDay', 'Captain fee · full day')}
          </div>
          <p className="text-xs text-muted">We verify captain credentials with the Coast Guard before your listing goes live.</p>
        </div> :

      <p className="rounded-2xl bg-sand-light p-5 text-sm text-ink/85">
          Bareboat renters must upload a state boater education card and pass your dockside check-out. You can always add a captain later.
        </p>
      }
    </div>);

}