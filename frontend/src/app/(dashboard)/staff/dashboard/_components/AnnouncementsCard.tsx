"use client";

import {
  cardHover,
  staggerContainer,
  staggerItem,
} from "@/components/dashboard/staff/MotionVariants";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, Info, XCircle } from "lucide-react";
import { announcements, type AnnouncementType } from "../_mock-data";

/* ─── Type Config ───────────────────────────── */

const typeConfig: Record<
  AnnouncementType,
  { icon: typeof Info; classes: string; iconClasses: string }
> = {
  info: {
    icon: Info,
    classes:
      "border-blue-200/60 bg-blue-50/30 dark:border-blue-800/30 dark:bg-blue-950/10",
    iconClasses:
      "bg-blue-100 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400",
  },
  warning: {
    icon: AlertTriangle,
    classes:
      "border-amber-200/60 bg-amber-50/30 dark:border-amber-800/30 dark:bg-amber-950/10",
    iconClasses:
      "bg-amber-100 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400",
  },
  danger: {
    icon: XCircle,
    classes:
      "border-red-200/60 bg-red-50/30 dark:border-red-800/30 dark:bg-red-950/10",
    iconClasses: "bg-red-100 text-red-600 dark:bg-red-950/40 dark:text-red-400",
  },
  success: {
    icon: CheckCircle2,
    classes:
      "border-emerald-200/60 bg-emerald-50/30 dark:border-emerald-800/30 dark:bg-emerald-950/10",
    iconClasses:
      "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400",
  },
};

/* ─── Announcements Card ────────────────────── */

export function AnnouncementsCard() {
  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
        Announcements
      </h2>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        {announcements.map((ann) => {
          const config = typeConfig[ann.type];
          const Icon = config.icon;

          return (
            <motion.div
              key={ann.id}
              variants={staggerItem}
              {...cardHover}
              className={cn(
                "flex gap-4 rounded-2xl border p-4",
                config.classes,
              )}
            >
              <span
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                  config.iconClasses,
                )}
              >
                <Icon className="h-5 w-5" strokeWidth={1.8} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                    {ann.title}
                  </h4>
                  <span className="shrink-0 text-[11px] text-slate-400">
                    {ann.time}
                  </span>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  {ann.message}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
