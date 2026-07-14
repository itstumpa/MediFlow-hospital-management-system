"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Command, FileText, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { fadeInBackdrop, scaleUp } from "./MotionVariants";
import { staffCommandPaletteItems } from "./navigation";
import { useStaffContext } from "./StaffProvider";

/**
 * Global Command Palette — Ctrl+K / Cmd+K
 *
 * Provides quick access to all staff routes and actions.
 */
export function CommandPalette() {
  const { commandPaletteOpen, setCommandPaletteOpen } = useStaffContext();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  /* Focus input when opened */
  useEffect(() => {
    if (commandPaletteOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      setSelectedIndex(0);
    }
  }, [commandPaletteOpen]);

  /* Filter items based on query */
  const filteredItems = useMemo(() => {
    if (!query.trim()) return staffCommandPaletteItems;
    const q = query.toLowerCase();
    return staffCommandPaletteItems.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.keywords.some((k) => k.includes(q)) ||
        item.category.toLowerCase().includes(q),
    );
  }, [query]);

  /* Reset selected index when results change */
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredItems.length]);

  /* Keyboard navigation */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredItems.length - 1 ? prev + 1 : 0,
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredItems.length - 1,
        );
      } else if (e.key === "Enter" && filteredItems[selectedIndex]) {
        e.preventDefault();
        router.push(filteredItems[selectedIndex].href);
        setCommandPaletteOpen(false);
      } else if (e.key === "Escape") {
        setCommandPaletteOpen(false);
      }
    },
    [filteredItems, selectedIndex, router, setCommandPaletteOpen],
  );

  /* Scroll selected item into view */
  useEffect(() => {
    const el = listRef.current?.children[selectedIndex] as HTMLElement;
    el?.scrollIntoView({ block: "nearest" });
  }, [selectedIndex]);

  /* Group items by category */
  const groupedItems = useMemo(() => {
    const groups: Record<string, typeof filteredItems> = {};
    for (const item of filteredItems) {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    }
    return groups;
  }, [filteredItems]);

  let itemIndex = 0;

  return (
    <AnimatePresence>
      {commandPaletteOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="cp-backdrop"
            variants={fadeInBackdrop}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
            onClick={() => setCommandPaletteOpen(false)}
            aria-hidden="true"
          />

          {/* Dialog */}
          <motion.div
            key="cp-dialog"
            variants={scaleUp}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed left-1/2 top-[15%] z-[101] w-full max-w-[600px] -translate-x-1/2"
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
          >
            <div
              className={cn(
                "overflow-hidden rounded-2xl border border-slate-200/60 bg-white shadow-2xl shadow-slate-900/10",
                "dark:border-slate-700/60 dark:bg-slate-900",
              )}
            >
              {/* Search input */}
              <div className="flex items-center gap-3 border-b border-slate-100 px-4 dark:border-slate-800/60">
                <Search className="h-5 w-5 shrink-0 text-slate-400" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search patients, appointments, invoices..."
                  className={cn(
                    "flex-1 bg-transparent py-4 text-sm text-slate-900 placeholder-slate-400 outline-none",
                    "dark:text-white dark:placeholder-slate-500",
                  )}
                  aria-label="Search command palette"
                />
                <kbd
                  className={cn(
                    "hidden shrink-0 items-center gap-0.5 rounded-lg border border-slate-200 bg-slate-50 px-1.5 py-0.5",
                    "text-[11px] font-medium text-slate-400",
                    "dark:border-slate-700 dark:bg-slate-800 dark:text-slate-500",
                    "sm:flex",
                  )}
                >
                  <Command className="h-3 w-3" />K
                </kbd>
              </div>

              {/* Results */}
              {filteredItems.length > 0 ? (
                <div
                  ref={listRef}
                  className="max-h-[360px] overflow-y-auto p-2 dash-scrollbar"
                >
                  {Object.entries(groupedItems).map(([category, items]) => (
                    <div key={category} className="mb-2 last:mb-0">
                      <p className="px-2 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400 dark:text-slate-500">
                        {category}
                      </p>
                      {items.map((item) => {
                        const currentIndex = itemIndex++;
                        return (
                          <Link
                            key={item.id}
                            href={item.href}
                            onClick={() => setCommandPaletteOpen(false)}
                            className={cn(
                              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                              currentIndex === selectedIndex
                                ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)] dark:bg-teal-950/40 dark:text-[var(--color-accent)]"
                                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-slate-200",
                            )}
                          >
                            <item.icon
                              className="h-4 w-4 shrink-0"
                              strokeWidth={1.8}
                            />
                            <div className="flex-1">
                              <p
                                className={cn(
                                  "font-medium",
                                  currentIndex === selectedIndex &&
                                    "text-[var(--color-primary)] dark:text-[var(--color-accent)]",
                                )}
                              >
                                {item.label}
                              </p>
                              <p className="text-xs text-slate-400 dark:text-slate-500">
                                {item.description}
                              </p>
                            </div>
                            <span className="shrink-0 text-[11px] text-slate-400 dark:text-slate-500">
                              {item.category}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 px-4 py-12">
                  <FileText className="h-8 w-8 text-slate-300 dark:text-slate-600" />
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    No results found
                  </p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    Try searching for patients, appointments, or billing
                  </p>
                </div>
              )}

              {/* Footer */}
              <div className="flex items-center gap-4 border-t border-slate-100 px-4 py-2.5 dark:border-slate-800/60">
                <div className="flex items-center gap-3 text-xs text-slate-400 dark:text-slate-500">
                  <span className="flex items-center gap-1">
                    <kbd className="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[10px] dark:border-slate-700 dark:bg-slate-800">
                      ↑↓
                    </kbd>
                    Navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[10px] dark:border-slate-700 dark:bg-slate-800">
                      ↵
                    </kbd>
                    Open
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[10px] dark:border-slate-700 dark:bg-slate-800">
                      Esc
                    </kbd>
                    Close
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
