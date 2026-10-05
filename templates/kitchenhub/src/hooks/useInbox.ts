import { useCallback, useState } from 'react';
import { transactions } from '../data/transactions';
import type { BookingStatus, Transaction } from '../types/marketplace';
import { toggleValue } from '../utils/search';

export function useInbox() {
  const [items, setItems] = useState<Transaction[]>(transactions);

  const updateTx = useCallback((id: string, fn: (t: Transaction) => Transaction) => {
    setItems((list) => list.map((t) => t.id === id ? fn(t) : t));
  }, []);

  const sendMessage = useCallback(
    (id: string, text: string) =>
    updateTx(id, (t) => ({
      ...t,
      messages: [...t.messages, { id: `m-${Date.now()}`, from: 'me', text, at: new Date().toISOString() }]
    })),
    [updateTx]
  );

  const transition = useCallback(
    (id: string, status: BookingStatus, label: string) =>
    updateTx(id, (t) => ({ ...t, status, timeline: [...t.timeline, { label, at: new Date().toISOString() }] })),
    [updateTx]
  );

  const toggleChecklist = useCallback(
    (id: string, itemId: string) => updateTx(id, (t) => ({ ...t, checklistDone: toggleValue(t.checklistDone, itemId) })),
    [updateTx]
  );

  return { items, sendMessage, transition, toggleChecklist };
}