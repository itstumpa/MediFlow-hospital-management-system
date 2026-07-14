"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  CalendarCheck,
  Clock,
  Play,
  RefreshCw,
  User,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import type { ScheduleItem } from "./mock-data";
import { todaySchedule } from "./mock-data";
import { staggerContainer, staggerItem } from "./MotionVariants";

const statusConfig: Record<
  ScheduleItem["status"],
  { label: string; color: string; dot: string; icon: typeof Clock }
> = {
  upcoming: {
    label: "Upcoming",
    color: "bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400",
    dot: "bg-blue-500",
    icon: Clock,
  },
  "in-progress": {
    label: "In Progress",
    color:
      "bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400",
    dot: "bg-amber-500",
    icon: Play,
  },
  completed: {
    label: "Completed",
    color:
      "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400",
    dot: "bg-emerald-500",
    icon: CalendarCheck,
  },
  cancelled: {
    label: "Cancelled",
    color: "bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400",
    dot: "bg-red-500",
    icon: XCircle,
  },
};

function ScheduleTimelineItem({
  item,
  index,
}: {
  item: ScheduleItem;
  index: number;
}) {
  const config = statusConfig[item.status];
  const StatusIcon = config.icon;
  const isLast = index === todaySchedule.length - 1;

  return (
    <motion.div variants={staggerItem} className="relative flex gap-4">
      {/* Timeline line */}
      <div className="flex flex-col items-center">
        <div
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
            item.status === "completed"
              ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400"
              : item.status === "cancelled"
                ? "bg-red-100 text-red-500 dark:bg-red-900/40 dark:text-red-400"
                : "bg-dash-primary-light text-dash-primary dark:bg-teal-950/40 dark:text-accent",
          )}
        >
          <StatusIcon className="h-4 w-4" />
        </div>
        {!isLast && (
          <div className="mt-1 h-full w-px bg-slate-200 dark:bg-slate-700" />
        )}
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1 pb-6">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-slate-900 dark:text-white">
                {item.patient}
              </span>
              <span className="text-xs text-slate-400 dark:text-slate-500">
                ({item.age} yrs)
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {item.reason}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              {item.time}
            </span>
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium",
                config.color,
              )}
            >
              <span className={cn("h-1.5 w-1.5 rounded-full", config.dot)} />
              {config.label}
            </span>
          </div>
        </div>

        <div className="mt-2 flex items-center gap-3 text-xs text-slate-400 dark:text-slate-500">
          <span className="inline-flex items-center gap-1">
            <User className="h-3 w-3" />
            {item.patientId}
          </span>
          <span>{item.room}</span>
        </div>

        {/* Actions */}
        <div className="mt-2 flex gap-2">
          <Link
            href={`/doctor/appointments/${item.patientId}`}
            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1 text-[11px] font-medium text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
          >
            View
          </Link>
          {item.status === "upcoming" && (
            <>
              <button className="inline-flex items-center gap-1 rounded-lg bg-dash-primary px-2.5 py-1 text-[11px] font-medium text-white transition-colors hover:bg-dash-primary-dark">
                <Play className="h-3 w-3" />
                Start
              </button>
              <button className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1 text-[11px] font-medium text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800">
                <RefreshCw className="h-3 w-3" />
                Reschedule
              </button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function TodaySchedule() {
  return (
    <div
      className={cn(
        "rounded-xl border border-slate-200/60 bg-white p-5",
        "dark:border-slate-700/40 dark:bg-slate-900/60",
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-semibold text-slate-900 dark:text-white">
          Today's Schedule
        </h2>
        <span className="text-xs text-slate-400 dark:text-slate-500">
          {
            todaySchedule.filter(
              (s) => s.status !== "completed" && s.status !== "cancelled",
            ).length
          }{" "}
          remaining
        </span>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {todaySchedule.length === 0 ? (
          <p className="py-6 text-center text-sm text-slate-500 dark:text-slate-400">
            No appointments scheduled for today.
          </p>
        ) : (
          todaySchedule.map((item, idx) => (
            <ScheduleTimelineItem key={item.id} item={item} index={idx} />
          ))
        )}
      </motion.div>
    </div>
  );
}
