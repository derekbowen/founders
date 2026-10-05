import React from "react";
import { CheckIcon, XIcon } from "lucide-react";
import { Order, OrderStatus } from "../../types/marketplace";
import { formatDateTime, statusLabels } from "../../utils/format";

export function OrderTimeline({ order }: {order: Order;}) {
  const finalStep: OrderStatus = order.fulfillment.type === "pickup" ? "ready" : "out-for-delivery";
  const steps: OrderStatus[] = order.status === "cancelled" ? ["ordered", "cancelled"] : ["ordered", finalStep, "received"];

  return (
    <ol className="space-y-0">
      {steps.map((s, i) => {
        const event = order.timeline.find((t) => t.status === s);
        const done = !!event;
        const cancelled = s === "cancelled";
        return (
          <li key={s} className="relative flex gap-3 pb-5 last:pb-0">
            {i < steps.length - 1 &&
            <span
              className={`absolute left-[11px] top-6 h-[calc(100%-1.25rem)] w-0.5 ${done ? "bg-primary" : "bg-line"}`}
              aria-hidden="true" />

            }
            <span
              className={`z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${
              cancelled ?
              "border-danger bg-danger text-white" :
              done ?
              "border-primary bg-primary text-white" :
              "border-line bg-white"}`
              }
              aria-hidden="true">
              
              {done && (cancelled ? <XIcon className="h-3.5 w-3.5" /> : <CheckIcon className="h-3.5 w-3.5" />)}
            </span>
            <div className="-mt-0.5">
              <p className={`text-sm font-semibold ${done ? "text-ink" : "text-muted"}`}>
                {statusLabels[s]}
                <span className="sr-only">{done ? " — completed" : " — pending"}</span>
              </p>
              {event && <p className="text-xs text-muted">{formatDateTime(event.at)}</p>}
              {event?.note && <p className="mt-1 text-sm text-ink/85">{event.note}</p>}
            </div>
          </li>);

      })}
    </ol>);

}