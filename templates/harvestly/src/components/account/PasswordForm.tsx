import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/Button";
import { TextField } from "../ui/TextField";

export function PasswordForm() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const strength = [next.length >= 8, /[A-Z]/.test(next), /\d/.test(next), /[^A-Za-z0-9]/.test(next)].filter(Boolean).length;
  const strengthLabel = ["Too short", "Weak", "Fair", "Good", "Strong"][strength];

  function save(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!current) errs.current = "Enter your current password";
    if (next.length < 8) errs.next = "At least 8 characters";
    if (confirm !== next) errs.confirm = "Passwords don't match";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setCurrent("");
    setNext("");
    setConfirm("");
    toast.success("Password updated");
  }

  return (
    <form onSubmit={save} className="max-w-lg space-y-5" noValidate>
      <TextField label="Current password" type="password" autoComplete="current-password" value={current} onChange={(e) => setCurrent(e.target.value)} error={errors.current} />
      <div>
        <TextField label="New password" type="password" autoComplete="new-password" value={next} onChange={(e) => setNext(e.target.value)} error={errors.next} />
        {next &&
        <div className="mt-2 flex items-center gap-2" aria-live="polite">
            <div className="flex flex-1 gap-1" aria-hidden="true">
              {[0, 1, 2, 3].map((i) =>
            <span key={i} className={`h-1.5 flex-1 rounded-full ${i < strength ? strength >= 3 ? "bg-primary" : "bg-accent" : "bg-line"}`} />
            )}
            </div>
            <span className="text-xs text-muted">{strengthLabel}</span>
          </div>
        }
      </div>
      <TextField label="Confirm new password" type="password" autoComplete="new-password" value={confirm} onChange={(e) => setConfirm(e.target.value)} error={errors.confirm} />
      <Button type="submit">Update password</Button>
    </form>);

}