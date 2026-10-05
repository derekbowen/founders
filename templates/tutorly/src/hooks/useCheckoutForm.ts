import { useState } from 'react';
import { formatCardNumber, formatExpiry, isExpiryValid, passesLuhn } from '../utils/card';

export type LearnerType = 'self' | 'child';

export interface CheckoutValues {
  learnerType: LearnerType;
  learnerName: string;
  level: string;
  goals: string;
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
  postalCode: string;
  saveCard: boolean;
}

export type CheckoutErrors = Partial<Record<keyof CheckoutValues, string>>;

export function useCheckoutForm(defaultName: string, defaultLevel: string) {
  const [values, setValues] = useState<CheckoutValues>({
    learnerType: 'self',
    learnerName: defaultName,
    level: defaultLevel,
    goals: '',
    cardName: defaultName,
    cardNumber: '',
    expiry: '',
    cvc: '',
    postalCode: '',
    saveCard: true
  });
  const [errors, setErrors] = useState<CheckoutErrors>({});

  const set = <K extends keyof CheckoutValues,>(key: K, raw: CheckoutValues[K]) => {
    let value = raw;
    if (key === 'cardNumber') value = formatCardNumber(String(raw)) as CheckoutValues[K];
    if (key === 'expiry') value = formatExpiry(String(raw)) as CheckoutValues[K];
    if (key === 'cvc') value = String(raw).replace(/\D/g, '').slice(0, 4) as CheckoutValues[K];
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const setLearnerType = (type: LearnerType, selfName: string) => {
    setValues((v) => ({ ...v, learnerType: type, learnerName: type === 'self' ? selfName : '' }));
  };

  const validate = (): boolean => {
    const next: CheckoutErrors = {};
    if (!values.learnerName.trim()) next.learnerName = 'Enter the learner’s name';
    if (!values.level) next.level = 'Choose a level';
    if (!values.cardName.trim()) next.cardName = 'Enter the name on the card';
    if (!passesLuhn(values.cardNumber)) next.cardNumber = 'Enter a valid card number';
    if (!isExpiryValid(values.expiry)) next.expiry = 'Enter a valid expiry (MM / YY)';
    if (values.cvc.length < 3) next.cvc = 'Enter the 3–4 digit code';
    if (values.postalCode.trim().length < 3) next.postalCode = 'Enter your postal code';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  return { values, errors, set, setLearnerType, validate };
}