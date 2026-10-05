import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { BabyIcon, HeartHandshakeIcon, CheckIcon } from 'lucide-react';
import { Input } from '../components/Input';
import { Checkbox } from '../components/Checkbox';
import { useToast } from '../components/ToastProvider';
import { BrandButton } from '../components/ui/BrandButton';
import { useSession, UserType } from '../contexts/SessionContext';
import { brand } from '../data/brand';

interface AuthProps {
  mode: 'login' | 'signup';
}

const userTypes: {id: UserType;title: string;text: string;icon: React.ElementType;}[] = [
{ id: 'parent', title: 'I’m a parent', text: 'Find and book trusted sitters', icon: BabyIcon },
{ id: 'sitter', title: 'I’m a sitter', text: 'Get booked by local families', icon: HeartHandshakeIcon }];


const HERO = "/f77a6267-12bc-412e-9610-507f98d3360f.jpg";

export function Auth({ mode }: AuthProps) {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useSession();
  const { addToast } = useToast();
  const [type, setType] = useState<UserType>(params.get('type') === 'sitter' ? 'sitter' : 'parent');
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const isSignup = mode === 'signup';

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const err: Record<string, string> = {};
    if (isSignup && !form.firstName.trim()) err.firstName = 'Required';
    if (isSignup && !form.lastName.trim()) err.lastName = 'Required';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = 'Enter a valid email address';
    if (form.password.length < 8) err.password = 'Password must be at least 8 characters';
    if (isSignup && !terms) err.terms = 'Please accept the terms to continue';
    setErrors(err);
    if (Object.keys(err).length) {
      document.getElementById(`auth-${Object.keys(err)[0]}`)?.focus();
      return;
    }
    setLoading(true);
    window.setTimeout(() => {
      login(isSignup ? { firstName: form.firstName, lastName: form.lastName, email: form.email, type } : { email: form.email });
      addToast({ type: 'success', message: isSignup ? `Welcome to ${brand.name}, ${form.firstName}!` : 'Welcome back!' });
      navigate(isSignup && type === 'sitter' ? '/listings/new' : isSignup ? '/s' : '/inbox');
    }, 800);
  };

  return (
    <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-2">
      <div className="flex items-center justify-center px-4 py-12 sm:px-6">
        <div className="w-full max-w-md">
          <h1 className="font-heading text-3xl font-bold text-ink-900">{isSignup ? `Join ${brand.name}` : 'Welcome back'}</h1>
          <p className="mt-2 text-ink-600">
            {isSignup ? 'Already have an account? ' : 'New here? '}
            <Link to={isSignup ? '/login' : '/signup'} className="font-semibold text-primary-700 hover:underline">
              {isSignup ? 'Log in' : 'Create an account'}
            </Link>
          </p>

          <form onSubmit={submit} noValidate className="mt-8 space-y-5">
            {isSignup &&
            <fieldset>
                <legend className="mb-2 text-sm font-medium text-ink-800">I’m joining as</legend>
                <div className="grid grid-cols-2 gap-3" role="radiogroup">
                  {userTypes.map((u) => {
                  const on = type === u.id;
                  return (
                    <button
                      key={u.id}
                      type="button"
                      role="radio"
                      aria-checked={on}
                      onClick={() => setType(u.id)}
                      className={`relative rounded-2xl p-4 text-left ring-1 transition ${on ? 'bg-primary-50 ring-2 ring-primary-500' : 'bg-white ring-ink-200 hover:ring-ink-400'}`}>
                      
                        {on && <CheckIcon className="absolute right-3 top-3 h-4 w-4 text-primary-700" aria-hidden />}
                        <u.icon className={`h-6 w-6 ${on ? 'text-primary-700' : 'text-ink-500'}`} aria-hidden />
                        <p className="mt-2 text-sm font-bold text-ink-900">{u.title}</p>
                        <p className="text-xs text-ink-600">{u.text}</p>
                      </button>);

                })}
                </div>
              </fieldset>
            }
            {isSignup &&
            <div className="grid grid-cols-2 gap-3">
                <Input id="auth-firstName" label="First name" autoComplete="given-name" value={form.firstName} error={errors.firstName} onChange={set('firstName')} />
                <Input id="auth-lastName" label="Last name" autoComplete="family-name" value={form.lastName} error={errors.lastName} onChange={set('lastName')} />
              </div>
            }
            <Input id="auth-email" label="Email" type="email" autoComplete="email" value={form.email} error={errors.email} onChange={set('email')} />
            <Input id="auth-password" label="Password" type="password" autoComplete={isSignup ? 'new-password' : 'current-password'} value={form.password} error={errors.password} helperText={isSignup ? 'At least 8 characters' : undefined} onChange={set('password')} />
            {!isSignup &&
            <div className="-mt-2 text-right">
                <button type="button" onClick={() => addToast({ type: 'info', message: 'Password reset link sent if the account exists.' })} className="text-sm font-semibold text-primary-700 hover:underline">
                  Forgot password?
                </button>
              </div>
            }
            {isSignup &&
            <div>
                <Checkbox
                id="auth-terms"
                checked={terms}
                error={!!errors.terms}
                onChange={(e) => setTerms(e.target.checked)}
                label={<span className="text-sm text-ink-700">I agree to the <Link to="/terms" className="font-semibold text-primary-700 underline">Terms</Link> and <Link to="/privacy" className="font-semibold text-primary-700 underline">Privacy Policy</Link></span>} />
              
                {errors.terms && <p role="alert" className="mt-1.5 text-xs font-medium text-red-600">{errors.terms}</p>}
              </div>
            }
            <BrandButton type="submit" size="lg" fullWidth loading={loading}>
              {isSignup ? type === 'sitter' ? 'Create sitter account' : 'Create parent account' : 'Log in'}
            </BrandButton>
            <div className="relative py-1 text-center text-xs text-ink-500">
              <span className="absolute inset-x-0 top-1/2 h-px bg-ink-200" aria-hidden />
              <span className="relative bg-ink-50 px-3">or</span>
            </div>
            <BrandButton type="button" tone="outline" size="lg" fullWidth onClick={() => {login({ type });navigate('/s');}}>
              Continue with Google
            </BrandButton>
          </form>
        </div>
      </div>
      <div className="relative hidden lg:block">
        <img src={HERO} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-x-8 bottom-8 rounded-3xl bg-white/95 p-6 shadow-lift">
          <p className="font-heading text-lg font-bold text-ink-900">“We finally have date nights again. Booking takes two minutes and every sitter has been wonderful.”</p>
          <p className="mt-2 text-sm text-ink-600">Jessica M. · Hyde Park parent</p>
        </div>
      </div>
    </div>);

}