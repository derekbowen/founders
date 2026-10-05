import React from 'react';
import { CreditCardIcon, LockIcon } from 'lucide-react';
import { Field } from '../ui/Field';
import { cn, inputClass } from '../../utils/ui';

export interface CardValues {
  name: string;
  number: string;
  expiry: string;
  cvc: string;
  zip: string;
}

export type CardErrors = Partial<Record<keyof CardValues, string>>;

export function validateCard(v: CardValues): CardErrors {
  const e: CardErrors = {};
  const digits = v.number.replace(/\s/g, '');
  if (!v.name.trim()) e.name = 'Enter the name on your card.';
  if (digits.length < 15 || !/^\d+$/.test(digits)) e.number = 'Enter a valid card number.';
  const [mm, yy] = v.expiry.split('/');
  const month = Number(mm);
  if (!mm || !yy || month < 1 || month > 12 || yy.length !== 2) e.expiry = 'Use MM/YY.';else
  {
    const exp = new Date(2000 + Number(yy), month, 0);
    if (exp < new Date()) e.expiry = 'This card has expired.';
  }
  if (!/^\d{3,4}$/.test(v.cvc)) e.cvc = '3–4 digits.';
  if (!/^\d{5}$/.test(v.zip)) e.zip = '5-digit ZIP.';
  return e;
}

function detectBrand(num: string): string {
  const d = num.replace(/\s/g, '');
  if (/^4/.test(d)) return 'Visa';
  if (/^(5[1-5]|2[2-7])/.test(d)) return 'Mastercard';
  if (/^3[47]/.test(d)) return 'Amex';
  if (/^6/.test(d)) return 'Discover';
  return '';
}

interface CardFormProps {
  values: CardValues;
  errors: CardErrors;
  onChange: (values: CardValues) => void;
}

export function CardForm({ values, errors, onChange }: CardFormProps) {
  const set = (key: keyof CardValues, value: string) => onChange({ ...values, [key]: value });
  const brandName = detectBrand(values.number);

  const formatNumber = (raw: string) =>
  raw.
  replace(/\D/g, '').
  slice(0, 16).
  replace(/(.{4})/g, '$1 ').
  trim();
  const formatExpiry = (raw: string) => {
    const d = raw.replace(/\D/g, '').slice(0, 4);
    return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
  };

  return (
    <div className="space-y-4">
      <Field label="Name on card" htmlFor="cc-name" error={errors.name}>
        <input id="cc-name" autoComplete="cc-name" value={values.name} onChange={(e) => set('name', e.target.value)} className={cn(inputClass, errors.name && 'border-danger')} aria-invalid={!!errors.name} />
      </Field>
      <div className="overflow-hidden rounded-xl border border-line focus-within:border-navy focus-within:ring-2 focus-within:ring-navy/15">
        <label htmlFor="cc-number" className="sr-only">
          Card number
        </label>
        <div className="relative border-b border-line">
          <CreditCardIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
          <input
            id="cc-number"
            inputMode="numeric"
            autoComplete="cc-number"
            placeholder="1234 1234 1234 1234"
            value={values.number}
            onChange={(e) => set('number', formatNumber(e.target.value))}
            className="block w-full bg-white py-3 pl-10 pr-24 text-sm tracking-wide placeholder:text-muted/80 focus:outline-none"
            aria-invalid={!!errors.number} />
          
          {brandName && <span className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md bg-sand-light px-2 py-0.5 text-xs font-semibold text-navy">{brandName}</span>}
        </div>
        <div className="grid grid-cols-3 divide-x divide-line">
          <div>
            <label htmlFor="cc-exp" className="sr-only">
              Expiry
            </label>
            <input id="cc-exp" inputMode="numeric" autoComplete="cc-exp" placeholder="MM / YY" value={values.expiry} onChange={(e) => set('expiry', formatExpiry(e.target.value))} className="block w-full bg-white px-3.5 py-3 text-sm placeholder:text-muted/80 focus:outline-none" aria-invalid={!!errors.expiry} />
          </div>
          <div>
            <label htmlFor="cc-cvc" className="sr-only">
              CVC
            </label>
            <input id="cc-cvc" inputMode="numeric" autoComplete="cc-csc" placeholder="CVC" value={values.cvc} onChange={(e) => set('cvc', e.target.value.replace(/\D/g, '').slice(0, 4))} className="block w-full bg-white px-3.5 py-3 text-sm placeholder:text-muted/80 focus:outline-none" aria-invalid={!!errors.cvc} />
          </div>
          <div>
            <label htmlFor="cc-zip" className="sr-only">
              ZIP code
            </label>
            <input id="cc-zip" inputMode="numeric" autoComplete="postal-code" placeholder="ZIP" value={values.zip} onChange={(e) => set('zip', e.target.value.replace(/\D/g, '').slice(0, 5))} className="block w-full bg-white px-3.5 py-3 text-sm placeholder:text-muted/80 focus:outline-none" aria-invalid={!!errors.zip} />
          </div>
        </div>
      </div>
      {(errors.number || errors.expiry || errors.cvc || errors.zip) &&
      <p role="alert" className="text-xs font-medium text-danger">
          {[errors.number, errors.expiry && `Expiry: ${errors.expiry}`, errors.cvc && `CVC: ${errors.cvc}`, errors.zip && `ZIP: ${errors.zip}`].filter(Boolean).join(' ')}
        </p>
      }
      <p className="flex items-center gap-1.5 text-xs text-muted">
        <LockIcon className="h-3.5 w-3.5" aria-hidden="true" />
        Payments are encrypted and processed securely. Test card: 4242 4242 4242 4242.
      </p>
    </div>);

}