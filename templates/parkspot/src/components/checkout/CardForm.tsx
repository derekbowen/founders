import React from 'react';
import { CreditCardIcon, LockIcon } from 'lucide-react';
import { detectBrand, formatCardNumber, formatExpiry, type CardDetails, type CardErrors } from '../../utils/card';
import { labelClass } from '../../utils/styles';

interface CardFormProps {
  value: CardDetails;
  errors: CardErrors;
  onChange: (next: CardDetails) => void;
}

export function CardForm({ value, errors, onChange }: CardFormProps) {
  const brand = detectBrand(value.number);
  const set = (key: keyof CardDetails, v: string) => onChange({ ...value, [key]: v });
  const cardError = errors.number || errors.expiry || errors.cvc;
  const cell = 'h-12 w-full bg-transparent px-3 text-sm text-ink placeholder:text-muted focus:outline-none';

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="card-name" className={labelClass}>
          Name on card
        </label>
        <input
          id="card-name"
          autoComplete="cc-name"
          value={value.name}
          onChange={(e) => set('name', e.target.value)}
          placeholder="Jordan Lee"
          aria-invalid={!!errors.name}
          className={`h-12 w-full rounded-lg border bg-surface px-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/60 ${
          errors.name ? 'border-danger' : 'border-line focus:border-navy'}`
          } />
        
        {errors.name && <p className="mt-1 text-xs font-medium text-danger">{errors.name}</p>}
      </div>

      <fieldset>
        <legend className={labelClass}>Card information</legend>
        <div
          className={`overflow-hidden rounded-lg border bg-surface focus-within:ring-2 focus-within:ring-accent/60 ${
          cardError ? 'border-danger' : 'border-line focus-within:border-navy'}`
          }>
          
          <div className="relative border-b border-line">
            <label htmlFor="card-number" className="sr-only">
              Card number
            </label>
            <input
              id="card-number"
              inputMode="numeric"
              autoComplete="cc-number"
              placeholder="1234 1234 1234 1234"
              value={value.number}
              onChange={(e) => set('number', formatCardNumber(e.target.value))}
              aria-invalid={!!errors.number}
              className={`${cell} pr-24 font-medium tracking-wide`} />
            
            <span className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1 text-xs font-bold text-muted">
              {brand ? <span className="rounded bg-navy px-1.5 py-0.5 text-white">{brand}</span> : <CreditCardIcon size={18} aria-hidden />}
            </span>
          </div>
          <div className="grid grid-cols-2 divide-x divide-line">
            <div>
              <label htmlFor="card-exp" className="sr-only">
                Expiration date
              </label>
              <input
                id="card-exp"
                inputMode="numeric"
                autoComplete="cc-exp"
                placeholder="MM / YY"
                value={value.expiry}
                onChange={(e) => set('expiry', formatExpiry(e.target.value))}
                aria-invalid={!!errors.expiry}
                className={cell} />
              
            </div>
            <div>
              <label htmlFor="card-cvc" className="sr-only">
                Security code
              </label>
              <input
                id="card-cvc"
                inputMode="numeric"
                autoComplete="cc-csc"
                placeholder="CVC"
                value={value.cvc}
                onChange={(e) => set('cvc', e.target.value.replace(/\D/g, '').slice(0, 4))}
                aria-invalid={!!errors.cvc}
                className={cell} />
              
            </div>
          </div>
        </div>
        {cardError && <p className="mt-1 text-xs font-medium text-danger">{cardError}</p>}
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="card-country" className={labelClass}>
            Country
          </label>
          <select id="card-country" className="h-12 w-full rounded-lg border border-line bg-surface px-3 text-sm focus:border-navy focus:outline-none focus:ring-2 focus:ring-accent/60">
            <option>United States</option>
            <option>Canada</option>
          </select>
        </div>
        <div>
          <label htmlFor="card-zip" className={labelClass}>
            ZIP
          </label>
          <input
            id="card-zip"
            inputMode="numeric"
            autoComplete="postal-code"
            placeholder="94110"
            value={value.zip}
            onChange={(e) => set('zip', e.target.value.replace(/\D/g, '').slice(0, 5))}
            aria-invalid={!!errors.zip}
            className={`h-12 w-full rounded-lg border bg-surface px-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/60 ${
            errors.zip ? 'border-danger' : 'border-line focus:border-navy'}`
            } />
          
          {errors.zip && <p className="mt-1 text-xs font-medium text-danger">{errors.zip}</p>}
        </div>
      </div>

      <p className="flex items-center gap-1.5 text-xs text-muted">
        <LockIcon size={12} aria-hidden /> Payments are encrypted and processed by Stripe. Test card: 4242 4242 4242 4242.
      </p>
    </div>);

}