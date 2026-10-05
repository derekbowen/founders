import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { MailIcon } from 'lucide-react';
import { Input } from '../components/Input';
import { Checkbox } from '../components/Checkbox';
import { Logo } from '../components/common/Logo';
import { useToast } from '../components/ToastProvider';
import { useAuth } from '../contexts/AuthContext';
import { brand } from '../data/brand';
import { heroImage } from '../data/landing';

interface AuthProps {
  mode: 'login' | 'signup';
}

type Errors = Partial<Record<'firstName' | 'lastName' | 'email' | 'password' | 'terms', string>>;

const roles = [
{ id: 'owner', label: 'Find a sitter' },
{ id: 'sitter', label: 'Become a sitter' },
{ id: 'both', label: 'Both' }];


export function Auth({ mode }: AuthProps) {
  const isSignup = mode === 'signup';
  const { login } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const next = params.get('next') || '/';
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', role: 'owner', terms: false });
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Errors = {};
    if (isSignup && !form.firstName.trim()) errs.firstName = 'Required';
    if (isSignup && !form.lastName.trim()) errs.lastName = 'Required';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = 'Enter a valid email address.';
    if (form.password.length < 8) errs.password = 'Password must be at least 8 characters.';
    if (isSignup && !form.terms) errs.terms = 'Please accept the terms to continue.';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setLoading(true);
    setTimeout(() => {
      login();
      addToast({ type: 'success', message: isSignup ? `Welcome to ${brand.name}!` : 'Welcome back!' });
      navigate(next);
    }, 900);
  };

  const demoLogin = () => {
    login();
    navigate(next);
  };

  return (
    <div className="grid min-h-[calc(100vh-72px)] bg-white lg:grid-cols-2">
      <div className="flex items-center justify-center px-4 py-12 sm:px-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden">
            <Logo />
          </div>
          <h1 className="mt-6 text-3xl font-black tracking-tight text-ink-900 lg:mt-0">{isSignup ? 'Create your account' : 'Welcome back'}</h1>
          <p className="mt-2 text-ink-600">
            {isSignup ? 'Join thousands of pet parents and sitters in your neighborhood.' : `Log in to manage your bookings on ${brand.name}.`}
          </p>

          <div className="mt-6 grid gap-2 sm:grid-cols-2">
            <button type="button" onClick={demoLogin} className="btn btn-md btn-secondary">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-ink-900 text-[11px] font-black text-white" aria-hidden="true">
                G
              </span>
              Continue with Google
            </button>
            <button type="button" onClick={demoLogin} className="btn btn-md btn-secondary">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-ink-900 text-[11px] font-black text-white" aria-hidden="true">
                f
              </span>
              Continue with Facebook
            </button>
          </div>
          <div className="my-6 flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-ink-500">
            <span className="h-px flex-1 bg-ink-200" /> or with email <span className="h-px flex-1 bg-ink-200" />
          </div>

          <form onSubmit={submit} noValidate className="space-y-4">
            {isSignup &&
            <>
                <fieldset>
                  <legend className="field-label">I want to</legend>
                  <div className="grid grid-cols-3 gap-2">
                    {roles.map((r) =>
                  <button key={r.id} type="button" aria-pressed={form.role === r.id} onClick={() => setForm({ ...form, role: r.id })} className={`rounded-2xl border px-2 py-2.5 text-sm font-bold transition ${form.role === r.id ? 'border-primary-500 bg-primary-50 text-ink-900' : 'border-ink-200 text-ink-700 hover:border-ink-400'}`}>
                        {r.label}
                      </button>
                  )}
                  </div>
                </fieldset>
                <div className="grid grid-cols-2 gap-3">
                  <Input id="first" label="First name" autoComplete="given-name" value={form.firstName} error={errors.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
                  <Input id="last" label="Last name" autoComplete="family-name" value={form.lastName} error={errors.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
                </div>
              </>
            }
            <Input id="email" type="email" label="Email" autoComplete="email" startAdornment={<MailIcon size={16} />} value={form.email} error={errors.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <Input id="password" type="password" label="Password" autoComplete={isSignup ? 'new-password' : 'current-password'} value={form.password} error={errors.password} helperText={isSignup ? 'At least 8 characters' : undefined} onChange={(e) => setForm({ ...form, password: e.target.value })} />
            {!isSignup &&
            <div className="text-right">
                <button type="button" onClick={() => addToast({ type: 'info', message: form.email ? `Reset link sent to ${form.email}` : 'Enter your email first, then tap “Forgot password”.' })} className="text-sm font-bold text-primary-700 hover:underline">
                  Forgot password?
                </button>
              </div>
            }
            {isSignup &&
            <div>
                <Checkbox
                checked={form.terms}
                error={!!errors.terms}
                onChange={(e) => setForm({ ...form, terms: e.target.checked })}
                label={
                <span className="text-sm text-ink-700">
                      I accept the{' '}
                      <Link to="/terms" className="link">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link to="/privacy" className="link">
                        Privacy Policy
                      </Link>
                    </span>
                } />
              
                {errors.terms && <p className="mt-1 text-sm font-semibold text-red-700">{errors.terms}</p>}
              </div>
            }
            <button type="submit" disabled={loading} className="btn btn-lg btn-primary w-full">
              {loading && <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink-900 border-t-transparent" aria-hidden="true" />}
              {isSignup ? 'Create account' : 'Log in'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-ink-600">
            {isSignup ? 'Already have an account?' : `New to ${brand.name}?`}{' '}
            <Link to={`${isSignup ? '/login' : '/signup'}${params.get('next') ? `?next=${encodeURIComponent(next)}` : ''}`} className="link">
              {isSignup ? 'Log in' : 'Sign up'}
            </Link>
          </p>
        </div>
      </div>
      <div className="relative hidden lg:block">
        <img src={heroImage} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute bottom-8 left-8 right-8 rounded-3xl bg-white/95 p-6 shadow-lift">
          <p className="text-lg font-extrabold text-ink-900">“Finding Grace was the best thing that happened to our senior beagle.”</p>
          <p className="mt-2 text-sm font-semibold text-ink-600">Helen J. · Multnomah Village</p>
        </div>
      </div>
    </div>);

}