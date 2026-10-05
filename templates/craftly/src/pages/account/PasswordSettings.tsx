import React, { useState } from 'react';
import { toast } from 'sonner';
import { SettingsHeader } from '../../components/account/SettingsHeader';
import { Button } from '../../components/ui/Button';
import { TextField } from '../../components/ui/TextField';

function strength(pw: string): {score: number;label: string;} {
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/\d/.test(pw) || /[^A-Za-z0-9]/.test(pw)) score++;
  return { score, label: ['Too short', 'Weak', 'Fair', 'Good', 'Strong'][score] };
}

export function PasswordSettings() {
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errors, setErrors] = useState<{current?: string;next?: string;confirm?: string;}>({});
  const [saving, setSaving] = useState(false);
  const s = strength(next);
  const barColors = ['bg-line', 'bg-danger', 'bg-warning', 'bg-accent', 'bg-success'];

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: typeof errors = {};
    if (!current) errs.current = 'Enter your current password';
    if (next.length < 8) errs.next = 'Use at least 8 characters';
    if (next !== confirm) errs.confirm = 'Passwords don’t match';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSaving(true);
    await new Promise((r) => setTimeout(r, 700));
    setSaving(false);
    setCurrent('');
    setNext('');
    setConfirm('');
    toast.success('Password updated');
  };

  return (
    <form onSubmit={submit} noValidate>
      <SettingsHeader title="Password" description="Choose a strong password you don’t use anywhere else." />
      <div className="max-w-md space-y-5">
        <TextField label="Current password" type="password" autoComplete="current-password" value={current} onChange={(e) => setCurrent(e.target.value)} error={errors.current} />
        <div>
          <TextField label="New password" type="password" autoComplete="new-password" value={next} onChange={(e) => setNext(e.target.value)} error={errors.next} />
          {next &&
          <div className="mt-2">
              <div className="flex gap-1" aria-hidden>
                {[1, 2, 3, 4].map((i) =>
              <span key={i} className={`h-1 flex-1 rounded-full ${i <= s.score ? barColors[s.score] : 'bg-line'}`} />
              )}
              </div>
              <p className="mt-1 text-xs text-muted">Strength: {s.label}</p>
            </div>
          }
        </div>
        <TextField label="Confirm new password" type="password" autoComplete="new-password" value={confirm} onChange={(e) => setConfirm(e.target.value)} error={errors.confirm} />
      </div>
      <div className="mt-8 flex justify-end border-t border-line pt-6">
        <Button type="submit" loading={saving}>Update password</Button>
      </div>
    </form>);

}