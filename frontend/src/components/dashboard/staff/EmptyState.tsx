"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Inbox } from "lucide-react";
import type { ElementType, ReactNode } from "react";
import { fadeUp, staggerItem } from "./MotionVariants";

interface EmptyStateProps {
  icon?: ElementType;
  heading: string;
  description: string;
  action?: ReactNode;
  className?: string;
}

/**
 * Reusable empty state with illustration, heading, description, and optional CTA.
 */
export function EmptyState({
  icon: Icon = Inbox,
  heading,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white/50 px-6 py-16 text-center",
        "dark:border-slate-700/50 dark:bg-slate-900/30",
        className,
      )}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", damping: 20, stiffness: 200, delay: 0.1 }}
        className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 dark:bg-slate-800/60"
      >
        <Icon className="h-8 w-8 text-slate-300 dark:text-slate-600" />
      </motion.div>
      <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
        {heading}
      </h3>
      <p className="mt-1.5 max-w-sm text-sm text-slate-500 dark:text-slate-400">
        {description}
      </p>
      {action && (
        <motion.div
          variants={staggerItem}
          initial="hidden"
          animate="visible"
          className="mt-6"
        >
          {action}
        </motion.div>
      )}
    </motion.div>
  );
}
