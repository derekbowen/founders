import React, { FormEvent, useState } from "react";
import { CheckCircle2Icon } from "lucide-react";
import { TextField } from "../ui/TextField";
import { Button } from "../ui/Button";

type PasswordErrors = Partial<Record<"current" | "next" | "confirm", string>>;

export function PasswordForm() {
  const [values, setValues] = useState({ current: "", next: "", confirm: "" });
  const [errors, setErrors] = useState<PasswordErrors>({});
  const [saved, setSaved] = useState(false);

  const set = (key: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    setSaved(false);
  };

  const strength = values.next.length === 0 ? 0 : values.next.length < 8 ? 1 : /\d/.test(values.next) && /[^A-Za-z0-9]/.test(values.next) ? 3 : 2;
  const strengthLabel = ["", "Too short", "Good", "Strong"][strength];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errs: PasswordErrors = {};
    if (values.current.length < 6) errs.current = "Enter your current password.";
    if (values.next.length < 8) errs.next = "Use at least 8 characters.";else
    if (values.next === values.current) errs.next = "Choose a password you haven't used here.";
    if (values.confirm !== values.next) errs.confirm = "Passwords don't match.";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setValues({ current: "", next: "", confirm: "" });
    setSaved(true);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div>
        <h2 className="font-display text-3xl font-semibold text-ink">Password</h2>
        <p className="mt-1 text-sm text-muted">Use a unique password with at least 8 characters.</p>
      </div>
      <TextField label="Current password" type="password" autoComplete="current-password" value={values.current} onChange={set("current")} error={errors.current} />
      <div>
        <TextField label="New password" type="password" autoComplete="new-password" value={values.next} onChange={set("next")} error={errors.next} />
        {strength > 0 &&
        <div className="mt-2 flex items-center gap-2" aria-live="polite">
            <div className="flex flex-1 gap-1" aria-hidden="true">
              {[1, 2, 3].map((i) =>
            <span key={i} className={`h-1 flex-1 rounded-full ${i <= strength ? strength === 1 ? "bg-danger" : strength === 2 ? "bg-gold" : "bg-success" : "bg-line"}`} />
            )}
            </div>
            <span className="text-xs text-muted">{strengthLabel}</span>
          </div>
        }
      </div>
      <TextField label="Confirm new password" type="password" autoComplete="new-password" value={values.confirm} onChange={set("confirm")} error={errors.confirm} />
      <div className="flex items-center gap-4 pt-2">
        <Button type="submit">Update password</Button>
        <p aria-live="polite" className="flex items-center gap-1.5 text-sm text-success">
          {saved && <><CheckCircle2Icon aria-hidden="true" className="h-4 w-4" />Password updated</>}
        </p>
      </div>
    </form>);

}