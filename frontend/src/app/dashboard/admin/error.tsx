"use client";

import { motion } from "framer-motion";
import { AlertTriangle, LifeBuoy, RefreshCw } from "lucide-react";
import { useState } from "react";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [resetting, setResetting] = useState(false);

  const handleReset = () => {
    setResetting(true);
    setTimeout(() => {
      reset();
      setResetting(false);
    }, 600);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="flex min-h-[400px] items-center justify-center p-8"
    >
      <div className="flex max-w-md flex-col items-center text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 15, delay: 0.1 }}
          className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 dark:bg-red-950/30"
        >
          <AlertTriangle className="h-8 w-8 text-red-500" />
        </motion.div>
        <h2 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">
          Something went wrong
        </h2>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          {error.message || "An unexpected error occurred. Please try again."}
        </p>
        <div className="mt-6 flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleReset}
            disabled={resetting}
            className="inline-flex items-center gap-2 rounded-xl bg-dash-primary px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-dash-primary-dark disabled:opacity-70"
          >
            <RefreshCw
              className={`h-4 w-4 ${resetting ? "animate-spin" : ""}`}
            />
            {resetting ? "Retrying..." : "Try again"}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() =>
              (window.location.href = "/dashboard/admin/dashboard")
            }
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
          >
            <LifeBuoy className="h-4 w-4" />
            Go to Dashboard
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
