import { useMemo, useState } from 'react';
import { addDays, differenceInCalendarDays } from 'date-fns';
import type { Listing, ServiceId } from '../types/marketplace';
import { dayFromOffset, fromInputDate, toInputDate } from '../utils/format';
import { computeBreakdown, getService } from '../utils/pricing';

export interface BookingInitial {
  serviceId?: string | null;
  start?: string | null;
  end?: string | null;
  pets?: number;
}

export function useBookingForm(listing: Listing, initial: BookingInitial = {}) {
  const offered = listing.services.map((s) => s.serviceId);
  const initialService = (offered.includes(initial.serviceId as ServiceId) ? initial.serviceId : offered[0]) as ServiceId;

  const [serviceId, setServiceIdState] = useState<ServiceId>(initialService);
  const [variationId, setVariationId] = useState<string>(
    listing.services.find((s) => s.serviceId === initialService)?.variations[0].id ?? ''
  );
  const [start, setStart] = useState(initial.start ?? '');
  const [end, setEnd] = useState(initial.end ?? '');
  const [time, setTime] = useState('');
  const [pets, setPets] = useState(Math.min(initial.pets ?? 1, listing.maxPets));

  const service = getService(serviceId);
  const isNight = service.unitType === 'night';
  const offering = listing.services.find((s) => s.serviceId === serviceId) ?? listing.services[0];
  const variation = offering.variations.find((v) => v.id === variationId) ?? offering.variations[0];

  const blocked = useMemo(() => new Set(listing.blockedDays.map((d) => toInputDate(dayFromOffset(d)))), [listing.blockedDays]);

  const setServiceId = (id: ServiceId) => {
    setServiceIdState(id);
    const next = listing.services.find((s) => s.serviceId === id);
    setVariationId(next?.variations[0].id ?? '');
    if (getService(id).unitType !== 'night') setEnd('');
  };

  const pickDate = (value: string) => {
    if (blocked.has(value)) return;
    if (!isNight) {
      setStart(value);
      return;
    }
    if (!start || start && end || value <= start) {
      setStart(value);
      setEnd('');
    } else {
      setEnd(value);
    }
  };

  const { units, error } = useMemo(() => {
    const s = fromInputDate(start);
    if (!s) return { units: 0, error: '' };
    const today = dayFromOffset(0);
    if (s < today) return { units: 0, error: 'Choose a date in the future.' };
    if (!isNight) {
      if (blocked.has(start)) return { units: 0, error: `${listing.sitter.firstName} isn’t available on that day.` };
      return { units: 1, error: '' };
    }
    const e = fromInputDate(end);
    if (!e) return { units: 0, error: '' };
    const nights = differenceInCalendarDays(e, s);
    if (nights <= 0) return { units: 0, error: 'Pick-up must be after drop-off.' };
    for (let i = 0; i < nights; i++) {
      if (blocked.has(toInputDate(addDays(s, i)))) {
        return { units: 0, error: `${listing.sitter.firstName} is unavailable for some of those nights.` };
      }
    }
    return { units: nights, error: '' };
  }, [start, end, isNight, blocked, listing.sitter.firstName]);

  const ready = units > 0 && !error && (isNight || !!time);
  const breakdown = units > 0 && !error ?
  computeBreakdown({ unitPrice: variation.price, units, pets, extraPetPrice: offering.extraPetPrice, unitLabel: service.unitLabel }) :
  null;

  const checkoutQuery = () => {
    const p = new URLSearchParams({ service: serviceId, variation: variation.id, start, pets: String(pets) });
    if (isNight) p.set('end', end);else
    p.set('time', time);
    return p.toString();
  };

  return {
    service,
    isNight,
    offering,
    variation,
    serviceId,
    setServiceId,
    variationId: variation.id,
    setVariationId,
    start,
    setStart,
    end,
    setEnd,
    time,
    setTime,
    pets,
    setPets,
    pickDate,
    blocked,
    units,
    error,
    ready,
    breakdown,
    checkoutQuery
  };
}

export type BookingForm = ReturnType<typeof useBookingForm>;