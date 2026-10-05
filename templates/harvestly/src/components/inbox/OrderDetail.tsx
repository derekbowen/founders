import React from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeftIcon, InfoIcon, MapPinIcon, StoreIcon, TruckIcon } from "lucide-react";
import { useCatalog } from "../../contexts/CatalogContext";
import { useOrders } from "../../contexts/OrdersContext";
import { Order, OrderStatus } from "../../types/marketplace";
import { formatDateTime, formatPrice, pluralUnit } from "../../utils/format";
import { Button } from "../ui/Button";
import { ChatThread } from "./ChatThread";
import { OrderTimeline } from "./OrderTimeline";
import { StatusBadge } from "./StatusBadge";

interface OrderDetailProps {
  order: Order;
  backTo: string;
}

export function OrderDetail({ order, backTo }: OrderDetailProps) {
  const { getProduct, getFarm, farms } = useCatalog();
  const { updateStatus, sendMessage } = useOrders();
  const product = getProduct(order.productId);
  const farm = product ? getFarm(product.farmId) : farms[0];
  const isSale = order.role === "sale";
  const closed = order.status === "received" || order.status === "cancelled";

  function act(status: OrderStatus, msg: string, note?: string) {
    updateStatus(order.id, status, note);
    toast.success(msg);
  }

  const actions: React.ReactNode[] = [];
  if (isSale && order.status === "ordered") {
    actions.push(
      order.fulfillment.type === "pickup" ?
      <Button key="ready" onClick={() => act("ready", "Buyer notified: ready for pickup")}>
          Mark ready for pickup
        </Button> :

      <Button key="out" onClick={() => act("out-for-delivery", "Buyer notified: out for delivery")}>
          Mark out for delivery
        </Button>

    );
    actions.push(
      <Button key="cancel" variant="danger" onClick={() => act("cancelled", "Order cancelled and refunded", "Cancelled by farm. Full refund issued.")}>
        Decline order
      </Button>
    );
  }
  if (isSale && (order.status === "ready" || order.status === "out-for-delivery")) {
    actions.push(
      <Button key="done" onClick={() => act("received", "Order completed")}>
        Mark as received
      </Button>
    );
  }
  if (!isSale && (order.status === "ready" || order.status === "out-for-delivery")) {
    actions.push(
      <Button key="got" onClick={() => act("received", "Enjoy your harvest! 🌱")}>
        I've received my order
      </Button>
    );
  }
  if (!isSale && order.status === "ordered") {
    actions.push(
      <Button key="cancel" variant="danger" onClick={() => act("cancelled", "Order cancelled", "Cancelled by buyer. Full refund issued.")}>
        Cancel order
      </Button>
    );
  }

  return (
    <article className="space-y-5" aria-label={`Order ${order.id}`}>
      <Link to={backTo} className="inline-flex items-center gap-1 text-sm font-semibold text-primary lg:hidden">
        <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" /> All {isSale ? "sales" : "orders"}
      </Link>

      <header className="flex flex-col gap-4 rounded-2xl border border-line bg-paper p-5 sm:flex-row sm:items-center">
        {product && <img src={product.images[0]} alt="" className="h-20 w-20 rounded-xl object-cover" />}
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="font-display text-2xl font-semibold text-ink">{product?.title ?? "Product"}</h2>
            <StatusBadge status={order.status} />
          </div>
          <p className="mt-1 text-sm text-muted">
            {order.quantity} {product ? pluralUnit(product.unit, order.quantity) : ""} · {isSale ? "Buyer" : "From"}{" "}
            <span className="font-medium text-ink">{order.counterpart}</span> · #{order.id}
          </p>
          <p className="text-xs text-muted">Placed {formatDateTime(order.placedAt)}</p>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-xs text-muted">{isSale ? "You earn" : "Total paid"}</p>
          <p className="font-display text-2xl font-semibold text-ink">{formatPrice(isSale ? order.subtotal : order.total)}</p>
        </div>
      </header>

      {actions.length > 0 && <div className="flex flex-wrap gap-3">{actions}</div>}

      <div className="grid gap-5 xl:grid-cols-[1fr_1.2fr]">
        <div className="space-y-5">
          <section className="rounded-2xl border border-line bg-paper p-5" aria-labelledby="fulfil-h">
            <h3 id="fulfil-h" className="mb-3 flex items-center gap-2 font-semibold text-ink">
              {order.fulfillment.type === "pickup" ?
              <StoreIcon className="h-5 w-5 text-primary" aria-hidden="true" /> :

              <TruckIcon className="h-5 w-5 text-primary" aria-hidden="true" />
              }
              {order.fulfillment.type === "pickup" ? "Farm pickup" : "Local delivery"}
            </h3>
            <p className="text-sm font-medium text-ink">{order.fulfillment.slot}</p>
            <p className="mt-1 flex items-start gap-1.5 text-sm text-muted">
              <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              {order.fulfillment.place}
            </p>
            {order.fulfillment.type === "pickup" && farm &&
            <div className="mt-4 flex gap-2 rounded-xl bg-accent-soft p-3 text-sm text-accent-dark">
                <InfoIcon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <p>
                  <span className="font-semibold">Pickup instructions: </span>
                  {farm.pickupInstructions}
                </p>
              </div>
            }
          </section>
          <section className="rounded-2xl border border-line bg-paper p-5" aria-labelledby="timeline-h">
            <h3 id="timeline-h" className="mb-4 font-semibold text-ink">
              Order timeline
            </h3>
            <OrderTimeline order={order} />
          </section>
        </div>
        <section className="rounded-2xl border border-line bg-paper p-5" aria-labelledby="chat-h">
          <h3 id="chat-h" className="mb-4 font-semibold text-ink">
            Messages with {order.counterpart}
          </h3>
          <ChatThread
            messages={order.messages}
            counterpart={order.counterpart}
            onSend={(t) => sendMessage(order.id, t)}
            disabled={order.status === "cancelled"} />
          
          {closed && order.status === "received" && !isSale &&
          <p className="mt-4 text-xs text-muted">Enjoyed it? Reviews help small farms grow.</p>
          }
        </section>
      </div>
    </article>);

}