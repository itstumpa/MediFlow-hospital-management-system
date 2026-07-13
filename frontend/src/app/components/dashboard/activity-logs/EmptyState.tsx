"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Activity, Database, FilterX, Plus, Search } from "lucide-react";
import type { ReactNode } from "react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  secondaryAction?: ReactNode;
  className?: string;
  hasFilters?: boolean;
  onClearFilters?: () => void;
}

export function EmptyState({
  title = "No activities found",
  description = "No activity logs match your current filters. Try adjusting your search criteria.",
  icon,
  action,
  secondaryAction,
  className,
  hasFilters = false,
  onClearFilters,
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn(
        "flex flex-col items-center justify-center text-center py-16 px-6 dash-card",
        className,
      )}
    >
      <div className="relative mb-6">
        {icon || (
          <div className="mx-auto w-20 h-20 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
            <Database className="h-10 w-10 text-slate-400 dark:text-slate-500" />
          </div>
        )}
        {hasFilters && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 0.2,
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
            className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center"
          >
            <FilterX className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          </motion.div>
        )}
      </div>

      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
        {title}
      </h3>

      <p className="text-slate-500 dark:text-slate-400 max-w-sm mb-6">
        {description}
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-3">
        {action}
        {secondaryAction}
        {hasFilters && onClearFilters && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClearFilters}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition-all hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:bg-slate-700"
          >
            <FilterX className="h-4 w-4" />
            Clear Filters
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}

/** Specialized empty state for activity logs */
export function ActivityEmptyState({
  hasFilters = false,
  onClearFilters,
  onCreateLog,
}: {
  hasFilters?: boolean;
  onClearFilters?: () => void;
  onCreateLog?: () => void;
}) {
  return (
    <EmptyState
      title="No activity logs found"
      description={
        hasFilters
          ? "No activities match your current filters. Try broadening your search or clearing filters."
          : "No activity logs have been recorded yet. System activities will appear here automatically."
      }
      icon={
        <div className="mx-auto w-20 h-20 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
          <Activity className="h-10 w-10 text-slate-400 dark:text-slate-500" />
        </div>
      }
      action={
        onCreateLog && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onCreateLog}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md"
          >
            <Plus className="h-4 w-4" />
            Create Log Entry
          </motion.button>
        )
      }
      hasFilters={hasFilters}
      onClearFilters={onClearFilters}
    />
  );
}

/** Empty state for timeline view */
export function TimelineEmptyState({
  hasFilters = false,
  onClearFilters,
}: {
  hasFilters?: boolean;
  onClearFilters?: () => void;
}) {
  return (
    <EmptyState
      title="No activities in this period"
      description={
        hasFilters
          ? "No activities match your filters for the selected time range."
          : "No activities recorded for this time period."
      }
      icon={
        <div className="mx-auto w-20 h-20 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
          <Search className="h-10 w-10 text-slate-400 dark:text-slate-500" />
        </div>
      }
      hasFilters={hasFilters}
      onClearFilters={onClearFilters}
    />
  );
}
