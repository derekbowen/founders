import { useState, type FormEvent } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTransactions } from '../contexts/TransactionsContext';
import type { BookingDetails } from '../types/listing';
import type { Transaction } from '../types/transaction';
import { isValidExpiry, isValidVat } from '../utils/card';
import { getListing } from '../utils/lookup';
import { getQuote } from '../utils/pricing';
import type { CardValues } from '../components/checkout/CardForm';

export function useCheckout() {
  const { id } = useParams();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addTransaction } = useTransactions();
  const listing = getListing(id);

  const booking: BookingDetails | null =
  params.get('date') && params.get('start') && params.get('end') ?
  {
    date: params.get('date') as string,
    mode: params.get('mode') === 'day' ? 'day' : 'hour',
    start: params.get('start') as string,
    end: params.get('end') as string,
    seats: Math.max(1, Number(params.get('seats') ?? 1))
  } :
  null;

  const quote = listing && booking ? getQuote(listing, booking) : null;

  const [invoice, setInvoice] = useState(true);
  const [company, setCompany] = useState(user?.company ?? '');
  const [vat, setVat] = useState('');
  const [message, setMessage] = useState('');
  const [card, setCard] = useState<CardValues>({
    name: user?.name ?? '',
    number: '',
    expiry: '',
    cvc: '',
    postal: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  function validate(): Record<string, string> {
    const e: Record<string, string> = {};
    if (invoice && !company.trim()) e.company = 'Company name is required for an invoice.';
    if (invoice && vat && !isValidVat(vat)) e.vat = 'Use a valid VAT number, e.g. GB123456789.';
    if (!card.name.trim()) e.name = 'Enter the name on your card.';
    if (card.number.replace(/\s/g, '').length !== 16) e.number = 'Card number must be 16 digits.';
    if (!isValidExpiry(card.expiry)) e.expiry = 'Invalid expiry.';
    if (card.cvc.length < 3) e.cvc = 'Invalid CVC.';
    if (!card.postal.trim()) e.postal = 'Required.';
    return e;
  }

  function submit(ev: FormEvent) {
    ev.preventDefault();
    if (!listing || !booking || !user) return;
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length) return;
    setSubmitting(true);
    const now = new Date().toISOString();
    const status = listing.instantBook ? 'confirmed' : 'requested';
    const tx: Transaction = {
      id: `tx-${Date.now()}`,
      listingId: listing.id,
      customerId: user.id,
      providerId: listing.hostId,
      status,
      ...booking,
      doorCode: String(Math.floor(1000 + Math.random() * 9000)),
      companyName: invoice ? company : undefined,
      history:
      status === 'confirmed' ?
      [
      { status: 'requested', at: now },
      { status: 'confirmed', at: now }] :

      [{ status: 'requested', at: now }],
      messages: message.trim() ? [{ id: `m-${Date.now()}`, senderId: user.id, text: message.trim(), at: now }] : []
    };
    window.setTimeout(() => {
      addTransaction(tx);
      navigate(`/inbox/${tx.id}`, { state: { justBooked: true } });
    }, 1100);
  }

  return {
    listing,
    booking,
    quote,
    invoice,
    setInvoice,
    company,
    setCompany,
    vat,
    setVat,
    message,
    setMessage,
    card,
    setCard: (patch: Partial<CardValues>) => setCard((c) => ({ ...c, ...patch })),
    errors,
    submitting,
    submit
  };
}