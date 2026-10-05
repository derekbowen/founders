import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MailIcon } from 'lucide-react';
import { Input } from '../components/Input';
import { Checkbox } from '../components/Checkbox';
import { useAuth } from '../contexts/AuthContext';
import { brand } from '../data/brand';
import { heroImage } from '../data/landing';
import { buttonClass } from '../utils/styles';

type Mode = 'login' | 'signup';

export function Auth({ mode }: {mode: Mode;}) {
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as {from?: string;} | null)?.from ?? '/';

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: mode === 'login' ? 'jordan.lee@example.com' : '',
    password: mode === 'login' ? 'parkspot' : '',
    terms: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email address';
    if (form.password.length < 8 && mode === 'signup') next.password = 'Use at least 8 characters';
    if (!form.password) next.password = 'Enter your password';
    if (mode === 'signup') {
      if (!form.firstName.trim()) next.firstName = 'Required';
      if (!form.lastName.trim()) next.lastName = 'Required';
      if (!form.terms) next.terms = 'Please accept the terms to continue';
    }
    setErrors(next);
    if (Object.keys(next).length) return;
    setLoading(true);
    window.setTimeout(() => {
      if (mode === 'login') login(form.email);else
      signup(`${form.firstName.trim()} ${form.lastName.trim()}`, form.email);
      navigate(from, { replace: true });
    }, 700);
  };

  const set = (key: keyof typeof form, value: string | boolean) => setForm((f) => ({ ...f, [key]: value }));

  return (
    <div className="grid w-full bg-canvas lg:min-h-[calc(100vh-4rem)] lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-navy lg:block">
        <img src={heroImage} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="relative flex h-full flex-col justify-end p-12 text-white">
          <p className="text-4xl font-bold leading-tight tracking-tight">
            Your spot is <span className="bg-accent px-1 text-ink">waiting</span>.
          </p>
          <p className="mt-3 max-w-md text-white/80">{brand.description}</p>
        </div>
      </div>

      <div className="flex items-center justify-center px-4 py-12 sm:px-6">
        <div className="w-full max-w-md">
          <div className="grid grid-cols-2 rounded-xl bg-ink/5 p-1 text-sm font-semibold" role="tablist">
            <Link
              to="/signup"
              state={location.state}
              role="tab"
              aria-selected={mode === 'signup'}
              className={`rounded-lg py-2 text-center ${mode === 'signup' ? 'bg-surface shadow-sm' : 'text-muted hover:text-ink'}`}>
              
              Sign up
            </Link>
            <Link
              to="/login"
              state={location.state}
              role="tab"
              aria-selected={mode === 'login'}
              className={`rounded-lg py-2 text-center ${mode === 'login' ? 'bg-surface shadow-sm' : 'text-muted hover:text-ink'}`}>
              
              Log in
            </Link>
          </div>

          <h1 className="mt-8 text-3xl font-bold tracking-tight">{mode === 'login' ? 'Welcome back' : `Join ${brand.name}`}</h1>
          <p className="mt-1 text-muted">{mode === 'login' ? 'Log in to manage your reservations and spaces.' : 'Book spots in seconds or start earning from your space.'}</p>

          <button type="button" onClick={() => {login('');navigate(from, { replace: true });}} className={buttonClass('secondary', 'lg', 'mt-6 w-full')}>
            <span className="grid h-5 w-5 place-items-center rounded-full bg-navy text-[10px] font-bold text-white">G</span>
            Continue with Google
          </button>
          <div className="my-6 flex items-center gap-3 text-xs text-muted">
            <span className="h-px flex-1 bg-line" /> or with email <span className="h-px flex-1 bg-line" />
          </div>

          <form onSubmit={submit} noValidate className="space-y-4">
            {mode === 'signup' &&
            <div className="grid grid-cols-2 gap-3">
                <Input id="first" label="First name" autoComplete="given-name" value={form.firstName} onChange={(e) => set('firstName', e.target.value)} error={errors.firstName} />
                <Input id="last" label="Last name" autoComplete="family-name" value={form.lastName} onChange={(e) => set('lastName', e.target.value)} error={errors.lastName} />
              </div>
            }
            <Input
              id="email"
              label="Email"
              type="email"
              autoComplete="email"
              startAdornment={<MailIcon size={16} />}
              value={form.email}
              onChange={(e) => set('email', e.target.value)}
              error={errors.email} />
            
            <Input
              id="password"
              label="Password"
              type="password"
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              value={form.password}
              onChange={(e) => set('password', e.target.value)}
              error={errors.password}
              helperText={mode === 'signup' ? 'At least 8 characters.' : undefined} />
            
            {mode === 'login' &&
            <div className="text-right text-sm">
                {resetSent ?
              <span role="status" className="font-medium text-success">Reset link sent to {form.email || 'your email'}</span> :

              <button type="button" onClick={() => setResetSent(true)} className="font-medium underline hover:text-navy">
                    Forgot password?
                  </button>
              }
              </div>
            }
            {mode === 'signup' &&
            <div>
                <Checkbox
                checked={form.terms}
                onChange={(e) => set('terms', e.target.checked)}
                error={!!errors.terms}
                label={
                <span className="text-sm">
                      I agree to the{' '}
                      <Link to="/terms" className="underline">Terms</Link> and{' '}
                      <Link to="/privacy" className="underline">Privacy policy</Link>
                    </span>
                } />
              
                {errors.terms && <p className="mt-1 text-sm font-medium text-danger">{errors.terms}</p>}
              </div>
            }
            <button type="submit" disabled={loading} className={buttonClass('primary', 'lg', 'w-full')}>
              {loading ?
              <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" aria-hidden /> Please wait…
                </> :
              mode === 'login' ?
              'Log in' :

              'Create account'
              }
            </button>
          </form>
          {mode === 'login' && <p className="mt-4 text-center text-xs text-muted">Demo account pre-filled — just press Log in.</p>}
        </div>
      </div>
    </div>);

}