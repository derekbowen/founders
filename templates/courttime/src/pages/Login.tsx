import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Input } from '../components/Input';
import { LoadingSpinner } from '../components/Button';
import { useToast } from '../components/ToastProvider';
import { AuthShell } from '../components/auth/AuthShell';
import { useAuth } from '../contexts/AuthContext';

export function Login() {
  const { login } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const redirect = params.get('redirect') ?? '/';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{email?: string;password?: string;}>({});
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = 'Enter a valid email address.';
    if (password.length < 6) next.password = 'Password must be at least 6 characters.';
    setErrors(next);
    if (Object.keys(next).length) return;
    setLoading(true);
    window.setTimeout(() => {
      login();
      addToast({ type: 'success', message: 'Welcome back, Jordan!' });
      navigate(redirect);
    }, 700);
  };

  return (
    <AuthShell
      title="Log in"
      subtitle={redirect === '/checkout' ? 'Log in to finish booking your court.' : 'Welcome back — let’s get you on court.'}
      footer={<>New here? <Link to={`/signup${redirect !== '/' ? `?redirect=${redirect}` : ''}`} className="font-semibold text-brand hover:underline">Create an account</Link></>}>
      
      <form onSubmit={onSubmit} noValidate className="space-y-4">
        <Input id="login-email" type="email" label="Email" autoComplete="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} />
        <Input id="login-password" type="password" label="Password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} error={errors.password} />
        <div className="text-right">
          <Link to="/account/password" className="text-sm font-medium text-brand hover:underline">Forgot password?</Link>
        </div>
        <button type="submit" disabled={loading} className="btn btn-primary btn-lg w-full">
          {loading ? <><LoadingSpinner className="h-4 w-4" /> Logging in…</> : 'Log in'}
        </button>
        <p className="text-center text-xs text-slate-500">Demo: any valid email and 6+ character password works.</p>
      </form>
    </AuthShell>);

}