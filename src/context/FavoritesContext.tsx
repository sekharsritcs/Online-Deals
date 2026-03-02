import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Deal } from "../types";

interface FavoritesContextValue {
  favoriteIds: string[];
  isFavorite: (dealId: string) => boolean;
  toggleFavorite: (deal: Deal) => void;
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(
  undefined,
);

const STORAGE_KEY = "woah_favorites_v1";

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({
  children,
}) => {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  // Load favorites from localStorage on first mount (browser only)
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as unknown;
        if (Array.isArray(parsed)) {
          setFavoriteIds(
            parsed.filter((id) => typeof id === "string"),
          );
        }
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  // Persist favorites whenever they change
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteIds));
    } catch {
      // Ignore localStorage errors
    }
  }, [favoriteIds]);

  const isFavorite = (dealId: string): boolean =>
    favoriteIds.includes(dealId);

  const toggleFavorite = (deal: Deal): void => {
    setFavoriteIds((prev) =>
      prev.includes(deal.id)
        ? prev.filter((id) => id !== deal.id)
        : [...prev, deal.id],
    );
  };

  const value = useMemo<FavoritesContextValue>(
    () => ({
      favoriteIds,
      isFavorite,
      toggleFavorite,
    }),
    [favoriteIds],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextValue => {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }
  return ctx;
};

