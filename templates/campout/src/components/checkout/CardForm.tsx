import React from 'react';
import { CreditCardIcon, LockIcon } from 'lucide-react';

export interface CardDetails {
  number: string;
  expiry: string;
  cvc: string;
  name: string;
  postal: string;
}

export type CardErrors = Partial<Record<keyof CardDetails, string>>;

interface CardFormProps {
  value: CardDetails;
  errors: CardErrors;
  onChange: (value: CardDetails) => void;
}

export function validateCard(c: CardDetails): CardErrors {
  const errors: CardErrors = {};
  const digits = c.number.replace(/\s/g, '');
  if (digits.length < 15) errors.number = 'Your card number is incomplete.';
  const [mm, yy] = c.expiry.split('/').map((s) => Number(s.trim()));
  if (!mm || !yy || mm > 12) errors.expiry = 'Your card’s expiration date is incomplete.';else
  if (2000 + yy < 2026 || 2000 + yy === 2026 && mm < 10) errors.expiry = 'Your card’s expiration year is in the past.';
  if (c.cvc.length < 3) errors.cvc = 'Your card’s security code is incomplete.';
  if (!c.name.trim()) errors.name = 'Enter the name on your card.';
  if (c.postal.trim().length < 5) errors.postal = 'Your ZIP is incomplete.';
  return errors;
}

function cardBrand(number: string): string | null {
  const d = number.replace(/\s/g, '');
  if (/^4/.test(d)) return 'VISA';
  if (/^5[1-5]/.test(d)) return 'MC';
  if (/^3[47]/.test(d)) return 'AMEX';
  return null;
}

export function CardForm({ value, errors, onChange }: CardFormProps) {
  const set = (key: keyof CardDetails, v: string) => onChange({ ...value, [key]: v });
  const brandName = cardBrand(value.number);
  const elementError = errors.number ?? errors.expiry ?? errors.cvc;

  return (
    <div className="space-y-4">
      <div>
        <span className="label" id="card-label">
          Card information
        </span>
        <div
          className={`overflow-hidden rounded-lg border bg-white transition focus-within:ring-2 ${
          elementError ? 'border-red-600 focus-within:ring-red-600/20' : 'border-sand-300 focus-within:border-primary-500 focus-within:ring-primary-500/20'}`
          }
          role="group"
          aria-labelledby="card-label">
          
          <div className="relative border-b border-sand-200">
            <input
              inputMode="numeric"
              autoComplete="cc-number"
              aria-label="Card number"
              placeholder="1234 1234 1234 1234"
              value={value.number}
              onChange={(e) =>
              set(
                'number',
                e.target.value.
                replace(/\D/g, '').
                slice(0, 16).
                replace(/(.{4})/g, '$1 ').
                trim()
              )
              }
              className="w-full bg-transparent px-3.5 py-3 pr-20 text-sm tabular-nums text-ink-900 placeholder:text-ink-400 focus:outline-none" />
            
            <span className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1">
              {brandName ?
              <span className="rounded bg-primary-800 px-1.5 py-0.5 text-[10px] font-bold tracking-wider text-white">{brandName}</span> :

              <CreditCardIcon size={18} className="text-ink-400" aria-hidden="true" />
              }
            </span>
          </div>
          <div className="grid grid-cols-2">
            <input
              inputMode="numeric"
              autoComplete="cc-exp"
              aria-label="Expiration date"
              placeholder="MM / YY"
              value={value.expiry}
              onChange={(e) => {
                const d = e.target.value.replace(/\D/g, '').slice(0, 4);
                set('expiry', d.length > 2 ? `${d.slice(0, 2)} / ${d.slice(2)}` : d);
              }}
              className="border-r border-sand-200 bg-transparent px-3.5 py-3 text-sm tabular-nums text-ink-900 placeholder:text-ink-400 focus:outline-none" />
            
            <input
              inputMode="numeric"
              autoComplete="cc-csc"
              aria-label="Security code"
              placeholder="CVC"
              value={value.cvc}
              onChange={(e) => set('cvc', e.target.value.replace(/\D/g, '').slice(0, 4))}
              className="bg-transparent px-3.5 py-3 text-sm tabular-nums text-ink-900 placeholder:text-ink-400 focus:outline-none" />
            
          </div>
        </div>
        {elementError &&
        <p className="mt-1.5 text-sm text-red-700" role="alert">
            {elementError}
          </p>
        }
      </div>
      <div className="grid gap-4 sm:grid-cols-[2fr_1fr]">
        <label>
          <span className="label">Name on card</span>
          <input
            autoComplete="cc-name"
            value={value.name}
            onChange={(e) => set('name', e.target.value)}
            className={`input ${errors.name ? 'input-error' : ''}`}
            placeholder="Jordan Reyes" />
          
          {errors.name && <span className="mt-1.5 block text-sm text-red-700">{errors.name}</span>}
        </label>
        <label>
          <span className="label">ZIP</span>
          <input
            inputMode="numeric"
            autoComplete="postal-code"
            value={value.postal}
            onChange={(e) => set('postal', e.target.value.replace(/\D/g, '').slice(0, 5))}
            className={`input ${errors.postal ? 'input-error' : ''}`}
            placeholder="97701" />
          
          {errors.postal && <span className="mt-1.5 block text-sm text-red-700">{errors.postal}</span>}
        </label>
      </div>
      <p className="flex items-center gap-1.5 text-xs text-ink-500">
        <LockIcon size={13} aria-hidden="true" /> Payments are encrypted and processed securely. We never store your full card number.
      </p>
    </div>);

}