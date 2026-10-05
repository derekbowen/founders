import React, { useState } from 'react';
import { addDays, format } from 'date-fns';
import { Button } from '../ui/Button';
import { TextField } from '../ui/TextField';
import { TextAreaField } from '../ui/TextAreaField';

interface OfferFormProps {
  title: string;
  submitLabel: string;
  initial?: {price?: number;deliveryDate?: string;scope?: string;};
  onSubmit: (values: {price: number;deliveryDate: string;scope: string;}) => void;
  onCancel?: () => void;
}

export function OfferForm({ title, submitLabel, initial, onSubmit, onCancel }: OfferFormProps) {
  const [price, setPrice] = useState(initial?.price ? String(initial.price) : '');
  const [deliveryDate, setDeliveryDate] = useState(initial?.deliveryDate ?? '');
  const [scope, setScope] = useState(initial?.scope ?? '');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    const amount = Number(price);
    if (!amount || amount < 20) next.price = 'Enter an amount of at least $20.';
    if (!deliveryDate) next.deliveryDate = 'Choose a delivery date.';
    if (scope.trim().length < 15) next.scope = 'Describe what is included (15+ characters).';
    setErrors(next);
    if (Object.keys(next).length) return;
    setSubmitting(true);
    window.setTimeout(() => {
      onSubmit({ price: amount, deliveryDate, scope: scope.trim() });
      setSubmitting(false);
    }, 500);
  };

  return (
    <form onSubmit={submit} noValidate className="rounded-2xl border border-primary-200 bg-white p-5">
      <h3 className="text-base font-bold text-slate-900">{title}</h3>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <TextField
          label="Price (USD)"
          type="number"
          inputMode="numeric"
          min={20}
          leading={<span className="text-sm font-semibold">$</span>}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          error={errors.price} />
        
        <TextField
          label="Delivery date"
          type="date"
          min={format(addDays(new Date(), 1), 'yyyy-MM-dd')}
          value={deliveryDate}
          onChange={(e) => setDeliveryDate(e.target.value)}
          error={errors.deliveryDate} />
        
      </div>
      <TextAreaField
        className="mt-4"
        label="Scope"
        rows={3}
        placeholder="Deliverables, revisions and anything excluded"
        value={scope}
        onChange={(e) => setScope(e.target.value)}
        error={errors.scope} />
      
      <div className="mt-5 flex flex-wrap gap-2">
        <Button type="submit" loading={submitting}>{submitLabel}</Button>
        {onCancel && <Button variant="ghost" onClick={onCancel}>Cancel</Button>}
      </div>
    </form>);

}