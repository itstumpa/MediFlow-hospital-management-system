"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  getMonthDays,
  isToday,
  isSameDay,
  formatMonthYear,
} from "@/lib/data/appointment-calendar";

interface MiniCalendarProps {
  currentDate: Date;
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  onMonthChange: (date: Date) => void;
}

const dayLabels = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export function MiniCalendar({
  currentDate,
  selectedDate,
  onDateSelect,
  onMonthChange,
}: MiniCalendarProps) {
  const days = useMemo(() => getMonthDays(currentDate), [currentDate]);

  const handlePrev = () => {
    const d = new Date(currentDate);
    d.setMonth(d.getMonth() - 1);
    onMonthChange(d);
  };

  const handleNext = () => {
    const d = new Date(currentDate);
    d.setMonth(d.getMonth() + 1);
    onMonthChange(d);
  };

  return (
    <div className="dash-card p-4">
      {/* Mini Calendar Header */}
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
          {formatMonthYear(currentDate)}
        </h3>
        <div className="flex items-center gap-1">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handlePrev}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 focus-visible:outline-2 focus-visible:outline-offset-[-1px] focus-visible:outline-dash-primary dark:hover:bg-slate-700 dark:hover:text-slate-300"
            aria-label="Previous month"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleNext}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 focus-visible:outline-2 focus-visible:outline-offset-[-1px] focus-visible:outline-dash-primary dark:hover:bg-slate-700 dark:hover:text-slate-300"
            aria-label="Next month"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </motion.button>
        </div>
      </div>

      {/* Day Labels */}
      <div className="mb-1 grid grid-cols-7 gap-0.5">
        {dayLabels.map((label) => (
          <div
            key={label}
            className="flex h-7 items-center justify-center text-[11px] font-medium text-slate-400 dark:text-slate-500"
          >
            {label}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-0.5">
        {days.map((day, idx) => {
          if (!day) {
            return <div key={`empty-${idx}`} className="h-7" />;
          }

          const isSelected = isSameDay(day, selectedDate);
          const today = isToday(day);
          const isCurrentMonth = day.getMonth() === currentDate.getMonth();

          return (
            <motion.button
              key={day.toISOString()}
              whileTap={{ scale: 0.9 }}
              onClick={() => onDateSelect(day)}
              className={cn(
                "relative flex h-7 items-center justify-center rounded-lg text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-1px] focus-visible:outline-dash-primary",
                !isCurrentMonth && "text-slate-300 dark:text-slate-600",
                isCurrentMonth &&
                  !isSelected &&
                  !today &&
                  "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700",
                today &&
                  !isSelected &&
                  "bg-dash-primary-light text-dash-primary dark:bg-dash-primary/20 dark:text-dash-primary-light",
                isSelected &&
                  "bg-dash-primary text-white shadow-sm hover:bg-dash-primary-dark",
              )}
              aria-label={day.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
              aria-selected={isSelected}
            >
              {day.getDate()}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
