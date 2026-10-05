import React, { useState } from "react";
import { toast } from "sonner";
import { BanknoteIcon, CheckCircle2Icon } from "lucide-react";
import { formatPrice } from "../../utils/format";
import { Button } from "../ui/Button";
import { TextField } from "../ui/TextField";

export function PayoutsForm() {
  const [connected, setConnected] = useState(true);
  const [holder, setHolder] = useState("");
  const [routing, setRouting] = useState("");
  const [account, setAccount] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function save(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!holder.trim()) errs.holder = "Enter the account holder name";
    if (routing.length !== 9) errs.routing = "Routing numbers are 9 digits";
    if (account.length < 6) errs.account = "Enter a valid account number";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setConnected(true);
    toast.success("Bank account connected");
  }

  return (
    <div className="max-w-lg space-y-6">
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-line bg-paper p-4">
          <p className="text-xs text-muted">Next payout · Mon, Oct 5</p>
          <p className="mt-1 font-display text-2xl font-semibold text-ink">{formatPrice(412.36)}</p>
        </div>
        <div className="rounded-2xl border border-line bg-paper p-4">
          <p className="text-xs text-muted">Paid out in 2026</p>
          <p className="mt-1 font-display text-2xl font-semibold text-ink">{formatPrice(18240.5)}</p>
        </div>
      </div>

      {connected ?
      <div className="flex items-center gap-4 rounded-2xl border border-primary/30 bg-primary-soft/40 p-5">
          <BanknoteIcon className="h-8 w-8 text-primary" aria-hidden="true" />
          <div className="flex-1">
            <p className="flex items-center gap-1.5 font-semibold text-ink">
              Hudson Valley Credit Union ···· 4821
              <CheckCircle2Icon className="h-4 w-4 text-primary" aria-label="Verified" />
            </p>
            <p className="text-sm text-muted">Payouts every Monday · Verified</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => setConnected(false)}>
            Change
          </Button>
        </div> :

      <form onSubmit={save} className="space-y-5" noValidate>
          <TextField label="Account holder name" value={holder} onChange={(e) => setHolder(e.target.value)} error={errors.holder} />
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField label="Routing number" inputMode="numeric" value={routing} onChange={(e) => setRouting(e.target.value.replace(/\D/g, "").slice(0, 9))} error={errors.routing} />
            <TextField label="Account number" inputMode="numeric" value={account} onChange={(e) => setAccount(e.target.value.replace(/\D/g, "").slice(0, 17))} error={errors.account} />
          </div>
          <div className="flex gap-3">
            <Button type="submit">Connect bank account</Button>
            <Button variant="ghost" onClick={() => setConnected(true)}>
              Cancel
            </Button>
          </div>
        </form>
      }
      <p className="text-xs text-muted">Payouts are processed securely by Stripe Connect. Funds typically arrive in 1–2 business days.</p>
    </div>);

}