import { useCallback, useState } from 'react';
import { orders as initialOrders } from '../data/orders';
import type { Order, OrderStatus } from '../types/marketplace';

export function needsAction(order: Order): boolean {
  if (order.role === 'sale') return order.status === 'Ordered' || order.status === 'Confirmed';
  return order.status === 'Delivered';
}

export function useInbox() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  const updateStatus = useCallback((orderId: string, status: OrderStatus, note?: string) => {
    setOrders((prev) =>
    prev.map((o) => {
      if (o.id !== orderId) return o;
      const now = new Date().toISOString();
      const tracking =
      status === 'Shipped' && !o.tracking ?
      { carrier: 'UPS Ground', number: `1Z ${Math.random().toString(36).slice(2, 5).toUpperCase()} 9X2 03 ${Math.floor(1000 + Math.random() * 8999)} ${Math.floor(1000 + Math.random() * 8999)}`, eta: new Date(Date.now() + 4 * 86_400_000).toISOString().slice(0, 10) } :
      o.tracking;
      return { ...o, status, tracking, history: [...o.history, { status, at: now, note }] };
    })
    );
  }, []);

  const sendMessage = useCallback((orderId: string, body: string) => {
    setOrders((prev) =>
    prev.map((o) =>
    o.id === orderId ?
    {
      ...o,
      messages: [...o.messages, { id: `m-${Date.now()}`, from: 'me', author: 'Priya', body, sentAt: new Date().toISOString() }]
    } :
    o
    )
    );
  }, []);

  return { orders, updateStatus, sendMessage };
}