"use client";

import { buttonPress } from "@/components/dashboard/staff/MotionVariants";
import { motion } from "framer-motion";
import {
  Filter,
  Monitor,
  Plus,
  RefreshCw,
  Search,
  UserPlus,
} from "lucide-react";

/* ─── Props ─────────────────────────────────── */

interface QueueToolbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  showFilters: boolean;
  onToggleFilters: () => void;
  hasActiveFilters: boolean;
  onAddWalkIn: () => void;
  onCallNext: () => void;
  onRefresh: () => void;
  onDisplayBoard: () => void;
}

/* ══════════════════════════════════════════════
   QueueToolbar
   ══════════════════════════════════════════════ */

export function QueueToolbar({
  searchQuery,
  onSearchChange,
  showFilters,
  onToggleFilters,
  hasActiveFilters,
  onAddWalkIn,
  onCallNext,
  onRefresh,
  onDisplayBoard,
}: QueueToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Search */}
      <div className="relative min-w-0 flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search patients by name or ID..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 text-sm text-slate-700 placeholder-slate-400 transition-colors focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:placeholder-slate-500"
        />
      </div>

      {/* Filter toggle */}
      <motion.div {...buttonPress}>
        <button
          onClick={onToggleFilters}
          className={`flex h-10 items-center gap-2 rounded-lg border px-3 text-sm font-medium transition-all ${
            showFilters || hasActiveFilters
              ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5 text-[var(--color-primary)]"
              : "border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
          }`}
        >
          <Filter className="h-4 w-4" />
          Filters
          {hasActiveFilters && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-primary)] text-[10px] font-bold text-white">
              !
            </span>
          )}
        </button>
      </motion.div>

      {/* Add Walk-in */}
      <motion.div {...buttonPress}>
        <button
          onClick={onAddWalkIn}
          className="flex h-10 items-center gap-2 rounded-lg bg-[var(--color-primary)] px-4 text-sm font-medium text-white shadow-sm transition-all hover:bg-[var(--color-primary-dark)]"
        >
          <UserPlus className="h-4 w-4" />
          <span className="hidden sm:inline">Add Walk-in</span>
        </button>
      </motion.div>

      {/* Call Next */}
      <motion.div {...buttonPress}>
        <button
          onClick={onCallNext}
          className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm transition-all hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Call Next</span>
        </button>
      </motion.div>

      {/* Refresh */}
      <motion.div {...buttonPress}>
        <button
          onClick={onRefresh}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-sm transition-all hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
        >
          <RefreshCw className="h-4 w-4" />
        </button>
      </motion.div>

      {/* Display Board */}
      <motion.div {...buttonPress}>
        <button
          onClick={onDisplayBoard}
          className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm transition-all hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
        >
          <Monitor className="h-4 w-4" />
          <span className="hidden sm:inline">Display Board</span>
        </button>
      </motion.div>
    </div>
  );
}
