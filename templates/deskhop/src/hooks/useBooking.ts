import { useEffect, useMemo, useState } from 'react';
import type { BookingMode, Listing } from '../types/listing';
import { seatsLeft } from '../utils/availability';
import { getQuote } from '../utils/pricing';
import { durationHours, fromMinutes, hoursForDate, timeSlots, toMinutes, todayISO } from '../utils/time';

export function useBooking(listing: Listing) {
  const [date, setDate] = useState(todayISO());
  const [mode, setMode] = useState<BookingMode>('hour');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [seats, setSeats] = useState(1);

  const dayHours = hoursForDate(listing.openingHours, date);
  const isClosed = !dayHours.open || !dayHours.close;
  const slots = useMemo(
    () => isClosed ? [] : timeSlots(dayHours.open as string, dayHours.close as string),
    [isClosed, dayHours.open, dayHours.close]
  );

  // Reset times to a sensible default when the date or opening hours change.
  useEffect(() => {
    if (isClosed) return;
    const open = toMinutes(dayHours.open as string);
    const close = toMinutes(dayHours.close as string);
    const preferred = Math.max(open, Math.min(9 * 60, close - listing.minHours * 60));
    setStart(fromMinutes(preferred));
    setEnd(fromMinutes(Math.min(close, preferred + Math.max(2, listing.minHours) * 60)));
  }, [date, isClosed, dayHours.open, dayHours.close, listing.minHours]);

  const effectiveStart = mode === 'day' ? dayHours.open ?? '00:00' : start;
  const effectiveEnd = mode === 'day' ? dayHours.close ?? '00:00' : end;

  const available = seatsLeft(listing, date, mode === 'day' ? 'day' : effectiveStart);

  useEffect(() => {
    if (available > 0 && seats > available) setSeats(available);
    if (seats < 1) setSeats(1);
  }, [available, seats]);

  const startOptions = slots.slice(0, -1);
  const endOptions = slots.filter((s) => start && toMinutes(s) > toMinutes(start));

  let error: string | null = null;
  if (isClosed) error = 'This space is closed on the selected day. Try another date.';else
  if (available === 0) error = 'Fully booked for this slot. Try another time or date.';else
  if (mode === 'hour' && (!start || !end || toMinutes(end) <= toMinutes(start)))
  error = 'End time must be after start time.';else
  if (mode === 'hour' && durationHours(start, end) < listing.minHours)
  error = `Minimum booking is ${listing.minHours} ${listing.minHours === 1 ? 'hour' : 'hours'}.`;

  const quote = getQuote(listing, { mode, start: effectiveStart, end: effectiveEnd, seats });

  function onStartChange(value: string) {
    setStart(value);
    if (!end || toMinutes(end) <= toMinutes(value)) {
      const close = toMinutes(dayHours.close as string);
      setEnd(fromMinutes(Math.min(close, toMinutes(value) + listing.minHours * 60)));
    }
  }

  return {
    date,
    setDate,
    mode,
    setMode,
    start: effectiveStart,
    end: effectiveEnd,
    onStartChange,
    setEnd,
    seats,
    setSeats,
    available,
    dayHours,
    isClosed,
    startOptions,
    endOptions,
    quote,
    error
  };
}