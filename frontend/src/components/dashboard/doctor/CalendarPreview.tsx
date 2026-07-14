"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import { calendarPreview, type CalendarEvent } from "./mock-data";
import { staggerContainer, staggerItem } from "./MotionVariants";

const typeStyles: Record<
  CalendarEvent["type"],
  { bg: string; dot: string; label: string }
> = {
  appointment: {
    bg: "bg-dash-primary-light text-dash-primary-dark dark:bg-teal-950/40 dark:text-accent",
    dot: "bg-dash-primary",
    label: "Appointments",
  },
  available: {
    bg: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    dot: "bg-emerald-500",
    label: "Available",
  },
  busy: {
    bg: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
    dot: "bg-rose-500",
    label: "Busy",
  },
  vacation: {
    bg: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    dot: "bg-amber-500",
    label: "Vacation",
  },
};

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function CalendarPreview() {
  // Build a map of events by date
  const eventMap = useMemo(() => {
    const map = new Map<number, CalendarEvent>();
    calendarPreview.forEach((ev) => map.set(ev.date, ev));
    return map;
  }, []);

  // Calculate the first day of the current month
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const currentDate = today.getDate();

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div
      className={cn(
        "rounded-xl border border-slate-200/60 bg-white p-5",
        "dark:border-slate-700/40 dark:bg-slate-900/60",
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-semibold text-slate-900 dark:text-white">
          Calendar Preview
        </h2>
        <Link
          href="/doctor/schedule"
          className="inline-flex items-center gap-0.5 text-xs font-medium text-dash-primary transition-colors hover:text-dash-primary-dark dark:text-accent dark:hover:text-accent"
        >
          Full schedule
          <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Legend */}
      <div className="mb-3 flex flex-wrap gap-3">
        {(Object.keys(typeStyles) as CalendarEvent["type"][]).map((key) => {
          const s = typeStyles[key];
          return (
            <span
              key={key}
              className="inline-flex items-center gap-1.5 text-[10px] font-medium text-slate-500 dark:text-slate-400"
            >
              <span className={cn("h-2 w-2 rounded-full", s.dot)} />
              {s.label}
            </span>
          );
        })}
      </div>

      {/* Day headers */}
      <div className="mb-1 grid grid-cols-7 text-center text-[10px] font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
        {DAYS.map((d) => (
          <div key={d} className="py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-7 text-center"
      >
        {cells.map((date, idx) => {
          if (date === null) {
            return <div key={`empty-${idx}`} className="p-1" />;
          }

          const event = eventMap.get(date);
          const isToday = date === currentDate;

          return (
            <motion.div
              key={date}
              variants={staggerItem}
              className={cn(
                "relative mx-auto flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium transition-colors",
                isToday
                  ? "bg-dash-primary text-white shadow-sm shadow-dash-primary-light dark:shadow-dash-primary-light/30"
                  : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800",
              )}
            >
              {date}
              {event && !isToday && (
                <span
                  className={cn(
                    "absolute -bottom-0.5 h-1 w-1 rounded-full",
                    typeStyles[event.type].dot,
                  )}
                />
              )}
              {event && isToday && (
                <span className="absolute -bottom-0.5 h-1 w-1 rounded-full bg-white/70" />
              )}
            </motion.div>
          );
        })}
      </motion.div>

      {/* Today's events summary */}
      {eventMap.has(currentDate) && (
        <div className="mt-3 rounded-lg bg-slate-50 p-2.5 dark:bg-slate-800/40">
          <p className="text-[11px] font-medium text-slate-700 dark:text-slate-300">
            Today&apos;s Events
          </p>
          {calendarPreview
            .filter((ev) => ev.date === currentDate)
            .map((ev) => (
              <div
                key={ev.date}
                className="mt-1 flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400"
              >
                <span
                  className={cn(
                    "h-1.5 w-1.5 rounded-full",
                    typeStyles[ev.type].dot,
                  )}
                />
                <span className="capitalize">{ev.type}</span>
                {ev.count && (
                  <>
                    <span>•</span>
                    <span>{ev.count} appointments</span>
                  </>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
