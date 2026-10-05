import React from 'react';
import { CreditCardIcon, LockIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

export interface CardValues {
  number: string;
  expiry: string;
  cvc: string;
  name: string;
  postal: string;
}

export type CardErrors = Partial<Record<keyof CardValues, string>>;

interface CardFormProps {
  values: CardValues;
  errors: CardErrors;
  onChange: (values: CardValues) => void;
}

export function formatCardNumber(v: string) {
  return v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
}

export function formatExpiry(v: string) {
  const digits = v.replace(/\D/g, '').slice(0, 4);
  return digits.length > 2 ? `${digits.slice(0, 2)} / ${digits.slice(2)}` : digits;
}

export function validateCard(v: CardValues): CardErrors {
  const e: CardErrors = {};
  if (v.number.replace(/\s/g, '').length !== 16) e.number = 'Enter a valid 16-digit card number';
  const [mm, yy] = v.expiry.split(' / ');
  if (!mm || !yy || Number(mm) < 1 || Number(mm) > 12 || yy.length !== 2) e.expiry = 'Use MM / YY';
  if (v.cvc.length < 3) e.cvc = '3–4 digits';
  if (!v.name.trim()) e.name = 'Enter the name on your card';
  if (v.postal.trim().length < 3) e.postal = 'Enter a postal code';
  return e;
}

export function CardForm({ values, errors, onChange }: CardFormProps) {
  const set = (k: keyof CardValues, v: string) => onChange({ ...values, [k]: v });
  const cell = (err?: string) =>
  twMerge('w-full bg-white px-3.5 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:relative focus:z-10 focus:outline-none focus:ring-2 focus:ring-primary-500/40', err && 'bg-red-50');

  const firstError = errors.number ?? errors.expiry ?? errors.cvc;

  return (
    <div className="space-y-4">
      <div>
        <p className="mb-1.5 text-sm font-medium text-slate-700" id="card-label">Card details</p>
        <div className={twMerge('overflow-hidden rounded-xl border', firstError ? 'border-red-400' : 'border-slate-300')} role="group" aria-labelledby="card-label">
          <div className="relative border-b border-slate-200">
            <label htmlFor="cc-number" className="sr-only">Card number</label>
            <input
              id="cc-number"
              inputMode="numeric"
              autoComplete="cc-number"
              placeholder="1234 1234 1234 1234"
              value={values.number}
              onChange={(e) => set('number', formatCardNumber(e.target.value))}
              aria-invalid={Boolean(errors.number)}
              className={twMerge(cell(errors.number), 'pr-24')} />
            
            <span className="pointer-events-none absolute right-3 top-1/2 flex -translate-y-1/2 gap-1" aria-hidden>
              {['VISA', 'MC', 'AMEX'].map((b) =>
              <span key={b} className="rounded border border-slate-200 bg-white px-1 text-[9px] font-bold text-slate-600">{b}</span>
              )}
            </span>
          </div>
          <div className="grid grid-cols-2">
            <div className="border-r border-slate-200">
              <label htmlFor="cc-exp" className="sr-only">Expiration date</label>
              <input id="cc-exp" inputMode="numeric" autoComplete="cc-exp" placeholder="MM / YY" value={values.expiry} onChange={(e) => set('expiry', formatExpiry(e.target.value))} aria-invalid={Boolean(errors.expiry)} className={cell(errors.expiry)} />
            </div>
            <div className="relative">
              <label htmlFor="cc-cvc" className="sr-only">Security code</label>
              <input id="cc-cvc" inputMode="numeric" autoComplete="cc-csc" placeholder="CVC" value={values.cvc} onChange={(e) => set('cvc', e.target.value.replace(/\D/g, '').slice(0, 4))} aria-invalid={Boolean(errors.cvc)} className={cell(errors.cvc)} />
              <CreditCardIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden />
            </div>
          </div>
        </div>
        {firstError && <p className="mt-1.5 text-xs font-medium text-red-600">{firstError}</p>}
      </div>
      <div className="grid gap-4 sm:grid-cols-[1fr_160px]">
        <div>
          <label htmlFor="cc-name" className="mb-1.5 block text-sm font-medium text-slate-700">Name on card</label>
          <input id="cc-name" autoComplete="cc-name" value={values.name} onChange={(e) => set('name', e.target.value)} aria-invalid={Boolean(errors.name)} className={twMerge(cell(errors.name), 'rounded-xl border', errors.name ? 'border-red-400' : 'border-slate-300')} />
          {errors.name && <p className="mt-1.5 text-xs font-medium text-red-600">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="cc-postal" className="mb-1.5 block text-sm font-medium text-slate-700">Postal code</label>
          <input id="cc-postal" autoComplete="postal-code" value={values.postal} onChange={(e) => set('postal', e.target.value)} aria-invalid={Boolean(errors.postal)} className={twMerge(cell(errors.postal), 'rounded-xl border', errors.postal ? 'border-red-400' : 'border-slate-300')} />
          {errors.postal && <p className="mt-1.5 text-xs font-medium text-red-600">{errors.postal}</p>}
        </div>
      </div>
      <p className="flex items-center gap-1.5 text-xs text-slate-500">
        <LockIcon className="h-3.5 w-3.5" aria-hidden />
        Payments are encrypted and processed securely. Your card is charged when the host confirms.
      </p>
    </div>);

}