import React from 'react';
import { CreditCardIcon, LockIcon } from 'lucide-react';
import { Input } from '../Input';
import { Checkbox } from '../Checkbox';
import { detectCardBrand } from '../../utils/card';
import type { CheckoutErrors, CheckoutValues } from '../../hooks/useCheckoutForm';

interface CardFormProps {
  values: CheckoutValues;
  errors: CheckoutErrors;
  onChange: <K extends keyof CheckoutValues>(key: K, value: CheckoutValues[K]) => void;
}

const brandLabel: Record<string, string> = { visa: 'VISA', mastercard: 'Mastercard', amex: 'AMEX' };

export function CardForm({ values, errors, onChange }: CardFormProps) {
  const cardBrand = detectCardBrand(values.cardNumber);

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-ink-200 bg-ink-50 p-4 sm:p-5">
        <div className="mb-4 flex items-center justify-between">
          <p className="flex items-center gap-2 text-sm font-medium text-ink-800">
            <CreditCardIcon size={16} aria-hidden="true" /> Card details
          </p>
          <div className="flex gap-1" aria-hidden="true">
            {['VISA', 'MC', 'AMEX'].map((b) =>
            <span key={b} className="rounded border border-ink-200 bg-white px-1.5 py-0.5 text-[10px] font-semibold text-ink-600">{b}</span>
            )}
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Input
              id="card-name"
              label="Name on card"
              autoComplete="cc-name"
              value={values.cardName}
              onChange={(e) => onChange('cardName', e.target.value)}
              error={errors.cardName} />
            
          </div>
          <div className="sm:col-span-2">
            <Input
              id="card-number"
              label="Card number"
              inputMode="numeric"
              autoComplete="cc-number"
              placeholder="1234 1234 1234 1234"
              value={values.cardNumber}
              onChange={(e) => onChange('cardNumber', e.target.value)}
              error={errors.cardNumber}
              endAdornment={
              cardBrand !== 'unknown' ?
              <span className="text-xs font-semibold text-primary-700">{brandLabel[cardBrand]}</span> :
              undefined
              } />
            
          </div>
          <Input
            id="card-expiry"
            label="Expiry"
            inputMode="numeric"
            autoComplete="cc-exp"
            placeholder="MM / YY"
            value={values.expiry}
            onChange={(e) => onChange('expiry', e.target.value)}
            error={errors.expiry} />
          
          <Input
            id="card-cvc"
            label="CVC"
            inputMode="numeric"
            autoComplete="cc-csc"
            placeholder="123"
            value={values.cvc}
            onChange={(e) => onChange('cvc', e.target.value)}
            error={errors.cvc} />
          
          <div className="sm:col-span-2">
            <Input
              id="card-postal"
              label="ZIP / postal code"
              autoComplete="postal-code"
              placeholder="94110"
              value={values.postalCode}
              onChange={(e) => onChange('postalCode', e.target.value)}
              error={errors.postalCode} />
            
          </div>
        </div>
        <p className="mt-4 text-xs text-ink-500">
          Demo mode — use test card <span className="font-medium text-ink-700">4242 4242 4242 4242</span>, any future date and any CVC.
        </p>
      </div>
      <Checkbox
        label="Save this card for future lessons"
        checked={values.saveCard}
        onChange={(e) => onChange('saveCard', e.target.checked)} />
      
      <p className="flex items-center gap-1.5 text-xs text-ink-500">
        <LockIcon size={12} aria-hidden="true" /> Payments are encrypted and processed securely by Stripe.
      </p>
    </div>);

}