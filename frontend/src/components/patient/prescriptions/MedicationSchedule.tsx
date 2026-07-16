"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Moon, Sun as SunIcon, Sunrise, Sunset } from "lucide-react";
import type { MedicationSchedule as Schedule } from "./types";

/* ─── Props ─── */

interface MedicationScheduleProps {
  schedule: Schedule;
  className?: string;
}

/* ─── Time period config ─── */

const periods = [
  {
    key: "morning" as const,
    label: "Morning",
    icon: Sunrise,
    color: "text-amber-500",
    bgColor: "bg-amber-50 dark:bg-amber-950/30",
    borderColor: "border-amber-200 dark:border-amber-800/40",
  },
  {
    key: "afternoon" as const,
    label: "Afternoon",
    icon: SunIcon,
    color: "text-orange-500",
    bgColor: "bg-orange-50 dark:bg-orange-950/30",
    borderColor: "border-orange-200 dark:border-orange-800/40",
  },
  {
    key: "evening" as const,
    label: "Evening",
    icon: Sunset,
    color: "text-purple-500",
    bgColor: "bg-purple-50 dark:bg-purple-950/30",
    borderColor: "border-purple-200 dark:border-purple-800/40",
  },
  {
    key: "night" as const,
    label: "Night",
    icon: Moon,
    color: "text-indigo-500",
    bgColor: "bg-indigo-50 dark:bg-indigo-950/30",
    borderColor: "border-indigo-200 dark:border-indigo-800/40",
  },
];

/* ─── Component ─── */

export function MedicationSchedule({
  schedule,
  className,
}: MedicationScheduleProps) {
  const hasAnyDoses = Object.values(schedule).some((doses) => doses.length > 0);

  if (!hasAnyDoses) {
    return (
      <div
        className={cn(
          "rounded-xl border border-dashed border-slate-200 p-6 text-center dark:border-slate-700",
          className,
        )}
      >
        <p className="text-xs text-slate-400 dark:text-slate-500">
          No scheduled doses for this medication.
        </p>
      </div>
    );
  }

  return (
    <div className={cn("space-y-3", className)}>
      {periods.map((period, pi) => {
        const doses = schedule[period.key];
        if (doses.length === 0) return null;

        const Icon = period.icon;

        return (
          <motion.div
            key={period.key}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: pi * 0.08, duration: 0.25 }}
            className={cn(
              "rounded-xl border p-3.5",
              period.bgColor,
              period.borderColor,
            )}
          >
            <div className="flex items-center gap-2 mb-2.5">
              <Icon className={cn("h-4 w-4", period.color)} />
              <span
                className={cn(
                  "text-xs font-bold uppercase tracking-wider",
                  period.color,
                )}
              >
                {period.label}
              </span>
            </div>
            <div className="space-y-2">
              {doses.map((dose, di) => (
                <div key={di} className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    {dose.label}
                  </span>
                  <div className="flex items-center gap-2.5">
                    <span className="text-[11px] text-slate-400 dark:text-slate-500 tabular-nums">
                      {dose.time}
                    </span>
                    <span
                      className={cn(
                        "flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors",
                        dose.taken
                          ? "border-[var(--color-primary)] bg-dash-primary-light dark:border-[var(--color-accent)] dark:bg-teal-950/40"
                          : "border-slate-300 dark:border-slate-600",
                      )}
                    >
                      {dose.taken && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="h-2.5 w-2.5 rounded-full bg-[var(--color-primary)] dark:bg-[var(--color-accent)]"
                        />
                      )}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
