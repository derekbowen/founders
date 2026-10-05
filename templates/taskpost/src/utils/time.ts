// The demo data is anchored to this date so relative times ("2 days ago") stay realistic.
const DEMO_NOW = new Date('2026-10-01T10:00:00').getTime();
const loadedAt = Date.now();

export function now(): Date {
  return new Date(DEMO_NOW + (Date.now() - loadedAt));
}

export function nowISO(): string {
  return now().toISOString();
}

export function todayISODate(): string {
  const d = now();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
}

export function createId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}