import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GraduationCapIcon, UsersIcon, PresentationIcon } from 'lucide-react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Checkbox } from '../components/Checkbox';
import { useToast } from '../components/ToastProvider';
import { AuthShell } from '../components/auth/AuthShell';
import { useAuth } from '../contexts/AuthContext';
import { brandButton } from '../utils/buttonStyles';
import type { CurrentUser } from '../types/marketplace';

const roles: {value: CurrentUser['role'];label: string;icon: typeof UsersIcon;}[] = [
{ value: 'learner', label: "I'm a student", icon: GraduationCapIcon },
{ value: 'parent', label: "I'm a parent", icon: UsersIcon },
{ value: 'tutor', label: 'I want to teach', icon: PresentationIcon }];


export function SignupPage() {
  const { signUp } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const state = useLocation().state as {from?: string;fromState?: unknown;} | null ?? {};
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', role: 'parent' as CurrentUser['role'], terms: false });
  const [errors, setErrors] = useState<Partial<Record<keyof typeof form, string>>>({});
  const [loading, setLoading] = useState(false);

  const set = <K extends keyof typeof form,>(key: K, value: (typeof form)[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!form.firstName.trim()) next.firstName = 'Required';
    if (!form.lastName.trim()) next.lastName = 'Required';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email address';
    if (form.password.length < 8) next.password = 'At least 8 characters';
    if (!form.terms) next.terms = 'Please accept the terms to continue';
    setErrors(next);
    if (Object.keys(next).length) return;
    setLoading(true);
    window.setTimeout(() => {
      signUp({ firstName: form.firstName.trim(), lastName: form.lastName.trim(), email: form.email.trim(), role: form.role });
      addToast({ type: 'success', message: `Welcome to the class, ${form.firstName}! 🎉` });
      const dest = state.from ?? (form.role === 'tutor' ? '/listings/new' : '/search');
      navigate(dest, { replace: true, state: state.fromState });
    }, 800);
  };

  return (
    <AuthShell title="Create your account" subtitle="Join free — book lessons or start teaching in minutes.">
      <form onSubmit={submit} noValidate className="space-y-5">
        <fieldset>
          <legend className="mb-2 text-sm font-medium text-ink-800">I'm joining as</legend>
          <div className="grid grid-cols-3 gap-2">
            {roles.map((r) => {
              const selected = form.role === r.value;
              return (
                <label
                  key={r.value}
                  className={`flex cursor-pointer flex-col items-center gap-2 rounded-2xl border p-3 text-center text-xs font-medium transition ${
                  selected ? 'border-primary-600 bg-primary-50 text-ink-900 ring-1 ring-primary-600' : 'border-ink-200 text-ink-700 hover:border-primary-300'}`
                  }>
                  
                  <input type="radio" name="role" className="sr-only" checked={selected} onChange={() => set('role', r.value)} />
                  <r.icon size={20} className="text-primary-700" aria-hidden="true" />
                  {r.label}
                </label>);

            })}
          </div>
        </fieldset>
        <div className="grid grid-cols-2 gap-4">
          <Input id="su-first" label="First name" autoComplete="given-name" value={form.firstName} onChange={(e) => set('firstName', e.target.value)} error={errors.firstName} />
          <Input id="su-last" label="Last name" autoComplete="family-name" value={form.lastName} onChange={(e) => set('lastName', e.target.value)} error={errors.lastName} />
        </div>
        <Input id="su-email" type="email" label="Email" autoComplete="email" value={form.email} onChange={(e) => set('email', e.target.value)} error={errors.email} />
        <Input id="su-password" type="password" label="Password" autoComplete="new-password" value={form.password} onChange={(e) => set('password', e.target.value)} error={errors.password} helperText="At least 8 characters" />
        <div>
          <Checkbox
            checked={form.terms}
            onChange={(e) => set('terms', e.target.checked)}
            error={!!errors.terms}
            label={
            <span className="text-sm text-ink-700">
                I agree to the <Link to="/terms" className="font-medium text-primary-700 underline">Terms</Link> and{' '}
                <Link to="/privacy" className="font-medium text-primary-700 underline">Privacy Policy</Link>
              </span>
            } />
          
          {errors.terms && <p className="mt-1 text-sm text-red-600">{errors.terms}</p>}
        </div>
        <Button type="submit" size="large" loading={loading} className={`w-full ${brandButton.primary}`}>
          Create account
        </Button>
        <p className="text-center text-sm text-ink-600">
          Already have an account?{' '}
          <Link to="/login" state={state} className="font-medium text-primary-700 hover:text-primary-800">Log in</Link>
        </p>
      </form>
    </AuthShell>);

}