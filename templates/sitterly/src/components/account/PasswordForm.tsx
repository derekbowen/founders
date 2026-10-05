import React, { useState } from 'react';
import { Input } from '../Input';
import { useToast } from '../ToastProvider';
import { BrandButton } from '../ui/BrandButton';

export function PasswordForm() {
  const { addToast } = useToast();
  const [form, setForm] = useState({ current: '', next: '', confirm: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const strength = [/.{8,}/, /[A-Z]/, /[0-9]/, /[^A-Za-z0-9]/].filter((r) => r.test(form.next)).length;
  const strengthLabel = ['Too short', 'Weak', 'Okay', 'Good', 'Strong'][strength];

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const err: Record<string, string> = {};
    if (!form.current) err.current = 'Enter your current password';
    if (form.next.length < 8) err.next = 'Use at least 8 characters';
    if (form.confirm !== form.next) err.confirm = 'Passwords don’t match';
    setErrors(err);
    if (Object.keys(err).length) return;
    setSaving(true);
    window.setTimeout(() => {
      setSaving(false);
      setForm({ current: '', next: '', confirm: '' });
      addToast({ type: 'success', message: 'Password updated' });
    }, 700);
  };

  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      <Input id="pw-current" label="Current password" type="password" autoComplete="current-password" value={form.current} error={errors.current} onChange={(e) => setForm((f) => ({ ...f, current: e.target.value }))} />
      <div>
        <Input id="pw-next" label="New password" type="password" autoComplete="new-password" value={form.next} error={errors.next} onChange={(e) => setForm((f) => ({ ...f, next: e.target.value }))} />
        {form.next &&
        <div className="mt-2">
            <div className="grid grid-cols-4 gap-1" aria-hidden>
              {[1, 2, 3, 4].map((i) =>
            <span key={i} className={`h-1.5 rounded-full ${i <= strength ? strength >= 3 ? 'bg-emerald-500' : 'bg-accent-500' : 'bg-ink-200'}`} />
            )}
            </div>
            <p className="mt-1 text-xs text-ink-600">Strength: {strengthLabel}</p>
          </div>
        }
      </div>
      <Input id="pw-confirm" label="Confirm new password" type="password" autoComplete="new-password" value={form.confirm} error={errors.confirm} onChange={(e) => setForm((f) => ({ ...f, confirm: e.target.value }))} />
      <BrandButton type="submit" loading={saving}>Update password</BrandButton>
    </form>);

}