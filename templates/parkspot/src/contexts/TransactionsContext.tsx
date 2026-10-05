import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { format } from 'date-fns';
import { listings } from '../data/listings';
import { transactions as seed } from '../data/transactions';
import type { NewTransactionInput, Transaction, TransactionStatus } from '../types/transaction';

interface TransactionsContextValue {
  transactions: Transaction[];
  addTransaction: (input: NewTransactionInput) => string;
  sendMessage: (txId: string, senderId: string, text: string) => void;
  transition: (txId: string, status: TransactionStatus, label: string) => void;
}

const TransactionsContext = createContext<TransactionsContextValue | null>(null);

const nowIso = () => format(new Date(), "yyyy-MM-dd'T'HH:mm");
const uid = (prefix: string) => `${prefix}-${Math.random().toString(36).slice(2, 9)}`;

export function TransactionsProvider({ children }: {children: React.ReactNode;}) {
  const [transactions, setTransactions] = useState<Transaction[]>(seed);

  const addTransaction = useCallback((input: NewTransactionInput) => {
    const listing = listings.find((l) => l.id === input.listingId);
    const id = `t-${Date.now().toString().slice(-6)}`;
    const at = nowIso();
    const timeline = [{ id: uid('e'), label: 'Reservation requested', at }];
    if (listing?.instantBook) timeline.push({ id: uid('e'), label: 'Instantly confirmed', at });
    const tx: Transaction = {
      id,
      listingId: input.listingId,
      customerId: input.customerId,
      providerId: listing?.hostId ?? '',
      status: listing?.instantBook ? 'Confirmed' : 'Requested',
      arrive: input.arrive,
      leave: input.leave,
      unit: input.unit,
      plate: input.plate,
      vehicle: input.vehicle,
      vehicleSize: input.vehicleSize,
      createdAt: at,
      messages: input.message ? [{ id: uid('m'), senderId: input.customerId, text: input.message, sentAt: at }] : [],
      timeline
    };
    setTransactions((prev) => [tx, ...prev]);
    return id;
  }, []);

  const sendMessage = useCallback((txId: string, senderId: string, text: string) => {
    setTransactions((prev) =>
    prev.map((t) =>
    t.id === txId ? { ...t, messages: [...t.messages, { id: uid('m'), senderId, text, sentAt: nowIso() }] } : t
    )
    );
  }, []);

  const transition = useCallback((txId: string, status: TransactionStatus, label: string) => {
    setTransactions((prev) =>
    prev.map((t) =>
    t.id === txId ? { ...t, status, timeline: [...t.timeline, { id: uid('e'), label, at: nowIso() }] } : t
    )
    );
  }, []);

  const value = useMemo(
    () => ({ transactions, addTransaction, sendMessage, transition }),
    [transactions, addTransaction, sendMessage, transition]
  );

  return <TransactionsContext.Provider value={value}>{children}</TransactionsContext.Provider>;
}

export function useTransactions() {
  const ctx = useContext(TransactionsContext);
  if (!ctx) throw new Error('useTransactions must be used within TransactionsProvider');
  return ctx;
}