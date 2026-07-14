"use client";

import {
  staggerContainer,
  staggerItem,
} from "@/components/patient/MotionVariants";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import type { NotificationStats } from "./types";

interface NotificationStatsProps {
  stats: NotificationStats;
}

const statCards = [
  {
    key: "total",
    label: "Total",
    icon: "📬",
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950/40",
  },
  {
    key: "unread",
    label: "Unread",
    icon: "🔴",
    color: "text-red-600 dark:text-red-400",
    bg: "bg-red-50 dark:bg-red-950/40",
  },
  {
    key: "appointments",
    label: "Appointments",
    icon: "📅",
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950/40",
  },
  {
    key: "prescriptions",
    label: "Prescriptions",
    icon: "💊",
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-950/40",
  },
  {
    key: "labReports",
    label: "Lab Reports",
    icon: "🧪",
    color: "text-violet-600 dark:text-violet-400",
    bg: "bg-violet-50 dark:bg-violet-950/40",
  },
  {
    key: "announcements",
    label: "Announcements",
    icon: "📢",
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-950/40",
  },
] as const;

export function NotificationStats({ stats }: NotificationStatsProps) {
  const statValues = {
    total: stats.total,
    unread: stats.unread,
    appointments: stats.appointments,
    prescriptions: stats.prescriptions,
    labReports: stats.labReports,
    announcements: stats.announcements,
  };

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
    >
      {statCards.map((card, index) => {
        const value = statValues[card.key as keyof typeof statValues];
        return (
          <motion.div
            key={card.key}
            variants={staggerItem}
            className={cn(
              "relative overflow-hidden rounded-2xl border p-5 transition-all duration-300",
              "bg-white dark:bg-slate-800/60",
              "hover:shadow-lg hover:-translate-y-0.5",
              "dash-card-hover",
            )}
            style={{ "--index": index } as CSSProperties}
          >
            {/* Accent bar */}
            <div
              className={cn(
                "absolute left-0 top-0 h-full w-1",
                card.bg.replace("bg-", "bg-").replace("dark:bg-", "dark:bg-"),
              )}
            />
            <div className="relative flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {card.label}
                </p>
                <motion.span
                  className={cn(
                    "mt-1 block text-3xl font-bold tabular-nums",
                    card.color,
                  )}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.05,
                    duration: 0.6,
                    ease: "easeOut",
                  }}
                >
                  {value}
                </motion.span>
              </div>
              <div
                className={cn(
                  "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl",
                  card.bg,
                )}
              >
                <span className="text-2xl" aria-hidden="true">
                  {card.icon}
                </span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
