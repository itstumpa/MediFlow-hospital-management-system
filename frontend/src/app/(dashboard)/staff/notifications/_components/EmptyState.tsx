"use client";

import { fadeUp } from "@/components/dashboard/staff/MotionVariants";
import { motion } from "framer-motion";
import { BellOff } from "lucide-react";

/* ══════════════════════════════════════════════
   EmptyState
   ══════════════════════════════════════════════ */

interface EmptyStateProps {
  title?: string;
  description?: string;
}

export function EmptyState({
  title = "No notifications found.",
  description = "There are no notifications matching your current filters. Try adjusting your filter to see more.",
}: EmptyStateProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center py-16"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800">
        <BellOff className="h-8 w-8 text-slate-400 dark:text-slate-500" />
      </div>
      <h3 className="mt-4 text-sm font-medium text-slate-900 dark:text-white">
        {title}
      </h3>
      <p className="mt-1 max-w-sm text-center text-xs text-slate-500 dark:text-slate-400">
        {description}
      </p>
    </motion.div>
  );
}
