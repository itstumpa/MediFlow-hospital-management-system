"use client";

import { staggerContainer, staggerItem } from "@/lib/animations/stagger";
import type { AppointmentStats as AppointmentStatsType } from "@/lib/data/appointment-detail";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
    Activity,
    CalendarCheck,
    Clock,
    DollarSign,
    Timer,
} from "lucide-react";

interface AppointmentStatsProps {
  stats: AppointmentStatsType;
}

const statCards = [
  {
    key: "appointmentDuration",
    label: "Appointment Duration",
    icon: Clock,
    color: "blue" as const,
  },
  {
    key: "waitingTime",
    label: "Waiting Time",
    icon: Timer,
    color: "amber" as const,
  },
  {
    key: "visitCount",
    label: "Visit Count",
    icon: Activity,
    color: "emerald" as const,
  },
  {
    key: "previousAppointments",
    label: "Previous Appointments",
    icon: CalendarCheck,
    color: "violet" as const,
  },
  {
    key: "outstandingBills",
    label: "Outstanding Bills",
    icon: DollarSign,
    color: "rose" as const,
  },
];

const colorMap = {
  blue: {
    bg: "bg-dash-primary-light dark:bg-teal-500/10",
    icon: "text-dash-primary dark:text-accent",
    text: "text-dash-primary dark:text-accent",
  },
  amber: {
    bg: "bg-amber-50 dark:bg-amber-500/10",
    icon: "text-amber-600 dark:text-amber-400",
    text: "text-amber-700 dark:text-amber-300",
  },
  emerald: {
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
    icon: "text-emerald-600 dark:text-emerald-400",
    text: "text-emerald-700 dark:text-emerald-300",
  },
  violet: {
    bg: "bg-violet-50 dark:bg-violet-500/10",
    icon: "text-violet-600 dark:text-violet-400",
    text: "text-violet-700 dark:text-violet-300",
  },
  rose: {
    bg: "bg-rose-50 dark:bg-rose-500/10",
    icon: "text-rose-600 dark:text-rose-400",
    text: "text-rose-700 dark:text-rose-300",
  },
};

export function AppointmentStats({ stats }: AppointmentStatsProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
    >
      {statCards.map((card) => {
        const Icon = card.icon;
        const colors = colorMap[card.color];
        const value = stats[card.key as keyof AppointmentStatsType];
        const displayValue =
          typeof value === "number"
            ? card.key === "outstandingBills"
              ? `$${value}`
              : String(value)
            : String(value);

        return (
          <motion.div
            key={card.key}
            variants={staggerItem}
            whileHover={{ y: -2, transition: { duration: 0.2 } }}
            className={cn(
              "rounded-xl border border-slate-200 p-4 shadow-sm transition-shadow hover:shadow-md dark:border-slate-700",
              colors.bg,
            )}
          >
            <div className="flex items-center justify-between">
              <div
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-lg",
                  colors.bg,
                )}
              >
                <Icon className={cn("h-4.5 w-4.5", colors.icon)} />
              </div>
            </div>
            <p className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">
              {displayValue}
            </p>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              {card.label}
            </p>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
