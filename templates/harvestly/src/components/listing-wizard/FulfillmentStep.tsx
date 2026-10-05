import React from "react";
import { CheckIcon, StoreIcon, TruckIcon } from "lucide-react";
import { DraftErrors, ListingDraft } from "../../hooks/useListingWizard";
import { Farm, FulfillmentType } from "../../types/marketplace";
import { formatPrice } from "../../utils/format";

interface Props {
  draft: ListingDraft;
  errors: DraftErrors;
  patch: (p: Partial<ListingDraft>) => void;
  farm: Farm;
}

function toggle<T>(list: T[], v: T): T[] {
  return list.includes(v) ? list.filter((x) => x !== v) : [...list, v];
}

function CheckRow({ checked, onClick, title, sub, right }: {checked: boolean;onClick: () => void;title: string;sub: string;right?: string;}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-xl border p-3.5 text-left transition ${
      checked ? "border-primary bg-primary-soft/40" : "border-line bg-white hover:border-primary/40"}`
      }>
      
      <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${checked ? "border-primary bg-primary text-white" : "border-line"}`}>
        {checked && <CheckIcon className="h-3.5 w-3.5" aria-hidden="true" />}
      </span>
      <span className="flex-1">
        <span className="block text-sm font-semibold text-ink">{title}</span>
        <span className="block text-xs text-muted">{sub}</span>
      </span>
      {right && <span className="text-sm font-semibold text-ink">{right}</span>}
    </button>);

}

export function FulfillmentStep({ draft, errors, patch, farm }: Props) {
  const methods: {id: FulfillmentType;label: string;icon: typeof StoreIcon;}[] = [
  { id: "pickup", label: "Farm pickup", icon: StoreIcon },
  { id: "delivery", label: "Local delivery", icon: TruckIcon }];


  return (
    <div className="space-y-8">
      <fieldset>
        <legend className="field-label">How can buyers get it?</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {methods.map((m) => {
            const on = draft.fulfillment.includes(m.id);
            return (
              <button
                key={m.id}
                type="button"
                aria-pressed={on}
                onClick={() => patch({ fulfillment: toggle(draft.fulfillment, m.id) })}
                className={`flex items-center gap-3 rounded-xl border p-4 transition ${
                on ? "border-primary bg-primary-soft/50 ring-1 ring-primary" : "border-line bg-white hover:border-primary/40"}`
                }>
                
                <m.icon className={`h-5 w-5 ${on ? "text-primary" : "text-muted"}`} aria-hidden="true" />
                <span className="text-sm font-semibold text-ink">{m.label}</span>
                {on && <CheckIcon className="ml-auto h-4 w-4 text-primary" aria-hidden="true" />}
              </button>);

          })}
        </div>
        {errors.fulfillment && <p className="mt-2 text-xs font-medium text-danger">{errors.fulfillment}</p>}
      </fieldset>

      {draft.fulfillment.includes("pickup") &&
      <fieldset>
          <legend className="field-label">Pickup days</legend>
          <div className="space-y-2">
            {farm.pickup.map((p) => {
            const key = `${p.day}|${p.location}`;
            return (
              <CheckRow
                key={key}
                checked={draft.pickupDays.includes(key)}
                onClick={() => patch({ pickupDays: toggle(draft.pickupDays, key) })}
                title={`${p.day} · ${p.window}`}
                sub={p.location} />);


          })}
          </div>
          {errors.pickupDays && <p className="mt-2 text-xs font-medium text-danger">{errors.pickupDays}</p>}
        </fieldset>
      }

      {draft.fulfillment.includes("delivery") &&
      <fieldset>
          <legend className="field-label">Delivery zones</legend>
          <div className="space-y-2">
            {farm.deliveryZones.map((z) =>
          <CheckRow
            key={z.name}
            checked={draft.deliveryZones.includes(z.name)}
            onClick={() => patch({ deliveryZones: toggle(draft.deliveryZones, z.name) })}
            title={z.name}
            sub={`${z.days} · min. order ${formatPrice(z.minOrder)}`}
            right={formatPrice(z.fee)} />

          )}
          </div>
          {errors.deliveryZones && <p className="mt-2 text-xs font-medium text-danger">{errors.deliveryZones}</p>}
          <p className="mt-2 text-xs text-muted">Zones and fees are managed on your farm profile.</p>
        </fieldset>
      }
    </div>);

}