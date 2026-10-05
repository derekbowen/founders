import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTransactions } from '../contexts/TransactionsContext';
import { validateCard, type CardDetails, type CardErrors } from '../utils/card';
import type { Listing, UnitType, VehicleSize } from '../types/listing';

export interface VehicleDetails {
  plate: string;
  makeModel: string;
  color: string;
  size: VehicleSize;
}

export type VehicleErrors = Partial<Record<keyof VehicleDetails, string>>;

export function useCheckout(listing: Listing | undefined, arrive: string, leave: string, unit: UnitType, initialPlate: string) {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { addTransaction } = useTransactions();

  const [vehicle, setVehicle] = useState<VehicleDetails>({
    plate: initialPlate,
    makeModel: '',
    color: '',
    size: listing?.maxVehicle === 'Compact' ? 'Compact' : 'Sedan'
  });
  const [message, setMessage] = useState('');
  const [card, setCard] = useState<CardDetails>({ number: '', expiry: '', cvc: '', name: currentUser?.name ?? '', zip: '' });
  const [vehicleErrors, setVehicleErrors] = useState<VehicleErrors>({});
  const [cardErrors, setCardErrors] = useState<CardErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!listing || !currentUser) return;
    const vErr: VehicleErrors = {};
    if (vehicle.plate.trim().length < 2) vErr.plate = 'License plate is required';
    if (vehicle.makeModel.trim().length < 2) vErr.makeModel = 'Add your make and model';
    const cErr = validateCard(card);
    setVehicleErrors(vErr);
    setCardErrors(cErr);
    if (Object.keys(vErr).length || Object.keys(cErr).length) {
      setFormError('Please fix the highlighted fields.');
      return;
    }
    setFormError('');
    setSubmitting(true);
    window.setTimeout(() => {
      const id = addTransaction({
        listingId: listing.id,
        customerId: currentUser.id,
        arrive,
        leave,
        unit,
        plate: vehicle.plate.trim().toUpperCase(),
        vehicle: [vehicle.makeModel.trim(), vehicle.color.trim()].filter(Boolean).join(' · '),
        vehicleSize: vehicle.size,
        message: message.trim() || undefined
      });
      navigate(`/inbox/${id}`, { state: { justBooked: true } });
    }, 1200);
  };

  return {
    vehicle,
    setVehicle,
    message,
    setMessage,
    card,
    setCard,
    vehicleErrors,
    cardErrors,
    submitting,
    formError,
    submit
  };
}