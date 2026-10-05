import React, { useState } from "react";
import { toast } from "sonner";
import { HomeIcon, MapPinIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { SavedAddress, seedAddresses } from "../../data/addresses";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { EmptyState } from "../ui/EmptyState";
import { TextField } from "../ui/TextField";

const blank = { label: "", line1: "", city: "", zip: "" };

export function AddressesForm() {
  const [addresses, setAddresses] = useState<SavedAddress[]>(seedAddresses);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState(blank);
  const [error, setError] = useState("");

  function add(e: React.FormEvent) {
    e.preventDefault();
    if (!form.line1 || !form.city || form.zip.length < 5) {
      setError("Fill in street, town and a 5-digit ZIP");
      return;
    }
    setAddresses((a) => [...a, { id: `a${Date.now()}`, ...form, label: form.label || "Address", isDefault: a.length === 0 }]);
    setForm(blank);
    setAdding(false);
    setError("");
    toast.success("Address added");
  }

  function makeDefault(id: string) {
    setAddresses((a) => a.map((x) => ({ ...x, isDefault: x.id === id })));
  }

  function remove(id: string) {
    setAddresses((a) => {
      const next = a.filter((x) => x.id !== id);
      if (next.length && !next.some((x) => x.isDefault)) next[0] = { ...next[0], isDefault: true };
      return next;
    });
  }

  return (
    <div className="max-w-2xl space-y-4">
      {addresses.length === 0 && !adding &&
      <EmptyState icon={<MapPinIcon className="h-6 w-6" />} title="No saved addresses" text="Save an address to speed up delivery checkout." />
      }
      <ul className="space-y-3">
        {addresses.map((a) =>
        <li key={a.id} className="flex items-start gap-4 rounded-2xl border border-line bg-paper p-4">
            <HomeIcon className="mt-0.5 h-5 w-5 text-primary" aria-hidden="true" />
            <div className="flex-1">
              <p className="flex items-center gap-2 font-semibold text-ink">
                {a.label} {a.isDefault && <Badge tone="green">Default</Badge>}
              </p>
              <p className="text-sm text-muted">
                {a.line1}, {a.city} {a.zip}
              </p>
              {!a.isDefault &&
            <button type="button" onClick={() => makeDefault(a.id)} className="mt-1 text-sm font-semibold text-primary hover:underline">
                  Set as default
                </button>
            }
            </div>
            <button
            type="button"
            onClick={() => remove(a.id)}
            aria-label={`Delete ${a.label} address`}
            className="rounded-full p-2 text-muted transition hover:bg-danger/10 hover:text-danger">
            
              <Trash2Icon className="h-4 w-4" />
            </button>
          </li>
        )}
      </ul>

      {adding ?
      <form onSubmit={add} className="space-y-4 rounded-2xl border border-line bg-white/60 p-5" noValidate>
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="Label" placeholder="Home, Work…" value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} />
            <TextField label="Street address" value={form.line1} onChange={(e) => setForm({ ...form, line1: e.target.value })} />
            <TextField label="Town" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
            <TextField label="ZIP" inputMode="numeric" value={form.zip} onChange={(e) => setForm({ ...form, zip: e.target.value.replace(/\D/g, "").slice(0, 5) })} />
          </div>
          {error && <p className="text-xs font-medium text-danger" role="alert">{error}</p>}
          <div className="flex gap-3">
            <Button type="submit">Save address</Button>
            <Button variant="ghost" onClick={() => setAdding(false)}>
              Cancel
            </Button>
          </div>
        </form> :

      <Button variant="outline" onClick={() => setAdding(true)}>
          <PlusIcon className="h-4 w-4" aria-hidden="true" /> Add address
        </Button>
      }
    </div>);

}