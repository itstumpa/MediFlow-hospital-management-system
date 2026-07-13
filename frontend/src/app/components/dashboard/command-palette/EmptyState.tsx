"use client";

import { motion } from "framer-motion";
import { SearchX } from "lucide-react";

interface EmptyStateProps {
  query: string;
}

export function EmptyState({ query }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col items-center justify-center py-16 text-center"
    >
      <div className="flex size-14 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800">
        <SearchX
          className="h-7 w-7 text-slate-400 dark:text-slate-500"
          strokeWidth={1.5}
        />
      </div>
      <h3 className="mt-4 text-sm font-semibold text-slate-900 dark:text-white">
        No results found
      </h3>
      <p className="mt-1 max-w-xs text-sm text-slate-500 dark:text-slate-400">
        No pages or commands match{" "}
        <span className="font-medium text-slate-700 dark:text-slate-300">
          &ldquo;{query}&rdquo;
        </span>
        . Try a different search term.
      </p>
    </motion.div>
  );
}
