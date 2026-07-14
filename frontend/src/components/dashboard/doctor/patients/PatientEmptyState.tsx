"use client";

import { motion } from "framer-motion";
import { RotateCcw, Users } from "lucide-react";

interface PatientEmptyStateProps {
  onReset: () => void;
}

export function PatientEmptyState({ onReset }: PatientEmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-white py-16 dark:border-slate-700 dark:bg-slate-900/40"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
        <Users className="h-6 w-6 text-slate-400" />
      </div>
      <h3 className="mt-4 text-sm font-bold text-slate-900 dark:text-white">
        No patients found
      </h3>
      <p className="mt-1 max-w-xs text-center text-xs text-slate-500 dark:text-slate-400">
        Try adjusting your search or filter criteria to find what you&apos;re
        looking for.
      </p>
      <button
        onClick={onReset}
        className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-cyan-500 px-4 py-2 text-xs font-medium text-white transition-all hover:bg-cyan-600"
      >
        <RotateCcw className="h-3.5 w-3.5" />
        Reset Filters
      </button>
    </motion.div>
  );
}
