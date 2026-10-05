import React from "react";
import { XIcon } from "lucide-react";
import { getCategory } from "../../utils/vendors";
import { formatDate, formatPrice } from "../../utils/format";
import type { VendorSearch } from "../../hooks/useVendorSearch";

interface ActiveFilterChipsProps {
  search: VendorSearch;
}

export function ActiveFilterChips({ search }: ActiveFilterChipsProps) {
  const { filters, update, toggleInList } = search;
  const chips: {key: string;label: string;onRemove: () => void;}[] = [];

  if (filters.q) chips.push({ key: "q", label: `“${filters.q}”`, onRemove: () => update({ q: "" }) });
  if (filters.category) chips.push({ key: "cat", label: getCategory(filters.category)?.label ?? filters.category, onRemove: () => update({ category: "" }) });
  if (filters.location) chips.push({ key: "loc", label: filters.location, onRemove: () => update({ location: "" }) });
  if (filters.date) chips.push({ key: "date", label: `Free on ${formatDate(filters.date)}`, onRemove: () => update({ date: "" }) });
  if (filters.minPrice || filters.maxPrice) {
    const min = filters.minPrice ? formatPrice(Number(filters.minPrice)) : "$0";
    const max = filters.maxPrice ? formatPrice(Number(filters.maxPrice)) : "any";
    chips.push({ key: "price", label: `${min} – ${max}`, onRemove: () => update({ minPrice: "", maxPrice: "" }) });
  }
  if (filters.guests) chips.push({ key: "guests", label: `${filters.guests} guests`, onRemove: () => update({ guests: "" }) });
  filters.styles.forEach((s) => chips.push({ key: `s-${s}`, label: s, onRemove: () => toggleInList("styles", s) }));
  filters.languages.forEach((l) => chips.push({ key: `l-${l}`, label: l, onRemove: () => toggleInList("languages", l) }));

  if (chips.length === 0) return null;

  return (
    <ul className="flex flex-wrap gap-2" aria-label="Active filters">
      {chips.map((chip) =>
      <li key={chip.key}>
          <button
          type="button"
          onClick={chip.onRemove}
          className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/5 py-1 pl-3 pr-2 text-xs font-medium text-primary transition-colors hover:bg-primary/10">
          
            {chip.label}
            <XIcon aria-hidden="true" className="h-3.5 w-3.5" />
            <span className="sr-only">Remove filter</span>
          </button>
        </li>
      )}
    </ul>);

}