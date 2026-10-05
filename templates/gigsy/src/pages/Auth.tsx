import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { CheckIcon, EyeIcon, EyeOffIcon } from 'lucide-react';
import { Logo } from '../components/layout/Logo';
import { Avatar } from '../components/Avatar';
import { Button } from '../components/ui/Button';
import { TextField } from '../components/ui/TextField';
import { useToast } from '../components/ToastProvider';
import { useAuth } from '../contexts/AuthContext';
import { brand } from '../data/brand';
import { avatars } from '../data/images';
import { freelancerBenefits } from '../data/marketing';

interface AuthProps {
  mode: 'login' | 'signup';
}

const intents = [
{ value: 'hire', label: 'Hire freelancers' },
{ value: 'work', label: 'Offer services' },
{ value: 'both', label: 'Both' }];


export function Auth({ mode }: AuthProps) {
  const isSignup = mode === 'signup';
  const { login, signup } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const redirect = params.get('redirect') || (isSignup ? '/s' : '/inbox');

  const [name, setName] = useState('');
  const [email, setEmail] = useState(isSignup ? '' : 'jordan@studiolee.co');
  const [password, setPassword] = useState(isSignup ? '' : 'gigsy-demo-2026');
  const [showPassword, setShowPassword] = useState(false);
  const [intent, setIntent] = useState('hire');
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (isSignup && name.trim().length < 2) next.name = 'Enter your full name.';
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = 'Enter a valid email address.';
    if (password.length < 8) next.password = 'Password must be at least 8 characters.';
    if (isSignup && !agree) next.agree = 'Please accept the terms to continue.';
    setErrors(next);
    if (Object.keys(next).length) return;
    setLoading(true);
    window.setTimeout(() => {
      if (isSignup) signup(name);else
      login();
      addToast({ type: 'success', message: isSignup ? `Welcome to ${brand.name}!` : 'Welcome back, Jordan' });
      navigate(redirect, { replace: true });
    }, 700);
  };

  const redirectQuery = params.get('redirect') ? `?redirect=${encodeURIComponent(params.get('redirect') ?? '')}` : '';

  return (
    <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-2">
      <div className="hidden flex-col justify-between bg-primary-700 p-12 lg:flex">
        <div className="max-w-md">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-white">
            {isSignup ? 'Join thousands of teams hiring smarter.' : 'Your projects are waiting for you.'}
          </h2>
          <ul className="mt-8 space-y-3">
            {freelancerBenefits.map((b) =>
            <li key={b} className="flex items-start gap-3 text-primary-50">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-400 text-accent-900">
                  <CheckIcon className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                </span>
                {b}
              </li>
            )}
          </ul>
        </div>
        <figure className="max-w-md rounded-2xl bg-primary-800 p-6">
          <blockquote className="text-primary-50">“We hired our brand designer, developer and video team on {brand.name} in a single week. The offer flow makes scoping painless.”</blockquote>
          <figcaption className="mt-4 flex items-center gap-3">
            <Avatar name="Rachel Stone" alt="" src={avatars.rachel} size="sm" />
            <div>
              <p className="text-sm font-semibold text-white">Rachel Stone</p>
              <p className="text-xs text-primary-200">Head of Marketing, Northwind Labs</p>
            </div>
          </figcaption>
        </figure>
      </div>

      <div className="flex items-center justify-center bg-white px-4 py-12 sm:px-8">
        <div className="w-full max-w-sm">
          <div className="lg:hidden"><Logo /></div>
          <h1 className="mt-6 text-2xl font-extrabold tracking-tight text-slate-900 lg:mt-0">{isSignup ? 'Create your account' : 'Log in'}</h1>
          <p className="mt-1.5 text-sm text-slate-600">
            {isSignup ? 'Already have an account? ' : `New to ${brand.name}? `}
            <Link to={`${isSignup ? '/login' : '/signup'}${redirectQuery}`} className="font-semibold text-primary-700 hover:text-primary-800">
              {isSignup ? 'Log in' : 'Sign up for free'}
            </Link>
          </p>

          <form onSubmit={submit} noValidate className="mt-8 space-y-4">
            {isSignup && <TextField label="Full name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} error={errors.name} />}
            <TextField label="Email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} />
            <TextField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              autoComplete={isSignup ? 'new-password' : 'current-password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              hint={isSignup ? 'At least 8 characters' : undefined}
              trailing={
              <button type="button" onClick={() => setShowPassword((s) => !s)} className="text-slate-400 hover:text-slate-700" aria-label={showPassword ? 'Hide password' : 'Show password'}>
                  {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                </button>
              } />
            
            {!isSignup &&
            <div className="flex justify-end">
                <button type="button" onClick={() => addToast({ type: 'info', message: 'Password reset link sent to your email' })} className="text-sm font-semibold text-primary-700 hover:text-primary-800">
                  Forgot password?
                </button>
              </div>
            }
            {isSignup &&
            <fieldset>
                <legend className="mb-1.5 text-sm font-medium text-slate-800">I want to</legend>
                <div className="grid grid-cols-3 gap-2">
                  {intents.map((o) =>
                <label key={o.value} className={`cursor-pointer rounded-xl border px-2 py-2.5 text-center text-xs font-semibold transition-colors focus-within:ring-2 focus-within:ring-primary-500 ${intent === o.value ? 'border-primary-500 bg-primary-50 text-primary-800' : 'border-slate-200 text-slate-700 hover:border-slate-300'}`}>
                      <input type="radio" name="intent" value={o.value} checked={intent === o.value} onChange={() => setIntent(o.value)} className="sr-only" />
                      {o.label}
                    </label>
                )}
                </div>
              </fieldset>
            }
            {isSignup &&
            <div>
                <label className="flex items-start gap-2.5 text-sm text-slate-600">
                  <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-0.5 h-4 w-4 rounded border-slate-300 accent-primary-600" />
                  <span>
                    I agree to the <Link to="/terms" className="font-semibold text-slate-900 underline-offset-2 hover:underline">Terms</Link> and{' '}
                    <Link to="/privacy" className="font-semibold text-slate-900 underline-offset-2 hover:underline">Privacy Policy</Link>
                  </span>
                </label>
                {errors.agree && <p className="mt-1.5 text-xs font-medium text-rose-600">{errors.agree}</p>}
              </div>
            }
            <Button type="submit" fullWidth size="lg" loading={loading}>{isSignup ? 'Create account' : 'Log in'}</Button>
          </form>
          {!isSignup && <p className="mt-4 rounded-xl bg-slate-50 px-3 py-2 text-center text-xs text-slate-500">Demo credentials are pre-filled.</p>}
        </div>
      </div>
    </div>);

}