import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { BriefcaseIcon, CheckIcon, ClipboardListIcon } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { ChoiceCard } from '../components/ui/ChoiceCard';
import { Field } from '../components/ui/Field';
import { Logo } from '../components/ui/Logo';
import { brand } from '../data/brand';
import { images } from '../data/images';
import { useApp } from '../hooks/useApp';
import type { UserRole } from '../types/marketplace';
import { cn, inputClass, inputErrorClass } from '../utils/styles';

interface Errors {
  name?: string;
  email?: string;
  password?: string;
  terms?: string;
}

export function Auth({ mode }: {mode: 'login' | 'signup';}) {
  const { login, signup } = useApp();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const redirect = params.get('redirect');
  const [role, setRole] = useState<UserRole>('customer');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const isSignup = mode === 'signup';

  function validate(): Errors {
    const e: Errors = {};
    if (isSignup && name.trim().length < 2) e.name = 'Enter your full name.';
    if (!/^\S+@\S+\.\S+$/.test(email)) e.email = 'Enter a valid email address.';
    if (password.length < (isSignup ? 8 : 1)) e.password = isSignup ? 'Use at least 8 characters.' : 'Enter your password.';
    if (isSignup && !terms) e.terms = 'Please accept the terms to continue.';
    return e;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length) return;
    setLoading(true);
    setTimeout(() => {
      if (isSignup) {
        signup({ name: name.trim(), email, role });
        toast.success(`Welcome to ${brand.name}, ${name.trim().split(' ')[0]}!`);
        navigate(redirect ?? (role === 'pro' ? '/search' : '/post-job'));
      } else {
        login(email);
        toast.success('Welcome back!');
        navigate(redirect ?? '/inbox');
      }
    }, 700);
  }

  return (
    <div className="grid min-h-[calc(100vh-4rem)] bg-white lg:grid-cols-2">
      <div className="flex items-center justify-center px-4 py-12 sm:px-6">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-extrabold tracking-tight text-ink-900">
            {isSignup ? 'Create your account' : 'Welcome back'}
          </h1>
          <p className="mt-2 text-ink-600">
            {isSignup ? 'Already have an account? ' : 'New here? '}
            <Link
              to={`${isSignup ? '/login' : '/signup'}${redirect ? `?redirect=${encodeURIComponent(redirect)}` : ''}`}
              className="font-bold text-primary-700 hover:underline">
              
              {isSignup ? 'Log in' : 'Create an account'}
            </Link>
          </p>

          <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
            {isSignup &&
            <fieldset>
                <legend className="mb-2 text-sm font-bold text-ink-900">I want to…</legend>
                <div role="radiogroup" className="grid gap-3 sm:grid-cols-2">
                  <ChoiceCard
                  selected={role === 'customer'}
                  onSelect={() => setRole('customer')}
                  title="Get jobs done"
                  description="Post jobs & hire pros"
                  icon={<ClipboardListIcon className="h-5 w-5" />} />
                
                  <ChoiceCard
                  selected={role === 'pro'}
                  onSelect={() => setRole('pro')}
                  title="Find work"
                  description="Send offers as a pro"
                  icon={<BriefcaseIcon className="h-5 w-5" />} />
                
                </div>
              </fieldset>
            }
            {isSignup &&
            <Field label="Full name" htmlFor="auth-name" error={errors.name}>
                <input
                id="auth-name"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                aria-invalid={Boolean(errors.name)}
                className={cn(inputClass, errors.name && inputErrorClass)} />
              
              </Field>
            }
            <Field label="Email" htmlFor="auth-email" error={errors.email}>
              <input
                id="auth-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={Boolean(errors.email)}
                className={cn(inputClass, errors.email && inputErrorClass)} />
              
            </Field>
            <Field label="Password" htmlFor="auth-password" error={errors.password} hint={isSignup ? 'At least 8 characters.' : undefined}>
              <input
                id="auth-password"
                type="password"
                autoComplete={isSignup ? 'new-password' : 'current-password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-invalid={Boolean(errors.password)}
                className={cn(inputClass, errors.password && inputErrorClass)} />
              
            </Field>
            {!isSignup &&
            <button
              type="button"
              onClick={() => toast('Password reset link sent — check your email.')}
              className="text-sm font-bold text-ink-700 hover:text-ink-900 hover:underline">
              
                Forgot password?
              </button>
            }
            {isSignup &&
            <div>
                <label className="flex cursor-pointer items-start gap-3 text-sm text-ink-700">
                  <span className="relative mt-0.5 flex h-5 w-5 shrink-0">
                    <input
                    type="checkbox"
                    checked={terms}
                    onChange={(e) => setTerms(e.target.checked)}
                    className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border-2 border-ink-300 checked:border-primary-600 checked:bg-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2" />
                  
                    <CheckIcon className="pointer-events-none absolute inset-0 m-auto hidden h-3 w-3 text-white peer-checked:block" strokeWidth={3} aria-hidden="true" />
                  </span>
                  <span>
                    I agree to the{' '}
                    <Link to="/terms" className="font-bold text-ink-900 underline">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="font-bold text-ink-900 underline">
                      Privacy Policy
                    </Link>
                    .
                  </span>
                </label>
                {errors.terms && <p className="mt-1.5 text-xs font-semibold text-red-700">{errors.terms}</p>}
              </div>
            }
            <Button type="submit" size="lg" fullWidth loading={loading}>
              {isSignup ? `Create ${role === 'pro' ? 'pro' : 'customer'} account` : 'Log in'}
            </Button>
            <div className="relative py-1 text-center text-xs font-semibold text-ink-500">
              <span className="relative z-10 bg-white px-3">or</span>
              <span className="absolute inset-x-0 top-1/2 h-px bg-ink-200" aria-hidden="true" />
            </div>
            <Button
              variant="secondary"
              size="lg"
              fullWidth
              onClick={() => {
                login('alex.rivera@example.com');
                navigate(redirect ?? '/inbox');
              }}>
              
              Continue with Google
            </Button>
            <p className="text-center text-xs text-ink-500">Demo: any email and password will work.</p>
          </form>
        </div>
      </div>
      <div className="relative hidden bg-ink-900 lg:block">
        <img src={images.hero} alt="" className="absolute inset-0 h-full w-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-ink-950/40" aria-hidden="true" />
        <div className="relative flex h-full flex-col justify-between p-12">
          <Logo inverted />
          <div className="max-w-md">
            <p className="text-3xl font-extrabold leading-tight text-white">
              “I posted my garage clear-out at breakfast and had four offers by lunch.”
            </p>
            <p className="mt-4 font-bold text-ink-200">Alex R. · Kerns, Portland</p>
          </div>
        </div>
      </div>
    </div>);

}