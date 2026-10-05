import { useMemo, useState } from 'react';
import { addDays, differenceInCalendarDays, format, isBefore, isSameDay } from 'date-fns';
import { calculateBreakdown } from '../utils/pricing';
import { getListingService, getServiceMeta, isDateBlocked } from '../utils/listing';
import type { Listing, ServiceId } from '../types/listing';

export function useBooking(listing: Listing) {
  const [serviceId, setServiceIdState] = useState<ServiceId>(listing.services[0].serviceId);
  const [variantId, setVariantId] = useState(listing.services[0].variants[0].id);
  const [start, setStart] = useState<Date | null>(null);
  const [end, setEnd] = useState<Date | null>(null);
  const [sessionTime, setSessionTime] = useState<string>('');
  const [pets, setPets] = useState(1);

  const meta = getServiceMeta(serviceId)!;
  const service = getListingService(listing, serviceId)!;
  const isNightly = meta.unitType === 'night';

  const setServiceId = (id: ServiceId) => {
    const next = getListingService(listing, id);
    setServiceIdState(id);
    if (next) setVariantId(next.variants[0].id);
    setStart(null);
    setEnd(null);
    setSessionTime('');
  };

  const rangeHasBlocked = (a: Date, b: Date) => {
    const n = differenceInCalendarDays(b, a);
    for (let i = 0; i < n; i++) if (isDateBlocked(listing, addDays(a, i))) return true;
    return false;
  };

  const handleDayClick = (day: Date) => {
    if (!isNightly) {
      setStart(day);
      return;
    }
    if (!start || end || isBefore(day, start) || isSameDay(day, start)) {
      setStart(day);
      setEnd(null);
      return;
    }
    if (rangeHasBlocked(start, day)) {
      setStart(day);
      setEnd(null);
      return;
    }
    setEnd(day);
  };

  const breakdown = useMemo(
    () => calculateBreakdown({ listing, serviceId, variantId, start, end, petCount: pets }),
    [listing, serviceId, variantId, start, end, pets]
  );

  const ready = !!breakdown && (isNightly || !!sessionTime);

  const checkoutUrl = useMemo(() => {
    const p = new URLSearchParams({ service: serviceId, variant: variantId, pets: String(pets) });
    if (start) p.set('start', format(start, 'yyyy-MM-dd'));
    if (end) p.set('end', format(end, 'yyyy-MM-dd'));
    if (sessionTime) p.set('time', sessionTime);
    return `/checkout/${listing.id}?${p.toString()}`;
  }, [listing.id, serviceId, variantId, pets, start, end, sessionTime]);

  return {
    serviceId,
    setServiceId,
    variantId,
    setVariantId,
    service,
    meta,
    isNightly,
    start,
    end,
    handleDayClick,
    clearDates: () => {
      setStart(null);
      setEnd(null);
    },
    sessionTime,
    setSessionTime,
    pets,
    setPets,
    breakdown,
    ready,
    checkoutUrl
  };
}