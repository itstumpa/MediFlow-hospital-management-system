"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  CalendarCheck,
  HeartPulse,
  Minus,
  RefreshCw,
  TrendingDown,
  TrendingUp,
  UserPlus,
  Users,
} from "lucide-react";
import { staggerContainer, staggerItem } from "../MotionVariants";
import type { PatientStat } from "./patients-mock-data";

interface PatientStatsProps {
  stats: PatientStat[];
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Users,
  CalendarCheck,
  UserPlus,
  RefreshCw,
  HeartPulse,
};

const trendIcons: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  up: TrendingUp,
  down: TrendingDown,
  neutral: Minus,
};

const trendColors: Record<string, string> = {
  up: "text-emerald-500",
  down: "text-rose-500",
  neutral: "text-slate-400",
};

export function PatientStats({ stats }: PatientStatsProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5"
    >
      {stats.map((stat) => {
        const Icon = iconMap[stat.icon] || Users;
        const TrendIcon = trendIcons[stat.trend];
        return (
          <motion.div
            key={stat.id}
            variants={staggerItem}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className={cn(
              "relative overflow-hidden rounded-xl border border-slate-200/60 bg-white p-4 transition-all",
              "hover:shadow-lg hover:shadow-slate-900/5",
              "dark:border-slate-700/40 dark:bg-slate-900/60",
            )}
          >
            <div className="flex items-start justify-between">
              <div
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br",
                  stat.color,
                  "shadow-sm",
                )}
              >
                <Icon className="h-4 w-4 text-white" />
              </div>
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium",
                  "bg-slate-100 dark:bg-slate-800",
                  trendColors[stat.trend],
                )}
              >
                <TrendIcon className="h-3 w-3" />
                {stat.trendValue}
              </span>
            </div>
            <p className="mt-3 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              {stat.value.toLocaleString()}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {stat.label}
            </p>

            {/* Decorative gradient bar */}
            <div
              className={cn(
                "absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r",
                stat.color,
                "opacity-60",
              )}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
}
