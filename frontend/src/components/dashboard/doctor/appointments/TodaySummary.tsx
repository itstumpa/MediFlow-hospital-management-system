"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  Hourglass,
} from "lucide-react";
import type { TodaySummary } from "./appointments-mock-data";

interface TodaySummaryProps {
  summary: TodaySummary;
}

export function TodaySummary({ summary }: TodaySummaryProps) {
  const items = [
    {
      icon: Calendar,
      label: "Total Appointments",
      value: summary.total,
      color: "text-dash-primary",
      bg: "bg-dash-primary-light dark:bg-teal-950/30",
    },
    {
      icon: CheckCircle2,
      label: "Completed",
      value: summary.completed,
      color: "text-emerald-500",
      bg: "bg-emerald-50 dark:bg-emerald-950/30",
    },
    {
      icon: Hourglass,
      label: "Remaining",
      value: summary.remaining,
      color: "text-amber-500",
      bg: "bg-amber-50 dark:bg-amber-950/30",
    },
    {
      icon: AlertCircle,
      label: "Cancelled",
      value: summary.cancelled,
      color: "text-red-500",
      bg: "bg-red-50 dark:bg-red-950/30",
    },
    {
      icon: AlertCircle,
      label: "No Show",
      value: summary.noShow,
      color: "text-slate-500",
      bg: "bg-slate-50 dark:bg-slate-800",
    },
  ];

  return (
    <div
      className={cn(
        "rounded-xl border border-slate-200/60 bg-white p-5",
        "dark:border-slate-700/40 dark:bg-slate-900/60",
      )}
    >
      <h2 className="mb-4 text-base font-semibold text-slate-900 dark:text-white">
        Today&apos;s Summary
      </h2>

      {/* Completion ring */}
      <div className="mb-4 flex items-center justify-center">
        <div className="relative flex h-24 w-24 items-center justify-center">
          <svg className="h-24 w-24 -rotate-90" viewBox="0 0 96 96">
            <circle
              cx="48"
              cy="48"
              r="42"
              fill="none"
              stroke="currentColor"
              strokeWidth="6"
              className="text-slate-100 dark:text-slate-800"
            />
            <motion.circle
              cx="48"
              cy="48"
              r="42"
              fill="none"
              stroke="currentColor"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 42}`}
              initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
              animate={{
                strokeDashoffset:
                  2 * Math.PI * 42 * (1 - summary.completionRate / 100),
              }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="text-dash-primary"
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-xl font-bold text-slate-900 dark:text-white">
              {summary.completionRate}%
            </span>
            <span className="text-[10px] text-slate-400">Complete</span>
          </div>
        </div>
      </div>

      {/* Stats list */}
      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between rounded-lg p-2.5 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/20"
          >
            <div className="flex items-center gap-2.5">
              <div
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-lg",
                  item.bg,
                )}
              >
                <item.icon className={cn("h-3.5 w-3.5", item.color)} />
              </div>
              <span className="text-xs text-slate-600 dark:text-slate-400">
                {item.label}
              </span>
            </div>
            <span className="text-sm font-semibold text-slate-900 dark:text-white">
              {item.value}
            </span>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="my-4 border-t border-slate-100 dark:border-slate-800" />

      {/* Next appointment */}
      <div>
        <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Next Appointment
        </p>
        {summary.nextAppointment ? (
          <div className="flex items-center gap-2.5 rounded-lg bg-dash-primary-light p-3 dark:bg-teal-950/30">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-dash-primary-light dark:bg-teal-950/40">
              <Clock className="h-3.5 w-3.5 text-dash-primary dark:text-accent" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                {summary.nextAppointment.patient}
              </p>
              <p className="text-xs text-dash-primary dark:text-accent">
                {summary.nextAppointment.time}
              </p>
            </div>
            <ChevronRight className="ml-auto h-4 w-4 text-dash-primary" />
          </div>
        ) : (
          <p className="text-xs text-slate-400 dark:text-slate-500">
            No upcoming appointments
          </p>
        )}
      </div>

      {/* Working hours */}
      <div className="mt-3">
        <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Working Hours
        </p>
        <div className="flex items-center gap-2.5 rounded-lg bg-slate-50 p-3 dark:bg-slate-800/40">
          <Clock className="h-4 w-4 text-slate-400" />
          <span className="text-sm font-medium text-slate-900 dark:text-white">
            {summary.workingHours.start} — {summary.workingHours.end}
          </span>
        </div>
      </div>
    </div>
  );
}
