import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { transactions as seed } from '../data/transactions';
import type { Transaction, TransactionStatus } from '../types/marketplace';

interface TransactionsContextValue {
  transactions: Transaction[];
  addTransaction: (tx: Transaction) => void;
  sendMessage: (txId: string, text: string) => void;
  setStatus: (txId: string, status: TransactionStatus) => void;
}

const TransactionsContext = createContext<TransactionsContextValue | null>(null);

export function TransactionsProvider({ children }: {children: React.ReactNode;}) {
  const [transactions, setTransactions] = useState<Transaction[]>(seed);

  const addTransaction = useCallback((tx: Transaction) => {
    setTransactions((prev) => [tx, ...prev]);
  }, []);

  const sendMessage = useCallback((txId: string, text: string) => {
    setTransactions((prev) =>
    prev.map((t) =>
    t.id === txId ?
    { ...t, messages: [...t.messages, { id: `m-${Date.now()}`, from: 'me', text, at: new Date().toISOString() }] } :
    t
    )
    );
  }, []);

  const setStatus = useCallback((txId: string, status: TransactionStatus) => {
    setTransactions((prev) => prev.map((t) => t.id === txId ? { ...t, status } : t));
  }, []);

  const value = useMemo(
    () => ({ transactions, addTransaction, sendMessage, setStatus }),
    [transactions, addTransaction, sendMessage, setStatus]
  );

  return <TransactionsContext.Provider value={value}>{children}</TransactionsContext.Provider>;
}

export function useTransactions() {
  const ctx = useContext(TransactionsContext);
  if (!ctx) throw new Error('useTransactions must be used inside TransactionsProvider');
  return ctx;
}