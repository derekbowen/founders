import React from 'react';
import { CreditCardIcon, LockIcon } from 'lucide-react';
import { cx, labelClass } from '../../utils/styles';

export interface CardState {
  name: string;
  number: string;
  expiry: string;
  cvc: string;
  zip: string;
}

interface CardFormProps {
  card: CardState;
  onChange: (c: CardState) => void;
  errors: Partial<Record<keyof CardState, string>>;
}

function formatNumber(v: string) {
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

function cardBrand(num: string) {
  const n = num.replace(/\s/g, '');
  if (n.startsWith('4')) return 'VISA';
  if (/^5[1-5]/.test(n)) return 'MC';
  if (/^3[47]/.test(n)) return 'AMEX';
  return null;
}

export function CardForm({ card, onChange, errors }: CardFormProps) {
  const set = (k: keyof CardState, v: string) => onChange({ ...card, [k]: v });
  const brandName = cardBrand(card.number);
  const firstError = errors.number || errors.expiry || errors.cvc || errors.zip;

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="card-name" className={labelClass}>
          Name on card
        </label>
        <input
          id="card-name"
          autoComplete="cc-name"
          value={card.name}
          onChange={(e) => set('name', e.target.value)}
          placeholder="Olivia Hart"
          className={cx(
            'h-11 w-full rounded-md border bg-paper px-3 text-sm shadow-[0_1px_2px_rgba(0,0,0,0.05)] focus:outline-none focus:ring-2 focus:ring-accent-dark/40',
            errors.name ? 'border-[#c53030]' : 'border-line focus:border-accent-dark'
          )} />
        
        {errors.name && <p className="mt-1 text-xs text-[#9b2c2c]">{errors.name}</p>}
      </div>
      <div>
        <span id="card-label" className={labelClass}>
          Card information
        </span>
        <div
          role="group"
          aria-labelledby="card-label"
          className={cx(
            'overflow-hidden rounded-md border bg-paper shadow-[0_1px_2px_rgba(0,0,0,0.05)] focus-within:ring-2 focus-within:ring-accent-dark/40',
            firstError ? 'border-[#c53030]' : 'border-line focus-within:border-accent-dark'
          )}>
          
          <div className="relative border-b border-line">
            <input
              aria-label="Card number"
              inputMode="numeric"
              autoComplete="cc-number"
              value={card.number}
              onChange={(e) => set('number', formatNumber(e.target.value))}
              placeholder="1234 1234 1234 1234"
              className="h-11 w-full bg-transparent px-3 pr-24 text-sm tracking-wide focus:outline-none" />
            
            <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1">
              {brandName ?
              <span className="rounded bg-ink px-1.5 py-0.5 text-[10px] font-bold text-paper">{brandName}</span> :

              <>
                  {['VISA', 'MC', 'AMEX'].map((b) =>
                <span key={b} className="rounded border border-line px-1 py-0.5 text-[9px] font-bold text-muted">
                      {b}
                    </span>
                )}
                </>
              }
            </div>
          </div>
          <div className="grid grid-cols-3 divide-x divide-line">
            <input
              aria-label="Expiration date"
              inputMode="numeric"
              autoComplete="cc-exp"
              value={card.expiry}
              onChange={(e) => set('expiry', formatExpiry(e.target.value))}
              placeholder="MM / YY"
              className="h-11 bg-transparent px-3 text-sm focus:outline-none" />
            
            <div className="relative">
              <input
                aria-label="Security code"
                inputMode="numeric"
                autoComplete="cc-csc"
                value={card.cvc}
                onChange={(e) => set('cvc', e.target.value.replace(/\D/g, '').slice(0, 4))}
                placeholder="CVC"
                className="h-11 w-full bg-transparent px-3 pr-8 text-sm focus:outline-none" />
              
              <CreditCardIcon size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" />
            </div>
            <input
              aria-label="ZIP code"
              inputMode="numeric"
              autoComplete="postal-code"
              value={card.zip}
              onChange={(e) => set('zip', e.target.value.replace(/\D/g, '').slice(0, 5))}
              placeholder="ZIP"
              className="h-11 bg-transparent px-3 text-sm focus:outline-none" />
            
          </div>
        </div>
        {firstError && <p className="mt-1 text-xs text-[#9b2c2c]">{firstError}</p>}
      </div>
      <p className="flex items-center gap-1.5 text-xs text-muted">
        <LockIcon size={12} aria-hidden="true" /> Payments are encrypted and processed securely by Stripe.
      </p>
    </div>);

}

export function validateCard(card: CardState): Partial<Record<keyof CardState, string>> {
  const errors: Partial<Record<keyof CardState, string>> = {};
  if (!card.name.trim()) errors.name = 'Enter the name on your card.';
  if (card.number.replace(/\s/g, '').length < 15) errors.number = 'Your card number is incomplete.';
  const [mm, yy] = card.expiry.split(' / ').map(Number);
  if (!mm || !yy || mm > 12 || mm < 1) errors.expiry = 'Your card’s expiration date is incomplete.';
  if (card.cvc.length < 3) errors.cvc = 'Your card’s security code is incomplete.';
  if (card.zip.length < 5) errors.zip = 'Your ZIP code is incomplete.';
  return errors;
}