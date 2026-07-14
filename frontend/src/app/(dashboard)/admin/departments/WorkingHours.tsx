"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { weekDays } from "./form-mock";
import type { DepartmentFormValues } from "./form-schema";

export function WorkingHours() {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<DepartmentFormValues>();

  const emergencyAvailable = watch("emergencyAvailable");
  const weeklyTimetable = watch("weeklyTimetable");

  const toggleDay = (
    day: string,
    current: { available: boolean; startTime: string; endTime: string },
  ) => {
    setValue(
      `weeklyTimetable.${day}`,
      { ...current, available: !current.available },
      { shouldValidate: true },
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Working Hours
        </h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Operating schedule and availability
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {/* Opening Time */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Opening Time <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="time"
              {...register("openingTime")}
              className={cn(
                "w-full rounded-xl border py-2.5 pl-10 pr-4 text-sm transition-all",
                "focus:outline-none focus:ring-2 focus:ring-dash-primary/20 focus:border-dash-primary",
                errors.openingTime
                  ? "border-red-300 bg-red-50 dark:border-red-500 dark:bg-red-500/10"
                  : "border-slate-200 bg-white dark:border-slate-600 dark:bg-slate-800",
              )}
            />
          </div>
          {errors.openingTime && (
            <p className="text-xs text-red-500" role="alert">
              {errors.openingTime.message}
            </p>
          )}
        </div>

        {/* Closing Time */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Closing Time <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="time"
              {...register("closingTime")}
              className={cn(
                "w-full rounded-xl border py-2.5 pl-10 pr-4 text-sm transition-all",
                "focus:outline-none focus:ring-2 focus:ring-dash-primary/20 focus:border-dash-primary",
                errors.closingTime
                  ? "border-red-300 bg-red-50 dark:border-red-500 dark:bg-red-500/10"
                  : "border-slate-200 bg-white dark:border-slate-600 dark:bg-slate-800",
              )}
            />
          </div>
          {errors.closingTime && (
            <p className="text-xs text-red-500" role="alert">
              {errors.closingTime.message}
            </p>
          )}
        </div>
      </div>

      {/* Emergency Availability */}
      <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-600 dark:bg-slate-800">
        <label className="relative inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            {...register("emergencyAvailable")}
            className="peer sr-only"
          />
          <span className="h-6 w-11 rounded-full bg-slate-200 transition-colors after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow-sm after:transition-all peer-checked:bg-dash-primary peer-checked:after:translate-x-full peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-dash-primary/20" />
        </label>
        <div>
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
            24/7 Emergency Availability
          </p>
          <p className="text-xs text-slate-400">
            Enable if the department provides round-the-clock emergency services
          </p>
        </div>
      </div>

      {/* Weekend Schedule */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Weekend Schedule
        </label>
        <input
          {...register("weekendSchedule")}
          placeholder="e.g., Limited emergency services only"
          className={cn(
            "w-full rounded-xl border px-4 py-2.5 text-sm transition-all",
            "focus:outline-none focus:ring-2 focus:ring-dash-primary/20 focus:border-dash-primary",
            "placeholder:text-slate-400",
            "border-slate-200 bg-white dark:border-slate-600 dark:bg-slate-800",
          )}
        />
      </div>

      {/* Weekly Timetable */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Weekly Timetable
        </label>
        <div className="space-y-2">
          {weekDays.map((day) => {
            const schedule = weeklyTimetable?.[day] || {
              available: true,
              startTime: "09:00",
              endTime: "17:00",
            };
            const isAvailable = schedule.available;

            return (
              <motion.div
                key={day}
                layout
                className={cn(
                  "flex flex-wrap items-center gap-3 rounded-xl border p-3 transition-all",
                  isAvailable
                    ? "border-slate-200 bg-white dark:border-slate-600 dark:bg-slate-800"
                    : "border-slate-100 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50",
                )}
              >
                {/* Toggle */}
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={isAvailable}
                    onChange={() => toggleDay(day, schedule)}
                    className="peer sr-only"
                  />
                  <span className="h-5 w-9 rounded-full bg-slate-200 transition-colors after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:bg-white after:shadow-sm after:transition-all peer-checked:bg-dash-primary peer-checked:after:translate-x-full" />
                </label>

                {/* Day name */}
                <span
                  className={cn(
                    "w-24 text-sm font-medium",
                    isAvailable
                      ? "text-slate-700 dark:text-slate-300"
                      : "text-slate-400 dark:text-slate-500",
                  )}
                >
                  {day}
                </span>

                {/* Time inputs */}
                {isAvailable && (
                  <div className="flex items-center gap-2">
                    <input
                      type="time"
                      value={schedule.startTime}
                      onChange={(e) =>
                        setValue(
                          `weeklyTimetable.${day}.startTime`,
                          e.target.value,
                          { shouldValidate: true },
                        )
                      }
                      className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-dash-primary/20 dark:border-slate-600 dark:bg-slate-700"
                    />
                    <span className="text-xs text-slate-400">to</span>
                    <input
                      type="time"
                      value={schedule.endTime}
                      onChange={(e) =>
                        setValue(
                          `weeklyTimetable.${day}.endTime`,
                          e.target.value,
                          { shouldValidate: true },
                        )
                      }
                      className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-dash-primary/20 dark:border-slate-600 dark:bg-slate-700"
                    />
                  </div>
                )}

                {!isAvailable && (
                  <span className="text-xs text-slate-400">Closed</span>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
