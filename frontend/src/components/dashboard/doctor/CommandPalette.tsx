"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, Command, FileText, Search, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useDoctorContext } from "./DoctorProvider";
import { fadeInBackdrop, scaleUp } from "./MotionVariants";
import { doctorCommandPaletteItems } from "./navigation";

const categoryIcons: Record<string, typeof Command> = {
  page: Command,
  patient: User,
  appointment: Calendar,
  action: FileText,
};

const categoryLabels: Record<string, string> = {
  page: "Pages",
  patient: "Patients",
  appointment: "Appointments",
  action: "Actions",
};

export function CommandPalette() {
  const { commandPaletteOpen, setCommandPaletteOpen } = useDoctorContext();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  /* Focus input when opened */
  useEffect(() => {
    if (commandPaletteOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [commandPaletteOpen]);

  /* Reset query when closed */
  useEffect(() => {
    if (!commandPaletteOpen) {
      setQuery("");
    }
  }, [commandPaletteOpen]);

  /* Filter items based on search query */
  const filteredItems = query
    ? doctorCommandPaletteItems.filter(
        (item) =>
          item.label.toLowerCase().includes(query.toLowerCase()) ||
          (item.description &&
            item.description.toLowerCase().includes(query.toLowerCase())),
      )
    : doctorCommandPaletteItems;

  /* Group filtered items by category */
  const groupedItems = filteredItems.reduce<
    Record<string, typeof doctorCommandPaletteItems>
  >((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

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

          {/* Modal */}
          <motion.div
            key="cp-modal"
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
                "overflow-hidden rounded-2xl",
                "border border-slate-200/60 bg-white shadow-2xl shadow-slate-900/10",
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
                  placeholder="Search pages, patients, appointments..."
                  className={cn(
                    "h-14 w-full bg-transparent text-base text-slate-900 placeholder-slate-400 outline-none",
                    "dark:text-white dark:placeholder-slate-500",
                  )}
                  aria-label="Search"
                />
                <kbd
                  className={cn(
                    "hidden shrink-0 items-center gap-0.5 rounded-lg border border-slate-200 bg-slate-50 px-1.5 py-0.5",
                    "text-[11px] font-medium text-slate-400",
                    "dark:border-slate-700 dark:bg-slate-800 dark:text-slate-500",
                    "sm:flex",
                  )}
                >
                  <span>ESC</span>
                </kbd>
              </div>

              {/* Results */}
              <div className="max-h-[360px] overflow-y-auto py-2 dash-scrollbar">
                {Object.keys(groupedItems).length === 0 ? (
                  <div className="flex flex-col items-center gap-2 px-4 py-8 text-center">
                    <Search className="h-8 w-8 text-slate-300 dark:text-slate-600" />
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      No results found for &ldquo;{query}&rdquo;
                    </p>
                  </div>
                ) : (
                  Object.entries(groupedItems).map(([category, items]) => (
                    <div key={category} className="mb-2">
                      <p className="px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400 dark:text-slate-500">
                        {categoryLabels[category] || category}
                      </p>
                      {items.map((item) => (
                        <Link
                          key={`${item.category}-${item.label}`}
                          href={item.href || "#"}
                          onClick={() => setCommandPaletteOpen(false)}
                          className={cn(
                            "flex items-center gap-3 px-4 py-2.5 text-sm transition-colors",
                            "text-slate-600 hover:bg-slate-50",
                            "dark:text-slate-400 dark:hover:bg-slate-800/40",
                          )}
                        >
                          <span
                            className={cn(
                              "flex h-7 w-7 items-center justify-center rounded-lg",
                              "bg-slate-100 text-slate-500",
                              "dark:bg-slate-800 dark:text-slate-400",
                            )}
                          >
                            <item.icon className="h-3.5 w-3.5" />
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-slate-900 dark:text-white">
                              {item.label}
                            </p>
                            {item.description && (
                              <p className="text-xs text-slate-500 dark:text-slate-500">
                                {item.description}
                              </p>
                            )}
                          </div>
                          {item.category === "page" && item.href && (
                            <span className="text-[11px] text-slate-400 dark:text-slate-500">
                              Go to page
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center gap-4 border-t border-slate-100 px-4 py-2.5 dark:border-slate-800/60">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <kbd className="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[10px] font-medium dark:border-slate-700 dark:bg-slate-800">
                    ⌘K
                  </kbd>
                  <span>Open command palette</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <kbd className="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[10px] font-medium dark:border-slate-700 dark:bg-slate-800">
                    ↑↓
                  </kbd>
                  <span>Navigate</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <kbd className="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[10px] font-medium dark:border-slate-700 dark:bg-slate-800">
                    ESC
                  </kbd>
                  <span>Close</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
