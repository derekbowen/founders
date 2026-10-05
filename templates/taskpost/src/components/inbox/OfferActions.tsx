import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { CheckIcon, RepeatIcon, XIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import { Field } from '../ui/Field';
import { useApp } from '../../hooks/useApp';
import type { Offer, Transaction, UserRole } from '../../types/marketplace';
import { formatMoney } from '../../utils/format';
import { cn, inputClass, inputErrorClass, textareaClass } from '../../utils/styles';
import { todayISODate } from '../../utils/time';
import { customerTotal } from '../../utils/transactions';

interface OfferActionsProps {
  tx: Transaction;
  offer: Offer;
  role: UserRole;
}

export function OfferActions({ tx, offer, role }: OfferActionsProps) {
  const { acceptOffer, declineOffer, counterOffer } = useApp();
  const navigate = useNavigate();
  const [mode, setMode] = useState<'idle' | 'counter' | 'decline'>('idle');
  const [amount, setAmount] = useState(String(offer.amount));
  const [date, setDate] = useState(offer.earliestDate < todayISODate() ? todayISODate() : offer.earliestDate);
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string>();

  function handleAccept() {
    acceptOffer(tx.id);
    if (role === 'customer') {
      toast.success('Offer accepted — complete payment to lock it in.');
      navigate(`/checkout/${tx.id}`);
    } else {
      toast.success('Counter-offer accepted. Waiting for the customer to pay.');
    }
  }

  function handleCounter(e: React.FormEvent) {
    e.preventDefault();
    const n = Number(amount);
    if (!n || n < 10) return setError('Enter a valid amount.');
    if (n === offer.amount) return setError('Your counter should differ from the current offer.');
    counterOffer(tx.id, { amount: n, earliestDate: date, message: message.trim() });
    toast.success(`Counter-offer of ${formatMoney(n)} sent.`);
    setMode('idle');
    setMessage('');
    setError(undefined);
  }

  if (mode === 'decline') {
    return (
      <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4">
        <p className="text-sm font-bold text-red-900">Decline this offer?</p>
        <p className="mt-0.5 text-sm text-red-800">This ends the negotiation. It can’t be undone.</p>
        <div className="mt-3 flex gap-2">
          <Button
            variant="danger"
            size="sm"
            onClick={() => {
              declineOffer(tx.id);
              toast('Offer declined.');
            }}>
            
            Yes, decline
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setMode('idle')}>
            Cancel
          </Button>
        </div>
      </div>);

  }

  if (mode === 'counter') {
    return (
      <form onSubmit={handleCounter} className="mt-4 space-y-3 rounded-xl border border-ink-200 bg-ink-50 p-4" noValidate>
        <p className="text-sm font-extrabold text-ink-900">Make a counter-offer</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Your price" htmlFor={`counter-amt-${tx.id}`} error={error}>
            <div className="relative">
              <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-ink-500">$</span>
              <input
                id={`counter-amt-${tx.id}`}
                type="number"
                min={10}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className={cn(inputClass, 'pl-7 font-bold', error && inputErrorClass)} />
              
            </div>
          </Field>
          <Field label="Date" htmlFor={`counter-date-${tx.id}`}>
            <input
              id={`counter-date-${tx.id}`}
              type="date"
              min={todayISODate()}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={inputClass} />
            
          </Field>
        </div>
        <Field label="Note" htmlFor={`counter-msg-${tx.id}`} optional>
          <textarea
            id={`counter-msg-${tx.id}`}
            rows={2}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Explain your counter…"
            className={cn(textareaClass, 'min-h-[72px]')} />
          
        </Field>
        <div className="flex gap-2">
          <Button type="submit" size="sm">
            Send counter
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setMode('idle')}>
            Cancel
          </Button>
        </div>
      </form>);

  }

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      <Button size="sm" onClick={handleAccept} leftIcon={<CheckIcon className="h-4 w-4" />}>
        {role === 'customer' ? `Accept & pay ${formatMoney(customerTotal(offer.amount))}` : 'Accept'}
      </Button>
      <Button variant="secondary" size="sm" onClick={() => setMode('counter')} leftIcon={<RepeatIcon className="h-4 w-4" />}>
        Counter
      </Button>
      <Button variant="ghost" size="sm" onClick={() => setMode('decline')} leftIcon={<XIcon className="h-4 w-4" />}>
        Decline
      </Button>
    </div>);

}