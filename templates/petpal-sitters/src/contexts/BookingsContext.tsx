import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { images } from '../data/images';
import { myPets } from '../data/pets';
import { initialTransactions } from '../data/transactions';
import type { Message, Pet, Transaction, TransactionStatus } from '../types/marketplace';

type NewTransaction = Omit<Transaction, 'id' | 'messages' | 'photoUpdates' | 'status' | 'unread'> & {note?: string;};

interface BookingsContextValue {
  transactions: Transaction[];
  pets: Pet[];
  favorites: string[];
  addTransaction: (tx: NewTransaction) => string;
  sendMessage: (txId: string, text: string) => void;
  setStatus: (txId: string, status: TransactionStatus, systemText: string) => void;
  addPhotoUpdate: (txId: string, caption: string) => void;
  markRead: (txId: string) => void;
  addPet: (pet: Omit<Pet, 'id'>) => Pet;
  toggleFavorite: (listingId: string) => void;
}

const BookingsContext = createContext<BookingsContextValue | null>(null);

const nowLabel = () =>
`Today, ${new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;

const photoPool = [images.gallery.fetch, images.gallery.yard, images.gallery.trail, images.gallery.brush];

export function BookingsProvider({ children }: {children: React.ReactNode;}) {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [pets, setPets] = useState<Pet[]>(myPets);
  const [favorites, setFavorites] = useState<string[]>(['grace-pearl']);

  const update = useCallback((txId: string, fn: (tx: Transaction) => Transaction) => {
    setTransactions((list) => list.map((tx) => tx.id === txId ? fn(tx) : tx));
  }, []);

  const addTransaction = useCallback((input: NewTransaction) => {
    const id = `tx-${Math.floor(3000 + Math.random() * 6000)}`;
    const { note, ...rest } = input;
    const messages: Message[] = [{ id: 'm1', from: 'system', text: 'Booking requested', time: 'Today' }];
    if (note && note.trim()) messages.push({ id: 'm2', from: 'me', text: note.trim(), time: nowLabel() });
    setTransactions((list) => [{ ...rest, id, status: 'requested', unread: false, messages, photoUpdates: [] }, ...list]);
    return id;
  }, []);

  const sendMessage = useCallback(
    (txId: string, text: string) =>
    update(txId, (tx) => ({
      ...tx,
      messages: [...tx.messages, { id: `m${Date.now()}`, from: 'me', text, time: nowLabel() }]
    })),
    [update]
  );

  const setStatus = useCallback(
    (txId: string, status: TransactionStatus, systemText: string) =>
    update(txId, (tx) => ({
      ...tx,
      status,
      messages: [...tx.messages, { id: `s${Date.now()}`, from: 'system', text: systemText, time: 'Today' }]
    })),
    [update]
  );

  const addPhotoUpdate = useCallback(
    (txId: string, caption: string) =>
    update(txId, (tx) => ({
      ...tx,
      photoUpdates: [
      { id: `p${Date.now()}`, image: photoPool[tx.photoUpdates.length % photoPool.length], caption, time: nowLabel() },
      ...tx.photoUpdates]

    })),
    [update]
  );

  const markRead = useCallback((txId: string) => update(txId, (tx) => tx.unread ? { ...tx, unread: false } : tx), [update]);

  const addPet = useCallback((pet: Omit<Pet, 'id'>) => {
    const created = { ...pet, id: `pet-${Date.now()}` };
    setPets((list) => [...list, created]);
    return created;
  }, []);

  const toggleFavorite = useCallback((listingId: string) => {
    setFavorites((list) => list.includes(listingId) ? list.filter((id) => id !== listingId) : [...list, listingId]);
  }, []);

  const value = useMemo(
    () => ({ transactions, pets, favorites, addTransaction, sendMessage, setStatus, addPhotoUpdate, markRead, addPet, toggleFavorite }),
    [transactions, pets, favorites, addTransaction, sendMessage, setStatus, addPhotoUpdate, markRead, addPet, toggleFavorite]
  );

  return <BookingsContext.Provider value={value}>{children}</BookingsContext.Provider>;
}

export function useBookings(): BookingsContextValue {
  const ctx = useContext(BookingsContext);
  if (!ctx) throw new Error('useBookings must be used within BookingsProvider');
  return ctx;
}