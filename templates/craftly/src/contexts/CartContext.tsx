import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { CartItem } from '../types/marketplace';

interface CartContextValue {
  items: CartItem[];
  count: number;
  addItem: (listingId: string, quantity: number, selections: Record<string, string>) => void;
  updateQuantity: (key: string, quantity: number) => void;
  removeItem: (key: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function itemKey(listingId: string, selections: Record<string, string>): string {
  const sel = Object.entries(selections).
  sort(([a], [b]) => a.localeCompare(b)).
  map(([k, v]) => `${k}:${v}`).
  join('|');
  return `${listingId}__${sel}`;
}

export function CartProvider({ children }: {children: React.ReactNode;}) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((listingId: string, quantity: number, selections: Record<string, string>) => {
    const key = itemKey(listingId, selections);
    setItems((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing) return prev.map((i) => i.key === key ? { ...i, quantity: i.quantity + quantity } : i);
      return [...prev, { key, listingId, quantity, selections }];
    });
  }, []);

  const updateQuantity = useCallback((key: string, quantity: number) => {
    setItems((prev) => prev.map((i) => i.key === key ? { ...i, quantity: Math.max(1, quantity) } : i));
  }, []);

  const removeItem = useCallback((key: string) => setItems((prev) => prev.filter((i) => i.key !== key)), []);
  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(
    () => ({ items, count: items.reduce((s, i) => s + i.quantity, 0), addItem, updateQuantity, removeItem, clear }),
    [items, addItem, updateQuantity, removeItem, clear]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}