import React, { useState } from 'react';
import { CheckIcon, XIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../ui/Button';
import { TextField } from '../ui/TextField';
import { cn } from '../../utils/cn';

export function PasswordSettings() {
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const rules = [
  { label: 'At least 8 characters', ok: next.length >= 8 },
  { label: 'Contains a number', ok: /\d/.test(next) },
  { label: 'Contains a letter', ok: /[a-z]/i.test(next) }];


  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!current) errs.current = 'Enter your current password.';
    if (!rules.every((r) => r.ok)) errs.next = 'Your new password doesn’t meet the requirements.';
    if (next !== confirm) errs.confirm = 'Passwords don’t match.';
    if (current && current === next) errs.next = 'Choose a password different from your current one.';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSaving(true);
    window.setTimeout(() => {
      setSaving(false);
      setCurrent('');
      setNext('');
      setConfirm('');
      toast.success('Password updated');
    }, 700);
  };

  return (
    <form onSubmit={submit} className="max-w-md space-y-5" noValidate>
      <TextField id="pw-current" label="Current password" type="password" autoComplete="current-password" value={current} onChange={(e) => setCurrent(e.target.value)} error={errors.current} />
      <div>
        <TextField id="pw-new" label="New password" type="password" autoComplete="new-password" value={next} onChange={(e) => setNext(e.target.value)} error={errors.next} />
        <ul className="mt-3 space-y-1.5">
          {rules.map((r) =>
          <li key={r.label} className={cn('flex items-center gap-2 text-sm font-semibold', r.ok ? 'text-accent-700' : 'text-stone-500')}>
              {r.ok ? <CheckIcon className="h-4 w-4" aria-hidden="true" /> : <XIcon className="h-4 w-4" aria-hidden="true" />}
              {r.label}
            </li>
          )}
        </ul>
      </div>
      <TextField id="pw-confirm" label="Confirm new password" type="password" autoComplete="new-password" value={confirm} onChange={(e) => setConfirm(e.target.value)} error={errors.confirm} />
      <Button type="submit" loading={saving}>
        Update password
      </Button>
    </form>);

}