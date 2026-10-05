import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { useAuth } from '../contexts/AuthContext';
import { brand } from '../data/brand';
import { images } from '../data/images';

type Mode = 'login' | 'signup';

export function Auth({ mode }: {mode: Mode;}) {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ first: '', last: '', email: '', password: '' });
  const [errors, setErrors] = useState<Partial<Record<keyof typeof form, string>>>({});
  const [loading, setLoading] = useState(false);
  const isSignup = mode === 'signup';

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (isSignup && !form.first.trim()) next.first = 'Enter your first name.';
    if (isSignup && !form.last.trim()) next.last = 'Enter your last name.';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email address.';
    if (form.password.length < (isSignup ? 8 : 1)) next.password = isSignup ? 'Use at least 8 characters.' : 'Enter your password.';
    setErrors(next);
    if (Object.keys(next).length) return;
    setLoading(true);
    setTimeout(() => {
      signIn();
      navigate(isSignup ? '/profile' : '/');
    }, 900);
  };

  const fieldError = (k: keyof typeof form) =>
  errors[k] ?
  <span id={`${k}-error`} className="mt-1.5 block text-sm text-red-700">
        {errors[k]}
      </span> :
  null;

  return (
    <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-2">
      <div className="flex items-center justify-center px-4 py-12 sm:px-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden">
            <Logo />
          </div>
          <h1 className="mt-6 text-3xl font-extrabold text-ink-900 lg:mt-0">{isSignup ? `Join ${brand.name}` : 'Welcome back'}</h1>
          <p className="mt-2 text-ink-500">{isSignup ? 'Book private sites or start hosting on your land.' : 'Log in to see your trips, messages and listings.'}</p>

          <button type="button" onClick={() => {signIn();navigate('/');}} className="btn-outline btn-lg mt-8 w-full">
            <span className="grid h-5 w-5 place-items-center rounded-full bg-sand-200 text-xs font-bold text-ink-900" aria-hidden="true">
              G
            </span>
            Continue with Google
          </button>
          <div className="my-6 flex items-center gap-3 text-xs font-medium uppercase tracking-wider text-ink-400">
            <span className="h-px flex-1 bg-sand-300" /> or <span className="h-px flex-1 bg-sand-300" />
          </div>

          <form onSubmit={submit} noValidate className="space-y-4">
            {isSignup &&
            <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="label">First name</span>
                  <input className={`input ${errors.first ? 'input-error' : ''}`} value={form.first} onChange={set('first')} autoComplete="given-name" aria-invalid={Boolean(errors.first)} aria-describedby="first-error" />
                  {fieldError('first')}
                </label>
                <label className="block">
                  <span className="label">Last name</span>
                  <input className={`input ${errors.last ? 'input-error' : ''}`} value={form.last} onChange={set('last')} autoComplete="family-name" aria-invalid={Boolean(errors.last)} aria-describedby="last-error" />
                  {fieldError('last')}
                </label>
              </div>
            }
            <label className="block">
              <span className="label">Email</span>
              <input type="email" className={`input ${errors.email ? 'input-error' : ''}`} value={form.email} onChange={set('email')} autoComplete="email" placeholder="you@example.com" aria-invalid={Boolean(errors.email)} aria-describedby="email-error" />
              {fieldError('email')}
            </label>
            <label className="block">
              <span className="flex items-center justify-between">
                <span className="label">Password</span>
                {!isSignup &&
                <a href={`mailto:${brand.supportEmail}`} className="mb-1.5 text-xs font-semibold text-primary-700 hover:underline">
                    Forgot password?
                  </a>
                }
              </span>
              <input type="password" className={`input ${errors.password ? 'input-error' : ''}`} value={form.password} onChange={set('password')} autoComplete={isSignup ? 'new-password' : 'current-password'} aria-invalid={Boolean(errors.password)} aria-describedby="password-error" />
              {fieldError('password')}
            </label>
            {isSignup &&
            <p className="text-xs text-ink-500">
                By signing up you agree to our{' '}
                <Link to="/terms" className="font-semibold text-primary-700 underline">
                  Terms
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="font-semibold text-primary-700 underline">
                  Privacy Policy
                </Link>
                .
              </p>
            }
            <button type="submit" className="btn-primary btn-lg w-full" disabled={loading}>
              {loading && <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" aria-hidden="true" />}
              {isSignup ? 'Create account' : 'Log in'}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-ink-600">
            {isSignup ? 'Already have an account?' : `New to ${brand.name}?`}{' '}
            <Link to={isSignup ? '/login' : '/signup'} className="font-semibold text-primary-700 hover:underline">
              {isSignup ? 'Log in' : 'Sign up'}
            </Link>
          </p>
        </div>
      </div>
      <div className="relative hidden lg:block">
        <img src={images.bellTent} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-primary-900/40" />
        <blockquote className="absolute bottom-10 left-10 right-10 rounded-2xl bg-white/95 p-6 shadow-lift">
          <p className="font-serif text-lg font-semibold text-ink-900">“Fireflies over the hayfield, goats at breakfast. Best night of our summer.”</p>
          <footer className="mt-3 text-sm text-ink-500">Rachel K. · stayed at Firefly Bell Tents</footer>
        </blockquote>
      </div>
    </div>);

}