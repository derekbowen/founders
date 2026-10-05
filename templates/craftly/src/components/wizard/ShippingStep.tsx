import React from 'react';
import { MapPinIcon } from 'lucide-react';
import { processingTimeOptions } from '../../data/listingWizard';
import { useAuth } from '../../contexts/AuthContext';
import { useListings } from '../../contexts/ListingsContext';
import type { ListingDraft } from '../../types/marketplace';
import type { WizardErrors } from '../../hooks/useListingWizard';
import { SelectField } from '../ui/SelectField';
import { TextField } from '../ui/TextField';
import { ToggleRow } from './ToggleRow';

interface StepProps {
  draft: ListingDraft;
  update: (patch: Partial<ListingDraft>) => void;
  errors: WizardErrors;
}

export function ShippingStep({ draft, update, errors }: StepProps) {
  const { user } = useAuth();
  const { getMaker } = useListings();
  const maker = getMaker(user?.shopId ?? 'm1');

  return (
    <div className="space-y-6">
      <SelectField
        className="max-w-md"
        label="Processing time"
        value={draft.processingTime}
        onChange={(e) => update({ processingTime: e.target.value })}
        options={processingTimeOptions} />
      
      <div className="space-y-3">
        <ToggleRow label="Offer shipping" description={`Ships from ${maker?.location ?? 'your studio'}. Buyers see tracking once you mark it shipped.`} checked={draft.shipping} onChange={(v) => update({ shipping: v })} />
        {draft.shipping &&
        <TextField
          className="max-w-[220px] pl-4"
          label="Shipping price"
          type="number"
          min={0}
          step="0.01"
          leading="$"
          value={draft.shippingPrice}
          onChange={(e) => update({ shippingPrice: e.target.value })}
          error={errors.shippingPrice}
          hint="Enter 0 to offer free shipping." />

        }
        <ToggleRow label="Offer local pickup" description="Buyers nearby can collect in person for free." checked={draft.localPickup} onChange={(v) => update({ localPickup: v })} />
        {draft.localPickup && maker &&
        <p className="flex items-center gap-2 pl-4 text-sm text-muted">
            <MapPinIcon className="h-4 w-4 text-accent-ink" aria-hidden /> Pickup from {maker.pickupArea}
          </p>
        }
        {errors.shipping && <p className="text-xs font-medium text-danger">{errors.shipping}</p>}
      </div>
    </div>);

}