export type CardBrand = 'Visa' | 'Mastercard' | 'Amex' | 'Discover' | '';

export interface CardDetails {
  number: string;
  expiry: string;
  cvc: string;
  name: string;
  zip: string;
}

export type CardErrors = Partial<Record<keyof CardDetails, string>>;

const digits = (v: string) => v.replace(/\D/g, '');

export function detectBrand(value: string): CardBrand {
  const d = digits(value);
  if (/^4/.test(d)) return 'Visa';
  if (/^(5[1-5]|2[2-7])/.test(d)) return 'Mastercard';
  if (/^3[47]/.test(d)) return 'Amex';
  if (/^6(011|5)/.test(d)) return 'Discover';
  return '';
}

export function formatCardNumber(value: string) {
  const brand = detectBrand(value);
  const d = digits(value).slice(0, brand === 'Amex' ? 15 : 16);
  if (brand === 'Amex') return [d.slice(0, 4), d.slice(4, 10), d.slice(10)].filter(Boolean).join(' ');
  return d.replace(/(.{4})/g, '$1 ').trim();
}

export function formatExpiry(value: string) {
  const d = digits(value).slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)} / ${d.slice(2)}` : d;
}

function luhn(value: string) {
  let sum = 0;
  let double = false;
  for (let i = value.length - 1; i >= 0; i--) {
    let n = Number(value[i]);
    if (double) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    double = !double;
  }
  return sum % 10 === 0;
}

export function validateCard(card: CardDetails): CardErrors {
  const errors: CardErrors = {};
  const num = digits(card.number);
  const len = detectBrand(card.number) === 'Amex' ? 15 : 16;
  if (num.length !== len || !luhn(num)) errors.number = 'Your card number is invalid.';
  const exp = digits(card.expiry);
  const month = Number(exp.slice(0, 2));
  const year = 2000 + Number(exp.slice(2, 4));
  const now = new Date();
  if (exp.length !== 4 || month < 1 || month > 12) errors.expiry = 'Your card’s expiration date is incomplete.';else
  if (year < now.getFullYear() || year === now.getFullYear() && month < now.getMonth() + 1)
  errors.expiry = 'Your card’s expiration year is in the past.';
  if (digits(card.cvc).length < 3) errors.cvc = 'Your card’s security code is incomplete.';
  if (card.name.trim().length < 2) errors.name = 'Enter the name on your card.';
  if (digits(card.zip).length !== 5) errors.zip = 'Your ZIP is incomplete.';
  return errors;
}