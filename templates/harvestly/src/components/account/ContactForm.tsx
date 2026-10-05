import React, { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../ui/Button";
import { TextField } from "../ui/TextField";

export function ContactForm() {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [error, setError] = useState("");
  const dirty = name !== user?.name || email !== user?.email || phone !== user?.phone;

  function save(e: React.FormEvent) {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Enter a valid email");
      return;
    }
    setError("");
    updateUser({ name, email, phone });
    toast.success("Contact details saved");
  }

  return (
    <form onSubmit={save} className="max-w-lg space-y-5" noValidate>
      <TextField label="Full name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
      <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} error={error} hint="Order updates are sent here." />
      <TextField label="Phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} hint="Farms may text you about pickup." />
      <Button type="submit" disabled={!dirty}>
        Save changes
      </Button>
    </form>);

}