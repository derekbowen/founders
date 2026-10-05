import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { MailIcon } from 'lucide-react';
import { AuthShell } from '../../components/auth/AuthShell';
import { TextField } from '../../components/ui/TextField';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';

export function Login() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const redirect = params.get('redirect') ?? '/';
  const [email, setEmail] = useState('');
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
      signIn(email);
      navigate(redirect);
    }, 700);
  };

  return (
    <AuthShell title="Welcome back" subtitle="Log in to manage your trips and messages.">
      <form onSubmit={submit} noValidate className="space-y-5">
        <TextField label="Email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} startIcon={<MailIcon className="h-4 w-4" />} />
        <TextField label="Password" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} error={errors.password} />
        <div className="flex justify-end">
          <button type="button" className="text-sm font-semibold text-accent-700 hover:text-accent-800">Forgot password?</button>
        </div>
        <Button type="submit" size="lg" fullWidth loading={loading}>Log in</Button>
        <button
          type="button"
          onClick={() => {signIn('');navigate(redirect);}}
          className="w-full rounded-full border border-dashed border-slate-300 py-3 text-sm font-medium text-slate-700 hover:bg-sand-100">
          
          Continue with demo account
        </button>
      </form>
      <p className="mt-8 text-center text-sm text-slate-600">
        New here? <Link to={`/signup${params.toString() ? `?${params}` : ''}`} className="font-semibold text-primary-700 hover:text-primary-800">Create an account</Link>
      </p>
    </AuthShell>);

}