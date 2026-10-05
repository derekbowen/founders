import React, { FormEvent, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { InfoIcon, Loader2Icon } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { demoCredentials } from "../data/currentUser";
import { AuthShell } from "../components/auth/AuthShell";
import { TextField } from "../components/ui/TextField";
import { Button } from "../components/ui/Button";

export function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as {from?: string;} | null)?.from ?? "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{email?: string;password?: string;}>({});
  const [loading, setLoading] = useState(false);

  if (user && !loading) return <Navigate to={from} replace />;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errs: typeof errors = {};
    if (!/^\S+@\S+\.\S+$/.test(email)) errs.email = "Enter a valid email address.";
    if (password.length < 6) errs.password = "Password must be at least 6 characters.";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setLoading(true);
    window.setTimeout(() => {
      login(email);
      navigate(from, { replace: true });
    }, 500);
  };

  const fillDemo = () => {
    setEmail(demoCredentials.email);
    setPassword(demoCredentials.password);
    setErrors({});
  };

  return (
    <AuthShell title="Welcome back" subtitle="Log in to message vendors and manage your inquiries." quote="We found our entire vendor team in one weekend.">
      <div className="mb-6 flex items-start gap-3 rounded-2xl border border-gold/40 bg-gold/10 p-4 text-sm text-ink">
        <InfoIcon aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" />
        <div>
          <p>Demo account — Emma is planning her wedding <em>and</em> runs a floral studio.</p>
          <button type="button" onClick={fillDemo} className="mt-1 font-medium text-primary underline-offset-4 hover:underline">
            Use demo credentials
          </button>
        </div>
      </div>
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <TextField label="Email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} />
        <TextField label="Password" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} error={errors.password} />
        <Button type="submit" fullWidth size="lg" disabled={loading}>
          {loading && <Loader2Icon aria-hidden="true" className="h-4 w-4 animate-spin" />}
          {loading ? "Logging in…" : "Log in"}
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-muted">
        New here?{" "}
        <Link to="/signup" state={location.state} className="font-medium text-primary underline-offset-4 hover:underline">
          Create an account
        </Link>
      </p>
    </AuthShell>);

}