import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { listings as initialListings } from '../data/listings';
import { transactions as initialTransactions } from '../data/transactions';
import { users, CURRENT_USER_ID } from '../data/users';
import { defaultChecklist } from '../utils/transactions';
import type { Listing, NewTransactionInput, Transaction, TxStatus, User } from '../types/marketplace';

interface MarketplaceValue {
  currentUser: User;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  updateProfile: (patch: Partial<User>) => void;
  getUser: (id: string) => User | undefined;
  listings: Listing[];
  getListing: (id: string) => Listing | undefined;
  addListing: (listing: Listing) => void;
  transactions: Transaction[];
  createTransaction: (input: NewTransactionInput) => string;
  updateStatus: (txId: string, status: TxStatus) => void;
  sendMessage: (txId: string, text: string) => void;
  toggleChecklist: (txId: string, itemId: string) => void;
  favorites: string[];
  toggleFavorite: (listingId: string) => void;
}

const MarketplaceContext = createContext<MarketplaceValue | null>(null);

export function MarketplaceProvider({ children }: {children: React.ReactNode;}) {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>(() => users.find((u) => u.id === CURRENT_USER_ID) as User);
  const [listings, setListings] = useState<Listing[]>(initialListings);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [favorites, setFavorites] = useState<string[]>(['l-6', 'l-3']);

  const getUser = useCallback(
    (id: string) => id === currentUser.id ? currentUser : users.find((u) => u.id === id),
    [currentUser]
  );
  const getListing = useCallback((id: string) => listings.find((l) => l.id === id), [listings]);

  const patchTx = useCallback((txId: string, fn: (tx: Transaction) => Transaction) => {
    setTransactions((prev) => prev.map((tx) => tx.id === txId ? fn(tx) : tx));
  }, []);

  const createTransaction = useCallback(
    (input: NewTransactionInput) => {
      const listing = listings.find((l) => l.id === input.listingId);
      const id = `tx-${Date.now().toString().slice(-6)}`;
      const now = new Date().toISOString();
      const tx: Transaction = {
        id,
        listingId: input.listingId,
        customerId: currentUser.id,
        providerId: listing?.ownerId ?? '',
        status: 'requested',
        tripDate: input.tripDate,
        pkg: input.pkg,
        departure: input.departure,
        withCaptain: input.withCaptain,
        guests: input.guests,
        experience: input.experience,
        history: { requested: now },
        messages: input.message.trim() ?
        [{ id: `m-${Date.now()}`, senderId: currentUser.id, text: input.message.trim(), sentAt: now }] :
        [],
        checklist: defaultChecklist(input.withCaptain)
      };
      setTransactions((prev) => [tx, ...prev]);
      return id;
    },
    [listings, currentUser.id]
  );

  const value = useMemo<MarketplaceValue>(
    () => ({
      currentUser,
      isAuthenticated,
      login: () => setAuthenticated(true),
      logout: () => setAuthenticated(false),
      updateProfile: (patch) => setCurrentUser((u) => ({ ...u, ...patch })),
      getUser,
      listings,
      getListing,
      addListing: (listing) => setListings((prev) => [listing, ...prev]),
      transactions,
      createTransaction,
      updateStatus: (txId, status) =>
      patchTx(txId, (tx) => ({ ...tx, status, history: { ...tx.history, [status]: new Date().toISOString() } })),
      sendMessage: (txId, text) =>
      patchTx(txId, (tx) => ({
        ...tx,
        messages: [...tx.messages, { id: `m-${Date.now()}`, senderId: currentUser.id, text, sentAt: new Date().toISOString() }]
      })),
      toggleChecklist: (txId, itemId) =>
      patchTx(txId, (tx) => ({
        ...tx,
        checklist: tx.checklist.map((c) => c.id === itemId ? { ...c, done: !c.done } : c)
      })),
      favorites,
      toggleFavorite: (id) => setFavorites((prev) => prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id])
    }),
    [currentUser, isAuthenticated, getUser, listings, getListing, transactions, createTransaction, patchTx, favorites]
  );

  return <MarketplaceContext.Provider value={value}>{children}</MarketplaceContext.Provider>;
}

export function useMarketplace(): MarketplaceValue {
  const ctx = useContext(MarketplaceContext);
  if (!ctx) throw new Error('useMarketplace must be used within MarketplaceProvider');
  return ctx;
}