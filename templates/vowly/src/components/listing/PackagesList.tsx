import React from "react";
import { CheckIcon, InfoIcon } from "lucide-react";
import { brand } from "../../data/brand";
import { formatPackagePrice } from "../../utils/format";
import type { VendorPackage } from "../../types/marketplace";

interface PackagesListProps {
  packages: VendorPackage[];
  priceUnit: string;
  vendorName: string;
}

export function PackagesList({ packages, priceUnit, vendorName }: PackagesListProps) {
  return (
    <div>
      <ul className={`grid gap-4 ${packages.length >= 3 ? "md:grid-cols-3" : "sm:grid-cols-2"}`}>
        {packages.map((pkg, i) =>
        <li
          key={pkg.name}
          className={`flex flex-col rounded-2xl border p-5 ${i === 1 ? "border-gold/60 bg-gold/5" : "border-line bg-surface"}`}>
          
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-display text-2xl font-semibold text-ink">{pkg.name}</h3>
              {i === 1 && <span className="rounded-full bg-gold/20 px-2 py-0.5 text-[11px] font-semibold text-gold-dark">Popular</span>}
            </div>
            <p className="mt-1 text-sm text-muted">{pkg.description}</p>
            <p className="mt-4">
              <span className="text-xs text-muted">Starting at </span>
              <span className="text-xl font-semibold text-ink">{formatPackagePrice(pkg.price)}</span>
              {pkg.price > 0 && priceUnit.startsWith("per") && <span className="text-xs text-muted"> {priceUnit}</span>}
            </p>
            <ul className="mt-4 space-y-2 border-t border-line pt-4">
              {pkg.includes.map((item) =>
            <li key={item} className="flex items-start gap-2 text-sm text-ink">
                  <CheckIcon aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" />
                  {item}
                </li>
            )}
            </ul>
          </li>
        )}
      </ul>
      <p className="mt-4 flex items-start gap-2 rounded-xl bg-blush/50 p-4 text-sm text-ink/80">
        <InfoIcon aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        Packages are an overview. Final pricing is confirmed with {vendorName} directly — {brand.name} never takes payments or booking fees.
      </p>
    </div>);

}