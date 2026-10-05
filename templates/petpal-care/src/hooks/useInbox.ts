import { useState } from 'react';
import { transactions as seed } from '../data/transactions';
import type { Transaction, TransactionStatus } from '../types/transaction';

const sampleUpdates = ["/39488fec-0eb0-4f8e-8b9b-87fed47f39d6.jpg", "/686df307-6ae7-4b47-90ed-c99b097ef3eb.jpg", "/92222282-97ab-47c2-9d84-6364d4a48192.jpg"];





export function useInbox() {
  const [items, setItems] = useState<Transaction[]>(seed);
  const now = () => new Date().toISOString();

  const patch = (id: string, fn: (t: Transaction) => Transaction) =>
  setItems((list) => list.map((t) => t.id === id ? fn(t) : t));

  return {
    items,
    setStatus: (id: string, status: TransactionStatus) => patch(id, (t) => ({ ...t, status })),
    sendMessage: (id: string, text: string) =>
    patch(id, (t) => ({ ...t, messages: [...t.messages, { id: `m-${Date.now()}`, from: 'me', text, time: now() }] })),
    addPhotoUpdate: (id: string, caption: string) =>
    patch(id, (t) => ({
      ...t,
      photoUpdates: [
      ...t.photoUpdates,
      { id: `p-${Date.now()}`, image: sampleUpdates[t.photoUpdates.length % sampleUpdates.length], caption, time: now() }]

    }))
  };
}