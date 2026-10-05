import React from 'react';
import { motion } from 'framer-motion';
import { CheckIcon } from 'lucide-react';
import { ButtonLink } from '../ui/ButtonLink';
import { formatCurrency } from '../../utils/pricing';

interface CheckoutSuccessProps {
  orderNumber: string;
  total: number;
  brandCount: number;
}

export function CheckoutSuccess({ orderNumber, total, brandCount }: CheckoutSuccessProps) {
  return (
    <div className="mx-auto max-w-xl px-4 py-16 text-center">
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent-400 text-primary-950">
        
        <CheckIcon className="h-8 w-8" aria-hidden="true" />
      </motion.div>
      <h1 className="mt-6 text-2xl font-semibold tracking-tight text-slate-900">Order placed</h1>
      <p className="mt-2 text-sm text-slate-600">
        Order <span className="font-mono font-medium text-slate-900">{orderNumber}</span> · {formatCurrency(total)} across {brandCount}{' '}
        brand{brandCount > 1 ? 's' : ''}. Each brand will confirm within 48 hours — your card is charged only on confirmation.
      </p>
      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-5 text-left">
        <h2 className="text-sm font-semibold text-slate-900">What happens next</h2>
        <ol className="mt-3 space-y-3 text-sm text-slate-600">
          {['Brands confirm and prepare your cases', 'You get tracking in your inbox when cases ship', 'Mark the order received to release payment'].map(
            (s, i) =>
            <li key={s} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-50 text-xs font-semibold text-primary-700">
                  {i + 1}
                </span>
                {s}
              </li>

          )}
        </ol>
      </div>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink to="/inbox/purchases">View in inbox</ButtonLink>
        <ButtonLink to="/search" variant="secondary">
          Keep shopping
        </ButtonLink>
      </div>
    </div>);

}