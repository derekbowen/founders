import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { seedOrders } from "../data/orders";
import { Order, OrderStatus } from "../types/marketplace";

interface OrdersValue {
  orders: Order[];
  addOrders: (orders: Order[]) => void;
  updateStatus: (orderId: string, status: OrderStatus, note?: string) => void;
  sendMessage: (orderId: string, text: string) => void;
}

const OrdersContext = createContext<OrdersValue | null>(null);

export function OrdersProvider({ children }: {children: React.ReactNode;}) {
  const [orders, setOrders] = useState<Order[]>(seedOrders);

  const addOrders = useCallback((next: Order[]) => setOrders((prev) => [...next, ...prev]), []);

  const updateStatus = useCallback((orderId: string, status: OrderStatus, note?: string) => {
    setOrders((prev) =>
    prev.map((o) =>
    o.id === orderId ?
    { ...o, status, timeline: [...o.timeline, { status, at: new Date().toISOString(), note }] } :
    o
    )
    );
  }, []);

  const sendMessage = useCallback((orderId: string, text: string) => {
    setOrders((prev) =>
    prev.map((o) =>
    o.id === orderId ?
    {
      ...o,
      messages: [
      ...o.messages,
      { id: `m-${Date.now()}`, from: "me", text, at: new Date().toISOString() }]

    } :
    o
    )
    );
  }, []);

  const value = useMemo(
    () => ({ orders, addOrders, updateStatus, sendMessage }),
    [orders, addOrders, updateStatus, sendMessage]
  );

  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
}

export function useOrders() {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error("useOrders must be used within OrdersProvider");
  return ctx;
}