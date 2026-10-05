import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useToast } from '../components/ToastProvider';
import { AuthShell } from '../components/auth/AuthShell';
import { useAuth } from '../contexts/AuthContext';
import { brandButton } from '../utils/buttonStyles';

interface LocationState {
  from?: string;
  fromState?: unknown;
}

export function LoginPage() {
  const { signIn, user } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const state = useLocation().state as LocationState | null ?? {};
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{email?: string;password?: string;}>({});
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = 'Enter a valid email address';
    if (password.length < 8) next.password = 'Password must be at least 8 characters';
    setErrors(next);
    if (Object.keys(next).length) return;
    setLoading(true);
    window.setTimeout(() => {
      signIn();
      addToast({ type: 'success', message: `Welcome back, ${user.firstName}!` });
      navigate(state.from && state.from !== '/login' ? state.from : '/inbox', { replace: true, state: state.fromState });
    }, 700);
  };

  return (
    <AuthShell title="Welcome back" subtitle="Log in to manage lessons, messages and payments.">
      <form onSubmit={submit} noValidate className="space-y-5">
        <Input id="login-email" type="email" label="Email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} />
        <div>
          <Input
            id="login-password"
            type="password"
            label="Password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            helperText="Demo: any password with 8+ characters" />
          
          <button
            type="button"
            onClick={() => addToast({ type: 'info', message: `Password reset link sent to ${email || 'your email'}` })}
            className="mt-2 text-sm font-medium text-primary-700 hover:text-primary-800">
            
            Forgot password?
          </button>
        </div>
        <Button type="submit" size="large" loading={loading} className={`w-full ${brandButton.primary}`}>
          Log in
        </Button>
        <p className="text-center text-sm text-ink-600">
          New here?{' '}
          <Link to="/signup" state={state} className="font-medium text-primary-700 hover:text-primary-800">
            Create an account
          </Link>
        </p>
      </form>
    </AuthShell>);

}