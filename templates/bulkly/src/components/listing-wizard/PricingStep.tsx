import React from 'react';
import type { WizardStepProps } from './WizardStepProps';
import { Input } from '../Input';
import { formatCurrency, getMarginPercent } from '../../utils/pricing';

export function PricingStep({ draft, errors, update }: WizardStepProps) {
  const base = parseFloat(draft.basePrice) || 0;
  const msrp = parseFloat(draft.msrp) || 0;
  const pack = parseInt(draft.casePack, 10) || 0;
  const d2 = parseFloat(draft.tier2Discount) || 0;
  const d3 = parseFloat(draft.tier3Discount) || 0;

  const tiers = [
  { label: '1–4 cases', discount: 0 },
  { label: '5–9 cases', discount: d2 },
  { label: '10+ cases', discount: d3 }].
  map((t) => ({ ...t, unit: base * (1 - t.discount / 100) }));

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          id="wiz-pack"
          label="Units per case"
          type="number"
          min={1}
          value={draft.casePack}
          onChange={(e) => update({ casePack: e.target.value })}
          error={errors.casePack}
          helperText="Retailers order in whole cases." />
        
        <Input
          id="wiz-moq"
          label="Minimum order (cases)"
          type="number"
          min={1}
          value={draft.minOrderCases}
          onChange={(e) => update({ minOrderCases: e.target.value })}
          error={errors.minOrderCases} />
        
        <Input
          id="wiz-base"
          label="Wholesale price per unit"
          type="number"
          min={0}
          step="0.01"
          placeholder="0.00"
          startAdornment={<span className="text-sm text-slate-500">$</span>}
          value={draft.basePrice}
          onChange={(e) => update({ basePrice: e.target.value })}
          error={errors.basePrice}
          helperText="Price for 1–4 cases." />
        
        <Input
          id="wiz-msrp"
          label="MSRP per unit"
          type="number"
          min={0}
          step="0.01"
          placeholder="0.00"
          startAdornment={<span className="text-sm text-slate-500">$</span>}
          value={draft.msrp}
          onChange={(e) => update({ msrp: e.target.value })}
          error={errors.msrp}
          helperText="Suggested retail price." />
        
      </div>

      <fieldset>
        <legend className="mb-1 text-sm font-medium text-slate-800">Volume tiers</legend>
        <p className="mb-3 text-xs text-slate-500">Reward bigger orders with a discount off your base wholesale price.</p>
        <div className="grid max-w-md grid-cols-2 gap-4">
          <Input
            id="wiz-t2"
            label="5–9 cases discount"
            type="number"
            min={0}
            max={50}
            endAdornment={<span className="text-sm text-slate-500">%</span>}
            value={draft.tier2Discount}
            onChange={(e) => update({ tier2Discount: e.target.value })} />
          
          <Input
            id="wiz-t3"
            label="10+ cases discount"
            type="number"
            min={0}
            max={50}
            endAdornment={<span className="text-sm text-slate-500">%</span>}
            value={draft.tier3Discount}
            onChange={(e) => update({ tier3Discount: e.target.value })} />
          
        </div>
      </fieldset>

      <div className="overflow-hidden rounded-lg border border-slate-200">
        <div className="bg-slate-50 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Pricing preview</div>
        <table className="w-full text-sm">
          <thead className="text-xs text-slate-500">
            <tr className="border-b border-slate-100">
              <th scope="col" className="px-3 py-2 text-left font-medium">Tier</th>
              <th scope="col" className="px-3 py-2 text-right font-medium">Per unit</th>
              <th scope="col" className="px-3 py-2 text-right font-medium">Per case</th>
              <th scope="col" className="px-3 py-2 text-right font-medium">Retailer margin</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {tiers.map((t) =>
            <tr key={t.label}>
                <td className="px-3 py-2 font-medium text-slate-800">
                  {t.label} {t.discount > 0 && <span className="text-xs text-primary-700">−{t.discount}%</span>}
                </td>
                <td className="px-3 py-2 text-right tabular-nums">{base ? formatCurrency(t.unit) : '—'}</td>
                <td className="px-3 py-2 text-right tabular-nums text-slate-600">{base && pack ? formatCurrency(t.unit * pack) : '—'}</td>
                <td className="px-3 py-2 text-right tabular-nums">
                  {base && msrp ?
                <span className={getMarginPercent(t.unit, msrp) >= 50 ? 'font-semibold text-accent-800' : 'text-slate-700'}>
                      {getMarginPercent(t.unit, msrp)}%
                    </span> :

                '—'
                }
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {base > 0 && msrp > 0 && getMarginPercent(base, msrp) < 45 &&
        <p className="border-t border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
            Most retailers look for a 50% margin (keystone). Consider adjusting your wholesale price or MSRP.
          </p>
        }
      </div>
    </div>);

}