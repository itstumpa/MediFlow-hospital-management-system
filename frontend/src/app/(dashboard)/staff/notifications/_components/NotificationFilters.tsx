"use client";

import { motion } from "framer-motion";
import { filterOptions, type NotificationFilter } from "../_mock-data";

/* ══════════════════════════════════════════════
   NotificationFilters
   ══════════════════════════════════════════════ */

interface NotificationFiltersProps {
  activeFilter: NotificationFilter;
  onFilterChange: (filter: NotificationFilter) => void;
}

export function NotificationFilters({
  activeFilter,
  onFilterChange,
}: NotificationFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {filterOptions.map((option) => {
        const isActive = activeFilter === option.value;
        return (
          <motion.button
            key={option.value}
            onClick={() => onFilterChange(option.value)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-medium transition-colors sm:text-sm ${
              isActive
                ? "bg-[var(--color-primary)] text-white shadow-sm"
                : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700 dark:hover:bg-slate-700/50"
            }`}
          >
            {option.label}
          </motion.button>
        );
      })}
    </div>
  );
}
