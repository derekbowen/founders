import { HourSlot, Listing, OpenPlaySessionInstance } from '../types/marketplace';
import { todayKey } from './format';

function hashString(value: string): number {
  let h = 2166136261;
  for (let i = 0; i < value.length; i++) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function seededRandom(seed: number): () => number {
  let t = seed;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ t >>> 15, 1 | t);
    r ^= r + Math.imul(r ^ r >>> 7, 61 | r);
    return ((r ^ r >>> 14) >>> 0) / 4294967296;
  };
}

export function getOpenPlaySessions(listing: Listing, dateKey: string): OpenPlaySessionInstance[] {
  const config = listing.openPlay;
  if (!config) return [];
  const isToday = dateKey === todayKey();
  const nowHour = new Date().getHours();
  const rand = seededRandom(hashString(`${listing.id}-op-${dateKey}`));
  return config.sessions.map((session) => {
    const taken = isToday ? session.seatsTaken : Math.floor(rand() * (config.seatsTotal + 1));
    return {
      ...session,
      seatsTotal: config.seatsTotal,
      seatsLeft: Math.max(0, config.seatsTotal - taken),
      pricePerSeat: config.pricePerSeat,
      isPast: isToday && session.startHour <= nowHour
    };
  });
}

export function getDaySlots(listing: Listing, dateKey: string): HourSlot[] {
  const rand = seededRandom(hashString(`${listing.id}-${dateKey}`));
  const isToday = dateKey === todayKey();
  const nowHour = new Date().getHours();
  const openPlayHours = new Set<number>();
  listing.openPlay?.sessions.forEach((s) => {
    for (let h = s.startHour; h < s.startHour + s.durationHours; h++) openPlayHours.add(h);
  });
  const slots: HourSlot[] = [];
  for (let hour = listing.hours.open; hour < listing.hours.close; hour++) {
    const r = rand();
    if (isToday && hour <= nowHour) slots.push({ hour, status: 'past' });else
    if (openPlayHours.has(hour)) slots.push({ hour, status: 'openplay' });else
    if (r < 0.28) slots.push({ hour, status: 'booked' });else
    slots.push({ hour, status: 'available' });
  }
  return slots;
}

export function isRangeAvailable(slots: HourSlot[], startHour: number, hours: number): boolean {
  for (let i = 0; i < hours; i++) {
    const slot = slots.find((s) => s.hour === startHour + i);
    if (!slot || slot.status !== 'available') return false;
  }
  return true;
}

export function getNextAvailableHours(listing: Listing, dateKey: string, count = 3): number[] {
  return getDaySlots(listing, dateKey).
  filter((s) => s.status === 'available').
  slice(0, count).
  map((s) => s.hour);
}

export interface UpcomingSession {
  listing: Listing;
  session: OpenPlaySessionInstance;
}

export function getUpcomingOpenPlay(listings: Listing[], dateKey: string): UpcomingSession[] {
  return listings.
  flatMap((listing) => getOpenPlaySessions(listing, dateKey).map((session) => ({ listing, session }))).
  filter((item) => !item.session.isPast).
  sort((a, b) => a.session.startHour - b.session.startHour);
}