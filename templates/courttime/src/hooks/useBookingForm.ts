import { useMemo, useState } from 'react';
import { BookingDraft, BookingType, Listing } from '../types/marketplace';
import { getDaySlots, getOpenPlaySessions, isRangeAvailable } from '../utils/availability';
import { formatHour, pluralize, todayKey } from '../utils/format';
import { getBookingQuote } from '../utils/pricing';

interface InitialBooking {
  dateKey?: string | null;
  startHour?: number | null;
  sessionId?: string | null;
}

export function useBookingForm(listing: Listing, initial: InitialBooking = {}) {
  const today = todayKey();
  const [dateKey, setDateKeyState] = useState(initial.dateKey && initial.dateKey >= today ? initial.dateKey : today);
  const [bookingType, setBookingType] = useState<BookingType>(initial.sessionId && listing.openPlay ? 'openplay' : 'private');
  const [startHour, setStartHour] = useState<number | null>(initial.startHour ?? null);
  const [hours, setHours] = useState(listing.minHours);
  const [sessionId, setSessionId] = useState<string | null>(initial.sessionId ?? null);
  const [seats, setSeats] = useState(1);
  const [addOnIds, setAddOnIds] = useState<string[]>([]);

  const slots = useMemo(() => getDaySlots(listing, dateKey), [listing, dateKey]);
  const sessions = useMemo(() => getOpenPlaySessions(listing, dateKey), [listing, dateKey]);
  const selectedSession = sessions.find((s) => s.id === sessionId) ?? null;

  const setDateKey = (key: string) => {
    setDateKeyState(key);
    setStartHour(null);
    setSessionId(null);
    setSeats(1);
  };
  const selectStart = (hour: number) => {
    setBookingType('private');
    setStartHour(hour);
  };
  const selectSession = (id: string) => {
    setBookingType('openplay');
    setSessionId(id);
    setSeats(1);
  };
  const toggleAddOn = (id: string) =>
  setAddOnIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  const effectiveHours = bookingType === 'openplay' ? selectedSession?.durationHours ?? 1 : hours;
  const maxSeats = selectedSession ? Math.max(1, Math.min(4, selectedSession.seatsLeft)) : 1;

  let error: string | null = null;
  if (bookingType === 'private') {
    if (startHour === null) error = 'Pick a start time to continue.';else
    if (startHour + hours > listing.hours.close) error = `The court closes at ${formatHour(listing.hours.close)}.`;else
    if (!isRangeAvailable(slots, startHour, hours)) error = 'Some of those hours are taken. Try a shorter booking or another start time.';
  } else if (!selectedSession) {
    error = 'Choose an open-play session.';
  } else if (selectedSession.isPast) {
    error = 'This session has already started.';
  } else if (selectedSession.seatsLeft < seats) {
    error = selectedSession.seatsLeft === 0 ? 'This session is full.' : `Only ${pluralize(selectedSession.seatsLeft, 'seat')} left.`;
  }

  const quote = useMemo(
    () => getBookingQuote({ listing, bookingType, hours: effectiveHours, seats: bookingType === 'openplay' ? seats : 1, addOnIds }),
    [listing, bookingType, effectiveHours, seats, addOnIds]
  );

  let draft: BookingDraft | null = null;
  if (!error) {
    if (bookingType === 'openplay' && selectedSession) {
      draft = { listingId: listing.id, dateKey, startHour: selectedSession.startHour, hours: selectedSession.durationHours, bookingType, seats, sessionId: selectedSession.id, addOnIds };
    } else if (bookingType === 'private' && startHour !== null) {
      draft = { listingId: listing.id, dateKey, startHour, hours, bookingType, seats: 1, sessionId: null, addOnIds };
    }
  }

  return {
    dateKey,
    setDateKey,
    bookingType,
    setBookingType,
    startHour,
    selectStart,
    hours,
    setHours,
    sessions,
    selectedSession,
    selectSession,
    seats,
    setSeats,
    maxSeats,
    addOnIds,
    toggleAddOn,
    slots,
    quote,
    error,
    draft,
    effectiveHours
  };
}

export type BookingForm = ReturnType<typeof useBookingForm>;