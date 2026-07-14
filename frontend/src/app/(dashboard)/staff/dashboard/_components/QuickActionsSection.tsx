"use client";

import {
  hoverLift,
  staggerContainer,
  staggerItem,
} from "@/components/dashboard/staff/MotionVariants";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { dashboardQuickActions } from "../_mock-data";

const gradientMap: Record<string, string> = {
  "from-emerald-500 to-emerald-600":
    "from-emerald-500/10 to-emerald-600/5 border-emerald-200/60 hover:border-emerald-300/80 dark:from-emerald-500/15 dark:to-emerald-600/10 dark:border-emerald-700/40 dark:hover:border-emerald-600/60",
  "from-blue-500 to-blue-600":
    "from-blue-500/10 to-blue-600/5 border-blue-200/60 hover:border-blue-300/80 dark:from-blue-500/15 dark:to-blue-600/10 dark:border-blue-700/40 dark:hover:border-blue-600/60",
  "from-violet-500 to-violet-600":
    "from-violet-500/10 to-violet-600/5 border-violet-200/60 hover:border-violet-300/80 dark:from-violet-500/15 dark:to-violet-600/10 dark:border-violet-700/40 dark:hover:border-violet-600/60",
  "from-amber-500 to-amber-600":
    "from-amber-500/10 to-amber-600/5 border-amber-200/60 hover:border-amber-300/80 dark:from-amber-500/15 dark:to-amber-600/10 dark:border-amber-700/40 dark:hover:border-amber-600/60",
  "from-rose-500 to-rose-600":
    "from-rose-500/10 to-rose-600/5 border-rose-200/60 hover:border-rose-300/80 dark:from-rose-500/15 dark:to-rose-600/10 dark:border-rose-700/40 dark:hover:border-rose-600/60",
  "from-cyan-500 to-cyan-600":
    "from-cyan-500/10 to-cyan-600/5 border-cyan-200/60 hover:border-cyan-300/80 dark:from-cyan-500/15 dark:to-cyan-600/10 dark:border-cyan-700/40 dark:hover:border-cyan-600/60",
};

const iconColorMap: Record<string, string> = {
  "from-emerald-500 to-emerald-600":
    "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400",
  "from-blue-500 to-blue-600":
    "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400",
  "from-violet-500 to-violet-600":
    "bg-violet-50 text-violet-600 dark:bg-violet-950/40 dark:text-violet-400",
  "from-amber-500 to-amber-600":
    "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400",
  "from-rose-500 to-rose-600":
    "bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400",
  "from-cyan-500 to-cyan-600":
    "bg-cyan-50 text-cyan-600 dark:bg-cyan-950/40 dark:text-cyan-400",
};

export function QuickActionsSection() {
  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
        Quick Actions
      </h2>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
      >
        {dashboardQuickActions.map((action) => (
          <motion.div key={action.id} variants={staggerItem} {...hoverLift}>
            <Link
              href={action.href}
              className={cn(
                "flex flex-col items-center gap-3 rounded-2xl border bg-gradient-to-br p-5 text-center transition-all duration-200",
                "outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]",
                gradientMap[action.gradient] ||
                  gradientMap["from-emerald-500 to-emerald-600"],
              )}
            >
              <div
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-2xl",
                  iconColorMap[action.gradient] ||
                    iconColorMap["from-emerald-500 to-emerald-600"],
                )}
              >
                <action.icon className="h-6 w-6" strokeWidth={1.8} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
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
    </section>
  );
}
