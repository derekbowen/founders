import { useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { stayLengthOptions } from '../data/features';
import type { Listing } from '../types/listing';

interface InquiryErrors {
  moveIn?: string;
  stayMonths?: string;
  message?: string;
}

export function useInquiryForm(listing: Listing) {
  const { currentUser, addInquiry, inquiries } = useApp();
  const navigate = useNavigate();

  const stayOptions = useMemo(
    () => stayLengthOptions.filter((m) => m >= listing.minStay && (listing.maxStay === null || m <= listing.maxStay)),
    [listing.minStay, listing.maxStay]
  );

  const [moveIn, setMoveIn] = useState(listing.availableFrom);
  const [stayMonths, setStayMonths] = useState<number>(stayOptions[0] ?? listing.minStay);
  const [aboutYou, setAboutYou] = useState(currentUser?.occupation ?? '');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const isOwnListing = currentUser?.id === listing.landlordId;
  const existing = currentUser ?
  inquiries.find((i) => i.listingId === listing.id && i.renterId === currentUser.id) :
  undefined;

  const validate = (): InquiryErrors => {
    const next: InquiryErrors = {};
    if (!moveIn) next.moveIn = 'Choose your move-in date.';else
    if (moveIn < listing.availableFrom) next.moveIn = 'The room is not available before this date.';
    if (!stayMonths) next.stayMonths = 'Choose how long you want to stay.';
    if (message.trim().length < 20) next.message = 'Write at least 20 characters so the landlord gets to know you.';
    return next;
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      navigate(`/login?redirect=${encodeURIComponent(`/l/${listing.id}`)}`);
      return;
    }
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length) return;
    setSubmitting(true);
    window.setTimeout(() => {
      const id = addInquiry({ listingId: listing.id, moveIn, stayMonths, aboutYou, message: message.trim() });
      setSubmitting(false);
      navigate(`/inquiry-sent/${id}`);
    }, 700);
  };

  return {
    currentUser,
    isOwnListing,
    existing,
    stayOptions,
    moveIn,
    setMoveIn,
    stayMonths,
    setStayMonths,
    aboutYou,
    setAboutYou,
    message,
    setMessage,
    errors,
    submitting,
    submit
  };
}