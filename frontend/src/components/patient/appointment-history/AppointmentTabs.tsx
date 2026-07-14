"use client";

import { staggerItem } from "@/components/patient/MotionVariants";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useMemo } from "react";
import type { Appointment, TabOption } from "./types";

interface AppointmentTabsProps {
  activeTab: TabOption;
  onTabChange: (tab: TabOption) => void;
  appointments: Appointment[];
  className?: string;
}

const tabKeys: TabOption[] = ["all", "upcoming", "completed", "cancelled"];

const tabLabels: Record<TabOption, string> = {
  all: "All",
  upcoming: "Upcoming",
  completed: "Completed",
  cancelled: "Cancelled",
};

function getCounts(appointments: Appointment[]): Record<TabOption, number> {
  return {
    all: appointments.length,
    upcoming: appointments.filter(
      (a) =>
        a.status === "upcoming" ||
        a.status === "confirmed" ||
        a.status === "rescheduled",
    ).length,
    completed: appointments.filter((a) => a.status === "completed").length,
    cancelled: appointments.filter((a) => a.status === "cancelled").length,
  };
}

export function AppointmentTabs({
  activeTab,
  onTabChange,
  appointments,
  className,
}: AppointmentTabsProps) {
  const counts = useMemo(() => getCounts(appointments), [appointments]);

  return (
    <motion.div
      variants={staggerItem}
      className={cn(
        "flex items-center gap-1 rounded-2xl border border-slate-200/60 bg-white p-1.5 shadow-sm dark:border-slate-700/40 dark:bg-slate-800/60",
        className,
      )}
    >
      <div className="relative flex w-full">
        {/* Animated active indicator */}
        <motion.div
          layoutId="active-tab-indicator"
          className="absolute inset-y-1.5 rounded-xl bg-[var(--color-primary)] dark:bg-[var(--color-accent)]"
          initial={false}
          animate={{
            left: `${(tabKeys.indexOf(activeTab) / tabKeys.length) * 100}%`,
            width: `${100 / tabKeys.length}%`,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
          }}
          style={{ marginLeft: "1.5px" }}
        />

        {tabKeys.map((key) => {
          const isActive = key === activeTab;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onTabChange(key)}
              className={cn(
                "relative z-10 flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "text-white"
                  : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200",
              )}
            >
              <span>{tabLabels[key]}</span>
              <span
                className={cn(
                  "flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-bold",
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400",
                )}
              >
                {counts[key]}
              </span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
