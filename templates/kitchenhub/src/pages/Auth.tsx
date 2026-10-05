import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChefHatIcon, StoreIcon } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { CheckboxField } from '../components/ui/CheckboxField';
import { Field } from '../components/ui/Field';
import { useAuth } from '../contexts/AuthContext';
import { brand } from '../data/brand';
import { images } from '../data/images';
import { cn, focusRing, inputClass } from '../utils/styles';

type Mode = 'login' | 'signup';
type Intent = 'book' | 'host';

export function AuthPage({ mode }: {mode: Mode;}) {
  const navigate = useNavigate();
  const { login, signup } = useAuth();
  const [form, setForm] = useState({ firstName: '', lastName: '', business: '', email: '', password: '', terms: false });
  const [intent, setIntent] = useState<Intent>('book');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const set = (key: keyof typeof form, value: string | boolean) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: '' }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const found: Record<string, string> = {};
    if (!/^\S+@\S+\.\S+$/.test(form.email)) found.email = 'Enter a valid email address';
    if (form.password.length < 8) found.password = 'Password must be at least 8 characters';
    if (mode === 'signup') {
      if (!form.firstName.trim()) found.firstName = 'Required';
      if (!form.lastName.trim()) found.lastName = 'Required';
      if (!form.terms) found.terms = 'Please accept the terms to continue';
    }
    setErrors(found);
    if (Object.values(found).some(Boolean)) return;
    setLoading(true);
    window.setTimeout(() => {
      if (mode === 'login') login(form.email);else
      signup(`${form.firstName} ${form.lastName}`, form.email, form.business);
      navigate(mode === 'signup' && intent === 'host' ? '/listings/new' : '/');
    }, 700);
  };

  const demoLogin = () => {
    login('');
    navigate('/');
  };

  return (
    <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-steel-900 lg:block">
        <img src={mode === 'login' ? images.hero : images.team} alt="" className="absolute inset-0 h-full w-full object-cover opacity-60" />
        <div className="relative flex h-full flex-col justify-end p-12 text-white">
          <p className="font-heading text-4xl font-bold uppercase leading-tight">“We launched our meal-prep brand without signing a lease.”</p>
          <p className="mt-4 text-steel-200">Rachel Stone · Greenfork Meals, Los Angeles</p>
        </div>
      </div>

      <div className="flex items-center justify-center px-4 py-12 sm:px-8">
        <div className="w-full max-w-md">
          <h1 className="font-heading text-4xl font-bold uppercase tracking-tight text-steel-900">{mode === 'login' ? 'Welcome back' : `Join ${brand.name}`}</h1>
          <p className="mt-2 text-sm text-steel-600">
            {mode === 'login' ? 'New here? ' : 'Already have an account? '}
            <Link to={mode === 'login' ? '/signup' : '/login'} className="font-semibold text-primary hover:underline">
              {mode === 'login' ? 'Create an account' : 'Log in'}
            </Link>
          </p>

          <Button variant="outline" fullWidth className="mt-8" onClick={demoLogin}>
            <span className="grid h-5 w-5 place-items-center rounded-full bg-steel-900 text-[10px] font-bold text-white" aria-hidden="true">G</span>
            Continue with Google
          </Button>
          <div className="my-6 flex items-center gap-3 text-xs text-steel-500">
            <span className="h-px flex-1 bg-steel-200" />
            or with email
            <span className="h-px flex-1 bg-steel-200" />
          </div>

          <form onSubmit={submit} noValidate className="space-y-4">
            {mode === 'signup' &&
            <>
                <fieldset>
                  <legend className="mb-2 text-sm font-medium text-steel-800">I want to…</legend>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                  { key: 'book' as Intent, label: 'Book kitchens', icon: ChefHatIcon },
                  { key: 'host' as Intent, label: 'List my kitchen', icon: StoreIcon }].
                  map((o) =>
                  <button
                    key={o.key}
                    type="button"
                    aria-pressed={intent === o.key}
                    onClick={() => setIntent(o.key)}
                    className={cn('flex flex-col items-start gap-2 rounded-xl border p-4 text-left text-sm font-semibold transition-colors', focusRing, intent === o.key ? 'border-primary bg-primary-soft text-steel-900' : 'border-steel-200 text-steel-700 hover:border-steel-400')}>
                    
                        <o.icon className={cn('h-5 w-5', intent === o.key ? 'text-primary' : 'text-steel-500')} aria-hidden="true" />
                        {o.label}
                      </button>
                  )}
                  </div>
                </fieldset>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="First name" htmlFor="au-first" error={errors.firstName}>
                    <input id="au-first" value={form.firstName} onChange={(e) => set('firstName', e.target.value)} className={cn(inputClass, errors.firstName && 'border-primary')} autoComplete="given-name" />
                  </Field>
                  <Field label="Last name" htmlFor="au-last" error={errors.lastName}>
                    <input id="au-last" value={form.lastName} onChange={(e) => set('lastName', e.target.value)} className={cn(inputClass, errors.lastName && 'border-primary')} autoComplete="family-name" />
                  </Field>
                </div>
                <Field label="Business name" htmlFor="au-business" optional>
                  <input id="au-business" value={form.business} onChange={(e) => set('business', e.target.value)} className={inputClass} autoComplete="organization" />
                </Field>
              </>
            }
            <Field label="Email" htmlFor="au-email" error={errors.email}>
              <input id="au-email" type="email" value={form.email} onChange={(e) => set('email', e.target.value)} className={cn(inputClass, errors.email && 'border-primary')} autoComplete="email" />
            </Field>
            <Field label="Password" htmlFor="au-password" error={errors.password} hint={mode === 'signup' ? 'At least 8 characters' : undefined}>
              <input id="au-password" type="password" value={form.password} onChange={(e) => set('password', e.target.value)} className={cn(inputClass, errors.password && 'border-primary')} autoComplete={mode === 'login' ? 'current-password' : 'new-password'} />
            </Field>
            {mode === 'login' &&
            <div className="text-right">
                <button type="button" onClick={() => setResetSent(true)} className={cn('rounded text-sm font-medium text-steel-600 hover:text-steel-900 hover:underline', focusRing)}>
                  Forgot password?
                </button>
                {resetSent && <p className="mt-1 text-xs text-accent" role="status">If that email exists, a reset link is on its way.</p>}
              </div>
            }
            {mode === 'signup' &&
            <div>
                <CheckboxField
                id="au-terms"
                checked={form.terms}
                onChange={(v) => set('terms', v)}
                label={
                <>
                      I accept the <Link to="/terms" className="font-medium text-primary underline">Terms</Link> and{' '}
                      <Link to="/privacy" className="font-medium text-primary underline">Privacy policy</Link>
                    </>
                } />
              
                {errors.terms && <p className="text-xs font-medium text-primary" role="alert">{errors.terms}</p>}
              </div>
            }
            <Button type="submit" size="lg" fullWidth loading={loading}>
              {mode === 'login' ? 'Log in' : 'Create account'}
            </Button>
          </form>
          {mode === 'login' &&
          <p className="mt-6 rounded-lg bg-steel-50 p-3 text-center text-xs text-steel-600">
              Demo: any email + 8-character password logs you in as a host.
            </p>
          }
        </div>
      </div>
    </div>);

}