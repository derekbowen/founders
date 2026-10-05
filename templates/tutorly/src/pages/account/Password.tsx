import React, { useState } from 'react';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { useToast } from '../../components/ToastProvider';
import { SettingsCard } from '../../components/account/SettingsCard';
import { brandButton } from '../../utils/buttonStyles';

function strengthOf(pw: string): {score: number;label: string;} {
  let score = 0;
  if (pw.length >= 8) score += 1;
  if (pw.length >= 12) score += 1;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score += 1;
  if (/\d/.test(pw) && /[^A-Za-z0-9]/.test(pw)) score += 1;
  return { score, label: ['Too short', 'Weak', 'Fair', 'Good', 'Strong'][score] };
}

const barColors = ['bg-red-500', 'bg-red-500', 'bg-accent-500', 'bg-primary-500', 'bg-green-600'];

export function PasswordPage() {
  const { addToast } = useToast();
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errors, setErrors] = useState<{current?: string;next?: string;confirm?: string;}>({});
  const [saving, setSaving] = useState(false);
  const strength = strengthOf(next);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: typeof errors = {};
    if (!current) errs.current = 'Enter your current password';
    if (next.length < 8) errs.next = 'Use at least 8 characters';
    if (next && next === current) errs.next = 'New password must be different';
    if (confirm !== next) errs.confirm = "Passwords don't match";
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
    <form onSubmit={submit} noValidate>
      <SettingsCard
        title="Change password"
        description="We'll sign you out of other devices after changing your password."
        footer={<Button type="submit" className={brandButton.primary} loading={saving}>Update password</Button>}>
        
        <div className="max-w-md space-y-5">
          <Input id="pw-current" type="password" label="Current password" autoComplete="current-password" value={current} onChange={(e) => setCurrent(e.target.value)} error={errors.current} />
          <div>
            <Input id="pw-new" type="password" label="New password" autoComplete="new-password" value={next} onChange={(e) => setNext(e.target.value)} error={errors.next} />
            {next &&
            <div className="mt-2" aria-live="polite">
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((i) =>
                <span key={i} className={`h-1.5 flex-1 rounded-full ${i <= strength.score ? barColors[strength.score] : 'bg-ink-200'}`} />
                )}
                </div>
                <p className="mt-1 text-xs text-ink-600">Strength: {strength.label}</p>
              </div>
            }
          </div>
          <Input id="pw-confirm" type="password" label="Confirm new password" autoComplete="new-password" value={confirm} onChange={(e) => setConfirm(e.target.value)} error={errors.confirm} />
        </div>
      </SettingsCard>
    </form>);

}