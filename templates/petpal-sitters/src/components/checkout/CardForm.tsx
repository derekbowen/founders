import React from 'react';
import { CreditCardIcon, LockIcon } from 'lucide-react';
import { TextField } from '../ui/TextField';
import type { CardForm as CardFormState } from '../../hooks/useCardForm';
import { cn } from '../../utils/cn';

const brandLabel = { visa: 'VISA', mastercard: 'MC', amex: 'AMEX', unknown: '' };

export function CardForm({ card }: {card: CardFormState;}) {
  const cell =
  'h-12 w-full bg-white px-4 text-[15px] font-semibold text-stone-900 placeholder:font-medium placeholder:text-stone-400 focus:relative focus:z-10 focus:outline-none focus:ring-4 focus:ring-primary-100';
  const cardErrors = [card.errors.number, card.errors.expiry, card.errors.cvc, card.errors.zip].filter(Boolean);

  return (
    <div className="space-y-4">
      <TextField
        id="card-name"
        label="Name on card"
        autoComplete="cc-name"
        value={card.name}
        onChange={(e) => card.setName(e.target.value)}
        error={card.errors.name}
        placeholder="Jordan Rivera" />
      
      <fieldset>
        <legend className="mb-1.5 block text-sm font-bold text-stone-800">Card details</legend>
        <div className={cn('overflow-hidden rounded-xl border', cardErrors.length ? 'border-red-400' : 'border-stone-300')}>
          <div className="relative border-b border-stone-200">
            <label htmlFor="card-number" className="sr-only">
              Card number
            </label>
            <input
              id="card-number"
              inputMode="numeric"
              autoComplete="cc-number"
              placeholder="1234 1234 1234 1234"
              value={card.number}
              onChange={(e) => card.setNumber(e.target.value)}
              aria-invalid={!!card.errors.number}
              className={cn(cell, 'pr-20 tracking-wide')} />
            
            <span className="pointer-events-none absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1.5">
              {card.brand !== 'unknown' ?
              <span className="rounded-md bg-stone-900 px-1.5 py-0.5 text-[10px] font-black tracking-wider text-white">{brandLabel[card.brand]}</span> :

              <CreditCardIcon className="h-5 w-5 text-stone-400" aria-hidden="true" />
              }
            </span>
          </div>
          <div className="grid grid-cols-3 divide-x divide-stone-200">
            <div>
              <label htmlFor="card-expiry" className="sr-only">
                Expiration date
              </label>
              <input
                id="card-expiry"
                inputMode="numeric"
                autoComplete="cc-exp"
                placeholder="MM / YY"
                value={card.expiry}
                onChange={(e) => card.setExpiry(e.target.value)}
                aria-invalid={!!card.errors.expiry}
                className={cell} />
              
            </div>
            <div>
              <label htmlFor="card-cvc" className="sr-only">
                Security code
              </label>
              <input
                id="card-cvc"
                inputMode="numeric"
                autoComplete="cc-csc"
                placeholder="CVC"
                value={card.cvc}
                onChange={(e) => card.setCvc(e.target.value)}
                aria-invalid={!!card.errors.cvc}
                className={cell} />
              
            </div>
            <div>
              <label htmlFor="card-zip" className="sr-only">
                ZIP code
              </label>
              <input
                id="card-zip"
                inputMode="numeric"
                autoComplete="postal-code"
                placeholder="ZIP"
                value={card.zip}
                onChange={(e) => card.setZip(e.target.value)}
                aria-invalid={!!card.errors.zip}
                className={cell} />
              
            </div>
          </div>
        </div>
        {cardErrors.length > 0 ?
        <p className="mt-1.5 text-sm font-semibold text-red-600" role="alert">
            {cardErrors[0]}
          </p> :

        <p className="mt-1.5 text-sm text-stone-500">Demo: use 4242 4242 4242 4242, any future date and any CVC.</p>
        }
      </fieldset>
      <p className="flex items-center gap-2 text-xs font-semibold text-stone-500">
        <LockIcon className="h-3.5 w-3.5" aria-hidden="true" />
        Payments are encrypted and processed securely. Card details are never stored on our servers.
      </p>
    </div>);

}