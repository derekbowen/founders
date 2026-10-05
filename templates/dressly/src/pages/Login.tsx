import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../components/Input';
import { AuthLayout } from '../components/auth/AuthLayout';
import { useAuth } from '../contexts/AuthContext';
import { brand } from '../data/brand';
import { btn } from '../utils/styles';

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('olivia@example.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@') || password.length < 6) {
      setError('Enter a valid email and a password of at least 6 characters.');
      return;
    }
    setError('');
    setLoading(true);
    setTimeout(() => {
      login();
      navigate('/inbox');
    }, 700);
  };

  return (
    <AuthLayout title="Welcome back" subtitle={`Log in to manage your rentals and closet on ${brand.name}.`}>
      <form onSubmit={submit} className="space-y-5" noValidate>
        <Input id="login-email" label="Email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input id="login-password" label="Password" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 6 characters" />
        {error && <p role="alert" className="text-sm text-[#9b2c2c]">{error}</p>}
        <div className="flex justify-end">
          <button type="button" className="text-xs text-accent-dark underline underline-offset-4">Forgot password?</button>
        </div>
        <button type="submit" disabled={loading} className={btn('primary', 'lg', 'w-full')}>
          {loading ? 'Logging in…' : 'Log in'}
        </button>
      </form>
      <div className="my-6 flex items-center gap-4 text-xs text-muted">
        <span className="h-px flex-1 bg-line" /> or <span className="h-px flex-1 bg-line" />
      </div>
      <div className="grid gap-3">
        <button type="button" onClick={() => {login();navigate('/inbox');}} className={btn('outline', 'lg')}>Continue with Google</button>
        <button type="button" onClick={() => {login();navigate('/inbox');}} className={btn('outline', 'lg')}>Continue with Apple</button>
      </div>
      <p className="mt-8 text-center text-sm text-muted">
        New to {brand.name}? <Link to="/signup" className="font-medium text-ink underline underline-offset-4">Create an account</Link>
      </p>
    </AuthLayout>);

}