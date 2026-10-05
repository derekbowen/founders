import { useState } from 'react';

export type CardBrand = 'visa' | 'mastercard' | 'amex' | 'unknown';

export interface CardErrors {
  name?: string;
  number?: string;
  expiry?: string;
  cvc?: string;
  zip?: string;
}

function detectBrand(digits: string): CardBrand {
  if (/^4/.test(digits)) return 'visa';
  if (/^(5[1-5]|2[2-7])/.test(digits)) return 'mastercard';
  if (/^3[47]/.test(digits)) return 'amex';
  return 'unknown';
}

function luhn(digits: string): boolean {
  let sum = 0;
  let double = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let d = Number(digits[i]);
    if (double) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
    double = !double;
  }
  return sum % 10 === 0;
}

export function useCardForm() {
  const [name, setName] = useState('');
  const [number, setNumberRaw] = useState('');
  const [expiry, setExpiryRaw] = useState('');
  const [cvc, setCvcRaw] = useState('');
  const [zip, setZipRaw] = useState('');
  const [errors, setErrors] = useState<CardErrors>({});

  const digits = number.replace(/\D/g, '');
  const brand = detectBrand(digits);

  const setNumber = (v: string) => {
    const d = v.replace(/\D/g, '').slice(0, brand === 'amex' ? 15 : 16);
    setNumberRaw(d.replace(/(.{4})/g, '$1 ').trim());
  };
  const setExpiry = (v: string) => {
    const d = v.replace(/\D/g, '').slice(0, 4);
    setExpiryRaw(d.length > 2 ? `${d.slice(0, 2)} / ${d.slice(2)}` : d);
  };
  const setCvc = (v: string) => setCvcRaw(v.replace(/\D/g, '').slice(0, brand === 'amex' ? 4 : 3));
  const setZip = (v: string) => setZipRaw(v.replace(/\D/g, '').slice(0, 5));

  const validate = (): boolean => {
    const next: CardErrors = {};
    if (!name.trim()) next.name = 'Enter the name on your card.';
    if (digits.length < 15 || !luhn(digits)) next.number = 'Your card number is invalid.';
    const [mm, yy] = expiry.split(' / ').map(Number);
    const now = new Date();
    const expDate = new Date(2000 + (yy || 0), mm || 0, 1);
    if (!mm || mm > 12 || !yy || expDate <= now) next.expiry = 'Your card’s expiration date is invalid.';
    if (cvc.length < 3) next.cvc = 'Your card’s security code is incomplete.';
    if (zip.length !== 5) next.zip = 'Your ZIP code is incomplete.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  return { name, setName, number, setNumber, expiry, setExpiry, cvc, setCvc, zip, setZip, brand, errors, validate, last4: digits.slice(-4) };
}

export type CardForm = ReturnType<typeof useCardForm>;