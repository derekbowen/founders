import React, { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { brand } from '../data/brand';
import { currentUser } from '../data/currentUser';
import { useAuth } from '../contexts/AuthContext';
import { AuthLayout } from '../components/auth/AuthLayout';
import { Button } from '../components/ui/Button';
import { TextField } from '../components/ui/TextField';

export function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as {from?: string;} | null)?.from ?? '/';
  const [email, setEmail] = useState(currentUser.email);
  const [password, setPassword] = useState('handmade123');
  const [errors, setErrors] = useState<{email?: string;password?: string;}>({});
  const [loading, setLoading] = useState(false);

  if (user) return <Navigate to={from} replace />;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: typeof errors = {};
    if (!/^\S+@\S+\.\S+$/.test(email)) errs.email = 'Enter a valid email address';
    if (password.length < 6) errs.password = 'Password must be at least 6 characters';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    login(email);
    toast.success(`Welcome back to ${brand.name}`);
    navigate(from, { replace: true });
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle={
      <>
          New to {brand.name}? <Link to="/signup" state={location.state} className="font-medium text-primary-ink hover:underline">Create an account</Link>
        </>
      }>
      
      <form onSubmit={submit} noValidate className="space-y-5">
        <TextField label="Email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} />
        <div>
          <TextField label="Password" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} error={errors.password} />
          <button type="button" onClick={() => toast(`We’ve sent a reset link to ${email || 'your email'}.`)} className="mt-2 text-xs font-medium text-primary-ink hover:underline">
            Forgot password?
          </button>
        </div>
        <Button type="submit" size="lg" className="w-full" loading={loading}>
          Log in
        </Button>
        <p className="rounded-xl bg-accent-soft px-4 py-3 text-xs text-accent-ink">
          Demo account is pre-filled — you’ll sign in as {currentUser.firstName}, owner of the Juniper Kiln shop.
        </p>
      </form>
    </AuthLayout>);

}