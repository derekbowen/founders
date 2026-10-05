import React, { useState } from 'react';
import { toast } from 'sonner';
import { TextField } from '../../components/ui/TextField';
import { Button } from '../../components/ui/Button';

export function Password() {
  const [form, setForm] = useState({ current: '', next: '', confirm: '' });
  const [errors, setErrors] = useState<Partial<Record<keyof typeof form, string>>>({});
  const [saving, setSaving] = useState(false);

  const strength = [form.next.length >= 8, /[A-Z]/.test(form.next), /\d/.test(form.next), /[^A-Za-z0-9]/.test(form.next)].filter(Boolean).length;
  const strengthLabel = ['Too short', 'Weak', 'Fair', 'Good', 'Strong'][strength];

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!form.current) next.current = 'Enter your current password';
    if (form.next.length < 8) next.next = 'Use at least 8 characters';
    if (form.next !== form.confirm) next.confirm = "Passwords don't match";
    setErrors(next);
    if (Object.keys(next).length) return;
    setSaving(true);
    window.setTimeout(() => {
      setSaving(false);
      setForm({ current: '', next: '', confirm: '' });
      toast.success('Password updated');
    }, 700);
  };

  return (
    <form onSubmit={submit} noValidate className="max-w-md">
      <h2 className="text-xl font-semibold text-slate-900">Password</h2>
      <p className="mt-1 text-sm text-slate-600">Choose a strong password you don't use anywhere else.</p>
      <div className="mt-6 space-y-5">
        <TextField label="Current password" type="password" autoComplete="current-password" value={form.current} onChange={(e) => setForm({ ...form, current: e.target.value })} error={errors.current} />
        <div>
          <TextField label="New password" type="password" autoComplete="new-password" value={form.next} onChange={(e) => setForm({ ...form, next: e.target.value })} error={errors.next} />
          {form.next &&
          <div className="mt-2" aria-live="polite">
              <div className="flex gap-1">
                {[0, 1, 2, 3].map((i) =>
              <span key={i} className={`h-1.5 flex-1 rounded-full ${i < strength ? strength >= 3 ? 'bg-accent-600' : 'bg-primary-500' : 'bg-slate-200'}`} />
              )}
              </div>
              <p className="mt-1 text-xs text-slate-600">Strength: {strengthLabel}</p>
            </div>
          }
        </div>
        <TextField label="Confirm new password" type="password" autoComplete="new-password" value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })} error={errors.confirm} />
      </div>
      <div className="mt-8 border-t border-slate-100 pt-6">
        <Button type="submit" loading={saving}>Update password</Button>
      </div>
    </form>);

}