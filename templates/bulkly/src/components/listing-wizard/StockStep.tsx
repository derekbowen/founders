import React from 'react';
import type { WizardStepProps } from './WizardStepProps';
import { Input } from '../Input';

export function StockStep({ draft, errors, update }: WizardStepProps) {
  const pack = parseInt(draft.casePack, 10) || 0;
  const stock = parseInt(draft.stockCases, 10) || 0;
  return (
    <div className="space-y-6">
      <div className="max-w-sm">
        <Input
          id="wiz-stock"
          label="Cases in stock"
          type="number"
          min={0}
          placeholder="0"
          value={draft.stockCases}
          onChange={(e) => update({ stockCases: e.target.value })}
          error={errors.stockCases}
          helperText={stock && pack ? `${(stock * pack).toLocaleString()} units available to retailers.` : 'Stock decreases automatically as orders are placed.'} />
        
      </div>
      <fieldset>
        <legend className="mb-1 text-sm font-medium text-slate-800">Lead time</legend>
        <p className="mb-3 text-xs text-slate-500">Business days from order confirmation to shipment.</p>
        <div className="flex max-w-sm items-start gap-3">
          <Input
            id="wiz-lead-min"
            label="From"
            type="number"
            min={1}
            value={draft.leadTimeMin}
            onChange={(e) => update({ leadTimeMin: e.target.value })} />
          
          <Input
            id="wiz-lead-max"
            label="To"
            type="number"
            min={1}
            value={draft.leadTimeMax}
            onChange={(e) => update({ leadTimeMax: e.target.value })}
            error={errors.leadTimeMax} />
          
        </div>
      </fieldset>
      <div className="rounded-lg border border-primary-100 bg-primary-50 p-4 text-sm text-primary-900">
        <p className="font-semibold">Retailers will see</p>
        <p className="mt-1">
          “{stock || 0} cases in stock · Ships in {draft.leadTimeMin || '–'}–{draft.leadTimeMax || '–'} business days”
        </p>
      </div>
    </div>);

}