import React from "react";
import { brand } from "../../data/brand";
import { DraftErrors, ListingDraft } from "../../hooks/useListingWizard";
import { formatPrice } from "../../utils/format";
import { TextField } from "../ui/TextField";

const SELLER_COMMISSION = 0.08;

interface Props {
  draft: ListingDraft;
  errors: DraftErrors;
  patch: (p: Partial<ListingDraft>) => void;
}

export function PriceStep({ draft, errors, patch }: Props) {
  const price = Number(draft.price) || 0;
  return (
    <div className="space-y-6">
      <TextField
        label={`Price per ${draft.unit}`}
        type="number"
        inputMode="decimal"
        step="0.25"
        min={0}
        prefix="$"
        suffix={`/ ${draft.unit}`}
        value={draft.price}
        onChange={(e) => patch({ price: e.target.value })}
        placeholder="4.50"
        error={errors.price}
        className="max-w-xs" />
      
      <div className="max-w-md rounded-2xl border border-line bg-paper p-5">
        <p className="mb-3 text-sm font-semibold text-ink">Per {draft.unit} breakdown</p>
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted">Buyer pays</dt>
            <dd className="text-ink">{formatPrice(price)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">{brand.name} commission (8%)</dt>
            <dd className="text-ink">−{formatPrice(price * SELLER_COMMISSION)}</dd>
          </div>
          <div className="flex justify-between border-t border-line pt-2 text-base">
            <dt className="font-semibold text-ink">You earn</dt>
            <dd className="font-bold text-primary-dark">{formatPrice(price * (1 - SELLER_COMMISSION))}</dd>
          </div>
        </dl>
      </div>
    </div>);

}