import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type {
  ChatMessage,
  CurrentUser,
  Listing,
  Transaction,
  TransactionStatus } from
'../types/marketplace';
import { listings as listingSeed } from '../data/listings';
import { transactionsSeed } from '../data/transactions';
import { currentUserSeed } from '../data/hosts';

interface MarketplaceState {
  user: CurrentUser | null;
  login: (email?: string) => void;
  logout: () => void;
  updateUser: (patch: Partial<CurrentUser>) => void;
  listings: Listing[];
  addListing: (listing: Listing) => void;
  getListing: (id: string) => Listing | undefined;
  transactions: Transaction[];
  addTransaction: (tx: Transaction) => void;
  setStatus: (id: string, status: TransactionStatus, note?: string) => void;
  sendMessage: (id: string, text: string) => void;
  markRead: (id: string) => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
}

const MarketplaceContext = createContext<MarketplaceState | null>(null);

export function MarketplaceProvider({ children }: {children: React.ReactNode;}) {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [listings, setListings] = useState<Listing[]>(listingSeed);
  const [transactions, setTransactions] = useState<Transaction[]>(transactionsSeed);
  const [favorites, setFavorites] = useState<string[]>([]);

  const login = useCallback((email?: string) => {
    setUser({ ...currentUserSeed, email: email || currentUserSeed.email });
  }, []);
  const logout = useCallback(() => setUser(null), []);
  const updateUser = useCallback(
    (patch: Partial<CurrentUser>) => setUser((u) => u ? { ...u, ...patch } : u),
    []
  );

  const addListing = useCallback((listing: Listing) => setListings((l) => [listing, ...l]), []);
  const getListing = useCallback((id: string) => listings.find((l) => l.id === id), [listings]);

  const addTransaction = useCallback(
    (tx: Transaction) => setTransactions((t) => [tx, ...t]),
    []
  );

  const setStatus = useCallback((id: string, status: TransactionStatus, note?: string) => {
    const now = new Date().toISOString();
    setTransactions((all) =>
    all.map((t) => {
      if (t.id !== id) return t;
      const sys: ChatMessage = {
        id: `sys-${Date.now()}`,
        from: 'system',
        text: note ?? `Status changed to ${status}`,
        time: now
      };
      return { ...t, status, updatedAt: now, messages: [...t.messages, sys] };
    })
    );
  }, []);

  const sendMessage = useCallback((id: string, text: string) => {
    const now = new Date().toISOString();
    setTransactions((all) =>
    all.map((t) =>
    t.id === id ?
    {
      ...t,
      updatedAt: now,
      messages: [...t.messages, { id: `m-${Date.now()}`, from: 'me', text, time: now }]
    } :
    t
    )
    );
  }, []);

  const markRead = useCallback((id: string) => {
    setTransactions((all) => all.map((t) => t.id === id && t.unread ? { ...t, unread: false } : t));
  }, []);

  const toggleFavorite = useCallback(
    (id: string) =>
    setFavorites((f) => f.includes(id) ? f.filter((x) => x !== id) : [...f, id]),
    []
  );

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      updateUser,
      listings,
      addListing,
      getListing,
      transactions,
      addTransaction,
      setStatus,
      sendMessage,
      markRead,
      favorites,
      toggleFavorite
    }),
    [user, login, logout, updateUser, listings, addListing, getListing, transactions, addTransaction, setStatus, sendMessage, markRead, favorites, toggleFavorite]
  );

  return <MarketplaceContext.Provider value={value}>{children}</MarketplaceContext.Provider>;
}

export function useMarketplace(): MarketplaceState {
  const ctx = useContext(MarketplaceContext);
  if (!ctx) throw new Error('useMarketplace must be used inside MarketplaceProvider');
  return ctx;
}