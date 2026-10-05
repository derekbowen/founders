import { brand } from "../data/brand";
import { PickupWindow } from "../types/marketplace";

const dayIndex: Record<string, number> = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6
};

export interface Slot {
  id: string;
  label: string;
  location: string;
}

/** Next `weeks` upcoming dates for each pickup window, soonest first. */
export function upcomingPickupSlots(windows: PickupWindow[], weeks = 2, from = new Date()): Slot[] {
  const slots: {date: Date;slot: Slot;}[] = [];
  windows.forEach((w) => {
    const target = dayIndex[w.day];
    if (target === undefined) return;
    const first = new Date(from);
    first.setHours(0, 0, 0, 0);
    let diff = (target - first.getDay() + 7) % 7;
    if (diff === 0) diff = 7; // order cutoff: earliest is next week's same day
    for (let i = 0; i < weeks; i++) {
      const d = new Date(first);
      d.setDate(first.getDate() + diff + i * 7);
      const label = `${d.toLocaleDateString(brand.locale, { weekday: "short", month: "short", day: "numeric" })} · ${w.window}`;
      slots.push({ date: d, slot: { id: `${d.toISOString()}-${w.location}`, label, location: w.location } });
    }
  });
  return slots.sort((a, b) => a.date.getTime() - b.date.getTime()).map((s) => s.slot);
}