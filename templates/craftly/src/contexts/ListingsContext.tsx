import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { listings as seedListings } from '../data/listings';
import { makers } from '../data/makers';
import type { Listing, Maker } from '../types/marketplace';

interface ListingsContextValue {
  listings: Listing[];
  getListing: (id: string) => Listing | undefined;
  getMaker: (id: string) => Maker | undefined;
  addListing: (listing: Listing) => void;
  decrementStock: (id: string, quantity: number) => void;
}

const ListingsContext = createContext<ListingsContextValue | null>(null);

export function ListingsProvider({ children }: {children: React.ReactNode;}) {
  const [listings, setListings] = useState<Listing[]>(seedListings);

  const getListing = useCallback((id: string) => listings.find((l) => l.id === id), [listings]);
  const getMaker = useCallback((id: string) => makers.find((m) => m.id === id), []);
  const addListing = useCallback((listing: Listing) => setListings((prev) => [listing, ...prev]), []);
  const decrementStock = useCallback((id: string, quantity: number) => {
    setListings((prev) =>
    prev.map((l) => l.id === id && !l.madeToOrder ? { ...l, stock: Math.max(0, l.stock - quantity) } : l)
    );
  }, []);

  const value = useMemo(
    () => ({ listings, getListing, getMaker, addListing, decrementStock }),
    [listings, getListing, getMaker, addListing, decrementStock]
  );

  return <ListingsContext.Provider value={value}>{children}</ListingsContext.Provider>;
}

export function useListings(): ListingsContextValue {
  const ctx = useContext(ListingsContext);
  if (!ctx) throw new Error('useListings must be used within ListingsProvider');
  return ctx;
}