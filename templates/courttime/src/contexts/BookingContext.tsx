import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { transactions as seedTransactions } from '../data/transactions';
import { BookingDraft, Transaction } from '../types/marketplace';

interface BookingContextValue {
  draft: BookingDraft | null;
  setDraft: (draft: BookingDraft | null) => void;
  transactions: Transaction[];
  addTransaction: (tx: Transaction) => void;
  updateTransaction: (id: string, patch: Partial<Transaction>) => void;
  sendMessage: (id: string, text: string) => void;
}

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: {children: React.ReactNode;}) {
  const [draft, setDraft] = useState<BookingDraft | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>(seedTransactions);

  const addTransaction = useCallback((tx: Transaction) => setTransactions((prev) => [tx, ...prev]), []);
  const updateTransaction = useCallback(
    (id: string, patch: Partial<Transaction>) =>
    setTransactions((prev) => prev.map((t) => t.id === id ? { ...t, ...patch } : t)),
    []
  );
  const sendMessage = useCallback((id: string, text: string) => {
    const timeLabel = new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    setTransactions((prev) =>
    prev.map((t) =>
    t.id === id ? { ...t, messages: [...t.messages, { id: `m-${Date.now()}`, fromMe: true, text, timeLabel }] } : t
    )
    );
  }, []);

  const value = useMemo(
    () => ({ draft, setDraft, transactions, addTransaction, updateTransaction, sendMessage }),
    [draft, transactions, addTransaction, updateTransaction, sendMessage]
  );
  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBookings(): BookingContextValue {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBookings must be used inside BookingProvider');
  return ctx;
}