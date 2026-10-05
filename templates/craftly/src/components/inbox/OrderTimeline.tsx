import React from 'react';
import { AlertTriangleIcon, CheckIcon, PackageCheckIcon, ShoppingBagIcon, TruckIcon, XIcon } from 'lucide-react';
import type { Order, OrderStatus } from '../../types/marketplace';
import { formatDateTime } from '../../utils/format';
import { statusMeta } from '../../utils/orderStatus';

const icons: Record<OrderStatus, React.ElementType> = {
  purchased: ShoppingBagIcon,
  shipped: TruckIcon,
  delivered: PackageCheckIcon,
  received: CheckIcon,
  disputed: AlertTriangleIcon,
  cancelled: XIcon
};

export function OrderTimeline({ order }: {order: Order;}) {
  const happyPath: OrderStatus[] = ['purchased', 'shipped', 'delivered', 'received'];
  const terminal = order.status === 'cancelled' || order.status === 'disputed';
  const reached = new Set(order.events.map((e) => e.status));
  const upcoming = terminal ? [] : happyPath.filter((s) => !reached.has(s));

  const labelFor = (s: OrderStatus) =>
  order.deliveryMethod === 'pickup' && s === 'shipped' ? 'Ready for pickup' : order.deliveryMethod === 'pickup' && s === 'delivered' ? 'Picked up' : statusMeta[s].label;

  return (
    <ol className="relative space-y-5">
      {order.events.map((e, i) => {
        const Icon = icons[e.status];
        const bad = e.status === 'disputed' || e.status === 'cancelled';
        return (
          <li key={`${e.status}-${i}`} className="relative flex gap-3">
            {(i < order.events.length - 1 || upcoming.length > 0) && <span className="absolute left-[13px] top-7 h-[calc(100%-4px)] w-px bg-line" aria-hidden />}
            <span className={`relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${bad ? 'bg-warning/15 text-warning' : 'bg-ink text-canvas'}`}>
              <Icon className="h-3.5 w-3.5" aria-hidden />
            </span>
            <div className="pt-0.5">
              <p className="text-sm font-medium">{labelFor(e.status)}</p>
              <p className="text-xs text-muted">{formatDateTime(e.at)}</p>
              {e.note && <p className="mt-0.5 text-xs text-ink/80">{e.note}</p>}
            </div>
          </li>);

      })}
      {upcoming.map((s, i) => {
        const Icon = icons[s];
        return (
          <li key={s} className="relative flex gap-3">
            {i < upcoming.length - 1 && <span className="absolute left-[13px] top-7 h-[calc(100%-4px)] w-px border-l border-dashed border-line" aria-hidden />}
            <span className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-dashed border-line bg-surface text-muted">
              <Icon className="h-3.5 w-3.5" aria-hidden />
            </span>
            <p className="pt-1 text-sm text-muted">{labelFor(s)}</p>
          </li>);

      })}
    </ol>);

}