"use client";

import {
  staggerContainer,
  staggerItem,
} from "@/components/patient/MotionVariants";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Gift } from "lucide-react";
import { useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import type { BookingFormData, Holiday } from "./types";
import { getHolidays, getUnavailableDates } from "./types";

import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";

function CalendarSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="flex items-center justify-between">
        <div className="h-8 w-8 rounded-lg bg-slate-200 dark:bg-slate-700" />
        <div className="h-5 w-40 rounded bg-slate-200 dark:bg-slate-700" />
        <div className="h-8 w-8 rounded-lg bg-slate-200 dark:bg-slate-700" />
      </div>
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="h-4 rounded bg-slate-200 dark:bg-slate-700" />
        ))}
        {Array.from({ length: 35 }).map((_, i) => (
          <div
            key={i}
            className="aspect-square rounded-lg bg-slate-100 dark:bg-slate-800"
          />
        ))}
      </div>
    </div>
  );
}

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function CalendarStep() {
  const [loading] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<BookingFormData>();
  const selectedDate = watch("date");

  const unavailableDates = useMemo(() => getUnavailableDates(), []);
  const holidays = useMemo(() => getHolidays(), []);
  const today = new Date();

  const days = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const calStart = startOfWeek(monthStart, { weekStartsOn: 0 });
    const calEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });
    return eachDayOfInterval({ start: calStart, end: calEnd });
  }, [currentMonth]);

  const isPast = (date: Date) => isBefore(date, today) && !isToday(date);
  const isUnavailable = (date: Date) =>
    unavailableDates.some((d) => isSameDay(d, date));
  const isHoliday = (date: Date) =>
    holidays.find((h) => isSameDay(h.date, date));
  const isSelectable = (date: Date) =>
    isSameMonth(date, currentMonth) && !isPast(date) && !isUnavailable(date);

  const canGoPrev = isAfter(currentMonth, new Date(2024, 0, 1));

  const goToPrevMonth = () => {
    if (canGoPrev) setCurrentMonth((prev) => subMonths(prev, 1));
  };
  const goToNextMonth = () => setCurrentMonth((prev) => addMonths(prev, 1));

  const handleSelectDate = (date: Date) => {
    if (!isSelectable(date)) return;
    setValue("date", date, { shouldValidate: true });
  };

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-5"
    >
      <div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          Select a Date
        </h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Choose your preferred appointment day
        </p>
      </div>

      {loading ? (
        <CalendarSkeleton />
      ) : (
        <>
          {/* Month navigation */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={goToPrevMonth}
              disabled={!canGoPrev}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 disabled:opacity-30 dark:hover:bg-slate-800 dark:text-slate-400"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <h4 className="text-base font-semibold text-slate-900 dark:text-white">
              {format(currentMonth, "MMMM yyyy")}
            </h4>
            <button
              type="button"
              onClick={goToNextMonth}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-400"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Day labels */}
          <div className="grid grid-cols-7 gap-1">
            {DAY_LABELS.map((label) => (
              <div
                key={label}
                className="py-1 text-center text-xs font-semibold text-slate-400 dark:text-slate-500"
              >
                {label}
              </div>
            ))}
          </div>

          {/* Date grid */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((date) => {
              const inMonth = isSameMonth(date, currentMonth);
              const past = isPast(date);
              const unavailable = isUnavailable(date);
              const holiday = isHoliday(date);
              const selectable = isSelectable(date);
              const isSelected = selectedDate && isSameDay(date, selectedDate);

              return (
                <motion.button
                  key={date.toISOString()}
                  variants={staggerItem}
                  type="button"
                  disabled={!selectable}
                  onClick={() => handleSelectDate(date)}
                  className={cn(
                    "relative flex aspect-square items-center justify-center rounded-xl text-sm font-medium transition-all",
                    !inMonth && "text-transparent pointer-events-none",
                    inMonth &&
                      !selectable &&
                      "text-slate-300 dark:text-slate-600 cursor-not-allowed",
                    inMonth &&
                      selectable &&
                      !isSelected &&
                      "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800",
                    isSelected &&
                      "bg-[var(--color-primary)] text-white shadow-md shadow-[var(--color-primary)]/30 dark:bg-[var(--color-accent)] dark:text-slate-900",
                    holiday &&
                      selectable &&
                      !isSelected &&
                      "text-amber-600 dark:text-amber-400",
                  )}
                >
                  <span
                    className={cn(
                      "relative z-10",
                      isToday(date) &&
                        !isSelected &&
                        "font-bold text-[var(--color-primary)] dark:text-[var(--color-accent)]",
                    )}
                  >
                    {format(date, "d")}
                  </span>

                  {/* Today ring */}
                  {isToday(date) && !isSelected && (
                    <span className="absolute inset-1 rounded-xl border-2 border-[var(--color-primary)]/40 dark:border-[var(--color-accent)]/40" />
                  )}

                  {/* Holiday badge */}
                  {holiday && selectable && (
                    <span className="absolute -right-0.5 -top-0.5">
                      <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-amber-400 text-[8px] text-white">
                        <Gift className="h-2 w-2" />
                      </span>
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full border-2 border-[var(--color-primary)]/40 dark:border-[var(--color-accent)]/40" />
              <span>Today</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <span>Holiday</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-slate-200 dark:bg-slate-700" />
              <span>Unavailable</span>
            </div>
          </div>

          {/* Holiday info */}
          {holidays.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {holidays.map((h: Holiday) => (
                <div
                  key={h.label}
                  className="flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs text-amber-700 dark:bg-amber-950/30 dark:text-amber-400"
                >
                  <Gift className="h-3 w-3" />
                  {format(h.date, "MMM d")} — {h.label}
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Error */}
      {errors.date && (
        <p className="text-xs text-red-500">{errors.date.message as string}</p>
      )}
    </motion.div>
  );
}
