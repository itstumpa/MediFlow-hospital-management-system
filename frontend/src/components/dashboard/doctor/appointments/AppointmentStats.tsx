"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  CalendarCheck,
  ClipboardCheck,
  Stethoscope,
  UserRound,
  UserX,
  XCircle,
} from "lucide-react";
import { staggerContainer, staggerItem } from "../MotionVariants";
import {
  appointmentStats,
  type AppointmentStatColor,
} from "./appointments-mock-data";

const iconMap: Record<string, LucideIcon> = {
  CalendarCheck,
  UserRound,
  Stethoscope,
  ClipboardCheck,
  XCircle,
  UserX,
};

const colorMap: Record<AppointmentStatColor, { bg: string; text: string }> = {
  cyan: {
    bg: "bg-dash-primary-light dark:bg-teal-950/30",
    text: "text-dash-primary dark:text-accent",
  },
  amber: {
    bg: "bg-amber-50 dark:bg-amber-950/30",
    text: "text-amber-600 dark:text-amber-400",
  },
  indigo: {
    bg: "bg-indigo-50 dark:bg-indigo-950/30",
    text: "text-indigo-600 dark:text-indigo-400",
  },
  emerald: {
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    text: "text-emerald-600 dark:text-emerald-400",
  },
  red: {
    bg: "bg-red-50 dark:bg-red-950/30",
    text: "text-red-600 dark:text-red-400",
  },
  slate: {
    bg: "bg-slate-50 dark:bg-slate-800",
    text: "text-slate-600 dark:text-slate-400",
  },
};

export function AppointmentStats() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-3 gap-3 sm:grid-cols-6"
    >
      {appointmentStats.map((stat) => {
        const Icon = iconMap[stat.icon] || CalendarCheck;
        const colors =
          colorMap[stat.color as AppointmentStatColor] || colorMap.cyan;

        return (
          <motion.div
            key={stat.id}
            variants={staggerItem}
            whileHover={{
              y: -3,
              scale: 1.02,
              transition: { duration: 0.2 },
            }}
            className={cn(
              "group relative overflow-hidden rounded-xl border border-slate-200/60 bg-white p-3.5 transition-all duration-200",
              "hover:shadow-lg hover:shadow-slate-900/5",
              "dark:border-slate-700/40 dark:bg-slate-900/60",
            )}
          >
            <div className="flex items-center justify-between">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-lg transition-transform duration-200 group-hover:scale-110",
                  colors.bg,
                )}
              >
                <Icon className={cn("h-4 w-4", colors.text)} />
              </div>
            </div>
            <p className="mt-2 text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              {stat.value}
            </p>
            <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
              {stat.label}
            </p>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
