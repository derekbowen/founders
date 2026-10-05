import { useState } from 'react';
import { transactions as seed } from '../data/transactions';
import type { Transaction, TxStatus } from '../types/marketplace';

export function useInbox() {
  const [items, setItems] = useState<Transaction[]>(seed);

  const setStatus = (id: string, status: TxStatus) =>
  setItems((list) => list.map((t) => t.id === id ? { ...t, status, updatedLabel: 'Just now' } : t));

  const sendMessage = (id: string, text: string) =>
  setItems((list) =>
  list.map((t) =>
  t.id === id ?
  {
    ...t,
    updatedLabel: 'Just now',
    messages: [...t.messages, { id: `m${Date.now()}`, fromMe: true, text, time: 'Just now' }]
  } :
  t
  )
  );

  return { items, setStatus, sendMessage };
}