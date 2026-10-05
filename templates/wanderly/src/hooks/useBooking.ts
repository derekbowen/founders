import { useEffect, useMemo, useState } from 'react';
import { brand } from '../data/brand';
import type { Experience } from '../types/marketplace';
import { calculatePrice, getDepartures, nextDaysISO } from '../utils/availability';

export function useBooking(experience: Experience, initialDate?: string, initialGuests?: number) {
  const dates = useMemo(() => nextDaysISO(14), []);
  const [date, setDate] = useState(initialDate && dates.includes(initialDate) ? initialDate : dates[0]);
  const [time, setTime] = useState<string | null>(null);
  const [guests, setGuests] = useState(Math.max(experience.minGuests, initialGuests ?? experience.minGuests));
  const [privateGroup, setPrivateGroup] = useState(false);

  const departures = useMemo(() => getDepartures(experience, date), [experience, date]);
  const selected = departures.find((d) => d.time === time) ?? null;

  // Auto-select first available departure when date changes
  useEffect(() => {
    const firstOpen = departures.find((d) => d.seatsLeft > 0);
    setTime(firstOpen ? firstOpen.time : null);
  }, [departures]);

  const maxGuests = selected ? privateGroup ? selected.capacity : selected.seatsLeft : experience.maxGuests;
  const privateAvailable = Boolean(selected && selected.seatsLeft === selected.capacity);

  useEffect(() => {
    if (guests > maxGuests && maxGuests > 0) setGuests(maxGuests);
  }, [maxGuests, guests]);

  useEffect(() => {
    if (!privateAvailable && privateGroup) setPrivateGroup(false);
  }, [privateAvailable, privateGroup]);

  const price = calculatePrice(experience, guests, privateGroup, brand.serviceFeeRate);
  const canBook = Boolean(selected && selected.seatsLeft >= (privateGroup ? selected.capacity : guests));

  const checkoutUrl = `/checkout/${experience.id}?${new URLSearchParams({
    date,
    time: time ?? '',
    guests: String(guests),
    ...(privateGroup ? { private: '1' } : {})
  }).toString()}`;

  return {
    dates,
    date,
    setDate,
    time,
    setTime,
    guests,
    setGuests,
    privateGroup,
    setPrivateGroup,
    departures,
    selected,
    maxGuests,
    privateAvailable,
    price,
    canBook,
    checkoutUrl
  };
}