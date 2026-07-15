"use client";

import { fadeUp } from "@/components/dashboard/staff/MotionVariants";
import { motion } from "framer-motion";
import { ClipboardList, type LucideIcon } from "lucide-react";

/* ─── Props ─────────────────────────────────── */

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: LucideIcon;
}

/* ══════════════════════════════════════════════
   EmptyState
   ══════════════════════════════════════════════ */

export function EmptyState({
  title = "No patients in queue.",
  description = "The queue is currently empty. New patients will appear here when they check in.",
  icon: Icon = ClipboardList,
}: EmptyStateProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800">
        <Icon className="h-8 w-8 text-slate-400 dark:text-slate-500" />
      </div>
      <h3 className="mt-5 text-base font-semibold text-slate-700 dark:text-slate-300">
        {title}
      </h3>
      <p className="mt-1.5 max-w-sm text-sm text-slate-500 dark:text-slate-400">
        {description}
      </p>
    </motion.div>
  );
}
