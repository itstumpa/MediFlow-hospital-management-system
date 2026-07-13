"use client";

import { motion } from "framer-motion";
import { SearchX, UserPlus } from "lucide-react";

interface EmptyStateProps {
  hasFilters: boolean;
  onClearFilters: () => void;
  onAddDoctor: () => void;
}

export function EmptyState({
  hasFilters,
  onClearFilters,
  onAddDoctor,
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="dash-card flex flex-col items-center py-16"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800">
        {hasFilters ? (
          <SearchX className="h-8 w-8 text-slate-400" />
        ) : (
          <UserPlus className="h-8 w-8 text-slate-400" />
        )}
      </div>
      <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
        {hasFilters ? "No doctors found" : "No doctors yet"}
      </h3>
      <p className="mt-2 max-w-sm text-center text-sm text-slate-500 dark:text-slate-400">
        {hasFilters
          ? "No doctors match your current filters. Try adjusting your search or filter criteria."
          : "Get started by adding your first doctor to the system."}
      </p>
      <div className="mt-6 flex items-center gap-3">
        {hasFilters && (
          <button
            onClick={onClearFilters}
            className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition-all hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-700"
          >
            Clear Filters
          </button>
        )}
        {!hasFilters && (
          <button
            onClick={onAddDoctor}
            className="inline-flex items-center gap-2 rounded-xl bg-dash-primary px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-dash-primary-dark hover:shadow-lg"
          >
            <UserPlus className="h-4 w-4" />
            Add Doctor
          </button>
        )}
      </div>
    </motion.div>
  );
}
