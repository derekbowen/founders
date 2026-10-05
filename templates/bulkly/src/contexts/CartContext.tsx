import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { CartItem } from '../types/marketplace';

interface CartContextValue {
  items: CartItem[];
  totalCases: number;
  addItem: (productId: string, cases: number) => void;
  updateItem: (productId: string, cases: number) => void;
  removeItem: (productId: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const initialCart: CartItem[] = [
{ productId: 'maple-pecan-granola', cases: 3 },
{ productId: 'sea-kelp-bar-soap', cases: 5 }];


export function CartProvider({ children }: {children: React.ReactNode;}) {
  const [items, setItems] = useState<CartItem[]>(initialCart);

  const addItem = useCallback((productId: string, cases: number) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === productId);
      if (existing) return prev.map((i) => i.productId === productId ? { ...i, cases: i.cases + cases } : i);
      return [...prev, { productId, cases }];
    });
  }, []);

  const updateItem = useCallback((productId: string, cases: number) => {
    setItems((prev) => prev.map((i) => i.productId === productId ? { ...i, cases } : i));
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      totalCases: items.reduce((sum, i) => sum + i.cases, 0),
      addItem,
      updateItem,
      removeItem,
      clear
    }),
    [items, addItem, updateItem, removeItem, clear]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}