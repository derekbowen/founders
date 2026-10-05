import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { CardValues, validateCard } from "../components/checkout/CardForm";
import { FarmFulfillmentState } from "../components/checkout/FarmFulfillmentCard";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { useCatalog } from "../contexts/CatalogContext";
import { useOrders } from "../contexts/OrdersContext";
import { brand } from "../data/brand";
import { Farm, Order, Product } from "../types/marketplace";
import { upcomingPickupSlots } from "../utils/pickupSlots";

export interface CheckoutLine {
  product: Product;
  quantity: number;
}
export interface FarmGroup {
  farm: Farm;
  lines: CheckoutLine[];
}
export interface Address {
  line1: string;
  city: string;
  zip: string;
  notes: string;
}

export function useCheckout() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { items, clear } = useCart();
  const { user } = useAuth();
  const { getProduct, getFarm, decrementStock } = useCatalog();
  const { addOrders } = useOrders();

  const buyId = params.get("buy");
  const buyQty = Math.max(1, Number(params.get("qty") ?? 1));
  const source = buyId ? [{ productId: buyId, quantity: buyQty }] : items;

  const groups: FarmGroup[] = useMemo(() => {
    const map = new Map<string, FarmGroup>();
    source.forEach((i) => {
      const product = getProduct(i.productId);
      const farm = product && getFarm(product.farmId);
      if (!product || !farm) return;
      const g = map.get(farm.id) ?? { farm, lines: [] };
      g.lines.push({ product, quantity: Math.min(i.quantity, product.stock) });
      map.set(farm.id, g);
    });
    return Array.from(map.values());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(source), getProduct, getFarm]);

  const [fulfillment, setFulfillment] = useState<Record<string, FarmFulfillmentState>>(() => {
    const init: Record<string, FarmFulfillmentState> = {};
    groups.forEach((g) => {
      const canPickup = g.lines.every((l) => l.product.fulfillment.includes("pickup"));
      init[g.farm.id] = {
        type: canPickup ? "pickup" : "delivery",
        slotId: upcomingPickupSlots(g.farm.pickup)[0]?.id ?? "",
        zoneIndex: 0
      };
    });
    return init;
  });

  const [address, setAddress] = useState<Address>({ line1: "", city: "", zip: "", notes: "" });
  const [card, setCard] = useState<CardValues>({ name: user?.name ?? "", number: "", expiry: "", cvc: "", zip: "" });
  const [cardErrors, setCardErrors] = useState<Partial<Record<keyof CardValues, string>>>({});
  const [addressError, setAddressError] = useState("");
  const [status, setStatus] = useState<"idle" | "processing" | "declined">("idle");

  const needsAddress = groups.some((g) => fulfillment[g.farm.id]?.type === "delivery");

  const totals = useMemo(() => {
    let subtotal = 0;
    let delivery = 0;
    groups.forEach((g) => {
      subtotal += g.lines.reduce((s, l) => s + l.product.price * l.quantity, 0);
      const f = fulfillment[g.farm.id];
      if (f?.type === "delivery") delivery += g.farm.deliveryZones[f.zoneIndex]?.fee ?? 0;
    });
    const service = Math.round(subtotal * brand.serviceFeeRate * 100) / 100;
    return { subtotal, delivery, service, total: subtotal + delivery + service };
  }, [groups, fulfillment]);

  const deliveryMinUnmet = groups.some((g) => {
    const f = fulfillment[g.farm.id];
    if (f?.type !== "delivery") return false;
    const zone = g.farm.deliveryZones[f.zoneIndex];
    return zone && g.lines.reduce((s, l) => s + l.product.price * l.quantity, 0) < zone.minOrder;
  });

  async function placeOrder() {
    const errs = validateCard(card);
    setCardErrors(errs);
    const addrMissing = needsAddress && (!address.line1.trim() || !address.city.trim() || address.zip.length < 5);
    setAddressError(addrMissing ? "Enter a full delivery address" : "");
    if (Object.keys(errs).length || addrMissing || deliveryMinUnmet) {
      toast.error("Please fix the highlighted fields");
      return;
    }
    setStatus("processing");
    await new Promise((r) => setTimeout(r, 1300));
    if (card.number.replace(/\s/g, "") === "4000000000000002") {
      setStatus("declined");
      return;
    }

    const now = new Date().toISOString();
    const created: Order[] = [];
    groups.forEach((g) => {
      const f = fulfillment[g.farm.id];
      const slots = upcomingPickupSlots(g.farm.pickup);
      const slot = slots.find((s) => s.id === f.slotId) ?? slots[0];
      const zone = g.farm.deliveryZones[f.zoneIndex];
      g.lines.forEach((l, idx) => {
        const subtotal = l.product.price * l.quantity;
        const fees =
        Math.round(subtotal * brand.serviceFeeRate * 100) / 100 + (f.type === "delivery" && idx === 0 ? zone.fee : 0);
        created.push({
          id: `HV-${10500 + Math.floor(Math.random() * 400)}`,
          role: "order",
          productId: l.product.id,
          quantity: l.quantity,
          subtotal,
          fees,
          total: subtotal + fees,
          status: "ordered",
          fulfillment:
          f.type === "pickup" ?
          { type: "pickup", slot: slot?.label ?? "", place: `${slot?.location}, ${g.farm.location}` } :
          { type: "delivery", slot: `${zone.days} · 10:00 am – 4:00 pm`, place: `${address.line1}, ${address.city} ${address.zip}` },
          counterpart: g.farm.name,
          placedAt: now,
          timeline: [{ status: "ordered", at: now }],
          messages: address.notes && f.type === "delivery" ? [{ id: `m-${Date.now()}`, from: "me", text: address.notes, at: now }] : []
        });
        decrementStock(l.product.id, l.quantity);
      });
    });
    addOrders(created);
    if (!buyId) clear();
    toast.success(`Order placed! ${created.length > 1 ? `${created.length} orders sent to farms.` : "The farm has been notified."}`);
    navigate(`/inbox/orders/${created[0].id}`);
  }

  return {
    groups,
    fulfillment,
    setFarmFulfillment: (farmId: string, v: FarmFulfillmentState) => setFulfillment((p) => ({ ...p, [farmId]: v })),
    address,
    setAddress,
    addressError,
    needsAddress,
    card,
    setCard,
    cardErrors,
    totals,
    status,
    deliveryMinUnmet,
    placeOrder
  };
}