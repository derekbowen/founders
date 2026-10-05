import React from 'react';
import { CreditCardIcon, LockIcon } from 'lucide-react';
import { Input } from '../Input';
import { cardBrand, formatCardNumber, formatExpiry } from '../../utils/card';

export interface CardValues {
  name: string;
  number: string;
  expiry: string;
  cvc: string;
  postal: string;
}

interface CardFormProps {
  values: CardValues;
  errors: Partial<Record<keyof CardValues, string>>;
  onChange: (patch: Partial<CardValues>) => void;
}

export function CardForm({ values, errors, onChange }: CardFormProps) {
  const detected = cardBrand(values.number);
  return (
    <div className="space-y-4">
      <Input
        id="card-name"
        label="Name on card"
        autoComplete="cc-name"
        value={values.name}
        error={errors.name}
        onChange={(e) => onChange({ name: e.target.value })}
        placeholder="Maya Lindqvist" />
      
      <Input
        id="card-number"
        label="Card number"
        inputMode="numeric"
        autoComplete="cc-number"
        value={values.number}
        error={errors.number}
        onChange={(e) => onChange({ number: formatCardNumber(e.target.value) })}
        placeholder="1234 1234 1234 1234"
        startAdornment={<CreditCardIcon size={16} aria-hidden="true" />}
        endAdornment={detected ? <span className="text-xs font-semibold text-ink-muted">{detected}</span> : undefined} />
      
      <div className="grid grid-cols-3 gap-3">
        <Input
          id="card-expiry"
          label="Expiry"
          inputMode="numeric"
          autoComplete="cc-exp"
          value={values.expiry}
          error={errors.expiry}
          onChange={(e) => onChange({ expiry: formatExpiry(e.target.value) })}
          placeholder="MM / YY" />
        
        <Input
          id="card-cvc"
          label="CVC"
          inputMode="numeric"
          autoComplete="cc-csc"
          value={values.cvc}
          error={errors.cvc}
          onChange={(e) => onChange({ cvc: e.target.value.replace(/\D/g, '').slice(0, 4) })}
          placeholder="123" />
        
        <Input
          id="card-postal"
          label="Postcode"
          autoComplete="postal-code"
          value={values.postal}
          error={errors.postal}
          onChange={(e) => onChange({ postal: e.target.value })}
          placeholder="EC2A 4QE" />
        
      </div>
      <p className="flex items-center gap-1.5 text-xs text-ink-muted">
        <LockIcon size={12} aria-hidden="true" /> Payments are encrypted and processed securely by Stripe. We never store your card details.
      </p>
    </div>);

}