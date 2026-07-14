"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}

/**
 * Friendly medical-themed error card with a retry button.
 */
export function ErrorState({
  title = "Something went wrong",
  description = "An unexpected error occurred. Please try again.",
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn(
        "flex flex-col items-center justify-center gap-4 rounded-2xl border border-red-200/60 bg-red-50/50 px-6 py-12 text-center",
        "dark:border-red-900/30 dark:bg-red-950/20",
        className,
      )}
      role="alert"
    >
      {/* Icon */}
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 dark:bg-red-900/30">
        <AlertTriangle className="h-8 w-8 text-red-500 dark:text-red-400" />
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-red-800 dark:text-red-300">
        {title}
      </h3>

      {/* Description */}
      <p className="max-w-sm text-sm text-red-600 dark:text-red-400">
        {description}
      </p>

      {/* Retry button */}
      {onRetry && (
        <button
          onClick={onRetry}
          className={cn(
            "mt-2 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium",
            "bg-red-600 text-white transition-colors hover:bg-red-700",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2",
            "dark:bg-red-500 dark:hover:bg-red-600",
          )}
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </button>
      )}
    </motion.div>
  );
}
