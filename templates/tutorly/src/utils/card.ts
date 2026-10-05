export type CardBrand = 'visa' | 'mastercard' | 'amex' | 'unknown';

export function detectCardBrand(number: string): CardBrand {
  const n = number.replace(/\D/g, '');
  if (/^4/.test(n)) return 'visa';
  if (/^(5[1-5]|2[2-7])/.test(n)) return 'mastercard';
  if (/^3[47]/.test(n)) return 'amex';
  return 'unknown';
}

export function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 16);
  return digits.replace(/(.{4})/g, '$1 ').trim();
}

export function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  return digits.length > 2 ? `${digits.slice(0, 2)} / ${digits.slice(2)}` : digits;
}

export function passesLuhn(number: string): boolean {
  const digits = number.replace(/\D/g, '');
  if (digits.length < 13) return false;
  let sum = 0;
  let double = false;
  for (let i = digits.length - 1; i >= 0; i -= 1) {
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

export function isExpiryValid(value: string): boolean {
  const [mm, yy] = value.split('/').map((p) => p.trim());
  const month = Number(mm);
  const year = Number(yy);
  if (!month || month > 12 || !yy || yy.length !== 2) return false;
  const now = new Date();
  const currentYear = now.getFullYear() % 100;
  return year > currentYear || year === currentYear && month >= now.getMonth() + 1;
}