import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { differenceInCalendarDays } from 'date-fns';
import { useToast } from '../components/ToastProvider';
import { useAuth } from '../contexts/AuthContext';
import { useBookings } from '../contexts/BookingContext';
import { BookingDraft, Listing } from '../types/marketplace';
import { formatCardNumber, formatExpiry, isExpiryValid, passesLuhn } from '../utils/card';
import { fromDateKey } from '../utils/format';

export interface CardFields {
  number: string;
  expiry: string;
  cvc: string;
  name: string;
  zip: string;
}

type CheckoutErrors = Partial<Record<keyof CardFields | 'players', string>>;

export function useCheckout(draft: BookingDraft | null, listing: Listing | undefined) {
  const { user } = useAuth();
  const { addTransaction, setDraft } = useBookings();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const initialPlayers = () => {
    const me = user?.name ?? '';
    if (!draft) return [me];
    if (draft.bookingType === 'openplay') return Array.from({ length: draft.seats }, (_, i) => i === 0 ? me : '');
    return [me, ''];
  };

  const [players, setPlayers] = useState<string[]>(initialPlayers);
  const [card, setCard] = useState<CardFields>({ number: '', expiry: '', cvc: '', name: user?.name ?? '', zip: '' });
  const [note, setNote] = useState('');
  const [errors, setErrors] = useState<CheckoutErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const maxPlayers = draft?.bookingType === 'openplay' ? draft.seats : listing?.capacity ?? 4;
  const canEditPlayerCount = draft?.bookingType !== 'openplay';

  const setPlayer = (index: number, value: string) => setPlayers((prev) => prev.map((p, i) => i === index ? value : p));
  const addPlayer = () => setPlayers((prev) => prev.length < maxPlayers ? [...prev, ''] : prev);
  const removePlayer = (index: number) => setPlayers((prev) => prev.filter((_, i) => i !== index));

  const updateCard = (field: keyof CardFields, raw: string) => {
    let value = raw;
    if (field === 'number') value = formatCardNumber(raw);
    if (field === 'expiry') value = formatExpiry(raw);
    if (field === 'cvc') value = raw.replace(/\D/g, '').slice(0, 4);
    if (field === 'zip') value = raw.replace(/\D/g, '').slice(0, 5);
    setCard((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    const next: CheckoutErrors = {};
    if (!players[0]?.trim()) next.players = 'Add at least the lead player’s name.';
    if (!passesLuhn(card.number)) next.number = 'Enter a valid card number.';
    if (!isExpiryValid(card.expiry)) next.expiry = 'Enter a valid expiry date.';
    if (card.cvc.length < 3) next.cvc = 'Enter the 3–4 digit code.';
    if (!card.name.trim()) next.name = 'Enter the name on your card.';
    if (card.zip.length !== 5) next.zip = 'Enter a 5-digit ZIP code.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft || !listing || !validate()) return;
    setSubmitting(true);
    window.setTimeout(() => {
      const id = `t-${Date.now().toString().slice(-6)}`;
      const playerNames = players.map((p) => p.trim()).filter(Boolean);
      addTransaction({
        id,
        listingId: listing.id,
        role: 'customer',
        counterpartyId: listing.hostId,
        dayOffset: differenceInCalendarDays(fromDateKey(draft.dateKey), new Date()),
        startHour: draft.startHour,
        hours: draft.hours,
        bookingType: draft.bookingType,
        seats: draft.seats,
        addOnIds: draft.addOnIds,
        players: playerNames,
        status: 'booked',
        messages: [
        ...(note.trim() ? [{ id: `m-${id}-note`, fromMe: true, text: note.trim(), timeLabel: 'Just now' }] : []),
        { id: `m-${id}`, fromMe: false, text: `Thanks for booking with ${listing.clubName}! We’ll confirm your court shortly.`, timeLabel: 'Just now' }]

      });
      setDraft(null);
      setSubmitting(false);
      addToast({ type: 'success', message: 'Booking placed! Invite your players from the inbox.' });
      navigate(`/inbox?tx=${id}`);
    }, 1200);
  };

  return { players, setPlayer, addPlayer, removePlayer, maxPlayers, canEditPlayerCount, card, updateCard, note, setNote, errors, submitting, submit };
}