export type CardBrand = 'visa' | 'mastercard' | 'amex' | 'discover' | 'unknown';

export function detectCardBrand(value: string): CardBrand {
  const d = value.replace(/\D/g, '');
  if (/^4/.test(d)) return 'visa';
  if (/^(5[1-5]|2[2-7])/.test(d)) return 'mastercard';
  if (/^3[47]/.test(d)) return 'amex';
  if (/^6(011|5)/.test(d)) return 'discover';
  return 'unknown';
}

export function formatCardNumber(value: string): string {
  const brand = detectCardBrand(value);
  const max = brand === 'amex' ? 15 : 16;
  const d = value.replace(/\D/g, '').slice(0, max);
  if (brand === 'amex') {
    return [d.slice(0, 4), d.slice(4, 10), d.slice(10)].filter(Boolean).join(' ');
  }
  return d.replace(/(.{4})/g, '$1 ').trim();
}

export function formatExpiry(value: string): string {
  const d = value.replace(/\D/g, '').slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)} / ${d.slice(2)}` : d;
}

export function luhnValid(value: string): boolean {
  const d = value.replace(/\D/g, '');
  if (d.length < 13) return false;
  let sum = 0;
  let double = false;
  for (let i = d.length - 1; i >= 0; i -= 1) {
    let n = Number(d[i]);
    if (double) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    double = !double;
  }
  return sum % 10 === 0;
}

export function expiryValid(value: string): boolean {
  const d = value.replace(/\D/g, '');
  if (d.length !== 4) return false;
  const month = Number(d.slice(0, 2));
  const year = 2000 + Number(d.slice(2));
  if (month < 1 || month > 12) return false;
  const now = new Date();
  return year > now.getFullYear() || year === now.getFullYear() && month >= now.getMonth() + 1;
}