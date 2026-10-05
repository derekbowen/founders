import React from "react";
import { InfoIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { brand } from "../../../data/brand";
import { MAX_PACKAGES, priceUnitOptions } from "../../../data/wizardSteps";
import { TextField } from "../../ui/TextField";
import { SelectField } from "../../ui/SelectField";
import { Button } from "../../ui/Button";
import type { ListingWizard } from "../useListingDraft";

export function PackagesStep({ wizard }: {wizard: ListingWizard;}) {
  const { draft, update, errors, addPackage, removePackage, updatePackage } = wizard;

  return (
    <div className="space-y-8">
      <p className="flex items-start gap-2 rounded-xl bg-blush/50 p-4 text-sm text-ink/85">
        <InfoIcon aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        Packages are shown as an overview. Couples send an inquiry — {brand.name} never processes payments, so you'll quote and invoice directly.
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField id="lw-startingPrice" label="Starting price (USD)" type="number" min={0} inputMode="numeric" placeholder="2400" value={draft.startingPrice} onChange={(e) => update({ startingPrice: e.target.value })} error={errors.startingPrice} />
        <SelectField label="Price unit" options={priceUnitOptions} value={draft.priceUnit} onChange={(e) => update({ priceUnit: e.target.value })} />
        <TextField label="Minimum guests" type="number" min={0} inputMode="numeric" optional value={draft.minGuests} onChange={(e) => update({ minGuests: e.target.value })} />
        <TextField id="lw-maxGuests" label="Maximum guests" type="number" min={0} inputMode="numeric" optional value={draft.maxGuests} onChange={(e) => update({ maxGuests: e.target.value })} error={errors.maxGuests} />
      </div>

      <div>
        <div className="mb-3 flex items-baseline justify-between">
          <h3 className="text-sm font-medium text-ink">Packages</h3>
          <span className="text-xs text-muted">{draft.packages.length}/{MAX_PACKAGES}</span>
        </div>
        <ul className="space-y-4">
          {draft.packages.map((pkg, i) =>
          <li key={pkg.id} className="rounded-2xl border border-line bg-canvas/60 p-4 sm:p-5">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-dark">Package {i + 1}</span>
                {draft.packages.length > 1 &&
              <button type="button" onClick={() => removePackage(pkg.id)} className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium text-danger hover:bg-danger/5">
                    <Trash2Icon aria-hidden="true" className="h-3.5 w-3.5" />
                    Remove
                  </button>
              }
              </div>
              <div className="grid gap-4 sm:grid-cols-[1fr_160px]">
                <TextField id={`lw-pkg-${pkg.id}-name`} label="Name" placeholder="e.g. Signature" value={pkg.name} onChange={(e) => updatePackage(pkg.id, { name: e.target.value })} error={errors[`pkg-${pkg.id}-name`]} />
                <TextField id={`lw-pkg-${pkg.id}-price`} label="From ($)" type="number" min={0} inputMode="numeric" value={pkg.price} onChange={(e) => updatePackage(pkg.id, { price: e.target.value })} error={errors[`pkg-${pkg.id}-price`]} />
              </div>
              <TextField className="mt-4" label="What's included" optional placeholder="8 hours coverage, second shooter, online gallery" value={pkg.description} onChange={(e) => updatePackage(pkg.id, { description: e.target.value })} />
            </li>
          )}
        </ul>
        <Button variant="secondary" size="sm" className="mt-4" onClick={addPackage} disabled={draft.packages.length >= MAX_PACKAGES}>
          <PlusIcon aria-hidden="true" className="h-4 w-4" />
          Add package
        </Button>
      </div>
    </div>);

}