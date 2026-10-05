import { useState, type FormEvent } from 'react';
import { brand } from '../data/brand';
import { useAuth } from '../contexts/AuthContext';
import { useTransactions } from '../contexts/TransactionsContext';
import type { Experience } from '../types/marketplace';
import { calculatePrice } from '../utils/availability';
import { getHost } from '../utils/lookup';
import { validateCard, type CardErrors, type CardValues } from '../components/checkout/CardForm';

interface GuestEntry {
  name: string;
  dietary: string;
}

export function useCheckout(experience: Experience | undefined, guests: number, privateGroup: boolean, date: string, time: string) {
  const { user } = useAuth();
  const { addTransaction } = useTransactions();
  const [guestList, setGuestList] = useState<GuestEntry[]>(() =>
  Array.from({ length: guests }, (_, i) => ({
    name: i === 0 && user ? `${user.firstName} ${user.lastName}` : '',
    dietary: 'None'
  }))
  );
  const [notes, setNotes] = useState('');
  const [message, setMessage] = useState('');
  const [card, setCard] = useState<CardValues>({ number: '', expiry: '', cvc: '', name: user ? `${user.firstName} ${user.lastName}` : '', postal: '' });
  const [cardErrors, setCardErrors] = useState<CardErrors>({});
  const [guestErrors, setGuestErrors] = useState<Record<number, string>>({});
  const [status, setStatus] = useState<'idle' | 'processing' | 'success'>('idle');
  const [txId, setTxId] = useState<string | null>(null);

  const price = experience ? calculatePrice(experience, guests, privateGroup, brand.serviceFeeRate) : null;

  const updateGuest = (index: number, patch: Partial<GuestEntry>) => {
    setGuestList((prev) => prev.map((g, i) => i === index ? { ...g, ...patch } : g));
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!experience || !price) return;
    const gErr: Record<number, string> = {};
    guestList.forEach((g, i) => {
      if (!g.name.trim()) gErr[i] = 'Enter a name for this guest';
    });
    const cErr = validateCard(card);
    setGuestErrors(gErr);
    setCardErrors(cErr);
    if (Object.keys(gErr).length || Object.keys(cErr).length) return;

    setStatus('processing');
    window.setTimeout(() => {
      const id = `tx-${Math.floor(3000 + Math.random() * 6000)}`;
      const host = getHost(experience.hostId);
      addTransaction({
        id,
        role: 'trip',
        experienceId: experience.id,
        counterpartName: host?.name ?? 'Host',
        date,
        time,
        guests,
        privateGroup,
        total: price.total,
        status: 'booked',
        createdAt: new Date().toISOString(),
        messages: message.trim() ? [{ id: 'm1', from: 'me', text: message.trim(), at: new Date().toISOString() }] : []
      });
      setTxId(id);
      setStatus('success');
    }, 1400);
  };

  return {
    guestList,
    updateGuest,
    guestErrors,
    notes,
    setNotes,
    message,
    setMessage,
    card,
    setCard,
    cardErrors,
    status,
    txId,
    price,
    submit
  };
}