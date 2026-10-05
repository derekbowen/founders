import React from 'react';
import { CreditCardIcon, LockIcon } from 'lucide-react';
import { Input } from '../Input';

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
  return v.
  replace(/\D/g, '').
  slice(0, 16).
  replace(/(.{4})/g, '$1 ').
  trim();
}

function formatExpiry(v: string) {
  const d = v.replace(/\D/g, '').slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)} / ${d.slice(2)}` : d;
}

function cardBrand(n: string) {
  const d = n.replace(/\D/g, '');
  if (/^4/.test(d)) return 'Visa';
  if (/^5[1-5]/.test(d)) return 'Mastercard';
  if (/^3[47]/.test(d)) return 'Amex';
  return null;
}

export function validateCard(v: CardValues): CardErrors {
  const e: CardErrors = {};
  if (v.number.replace(/\D/g, '').length < 16) e.number = 'Your card number is incomplete.';
  const [mm, yy] = v.expiry.split('/').map((s) => Number(s.trim()));
  if (!mm || !yy || mm > 12 || yy < 26) e.expiry = 'Your card’s expiration date is invalid.';
  if (v.cvc.length < 3) e.cvc = 'Your card’s security code is incomplete.';
  if (!v.name.trim()) e.name = 'Enter the name on your card.';
  if (v.postal.trim().length < 5) e.postal = 'Enter a valid ZIP code.';
  return e;
}

export function CardForm({ values, errors, onChange }: CardFormProps) {
  const brand = cardBrand(values.number);
  const cardError = errors.number || errors.expiry || errors.cvc;
  const set = (k: keyof CardValues, v: string) => onChange({ ...values, [k]: v });

  return (
    <div className="space-y-4">
      <div>
        <span className="field-label">Card information</span>
        <div className={`overflow-hidden rounded-xl border bg-white transition focus-within:ring-2 ${cardError ? 'border-red-400 focus-within:ring-red-100' : 'border-ink-200 focus-within:border-primary-500 focus-within:ring-primary-200'}`}>
          <div className="relative border-b border-ink-200">
            <label htmlFor="card-number" className="sr-only">
              Card number
            </label>
            <input
              id="card-number"
              inputMode="numeric"
              autoComplete="cc-number"
              placeholder="1234 1234 1234 1234"
              value={values.number}
              onChange={(e) => set('number', formatCardNumber(e.target.value))}
              className="w-full px-3.5 py-3 pr-24 text-sm font-semibold tracking-wide text-ink-900 placeholder:font-medium placeholder:text-ink-400 focus:outline-none" />
            
            <span className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1.5 text-xs font-extrabold text-ink-600">
              {brand ?? <CreditCardIcon className="h-5 w-5 text-ink-400" aria-hidden="true" />}
            </span>
          </div>
          <div className="grid grid-cols-2">
            <div className="border-r border-ink-200">
              <label htmlFor="card-expiry" className="sr-only">
                Expiration date
              </label>
              <input id="card-expiry" inputMode="numeric" autoComplete="cc-exp" placeholder="MM / YY" value={values.expiry} onChange={(e) => set('expiry', formatExpiry(e.target.value))} className="w-full px-3.5 py-3 text-sm font-semibold text-ink-900 placeholder:font-medium placeholder:text-ink-400 focus:outline-none" />
            </div>
            <div>
              <label htmlFor="card-cvc" className="sr-only">
                Security code
              </label>
              <input id="card-cvc" inputMode="numeric" autoComplete="cc-csc" placeholder="CVC" value={values.cvc} onChange={(e) => set('cvc', e.target.value.replace(/\D/g, '').slice(0, 4))} className="w-full px-3.5 py-3 text-sm font-semibold text-ink-900 placeholder:font-medium placeholder:text-ink-400 focus:outline-none" />
            </div>
          </div>
        </div>
        {cardError ?
        <p className="mt-1.5 text-sm font-semibold text-red-700" role="alert">
            {cardError}
          </p> :

        <p className="mt-1.5 text-xs text-ink-600">Test mode: use 4242 4242 4242 4242, any future date and any CVC.</p>
        }
      </div>
      <div className="grid gap-4 sm:grid-cols-[2fr_1fr]">
        <Input id="card-name" label="Name on card" autoComplete="cc-name" value={values.name} error={errors.name} onChange={(e) => set('name', e.target.value)} />
        <Input id="card-postal" label="ZIP code" autoComplete="postal-code" inputMode="numeric" value={values.postal} error={errors.postal} onChange={(e) => set('postal', e.target.value.replace(/\D/g, '').slice(0, 5))} />
      </div>
      <p className="flex items-center gap-1.5 text-xs font-semibold text-ink-600">
        <LockIcon className="h-3.5 w-3.5" aria-hidden="true" /> Payments are encrypted and processed securely by Stripe.
      </p>
    </div>);

}