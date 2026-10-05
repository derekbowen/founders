export function formatCardNumber(value: string): string {
  return value.
  replace(/\D/g, '').
  slice(0, 16).
  replace(/(.{4})/g, '$1 ').
  trim();
}

export function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  return digits.length > 2 ? `${digits.slice(0, 2)} / ${digits.slice(2)}` : digits;
}

export function cardBrand(number: string): string | null {
  const n = number.replace(/\s/g, '');
  if (/^4/.test(n)) return 'Visa';
  if (/^(5[1-5]|2[2-7])/.test(n)) return 'Mastercard';
  if (/^3[47]/.test(n)) return 'Amex';
  return null;
}

export function isValidExpiry(value: string): boolean {
  const digits = value.replace(/\D/g, '');
  if (digits.length !== 4) return false;
  const month = Number(digits.slice(0, 2));
  const year = 2000 + Number(digits.slice(2));
  if (month < 1 || month > 12) return false;
  const now = new Date();
  return year > now.getFullYear() || year === now.getFullYear() && month >= now.getMonth() + 1;
}

export function isValidVat(value: string): boolean {
  return /^[A-Z]{2}[A-Z0-9]{6,12}$/.test(value.replace(/\s/g, '').toUpperCase());
}