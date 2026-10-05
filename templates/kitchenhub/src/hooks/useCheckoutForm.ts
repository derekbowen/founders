import { useState, type FormEvent } from 'react';
import { expiryValid, luhnValid } from '../utils/card';

export interface CheckoutValues {
  businessName: string;
  contactName: string;
  phone: string;
  certNumber: string;
  certExpiry: string;
  insuranceFile: string;
  message: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
  zip: string;
  agree: boolean;
}

export type CheckoutErrors = Partial<Record<keyof CheckoutValues, string>>;
export type CheckoutStatus = 'idle' | 'submitting' | 'success';

const empty: CheckoutValues = {
  businessName: '',
  contactName: '',
  phone: '',
  certNumber: '',
  certExpiry: '',
  insuranceFile: '',
  message: '',
  cardNumber: '',
  expiry: '',
  cvc: '',
  zip: '',
  agree: false
};

function validate(v: CheckoutValues): CheckoutErrors {
  const e: CheckoutErrors = {};
  if (!v.businessName.trim()) e.businessName = 'Enter your business name';
  if (!v.contactName.trim()) e.contactName = 'Enter a contact name';
  if (v.certNumber.trim().length < 5) e.certNumber = 'Enter a valid food handler certificate number';
  if (!v.insuranceFile) e.insuranceFile = 'Upload your certificate of insurance';
  if (!luhnValid(v.cardNumber)) e.cardNumber = 'Your card number is invalid';
  if (!expiryValid(v.expiry)) e.expiry = 'Expiry date is invalid or in the past';
  if (!/^\d{3,4}$/.test(v.cvc)) e.cvc = 'CVC must be 3–4 digits';
  if (!/^\d{5}$/.test(v.zip)) e.zip = 'Enter a 5-digit ZIP';
  if (!v.agree) e.agree = 'Please accept the kitchen rules and cancellation policy';
  return e;
}

export function useCheckoutForm(initial: Partial<CheckoutValues>) {
  const [values, setValues] = useState<CheckoutValues>({ ...empty, ...initial });
  const [errors, setErrors] = useState<CheckoutErrors>({});
  const [status, setStatus] = useState<CheckoutStatus>('idle');

  const setField = <K extends keyof CheckoutValues,>(key: K, value: CheckoutValues[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => e[key] ? { ...e, [key]: undefined } : e);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    const firstKey = Object.keys(found)[0];
    if (firstKey) {
      document.getElementById(`co-${firstKey}`)?.focus();
      return;
    }
    setStatus('submitting');
    window.setTimeout(() => {
      setStatus('success');
      window.scrollTo({ top: 0 });
    }, 1200);
  };

  return { values, errors, status, setField, submit };
}