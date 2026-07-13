"use client";

import type { ActivityEntry } from "@/lib/data/appointment-detail";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ActivityTabProps {
  activity: ActivityEntry[];
}

const activityIcons: Record<string, string> = {
  created: "bg-dash-primary",
  confirmed: "bg-indigo-500",
  "checked-in": "bg-amber-500",
  started: "bg-violet-500",
  completed: "bg-emerald-500",
  payment: "bg-green-500",
  cancelled: "bg-red-500",
};

const activityDotColors: Record<string, string> = {
  created: "border-dash-primary",
  confirmed: "border-indigo-500",
  "checked-in": "border-amber-500",
  started: "border-violet-500",
  completed: "border-emerald-500",
  payment: "border-green-500",
  cancelled: "border-red-500",
};

export function ActivityTab({ activity }: ActivityTabProps) {
  if (activity.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white py-16 dark:border-slate-700 dark:bg-slate-800">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          No activity recorded for this appointment.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <h3 className="mb-6 text-sm font-semibold text-slate-900 dark:text-white">
        Activity Timeline
      </h3>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[11px] top-2 h-[calc(100%-16px)] w-0.5 bg-slate-200 dark:bg-slate-700" />

        <div className="space-y-6">
          {activity.map((entry, i) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08, duration: 0.3 }}
              className="relative flex gap-4"
            >
              {/* Timeline dot */}
              <div className="relative z-10 flex-shrink-0">
                <div
                  className={cn(
                    "h-6 w-6 rounded-full border-2 bg-white dark:bg-slate-800",
                    activityDotColors[entry.type] || "border-slate-400",
                  )}
                >
                  <div
                    className={cn(
                      "mx-auto mt-1.5 h-2 w-2 rounded-full",
                      activityIcons[entry.type] || "bg-slate-400",
                    )}
                  />
                </div>
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {entry.action}
                  </p>
                  <span className="shrink-0 text-xs text-slate-400 dark:text-slate-500">
                    {entry.timestamp}
                  </span>
                </div>
                <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
                  {entry.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
