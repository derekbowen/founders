import React from 'react';
import { LightbulbIcon } from 'lucide-react';
import { Input } from '../Input';
import { Checkbox } from '../Checkbox';
import { brand } from '../../data/brand';
import type { DeliveryMethod } from '../../types/marketplace';
import type { DraftUpdater, ListingDraft } from '../../types/draft';
import { formatMoney } from '../../utils/format';
import { labelClass } from '../../utils/styles';

export function PricingStep({ draft, set }: {draft: ListingDraft;set: DraftUpdater;}) {
  const retail = Number(draft.retailPrice) || 0;
  const suggest4 = Math.round(retail * 0.1);
  const suggest8 = Math.round(retail * 0.145);
  const keep = 1 - brand.fees.lenderCommissionRate;
  const p4 = Number(draft.price4) || 0;
  const p8 = Number(draft.price8) || 0;

  const toggleDelivery = (m: DeliveryMethod) =>
  set('delivery', draft.delivery.includes(m) ? draft.delivery.filter((d) => d !== m) : [...draft.delivery, m]);

  return (
    <div className="space-y-6">
      <Input
        label="Original retail price"
        inputMode="numeric"
        value={draft.retailPrice}
        onChange={(e) => set('retailPrice', e.target.value.replace(/\D/g, ''))}
        startAdornment={<span className="text-sm text-muted">$</span>}
        placeholder="0"
        helperText="Shown to renters as a strike-through price." />
      
      {retail > 0 &&
      <div className="flex items-start gap-3 border border-accent/60 bg-accent-soft/60 p-4 text-sm">
          <LightbulbIcon size={18} className="mt-0.5 shrink-0 text-accent-dark" aria-hidden="true" />
          <p>
            Similar dresses rent for about <strong>{formatMoney(suggest4)}</strong> (4 days) and{' '}
            <strong>{formatMoney(suggest8)}</strong> (8 days).{' '}
            <button
            type="button"
            className="font-medium text-accent-dark underline underline-offset-2"
            onClick={() => {
              set('price4', String(suggest4));
              set('price8', String(suggest8));
            }}>
            
              Use suggested prices
            </button>
          </p>
        </div>
      }
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="border border-line p-5">
          <Input
            label="4-day rental price"
            inputMode="numeric"
            value={draft.price4}
            onChange={(e) => set('price4', e.target.value.replace(/\D/g, ''))}
            startAdornment={<span className="text-sm text-muted">$</span>}
            placeholder="0" />
          
          <p className="mt-3 text-xs text-muted">
            You earn <span className="font-semibold text-ink">{formatMoney(p4 * keep)}</span> per rental
          </p>
        </div>
        <div className="border border-line p-5">
          <Input
            label="8-day rental price"
            inputMode="numeric"
            value={draft.price8}
            onChange={(e) => set('price8', e.target.value.replace(/\D/g, ''))}
            startAdornment={<span className="text-sm text-muted">$</span>}
            placeholder="0" />
          
          <p className="mt-3 text-xs text-muted">
            You earn <span className="font-semibold text-ink">{formatMoney(p8 * keep)}</span> per rental
          </p>
        </div>
      </div>
      {p8 > 0 && p4 > 0 && p8 <= p4 &&
      <p role="alert" className="text-sm text-[#9b2c2c]">The 8-day price should be higher than the 4-day price.</p>
      }
      <fieldset>
        <legend className={labelClass}>Delivery options</legend>
        <div className="space-y-3">
          <Checkbox
            label={<span className="text-sm">Ship it — we email a prepaid label both ways</span>}
            checked={draft.delivery.includes('ship')}
            onChange={() => toggleDelivery('ship')} />
          
          <Checkbox
            label={<span className="text-sm">Local pickup — meet renters near you</span>}
            checked={draft.delivery.includes('pickup')}
            onChange={() => toggleDelivery('pickup')} />
          
        </div>
      </fieldset>
      <p className="text-xs text-muted">
        {brand.name} keeps a {Math.round(brand.fees.lenderCommissionRate * 100)}% commission that covers payments,
        professional cleaning and damage protection.
      </p>
    </div>);

}