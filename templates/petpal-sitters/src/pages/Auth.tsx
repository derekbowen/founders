import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MailIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../components/ui/Button';
import { CheckboxField } from '../components/ui/CheckboxField';
import { TextField } from '../components/ui/TextField';
import { useAuth } from '../contexts/AuthContext';
import { brand } from '../data/brand';
import { currentUser } from '../data/content';
import { images } from '../data/images';
import { cn } from '../utils/cn';

interface AuthProps {
  mode: 'login' | 'signup';
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Auth({ mode }: AuthProps) {
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as {from?: string;} | null)?.from ?? '/';

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState(mode === 'login' ? currentUser.email : '');
  const [password, setPassword] = useState(mode === 'login' ? 'pawsome123' : '');
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const finish = (fn: () => void, message: string) => {
    setLoading(true);
    window.setTimeout(() => {
      fn();
      toast.success(message);
      navigate(from, { replace: true });
    }, 700);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!emailPattern.test(email)) next.email = 'Enter a valid email address.';
    if (password.length < 8) next.password = 'Password must be at least 8 characters.';
    if (mode === 'signup') {
      if (!firstName.trim()) next.firstName = 'First name is required.';
      if (!lastName.trim()) next.lastName = 'Last name is required.';
      if (!terms) next.terms = 'You need to accept the terms to sign up.';
    }
    setErrors(next);
    if (Object.keys(next).length) return;
    if (mode === 'login') finish(() => login(email), 'Welcome back!');else
    finish(() => signup(firstName.trim(), lastName.trim(), email), `Welcome to ${brand.name}, ${firstName.trim()}!`);
  };

  const tabCls = (active: boolean) =>
  cn('flex-1 rounded-full py-2.5 text-center text-[15px] font-extrabold transition-colors', active ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-800');

  return (
    <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-16">
      <div className="mx-auto w-full max-w-md">
        <h1 className="text-3xl font-black tracking-tight text-stone-900">{mode === 'login' ? 'Welcome back' : `Join ${brand.name}`}</h1>
        <p className="mt-2 text-[15px] text-stone-600">
          {mode === 'login' ? 'Log in to manage bookings and message sitters.' : 'Create a free account to book sitters or start sitting.'}
        </p>

        <div className="mt-6 flex rounded-full bg-stone-100 p-1" role="tablist" aria-label="Authentication">
          <Link to="/signup" state={location.state} role="tab" aria-selected={mode === 'signup'} className={tabCls(mode === 'signup')}>
            Sign up
          </Link>
          <Link to="/login" state={location.state} role="tab" aria-selected={mode === 'login'} className={tabCls(mode === 'login')}>
            Log in
          </Link>
        </div>

        <form onSubmit={submit} className="mt-6 space-y-4" noValidate>
          {mode === 'signup' &&
          <div className="grid gap-4 sm:grid-cols-2">
              <TextField id="first-name" label="First name" autoComplete="given-name" value={firstName} onChange={(e) => setFirstName(e.target.value)} error={errors.firstName} />
              <TextField id="last-name" label="Last name" autoComplete="family-name" value={lastName} onChange={(e) => setLastName(e.target.value)} error={errors.lastName} />
            </div>
          }
          <TextField id="email" label="Email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} />
          <TextField
            id="password"
            label="Password"
            type="password"
            autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            hint={mode === 'signup' ? 'At least 8 characters.' : undefined} />
          
          {mode === 'login' ?
          <div className="flex justify-end">
              <button type="button" onClick={() => toast.info(`Reset link sent to ${email || 'your email'}`)} className="text-sm font-bold text-primary-700 hover:underline">
                Forgot password?
              </button>
            </div> :

          <div>
              <CheckboxField
              id="terms"
              checked={terms}
              onChange={setTerms}
              label={
              <>
                    I accept the{' '}
                    <Link to="/terms" className="text-primary-700 underline">
                      Terms of service
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-primary-700 underline">
                      Privacy policy
                    </Link>
                  </>
              } />
            
              {errors.terms && <p className="mt-1.5 text-sm font-semibold text-red-600">{errors.terms}</p>}
            </div>
          }
          <Button type="submit" size="lg" fullWidth loading={loading}>
            {mode === 'login' ? 'Log in' : 'Create account'}
          </Button>
        </form>

        <div className="my-6 flex items-center gap-3 text-sm font-semibold text-stone-400">
          <span className="h-px flex-1 bg-stone-200" /> or <span className="h-px flex-1 bg-stone-200" />
        </div>
        <Button variant="secondary" size="lg" fullWidth leftIcon={<MailIcon className="h-4 w-4" />} onClick={() => finish(() => login(currentUser.email), 'Welcome back!')}>
          Continue with email link
        </Button>
        {mode === 'login' && <p className="mt-4 text-center text-xs font-semibold text-stone-500">Demo account details are pre-filled.</p>}
      </div>

      <div className="relative hidden overflow-hidden rounded-[2.5rem] lg:block">
        <img src={images.covers[0]} alt="A golden retriever relaxing on a cozy sofa" className="h-full w-full object-cover" />
        <div className="absolute inset-x-6 bottom-6 rounded-3xl bg-white/95 p-6 shadow-lift">
          <p className="text-lg font-extrabold leading-snug text-stone-900">“Maya sent photos every morning. I actually enjoyed my vacation for once.”</p>
          <p className="mt-2 text-sm font-semibold text-stone-500">Hannah L. · Juniper’s mom</p>
        </div>
      </div>
    </div>);

}