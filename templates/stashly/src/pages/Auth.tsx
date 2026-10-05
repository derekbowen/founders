import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Checkbox } from '../components/Checkbox';
import { useToast } from '../components/ToastProvider';
import { useMarketplace } from '../contexts/MarketplaceContext';
import { Logo } from '../components/layout/Logo';
import { images } from '../data/images';
import { brand } from '../data/brand';
import { currentUserSeed } from '../data/hosts';
import { ui, cx } from '../utils/styles';

export function Auth({ mode }: {mode: 'login' | 'signup';}) {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { login } = useMarketplace();
  const { addToast } = useToast();
  const isSignup = mode === 'signup';
  const [form, setForm] = useState({
    first: '',
    last: '',
    email: isSignup ? '' : currentUserSeed.email,
    password: isSignup ? '' : 'stashly-demo',
    terms: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (isSignup && !form.first.trim()) next.first = 'Required';
    if (isSignup && !form.last.trim()) next.last = 'Required';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email';
    if (form.password.length < 8) next.password = 'At least 8 characters';
    if (isSignup && !form.terms) next.terms = 'You must accept the terms';
    setErrors(next);
    if (Object.keys(next).length) return;
    setLoading(true);
    setTimeout(() => {
      login(form.email);
      addToast({ type: 'success', message: isSignup ? `Welcome to ${brand.name}!` : 'Welcome back!' });
      navigate(params.get('next') || '/');
    }, 600);
  };

  return (
    <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-2">
      <div className="flex items-center justify-center px-4 py-12 sm:px-8">
        <div className="w-full max-w-sm">
          <h1 className="text-3xl font-bold tracking-tight text-stone-900">{isSignup ? 'Create your account' : 'Log in'}</h1>
          <p className="mt-2 text-sm text-stone-600">
            {isSignup ? 'Already have an account? ' : `New to ${brand.name}? `}
            <Link to={isSignup ? '/login' : '/signup'} className="font-semibold text-brand-700 hover:underline">
              {isSignup ? 'Log in' : 'Sign up'}
            </Link>
          </p>

          <form onSubmit={submit} noValidate className="mt-8 space-y-4">
            {isSignup &&
            <div className="grid grid-cols-2 gap-3">
                <Input id="first" label="First name" autoComplete="given-name" value={form.first} onChange={(e) => setForm({ ...form, first: e.target.value })} error={errors.first} />
                <Input id="last" label="Last name" autoComplete="family-name" value={form.last} onChange={(e) => setForm({ ...form, last: e.target.value })} error={errors.last} />
              </div>
            }
            <Input id="email" label="Email" type="email" autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} error={errors.email} />
            <Input id="password" label="Password" type="password" autoComplete={isSignup ? 'new-password' : 'current-password'} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} error={errors.password} helperText={isSignup ? 'At least 8 characters' : undefined} />
            {isSignup ?
            <div>
                <Checkbox
                checked={form.terms}
                onChange={(e) => setForm({ ...form, terms: e.target.checked })}
                error={Boolean(errors.terms)}
                label={<span className="text-sm text-stone-700">I accept the <Link to="/terms" className="font-medium text-brand-700 underline">Terms</Link> and <Link to="/privacy" className="font-medium text-brand-700 underline">Privacy Policy</Link></span>} />
              
                {errors.terms && <p className="mt-1 text-xs font-medium text-red-700">{errors.terms}</p>}
              </div> :

            <div className="flex justify-end">
                <button type="button" onClick={() => addToast({ type: 'info', message: `Reset link sent to ${form.email || 'your email'}` })} className="text-sm font-medium text-brand-700 hover:underline">
                  Forgot password?
                </button>
              </div>
            }
            <Button type="submit" size="large" loading={loading} className={cx(ui.btnBrand, 'w-full')}>
              {isSignup ? 'Sign up' : 'Log in'}
            </Button>
          </form>
          {!isSignup && <p className="mt-4 text-center text-xs text-stone-500">Demo credentials are pre-filled.</p>}
        </div>
      </div>
      <div className="relative hidden lg:block">
        <img src={images.detail} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-brand-900/45" aria-hidden="true" />
        <div className="absolute bottom-10 left-10 right-10 text-white">
          <Logo inverted />
          <p className="mt-4 max-w-md text-2xl font-semibold leading-snug">“Half the price of the storage unit — and it’s two blocks from my apartment.”</p>
          <p className="mt-2 text-sm text-brand-100">Noah S., storing in Alberta Arts</p>
        </div>
      </div>
    </div>);

}