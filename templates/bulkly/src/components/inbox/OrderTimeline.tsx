import React from 'react';
import { AlertTriangleIcon, CheckIcon } from 'lucide-react';
import type { Order, OrderStatus } from '../../types/marketplace';
import { formatDateTime, orderFlow } from '../../utils/orders';

export function OrderTimeline({ order }: {order: Order;}) {
  const disputed = order.status === 'Disputed';
  const reached = new Set(order.history.map((h) => h.status));
  const steps: OrderStatus[] = disputed ? [...orderFlow.filter((s) => reached.has(s)), 'Disputed'] : orderFlow;

  return (
    <ol className="space-y-0">
      {steps.map((step, i) => {
        const event = order.history.find((h) => h.status === step);
        const done = Boolean(event);
        const current = step === order.status;
        const isDispute = step === 'Disputed';
        const last = i === steps.length - 1;
        return (
          <li key={step} className="relative flex gap-3 pb-5 last:pb-0">
            {!last && <span className={`absolute left-[11px] top-6 h-[calc(100%-1.25rem)] w-0.5 ${done ? 'bg-primary-600' : 'bg-slate-200'}`} aria-hidden="true" />}
            <span
              className={`relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
              isDispute ?
              'bg-red-600 text-white' :
              done ?
              'bg-primary-700 text-white' :
              'border-2 border-slate-300 bg-white'} ${
              current && !isDispute ? 'ring-4 ring-primary-100' : ''}`}>
              
              {isDispute ? <AlertTriangleIcon className="h-3.5 w-3.5" aria-hidden="true" /> : done && <CheckIcon className="h-3.5 w-3.5" aria-hidden="true" />}
            </span>
            <div className="min-w-0 pt-0.5">
              <p className={`text-sm font-medium ${done ? 'text-slate-900' : 'text-slate-400'}`}>
                {step}
                {current && <span className="sr-only"> (current)</span>}
              </p>
              {event && <p className="text-xs text-slate-500">{formatDateTime(event.at)}</p>}
              {event?.note && <p className="mt-1 text-xs text-slate-600">{event.note}</p>}
            </div>
          </li>);

      })}
    </ol>);

}