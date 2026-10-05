import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { vendors } from "../data/vendors";
import { getCategory } from "../utils/vendors";
import type { Vendor } from "../types/marketplace";

export interface SearchFilterState {
  q: string;
  category: string;
  location: string;
  date: string;
  minPrice: string;
  maxPrice: string;
  styles: string[];
  guests: string;
  languages: string[];
  sort: string;
}

type FilterKey = keyof SearchFilterState;
type ListKey = "styles" | "languages";
export type FilterPatch = Partial<Record<FilterKey, string | string[]>>;

const split = (value: string | null) => value ? value.split(",").filter(Boolean) : [];

export function useVendorSearch() {
  const [params, setParams] = useSearchParams();

  const filters: SearchFilterState = useMemo(
    () => ({
      q: params.get("q") ?? "",
      category: params.get("category") ?? "",
      location: params.get("location") ?? "",
      date: params.get("date") ?? "",
      minPrice: params.get("minPrice") ?? "",
      maxPrice: params.get("maxPrice") ?? "",
      styles: split(params.get("styles")),
      guests: params.get("guests") ?? "",
      languages: split(params.get("languages")),
      sort: params.get("sort") ?? "relevance"
    }),
    [params]
  );

  const update = useCallback(
    (patch: FilterPatch) => {
      const next = new URLSearchParams(params);
      Object.entries(patch).forEach(([key, value]) => {
        const v = Array.isArray(value) ? value.join(",") : value ?? "";
        if (v && !(key === "sort" && v === "relevance")) next.set(key, v);else
        next.delete(key);
      });
      setParams(next, { replace: true });
    },
    [params, setParams]
  );

  const toggleInList = useCallback(
    (key: ListKey, value: string) => {
      const list = filters[key];
      update({ [key]: list.includes(value) ? list.filter((x) => x !== value) : [...list, value] });
    },
    [filters, update]
  );

  const clearAll = useCallback(() => {
    const next = new URLSearchParams();
    if (filters.sort !== "relevance") next.set("sort", filters.sort);
    setParams(next, { replace: true });
  }, [filters.sort, setParams]);

  const results: Vendor[] = useMemo(() => {
    const q = filters.q.toLowerCase();
    const loc = filters.location.toLowerCase();
    const min = filters.minPrice ? Number(filters.minPrice) : null;
    const max = filters.maxPrice ? Number(filters.maxPrice) : null;
    const guests = filters.guests ? Number(filters.guests) : null;

    const list = vendors.filter((v) => {
      if (q) {
        const haystack = [v.name, v.tagline, v.city, getCategory(v.category)?.label ?? "", ...v.styles, ...v.serviceArea].
        join(" ").
        toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      if (filters.category && v.category !== filters.category) return false;
      if (loc) {
        const places = [v.city, ...v.serviceArea].map((p) => p.toLowerCase());
        if (!places.some((p) => p.includes(loc) || loc.includes(p))) return false;
      }
      if (filters.date && v.unavailableDates.includes(filters.date)) return false;
      if (min !== null && v.startingPrice < min) return false;
      if (max !== null && v.startingPrice > max) return false;
      if (filters.styles.length && !filters.styles.some((s) => v.styles.includes(s))) return false;
      if (guests !== null && v.guestCapacity && (v.guestCapacity.max < guests || v.guestCapacity.min > guests)) return false;
      if (filters.languages.length && !filters.languages.some((l) => v.languages.includes(l))) return false;
      return true;
    });

    const sorted = [...list];
    switch (filters.sort) {
      case "price-asc":
        sorted.sort((a, b) => a.startingPrice - b.startingPrice);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.startingPrice - a.startingPrice);
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "reviews":
        sorted.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }
    return sorted;
  }, [filters]);

  const activeCount = [
  filters.q,
  filters.category,
  filters.location,
  filters.date,
  filters.minPrice || filters.maxPrice,
  filters.guests].
  filter(Boolean).length + filters.styles.length + filters.languages.length;

  return { filters, update, toggleInList, clearAll, results, activeCount };
}

export type VendorSearch = ReturnType<typeof useVendorSearch>;