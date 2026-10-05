import React from 'react';
import { CreditCardIcon, LockIcon } from 'lucide-react';
import { ui, cx } from '../../utils/styles';

export interface CardValues {
  name: string;
  number: string;
  expiry: string;
  cvc: string;
  zip: string;
}

export const emptyCard: CardValues = { name: '', number: '', expiry: '', cvc: '', zip: '' };

export function validateCard(c: CardValues): Partial<Record<keyof CardValues, string>> {
  const errors: Partial<Record<keyof CardValues, string>> = {};
  if (!c.name.trim()) errors.name = 'Enter the name on your card';
  if (c.number.replace(/\s/g, '').length < 15) errors.number = 'Your card number is incomplete';
  if (!/^\d{2} \/ \d{2}$/.test(c.expiry)) errors.expiry = 'Use MM / YY';
  if (c.cvc.length < 3) errors.cvc = 'Security code is incomplete';
  if (c.zip.length < 5) errors.zip = 'ZIP is incomplete';
  return errors;
}

interface Props {
  value: CardValues;
  onChange: (v: CardValues) => void;
  errors: Partial<Record<keyof CardValues, string>>;
}

export function CardForm({ value, onChange, errors }: Props) {
  const set = (k: keyof CardValues, v: string) => onChange({ ...value, [k]: v });

  const formatNumber = (raw: string) =>
  raw.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  const formatExpiry = (raw: string) => {
    const d = raw.replace(/\D/g, '').slice(0, 4);
    return d.length > 2 ? `${d.slice(0, 2)} / ${d.slice(2)}` : d;
  };
  const brandName = value.number.startsWith('4') ? 'Visa' : value.number.startsWith('5') ? 'Mastercard' : value.number.startsWith('3') ? 'Amex' : null;

  const cardError = errors.number || errors.expiry || errors.cvc || errors.zip;

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="card-name" className={ui.label}>Name on card</label>
        <input id="card-name" autoComplete="cc-name" value={value.name} onChange={(e) => set('name', e.target.value)} className={cx(ui.field, errors.name && '!border-red-500')} aria-invalid={Boolean(errors.name)} />
        {errors.name && <p className="mt-1 text-xs font-medium text-red-700">{errors.name}</p>}
      </div>
      <div>
        <span id="card-label" className={ui.label}>Card details</span>
        <div
          className={cx(
            'overflow-hidden rounded-lg border bg-white focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-200',
            cardError ? 'border-red-500' : 'border-stone-300'
          )}
          role="group"
          aria-labelledby="card-label">
          
          <div className="flex items-center gap-2 border-b border-stone-200 px-3">
            <CreditCardIcon className="h-4 w-4 text-stone-400" aria-hidden="true" />
            <label htmlFor="card-number" className="sr-only">Card number</label>
            <input
              id="card-number"
              inputMode="numeric"
              autoComplete="cc-number"
              placeholder="1234 1234 1234 1234"
              value={value.number}
              onChange={(e) => set('number', formatNumber(e.target.value))}
              className="w-full bg-transparent py-3 text-sm tracking-wide placeholder:text-stone-400 focus:outline-none" />
            
            {brandName && <span className="rounded bg-stone-100 px-1.5 py-0.5 text-[11px] font-bold text-stone-700">{brandName}</span>}
          </div>
          <div className="grid grid-cols-3 divide-x divide-stone-200">
            <div>
              <label htmlFor="card-exp" className="sr-only">Expiry</label>
              <input id="card-exp" inputMode="numeric" autoComplete="cc-exp" placeholder="MM / YY" value={value.expiry} onChange={(e) => set('expiry', formatExpiry(e.target.value))} className="w-full bg-transparent px-3 py-3 text-sm placeholder:text-stone-400 focus:outline-none" />
            </div>
            <div>
              <label htmlFor="card-cvc" className="sr-only">CVC</label>
              <input id="card-cvc" inputMode="numeric" autoComplete="cc-csc" placeholder="CVC" value={value.cvc} onChange={(e) => set('cvc', e.target.value.replace(/\D/g, '').slice(0, 4))} className="w-full bg-transparent px-3 py-3 text-sm placeholder:text-stone-400 focus:outline-none" />
            </div>
            <div>
              <label htmlFor="card-zip" className="sr-only">ZIP</label>
              <input id="card-zip" inputMode="numeric" autoComplete="postal-code" placeholder="ZIP" value={value.zip} onChange={(e) => set('zip', e.target.value.replace(/\D/g, '').slice(0, 5))} className="w-full bg-transparent px-3 py-3 text-sm placeholder:text-stone-400 focus:outline-none" />
            </div>
          </div>
        </div>
        {cardError ?
        <p className="mt-1 text-xs font-medium text-red-700">{cardError}</p> :

        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-stone-500">
            <LockIcon className="h-3 w-3" aria-hidden="true" /> Payments are encrypted and processed by Stripe. Try 4242 4242 4242 4242.
          </p>
        }
      </div>
    </div>);

}