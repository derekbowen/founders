import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '../components/ui/Button';
import { Field } from '../components/ui/Field';
import { useMarketplace } from '../contexts/MarketplaceContext';
import { brand } from '../data/brand';
import { media } from '../data/media';
import { cn, inputClass } from '../utils/ui';

type Errors = Partial<Record<'firstName' | 'lastName' | 'email' | 'password' | 'terms', string>>;

export function Auth({ mode }: {mode: 'login' | 'signup';}) {
  const { login } = useMarketplace();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const redirect = params.get('redirect') || '/inbox/trips';
  const isSignup = mode === 'signup';

  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', terms: false });
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  const set = (k: keyof typeof form, v: string | boolean) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const finish = () => {
    login();
    toast.success(isSignup ? `Welcome aboard ${brand.name}!` : 'Welcome back!');
    navigate(redirect, { replace: true });
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Errors = {};
    if (isSignup && !form.firstName.trim()) errs.firstName = 'Required.';
    if (isSignup && !form.lastName.trim()) errs.lastName = 'Required.';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = 'Enter a valid email address.';
    if (form.password.length < 8) errs.password = 'Password must be at least 8 characters.';
    if (isSignup && !form.terms) errs.terms = 'Please accept the terms to continue.';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setLoading(true);
    window.setTimeout(finish, 700);
  };

  const qs = params.toString() ? `?${params.toString()}` : '';

  return (
    <div className="grid min-h-[calc(100vh-72px)] w-full bg-white lg:grid-cols-2">
      <div className="flex items-center justify-center px-4 py-12 sm:px-6">
        <div className="w-full max-w-md">
          <h1 className="font-heading text-4xl text-navy">{isSignup ? 'Create your account' : 'Welcome back'}</h1>
          <p className="mt-2 text-muted">{isSignup ? 'Book boats, message owners and list your own vessel.' : `Log in to manage your trips and listings on ${brand.name}.`}</p>

          <form onSubmit={submit} noValidate className="mt-8 space-y-5">
            {isSignup &&
            <div className="grid grid-cols-2 gap-4">
                <Field label="First name" htmlFor="a-first" error={errors.firstName}>
                  <input id="a-first" autoComplete="given-name" value={form.firstName} onChange={(e) => set('firstName', e.target.value)} className={cn(inputClass, errors.firstName && 'border-danger')} />
                </Field>
                <Field label="Last name" htmlFor="a-last" error={errors.lastName}>
                  <input id="a-last" autoComplete="family-name" value={form.lastName} onChange={(e) => set('lastName', e.target.value)} className={cn(inputClass, errors.lastName && 'border-danger')} />
                </Field>
              </div>
            }
            <Field label="Email" htmlFor="a-email" error={errors.email}>
              <input id="a-email" type="email" autoComplete="email" value={form.email} onChange={(e) => set('email', e.target.value)} className={cn(inputClass, errors.email && 'border-danger')} />
            </Field>
            <Field label="Password" htmlFor="a-pass" error={errors.password} hint={isSignup ? 'At least 8 characters.' : undefined}>
              <input id="a-pass" type="password" autoComplete={isSignup ? 'new-password' : 'current-password'} value={form.password} onChange={(e) => set('password', e.target.value)} className={cn(inputClass, errors.password && 'border-danger')} />
            </Field>
            {isSignup ?
            <div>
                <label className="flex cursor-pointer items-start gap-3 text-sm text-ink">
                  <input type="checkbox" checked={form.terms} onChange={(e) => set('terms', e.target.checked)} className="mt-0.5 h-4 w-4 accent-navy" />
                  <span>
                    I accept the{' '}
                    <Link to="/terms" className="font-semibold underline underline-offset-2">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="font-semibold underline underline-offset-2">
                      Privacy Policy
                    </Link>
                    .
                  </span>
                </label>
                {errors.terms && <p className="mt-1.5 text-xs font-medium text-danger">{errors.terms}</p>}
              </div> :

            <div className="text-right">
                <button type="button" onClick={() => toast('Password reset link sent — check your email.')} className="text-sm font-semibold text-navy underline-offset-4 hover:underline">
                  Forgot password?
                </button>
              </div>
            }
            <Button type="submit" size="lg" className="w-full" loading={loading}>
              {isSignup ? 'Sign up' : 'Log in'}
            </Button>
          </form>

          <div className="my-6 flex items-center gap-4 text-xs text-muted">
            <span className="h-px flex-1 bg-line" /> or <span className="h-px flex-1 bg-line" />
          </div>
          <Button variant="outline" size="lg" className="w-full" onClick={finish}>
            Continue as demo user
          </Button>

          <p className="mt-8 text-center text-sm text-muted">
            {isSignup ? 'Already have an account? ' : 'New here? '}
            <Link to={`${isSignup ? '/login' : '/signup'}${qs}`} className="font-semibold text-navy underline-offset-4 hover:underline">
              {isSignup ? 'Log in' : 'Create an account'}
            </Link>
          </p>
        </div>
      </div>
      <div className="relative hidden lg:block">
        <img src={isSignup ? media.catamaranBay : media.sailboatOcean} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-x-8 bottom-8 rounded-2xl bg-navy-deep/80 p-6 text-white backdrop-blur">
          <p className="font-heading text-2xl">“The easiest boat day we’ve ever planned.”</p>
          <p className="mt-2 text-sm text-white/75">Elena V. · Lagoon 42 catamaran, Key West</p>
        </div>
      </div>
    </div>);

}