import React, { useState } from 'react';
import { CheckCircle2Icon } from 'lucide-react';
import { Input } from '../Input';
import { buttonClass } from '../../utils/styles';

export function PasswordSection() {
  const [form, setForm] = useState({ current: '', next: '', confirm: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const strength = [form.next.length >= 8, /[A-Z]/.test(form.next), /\d/.test(form.next), /[^A-Za-z0-9]/.test(form.next)].filter(Boolean).length;
  const strengthLabel = ['Too short', 'Weak', 'Fair', 'Good', 'Strong'][strength];

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!form.current) errs.current = 'Enter your current password';
    if (form.next.length < 8) errs.next = 'Use at least 8 characters';
    if (form.next !== form.confirm) errs.confirm = 'Passwords don’t match';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSaving(true);
    window.setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setForm({ current: '', next: '', confirm: '' });
    }, 700);
  };

  return (
    <form onSubmit={save} className="max-w-md space-y-5" noValidate>
      <Input id="pw-current" type="password" label="Current password" value={form.current} onChange={(e) => setForm({ ...form, current: e.target.value })} error={errors.current} autoComplete="current-password" />
      <div>
        <Input id="pw-new" type="password" label="New password" value={form.next} onChange={(e) => {setForm({ ...form, next: e.target.value });setSaved(false);}} error={errors.next} autoComplete="new-password" />
        {form.next &&
        <div className="mt-2">
            <div className="flex gap-1" aria-hidden>
              {[0, 1, 2, 3].map((i) =>
            <span key={i} className={`h-1.5 flex-1 rounded-full ${i < strength ? strength >= 3 ? 'bg-success' : 'bg-accent' : 'bg-line'}`} />
            )}
            </div>
            <p className="mt-1 text-xs text-muted">Strength: {strengthLabel}</p>
          </div>
        }
      </div>
      <Input id="pw-confirm" type="password" label="Confirm new password" value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })} error={errors.confirm} autoComplete="new-password" />
      <div className="flex items-center gap-3">
        <button type="submit" disabled={saving} className={buttonClass('primary')}>
          {saving ? 'Updating…' : 'Update password'}
        </button>
        {saved &&
        <span role="status" className="inline-flex items-center gap-1.5 text-sm font-medium text-success">
            <CheckCircle2Icon size={16} aria-hidden /> Password updated
          </span>
        }
      </div>
    </form>);

}