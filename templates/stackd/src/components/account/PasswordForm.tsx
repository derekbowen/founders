import React, { useState } from 'react';
import { Input } from '../Input';
import { Button } from '../Button';
import { useToast } from '../ToastProvider';

interface PasswordErrors {
  current?: string;
  next?: string;
  confirm?: string;
}

function strength(pw: string): {score: number;label: string;} {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return { score, label: ['Too short', 'Weak', 'Okay', 'Good', 'Strong'][score] };
}

export function PasswordForm() {
  const { addToast } = useToast();
  const [form, setForm] = useState({ current: '', next: '', confirm: '' });
  const [errors, setErrors] = useState<PasswordErrors>({});
  const [saving, setSaving] = useState(false);
  const s = strength(form.next);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: PasswordErrors = {};
    if (!form.current) errs.current = 'Enter your current password.';
    if (form.next.length < 8) errs.next = 'Use at least 8 characters.';
    if (form.confirm !== form.next) errs.confirm = 'Passwords don’t match.';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSaving(true);
    window.setTimeout(() => {
      setSaving(false);
      setForm({ current: '', next: '', confirm: '' });
      addToast({ type: 'success', message: 'Password updated' });
    }, 700);
  };

  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      <Input id="pw-current" type="password" label="Current password" autoComplete="current-password" value={form.current} error={errors.current} onChange={(e) => setForm({ ...form, current: e.target.value })} />
      <div>
        <Input id="pw-new" type="password" label="New password" autoComplete="new-password" value={form.next} error={errors.next} onChange={(e) => setForm({ ...form, next: e.target.value })} />
        {form.next &&
        <div className="mt-2">
            <div className="grid grid-cols-4 gap-1" aria-hidden="true">
              {[0, 1, 2, 3].map((i) =>
            <span key={i} className={`h-1.5 rounded-full ${i < s.score ? s.score >= 3 ? 'bg-success' : 'bg-brand' : 'bg-line'}`} />
            )}
            </div>
            <p className="mt-1 text-xs text-muted">Strength: {s.label}</p>
          </div>
        }
      </div>
      <Input id="pw-confirm" type="password" label="Confirm new password" autoComplete="new-password" value={form.confirm} error={errors.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })} />
      <div className="flex justify-end border-t border-line pt-5">
        <Button type="submit" loading={saving}>
          Update password
        </Button>
      </div>
    </form>);

}