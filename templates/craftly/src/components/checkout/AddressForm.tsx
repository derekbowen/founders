import React from 'react';
import { usStates } from '../../data/filters';
import type { Address } from '../../types/marketplace';
import { SelectField } from '../ui/SelectField';
import { TextField } from '../ui/TextField';

export type AddressErrors = Partial<Record<keyof Address, string>>;

interface AddressFormProps {
  value: Address;
  onChange: (value: Address) => void;
  errors?: AddressErrors;
  idPrefix?: string;
}

export function AddressForm({ value, onChange, errors = {}, idPrefix = 'addr' }: AddressFormProps) {
  const set = (key: keyof Address, v: string) => onChange({ ...value, [key]: v });
  return (
    <div className="grid gap-4 sm:grid-cols-6">
      <TextField id={`${idPrefix}-name`} className="sm:col-span-6" label="Full name" autoComplete="name" value={value.fullName} onChange={(e) => set('fullName', e.target.value)} error={errors.fullName} />
      <TextField id={`${idPrefix}-line1`} className="sm:col-span-4" label="Street address" autoComplete="address-line1" value={value.line1} onChange={(e) => set('line1', e.target.value)} error={errors.line1} />
      <TextField id={`${idPrefix}-line2`} className="sm:col-span-2" label="Apt, suite (optional)" autoComplete="address-line2" value={value.line2 ?? ''} onChange={(e) => set('line2', e.target.value)} />
      <TextField id={`${idPrefix}-city`} className="sm:col-span-2" label="City" autoComplete="address-level2" value={value.city} onChange={(e) => set('city', e.target.value)} error={errors.city} />
      <SelectField id={`${idPrefix}-state`} className="sm:col-span-2" label="State" value={value.state} onChange={(e) => set('state', e.target.value)} options={usStates} placeholder="Select" error={errors.state} />
      <TextField id={`${idPrefix}-zip`} className="sm:col-span-2" label="ZIP code" inputMode="numeric" autoComplete="postal-code" value={value.postalCode} onChange={(e) => set('postalCode', e.target.value)} error={errors.postalCode} />
    </div>);

}

export function validateAddress(a: Address): AddressErrors {
  const e: AddressErrors = {};
  if (!a.fullName.trim()) e.fullName = 'Enter the recipient’s name';
  if (!a.line1.trim()) e.line1 = 'Enter a street address';
  if (!a.city.trim()) e.city = 'Enter a city';
  if (!a.state) e.state = 'Choose a state';
  if (!/^\d{5}$/.test(a.postalCode.trim())) e.postalCode = 'Enter a 5-digit ZIP';
  return e;
}