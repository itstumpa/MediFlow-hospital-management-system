"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ChevronDown, X } from "lucide-react";
import type {
  NotificationFilter,
  NotificationFilters,
  NotificationSort,
} from "./types";

interface NotificationFiltersProps {
  filters: NotificationFilters;
  onChange: (filters: NotificationFilters) => void;
  onReset: () => void;
  unreadCount: number;
}

const filterOptions: {
  value: NotificationFilter;
  label: string;
  icon?: string;
}[] = [
  { value: "all", label: "All" },
  { value: "unread", label: "Unread" },
  { value: "appointment", label: "Appointments" },
  { value: "prescription", label: "Prescriptions" },
  { value: "lab-report", label: "Reports" },
  { value: "announcement", label: "Announcements" },
  { value: "system", label: "System" },
  { value: "promotion", label: "Promotions" },
];

const sortOptions: { value: NotificationSort; label: string }[] = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
];

export function NotificationFilters({
  filters,
  onChange,
  onReset,
  unreadCount,
}: NotificationFiltersProps) {
  const hasActiveFilters =
    filters.filter !== "all" || filters.sort !== "newest";

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 rounded-2xl border bg-white/80 dark:bg-slate-800/60 backdrop-blur-sm dash-card"
    >
      {/* Filter Chips */}
      <div className="flex flex-wrap items-center gap-2">
        {filterOptions.map((option) => (
          <motion.button
            key={option.value}
            type="button"
            onClick={() => onChange({ ...filters, filter: option.value })}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200",
              filters.filter === option.value
                ? "bg-[var(--color-primary)] text-white shadow-sm"
                : "bg-slate-50 text-slate-600 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700",
            )}
            aria-pressed={filters.filter === option.value}
          >
            {option.value === "unread" && unreadCount > 0 && (
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white/30 text-[10px] font-bold">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
            {option.label}
          </motion.button>
        ))}
      </div>

      {/* Sort & Reset */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative">
          <select
            value={filters.sort}
            onChange={(e) =>
              onChange({ ...filters, sort: e.target.value as NotificationSort })
            }
            className="appearance-none rounded-xl border border-slate-200 bg-white px-3 py-1.5 pr-8 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
            aria-label="Sort notifications"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown
            className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 pointer-events-none"
            aria-hidden="true"
          />
        </div>

        {hasActiveFilters && (
          <motion.button
            type="button"
            onClick={onReset}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition-all hover:bg-slate-50 hover:border-slate-300 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700/50"
          >
            <X className="h-3.5 w-3.5" />
            <span>Reset</span>
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
