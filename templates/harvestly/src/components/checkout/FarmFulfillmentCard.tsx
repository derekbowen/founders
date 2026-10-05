import React, { useMemo } from "react";
import { StoreIcon, TruckIcon } from "lucide-react";
import { Farm, FulfillmentType, Product } from "../../types/marketplace";
import { formatPrice } from "../../utils/format";
import { upcomingPickupSlots } from "../../utils/pickupSlots";
import { SelectField } from "../ui/SelectField";

export interface FarmFulfillmentState {
  type: FulfillmentType;
  slotId: string;
  zoneIndex: number;
}

interface Line {
  product: Product;
  quantity: number;
}

interface Props {
  farm: Farm;
  lines: Line[];
  value: FarmFulfillmentState;
  onChange: (next: FarmFulfillmentState) => void;
}

export function FarmFulfillmentCard({ farm, lines, value, onChange }: Props) {
  const slots = useMemo(() => upcomingPickupSlots(farm.pickup), [farm.pickup]);
  const canDeliver = lines.every((l) => l.product.fulfillment.includes("delivery"));
  const canPickup = lines.every((l) => l.product.fulfillment.includes("pickup"));
  const subtotal = lines.reduce((s, l) => s + l.product.price * l.quantity, 0);
  const zone = farm.deliveryZones[value.zoneIndex];
  const belowMin = value.type === "delivery" && zone && subtotal < zone.minOrder;

  const options: {type: FulfillmentType;label: string;desc: string;icon: typeof StoreIcon;enabled: boolean;}[] = [
  { type: "pickup", label: "Farm pickup", desc: "Free", icon: StoreIcon, enabled: canPickup },
  {
    type: "delivery",
    label: "Local delivery",
    desc: canDeliver ? `From ${formatPrice(Math.min(...farm.deliveryZones.map((z) => z.fee)))}` : "Not available for some items",
    icon: TruckIcon,
    enabled: canDeliver
  }];


  return (
    <section className="rounded-2xl border border-line bg-paper p-5" aria-label={`Fulfillment for ${farm.name}`}>
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-ink">{farm.name}</h3>
        <span className="text-sm text-muted">{lines.length} {lines.length === 1 ? "item" : "items"}</span>
      </div>
      <div role="radiogroup" aria-label="Pickup or delivery" className="mt-4 grid gap-3 sm:grid-cols-2">
        {options.map((o) => {
          const selected = value.type === o.type;
          return (
            <button
              key={o.type}
              type="button"
              role="radio"
              aria-checked={selected}
              disabled={!o.enabled}
              onClick={() => onChange({ ...value, type: o.type })}
              className={`flex items-center gap-3 rounded-xl border p-4 text-left transition disabled:cursor-not-allowed disabled:opacity-50 ${
              selected ? "border-primary bg-primary-soft/50 ring-1 ring-primary" : "border-line bg-white hover:border-primary/40"}`
              }>
              
              <o.icon className={`h-5 w-5 ${selected ? "text-primary" : "text-muted"}`} aria-hidden="true" />
              <span>
                <span className="block text-sm font-semibold text-ink">{o.label}</span>
                <span className="block text-xs text-muted">{o.desc}</span>
              </span>
            </button>);

        })}
      </div>

      <div className="mt-4">
        {value.type === "pickup" ?
        <>
            <SelectField
            label="Pickup slot"
            value={value.slotId}
            onChange={(e) => onChange({ ...value, slotId: e.target.value })}
            options={slots.map((s) => ({ value: s.id, label: `${s.label} — ${s.location}` }))} />
          
            <p className="mt-2 text-xs text-muted">{farm.address}</p>
          </> :

        <>
            <SelectField
            label="Delivery zone"
            value={String(value.zoneIndex)}
            onChange={(e) => onChange({ ...value, zoneIndex: Number(e.target.value) })}
            options={farm.deliveryZones.map((z, i) => ({
              value: String(i),
              label: `${z.name} — ${formatPrice(z.fee)} · ${z.days}`
            }))} />
          
            {belowMin &&
          <p className="mt-2 rounded-lg bg-accent-soft px-3 py-2 text-xs font-medium text-accent-dark" role="alert">
                Add {formatPrice(zone.minOrder - subtotal)} more from {farm.name} to reach the {formatPrice(zone.minOrder)} delivery
                minimum.
              </p>
          }
          </>
        }
      </div>
    </section>);

}