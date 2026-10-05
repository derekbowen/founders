import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useToast } from '../../components/ToastProvider';
import { ui, cx } from '../../utils/styles';

function strength(pw: string): {score: number;label: string;} {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s++;
  if (/\d/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return { score: s, label: ['Too short', 'Weak', 'Fair', 'Good', 'Strong'][s] };
}

export function PasswordSettings() {
  const { addToast } = useToast();
  const [form, setForm] = useState({ current: '', next: '', confirm: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const st = strength(form.next);

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!form.current) errs.current = 'Enter your current password';
    if (form.next.length < 8) errs.next = 'At least 8 characters';
    if (form.next !== form.confirm) errs.confirm = 'Passwords don’t match';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setForm({ current: '', next: '', confirm: '' });
      addToast({ type: 'success', message: 'Password updated' });
    }, 600);
  };

  return (
    <form onSubmit={save} noValidate className="max-w-xl space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-stone-900">Password</h2>
        <p className="mt-1 text-sm text-stone-600">Use a unique password you don’t use anywhere else.</p>
      </div>
      <Input id="p-cur" type="password" label="Current password" autoComplete="current-password" value={form.current} onChange={(e) => setForm({ ...form, current: e.target.value })} error={errors.current} />
      <div>
        <Input id="p-new" type="password" label="New password" autoComplete="new-password" value={form.next} onChange={(e) => setForm({ ...form, next: e.target.value })} error={errors.next} />
        {form.next &&
        <div className="mt-2">
            <div className="grid grid-cols-4 gap-1" aria-hidden="true">
              {[1, 2, 3, 4].map((i) =>
            <span key={i} className={cx('h-1.5 rounded-full', i <= st.score ? st.score >= 3 ? 'bg-brand-600' : 'bg-sand-500' : 'bg-stone-200')} />
            )}
            </div>
            <p className="mt-1 text-xs text-stone-600">Strength: {st.label}</p>
          </div>
        }
      </div>
      <Input id="p-conf" type="password" label="Confirm new password" autoComplete="new-password" value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })} error={errors.confirm} />
      <Button type="submit" loading={saving} className={ui.btnBrand}>Update password</Button>
    </form>);

}