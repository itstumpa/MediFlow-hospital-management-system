"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useCommandPalette } from "./command-palette-context";
import { EmptyState } from "./EmptyState";
import { FavoriteCommands } from "./FavoriteCommands";
import { groupResults, searchPaletteItems } from "./palette-data";
import { RecentSearches } from "./RecentSearches";
import { SearchInput } from "./SearchInput";
import { SearchResults } from "./SearchResults";
import {
  addRecentSearch,
  clearRecentSearches,
  getFavoriteCommands,
  getRecentSearches,
  toggleFavorite,
} from "./storage";
import type { CommandPaletteItem, StoredEntry } from "./types";

export function CommandPalette() {
  const { isOpen, close } = useCommandPalette();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  /* ── State ── */
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recents, setRecents] = useState<StoredEntry[]>([]);
  const [favorites, setFavorites] = useState<StoredEntry[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());

  /* ── Hydrate stored data on open ── */
  useEffect(() => {
    if (isOpen) {
      setRecents(getRecentSearches());
      const favs = getFavoriteCommands();
      setFavorites(favs);
      setFavoriteIds(new Set(favs.map((f) => f.id)));
      setQuery("");
      setSelectedIndex(0);
      /* Focus input after mount */
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    }
  }, [isOpen]);

  /* ── Search results ── */
  const results = useMemo(() => searchPaletteItems(query), [query]);
  const groupedResults = useMemo(() => groupResults(results), [results]);

  /* ── Total navigable items ── */
  const totalItems = useMemo(() => {
    let count = 0;
    if (!query.trim()) {
      count += recents.length + favorites.length;
    }
    count += results.length;
    return count;
  }, [query, recents, favorites, results]);

  /* ── Navigation ── */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) => Math.min(prev + 1, totalItems - 1));
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => Math.max(prev - 1, 0));
          break;
        case "Enter":
          e.preventDefault();
          executeSelected();
          break;
        case "Escape":
          e.preventDefault();
          close();
          break;
      }
    },
    [totalItems, close],
  );

  /* ── Execute selected item ── */
  const executeSelected = useCallback(() => {
    const idx = selectedIndex;
    let offset = 0;

    /* Check favorites section first (when no query) */
    if (!query.trim()) {
      if (idx < favorites.length) {
        const entry = favorites[idx];
        navigateTo(entry);
        return;
      }
      offset += favorites.length;

      /* Check recents section */
      if (idx - offset < recents.length) {
        const entry = recents[idx - offset];
        navigateTo(entry);
        return;
      }
    }

    /* Results */
    const resultIdx = query.trim() ? idx : idx - offset - recents.length;
    if (resultIdx >= 0 && resultIdx < results.length) {
      const item = results[resultIdx];
      trackAndNavigate(item);
    }
  }, [selectedIndex, query, favorites, recents, results]);

  /* ── Navigation helper ── */
  const navigateTo = useCallback(
    (entry: StoredEntry) => {
      addRecentSearch(entry);
      close();
      if (entry.href) {
        window.location.href = entry.href;
      }
    },
    [close],
  );

  const trackAndNavigate = useCallback(
    (item: CommandPaletteItem) => {
      addRecentSearch({
        id: item.id,
        label: item.label,
        description: item.description,
        href: item.href,
        iconName: item.iconName,
      });
      close();
      if (item.href) {
        window.location.href = item.href;
      }
    },
    [close],
  );

  /* ── Select item from sub-components ── */
  const handleSelect = useCallback(
    (item: CommandPaletteItem) => {
      trackAndNavigate(item);
    },
    [trackAndNavigate],
  );

  const handleSelectRecent = useCallback(
    (entry: StoredEntry) => {
      navigateTo(entry);
    },
    [navigateTo],
  );

  const handleSelectFavorite = useCallback(
    (entry: StoredEntry) => {
      navigateTo(entry);
    },
    [navigateTo],
  );

  /* ── Toggle favorite ── */
  const handleToggleFavorite = useCallback((item: CommandPaletteItem) => {
    const added = toggleFavorite({
      id: item.id,
      label: item.label,
      description: item.description,
      href: item.href,
      iconName: item.iconName,
    });
    const favs = getFavoriteCommands();
    setFavorites(favs);
    setFavoriteIds(new Set(favs.map((f) => f.id)));
  }, []);

  const handleRemoveFavorite = useCallback((id: string) => {
    toggleFavorite({ id, label: "", description: "", iconName: "" });
    const favs = getFavoriteCommands();
    setFavorites(favs);
    setFavoriteIds(new Set(favs.map((f) => f.id)));
  }, []);

  /* ── Clear recents ── */
  const handleClearRecents = useCallback(() => {
    clearRecentSearches();
    setRecents([]);
  }, []);

  /* ── Hover updates selection ── */
  const handleHover = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  /* ── Reset index when results change ── */
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  /* ── Scroll selected into view ── */
  useEffect(() => {
    const el = listRef.current?.querySelector(
      `[data-index="${selectedIndex}"]`,
    );
    el?.scrollIntoView({ block: "nearest" });
  }, [selectedIndex]);

  /* ── Determine if we're showing the "home" view (no query) ── */
  const showHomeView = !query.trim();

  /* ── Compute the start index for recents (after favorites) ── */
  const recentStartIndex = favorites.length;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[999] bg-black/40 backdrop-blur-sm"
            onClick={close}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -12 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-[999] flex items-start justify-center pt-[12vh]"
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
          >
            <div
              className={cn(
                "flex w-full max-w-[620px] flex-col overflow-hidden rounded-2xl",
                "bg-white/90 backdrop-blur-2xl",
                "border border-white/20",
                "shadow-[0_8px_32px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.05)]",
                "dark:bg-slate-900/90 dark:border-white/5",
                "dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]",
                "max-h-[56vh]",
              )}
            >
              {/* Search */}
              <div className="shrink-0 border-b border-slate-200/60 dark:border-slate-700/40">
                <SearchInput
                  value={query}
                  onChange={setQuery}
                  onKeyDown={handleKeyDown}
                  inputRef={inputRef}
                />
              </div>

              {/* Results area */}
              <div ref={listRef} className="flex-1 overflow-hidden">
                {showHomeView ? (
                  /* Home: Favorites + Recent */
                  <>
                    <FavoriteCommands
                      items={favorites}
                      onSelect={handleSelectFavorite}
                      onRemove={handleRemoveFavorite}
                      selectedIndex={selectedIndex}
                      startIndex={0}
                      onHover={handleHover}
                    />
                    <RecentSearches
                      items={recents}
                      onSelect={handleSelectRecent}
                      onClear={handleClearRecents}
                      selectedIndex={selectedIndex}
                      startIndex={recentStartIndex}
                      onHover={handleHover}
                    />
                    {favorites.length === 0 && recents.length === 0 && (
                      <div className="flex flex-col items-center justify-center py-14 text-center">
                        <div className="flex size-12 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800">
                          <svg
                            viewBox="0 0 20 20"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={1.5}
                            className="h-6 w-6 text-slate-400 dark:text-slate-500"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                        <h3 className="mt-4 text-sm font-semibold text-slate-900 dark:text-white">
                          Welcome to Quick Search
                        </h3>
                        <p className="mt-1 max-w-xs text-sm text-slate-500 dark:text-slate-400">
                          Press{" "}
                          <kbd className="rounded-md border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[11px] font-medium text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
                            ⌘K
                          </kbd>{" "}
                          to open, type to search, star your favorites.
                        </p>
                      </div>
                    )}
                  </>
                ) : results.length > 0 ? (
                  <SearchResults
                    groups={groupedResults}
                    selectedIndex={selectedIndex}
                    onSelect={handleSelect}
                    onHover={handleHover}
                    favorites={favoriteIds}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ) : (
                  <EmptyState query={query} />
                )}
              </div>

              {/* Footer hints */}
              <div className="flex shrink-0 items-center gap-4 border-t border-slate-200/60 px-4 py-2.5 dark:border-slate-700/40">
                <div className="flex items-center gap-3 text-[11px] text-slate-400 dark:text-slate-500">
                  <span className="flex items-center gap-1">
                    <kbd className="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[10px] font-medium dark:border-slate-700 dark:bg-slate-800">
                      ↑↓
                    </kbd>
                    <span>Navigate</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[10px] font-medium dark:border-slate-700 dark:bg-slate-800">
                      ↵
                    </kbd>
                    <span>Open</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[10px] font-medium dark:border-slate-700 dark:bg-slate-800">
                      Esc
                    </kbd>
                    <span>Close</span>
                  </span>
                </div>
                <div className="ml-auto flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500">
                  <span>Star to favorite</span>
                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    className="h-3.5 w-3.5"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
