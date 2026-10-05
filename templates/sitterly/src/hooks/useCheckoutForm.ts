import { useState } from 'react';
import { Child } from '../types/transaction';

export interface CardDetails {
  number: string;
  expiry: string;
  cvc: string;
  name: string;
  zip: string;
}

export type CheckoutStatus = 'idle' | 'submitting' | 'success' | 'declined';

const DECLINE_TEST_CARD = '4000000000000002';

export function formatCardNumber(raw: string): string {
  return raw.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
}

export function formatExpiry(raw: string): string {
  const d = raw.replace(/\D/g, '').slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)} / ${d.slice(2)}` : d;
}

export function useCheckoutForm(initialKids: number) {
  const [children, setChildren] = useState<Child[]>(Array.from({ length: initialKids }, () => ({ name: '', age: '' })));
  const [allergies, setAllergies] = useState('');
  const [bedtime, setBedtime] = useState('');
  const [notes, setNotes] = useState('');
  const [emergency, setEmergency] = useState({ name: '', phone: '' });
  const [card, setCard] = useState<CardDetails>({ number: '', expiry: '', cvc: '', name: '', zip: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<CheckoutStatus>('idle');

  const updateChild = (index: number, patch: Partial<Child>) =>
  setChildren((list) => list.map((c, i) => i === index ? { ...c, ...patch } : c));
  const addChild = () => setChildren((list) => [...list, { name: '', age: '' }]);
  const removeChild = (index: number) => setChildren((list) => list.filter((_, i) => i !== index));

  const validate = (): Record<string, string> => {
    const e: Record<string, string> = {};
    children.forEach((c, i) => {
      if (!c.name.trim()) e[`child-${i}-name`] = 'Add a first name';
      if (!c.age.trim()) e[`child-${i}-age`] = 'Add an age';
    });
    if (!emergency.name.trim()) e['emergency-name'] = 'Emergency contact is required';
    if (emergency.phone.replace(/\D/g, '').length < 10) e['emergency-phone'] = 'Enter a 10-digit phone number';
    const digits = card.number.replace(/\D/g, '');
    if (digits.length < 15) e['card-number'] = 'Your card number is incomplete';
    const [mm, yy] = card.expiry.split(' / ').map(Number);
    if (!mm || !yy || mm > 12) e['card-expiry'] = 'Enter a valid expiry date';else
    if (2000 + yy < 2026 || 2000 + yy === 2026 && mm < 10) e['card-expiry'] = 'Your card has expired';
    if (card.cvc.length < 3) e['card-cvc'] = 'CVC is incomplete';
    if (!card.name.trim()) e['card-name'] = 'Name on card is required';
    if (card.zip.length < 5) e['card-zip'] = 'ZIP is incomplete';
    return e;
  };

  const submit = async (): Promise<boolean> => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) {
      const first = document.getElementById(Object.keys(e)[0]);
      first?.focus();
      return false;
    }
    setStatus('submitting');
    await new Promise((r) => setTimeout(r, 1200));
    if (card.number.replace(/\D/g, '') === DECLINE_TEST_CARD) {
      setStatus('declined');
      return false;
    }
    setStatus('success');
    return true;
  };

  return {
    children, updateChild, addChild, removeChild,
    allergies, setAllergies, bedtime, setBedtime, notes, setNotes,
    emergency, setEmergency, card, setCard,
    errors, status, submit
  };
}