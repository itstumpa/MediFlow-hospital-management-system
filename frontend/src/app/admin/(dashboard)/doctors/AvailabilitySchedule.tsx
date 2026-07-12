"use client";

import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { useFormContext } from "react-hook-form";
import type { DoctorFormValues } from "./form-schema";
import { staggerItem } from "@/lib/animations/stagger";
import { cn } from "@/lib/utils";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export function AvailabilitySchedule() {
  const { setValue, watch } = useFormContext<DoctorFormValues>();
  const availability = watch("availability");

  const toggleDay = (day: string) => {
    const current = availability?.[day];
    if (current) {
      setValue(`availability.${day}.available`, !current.available, {
        shouldDirty: true,
      });
    }
  };

  const updateTime = (day: string, field: "startTime" | "endTime", value: string) => {
    setValue(`availability.${day}.${field}`, value, { shouldDirty: true });
  };

  return (
    <motion.div variants={staggerItem} className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400">
          <Clock className="h-4 w-4" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-slate-900 dark:text-white">
            Availability Schedule
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Weekly working hours
          </p>
        </div>
      </div>

      {/* Schedule Grid */}
      <div className="space-y-2">
        {DAYS.map((day, index) => {
          const dayData = availability?.[day] || {
            available: true,
            startTime: "09:00",
            endTime: "17:00",
          };

          return (
            <motion.div
              key={day}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                "flex items-center gap-3 rounded-lg border p-3 transition-all",
                dayData.available
                  ? "border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800/50"
                  : "border-slate-100 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/20"
              )}
            >
              {/* Toggle */}
              <button
                type="button"
                role="switch"
                aria-checked={dayData.available}
                aria-label={`${day} availability`}
                onClick={() => toggleDay(day)}
                className={cn(
                  "relative inline-flex h-6 w-10 shrink-0 items-center rounded-full transition-all",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500",
                  dayData.available
                    ? "bg-blue-500"
                    : "bg-slate-200 dark:bg-slate-700"
                )}
              >
                <motion.span
                  layout
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className={cn(
                    "inline-block h-4 w-4 rounded-full bg-white shadow-sm",
                    dayData.available ? "translate-x-5" : "translate-x-1"
                  )}
                />
              </button>

              {/* Day Label */}
              <span
                className={cn(
                  "w-24 text-sm font-medium",
                  dayData.available
                    ? "text-slate-700 dark:text-slate-300"
                    : "text-slate-400 dark:text-slate-500"
                )}
              >
                {day.slice(0, 3)}
              </span>

              {/* Time Pickers */}
              <div className="flex items-center gap-2">
                <input
                  type="time"
                  value={dayData.startTime}
                  onChange={(e) => updateTime(day, "startTime", e.target.value)}
                  disabled={!dayData.available}
                  className={cn(
                    "rounded-lg border bg-white px-2.5 py-1.5 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 dark:bg-slate-800 dark:text-white",
                    dayData.available
                      ? "border-slate-300 dark:border-slate-600"
                      : "border-slate-200 text-slate-300 dark:border-slate-700 dark:text-slate-600"
                  )}
                  aria-label={`${day} start time`}
                />
                <span
                  className={cn(
                    "text-sm",
                    dayData.available
                      ? "text-slate-400"
                      : "text-slate-300 dark:text-slate-600"
                  )}
                >
                  to
                </span>
                <input
                  type="time"
                  value={dayData.endTime}
                  onChange={(e) => updateTime(day, "endTime", e.target.value)}
                  disabled={!dayData.available}
                  className={cn(
                    "rounded-lg border bg-white px-2.5 py-1.5 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 dark:bg-slate-800 dark:text-white",
                    dayData.available
                      ? "border-slate-300 dark:border-slate-600"
                      : "border-slate-200 text-slate-300 dark:border-slate-700 dark:text-slate-600"
                  )}
                  aria-label={`${day} end time`}
                />
              </div>

              {/* Status indicator */}
              <div className="ml-auto">
                <span
                  className={cn(
                    "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                    dayData.available
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                      : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                  )}
                >
                  {dayData.available ? "Available" : "Unavailable"}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
