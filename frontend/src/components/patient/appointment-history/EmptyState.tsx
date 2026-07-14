"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { CalendarPlus, CalendarX2 } from "lucide-react";
import Link from "next/link";

interface EmptyStateProps {
  hasActiveFilters: boolean;
  onReset?: () => void;
  className?: string;
}

export function EmptyState({
  hasActiveFilters,
  onReset,
  className,
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const }}
      className={cn(
        "flex flex-col items-center justify-center py-20 text-center",
        className,
      )}
    >
      {/* Illustration area */}
      <div className="relative mb-6">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-slate-50 dark:bg-slate-800/60">
          <CalendarX2 className="h-12 w-12 text-slate-300 dark:text-slate-600" />
        </div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[var(--color-primary)] dark:border-slate-900 dark:bg-[var(--color-accent)]"
        >
          <CalendarPlus className="h-4 w-4 text-white" />
        </motion.div>
      </div>

      {/* Text */}
      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
        {hasActiveFilters
          ? "No appointments match your filters"
          : "No appointments yet"}
      </h3>
      <p className="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400">
        {hasActiveFilters
          ? "Try adjusting your search or filter criteria, or clear all filters to see all appointments."
          : "Book your first appointment to get started with your healthcare journey."}
      </p>

      {/* Actions */}
      <div className="mt-6 flex items-center gap-3">
        {hasActiveFilters && onReset && (
          <button
            type="button"
            onClick={onReset}
            className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 transition-all hover:bg-slate-50 hover:shadow-sm dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Clear Filters
          </button>
        )}
        <Link
          href="/appointments/book"
          className="inline-flex items-center gap-2 rounded-xl bg-[var(--color-primary)] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-[var(--color-primary-dark)] hover:shadow-md dark:bg-[var(--color-accent)] dark:hover:opacity-90"
        >
          <CalendarPlus className="h-4 w-4" />
          Book Appointment
        </Link>
      </div>
    </motion.div>
  );
}
