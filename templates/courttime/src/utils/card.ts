export type CardBrand = 'Visa' | 'Mastercard' | 'Amex' | 'Discover' | null;

export function detectCardBrand(number: string): CardBrand {
  const digits = number.replace(/\D/g, '');
  if (/^4/.test(digits)) return 'Visa';
  if (/^(5[1-5]|2[2-7])/.test(digits)) return 'Mastercard';
  if (/^3[47]/.test(digits)) return 'Amex';
  if (/^6(011|5)/.test(digits)) return 'Discover';
  return null;
}

export function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, '');
  const isAmex = /^3[47]/.test(digits);
  if (isAmex) {
    const d = digits.slice(0, 15);
    return [d.slice(0, 4), d.slice(4, 10), d.slice(10)].filter(Boolean).join(' ');
  }
  return digits.slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
}

export function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  return digits.length > 2 ? `${digits.slice(0, 2)} / ${digits.slice(2)}` : digits;
}

export function isExpiryValid(value: string): boolean {
  const digits = value.replace(/\D/g, '');
  if (digits.length !== 4) return false;
  const month = Number(digits.slice(0, 2));
  const year = 2000 + Number(digits.slice(2));
  if (month < 1 || month > 12) return false;
  const now = new Date();
  return year > now.getFullYear() || year === now.getFullYear() && month >= now.getMonth() + 1;
}

export function passesLuhn(number: string): boolean {
  const digits = number.replace(/\D/g, '');
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
  return digits.length >= 15 && sum % 10 === 0;
}