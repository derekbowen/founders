import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Input } from '../components/Input';
import { Checkbox } from '../components/Checkbox';
import { AuthShell } from '../components/auth/AuthShell';
import { BrandButton } from '../components/ui/BrandButton';
import { useAuth } from '../contexts/AuthContext';

export function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as {from?: string;} | null)?.from ?? '/';
  const [values, setValues] = useState({ first: '', last: '', email: '', password: '' });
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  function set(key: keyof typeof values, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!values.first.trim()) next.first = 'Required.';
    if (!values.last.trim()) next.last = 'Required.';
    if (!/^\S+@\S+\.\S+$/.test(values.email)) next.email = 'Enter a valid email address.';
    if (values.password.length < 8) next.password = 'Use at least 8 characters.';
    if (!terms) next.terms = 'Please accept the terms to continue.';
    setErrors(next);
    if (Object.keys(next).length) return;
    setLoading(true);
    window.setTimeout(() => {
      signup(`${values.first.trim()} ${values.last.trim()}`, values.email);
      navigate(from, { replace: true });
    }, 700);
  }

  return (
    <AuthShell
      title="Create your account"
      subtitle={
      <>
          Already have one? <Link to="/login" state={{ from }} className="link">Log in</Link>
        </>
      }>
      
      <form onSubmit={onSubmit} noValidate className="space-y-5">
        <div className="grid grid-cols-2 gap-3">
          <Input id="su-first" label="First name" autoComplete="given-name" value={values.first} error={errors.first} onChange={(e) => set('first', e.target.value)} />
          <Input id="su-last" label="Last name" autoComplete="family-name" value={values.last} error={errors.last} onChange={(e) => set('last', e.target.value)} />
        </div>
        <Input id="su-email" label="Work email" type="email" autoComplete="email" value={values.email} error={errors.email} onChange={(e) => set('email', e.target.value)} />
        <Input id="su-password" label="Password" type="password" autoComplete="new-password" helperText="At least 8 characters" value={values.password} error={errors.password} onChange={(e) => set('password', e.target.value)} />
        <div>
          <Checkbox
            checked={terms}
            onChange={(e) => setTerms(e.target.checked)}
            error={!!errors.terms}
            label={
            <span className="text-sm">
                I agree to the <Link to="/terms" className="link">Terms</Link> and <Link to="/privacy" className="link">Privacy policy</Link>
              </span>
            } />
          
          {errors.terms && <p className="mt-1 text-xs text-red-700">{errors.terms}</p>}
        </div>
        <BrandButton type="submit" size="large" fullWidth loading={loading}>
          Sign up
        </BrandButton>
      </form>
    </AuthShell>);

}