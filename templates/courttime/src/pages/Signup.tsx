import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Input } from '../components/Input';
import { Checkbox } from '../components/Checkbox';
import { LoadingSpinner } from '../components/Button';
import { useToast } from '../components/ToastProvider';
import { AuthShell } from '../components/auth/AuthShell';
import { useAuth } from '../contexts/AuthContext';
import { brand } from '../data/brand';

interface SignupErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  terms?: string;
}

export function Signup() {
  const { login } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const redirect = params.get('redirect') ?? '/';
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState<SignupErrors>({});
  const [loading, setLoading] = useState(false);

  const set = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: SignupErrors = {};
    if (!form.firstName.trim()) next.firstName = 'Required';
    if (!form.lastName.trim()) next.lastName = 'Required';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email address.';
    if (form.password.length < 8) next.password = 'Use at least 8 characters.';
    if (!terms) next.terms = 'Please accept the terms to continue.';
    setErrors(next);
    if (Object.keys(next).length) return;
    setLoading(true);
    window.setTimeout(() => {
      login();
      addToast({ type: 'success', message: `Welcome to ${brand.name}!` });
      navigate(redirect);
    }, 800);
  };

  return (
    <AuthShell
      title="Sign up"
      subtitle="Book courts, join open play and list your own court — all from one account."
      footer={<>Already have an account? <Link to={`/login${redirect !== '/' ? `?redirect=${redirect}` : ''}`} className="font-semibold text-brand hover:underline">Log in</Link></>}>
      
      <form onSubmit={onSubmit} noValidate className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input id="su-first" label="First name" autoComplete="given-name" value={form.firstName} onChange={set('firstName')} error={errors.firstName} />
          <Input id="su-last" label="Last name" autoComplete="family-name" value={form.lastName} onChange={set('lastName')} error={errors.lastName} />
        </div>
        <Input id="su-email" type="email" label="Email" autoComplete="email" value={form.email} onChange={set('email')} error={errors.email} />
        <Input id="su-password" type="password" label="Password" autoComplete="new-password" helperText="At least 8 characters" value={form.password} onChange={set('password')} error={errors.password} />
        <div>
          <Checkbox
            checked={terms}
            onChange={(e) => setTerms(e.target.checked)}
            error={!!errors.terms}
            label={<span className="text-sm">I agree to the <Link to="/terms" className="font-semibold text-brand hover:underline">Terms</Link> and <Link to="/privacy" className="font-semibold text-brand hover:underline">Privacy policy</Link></span>} />
          
          {errors.terms && <p className="mt-1 text-xs text-red-600">{errors.terms}</p>}
        </div>
        <button type="submit" disabled={loading} className="btn btn-primary btn-lg w-full">
          {loading ? <><LoadingSpinner className="h-4 w-4" /> Creating account…</> : 'Create account'}
        </button>
      </form>
    </AuthShell>);

}