"use client";

import { fadeUp } from "@/components/patient/MotionVariants";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { FlaskConical, SearchX } from "lucide-react";

/* ─── Props ─── */

interface EmptyStateProps {
  hasFilters?: boolean;
  onReset?: () => void;
  className?: string;
}

/* ─── Component ─── */

export function EmptyState({
  hasFilters = false,
  onReset,
  className,
}: EmptyStateProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className={cn(
        "dash-card flex flex-col items-center justify-center py-20 px-6 text-center",
        className,
      )}
      role="status"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15,
          delay: 0.1,
        }}
        className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-50 dark:bg-slate-700/50"
      >
        {hasFilters ? (
          <SearchX className="h-10 w-10 text-slate-300 dark:text-slate-500" />
        ) : (
          <FlaskConical className="h-10 w-10 text-slate-300 dark:text-slate-500" />
        )}
      </motion.div>
      <h3 className="mt-6 text-lg font-bold text-slate-900 dark:text-white">
        {hasFilters ? "No Matching Reports" : "No Lab Reports Available"}
      </h3>
      <p className="mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">
        {hasFilters
          ? "No reports match your current filters. Try adjusting your search criteria."
          : "Your laboratory test results will appear here once your doctor orders tests and they are processed by the lab."}
      </p>
      {hasFilters && onReset && (
        <button
          type="button"
          onClick={onReset}
          className="mt-6 inline-flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 transition-all hover:bg-slate-50 hover:shadow-sm dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700"
        >
          Reset Filters
        </button>
      )}
    </motion.div>
  );
}
