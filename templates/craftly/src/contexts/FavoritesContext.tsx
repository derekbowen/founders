import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

interface FavoritesContextValue {
  favorites: string[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: {children: React.ReactNode;}) {
  const [favorites, setFavorites] = useState<string[]>(['handwoven-wool-throw', 'fern-linocut-print']);

  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites]);

  const toggleFavorite = useCallback(
    (id: string) => {
      const next = !favorites.includes(id);
      setFavorites((prev) => next ? [...prev, id] : prev.filter((f) => f !== id));
      return next;
    },
    [favorites]
  );

  const value = useMemo(() => ({ favorites, isFavorite, toggleFavorite }), [favorites, isFavorite, toggleFavorite]);
  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites(): FavoritesContextValue {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider');
  return ctx;
}