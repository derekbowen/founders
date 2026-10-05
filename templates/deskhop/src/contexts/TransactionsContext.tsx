import React, { createContext, useContext, useMemo, useState } from 'react';
import { transactions as seed } from '../data/transactions';
import type { Transaction, TxStatus } from '../types/transaction';

interface TransactionsContextValue {
  transactions: Transaction[];
  addTransaction: (tx: Transaction) => void;
  updateStatus: (id: string, status: TxStatus) => void;
  sendMessage: (id: string, senderId: string, text: string) => void;
}

const TransactionsContext = createContext<TransactionsContextValue | null>(null);

export function TransactionsProvider({ children }: {children: React.ReactNode;}) {
  const [transactions, setTransactions] = useState<Transaction[]>(seed);

  const value = useMemo<TransactionsContextValue>(
    () => ({
      transactions,
      addTransaction: (tx) => setTransactions((prev) => [tx, ...prev]),
      updateStatus: (id, status) =>
      setTransactions((prev) =>
      prev.map((t) =>
      t.id === id ?
      { ...t, status, history: [...t.history, { status, at: new Date().toISOString() }] } :
      t
      )
      ),
      sendMessage: (id, senderId, text) =>
      setTransactions((prev) =>
      prev.map((t) =>
      t.id === id ?
      {
        ...t,
        messages: [
        ...t.messages,
        { id: `m-${Date.now()}`, senderId, text, at: new Date().toISOString() }]

      } :
      t
      )
      )
    }),
    [transactions]
  );

  return <TransactionsContext.Provider value={value}>{children}</TransactionsContext.Provider>;
}

export function useTransactions(): TransactionsContextValue {
  const ctx = useContext(TransactionsContext);
  if (!ctx) throw new Error('useTransactions must be used inside TransactionsProvider');
  return ctx;
}