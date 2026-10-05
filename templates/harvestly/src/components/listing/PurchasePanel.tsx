import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { BellIcon, ClockIcon, ShoppingBasketIcon, ZapIcon } from "lucide-react";
import { useCart } from "../../contexts/CartContext";
import { Product } from "../../types/marketplace";
import { formatPrice, formatUnit, pluralUnit } from "../../utils/format";
import { Button } from "../ui/Button";
import { QuantityStepper } from "../ui/QuantityStepper";
import { Stars } from "../ui/Stars";

export function PurchasePanel({ product, farmName }: {product: Product;farmName: string;}) {
  const { add } = useCart();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const soldOut = product.stock === 0;
  const low = product.stock > 0 && product.stock <= 10;
  const stockPct = Math.min(100, product.stock / 60 * 100);

  function addToOrder() {
    add(product.id, qty);
    toast.success(`Added ${qty} ${pluralUnit(product.unit, qty)} of ${product.title}`, {
      action: { label: "View order", onClick: () => navigate("/cart") }
    });
  }

  return (
    <div className="rounded-2xl border border-line bg-paper p-5 shadow-card sm:p-6">
      <p className="text-sm font-semibold text-primary">{farmName}</p>
      <h1 className="mt-1 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">{product.title}</h1>
      <div className="mt-2">
        <Stars rating={product.rating} count={product.reviewCount} />
      </div>

      <p className="mt-5 text-ink">
        <span className="font-display text-4xl font-semibold">{formatPrice(product.price)}</span>{" "}
        <span className="text-base text-muted">{formatUnit(product.unit)}</span>
      </p>
      <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
        <ClockIcon className="h-4 w-4" aria-hidden="true" />
        {product.harvestNote}
      </p>

      <div className="mt-5">
        <div className="flex items-center justify-between text-sm">
          <span className={`font-semibold ${soldOut ? "text-danger" : low ? "text-accent-dark" : "text-primary-dark"}`}>
            {soldOut ? "Sold out this week" : low ? `Only ${product.stock} left` : `${product.stock} ${pluralUnit(product.unit, product.stock)} available`}
          </span>
          <span className="text-muted">Restocks weekly</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-line" aria-hidden="true">
          <div className={`h-full rounded-full ${low ? "bg-accent" : "bg-primary"}`} style={{ width: `${stockPct}%` }} />
        </div>
      </div>

      {soldOut ?
      <div className="mt-6">
          <Button
          fullWidth
          size="lg"
          variant="outline"
          onClick={() => toast.success("We'll email you when it's back in stock.")}>
          
            <BellIcon className="h-4 w-4" aria-hidden="true" /> Notify me when available
          </Button>
        </div> :

      <>
          <div className="mt-6 flex items-center justify-between gap-4">
            <span className="text-sm font-medium text-ink">
              Quantity ({product.unit})
            </span>
            <QuantityStepper value={qty} max={product.stock} onChange={setQty} />
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-dashed border-line pt-4 text-sm">
            <span className="text-muted">Subtotal</span>
            <span className="text-lg font-bold text-ink">{formatPrice(qty * product.price)}</span>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Button size="lg" onClick={addToOrder}>
              <ShoppingBasketIcon className="h-4 w-4" aria-hidden="true" /> Add to order
            </Button>
            <Button size="lg" variant="accent" onClick={() => navigate(`/checkout?buy=${product.id}&qty=${qty}`)}>
              <ZapIcon className="h-4 w-4" aria-hidden="true" /> Buy now
            </Button>
          </div>
          <p className="mt-3 text-center text-xs text-muted">You won't be charged until the farm confirms your order.</p>
        </>
      }
    </div>);

}