import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";
import { Logo } from "../components/layout/Logo";
import { Button } from "../components/ui/Button";
import { TextField } from "../components/ui/TextField";
import { demoUser, useAuth } from "../contexts/AuthContext";
import { brand } from "../data/brand";
import { images } from "../data/images";

export function Auth({ mode }: {mode: "login" | "signup";}) {
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as {from?: string;} | null)?.from ?? "/";
  const isLogin = mode === "login";

  const [name, setName] = useState("");
  const [email, setEmail] = useState(isLogin ? demoUser.email : "");
  const [password, setPassword] = useState(isLogin ? "harvest2026" : "");
  const [accept, setAccept] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!isLogin && name.trim().length < 2) errs.name = "Enter your name";
    if (!/^\S+@\S+\.\S+$/.test(email)) errs.email = "Enter a valid email";
    if (password.length < 8) errs.password = "At least 8 characters";
    if (!isLogin && !accept) errs.accept = "Please accept the terms to continue";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    if (isLogin) login(email);else
    signup(name.trim(), email);
    toast.success(isLogin ? "Welcome back!" : `Welcome to ${brand.name}!`);
    navigate(from, { replace: true });
  }

  return (
    <div className="grid min-h-[calc(100vh-72px)] lg:grid-cols-2">
      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <h1 className="font-display text-4xl font-semibold text-ink">{isLogin ? "Welcome back" : "Join the harvest"}</h1>
          <p className="mt-2 text-muted">
            {isLogin ? "Log in to see your orders and messages." : "Buy from local farms — or start selling your own."}
          </p>

          <div className="mt-6 flex rounded-full bg-ink/5 p-1" role="tablist">
            <Link
              to="/login"
              state={location.state}
              role="tab"
              aria-selected={isLogin}
              className={`flex-1 rounded-full py-2 text-center text-sm font-semibold ${isLogin ? "bg-white text-ink shadow-card" : "text-muted"}`}>
              
              Log in
            </Link>
            <Link
              to="/signup"
              state={location.state}
              role="tab"
              aria-selected={!isLogin}
              className={`flex-1 rounded-full py-2 text-center text-sm font-semibold ${!isLogin ? "bg-white text-ink shadow-card" : "text-muted"}`}>
              
              Sign up
            </Link>
          </div>

          <form onSubmit={submit} className="mt-6 space-y-4" noValidate>
            {!isLogin && <TextField label="Full name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} error={errors.name} />}
            <TextField label="Email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} />
            <TextField
              label="Password"
              type="password"
              autoComplete={isLogin ? "current-password" : "new-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              hint={isLogin ? undefined : "At least 8 characters"} />
            
            {isLogin &&
            <div className="text-right">
                <button type="button" onClick={() => toast("Password reset link sent to your email.")} className="text-sm font-semibold text-primary hover:underline">
                  Forgot password?
                </button>
              </div>
            }
            {!isLogin &&
            <div>
                <label className="flex items-start gap-2.5 text-sm text-muted">
                  <input type="checkbox" checked={accept} onChange={(e) => setAccept(e.target.checked)} className="mt-0.5 h-4 w-4 rounded border-line accent-[rgb(var(--c-primary))]" />
                  <span>
                    I accept the{" "}
                    <Link to="/terms" className="font-semibold text-primary hover:underline">
                      Terms of service
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="font-semibold text-primary hover:underline">
                      Privacy policy
                    </Link>
                  </span>
                </label>
                {errors.accept && <p className="mt-1.5 text-xs font-medium text-danger">{errors.accept}</p>}
              </div>
            }
            <Button type="submit" fullWidth size="lg" disabled={loading}>
              {loading && <Loader2Icon className="h-4 w-4 animate-spin" aria-hidden="true" />}
              {isLogin ? "Log in" : "Create account"}
            </Button>
          </form>
          {isLogin && <p className="mt-4 rounded-xl bg-primary-soft/60 p-3 text-xs text-primary-dark">Demo account pre-filled — just press Log in.</p>}
        </div>
      </div>
      <div className="relative hidden lg:block">
        <img src={images.farmVeg} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-primary-dark/30" aria-hidden="true" />
        <div className="absolute bottom-10 left-10 right-10 rounded-2xl bg-paper/95 p-6">
          <Logo />
          <p className="mt-3 font-display text-xl text-ink">“Our Tuesday pickup has become the best part of the week.”</p>
          <p className="mt-2 text-sm text-muted">— Claire M., Kingston</p>
        </div>
      </div>
    </div>);

}