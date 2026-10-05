import React, { useState } from 'react';
import { toast } from 'sonner';
import { useAuth } from '../../contexts/AuthContext';
import { AddressForm, validateAddress, type AddressErrors } from '../../components/checkout/AddressForm';
import { SettingsHeader } from '../../components/account/SettingsHeader';
import { Button } from '../../components/ui/Button';
import type { Address } from '../../types/marketplace';

export function ShippingAddress() {
  const { user, updateUser } = useAuth();
  const [address, setAddress] = useState<Address>(
    user?.shippingAddress ?? { fullName: '', line1: '', city: '', state: '', postalCode: '', country: 'United States' }
  );
  const [errors, setErrors] = useState<AddressErrors>({});
  const [saving, setSaving] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateAddress(address);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSaving(true);
    await new Promise((r) => setTimeout(r, 600));
    updateUser({ shippingAddress: address });
    setSaving(false);
    toast.success('Default shipping address saved');
  };

  return (
    <form onSubmit={submit} noValidate>
      <SettingsHeader title="Shipping address" description="We’ll pre-fill this at checkout. Makers only see it once you place an order." />
      <div className="max-w-2xl">
        <AddressForm value={address} onChange={setAddress} errors={errors} idPrefix="acct" />
        <p className="mt-4 text-xs text-muted">Country: United States. International shipping varies by maker.</p>
      </div>
      <div className="mt-8 flex justify-end border-t border-line pt-6">
        <Button type="submit" loading={saving}>Save address</Button>
      </div>
    </form>);

}