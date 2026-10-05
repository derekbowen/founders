import React from "react";
import { Link, Navigate, NavLink, useParams } from "react-router-dom";
import { InboxIcon, MousePointerClickIcon } from "lucide-react";
import { OrderDetail } from "../components/inbox/OrderDetail";
import { StatusBadge } from "../components/inbox/StatusBadge";
import { Button } from "../components/ui/Button";
import { EmptyState } from "../components/ui/EmptyState";
import { useCatalog } from "../contexts/CatalogContext";
import { useOrders } from "../contexts/OrdersContext";
import { formatDateTime, formatPrice } from "../utils/format";

export function Inbox() {
  const { tab = "orders", orderId } = useParams();
  const { orders } = useOrders();
  const { getProduct } = useCatalog();

  if (tab !== "orders" && tab !== "sales") return <Navigate to="/inbox/orders" replace />;

  const role = tab === "orders" ? "order" : "sale";
  const list = orders.filter((o) => o.role === role);
  const selected = orders.find((o) => o.id === orderId);
  const counts = {
    orders: orders.filter((o) => o.role === "order" && o.status !== "received" && o.status !== "cancelled").length,
    sales: orders.filter((o) => o.role === "sale" && o.status === "ordered").length
  };

  const tabClass = ({ isActive }: {isActive: boolean;}) =>
  `flex flex-1 items-center justify-center gap-2 rounded-full py-2 text-sm font-semibold transition ${
  isActive ? "bg-white text-ink shadow-card" : "text-muted hover:text-ink"}`;


  return (
    <div className="container-site py-8 lg:py-10">
      <h1 className="mb-6 font-display text-4xl font-semibold text-ink">Inbox</h1>
      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        <div className={selected ? "hidden lg:block" : ""}>
          <nav aria-label="Inbox tabs" className="mb-4 flex rounded-full bg-ink/5 p-1">
            {(["orders", "sales"] as const).map((t) =>
            <NavLink key={t} to={`/inbox/${t}`} className={tabClass}>
                {t === "orders" ? "Orders" : "Sales"}
                {counts[t] > 0 &&
              <span className="rounded-full bg-accent px-1.5 text-xs text-white">{counts[t]}</span>
              }
              </NavLink>
            )}
          </nav>
          {list.length === 0 ?
          <EmptyState
            icon={<InboxIcon className="h-6 w-6" />}
            title={tab === "orders" ? "No orders yet" : "No sales yet"}
            text={tab === "orders" ? "When you buy from a farm, your orders and messages show up here." : "List your harvest to start receiving orders."}
            action={<Button to={tab === "orders" ? "/search" : "/listings/new"}>{tab === "orders" ? "Start shopping" : "Create a listing"}</Button>} /> :


          <ul className="space-y-2">
              {list.map((o) => {
              const p = getProduct(o.productId);
              const active = o.id === orderId;
              return (
                <li key={o.id}>
                    <Link
                    to={`/inbox/${tab}/${o.id}`}
                    aria-current={active ? "page" : undefined}
                    className={`flex gap-3 rounded-2xl border p-3 transition ${
                    active ? "border-primary bg-primary-soft/40" : "border-line bg-paper hover:border-primary/40"}`
                    }>
                    
                      {p && <img src={p.images[0]} alt="" className="h-14 w-14 rounded-xl object-cover" />}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <p className="truncate text-sm font-semibold text-ink">{o.counterpart}</p>
                          <p className="shrink-0 text-xs text-muted">{formatDateTime(o.placedAt)}</p>
                        </div>
                        <p className="truncate text-sm text-muted">
                          {p?.title} · {formatPrice(o.total)}
                        </p>
                        <div className="mt-1.5">
                          <StatusBadge status={o.status} />
                        </div>
                      </div>
                    </Link>
                  </li>);

            })}
            </ul>
          }
        </div>
        <div className={selected ? "" : "hidden lg:block"}>
          {selected ?
          <OrderDetail key={selected.id} order={selected} backTo={`/inbox/${tab}`} /> :

          <EmptyState
            icon={<MousePointerClickIcon className="h-6 w-6" />}
            title="Select an order"
            text="Choose a transaction to see its timeline, pickup details and messages." />

          }
        </div>
      </div>
    </div>);

}