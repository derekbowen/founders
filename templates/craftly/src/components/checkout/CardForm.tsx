import React from 'react';
import { CreditCardIcon, LockIcon } from 'lucide-react';
import { detectCardBrand, formatCardNumber, formatExpiry } from '../../utils/card';

export interface CardValue {
  number: string;
  expiry: string;
  cvc: string;
  name: string;
  zip: string;
}

export type CardErrors = Partial<Record<keyof CardValue, string>>;

interface CardFormProps {
  value: CardValue;
  onChange: (value: CardValue) => void;
  errors: CardErrors;
}

const brandLabel: Record<string, string> = { visa: 'VISA', mastercard: 'MC', amex: 'AMEX', discover: 'DISC' };

export function CardForm({ value, onChange, errors }: CardFormProps) {
  const brand = detectCardBrand(value.number);
  const set = (key: keyof CardValue, v: string) => onChange({ ...value, [key]: v });
  const cell = 'w-full bg-transparent px-3.5 py-3 text-sm text-ink placeholder:text-muted/70 focus:outline-none';
  const anyError = errors.number || errors.expiry || errors.cvc;

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="card-name" className="field-label">Name on card</label>
        <input id="card-name" className={`field-input ${errors.name ? 'border-danger' : ''}`} value={value.name} onChange={(e) => set('name', e.target.value)} autoComplete="cc-name" placeholder="Sam Rivera" aria-invalid={!!errors.name} />
        {errors.name && <p className="mt-1.5 text-xs font-medium text-danger">{errors.name}</p>}
      </div>
      <div>
        <span className="field-label" id="card-details-label">Card details</span>
        <div
          className={`overflow-hidden rounded-lg border bg-surface transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 ${anyError ? 'border-danger' : 'border-line'}`}
          role="group"
          aria-labelledby="card-details-label">
          
          <div className="relative border-b border-line">
            <label htmlFor="card-number" className="sr-only">Card number</label>
            <input
              id="card-number"
              inputMode="numeric"
              autoComplete="cc-number"
              placeholder="1234 1234 1234 1234"
              className={`${cell} pr-20 tracking-wide`}
              value={value.number}
              onChange={(e) => set('number', formatCardNumber(e.target.value))}
              aria-invalid={!!errors.number} />
            
            <span className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1">
              {brand === 'unknown' ?
              <CreditCardIcon className="h-5 w-5 text-muted" aria-hidden /> :

              <span className="rounded bg-ink px-1.5 py-0.5 text-[10px] font-bold tracking-wider text-canvas">{brandLabel[brand]}</span>
              }
            </span>
          </div>
          <div className="grid grid-cols-3 divide-x divide-line">
            <div>
              <label htmlFor="card-exp" className="sr-only">Expiration date</label>
              <input id="card-exp" inputMode="numeric" autoComplete="cc-exp" placeholder="MM / YY" className={cell} value={value.expiry} onChange={(e) => set('expiry', formatExpiry(e.target.value))} aria-invalid={!!errors.expiry} />
            </div>
            <div>
              <label htmlFor="card-cvc" className="sr-only">Security code</label>
              <input id="card-cvc" inputMode="numeric" autoComplete="cc-csc" placeholder="CVC" className={cell} value={value.cvc} onChange={(e) => set('cvc', e.target.value.replace(/\D/g, '').slice(0, brand === 'amex' ? 4 : 3))} aria-invalid={!!errors.cvc} />
            </div>
            <div>
              <label htmlFor="card-zip" className="sr-only">ZIP code</label>
              <input id="card-zip" inputMode="numeric" autoComplete="postal-code" placeholder="ZIP" className={cell} value={value.zip} onChange={(e) => set('zip', e.target.value.replace(/\D/g, '').slice(0, 5))} aria-invalid={!!errors.zip} />
            </div>
          </div>
        </div>
        {(anyError || errors.zip) &&
        <p className="mt-1.5 text-xs font-medium text-danger" role="alert">
            {errors.number ?? errors.expiry ?? errors.cvc ?? errors.zip}
          </p>
        }
        <p className="mt-2 flex items-center gap-1.5 text-xs text-muted">
          <LockIcon className="h-3 w-3" aria-hidden /> Payments are encrypted and processed securely by Stripe. Try 4242 4242 4242 4242.
        </p>
      </div>
    </div>);

}