import React, { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { brand } from '../data/brand';
import { useAuth } from '../contexts/AuthContext';
import { AuthLayout } from '../components/auth/AuthLayout';
import { Button } from '../components/ui/Button';
import { CheckboxField } from '../components/ui/CheckboxField';
import { TextField } from '../components/ui/TextField';

type Errors = Partial<Record<'firstName' | 'lastName' | 'email' | 'password' | 'terms', string>>;

export function Signup() {
  const { user, signup } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as {from?: string;} | null)?.from;
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [terms, setTerms] = useState(false);
  const [selling, setSelling] = useState(true);
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  if (user) return <Navigate to={from ?? '/'} replace />;

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Errors = {};
    if (!form.firstName.trim()) errs.firstName = 'Required';
    if (!form.lastName.trim()) errs.lastName = 'Required';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = 'Enter a valid email address';
    if (form.password.length < 8) errs.password = 'Use at least 8 characters';
    if (!terms) errs.terms = 'Please accept the terms to continue';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    signup(form.firstName.trim(), form.lastName.trim(), form.email.trim());
    toast.success(`Welcome to ${brand.name}, ${form.firstName.trim()}!`);
    navigate(from ?? (selling ? '/listings/new' : '/'), { replace: true });
  };

  return (
    <AuthLayout
      title="Join the studio"
      subtitle={
      <>
          Already have an account? <Link to="/login" state={location.state} className="font-medium text-primary-ink hover:underline">Log in</Link>
        </>
      }>
      
      <form onSubmit={submit} noValidate className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField label="First name" autoComplete="given-name" value={form.firstName} onChange={set('firstName')} error={errors.firstName} />
          <TextField label="Last name" autoComplete="family-name" value={form.lastName} onChange={set('lastName')} error={errors.lastName} />
        </div>
        <TextField label="Email" type="email" autoComplete="email" value={form.email} onChange={set('email')} error={errors.email} />
        <TextField label="Password" type="password" autoComplete="new-password" value={form.password} onChange={set('password')} error={errors.password} hint="At least 8 characters." />
        <div className="space-y-1 rounded-xl border border-line bg-surface p-4">
          <CheckboxField label="I want to open a shop and sell my work" description="You can always do this later." checked={selling} onChange={(e) => setSelling(e.target.checked)} />
          <CheckboxField
            label={
            <>
                I agree to the <Link to="/terms" className="underline">Terms of Service</Link> and <Link to="/privacy" className="underline">Privacy Policy</Link>
              </>
            }
            checked={terms}
            onChange={(e) => setTerms(e.target.checked)} />
          
          {errors.terms && <p className="pl-7 text-xs font-medium text-danger">{errors.terms}</p>}
        </div>
        <Button type="submit" size="lg" className="w-full" loading={loading}>
          Create account
        </Button>
      </form>
    </AuthLayout>);

}