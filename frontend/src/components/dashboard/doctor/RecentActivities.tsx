"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  CalendarCheck,
  Clock,
  FileText,
  FlaskConical,
  LogIn,
  UserRoundPlus,
} from "lucide-react";
import type { ActivityItem } from "./mock-data";
import { recentActivities } from "./mock-data";
import { staggerContainer, staggerItem } from "./MotionVariants";

const typeConfig: Record<
  ActivityItem["type"],
  { icon: typeof Clock; color: string; bg: string }
> = {
  prescription: {
    icon: FileText,
    color: "text-rose-500",
    bg: "bg-rose-50 dark:bg-rose-950/30",
  },
  appointment: {
    icon: CalendarCheck,
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-950/30",
  },
  "check-in": {
    icon: LogIn,
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
  },
  record: {
    icon: UserRoundPlus,
    color: "text-violet-500",
    bg: "bg-violet-50 dark:bg-violet-950/30",
  },
  lab: {
    icon: FlaskConical,
    color: "text-amber-500",
    bg: "bg-amber-50 dark:bg-amber-950/30",
  },
};

export function RecentActivities() {
  return (
    <div
      className={cn(
        "rounded-xl border border-slate-200/60 bg-white p-5",
        "dark:border-slate-700/40 dark:bg-slate-900/60",
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-semibold text-slate-900 dark:text-white">
          Recent Activities
        </h2>
        <span className="flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
          <Clock className="h-3 w-3" />
          Live
        </span>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="space-y-0"
      >
        {recentActivities.length === 0 ? (
          <p className="py-6 text-center text-sm text-slate-500 dark:text-slate-400">
            No recent activities.
          </p>
        ) : (
          recentActivities.map((act, idx) => {
            const config = typeConfig[act.type];
            const Icon = config.icon;
            const isLast = idx === recentActivities.length - 1;

            return (
              <motion.div
                key={act.id}
                variants={staggerItem}
                className="relative flex gap-3"
              >
                {/* Timeline line */}
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "flex h-7 w-7 items-center justify-center rounded-full",
                      config.bg,
                    )}
                  >
                    <Icon className={cn("h-3.5 w-3.5", config.color)} />
                  </div>
                  {!isLast && (
                    <div className="h-full w-px bg-slate-100 dark:bg-slate-800" />
                  )}
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1 pb-4">
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                    {act.action}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {act.patient}
                  </p>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500">
                    {act.time}
                  </span>
                </div>
              </motion.div>
            );
          })
        )}
      </motion.div>
    </div>
  );
}
