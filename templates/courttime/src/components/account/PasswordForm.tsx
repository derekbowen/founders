import React, { useState } from 'react';
import { Input } from '../Input';
import { useToast } from '../ToastProvider';

interface PasswordErrors {
  current?: string;
  next?: string;
  confirm?: string;
}

export function PasswordForm() {
  const { addToast } = useToast();
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errors, setErrors] = useState<PasswordErrors>({});

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: PasswordErrors = {};
    if (!current) errs.current = 'Enter your current password.';
    if (next.length < 8) errs.next = 'Use at least 8 characters.';else
    if (next === current) errs.next = 'Choose a different password.';
    if (confirm !== next) errs.confirm = 'Passwords don’t match.';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setCurrent('');
    setNext('');
    setConfirm('');
    addToast({ type: 'success', message: 'Password updated' });
  };

  return (
    <form onSubmit={onSubmit} noValidate className="max-w-md space-y-5">
      <Input id="pw-current" type="password" label="Current password" autoComplete="current-password" value={current} onChange={(e) => setCurrent(e.target.value)} error={errors.current} />
      <Input id="pw-new" type="password" label="New password" autoComplete="new-password" helperText="At least 8 characters" value={next} onChange={(e) => setNext(e.target.value)} error={errors.next} />
      <Input id="pw-confirm" type="password" label="Confirm new password" autoComplete="new-password" value={confirm} onChange={(e) => setConfirm(e.target.value)} error={errors.confirm} />
      <button type="submit" className="btn btn-primary btn-md">Update password</button>
    </form>);

}