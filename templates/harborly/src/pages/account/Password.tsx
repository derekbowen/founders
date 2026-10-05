import React, { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../../components/ui/Button';
import { Field } from '../../components/ui/Field';
import { cn, inputClass } from '../../utils/ui';

function strength(p: string): {score: number;label: string;} {
  let s = 0;
  if (p.length >= 8) s++;
  if (/[A-Z]/.test(p) && /[a-z]/.test(p)) s++;
  if (/\d/.test(p)) s++;
  if (/[^A-Za-z0-9]/.test(p)) s++;
  return { score: s, label: ['Too short', 'Weak', 'Fair', 'Good', 'Strong'][s] };
}

export function Password() {
  const [form, setForm] = useState({ current: '', next: '', confirm: '' });
  const [errors, setErrors] = useState<Partial<Record<keyof typeof form, string>>>({});
  const [saving, setSaving] = useState(false);
  const st = strength(form.next);

  const set = (k: keyof typeof form, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: typeof errors = {};
    if (!form.current) errs.current = 'Enter your current password.';
    if (form.next.length < 8) errs.next = 'Use at least 8 characters.';else
    if (form.next === form.current) errs.next = 'Choose a different password.';
    if (form.confirm !== form.next) errs.confirm = 'Passwords don’t match.';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSaving(true);
    window.setTimeout(() => {
      setSaving(false);
      setForm({ current: '', next: '', confirm: '' });
      toast.success('Password updated');
    }, 600);
  };

  return (
    <form onSubmit={submit} noValidate className="space-y-6">
      <div>
        <h2 className="font-heading text-2xl text-navy">Password</h2>
        <p className="mt-1 text-sm text-muted">Use a unique password you don’t use elsewhere.</p>
      </div>
      <Field label="Current password" htmlFor="p-cur" error={errors.current}>
        <input id="p-cur" type="password" autoComplete="current-password" value={form.current} onChange={(e) => set('current', e.target.value)} className={cn(inputClass, errors.current && 'border-danger')} />
      </Field>
      <Field label="New password" htmlFor="p-new" error={errors.next}>
        <input id="p-new" type="password" autoComplete="new-password" value={form.next} onChange={(e) => set('next', e.target.value)} className={cn(inputClass, errors.next && 'border-danger')} />
      </Field>
      {form.next &&
      <div aria-live="polite">
          <div className="grid grid-cols-4 gap-1.5">
            {[1, 2, 3, 4].map((i) =>
          <span key={i} className={cn('h-1.5 rounded-full', i <= st.score ? st.score >= 3 ? 'bg-success' : 'bg-warning' : 'bg-line')} />
          )}
          </div>
          <p className="mt-1.5 text-xs text-muted">Strength: {st.label}</p>
        </div>
      }
      <Field label="Confirm new password" htmlFor="p-conf" error={errors.confirm}>
        <input id="p-conf" type="password" autoComplete="new-password" value={form.confirm} onChange={(e) => set('confirm', e.target.value)} className={cn(inputClass, errors.confirm && 'border-danger')} />
      </Field>
      <div className="flex justify-end border-t border-line pt-6">
        <Button type="submit" loading={saving}>
          Update password
        </Button>
      </div>
    </form>);

}