import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { orders as seedOrders } from '../data/orders';
import type { Order, OrderStatus } from '../types/marketplace';

type NewOrder = Omit<Order, 'id' | 'status' | 'events' | 'messages' | 'createdAt' | 'role'>;

interface OrdersContextValue {
  orders: Order[];
  getOrder: (id: string) => Order | undefined;
  placeOrders: (input: NewOrder[]) => string[];
  sendMessage: (id: string, text: string) => void;
  markShipped: (id: string, carrier: string, trackingNumber: string) => void;
  markHandedOver: (id: string) => void;
  markReceived: (id: string) => void;
  openDispute: (id: string, reason: string) => void;
  cancelOrder: (id: string, reason: string) => void;
}

const OrdersContext = createContext<OrdersContextValue | null>(null);

const nowIso = () => new Date().toISOString();

export function OrdersProvider({ children }: {children: React.ReactNode;}) {
  const [orders, setOrders] = useState<Order[]>(seedOrders);

  const transition = useCallback(
    (id: string, status: OrderStatus, note?: string, patch: Partial<Order> = {}) => {
      setOrders((prev) =>
      prev.map((o) =>
      o.id === id ? { ...o, ...patch, status, events: [...o.events, { status, at: nowIso(), note }] } : o
      )
      );
    },
    []
  );

  const getOrder = useCallback((id: string) => orders.find((o) => o.id === id), [orders]);

  const placeOrders = useCallback((input: NewOrder[]) => {
    const created: Order[] = input.map((o, i): Order => ({
      ...o,
      id: `CR-${10600 + Math.floor(Math.random() * 300) + i}`,
      role: 'purchase',
      status: 'purchased',
      createdAt: nowIso(),
      events: [{ status: 'purchased', at: nowIso() }],
      messages: []
    }));
    setOrders((prev) => [...created, ...prev]);
    return created.map((o) => o.id);
  }, []);

  const sendMessage = useCallback((id: string, text: string) => {
    setOrders((prev) =>
    prev.map((o): Order =>
    o.id === id ?
    { ...o, messages: [...o.messages, { id: `${Date.now()}`, from: 'me', text, at: nowIso() }] } :
    o
    )
    );
  }, []);

  const markShipped = useCallback(
    (id: string, carrier: string, trackingNumber: string) =>
    transition(id, 'shipped', carrier, { carrier, trackingNumber }),
    [transition]
  );
  const markHandedOver = useCallback((id: string) => transition(id, 'delivered', 'Picked up in person'), [transition]);
  const markReceived = useCallback((id: string) => transition(id, 'received'), [transition]);
  const openDispute = useCallback((id: string, reason: string) => transition(id, 'disputed', reason), [transition]);
  const cancelOrder = useCallback((id: string, reason: string) => transition(id, 'cancelled', reason), [transition]);

  const value = useMemo(
    () => ({ orders, getOrder, placeOrders, sendMessage, markShipped, markHandedOver, markReceived, openDispute, cancelOrder }),
    [orders, getOrder, placeOrders, sendMessage, markShipped, markHandedOver, markReceived, openDispute, cancelOrder]
  );

  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
}

export function useOrders(): OrdersContextValue {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error('useOrders must be used within OrdersProvider');
  return ctx;
}