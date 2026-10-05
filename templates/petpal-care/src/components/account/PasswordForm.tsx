import React, { useState } from 'react';
import { Input } from '../Input';
import { useToast } from '../ToastProvider';

type Errors = Partial<Record<'current' | 'next' | 'confirm', string>>;

export function PasswordForm() {
  const { addToast } = useToast();
  const [values, setValues] = useState({ current: '', next: '', confirm: '' });
  const [errors, setErrors] = useState<Errors>({});

  const strength = [/.{8,}/, /[A-Z]/, /[0-9]/, /[^A-Za-z0-9]/].filter((r) => r.test(values.next)).length;
  const strengthLabel = ['Too short', 'Weak', 'Okay', 'Good', 'Strong'][strength];

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Errors = {};
    if (!values.current) errs.current = 'Enter your current password.';
    if (values.next.length < 8) errs.next = 'Use at least 8 characters.';
    if (values.confirm !== values.next) errs.confirm = 'Passwords don’t match.';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setValues({ current: '', next: '', confirm: '' });
    addToast({ type: 'success', message: 'Password updated' });
  };

  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      <Input id="pw-current" type="password" label="Current password" autoComplete="current-password" value={values.current} error={errors.current} onChange={(e) => setValues({ ...values, current: e.target.value })} />
      <div>
        <Input id="pw-new" type="password" label="New password" autoComplete="new-password" value={values.next} error={errors.next} onChange={(e) => setValues({ ...values, next: e.target.value })} />
        {values.next &&
        <div className="mt-2">
            <div className="grid grid-cols-4 gap-1" aria-hidden="true">
              {[0, 1, 2, 3].map((i) =>
            <span key={i} className={`h-1.5 rounded-full ${i < strength ? strength >= 3 ? 'bg-accent-500' : 'bg-primary-500' : 'bg-ink-200'}`} />
            )}
            </div>
            <p className="mt-1 text-xs font-semibold text-ink-600">Strength: {strengthLabel}</p>
          </div>
        }
      </div>
      <Input id="pw-confirm" type="password" label="Confirm new password" autoComplete="new-password" value={values.confirm} error={errors.confirm} onChange={(e) => setValues({ ...values, confirm: e.target.value })} />
      <button type="submit" className="btn btn-md btn-primary">
        Update password
      </button>
    </form>);

}