import React, { useState } from 'react';
import { CreditCardIcon, LockIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import { TextField } from '../ui/TextField';
import { SelectField } from '../ui/SelectField';
import { cardBrand, expiryValid, formatCardNumber, formatExpiry, luhnValid } from '../../utils/card';

interface CardFormProps {
  amountLabel: string;
  onPay: () => Promise<void>;
}

interface Errors {
  name?: string;
  number?: string;
  expiry?: string;
  cvc?: string;
  zip?: string;
}

const countries = [
{ value: 'US', label: 'United States' },
{ value: 'GB', label: 'United Kingdom' },
{ value: 'CA', label: 'Canada' },
{ value: 'DE', label: 'Germany' },
{ value: 'FR', label: 'France' },
{ value: 'ES', label: 'Spain' }];


const brandLabel = { visa: 'VISA', mastercard: 'MC', amex: 'AMEX', unknown: '' };

export function CardForm({ amountLabel, onPay }: CardFormProps) {
  const [name, setName] = useState('Jordan Lee');
  const [number, setNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [country, setCountry] = useState('US');
  const [zip, setZip] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState('');

  const brand = cardBrand(number);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    if (!name.trim()) next.name = 'Enter the name on your card.';
    if (!luhnValid(number)) next.number = 'Your card number is invalid.';
    if (!expiryValid(expiry)) next.expiry = 'Expiry date is invalid or in the past.';
    if (!/^\d{3,4}$/.test(cvc)) next.cvc = 'CVC must be 3 or 4 digits.';
    if (zip.trim().length < 3) next.zip = 'Enter a valid postal code.';
    setErrors(next);
    setPayError('');
    if (Object.keys(next).length) return;
    setPaying(true);
    try {
      await onPay();
    } catch {
      setPayError('Your card was declined. Please try another card.');
      setPaying(false);
    }
  };

  const groupError = errors.number || errors.expiry || errors.cvc;
  const cellBase = 'h-12 w-full bg-white px-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:relative focus:z-10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500';

  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      <TextField label="Name on card" autoComplete="cc-name" value={name} onChange={(e) => setName(e.target.value)} error={errors.name} />

      <fieldset>
        <legend className="mb-1.5 block text-sm font-medium text-slate-800">Card information</legend>
        <div className={`overflow-hidden rounded-xl border ${groupError ? 'border-rose-400' : 'border-slate-300'}`}>
          <div className="relative">
            <label htmlFor="cc-number" className="sr-only">Card number</label>
            <input
              id="cc-number"
              inputMode="numeric"
              autoComplete="cc-number"
              placeholder="1234 1234 1234 1234"
              value={number}
              onChange={(e) => setNumber(formatCardNumber(e.target.value))}
              aria-invalid={!!errors.number || undefined}
              className={`${cellBase} pr-20`} />
            
            <span className="pointer-events-none absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1.5">
              {brand === 'unknown' ?
              <CreditCardIcon className="h-5 w-5 text-slate-400" aria-hidden="true" /> :

              <span className="rounded bg-slate-900 px-1.5 py-0.5 text-[10px] font-extrabold tracking-wider text-white">{brandLabel[brand]}</span>
              }
            </span>
          </div>
          <div className="grid grid-cols-2 border-t border-slate-300">
            <div className="border-r border-slate-300">
              <label htmlFor="cc-exp" className="sr-only">Expiry date</label>
              <input id="cc-exp" inputMode="numeric" autoComplete="cc-exp" placeholder="MM / YY" value={expiry} onChange={(e) => setExpiry(formatExpiry(e.target.value))} aria-invalid={!!errors.expiry || undefined} className={cellBase} />
            </div>
            <div>
              <label htmlFor="cc-cvc" className="sr-only">CVC</label>
              <input id="cc-cvc" inputMode="numeric" autoComplete="cc-csc" placeholder="CVC" value={cvc} onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 4))} aria-invalid={!!errors.cvc || undefined} className={cellBase} />
            </div>
          </div>
        </div>
        {groupError ?
        <p className="mt-1.5 text-xs font-medium text-rose-600" role="alert">{groupError}</p> :

        <p className="mt-1.5 text-xs text-slate-500">Test card: 4242 4242 4242 4242 · any future date · any CVC</p>
        }
      </fieldset>

      <div className="grid grid-cols-2 gap-3">
        <SelectField label="Country" options={countries} value={country} onChange={(e) => setCountry(e.target.value)} />
        <TextField label="ZIP / Postal code" autoComplete="postal-code" value={zip} onChange={(e) => setZip(e.target.value)} error={errors.zip} />
      </div>

      {payError && <p className="rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700" role="alert">{payError}</p>}

      <Button type="submit" size="lg" fullWidth loading={paying} leftIcon={<LockIcon className="h-4 w-4" aria-hidden="true" />}>
        {paying ? 'Processing payment…' : `Pay ${amountLabel}`}
      </Button>
    </form>);

}