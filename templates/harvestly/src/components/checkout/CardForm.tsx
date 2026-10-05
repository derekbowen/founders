import React from "react";
import { CreditCardIcon, LockIcon } from "lucide-react";

export interface CardValues {
  name: string;
  number: string;
  expiry: string;
  cvc: string;
  zip: string;
}

interface CardFormProps {
  values: CardValues;
  errors: Partial<Record<keyof CardValues, string>>;
  onChange: (values: CardValues) => void;
}

function formatCardNumber(v: string) {
  return v.
  replace(/\D/g, "").
  slice(0, 16).
  replace(/(\d{4})(?=\d)/g, "$1 ");
}
function formatExpiry(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)} / ${d.slice(2)}` : d;
}

export function validateCard(v: CardValues): Partial<Record<keyof CardValues, string>> {
  const e: Partial<Record<keyof CardValues, string>> = {};
  if (!v.name.trim()) e.name = "Enter the name on your card";
  if (v.number.replace(/\s/g, "").length < 16) e.number = "Card number is incomplete";
  const [mm, yy] = v.expiry.split(" / ");
  if (!mm || !yy || Number(mm) < 1 || Number(mm) > 12 || yy.length < 2) e.expiry = "Use MM / YY";
  if (v.cvc.length < 3) e.cvc = "3–4 digits";
  if (v.zip.length < 5) e.zip = "5-digit ZIP";
  return e;
}

export function CardForm({ values, errors, onChange }: CardFormProps) {
  const set = (k: keyof CardValues, val: string) => onChange({ ...values, [k]: val });
  const err = (k: keyof CardValues) => errors[k];
  const box = (k: keyof CardValues) =>
  `w-full bg-transparent px-3.5 py-3 text-sm text-ink placeholder:text-muted/70 focus:outline-none ${err(k) ? "text-danger" : ""}`;

  return (
    <div>
      <div className="mb-4">
        <label htmlFor="card-name" className="field-label">
          Name on card
        </label>
        <input
          id="card-name"
          autoComplete="cc-name"
          value={values.name}
          onChange={(e) => set("name", e.target.value)}
          className={`field-input ${err("name") ? "border-danger" : ""}`}
          placeholder="Hannah Reyes"
          aria-invalid={!!err("name")} />
        
        {err("name") && <p className="mt-1.5 text-xs font-medium text-danger">{err("name")}</p>}
      </div>

      <fieldset>
        <legend className="field-label">Card details</legend>
        <div className="overflow-hidden rounded-xl border border-line bg-white focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
          <div className="flex items-center border-b border-line">
            <label htmlFor="card-number" className="sr-only">
              Card number
            </label>
            <input
              id="card-number"
              inputMode="numeric"
              autoComplete="cc-number"
              placeholder="1234 1234 1234 1234"
              value={values.number}
              onChange={(e) => set("number", formatCardNumber(e.target.value))}
              className={box("number")}
              aria-invalid={!!err("number")} />
            
            <div className="flex gap-1 pr-3" aria-hidden="true">
              {["VISA", "MC", "AMEX"].map((b) =>
              <span key={b} className="rounded border border-line px-1.5 py-0.5 text-[9px] font-bold text-muted">
                  {b}
                </span>
              )}
            </div>
          </div>
          <div className="grid grid-cols-3 divide-x divide-line">
            <div>
              <label htmlFor="card-expiry" className="sr-only">
                Expiry date
              </label>
              <input
                id="card-expiry"
                inputMode="numeric"
                autoComplete="cc-exp"
                placeholder="MM / YY"
                value={values.expiry}
                onChange={(e) => set("expiry", formatExpiry(e.target.value))}
                className={box("expiry")}
                aria-invalid={!!err("expiry")} />
              
            </div>
            <div>
              <label htmlFor="card-cvc" className="sr-only">
                CVC
              </label>
              <input
                id="card-cvc"
                inputMode="numeric"
                autoComplete="cc-csc"
                placeholder="CVC"
                value={values.cvc}
                onChange={(e) => set("cvc", e.target.value.replace(/\D/g, "").slice(0, 4))}
                className={box("cvc")}
                aria-invalid={!!err("cvc")} />
              
            </div>
            <div>
              <label htmlFor="card-zip" className="sr-only">
                ZIP code
              </label>
              <input
                id="card-zip"
                inputMode="numeric"
                autoComplete="postal-code"
                placeholder="ZIP"
                value={values.zip}
                onChange={(e) => set("zip", e.target.value.replace(/\D/g, "").slice(0, 5))}
                className={box("zip")}
                aria-invalid={!!err("zip")} />
              
            </div>
          </div>
        </div>
        {(err("number") || err("expiry") || err("cvc") || err("zip")) &&
        <p className="mt-1.5 text-xs font-medium text-danger" role="alert">
            {[err("number"), err("expiry") && `Expiry: ${err("expiry")}`, err("cvc") && `CVC: ${err("cvc")}`, err("zip")].
          filter(Boolean).
          join(" · ")}
          </p>
        }
      </fieldset>
      <p className="mt-3 flex items-center gap-1.5 text-xs text-muted">
        <LockIcon className="h-3.5 w-3.5" aria-hidden="true" />
        Payments are encrypted and processed securely by Stripe.
        <CreditCardIcon className="ml-auto h-4 w-4" aria-hidden="true" />
      </p>
    </div>);

}