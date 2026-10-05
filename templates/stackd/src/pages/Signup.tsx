import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../components/Input';
import { Checkbox } from '../components/Checkbox';
import { AuthShell } from '../components/auth/AuthShell';
import { useStore } from '../contexts/StoreContext';

interface SignupErrors {
  first?: string;
  last?: string;
  email?: string;
  password?: string;
  terms?: string;
}

export function Signup() {
  const { signUp } = useStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({ first: '', last: '', email: '', password: '', terms: false });
  const [errors, setErrors] = useState<SignupErrors>({});
  const [loading, setLoading] = useState(false);

  const set = (patch: Partial<typeof form>) => setForm((f) => ({ ...f, ...patch }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: SignupErrors = {};
    if (!form.first.trim()) next.first = 'Required';
    if (!form.last.trim()) next.last = 'Required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email address.';
    if (form.password.length < 8) next.password = 'Use at least 8 characters.';
    if (!form.terms) next.terms = 'Please accept the terms to continue.';
    setErrors(next);
    if (Object.keys(next).length) return;
    setLoading(true);
    window.setTimeout(() => {
      signUp(`${form.first} ${form.last}`, form.email);
      navigate('/s');
    }, 700);
  };

  return (
    <AuthShell title="Create your account" subtitle="Buy and download instantly — or start selling your own files.">
      <form onSubmit={submit} noValidate className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Input id="first" label="First name" autoComplete="given-name" value={form.first} error={errors.first} onChange={(e) => set({ first: e.target.value })} />
          <Input id="last" label="Last name" autoComplete="family-name" value={form.last} error={errors.last} onChange={(e) => set({ last: e.target.value })} />
        </div>
        <Input id="signup-email" type="email" label="Email" autoComplete="email" value={form.email} error={errors.email} onChange={(e) => set({ email: e.target.value })} />
        <Input id="signup-password" type="password" label="Password" autoComplete="new-password" helperText="At least 8 characters." value={form.password} error={errors.password} onChange={(e) => set({ password: e.target.value })} />
        <div>
          <Checkbox
            checked={form.terms}
            error={!!errors.terms}
            onChange={(e) => set({ terms: e.target.checked })}
            label={
            <span className="text-sm">
                I agree to the{' '}
                <Link to="/terms" className="link">
                  Terms
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="link">
                  Privacy policy
                </Link>
              </span>
            } />
          
          {errors.terms && <p className="mt-1 text-xs text-danger">{errors.terms}</p>}
        </div>
        <button type="submit" disabled={loading} className="btn btn-accent btn-lg w-full">
          {loading ? 'Creating account…' : 'Sign up'}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-muted">
        Already have an account?{' '}
        <Link to="/login" className="link">
          Log in
        </Link>
      </p>
    </AuthShell>);

}