import { useMemo, useState } from 'react';
import { canBookRange, fromDateKey, getNextOpenSlot, getOpenHours, getSlotState, toDateKey } from '../utils/availability';
import { calculatePrice } from '../utils/pricing';
import type { BookingDraft, SubjectId, Tutor } from '../types/marketplace';

const MAX_HOURS = 3;

export function useBooking(tutor: Tutor) {
  const firstSlot = useMemo(() => getNextOpenSlot(tutor), [tutor]);
  const [subject, setSubject] = useState<SubjectId>(tutor.subjects[0].subject);
  const [dateKey, setDateKey] = useState<string>(toDateKey(firstSlot?.date ?? new Date()));
  const [startHour, setStartHour] = useState<number | null>(firstSlot?.hour ?? null);
  const [hours, setHours] = useState(1);
  const [packageLessons, setPackageLessons] = useState(1);

  const date = fromDateKey(dateKey);
  const openHours = getOpenHours(tutor, date);

  /** Longest consecutive run of open hours from the chosen start time. */
  const maxHours = useMemo(() => {
    if (startHour === null) return 1;
    let n = 0;
    while (n < MAX_HOURS && getSlotState(tutor, date, startHour + n) === 'open') n += 1;
    return Math.max(1, n);
  }, [tutor, date, startHour]);

  const discountPercent = tutor.packages.find((p) => p.lessons === packageLessons)?.discountPercent ?? 0;
  const price = calculatePrice(tutor.hourlyRate, hours, packageLessons, discountPercent);
  const isValid = startHour !== null && canBookRange(tutor, date, startHour, hours);

  const selectDate = (key: string) => {
    setDateKey(key);
    const first = getOpenHours(tutor, fromDateKey(key))[0];
    setStartHour(first ?? null);
    setHours(1);
  };

  const selectStart = (hour: number) => {
    setStartHour(hour);
    setHours(1);
  };

  const selectSlot = (key: string, hour: number) => {
    setDateKey(key);
    setStartHour(hour);
    setHours(1);
  };

  const draft: BookingDraft | null =
  isValid && startHour !== null ?
  { tutorId: tutor.id, subject, dateKey, startHour, hours, packageLessons } :
  null;

  return {
    subject,
    setSubject,
    dateKey,
    date,
    selectDate,
    startHour,
    selectStart,
    selectSlot,
    hours,
    setHours: (n: number) => setHours(Math.min(Math.max(1, n), maxHours)),
    maxHours,
    packageLessons,
    setPackageLessons,
    openHours,
    price,
    isValid,
    draft
  };
}

export type BookingState = ReturnType<typeof useBooking>;