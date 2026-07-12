"use client";

import { motion } from "framer-motion";
import {
  Activity,
  CalendarSync,
  Pencil,
  PlusCircle,
  ToggleLeft,
  ArrowLeftRight,
} from "lucide-react";
import type { ActivityLog } from "@/lib/data/admin-doctors";
import { staggerContainer, staggerItem } from "@/lib/animations/stagger";
import { cn, timeAgo } from "@/lib/utils";
import { EmptyState } from "./EmptyState";

interface ActivityTabProps {
  activity: ActivityLog[];
}

const activityIcons: Record<string, typeof PlusCircle> = {
  created: PlusCircle,
  updated: Pencil,
  changed: ArrowLeftRight,
  status: ToggleLeft,
  schedule: CalendarSync,
};

const activityColors: Record<string, string> = {
  created:
    "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400 ring-emerald-200 dark:ring-emerald-800",
  updated:
    "bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400 ring-blue-200 dark:ring-blue-800",
  changed:
    "bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400 ring-amber-200 dark:ring-amber-800",
  status:
    "bg-violet-50 text-violet-600 dark:bg-violet-950/30 dark:text-violet-400 ring-violet-200 dark:ring-violet-800",
  schedule:
    "bg-cyan-50 text-cyan-600 dark:bg-cyan-950/30 dark:text-cyan-400 ring-cyan-200 dark:ring-cyan-800",
};

export function ActivityTab({ activity }: ActivityTabProps) {
  if (activity.length === 0) {
    return (
      <EmptyState
        icon={Activity}
        title="No Activity"
        description="No activity has been recorded for this doctor yet."
      />
    );
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="dash-card overflow-hidden p-5"
    >
      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[17px] top-2 bottom-2 w-0.5 bg-slate-100 dark:bg-slate-700" />

        <div className="space-y-0">
          {activity.map((log, i) => {
            const Icon =
              activityIcons[log.type] ?? activityIcons.updated;
            const colorClass =
              activityColors[log.type] ?? activityColors.updated;
            const isLast = i === activity.length - 1;

            return (
              <motion.div
                key={log.id}
                variants={staggerItem}
                className="relative flex gap-4 pb-6 last:pb-0"
              >
                {/* Icon */}
                <div
                  className={cn(
                    "relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ring-4 ring-white dark:ring-slate-900",
                    colorClass,
                  )}
                >
                  <Icon className="h-4 w-4" />
                </div>

                {/* Content */}
                <div className="flex-1 pt-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">
                        {log.action}
                      </p>
                      <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                        {log.description}
                      </p>
                    </div>
                    <span className="shrink-0 whitespace-nowrap text-xs text-slate-400 dark:text-slate-500">
                      {timeAgo(log.timestamp)}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}


