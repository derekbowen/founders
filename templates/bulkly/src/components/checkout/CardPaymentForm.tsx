import React from 'react';
import { CreditCardIcon, LockIcon } from 'lucide-react';
import { Input } from '../Input';
import type { CheckoutErrors, CheckoutForm } from '../../hooks/useCheckout';

interface CardPaymentFormProps {
  form: CheckoutForm;
  errors: CheckoutErrors;
  setField: (key: keyof CheckoutForm, value: string) => void;
}

function formatCardNumber(v: string) {
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

export function CardPaymentForm({ form, errors, setField }: CardPaymentFormProps) {
  const cardErrors = [errors.cardNumber, errors.cardExpiry, errors.cardCvc, errors.cardZip].filter(Boolean);
  const cell =
  'h-11 w-full bg-white px-3 text-sm tabular-nums text-slate-900 placeholder:text-slate-400 focus:relative focus:z-10 focus:outline-none focus:ring-2 focus:ring-primary-500';

  return (
    <div className="space-y-4">
      <Input
        id="checkout-cardName"
        label="Name on card"
        value={form.cardName}
        onChange={(e) => setField('cardName', e.target.value)}
        error={errors.cardName}
        autoComplete="cc-name" />
      
      <fieldset>
        <legend className="mb-1.5 block text-sm font-medium text-slate-800">Card details</legend>
        <div className={`overflow-hidden rounded-lg border ${cardErrors.length ? 'border-red-400' : 'border-slate-300'}`}>
          <div className="relative border-b border-slate-200">
            <label htmlFor="checkout-cardNumber" className="sr-only">
              Card number
            </label>
            <input
              id="checkout-cardNumber"
              inputMode="numeric"
              autoComplete="cc-number"
              placeholder="1234 1234 1234 1234"
              value={form.cardNumber}
              onChange={(e) => setField('cardNumber', formatCardNumber(e.target.value))}
              className={`${cell} pr-24`}
              aria-invalid={Boolean(errors.cardNumber)} />
            
            <div className="pointer-events-none absolute right-3 top-1/2 flex -translate-y-1/2 gap-1" aria-hidden="true">
              {['VISA', 'MC', 'AMEX'].map((b) =>
              <span key={b} className="rounded border border-slate-200 px-1 py-0.5 text-[9px] font-bold text-slate-500">
                  {b}
                </span>
              )}
            </div>
          </div>
          <div className="grid grid-cols-3 divide-x divide-slate-200">
            <div>
              <label htmlFor="checkout-cardExpiry" className="sr-only">
                Expiration date
              </label>
              <input
                id="checkout-cardExpiry"
                inputMode="numeric"
                autoComplete="cc-exp"
                placeholder="MM / YY"
                value={form.cardExpiry}
                onChange={(e) => setField('cardExpiry', formatExpiry(e.target.value))}
                className={cell}
                aria-invalid={Boolean(errors.cardExpiry)} />
              
            </div>
            <div>
              <label htmlFor="checkout-cardCvc" className="sr-only">
                Security code
              </label>
              <input
                id="checkout-cardCvc"
                inputMode="numeric"
                autoComplete="cc-csc"
                placeholder="CVC"
                value={form.cardCvc}
                onChange={(e) => setField('cardCvc', e.target.value.replace(/\D/g, '').slice(0, 4))}
                className={cell}
                aria-invalid={Boolean(errors.cardCvc)} />
              
            </div>
            <div>
              <label htmlFor="checkout-cardZip" className="sr-only">
                Billing ZIP
              </label>
              <input
                id="checkout-cardZip"
                inputMode="numeric"
                autoComplete="postal-code"
                placeholder="ZIP"
                value={form.cardZip}
                onChange={(e) => setField('cardZip', e.target.value.replace(/\D/g, '').slice(0, 5))}
                className={cell}
                aria-invalid={Boolean(errors.cardZip)} />
              
            </div>
          </div>
        </div>
        {cardErrors.length > 0 &&
        <p className="mt-1.5 text-xs text-red-600" role="alert">
            {cardErrors[0]}
          </p>
        }
      </fieldset>
      <p className="flex items-center gap-1.5 text-xs text-slate-500">
        <LockIcon className="h-3.5 w-3.5" aria-hidden="true" />
        Your card is authorized now and charged only when each brand confirms.
        <CreditCardIcon className="ml-auto h-4 w-4 text-slate-300" aria-hidden="true" />
      </p>
    </div>);

}