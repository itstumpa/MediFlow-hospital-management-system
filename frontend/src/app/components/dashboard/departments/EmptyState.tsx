"use client";

import { motion } from "framer-motion";
import { Building2, Plus, SearchX } from "lucide-react";

interface EmptyStateProps {
  hasFilters: boolean;
  onClearFilters: () => void;
  onCreateDepartment: () => void;
}

export function EmptyState({
  hasFilters,
  onClearFilters,
  onCreateDepartment,
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
          <Building2 className="h-8 w-8 text-slate-400" />
        )}
      </div>
      <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
        {hasFilters ? "No Departments Found" : "No Departments Yet"}
      </h3>
      <p className="mt-2 max-w-sm text-center text-sm text-slate-500 dark:text-slate-400">
        {hasFilters
          ? "No departments match your current filters. Try adjusting your search or filter criteria."
          : "Get started by creating your first department in the hospital system."}
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
            onClick={onCreateDepartment}
            className="inline-flex items-center gap-2 rounded-xl bg-dash-primary px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-dash-primary-dark hover:shadow-lg"
          >
            <Plus className="h-4 w-4" />
            Create Department
          </button>
        )}
      </div>
    </motion.div>
  );
}
