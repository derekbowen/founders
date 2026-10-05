import React, { useState } from 'react';
import { AlertCircleIcon, CreditCardIcon, LockIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import { Field } from '../ui/Field';
import { formatMoney } from '../../utils/format';
import { cn, inputClass, inputErrorClass } from '../../utils/styles';

interface CardFormProps {
  total: number;
  processing: boolean;
  onSubmit: () => void;
}

interface Errors {
  name?: string;
  card?: string;
  zip?: string;
}

function formatCardNumber(v: string): string {
  return v.replace(/\D/g, '').slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 ');
}

function formatExpiry(v: string): string {
  const digits = v.replace(/\D/g, '').slice(0, 4);
  return digits.length > 2 ? `${digits.slice(0, 2)} / ${digits.slice(2)}` : digits;
}

function cardBrand(num: string): string | null {
  const d = num.replace(/\s/g, '');
  if (/^4/.test(d)) return 'VISA';
  if (/^(5[1-5]|2[2-7])/.test(d)) return 'MC';
  if (/^3[47]/.test(d)) return 'AMEX';
  return null;
}

export function CardForm({ total, processing, onSubmit }: CardFormProps) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [zip, setZip] = useState('');
  const [errors, setErrors] = useState<Errors>({});

  function validate(): Errors {
    const e: Errors = {};
    if (name.trim().length < 2) e.name = 'Enter the name on your card.';
    const digits = number.replace(/\s/g, '');
    const [mm, yy] = expiry.split(' / ').map(Number);
    if (digits.length < 15) e.card = 'Your card number is incomplete.';else
    if (!mm || mm > 12 || !yy || yy < 26) e.card = 'Your card’s expiration date is invalid.';else
    if (cvc.length < 3) e.card = 'Your card’s security code is incomplete.';
    if (!/^\d{5}$/.test(zip)) e.zip = 'Enter a 5-digit ZIP code.';
    return e;
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length === 0) onSubmit();
  }

  const brandLabel = cardBrand(number);

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <Field label="Name on card" htmlFor="cc-name" error={errors.name}>
        <input
          id="cc-name"
          autoComplete="cc-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Alex Rivera"
          aria-invalid={Boolean(errors.name)}
          className={cn(inputClass, errors.name && inputErrorClass)} />
        
      </Field>

      <fieldset>
        <legend className="mb-1.5 text-sm font-bold text-ink-900">Card information</legend>
        <div
          className={cn(
            'overflow-hidden rounded-lg border bg-white shadow-sm focus-within:ring-2',
            errors.card ? 'border-red-400 focus-within:ring-red-500/30' : 'border-ink-300 focus-within:border-primary-500 focus-within:ring-primary-500/30'
          )}>
          
          <div className="relative border-b border-ink-200">
            <label htmlFor="cc-number" className="sr-only">
              Card number
            </label>
            <input
              id="cc-number"
              inputMode="numeric"
              autoComplete="cc-number"
              value={number}
              onChange={(e) => setNumber(formatCardNumber(e.target.value))}
              placeholder="1234 1234 1234 1234"
              className="h-11 w-full px-3.5 pr-20 text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none" />
            
            <span className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1">
              {brandLabel ?
              <span className="rounded bg-ink-900 px-1.5 py-0.5 text-[10px] font-extrabold tracking-wider text-white">
                  {brandLabel}
                </span> :

              <CreditCardIcon className="h-5 w-5 text-ink-400" aria-hidden="true" />
              }
            </span>
          </div>
          <div className="grid grid-cols-2">
            <div className="border-r border-ink-200">
              <label htmlFor="cc-exp" className="sr-only">
                Expiration date
              </label>
              <input
                id="cc-exp"
                inputMode="numeric"
                autoComplete="cc-exp"
                value={expiry}
                onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                placeholder="MM / YY"
                className="h-11 w-full px-3.5 text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none" />
              
            </div>
            <div>
              <label htmlFor="cc-cvc" className="sr-only">
                Security code
              </label>
              <input
                id="cc-cvc"
                inputMode="numeric"
                autoComplete="cc-csc"
                value={cvc}
                onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
                placeholder="CVC"
                className="h-11 w-full px-3.5 text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none" />
              
            </div>
          </div>
        </div>
        {errors.card &&
        <p className="mt-1.5 flex items-center gap-1 text-xs font-semibold text-red-700" role="alert">
            <AlertCircleIcon className="h-3.5 w-3.5" aria-hidden="true" />
            {errors.card}
          </p>
        }
        <p className="mt-1.5 text-xs text-ink-500">Demo: use 4242 4242 4242 4242, any future date and any CVC.</p>
      </fieldset>

      <Field label="Billing ZIP code" htmlFor="cc-zip" error={errors.zip}>
        <input
          id="cc-zip"
          inputMode="numeric"
          autoComplete="postal-code"
          value={zip}
          onChange={(e) => setZip(e.target.value.replace(/\D/g, '').slice(0, 5))}
          placeholder="97214"
          aria-invalid={Boolean(errors.zip)}
          className={cn(inputClass, 'sm:w-40', errors.zip && inputErrorClass)} />
        
      </Field>

      <Button type="submit" size="lg" fullWidth loading={processing} leftIcon={<LockIcon className="h-4 w-4" />}>
        {processing ? 'Processing payment…' : `Pay ${formatMoney(total)}`}
      </Button>
    </form>);

}