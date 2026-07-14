"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Ban, CalendarCheck, CalendarPlus, Clock, Plane } from "lucide-react";
import { staggerContainer, staggerItem } from "../MotionVariants";
import { scheduleStatsData } from "./schedule-mock-data";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Clock,
  CalendarCheck,
  CalendarPlus,
  Ban,
  Plane,
};

const colorMap: Record<string, { bg: string; text: string }> = {
  "from-emerald-500 to-green-500": {
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    text: "text-emerald-600 dark:text-emerald-400",
  },
  "from-dash-primary to-dash-primary-dark": {
    bg: "bg-dash-primary-light dark:bg-dash-primary-light",
    text: "text-dash-primary dark:text-accent",
  },
  "from-amber-500 to-orange-500": {
    bg: "bg-amber-50 dark:bg-amber-950/30",
    text: "text-amber-600 dark:text-amber-400",
  },
  "from-rose-500 to-red-500": {
    bg: "bg-rose-50 dark:bg-rose-950/30",
    text: "text-rose-600 dark:text-rose-400",
  },
  "from-indigo-500 to-purple-500": {
    bg: "bg-indigo-50 dark:bg-indigo-950/30",
    text: "text-indigo-600 dark:text-indigo-400",
  },
};

export function ScheduleStats() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5"
    >
      {scheduleStatsData.map((stat) => {
        const Icon = iconMap[stat.icon] || Clock;
        const colors =
          colorMap[stat.color] ||
          colorMap["from-dash-primary to-dash-primary-dark"];

        return (
          <motion.div
            key={stat.id}
            variants={staggerItem}
            whileHover={{ y: -3, scale: 1.02, transition: { duration: 0.2 } }}
            className={cn(
              "group relative overflow-hidden rounded-xl border border-slate-200/60 bg-white p-4 transition-all duration-200",
              "hover:shadow-lg hover:shadow-slate-900/5",
              "dark:border-slate-700/40 dark:bg-slate-900/60",
            )}
          >
            <div className="flex items-center justify-between">
              <div
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-lg transition-transform duration-200 group-hover:scale-110",
                  colors.bg,
                )}
              >
                <Icon className={cn("h-4 w-4", colors.text)} />
              </div>
              {stat.trend && (
                <span
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium",
                    "bg-slate-100 dark:bg-slate-800",
                    stat.trend === "up" && "text-emerald-500",
                    stat.trend === "down" && "text-rose-500",
                    stat.trend === "neutral" && "text-slate-400",
                  )}
                >
                  {stat.trendValue}
                </span>
              )}
            </div>
            <p className="mt-3 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              {typeof stat.value === "number"
                ? stat.value.toLocaleString()
                : stat.value}
              {stat.suffix && (
                <span className="ml-0.5 text-sm font-normal text-slate-400">
                  {stat.suffix}
                </span>
              )}
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
