import React, { useState } from 'react';
import { CircleCheckIcon } from 'lucide-react';
import { cn, inputClass } from '../../utils/styles';
import { Button } from '../ui/Button';
import { Field } from '../ui/Field';

function strength(pw: string): number {
  let s = 0;
  if (pw.length >= 8) s += 1;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s += 1;
  if (/\d/.test(pw)) s += 1;
  if (/[^A-Za-z0-9]/.test(pw)) s += 1;
  return s;
}

const labels = ['Too short', 'Weak', 'Fair', 'Good', 'Strong'];
const colors = ['bg-steel-300', 'bg-primary', 'bg-amber-500', 'bg-accent', 'bg-accent'];

export function PasswordForm() {
  const [v, setV] = useState({ current: '', next: '', confirm: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const score = strength(v.next);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const found: Record<string, string> = {};
    if (!v.current) found.current = 'Enter your current password';
    if (v.next.length < 8) found.next = 'Use at least 8 characters';
    if (v.next !== v.confirm) found.confirm = 'Passwords don’t match';
    setErrors(found);
    if (Object.keys(found).length) return;
    setDone(true);
    setV({ current: '', next: '', confirm: '' });
  };

  const field = (key: keyof typeof v) => ({
    value: v[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setV({ ...v, [key]: e.target.value });
      setErrors({ ...errors, [key]: '' });
      setDone(false);
    },
    className: cn(inputClass, errors[key] && 'border-primary'),
    type: 'password'
  });

  return (
    <form onSubmit={submit} noValidate className="max-w-md space-y-4">
      <Field label="Current password" htmlFor="pw-current" error={errors.current}>
        <input id="pw-current" autoComplete="current-password" {...field('current')} />
      </Field>
      <Field label="New password" htmlFor="pw-next" error={errors.next}>
        <input id="pw-next" autoComplete="new-password" {...field('next')} />
      </Field>
      {v.next &&
      <div aria-live="polite">
          <div className="flex gap-1">
            {[0, 1, 2, 3].map((i) =>
          <span key={i} className={cn('h-1.5 flex-1 rounded-full', i < score ? colors[score] : 'bg-steel-200')} />
          )}
          </div>
          <p className="mt-1 text-xs text-steel-500">Strength: {labels[score]}</p>
        </div>
      }
      <Field label="Confirm new password" htmlFor="pw-confirm" error={errors.confirm}>
        <input id="pw-confirm" autoComplete="new-password" {...field('confirm')} />
      </Field>
      <div className="flex items-center gap-3 pt-2">
        <Button type="submit">Update password</Button>
        {done &&
        <span className="flex items-center gap-1.5 text-sm font-medium text-accent" role="status">
            <CircleCheckIcon className="h-4 w-4" aria-hidden="true" />
            Password updated
          </span>
        }
      </div>
    </form>);

}