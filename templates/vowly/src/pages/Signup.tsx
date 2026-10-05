import React, { FormEvent, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HeartIcon, Loader2Icon, StoreIcon } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { images } from "../data/images";
import { AuthShell } from "../components/auth/AuthShell";
import { TextField } from "../components/ui/TextField";
import { Button } from "../components/ui/Button";
import type { ParticipantRole } from "../types/marketplace";

type SignupErrors = Partial<Record<"firstName" | "lastName" | "email" | "password" | "terms", string>>;

const accountTypes: {id: ParticipantRole;title: string;description: string;icon: typeof HeartIcon;}[] = [
{ id: "couple", title: "We're getting married", description: "Find and message vendors", icon: HeartIcon },
{ id: "vendor", title: "I'm a wedding pro", description: "List my business", icon: StoreIcon }];


export function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as {from?: string;} | null)?.from;
  const [accountType, setAccountType] = useState<ParticipantRole>("couple");
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "" });
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState<SignupErrors>({});
  const [loading, setLoading] = useState(false);

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errs: SignupErrors = {};
    if (!form.firstName.trim()) errs.firstName = "Required";
    if (!form.lastName.trim()) errs.lastName = "Required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = "Enter a valid email address.";
    if (form.password.length < 8) errs.password = "Use at least 8 characters.";
    if (!terms) errs.terms = "Please accept the terms to continue.";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setLoading(true);
    window.setTimeout(() => {
      signup({ firstName: form.firstName.trim(), lastName: form.lastName.trim(), email: form.email, accountType });
      navigate(from ?? (accountType === "vendor" ? "/listings/new" : "/search"), { replace: true });
    }, 500);
  };

  return (
    <AuthShell title="Create your account" subtitle="Free for couples and vendors. No payments, ever." image={images.gardenWedding} quote="Every vendor we booked came from a single afternoon on Vowly.">
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <fieldset>
          <legend className="mb-2 text-sm font-medium text-ink">I'm joining as…</legend>
          <div className="grid grid-cols-2 gap-3">
            {accountTypes.map((t) => {
              const selected = accountType === t.id;
              return (
                <label
                  key={t.id}
                  className={`flex cursor-pointer flex-col rounded-2xl border p-4 transition-colors focus-within:ring-2 focus-within:ring-primary ${
                  selected ? "border-primary bg-primary/5" : "border-line bg-surface hover:border-ink/25"}`
                  }>
                  
                  <input type="radio" name="accountType" value={t.id} checked={selected} onChange={() => setAccountType(t.id)} className="sr-only" />
                  <t.icon aria-hidden="true" className={`h-5 w-5 ${selected ? "text-primary" : "text-muted"}`} />
                  <span className="mt-2 text-sm font-semibold text-ink">{t.title}</span>
                  <span className="text-xs text-muted">{t.description}</span>
                </label>);

            })}
          </div>
        </fieldset>
        <div className="grid grid-cols-2 gap-3">
          <TextField label="First name" autoComplete="given-name" value={form.firstName} onChange={set("firstName")} error={errors.firstName} />
          <TextField label="Last name" autoComplete="family-name" value={form.lastName} onChange={set("lastName")} error={errors.lastName} />
        </div>
        <TextField label="Email" type="email" autoComplete="email" value={form.email} onChange={set("email")} error={errors.email} />
        <TextField label="Password" type="password" autoComplete="new-password" hint="At least 8 characters" value={form.password} onChange={set("password")} error={errors.password} />
        <div>
          <label className="flex items-start gap-3 text-sm text-ink">
            <input type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)} className="mt-0.5 h-4 w-4 rounded accent-primary" aria-invalid={errors.terms ? true : undefined} />
            <span>
              I agree to the <Link to="/terms" className="font-medium text-primary underline-offset-4 hover:underline">Terms of service</Link> and{" "}
              <Link to="/privacy" className="font-medium text-primary underline-offset-4 hover:underline">Privacy policy</Link>.
            </span>
          </label>
          {errors.terms && <p className="mt-1.5 text-xs text-danger">{errors.terms}</p>}
        </div>
        <Button type="submit" fullWidth size="lg" disabled={loading}>
          {loading && <Loader2Icon aria-hidden="true" className="h-4 w-4 animate-spin" />}
          {loading ? "Creating account…" : "Sign up"}
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-muted">
        Already have an account?{" "}
        <Link to="/login" state={location.state} className="font-medium text-primary underline-offset-4 hover:underline">Log in</Link>
      </p>
    </AuthShell>);

}