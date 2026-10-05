import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { format } from 'date-fns';
import { transactions as initialTransactions } from '../data/transactions';
import type { Transaction, TransactionStatus } from '../types/transaction';
import { TODAY, toISODate } from '../utils/dates';

interface InboxValue {
  transactions: Transaction[];
  sendMessage: (txId: string, text: string) => void;
  transition: (txId: string, status: TransactionStatus, label: string) => void;
}

const InboxContext = createContext<InboxValue | null>(null);

function nowIso(): string {
  return `${toISODate(TODAY)}T${format(new Date(), 'HH:mm:ss')}`;
}

export function InboxProvider({ children }: {children: React.ReactNode;}) {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);

  const sendMessage = useCallback((txId: string, text: string) => {
    const at = nowIso();
    setTransactions((list) =>
    list.map((t) =>
    t.id === txId ? { ...t, updatedAt: at, messages: [...t.messages, { id: `m-${Date.now()}`, fromMe: true, text, at }] } : t
    )
    );
  }, []);

  const transition = useCallback((txId: string, status: TransactionStatus, label: string) => {
    const at = nowIso();
    setTransactions((list) => list.map((t) => t.id === txId ? { ...t, status, updatedAt: at, timeline: [...t.timeline, { label, at }] } : t));
  }, []);

  const value = useMemo(() => ({ transactions, sendMessage, transition }), [transactions, sendMessage, transition]);
  return <InboxContext.Provider value={value}>{children}</InboxContext.Provider>;
}

export function useInbox(): InboxValue {
  const ctx = useContext(InboxContext);
  if (!ctx) throw new Error('useInbox must be used within InboxProvider');
  return ctx;
}