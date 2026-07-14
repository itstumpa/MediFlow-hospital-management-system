"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "./MotionVariants";
import { doctorQuickActions } from "./navigation";

interface QuickActionsProps {
  collapsed?: boolean;
}

export function QuickActions({ collapsed }: QuickActionsProps) {
  if (collapsed) return null;

  return (
    <div className="shrink-0 border-t border-slate-100/80 px-4 py-3 dark:border-slate-800/40">
      <p className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400 dark:text-slate-500">
        Quick Actions
      </p>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-1"
      >
        {doctorQuickActions.map((action) => (
          <motion.button
            key={action.label}
            variants={staggerItem}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium",
              "text-slate-600 transition-all duration-200 hover:bg-slate-100 hover:text-slate-900",
              "dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-slate-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]",
            )}
            aria-label={action.actionLabel}
          >
            <span className="flex shrink-0 items-center justify-center">
              <action.icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
            </span>
            <span>{action.label}</span>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}
