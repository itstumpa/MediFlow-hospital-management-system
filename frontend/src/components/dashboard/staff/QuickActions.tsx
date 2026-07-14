"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { buttonPress, staggerContainer, staggerItem } from "./MotionVariants";
import { staffQuickActions } from "./navigation";

/**
 * Quick Actions panel — used as a sidebar widget or standalone section.
 */
export function QuickActions() {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
        Quick Actions
      </h3>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 gap-2"
      >
        {staffQuickActions.map((action) => (
          <motion.div key={action.label} variants={staggerItem}>
            <Link
              href={action.href}
              className={cn(
                "flex flex-col items-center gap-2 rounded-2xl border p-4 text-center transition-all duration-200",
                "border-slate-200/60 bg-white hover:shadow-md hover:border-slate-300/80",
                "dark:border-slate-700/40 dark:bg-slate-800/40 dark:hover:border-slate-600/60 dark:hover:bg-slate-800/80",
                "outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]",
              )}
              {...buttonPress}
            >
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-2xl",
                  action.color === "emerald" &&
                    "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400",
                  action.color === "blue" &&
                    "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400",
                  action.color === "amber" &&
                    "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400",
                  action.color === "violet" &&
                    "bg-violet-50 text-violet-600 dark:bg-violet-950/40 dark:text-violet-400",
                  action.color === "rose" &&
                    "bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400",
                )}
              >
                <action.icon className="h-5 w-5" strokeWidth={1.8} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  {action.label}
                </p>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                  {action.description}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
