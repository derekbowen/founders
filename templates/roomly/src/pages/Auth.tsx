import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { HomeIcon, SearchIcon } from 'lucide-react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Checkbox } from '../components/Checkbox';
import { useToast } from '../components/ToastProvider';
import { useApp } from '../contexts/AppContext';
import { brand } from '../data/brand';
import { images } from '../data/images';
import { buttonStyles, fieldStyles } from '../utils/styles';
import type { UserType } from '../types/user';

interface AuthProps {
  mode: 'login' | 'signup';
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  terms?: string;
  form?: string;
}

const userTypes: {id: UserType;title: string;text: string;icon: React.ReactNode;}[] = [
{ id: 'renter', title: "I'm looking for a room", text: 'Renter', icon: <SearchIcon size={20} /> },
{ id: 'landlord', title: 'I have a room to rent', text: 'Landlord or flatmate', icon: <HomeIcon size={20} /> }];


export function Auth({ mode }: AuthProps) {
  const isSignup = mode === 'signup';
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const redirect = params.get('redirect');
  const { loginWithEmail, loginAsDemo, signup } = useApp();
  const { addToast } = useToast();

  const [type, setType] = useState<UserType>('renter');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const finish = (name: string, userType: UserType) => {
    addToast({ type: 'success', message: `Welcome${isSignup ? '' : ' back'}, ${name.split(' ')[0]}!` });
    navigate(redirect ?? (userType === 'landlord' ? '/inbox' : '/s'), { replace: true });
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: FormErrors = {};
    if (isSignup && !firstName.trim()) next.firstName = 'Enter your first name.';
    if (isSignup && !lastName.trim()) next.lastName = 'Enter your last name.';
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = 'Enter a valid email address.';
    if (password.length < 8) next.password = 'Password must be at least 8 characters.';
    if (isSignup && !terms) next.terms = 'Please accept the terms to continue.';
    setErrors(next);
    if (Object.keys(next).length) return;

    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      if (isSignup) {
        const user = signup({ firstName, lastName, email, type });
        finish(user.name, user.type);
      } else {
        const user = loginWithEmail(email);
        if (!user) {
          setErrors({ form: 'No account found with that email. Try a demo account below.' });
          return;
        }
        finish(user.name, user.type);
      }
    }, 600);
  };

  const demo = (t: UserType) => {
    const user = loginAsDemo(t);
    finish(user.name, user.type);
  };

  return (
    <div className="grid min-h-[calc(100vh-72px)] lg:grid-cols-2">
      <div className="flex items-center justify-center px-4 py-12 sm:px-6">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold tracking-tight text-navy-900">
            {isSignup ? `Join ${brand.name}` : 'Welcome back'}
          </h1>
          <p className="mt-2 text-navy-600">
            {isSignup ? 'Create your free account in less than a minute.' : 'Log in to manage your inquiries and listings.'}
          </p>

          <form onSubmit={submit} className="mt-8 space-y-5" noValidate>
            {isSignup &&
            <fieldset>
                <legend className={fieldStyles.label}>I want to…</legend>
                <div className="grid grid-cols-2 gap-3" role="radiogroup">
                  {userTypes.map((u) => {
                  const active = type === u.id;
                  return (
                    <button
                      key={u.id}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => setType(u.id)}
                      className={`flex flex-col items-start gap-3 rounded-2xl border-2 p-4 text-left transition focus:outline-none focus-visible:ring-4 focus-visible:ring-primary-100 ${
                      active ? 'border-primary-500 bg-primary-50' : 'border-navy-100 bg-white hover:border-navy-200'}`
                      }>
                      
                        <span
                        className={`grid h-10 w-10 place-items-center rounded-xl ${
                        active ? 'bg-primary-400 text-navy-900' : 'bg-navy-50 text-navy-600'}`
                        }>
                        
                          {u.icon}
                        </span>
                        <span>
                          <span className="block text-sm font-semibold text-navy-900">{u.title}</span>
                          <span className="block text-xs text-navy-500">{u.text}</span>
                        </span>
                      </button>);

                })}
                </div>
              </fieldset>
            }

            {isSignup &&
            <div className="grid grid-cols-2 gap-3">
                <Input id="first" label="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} error={errors.firstName} autoComplete="given-name" />
                <Input id="last" label="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} error={errors.lastName} autoComplete="family-name" />
              </div>
            }
            <Input id="email" label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} autoComplete="email" placeholder="you@example.com" />
            <Input
              id="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              helperText={isSignup ? 'At least 8 characters.' : undefined}
              autoComplete={isSignup ? 'new-password' : 'current-password'} />
            
            {isSignup &&
            <div>
                <Checkbox
                checked={terms}
                onChange={(e) => setTerms(e.target.checked)}
                error={!!errors.terms}
                label={
                <span className="text-sm text-navy-700">
                      I accept the{' '}
                      <Link to="/terms" className="font-semibold text-primary-700 underline">
                        Terms
                      </Link>{' '}
                      and{' '}
                      <Link to="/privacy" className="font-semibold text-primary-700 underline">
                        Privacy policy
                      </Link>
                    </span>
                } />
              
                {errors.terms && <p className={fieldStyles.error}>{errors.terms}</p>}
              </div>
            }
            {errors.form &&
            <p role="alert" className="rounded-xl bg-coral-50 p-3 text-sm font-medium text-coral-800">
                {errors.form}
              </p>
            }
            <Button type="submit" size="large" loading={loading} className={`${buttonStyles.primary} w-full`}>
              {isSignup ? 'Create account' : 'Log in'}
            </Button>
          </form>

          <div className="mt-8">
            <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-wide text-navy-400">
              <span className="h-px flex-1 bg-navy-100" /> or try a demo account <span className="h-px flex-1 bg-navy-100" />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <Button className={buttonStyles.outline} leftIcon={<SearchIcon size={16} />} onClick={() => demo('renter')}>
                Demo renter
              </Button>
              <Button className={buttonStyles.outline} leftIcon={<HomeIcon size={16} />} onClick={() => demo('landlord')}>
                Demo landlord
              </Button>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-navy-600">
            {isSignup ? 'Already have an account? ' : 'New here? '}
            <Link
              to={`${isSignup ? '/login' : '/signup'}${redirect ? `?redirect=${encodeURIComponent(redirect)}` : ''}`}
              className="font-semibold text-primary-700 hover:text-primary-800">
              
              {isSignup ? 'Log in' : 'Create an account'}
            </Link>
          </p>
        </div>
      </div>

      <div className="relative hidden lg:block">
        <img src={images.room9} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-navy-900/30" />
        <figure className="absolute bottom-10 left-10 right-10 rounded-2xl bg-white/95 p-6 shadow-lift">
          <blockquote className="text-lg font-medium text-navy-900">
            “I found my room in Amsterdam two weeks before my internship started — and my flatmates are now my best friends.”
          </blockquote>
          <figcaption className="mt-3 text-sm text-navy-500">Julia, design intern from Lyon</figcaption>
        </figure>
      </div>
    </div>);

}