import React, { useState } from 'react';
import { BadgeCheckIcon, BuildingIcon, CheckIcon, StoreIcon, UploadIcon } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Checkbox } from '../components/Checkbox';
import { Input } from '../components/Input';
import { BrandButton } from '../components/ui/BrandButton';
import { SelectField } from '../components/ui/SelectField';
import { useAuth } from '../contexts/AuthContext';
import { brand } from '../data/brand';
import { categories } from '../data/categories';

type AccountType = 'retailer' | 'brand';

const retailerTypes = ['Café', 'Grocery', 'Gift shop', 'Home boutique', 'Bookstore', 'Pet shop', 'Online store', 'Other'].map((v) => ({ value: v, label: v }));

export function Auth({ mode }: {mode: 'login' | 'signup';}) {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = (location.state as {from?: string;} | null)?.from ?? '/';
  const [accountType, setAccountType] = useState<AccountType>('retailer');
  const [submitting, setSubmitting] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const [certName, setCertName] = useState('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (mode === 'signup') {
      const ein = String(data.get('ein') ?? '');
      if (!/^\d{2}-?\d{7}$/.test(ein.trim())) {
        setError('Enter a valid 9-digit EIN (e.g. 12-3456789) so we can verify your business.');
        return;
      }
      if (!agreed) {
        setError('Please accept the Terms of Service and Privacy Policy.');
        return;
      }
    }
    setError('');
    setSubmitting(true);
    window.setTimeout(() => {
      signIn();
      setSubmitting(false);
      if (mode === 'signup') {
        toast.success('Account created', { description: 'Business verification usually completes within 1 business day.' });
        navigate(accountType === 'brand' ? '/sell/new' : '/search');
      } else {
        toast.success('Welcome back, Priya');
        navigate(redirectTo);
      }
    }, 800);
  };

  return (
    <div className="mx-auto grid min-h-[calc(100vh-10rem)] max-w-7xl gap-0 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8">
      <aside className="hidden flex-col justify-between rounded-2xl bg-primary-900 p-10 text-white lg:flex">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-accent-300">{brand.name} for business</p>
          <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight">
            {mode === 'login' ? 'Welcome back to wholesale, simplified.' : 'Join thousands of independent shops and brands.'}
          </h2>
          <ul className="mt-8 space-y-4 text-sm text-primary-100">
            {[
            'Order by the case with transparent tier pricing',
            'Low opening minimums from 380 independent brands',
            'Free returns on every first order with a brand',
            'One inbox for orders, tracking and messages'].
            map((t) =>
            <li key={t} className="flex gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-400 text-primary-950">
                  <CheckIcon className="h-3 w-3" aria-hidden="true" />
                </span>
                {t}
              </li>
            )}
          </ul>
        </div>
        <figure className="mt-10 rounded-xl bg-white/5 p-5 ring-1 ring-inset ring-white/10">
          <blockquote className="text-sm leading-relaxed text-primary-50">
            “We added eleven new local brands to our shelves this quarter without a single sales rep call. Reorders take two minutes.”
          </blockquote>
          <figcaption className="mt-3 text-xs text-primary-200">Dana Kim · Owner, Little Owl Café, Seattle</figcaption>
        </figure>
      </aside>

      <div className="flex items-start justify-center lg:items-center">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            {mode === 'login' ? 'Log in to your account' : 'Create a business account'}
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            {mode === 'login' ?
            <>
                New to {brand.name}?{' '}
                <Link to="/signup" className="font-semibold text-primary-700 hover:text-primary-900">
                  Sign up
                </Link>
              </> :

            <>
                Already have an account?{' '}
                <Link to="/login" className="font-semibold text-primary-700 hover:text-primary-900">
                  Log in
                </Link>
              </>
            }
          </p>

          <form onSubmit={onSubmit} className="mt-6 space-y-4" noValidate>
            {mode === 'signup' &&
            <fieldset>
                <legend className="mb-2 text-sm font-medium text-slate-800">I want to</legend>
                <div className="grid grid-cols-2 gap-2">
                  {([
                { id: 'retailer', label: 'Buy wholesale', sub: 'Retailer or café', icon: StoreIcon },
                { id: 'brand', label: 'Sell wholesale', sub: 'Brand or maker', icon: BuildingIcon }] as
                const).map((o) => {
                  const selected = accountType === o.id;
                  return (
                    <label
                      key={o.id}
                      className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors ${
                      selected ? 'border-primary-600 bg-primary-50 ring-1 ring-primary-600' : 'border-slate-200 hover:border-slate-300'}`
                      }>
                      
                        <input type="radio" name="accountType" className="sr-only" checked={selected} onChange={() => setAccountType(o.id)} />
                        <o.icon className={`h-5 w-5 ${selected ? 'text-primary-700' : 'text-slate-400'}`} aria-hidden="true" />
                        <span>
                          <span className="block text-sm font-semibold text-slate-900">{o.label}</span>
                          <span className="block text-xs text-slate-500">{o.sub}</span>
                        </span>
                      </label>);

                })}
                </div>
              </fieldset>
            }

            {mode === 'signup' &&
            <div className="grid grid-cols-2 gap-3">
                <Input id="first" name="first" label="First name" autoComplete="given-name" required />
                <Input id="last" name="last" label="Last name" autoComplete="family-name" required />
              </div>
            }
            <Input
              id="email"
              name="email"
              type="email"
              label="Work email"
              autoComplete="email"
              defaultValue={mode === 'login' ? 'priya@fernandfield.co' : ''}
              required />
            
            <Input
              id="password"
              name="password"
              type="password"
              label="Password"
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              defaultValue={mode === 'login' ? 'wholesale2026' : ''}
              helperText={mode === 'signup' ? 'At least 10 characters.' : undefined}
              required />
            

            {mode === 'signup' &&
            <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-4">
                <p className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                  <BadgeCheckIcon className="h-4 w-4 text-primary-600" aria-hidden="true" />
                  Business verification
                </p>
                <Input id="business" name="business" label={accountType === 'retailer' ? 'Store name' : 'Brand name'} autoComplete="organization" required />
                {accountType === 'retailer' ?
              <SelectField id="btype" name="btype" label="Store type" options={retailerTypes} /> :

              <SelectField id="bcat" name="bcat" label="Primary category" options={categories.map((c) => ({ value: c.id, label: c.name }))} />
              }
                <div className="grid grid-cols-2 gap-3">
                  <Input id="ein" name="ein" label="EIN / Tax ID" placeholder="12-3456789" required />
                  <Input id="state" name="state" label="State" placeholder="OR" maxLength={2} />
                </div>
                <Input
                id="website"
                name="website"
                label={accountType === 'retailer' ? 'Store website or Instagram' : 'Brand website'}
                placeholder="https://"
                helperText="Helps us verify you faster." />
              
                {accountType === 'retailer' &&
              <div>
                    <p className="mb-1.5 text-sm font-medium text-slate-800">Resale certificate (optional)</p>
                    <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-slate-300 px-3 py-2.5 text-sm text-slate-600 hover:border-primary-400 hover:bg-primary-50/40">
                      <UploadIcon className="h-4 w-4 text-primary-600" aria-hidden="true" />
                      <span className="truncate">{certName || 'Upload PDF or image'}</span>
                      <input type="file" accept=".pdf,image/*" className="sr-only" onChange={(e) => setCertName(e.target.files?.[0]?.name ?? '')} />
                    </label>
                  </div>
              }
              </div>
            }

            {mode === 'login' ?
            <div className="flex items-center justify-between">
                <Checkbox label="Keep me logged in" size="sm" defaultChecked />
                <button type="button" onClick={() => toast('Password reset link sent to your email.')} className="text-sm font-medium text-primary-700 hover:text-primary-900">
                  Forgot password?
                </button>
              </div> :

            <Checkbox
              size="sm"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              label={
              <span className="text-sm text-slate-600">
                    I agree to the{' '}
                    <Link to="/terms" className="font-medium text-primary-700 underline-offset-2 hover:underline">
                      Terms
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="font-medium text-primary-700 underline-offset-2 hover:underline">
                      Privacy Policy
                    </Link>
                  </span>
              } />

            }

            {error &&
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
                {error}
              </p>
            }

            <BrandButton type="submit" size="lg" fullWidth loading={submitting}>
              {mode === 'login' ? 'Log in' : 'Create account'}
            </BrandButton>
          </form>
        </div>
      </div>
    </div>);

}