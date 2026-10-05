import React, { useState } from 'react';
import { toast } from 'sonner';
import { Input } from '../Input';
import { BrandButton } from '../ui/BrandButton';

export function PasswordSettings() {
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const strength = [next.length >= 10, /[A-Z]/.test(next), /\d/.test(next), /[^A-Za-z0-9]/.test(next)].filter(Boolean).length;
  const strengthLabel = ['Too weak', 'Weak', 'Fair', 'Good', 'Strong'][strength];

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!current) errs.current = 'Enter your current password';
    if (next.length < 10) errs.next = 'Use at least 10 characters';
    if (confirm !== next) errs.confirm = 'Passwords don’t match';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    toast.success('Password updated');
    setCurrent('');
    setNext('');
    setConfirm('');
  };

  return (
    <form onSubmit={submit} className="space-y-5" noValidate>
      <div>
        <h2 className="text-lg font-semibold text-slate-900">Password</h2>
        <p className="mt-1 text-sm text-slate-600">Choose a strong password you don’t use elsewhere.</p>
      </div>
      <div className="max-w-md space-y-4">
        <Input id="pw-current" type="password" label="Current password" value={current} onChange={(e) => setCurrent(e.target.value)} error={errors.current} autoComplete="current-password" />
        <div>
          <Input id="pw-new" type="password" label="New password" value={next} onChange={(e) => setNext(e.target.value)} error={errors.next} autoComplete="new-password" />
          {next &&
          <div className="mt-2">
              <div className="flex gap-1" aria-hidden="true">
                {[0, 1, 2, 3].map((i) =>
              <span key={i} className={`h-1 flex-1 rounded-full ${i < strength ? strength >= 3 ? 'bg-accent-500' : 'bg-amber-400' : 'bg-slate-200'}`} />
              )}
              </div>
              <p className="mt-1 text-xs text-slate-500">Strength: {strengthLabel}</p>
            </div>
          }
        </div>
        <Input id="pw-confirm" type="password" label="Confirm new password" value={confirm} onChange={(e) => setConfirm(e.target.value)} error={errors.confirm} autoComplete="new-password" />
      </div>
      <div className="flex justify-end border-t border-slate-100 pt-5">
        <BrandButton type="submit">Update password</BrandButton>
      </div>
    </form>);

}