import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../components/Input';
import { Checkbox } from '../components/Checkbox';
import { AuthShell } from '../components/auth/AuthShell';
import { useStore } from '../contexts/StoreContext';

export function Login() {
  const { signIn } = useStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{email?: string;password?: string;}>({});
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'Enter a valid email address.';
    if (password.length < 6) next.password = 'Password must be at least 6 characters.';
    setErrors(next);
    if (Object.keys(next).length) return;
    setLoading(true);
    window.setTimeout(() => {
      signIn(email);
      navigate('/inbox');
    }, 700);
  };

  return (
    <AuthShell title="Welcome back" subtitle="Log in to download your files and manage your shop.">
      <button type="button" onClick={() => {signIn('');navigate('/inbox');}} className="btn btn-outline w-full">
        <span className="font-display font-bold" aria-hidden="true">G</span>
        Continue with Google
      </button>
      <div className="my-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-muted">
        <span className="h-px flex-1 bg-line" />
        or
        <span className="h-px flex-1 bg-line" />
      </div>
      <form onSubmit={submit} noValidate className="space-y-4">
        <Input id="login-email" type="email" label="Email" autoComplete="email" value={email} error={errors.email} onChange={(e) => setEmail(e.target.value)} />
        <Input id="login-password" type="password" label="Password" autoComplete="current-password" value={password} error={errors.password} onChange={(e) => setPassword(e.target.value)} />
        <div className="flex items-center justify-between">
          <Checkbox label="Remember me" defaultChecked />
          <button type="button" className="text-sm font-semibold text-brand-ink hover:underline">
            Forgot password?
          </button>
        </div>
        <button type="submit" disabled={loading} className="btn btn-ink btn-lg w-full">
          {loading ? 'Logging in…' : 'Log in'}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-muted">
        New here?{' '}
        <Link to="/signup" className="link">
          Create an account
        </Link>
      </p>
    </AuthShell>);

}