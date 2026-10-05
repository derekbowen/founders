import React from 'react';
import { CreditCardIcon, LockIcon } from 'lucide-react';
import { Input } from '../Input';

export interface CardFields {
  number: string;
  expiry: string;
  cvc: string;
  name: string;
  country: string;
}

export type CardErrors = Partial<Record<keyof CardFields, string>>;

export const countries = ['United States', 'United Kingdom', 'Canada', 'Germany', 'France', 'Australia', 'Netherlands', 'Norway', 'Portugal'];

export function validateCard(c: CardFields): CardErrors {
  const errors: CardErrors = {};
  if (c.number.replace(/\s/g, '').length < 16) errors.number = 'Card number is incomplete.';
  const [mm, yy] = c.expiry.split('/');
  if (!mm || !yy || Number(mm) < 1 || Number(mm) > 12 || yy.length < 2) errors.expiry = 'Enter a valid expiry (MM/YY).';
  if (c.cvc.length < 3) errors.cvc = 'CVC is incomplete.';
  if (!c.name.trim()) errors.name = 'Enter the name on the card.';
  return errors;
}

const formatNumber = (v: string) =>
v.
replace(/\D/g, '').
slice(0, 16).
replace(/(.{4})/g, '$1 ').
trim();

const formatExpiry = (v: string) => {
  const d = v.replace(/\D/g, '').slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
};

interface CardFormProps {
  value: CardFields;
  errors: CardErrors;
  onChange: (patch: Partial<CardFields>) => void;
}

export function CardForm({ value, errors, onChange }: CardFormProps) {
  return (
    <div className="space-y-4">
      <Input
        id="card-number"
        label="Card number"
        inputMode="numeric"
        autoComplete="cc-number"
        placeholder="1234 1234 1234 1234"
        value={value.number}
        error={errors.number}
        onChange={(e) => onChange({ number: formatNumber(e.target.value) })}
        endAdornment={<CreditCardIcon size={16} />} />
      
      <div className="grid grid-cols-2 gap-4">
        <Input
          id="card-expiry"
          label="Expiry"
          inputMode="numeric"
          autoComplete="cc-exp"
          placeholder="MM/YY"
          value={value.expiry}
          error={errors.expiry}
          onChange={(e) => onChange({ expiry: formatExpiry(e.target.value) })} />
        
        <Input
          id="card-cvc"
          label="CVC"
          inputMode="numeric"
          autoComplete="cc-csc"
          placeholder="123"
          value={value.cvc}
          error={errors.cvc}
          onChange={(e) => onChange({ cvc: e.target.value.replace(/\D/g, '').slice(0, 4) })} />
        
      </div>
      <Input
        id="card-name"
        label="Name on card"
        autoComplete="cc-name"
        placeholder="Jane Appleseed"
        value={value.name}
        error={errors.name}
        onChange={(e) => onChange({ name: e.target.value })} />
      
      <div>
        <label htmlFor="card-country" className="label">
          Country
        </label>
        <select id="card-country" value={value.country} onChange={(e) => onChange({ country: e.target.value })} className="field">
          {countries.map((c) =>
          <option key={c}>{c}</option>
          )}
        </select>
      </div>
      <p className="flex items-center gap-1.5 text-xs text-muted">
        <LockIcon className="h-3.5 w-3.5" aria-hidden="true" />
        Payments are encrypted and processed securely. Test card: 4242 4242 4242 4242.
      </p>
    </div>);

}