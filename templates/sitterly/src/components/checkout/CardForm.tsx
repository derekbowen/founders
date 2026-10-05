import React from 'react';
import { CreditCardIcon, LockIcon } from 'lucide-react';
import { Input } from '../Input';
import { CardDetails, formatCardNumber, formatExpiry } from '../../hooks/useCheckoutForm';

interface CardFormProps {
  card: CardDetails;
  setCard: React.Dispatch<React.SetStateAction<CardDetails>>;
  errors: Record<string, string>;
}

function cardBrand(num: string): string | null {
  if (/^4/.test(num)) return 'VISA';
  if (/^5[1-5]/.test(num)) return 'MC';
  if (/^3[47]/.test(num)) return 'AMEX';
  return null;
}

export function CardForm({ card, setCard, errors }: CardFormProps) {
  const brandLabel = cardBrand(card.number);
  const boxError = errors['card-number'] || errors['card-expiry'] || errors['card-cvc'];
  const segment = 'h-12 w-full bg-transparent px-4 text-sm text-ink-900 placeholder:text-ink-400 focus:bg-primary-50/50 focus:outline-none';

  return (
    <div>
      <p className="mb-1.5 block text-sm font-medium text-ink-800">Card information</p>
      <div className={`overflow-hidden rounded-xl border bg-white transition focus-within:ring-2 focus-within:ring-primary-300 ${boxError ? 'border-red-400' : 'border-ink-200'}`}>
        <div className="relative border-b border-ink-200">
          <label htmlFor="card-number" className="sr-only">Card number</label>
          <input
            id="card-number"
            inputMode="numeric"
            autoComplete="cc-number"
            placeholder="1234 1234 1234 1234"
            value={card.number}
            aria-invalid={!!errors['card-number']}
            onChange={(e) => setCard((c) => ({ ...c, number: formatCardNumber(e.target.value) }))}
            className={`${segment} pr-20`} />
          
          <span className="pointer-events-none absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1">
            {brandLabel ?
            <span className="rounded bg-ink-900 px-1.5 py-0.5 text-[10px] font-bold tracking-wider text-white">{brandLabel}</span> :

            <CreditCardIcon className="h-5 w-5 text-ink-400" aria-hidden />
            }
          </span>
        </div>
        <div className="grid grid-cols-2 divide-x divide-ink-200">
          <div>
            <label htmlFor="card-expiry" className="sr-only">Expiry date</label>
            <input
              id="card-expiry"
              inputMode="numeric"
              autoComplete="cc-exp"
              placeholder="MM / YY"
              value={card.expiry}
              aria-invalid={!!errors['card-expiry']}
              onChange={(e) => setCard((c) => ({ ...c, expiry: formatExpiry(e.target.value) }))}
              className={segment} />
            
          </div>
          <div>
            <label htmlFor="card-cvc" className="sr-only">CVC</label>
            <input
              id="card-cvc"
              inputMode="numeric"
              autoComplete="cc-csc"
              placeholder="CVC"
              value={card.cvc}
              aria-invalid={!!errors['card-cvc']}
              onChange={(e) => setCard((c) => ({ ...c, cvc: e.target.value.replace(/\D/g, '').slice(0, 4) }))}
              className={segment} />
            
          </div>
        </div>
      </div>
      {boxError ?
      <p role="alert" className="mt-1.5 text-xs font-medium text-red-600">{boxError}</p> :

      <p className="mt-1.5 text-xs text-ink-600">Test cards: 4242 4242 4242 4242 (success) · 4000 0000 0000 0002 (declined)</p>
      }
      <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_140px]">
        <Input
          id="card-name"
          label="Name on card"
          autoComplete="cc-name"
          value={card.name}
          error={errors['card-name']}
          onChange={(e) => setCard((c) => ({ ...c, name: e.target.value }))} />
        
        <Input
          id="card-zip"
          label="ZIP"
          inputMode="numeric"
          autoComplete="postal-code"
          value={card.zip}
          error={errors['card-zip']}
          onChange={(e) => setCard((c) => ({ ...c, zip: e.target.value.replace(/\D/g, '').slice(0, 5) }))} />
        
      </div>
      <p className="mt-3 flex items-center gap-1.5 text-xs text-ink-600">
        <LockIcon className="h-3.5 w-3.5" aria-hidden /> Payments are encrypted and processed securely by Stripe.
      </p>
    </div>);

}