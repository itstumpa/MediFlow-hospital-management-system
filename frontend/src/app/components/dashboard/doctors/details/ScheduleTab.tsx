"use client";

import { staggerContainer, staggerItem } from "@/lib/animations/stagger";
import type { DayScheduleDetailed, LeaveDate } from "@/lib/data/admin-doctors";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { CalendarOff, Clock, Coffee, LogOut } from "lucide-react";

interface ScheduleTabProps {
  schedule: DayScheduleDetailed[];
  leaveDates: LeaveDate[];
}

function formatTime(time: string): string {
  if (time === "-") return "-";
  const [h, m] = time.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${m.toString().padStart(2, "0")} ${ampm}`;
}

export function ScheduleTab({ schedule, leaveDates }: ScheduleTabProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid gap-5 lg:grid-cols-2"
    >
      {/* Weekly Calendar */}
      <motion.div
        variants={staggerItem}
        className="dash-card overflow-hidden p-5"
      >
        <div className="mb-4 flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400">
            <Clock className="h-4 w-4" />
          </span>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
            Weekly Schedule
          </h3>
        </div>

        <div className="space-y-2">
          {schedule.map((day) => (
            <div
              key={day.day}
              className={cn(
                "flex items-center justify-between rounded-lg px-3 py-2.5 transition-colors",
                day.isWorking
                  ? "bg-slate-50/50 dark:bg-slate-800/30"
                  : "bg-red-50/30 dark:bg-red-950/10",
              )}
            >
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "w-24 text-sm font-medium",
                    day.isWorking
                      ? "text-slate-900 dark:text-white"
                      : "text-slate-400 dark:text-slate-500",
                  )}
                >
                  {day.day}
                </span>
                {day.isWorking ? (
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {formatTime(day.startTime)} &ndash;{" "}
                    {formatTime(day.endTime)}
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-sm text-red-400">
                    <CalendarOff className="h-3.5 w-3.5" />
                    Day Off
                  </span>
                )}
              </div>
              {day.isWorking && (
                <span className="text-xs text-slate-400 dark:text-slate-500">
                  {day.startTime} - {day.endTime}
                </span>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Break Times & Leave Dates */}
      <div className="space-y-5">
        {/* Break Times */}
        <motion.div
          variants={staggerItem}
          className="dash-card overflow-hidden p-5"
        >
          <div className="mb-4 flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400">
              <Coffee className="h-4 w-4" />
            </span>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Break Times
            </h3>
          </div>

          <div className="space-y-2">
            {schedule
              .filter((d) => d.isWorking)
              .map((day) => (
                <div
                  key={day.day}
                  className="flex items-center justify-between rounded-lg bg-slate-50/50 px-3 py-2 dark:bg-slate-800/30"
                >
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {day.day}
                  </span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    {formatTime(day.breakStart)} &ndash;{" "}
                    {formatTime(day.breakEnd)}
                  </span>
                </div>
              ))}
          </div>
        </motion.div>

        {/* Leave Dates */}
        <motion.div
          variants={staggerItem}
          className="dash-card overflow-hidden p-5"
        >
          <div className="mb-4 flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-50 text-rose-600 dark:bg-rose-950/30 dark:text-rose-400">
              <LogOut className="h-4 w-4" />
            </span>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Leave Dates
            </h3>
          </div>

          {leaveDates.length === 0 ? (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              No leave dates scheduled.
            </p>
          ) : (
            <div className="space-y-2">
              {leaveDates.map((leave, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg border border-rose-100 bg-rose-50/30 px-3 py-2.5 dark:border-rose-900/20 dark:bg-rose-950/10"
                >
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      {leave.date}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {leave.reason}
                    </p>
                  </div>
                  <span className="rounded-full bg-rose-100 px-2 py-0.5 text-xs font-medium text-rose-700 dark:bg-rose-900/30 dark:text-rose-400">
                    Leave
                  </span>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
