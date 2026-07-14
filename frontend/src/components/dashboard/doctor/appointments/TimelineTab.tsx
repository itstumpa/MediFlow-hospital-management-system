"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Activity,
  CalendarPlus,
  CheckCircle2,
  FlaskConical,
  Pill,
  Stethoscope,
  UserCheck,
} from "lucide-react";
import { staggerContainer, staggerItem } from "../MotionVariants";
import type { TimelineEntry } from "./appointment-detail-mock-data";

interface TimelineTabProps {
  timeline: TimelineEntry[];
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  CalendarPlus,
  UserCheck,
  Stethoscope,
  Activity,
  FlaskConical,
  Pill,
  CheckCircle2,
};

const iconColors: Record<string, string> = {
  CalendarPlus: "text-dash-primary",
  UserCheck: "text-emerald-500",
  Stethoscope: "text-indigo-500",
  Activity: "text-rose-500",
  FlaskConical: "text-purple-500",
  Pill: "text-amber-500",
  CheckCircle2: "text-emerald-500",
};

export function TimelineTab({ timeline }: TimelineTabProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="relative"
    >
      {timeline.map((entry, idx) => {
        const Icon = iconMap[entry.icon] || CheckCircle2;
        const isLast = idx === timeline.length - 1;

        return (
          <motion.div
            key={entry.id}
            variants={staggerItem}
            className="relative flex gap-4"
          >
            {/* Timeline line + icon */}
            <div className="flex flex-col items-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  damping: 15,
                  stiffness: 200,
                  delay: idx * 0.08,
                }}
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2",
                  entry.completed
                    ? "border-emerald-300 bg-emerald-50 dark:border-emerald-700 dark:bg-emerald-900/30"
                    : "border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900",
                )}
              >
                <Icon
                  className={cn(
                    "h-4 w-4",
                    entry.completed
                      ? iconColors[entry.icon] || "text-slate-500"
                      : "text-slate-300 dark:text-slate-600",
                  )}
                />
              </motion.div>
              {!isLast && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "100%" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={cn(
                    "mt-1 w-0.5",
                    entry.completed
                      ? "bg-emerald-200 dark:bg-emerald-800"
                      : "bg-slate-200 dark:bg-slate-700",
                  )}
                />
              )}
            </div>

            {/* Content */}
            <div className="min-w-0 flex-1 pb-6">
              <div
                className={cn(
                  "rounded-lg border bg-white p-3 transition-all",
                  entry.completed
                    ? "border-slate-100 dark:border-slate-800 dark:bg-slate-900/40"
                    : "border-dashed border-slate-200 bg-slate-50/50 dark:border-slate-700 dark:bg-slate-900/20",
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      {entry.action}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                      {entry.description}
                    </p>
                  </div>
                  <span
                    className={cn(
                      "shrink-0 text-[10px]",
                      entry.time === "Pending"
                        ? "text-amber-500"
                        : "text-slate-400",
                    )}
                  >
                    {entry.time}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
