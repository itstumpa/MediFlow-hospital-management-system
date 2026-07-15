"use client";

import { motion } from "framer-motion";
import { Columns3, List, RotateCcw, Search, X } from "lucide-react";

export type ViewMode = "table" | "cards";

interface PatientToolbarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  showFilters: boolean;
  onToggleFilters: () => void;
  hasActiveFilters: boolean;
  onReset: () => void;
}

export function PatientToolbar({
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange,
  showFilters,
  onToggleFilters,
  hasActiveFilters,
  onReset,
}: PatientToolbarProps) {
  return (
    <div className="dash-card p-4">
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, ID, phone, email..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-10 pr-3 text-sm text-slate-700 placeholder-slate-400 transition-colors hover:border-slate-300 focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:placeholder-slate-500 dark:hover:border-slate-600"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Filters toggle */}
        <button
          onClick={onToggleFilters}
          className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
            showFilters || hasActiveFilters
              ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
              : "border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
          }`}
        >
          Filters
          {hasActiveFilters && (
            <span className="ml-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-primary)] text-[10px] font-bold text-white">
              !
            </span>
          )}
        </button>

        {/* Reset */}
        {hasActiveFilters && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={onReset}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-500 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset
          </motion.button>
        )}

        {/* View mode toggle */}
        <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white p-1 dark:border-slate-700 dark:bg-slate-800">
          <button
            onClick={() => onViewModeChange("table")}
            className={`relative flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
              viewMode === "table"
                ? "text-white"
                : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
            }`}
          >
            {viewMode === "table" && (
              <motion.span
                layoutId="patientViewBg"
                className="absolute inset-0 rounded-md bg-[var(--color-primary)]"
                transition={{ duration: 0.2, ease: "easeOut" }}
              />
            )}
            <List className="relative h-3.5 w-3.5" />
            <span className="relative">Table</span>
          </button>
          <button
            onClick={() => onViewModeChange("cards")}
            className={`relative flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
              viewMode === "cards"
                ? "text-white"
                : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
            }`}
          >
            {viewMode === "cards" && (
              <motion.span
                layoutId="patientViewBg"
                className="absolute inset-0 rounded-md bg-[var(--color-primary)]"
                transition={{ duration: 0.2, ease: "easeOut" }}
              />
            )}
            <Columns3 className="relative h-3.5 w-3.5" />
            <span className="relative">Cards</span>
          </button>
        </div>
      </div>
    </div>
  );
}
