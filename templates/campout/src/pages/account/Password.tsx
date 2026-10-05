import React, { useState } from 'react';
import { SaveNotice } from '../../components/SaveNotice';

export function Password() {
  const [form, setForm] = useState({ current: '', next: '', confirm: '' });
  const [errors, setErrors] = useState<Partial<Record<keyof typeof form, string>>>({});
  const [saved, setSaved] = useState(false);
  const strength = Math.min(4, [/.{8,}/, /[A-Z]/, /\d/, /[^A-Za-z0-9]/].filter((r) => r.test(form.next)).length);
  const strengthLabel = ['Too short', 'Weak', 'Okay', 'Good', 'Strong'][strength];

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!form.current) next.current = 'Enter your current password.';
    if (form.next.length < 8) next.next = 'Use at least 8 characters.';
    if (form.confirm !== form.next) next.confirm = 'Passwords don’t match.';
    setErrors(next);
    if (Object.keys(next).length) return;
    setForm({ current: '', next: '', confirm: '' });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const field = (key: keyof typeof form, label: string, autoComplete: string) =>
  <label className="block">
      <span className="label">{label}</span>
      <input
      type="password"
      autoComplete={autoComplete}
      className={`input ${errors[key] ? 'input-error' : ''}`}
      value={form[key]}
      onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
      aria-invalid={Boolean(errors[key])} />
    
      {errors[key] && <span className="mt-1.5 block text-sm text-red-700">{errors[key]}</span>}
    </label>;


  return (
    <form onSubmit={submit} className="card p-6 md:p-8" noValidate>
      <h2 className="text-xl font-bold text-ink-900">Change password</h2>
      <p className="mt-1 text-sm text-ink-500">You’ll stay logged in on this device.</p>
      <div className="mt-6 space-y-5">
        {field('current', 'Current password', 'current-password')}
        {field('next', 'New password', 'new-password')}
        {form.next &&
        <div>
            <div className="flex gap-1" aria-hidden="true">
              {[0, 1, 2, 3].map((i) =>
            <span key={i} className={`h-1.5 flex-1 rounded-full ${i < strength ? strength >= 3 ? 'bg-primary-600' : 'bg-accent-500' : 'bg-sand-200'}`} />
            )}
            </div>
            <p className="mt-1.5 text-xs text-ink-500">Strength: {strengthLabel}</p>
          </div>
        }
        {field('confirm', 'Confirm new password', 'new-password')}
      </div>
      <div className="mt-8 flex items-center gap-4">
        <button type="submit" className="btn-primary">
          Update password
        </button>
        <SaveNotice show={saved} message="Password updated" />
      </div>
    </form>);

}