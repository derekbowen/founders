import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { farms as seedFarms } from "../data/farms";
import { products as seedProducts } from "../data/products";
import { reviews as seedReviews } from "../data/reviews";
import { Farm, Product, Review } from "../types/marketplace";

interface CatalogValue {
  products: Product[];
  farms: Farm[];
  getProduct: (id: string) => Product | undefined;
  getFarm: (id: string) => Farm | undefined;
  productsByFarm: (farmId: string) => Product[];
  reviewsForProduct: (productId: string) => Review[];
  reviewsForFarm: (farmId: string) => Review[];
  addProduct: (product: Product) => void;
  decrementStock: (productId: string, qty: number) => void;
}

const CatalogContext = createContext<CatalogValue | null>(null);

export function CatalogProvider({ children }: {children: React.ReactNode;}) {
  const [products, setProducts] = useState<Product[]>(seedProducts);

  const getProduct = useCallback((id: string) => products.find((p) => p.id === id), [products]);
  const getFarm = useCallback((id: string) => seedFarms.find((f) => f.id === id), []);
  const productsByFarm = useCallback(
    (farmId: string) => products.filter((p) => p.farmId === farmId),
    [products]
  );
  const reviewsForProduct = useCallback(
    (productId: string) => seedReviews.filter((r) => r.productId === productId),
    []
  );
  const reviewsForFarm = useCallback(
    (farmId: string) => {
      const ids = new Set(products.filter((p) => p.farmId === farmId).map((p) => p.id));
      return seedReviews.filter((r) => ids.has(r.productId));
    },
    [products]
  );
  const addProduct = useCallback((product: Product) => setProducts((prev) => [product, ...prev]), []);
  const decrementStock = useCallback((productId: string, qty: number) => {
    setProducts((prev) =>
    prev.map((p) => p.id === productId ? { ...p, stock: Math.max(0, p.stock - qty) } : p)
    );
  }, []);

  const value = useMemo(
    () => ({
      products,
      farms: seedFarms,
      getProduct,
      getFarm,
      productsByFarm,
      reviewsForProduct,
      reviewsForFarm,
      addProduct,
      decrementStock
    }),
    [products, getProduct, getFarm, productsByFarm, reviewsForProduct, reviewsForFarm, addProduct, decrementStock]
  );

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}

export function useCatalog() {
  const ctx = useContext(CatalogContext);
  if (!ctx) throw new Error("useCatalog must be used within CatalogProvider");
  return ctx;
}