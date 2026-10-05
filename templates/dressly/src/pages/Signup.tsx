import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../components/Input';
import { Checkbox } from '../components/Checkbox';
import { AuthLayout } from '../components/auth/AuthLayout';
import { useAuth } from '../contexts/AuthContext';
import { brand } from '../data/brand';
import { btn } from '../utils/styles';

export function Signup() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ first: '', last: '', email: '', password: '' });
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!form.first.trim()) errs.first = 'Required';
    if (!form.last.trim()) errs.last = 'Required';
    if (!form.email.includes('@')) errs.email = 'Enter a valid email';
    if (form.password.length < 8) errs.password = 'Use at least 8 characters';
    if (!agree) errs.agree = 'Please accept the terms';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    login();
    navigate('/s');
  };

  return (
    <AuthLayout title="Join the closet" subtitle="Rent designer dresses for a fraction of retail — or earn from your own.">
      <form onSubmit={submit} className="space-y-5" noValidate>
        <div className="grid grid-cols-2 gap-4">
          <Input id="su-first" label="First name" autoComplete="given-name" value={form.first} error={errors.first} onChange={(e) => setForm({ ...form, first: e.target.value })} />
          <Input id="su-last" label="Last name" autoComplete="family-name" value={form.last} error={errors.last} onChange={(e) => setForm({ ...form, last: e.target.value })} />
        </div>
        <Input id="su-email" label="Email" type="email" autoComplete="email" value={form.email} error={errors.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <Input id="su-password" label="Password" type="password" autoComplete="new-password" value={form.password} error={errors.password} helperText="At least 8 characters" onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <div>
          <Checkbox
            checked={agree}
            error={!!errors.agree}
            onChange={(e) => setAgree(e.target.checked)}
            label={
            <span className="text-sm text-muted">
                I agree to the <Link to="/terms" className="text-ink underline">Terms</Link> and <Link to="/privacy" className="text-ink underline">Privacy Policy</Link>
              </span>
            } />
          
          {errors.agree && <p className="mt-1 text-xs text-[#9b2c2c]">{errors.agree}</p>}
        </div>
        <button type="submit" className={btn('primary', 'lg', 'w-full')}>Create account</button>
      </form>
      <p className="mt-8 text-center text-sm text-muted">
        Already a member of {brand.name}? <Link to="/login" className="font-medium text-ink underline underline-offset-4">Log in</Link>
      </p>
    </AuthLayout>);

}