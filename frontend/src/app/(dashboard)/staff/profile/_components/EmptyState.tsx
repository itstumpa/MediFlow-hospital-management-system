"use client";

import { motion } from "framer-motion";
import { type LucideIcon, UserX } from "lucide-react";

interface EmptyStateProps {
  icon?: LucideIcon;
  title?: string;
  description?: string;
}

export function EmptyState({
  icon: Icon = UserX,
  title = "No profile data found.",
  description = "We couldn't load your profile information. Please try refreshing the page.",
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center py-16"
    >
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
        <Icon className="h-8 w-8 text-slate-400" />
      </div>
      <p className="mb-1 text-base font-medium text-slate-900 dark:text-white">
        {title}
      </p>
      <p className="max-w-xs text-center text-sm text-slate-500 dark:text-slate-400">
        {description}
      </p>
    </motion.div>
  );
}
