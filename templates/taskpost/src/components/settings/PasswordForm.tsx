import React, { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/Button';
import { Field } from '../ui/Field';
import { cn, inputClass, inputErrorClass } from '../../utils/styles';

interface Errors {
  current?: string;
  next?: string;
  confirm?: string;
}

export function PasswordForm() {
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [saving, setSaving] = useState(false);

  const strength = [next.length >= 8, /[A-Z]/.test(next), /\d/.test(next), /[^A-Za-z0-9]/.test(next)].filter(Boolean).length;
  const strengthLabel = ['Too short', 'Weak', 'Fair', 'Good', 'Strong'][strength];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const v: Errors = {};
    if (!current) v.current = 'Enter your current password.';
    if (next.length < 8) v.next = 'Use at least 8 characters.';else
    if (next === current) v.next = 'New password must be different.';
    if (confirm !== next) v.confirm = 'Passwords don’t match.';
    setErrors(v);
    if (Object.keys(v).length) return;
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setCurrent('');
      setNext('');
      setConfirm('');
      toast.success('Password updated.');
    }, 600);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <Field label="Current password" htmlFor="pw-current" error={errors.current}>
        <input id="pw-current" type="password" autoComplete="current-password" value={current} onChange={(e) => setCurrent(e.target.value)} className={cn(inputClass, errors.current && inputErrorClass)} />
      </Field>
      <Field label="New password" htmlFor="pw-new" error={errors.next}>
        <input id="pw-new" type="password" autoComplete="new-password" value={next} onChange={(e) => setNext(e.target.value)} className={cn(inputClass, errors.next && inputErrorClass)} />
        {next &&
        <div className="mt-2">
            <div className="flex gap-1" aria-hidden="true">
              {[0, 1, 2, 3].map((i) =>
            <span key={i} className={cn('h-1.5 flex-1 rounded-full', i < strength ? strength >= 3 ? 'bg-emerald-500' : 'bg-amber-500' : 'bg-ink-200')} />
            )}
            </div>
            <p className="mt-1 text-xs font-semibold text-ink-600">Strength: {strengthLabel}</p>
          </div>
        }
      </Field>
      <Field label="Confirm new password" htmlFor="pw-confirm" error={errors.confirm}>
        <input id="pw-confirm" type="password" autoComplete="new-password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className={cn(inputClass, errors.confirm && inputErrorClass)} />
      </Field>
      <Button type="submit" loading={saving}>
        Update password
      </Button>
    </form>);

}