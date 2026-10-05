import React from 'react';
import { CreditCardIcon, LockIcon } from 'lucide-react';
import type { CheckoutErrors, CheckoutValues } from '../../hooks/useCheckoutForm';
import { detectCardBrand, formatCardNumber, formatExpiry } from '../../utils/card';
import { cn, inputClass, labelClass } from '../../utils/styles';
import { Field } from '../ui/Field';

interface CardFormProps {
  values: CheckoutValues;
  errors: CheckoutErrors;
  setField: <K extends keyof CheckoutValues>(key: K, value: CheckoutValues[K]) => void;
}

const brandLabel: Record<string, string> = { visa: 'VISA', mastercard: 'MC', amex: 'AMEX', discover: 'DISC' };

export function CardForm({ values, errors, setField }: CardFormProps) {
  const brand = detectCardBrand(values.cardNumber);
  const cardError = errors.cardNumber || errors.expiry || errors.cvc;
  const bare = 'w-full bg-transparent px-3.5 py-3 text-sm text-steel-900 placeholder:text-steel-400 focus:outline-none';

  return (
    <div className="space-y-4">
      <div>
        <span className={labelClass} id="card-info-label">Card information</span>
        <div
          role="group"
          aria-labelledby="card-info-label"
          className={cn(
            'overflow-hidden rounded-lg border bg-white shadow-sm transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20',
            cardError ? 'border-primary' : 'border-steel-300'
          )}>
          
          <div className="relative border-b border-steel-200">
            <label htmlFor="co-cardNumber" className="sr-only">Card number</label>
            <input
              id="co-cardNumber"
              inputMode="numeric"
              autoComplete="cc-number"
              placeholder="1234 1234 1234 1234"
              value={values.cardNumber}
              onChange={(e) => setField('cardNumber', formatCardNumber(e.target.value))}
              aria-invalid={!!errors.cardNumber}
              className={cn(bare, 'pr-20')} />
            
            <span className="pointer-events-none absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1">
              {brand !== 'unknown' ?
              <span className="rounded bg-steel-900 px-1.5 py-0.5 text-[10px] font-bold tracking-wider text-white">{brandLabel[brand]}</span> :

              <CreditCardIcon className="h-5 w-5 text-steel-400" aria-hidden="true" />
              }
            </span>
          </div>
          <div className="grid grid-cols-2 divide-x divide-steel-200">
            <div>
              <label htmlFor="co-expiry" className="sr-only">Expiration date</label>
              <input
                id="co-expiry"
                inputMode="numeric"
                autoComplete="cc-exp"
                placeholder="MM / YY"
                value={values.expiry}
                onChange={(e) => setField('expiry', formatExpiry(e.target.value))}
                aria-invalid={!!errors.expiry}
                className={bare} />
              
            </div>
            <div>
              <label htmlFor="co-cvc" className="sr-only">Security code</label>
              <input
                id="co-cvc"
                inputMode="numeric"
                autoComplete="cc-csc"
                placeholder="CVC"
                value={values.cvc}
                onChange={(e) => setField('cvc', e.target.value.replace(/\D/g, '').slice(0, 4))}
                aria-invalid={!!errors.cvc}
                className={bare} />
              
            </div>
          </div>
        </div>
        {cardError ?
        <p className="mt-1.5 text-xs font-medium text-primary" role="alert">{cardError}</p> :

        <p className="mt-1.5 text-xs text-steel-500">Demo: use 4242 4242 4242 4242, any future date and any CVC.</p>
        }
      </div>

      <Field label="ZIP code" htmlFor="co-zip" error={errors.zip} className="max-w-[12rem]">
        <input
          id="co-zip"
          inputMode="numeric"
          autoComplete="postal-code"
          placeholder="60608"
          value={values.zip}
          onChange={(e) => setField('zip', e.target.value.replace(/\D/g, '').slice(0, 5))}
          aria-invalid={!!errors.zip}
          className={cn(inputClass, errors.zip && 'border-primary')} />
        
      </Field>

      <p className="flex items-center gap-2 text-xs text-steel-500">
        <LockIcon className="h-3.5 w-3.5" aria-hidden="true" />
        Payments are processed securely by <span className="font-semibold text-steel-700">Stripe</span>. Card details never touch our servers.
      </p>
    </div>);

}