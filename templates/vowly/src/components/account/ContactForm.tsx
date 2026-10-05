import React, { FormEvent, useState } from "react";
import { CheckCircle2Icon } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { TextField } from "../ui/TextField";
import { Button } from "../ui/Button";

export function ContactForm() {
  const { user, updateContact } = useAuth();
  const [email, setEmail] = useState(user?.email ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [errors, setErrors] = useState<{email?: string;phone?: string;}>({});
  const [saved, setSaved] = useState(false);

  const dirty = email !== (user?.email ?? "") || phone !== (user?.phone ?? "");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errs: typeof errors = {};
    if (!/^\S+@\S+\.\S+$/.test(email)) errs.email = "Enter a valid email address.";
    if (phone && !/^[\d\s()+-]{7,}$/.test(phone)) errs.phone = "Enter a valid phone number.";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    updateContact({ email, phone });
    setSaved(true);
    window.setTimeout(() => setSaved(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div>
        <h2 className="font-display text-3xl font-semibold text-ink">Contact details</h2>
        <p className="mt-1 text-sm text-muted">Vendors reply to this email. Your phone number is only shared when you choose to.</p>
      </div>
      <TextField label="Email address" type="email" autoComplete="email" value={email} onChange={(e) => {setEmail(e.target.value);setSaved(false);}} error={errors.email} />
      <TextField label="Phone number" type="tel" autoComplete="tel" optional placeholder="(415) 555-0100" value={phone} onChange={(e) => {setPhone(e.target.value);setSaved(false);}} error={errors.phone} />
      <div className="flex items-center gap-4 pt-2">
        <Button type="submit" disabled={!dirty}>Save changes</Button>
        <p aria-live="polite" className="flex items-center gap-1.5 text-sm text-success">
          {saved && <><CheckCircle2Icon aria-hidden="true" className="h-4 w-4" />Changes saved</>}
        </p>
      </div>
    </form>);

}