import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { TextField } from '../ui/TextField';
import { useToast } from '../ToastProvider';

function strength(pw: string): {score: number;label: string;} {
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/\d/.test(pw) && /[^A-Za-z0-9]/.test(pw)) score++;
  return { score, label: ['Too short', 'Weak', 'Fair', 'Good', 'Strong'][score] };
}

const barColors = ['bg-rose-500', 'bg-rose-500', 'bg-amber-500', 'bg-accent-500', 'bg-accent-600'];

export function PasswordForm() {
  const { addToast } = useToast();
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const s = strength(next);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!current) errs.current = 'Enter your current password.';
    if (next.length < 8) errs.next = 'Use at least 8 characters.';
    if (confirm !== next) errs.confirm = 'Passwords do not match.';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSaving(true);
    window.setTimeout(() => {
      setSaving(false);
      setCurrent('');
      setNext('');
      setConfirm('');
      addToast({ type: 'success', message: 'Password updated' });
    }, 700);
  };

  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      <TextField label="Current password" type="password" autoComplete="current-password" value={current} onChange={(e) => setCurrent(e.target.value)} error={errors.current} />
      <div>
        <TextField label="New password" type="password" autoComplete="new-password" value={next} onChange={(e) => setNext(e.target.value)} error={errors.next} />
        {next &&
        <div className="mt-2" aria-live="polite">
            <div className="flex gap-1" aria-hidden="true">
              {[0, 1, 2, 3].map((i) =>
            <span key={i} className={`h-1.5 flex-1 rounded-full ${i < s.score ? barColors[s.score] : 'bg-slate-200'}`} />
            )}
            </div>
            <p className="mt-1 text-xs text-slate-600">Strength: <span className="font-semibold">{s.label}</span></p>
          </div>
        }
      </div>
      <TextField label="Confirm new password" type="password" autoComplete="new-password" value={confirm} onChange={(e) => setConfirm(e.target.value)} error={errors.confirm} />
      <div className="flex justify-end border-t border-slate-100 pt-5">
        <Button type="submit" loading={saving}>Update password</Button>
      </div>
    </form>);

}