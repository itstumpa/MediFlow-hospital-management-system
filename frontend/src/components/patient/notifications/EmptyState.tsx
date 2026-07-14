"use client";

import { motion } from "framer-motion";
import { Bell, Filter, Inbox, Mail, X } from "lucide-react";

interface EmptyStateProps {
  hasFilters?: boolean;
  onClearFilters?: () => void;
  filterLabel?: string;
}

export function EmptyState({
  hasFilters = false,
  onClearFilters,
  filterLabel,
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col items-center justify-center gap-4 py-16 px-6 text-center"
    >
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800"
      >
        {hasFilters ? (
          <Filter className="h-8 w-8 text-slate-400 dark:text-slate-500" />
        ) : (
          <Bell className="h-8 w-8 text-slate-400 dark:text-slate-500" />
        )}
      </motion.div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          {hasFilters ? "No matching notifications" : "No notifications yet"}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm">
          {hasFilters
            ? `No notifications match "${filterLabel || "your filters"}". Try adjusting your filters.`
            : "You're all caught up! New notifications will appear here."}
        </p>
      </div>

      {hasFilters && onClearFilters && (
        <motion.button
          type="button"
          onClick={onClearFilters}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-2 inline-flex items-center gap-2 rounded-xl bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-[var(--color-primary-dark)] hover:shadow-md active:scale-[0.97] dark:bg-[var(--color-accent)] dark:text-slate-900"
        >
          <X className="h-4 w-4" />
          Clear Filters
        </motion.button>
      )}

      {!hasFilters && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="mt-4 flex items-center justify-center gap-4 text-sm text-slate-500 dark:text-slate-400"
        >
          <span className="flex items-center gap-1.5">
            <Mail className="h-4 w-4" />
            Email notifications
          </span>
          <span className="flex items-center gap-1.5">
            <Inbox className="h-4 w-4" />
            In-app alerts
          </span>
        </motion.div>
      )}
    </motion.div>
  );
}
