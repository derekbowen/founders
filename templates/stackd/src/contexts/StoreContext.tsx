import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { creators } from '../data/creators';
import { listings as seedListings } from '../data/listings';
import { orders as seedOrders } from '../data/orders';
import type { Creator, Listing, Order } from '../types/marketplace';

interface User {
  name: string;
  email: string;
  creatorId: string;
  avatar: string;
}

interface StoreValue {
  user: User | null;
  signIn: (email: string) => void;
  signUp: (name: string, email: string) => void;
  signOut: () => void;
  updateUser: (patch: Partial<User>) => void;
  listings: Listing[];
  getListing: (slug: string) => Listing | undefined;
  getCreator: (id: string) => Creator | undefined;
  addListing: (listing: Listing) => void;
  orders: Order[];
  getOrder: (id: string) => Order | undefined;
  purchase: (listing: Listing, amount: number, email: string) => Order;
  markDownloaded: (orderId: string) => void;
  refund: (orderId: string) => void;
  sendMessage: (orderId: string, text: string) => void;
}

const StoreContext = createContext<StoreValue | null>(null);

const demoCreator = creators[0];
const demoUser: User = {
  name: demoCreator.name,
  email: 'mara@maramakes.co',
  creatorId: demoCreator.id,
  avatar: demoCreator.avatar
};

export function StoreProvider({ children }: {children: React.ReactNode;}) {
  const [user, setUser] = useState<User | null>(demoUser);
  const [createdListings, setCreatedListings] = useState<Listing[]>([]);
  const [orders, setOrders] = useState<Order[]>(seedOrders);

  const listings = useMemo(() => [...createdListings, ...seedListings], [createdListings]);

  const getListing = useCallback((slug: string) => listings.find((l) => l.slug === slug), [listings]);
  const getCreator = useCallback((id: string) => creators.find((c) => c.id === id), []);
  const getOrder = useCallback((id: string) => orders.find((o) => o.id === id), [orders]);

  const signIn = useCallback((email: string) => setUser({ ...demoUser, email: email || demoUser.email }), []);
  const signUp = useCallback(
    (name: string, email: string) => setUser({ ...demoUser, name: name || demoUser.name, email }),
    []
  );
  const signOut = useCallback(() => setUser(null), []);
  const updateUser = useCallback(
    (patch: Partial<User>) => setUser((u) => u ? { ...u, ...patch } : u),
    []
  );

  const addListing = useCallback((listing: Listing) => setCreatedListings((prev) => [listing, ...prev]), []);

  const purchase = useCallback(
    (listing: Listing, amount: number, email: string) => {
      const creator = creators.find((c) => c.id === listing.creatorId);
      const order: Order = {
        id: `ORD-${Math.floor(1100 + Math.random() * 8900)}`,
        listingSlug: listing.slug,
        role: 'buyer',
        counterpartyName: creator?.name ?? 'Creator',
        amount,
        createdAt: new Date().toISOString(),
        status: 'purchased',
        paymentMethod: amount === 0 ? 'Free download' : 'Visa •••• 4242',
        email,
        messages: []
      };
      setOrders((prev) => [order, ...prev]);
      return order;
    },
    []
  );

  const patchOrder = useCallback((id: string, fn: (o: Order) => Order) => {
    setOrders((prev) => prev.map((o) => o.id === id ? fn(o) : o));
  }, []);

  const markDownloaded = useCallback(
    (id: string) => patchOrder(id, (o) => o.status === 'purchased' ? { ...o, status: 'downloaded' } : o),
    [patchOrder]
  );
  const refund = useCallback((id: string) => patchOrder(id, (o) => ({ ...o, status: 'refunded' })), [patchOrder]);
  const sendMessage = useCallback(
    (id: string, text: string) =>
    patchOrder(id, (o) => ({
      ...o,
      messages: [...o.messages, { id: `m${Date.now()}`, from: 'me', text, sentAt: new Date().toISOString() }]
    })),
    [patchOrder]
  );

  const value: StoreValue = {
    user,
    signIn,
    signUp,
    signOut,
    updateUser,
    listings,
    getListing,
    getCreator,
    addListing,
    orders,
    getOrder,
    purchase,
    markDownloaded,
    refund,
    sendMessage
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}