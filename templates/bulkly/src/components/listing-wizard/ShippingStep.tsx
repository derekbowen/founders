import React from 'react';
import type { WizardStepProps } from './WizardStepProps';
import { Input } from '../Input';
import { brand } from '../../data/brand';
import type { ShippingProfile } from '../../types/listingDraft';
import { formatCurrency } from '../../utils/pricing';

const profiles: {id: ShippingProfile;title: string;body: string;}[] = [
{
  id: 'free-threshold',
  title: `Free over ${formatCurrency(brand.freeShippingThreshold).replace('.00', '')}`,
  body: `Marketplace default. ${formatCurrency(brand.flatShippingRate).replace('.00', '')} flat below the threshold.`
},
{ id: 'standard', title: 'Flat rate per order', body: 'Charge one flat fee regardless of order size.' },
{ id: 'calculated', title: 'Carrier calculated', body: 'Live rates based on case weight and destination.' }];


export function ShippingStep({ draft, errors, update }: WizardStepProps) {
  return (
    <div className="space-y-6">
      <div className="max-w-sm">
        <Input
          id="wiz-shipsfrom"
          label="Ships from"
          value={draft.shipsFrom}
          onChange={(e) => update({ shipsFrom: e.target.value })}
          error={errors.shipsFrom}
          helperText="City, state of your warehouse or studio." />
        
      </div>
      <fieldset>
        <legend className="mb-2 text-sm font-medium text-slate-800">Shipping profile</legend>
        <div className="grid gap-2 sm:grid-cols-3">
          {profiles.map((p) => {
            const selected = draft.shippingProfile === p.id;
            return (
              <label
                key={p.id}
                className={`cursor-pointer rounded-lg border p-3 transition-colors ${
                selected ? 'border-primary-600 bg-primary-50 ring-1 ring-primary-600' : 'border-slate-200 hover:border-slate-300'}`
                }>
                
                <input type="radio" name="shipping" className="sr-only" checked={selected} onChange={() => update({ shippingProfile: p.id })} />
                <span className="block text-sm font-semibold text-slate-900">{p.title}</span>
                <span className="mt-0.5 block text-xs text-slate-600">{p.body}</span>
              </label>);

          })}
        </div>
      </fieldset>
      <div className="grid max-w-lg gap-4 sm:grid-cols-2">
        <Input
          id="wiz-weight"
          label="Case weight"
          type="number"
          min={0}
          step="0.1"
          endAdornment={<span className="text-sm text-slate-500">lb</span>}
          value={draft.caseWeight}
          onChange={(e) => update({ caseWeight: e.target.value })}
          error={errors.caseWeight} />
        
        <Input
          id="wiz-dims"
          label="Case dimensions (optional)"
          placeholder="12 × 10 × 8 in"
          value={draft.caseDimensions}
          onChange={(e) => update({ caseDimensions: e.target.value })} />
        
      </div>
    </div>);

}