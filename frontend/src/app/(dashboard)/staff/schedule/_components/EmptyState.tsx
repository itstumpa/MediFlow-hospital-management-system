"use client";

import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

/* ─── Props ─────────────────────────────────── */

interface EmptyStateProps {
  title?: string;
  description?: string;
}

/* ══════════════════════════════════════════════
   Component
   ══════════════════════════════════════════════ */

export function EmptyState({
  title = "No schedules available",
  description = "There are no schedules or appointments to display for the selected criteria.",
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50/50 py-16 dark:border-slate-600 dark:bg-slate-800/30"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700">
        <Calendar className="h-7 w-7 text-slate-400" />
      </div>
      <h3 className="mt-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
        {title}
      </h3>
      <p className="mt-1.5 max-w-sm text-center text-xs text-slate-500 dark:text-slate-400">
        {description}
      </p>
    </motion.div>
  );
}
