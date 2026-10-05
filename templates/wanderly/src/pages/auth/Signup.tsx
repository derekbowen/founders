import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { AuthShell } from '../../components/auth/AuthShell';
import { TextField } from '../../components/ui/TextField';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';

type Field = 'firstName' | 'lastName' | 'email' | 'password';

export function Signup() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const redirect = params.get('redirect') ?? '/';
  const [values, setValues] = useState<Record<Field, string>>({ firstName: '', lastName: '', email: '', password: '' });
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<Field | 'terms', string>>>({});
  const [loading, setLoading] = useState(false);

  const set = (k: Field) => (e: React.ChangeEvent<HTMLInputElement>) => setValues((v) => ({ ...v, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!values.firstName.trim()) next.firstName = 'Required';
    if (!values.lastName.trim()) next.lastName = 'Required';
    if (!/^\S+@\S+\.\S+$/.test(values.email)) next.email = 'Enter a valid email address';
    if (values.password.length < 8) next.password = 'Use at least 8 characters';
    if (!agreed) next.terms = 'Please accept the terms to continue';
    setErrors(next);
    if (Object.keys(next).length) return;
    setLoading(true);
    window.setTimeout(() => {
      signUp({ firstName: values.firstName, lastName: values.lastName, email: values.email });
      navigate(redirect);
    }, 700);
  };

  return (
    <AuthShell title="Create your account" subtitle="Book unforgettable experiences — or host your own.">
      <form onSubmit={submit} noValidate className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField label="First name" autoComplete="given-name" value={values.firstName} onChange={set('firstName')} error={errors.firstName} />
          <TextField label="Last name" autoComplete="family-name" value={values.lastName} onChange={set('lastName')} error={errors.lastName} />
        </div>
        <TextField label="Email" type="email" autoComplete="email" value={values.email} onChange={set('email')} error={errors.email} />
        <TextField label="Password" type="password" autoComplete="new-password" value={values.password} onChange={set('password')} error={errors.password} hint="At least 8 characters" />
        <div>
          <label className="flex items-start gap-3 text-sm text-slate-700">
            <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-0.5 h-4 w-4 accent-[rgb(var(--color-primary-600))]" />
            <span>
              I agree to the <Link to="/terms" className="font-semibold underline">Terms of Service</Link> and <Link to="/privacy" className="font-semibold underline">Privacy Policy</Link>.
            </span>
          </label>
          {errors.terms && <p className="mt-1.5 text-xs font-medium text-red-600">{errors.terms}</p>}
        </div>
        <Button type="submit" size="lg" fullWidth loading={loading}>Sign up</Button>
      </form>
      <p className="mt-8 text-center text-sm text-slate-600">
        Already have an account? <Link to={`/login${params.toString() ? `?${params}` : ''}`} className="font-semibold text-primary-700 hover:text-primary-800">Log in</Link>
      </p>
    </AuthShell>);

}