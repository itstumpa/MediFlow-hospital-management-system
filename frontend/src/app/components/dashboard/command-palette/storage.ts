import type { StoredEntry } from "./types";

const RECENTS_KEY = "dash-cmd-recents";
const FAVORITES_KEY = "dash-cmd-favorites";
const MAX_RECENTS = 5;

/* ─── Recent searches ─── */

export function getRecentSearches(): StoredEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(RECENTS_KEY);
    return raw ? (JSON.parse(raw) as StoredEntry[]) : [];
  } catch {
    return [];
  }
}

export function addRecentSearch(entry: StoredEntry): void {
  if (typeof window === "undefined") return;
  try {
    const recents = getRecentSearches().filter((r) => r.id !== entry.id);
    recents.unshift(entry);
    localStorage.setItem(
      RECENTS_KEY,
      JSON.stringify(recents.slice(0, MAX_RECENTS)),
    );
  } catch {
    /* ignore */
  }
}

export function clearRecentSearches(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(RECENTS_KEY);
}

/* ─── Favorite commands ─── */

export function getFavoriteCommands(): StoredEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? (JSON.parse(raw) as StoredEntry[]) : [];
  } catch {
    return [];
  }
}

export function toggleFavorite(entry: StoredEntry): boolean {
  if (typeof window === "undefined") return false;
  try {
    const favorites = getFavoriteCommands();
    const idx = favorites.findIndex((f) => f.id === entry.id);
    if (idx >= 0) {
      favorites.splice(idx, 1);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
      return false; // removed
    }
    favorites.push(entry);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    return true; // added
  } catch {
    return false;
  }
}

export function isFavorite(id: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    const favorites = getFavoriteCommands();
    return favorites.some((f) => f.id === id);
  } catch {
    return false;
  }
}
