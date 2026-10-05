import React, { useState } from 'react';
import { Input } from '../../components/Input';
import { SettingsCard } from '../../components/account/SettingsCard';
import { BrandButton } from '../../components/ui/BrandButton';

function strength(pw: string): {score: number;label: string;} {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return { score, label: ['Too short', 'Weak', 'Fair', 'Good', 'Strong'][score] };
}

export function AccountPassword() {
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const s = strength(next);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!current) errs.current = 'Enter your current password.';
    if (next.length < 8) errs.next = 'Use at least 8 characters.';
    if (confirm !== next) errs.confirm = 'Passwords don’t match.';
    setErrors(errs);
    setSaved(false);
    if (Object.keys(errs).length) return;
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setSaved(true);
      setCurrent('');
      setNext('');
      setConfirm('');
    }, 700);
  }

  return (
    <SettingsCard
      title="Change password"
      description="You’ll stay signed in on this device. Other sessions will be signed out."
      onSubmit={onSubmit}
      saved={saved}
      footer={<BrandButton type="submit" loading={loading}>Update password</BrandButton>}>
      
      <Input id="pw-current" label="Current password" type="password" autoComplete="current-password" value={current} error={errors.current} onChange={(e) => setCurrent(e.target.value)} />
      <div>
        <Input id="pw-new" label="New password" type="password" autoComplete="new-password" value={next} error={errors.next} onChange={(e) => setNext(e.target.value)} />
        {next &&
        <div className="mt-2">
            <div className="flex gap-1" aria-hidden="true">
              {[1, 2, 3, 4].map((i) =>
            <span key={i} className={`h-1 flex-1 rounded-full ${i <= s.score ? s.score >= 3 ? 'bg-brand-600' : 'bg-amber-500' : 'bg-line'}`} />
            )}
            </div>
            <p className="mt-1 text-xs text-ink-muted">Strength: {s.label}</p>
          </div>
        }
      </div>
      <Input id="pw-confirm" label="Confirm new password" type="password" autoComplete="new-password" value={confirm} error={errors.confirm} onChange={(e) => setConfirm(e.target.value)} />
    </SettingsCard>);

}