"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { useState } from "react";
import { buttonPress, fadeUp } from "./MotionVariants";

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}

/**
 * Reusable error state with friendly UI and retry capability.
 */
export function ErrorState({
  title = "Something went wrong",
  description = "An unexpected error occurred. Please try again or contact your system administrator.",
  onRetry,
  className,
}: ErrorStateProps) {
  const [retrying, setRetrying] = useState(false);

  const handleRetry = async () => {
    if (!onRetry) return;
    setRetrying(true);
    try {
      await onRetry();
    } finally {
      setRetrying(false);
    }
  };

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-red-200/60 bg-red-50/50 px-6 py-16 text-center",
        "dark:border-red-900/30 dark:bg-red-950/10",
        className,
      )}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", damping: 15, stiffness: 200 }}
        className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 dark:bg-red-950/40"
      >
        <AlertTriangle className="h-8 w-8 text-red-500 dark:text-red-400" />
      </motion.div>
      <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
        {title}
      </h3>
      <p className="mt-1.5 max-w-sm text-sm text-slate-500 dark:text-slate-400">
        {description}
      </p>
      <div className="mt-6 flex items-center gap-3">
        {onRetry && (
          <motion.button
            onClick={handleRetry}
            disabled={retrying}
            {...buttonPress}
            className={cn(
              "inline-flex items-center gap-2 rounded-xl bg-[var(--color-primary)] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all",
              "hover:bg-[var(--color-primary-dark)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2",
              "disabled:opacity-60 disabled:cursor-not-allowed",
            )}
          >
            <RefreshCw className={cn("h-4 w-4", retrying && "animate-spin")} />
            {retrying ? "Retrying..." : "Try Again"}
          </motion.button>
        )}
        <a
          href="mailto:admin@mediflow.com"
          className={cn(
            "inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-600 shadow-sm transition-all",
            "hover:bg-slate-50 hover:text-slate-900",
            "dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-200",
          )}
        >
          Contact Admin
        </a>
      </div>
    </motion.div>
  );
}
