import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useCatalog } from "../contexts/CatalogContext";
import { CategoryId, FulfillmentType } from "../types/marketplace";

export type SortKey = "relevance" | "distance" | "price-asc" | "price-desc" | "rating";

export interface SearchFilters {
  q: string;
  location: string;
  category: CategoryId | "";
  organic: boolean;
  fulfillment: FulfillmentType | "";
  maxDistance: number;
  maxPrice: number;
  inStock: boolean;
  sort: SortKey;
}

export const DISTANCE_MAX = 25;
export const PRICE_MAX = 30;

export function useProductSearch() {
  const [params, setParams] = useSearchParams();
  const { products, farms, getFarm } = useCatalog();

  const filters: SearchFilters = {
    q: params.get("q") ?? "",
    location: params.get("location") ?? "",
    category: params.get("category") as CategoryId ?? "",
    organic: params.get("organic") === "1",
    fulfillment: params.get("fulfillment") as FulfillmentType ?? "",
    maxDistance: Number(params.get("distance") ?? DISTANCE_MAX),
    maxPrice: Number(params.get("price") ?? PRICE_MAX),
    inStock: params.get("instock") === "1",
    sort: params.get("sort") as SortKey ?? "relevance"
  };

  const update = useCallback(
    (patch: Partial<Record<string, string | null>>) => {
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          Object.entries(patch).forEach(([k, v]) => {
            if (v === null || v === "" || v === undefined) next.delete(k);else
            next.set(k, v);
          });
          return next;
        },
        { replace: true }
      );
    },
    [setParams]
  );

  const clearAll = useCallback(() => {
    setParams(filters.location ? { location: filters.location } : {}, { replace: true });
  }, [setParams, filters.location]);

  const results = useMemo(() => {
    const q = filters.q.trim().toLowerCase();
    const list = products.filter((p) => {
      const farm = getFarm(p.farmId);
      if (!farm) return false;
      if (q && !`${p.title} ${p.description} ${farm.name} ${p.category}`.toLowerCase().includes(q)) return false;
      if (filters.category && p.category !== filters.category) return false;
      if (filters.organic && !p.organic) return false;
      if (filters.fulfillment && !p.fulfillment.includes(filters.fulfillment)) return false;
      if (farm.distanceMi > filters.maxDistance) return false;
      if (p.price > filters.maxPrice) return false;
      if (filters.inStock && p.stock === 0) return false;
      return true;
    });
    const dist = (id: string) => getFarm(id)?.distanceMi ?? 0;
    switch (filters.sort) {
      case "distance":
        return [...list].sort((a, b) => dist(a.farmId) - dist(b.farmId));
      case "price-asc":
        return [...list].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...list].sort((a, b) => b.price - a.price);
      case "rating":
        return [...list].sort((a, b) => b.rating - a.rating);
      default:
        return [...list].sort((a, b) => Number(b.stock > 0) - Number(a.stock > 0));
    }
  }, [products, getFarm, filters.q, filters.category, filters.organic, filters.fulfillment, filters.maxDistance, filters.maxPrice, filters.inStock, filters.sort]);

  const farmCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    results.forEach((p) => {
      counts[p.farmId] = (counts[p.farmId] ?? 0) + 1;
    });
    return counts;
  }, [results]);

  const visibleFarms = farms.filter((f) => farmCounts[f.id]);

  const activeCount =
  Number(!!filters.category) +
  Number(filters.organic) +
  Number(!!filters.fulfillment) +
  Number(filters.maxDistance < DISTANCE_MAX) +
  Number(filters.maxPrice < PRICE_MAX) +
  Number(filters.inStock);

  return { filters, update, clearAll, results, farmCounts, visibleFarms, activeCount };
}