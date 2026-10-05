import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Input } from '../components/Input';
import { Checkbox } from '../components/Checkbox';
import { AuthShell } from '../components/auth/AuthShell';
import { BrandButton } from '../components/ui/BrandButton';
import { useAuth } from '../contexts/AuthContext';

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as {from?: string;} | null)?.from ?? '/inbox';
  const [email, setEmail] = useState('maya@lindqvist.studio');
  const [password, setPassword] = useState('deskhop-demo');
  const [errors, setErrors] = useState<{email?: string;password?: string;}>({});
  const [loading, setLoading] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next: typeof errors = {};
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = 'Enter a valid email address.';
    if (password.length < 6) next.password = 'Password must be at least 6 characters.';
    setErrors(next);
    if (Object.keys(next).length) return;
    setLoading(true);
    window.setTimeout(() => {
      login();
      navigate(from, { replace: true });
    }, 600);
  }

  return (
    <AuthShell
      title="Welcome back"
      subtitle={
      <>
          New here? <Link to="/signup" state={{ from }} className="link">Create an account</Link>
        </>
      }>
      
      <form onSubmit={onSubmit} noValidate className="space-y-5">
        <Input id="login-email" label="Email" type="email" autoComplete="email" value={email} error={errors.email} onChange={(e) => setEmail(e.target.value)} />
        <Input id="login-password" label="Password" type="password" autoComplete="current-password" value={password} error={errors.password} onChange={(e) => setPassword(e.target.value)} />
        <div className="flex items-center justify-between">
          <Checkbox label="Keep me signed in" defaultChecked />
          <a href="mailto:hello@deskhop.co?subject=Password%20reset" className="link text-sm">Forgot password?</a>
        </div>
        <BrandButton type="submit" size="large" fullWidth loading={loading}>
          Log in
        </BrandButton>
        <p className="rounded-lg bg-mist px-3 py-2 text-center text-xs text-ink-muted">
          Demo account is pre-filled — just press Log in.
        </p>
      </form>
    </AuthShell>);

}