"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  CalendarCheck,
  ClipboardCheck,
  Clock,
  HeartPulse,
  Pill,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import { statisticsCards } from "./mock-data";
import { staggerContainer, staggerItem } from "./MotionVariants";

const iconMap: Record<string, LucideIcon> = {
  CalendarCheck,
  Users,
  ClipboardCheck,
  Pill,
  Clock,
  HeartPulse,
};

const colorMap: Record<
  string,
  { bg: string; dot: string; text: string; spark: string }
> = {
  cyan: {
    bg: "bg-dash-primary-light dark:bg-teal-950/30",
    dot: "bg-dash-primary",
    text: "text-dash-primary dark:text-accent",
    spark: "#0e7c7b",
  },
  amber: {
    bg: "bg-amber-50 dark:bg-amber-950/30",
    dot: "bg-amber-500",
    text: "text-amber-600 dark:text-amber-400",
    spark: "#f59e0b",
  },
  emerald: {
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    dot: "bg-emerald-500",
    text: "text-emerald-600 dark:text-emerald-400",
    spark: "#10b981",
  },
  rose: {
    bg: "bg-rose-50 dark:bg-rose-950/30",
    dot: "bg-rose-500",
    text: "text-rose-600 dark:text-rose-400",
    spark: "#f43f5e",
  },
  violet: {
    bg: "bg-violet-50 dark:bg-violet-950/30",
    dot: "bg-violet-500",
    text: "text-violet-600 dark:text-violet-400",
    spark: "#8b5cf6",
  },
  blue: {
    bg: "bg-blue-50 dark:bg-blue-950/30",
    dot: "bg-blue-500",
    text: "text-blue-600 dark:text-blue-400",
    spark: "#3b82f6",
  },
};

/** Inline mini sparkline using a simple SVG polyline */
function MiniSparkline({
  data,
  color,
  trend,
}: {
  data: number[];
  color: string;
  trend: number;
}) {
  const w = 64;
  const h = 28;
  const max = Math.max(...data, 1);
  const min = Math.min(...data, 0);
  const range = max - min || 1;
  const points = data
    .map(
      (val, i) =>
        `${((i / (data.length - 1)) * w).toFixed(0)},${(
          h -
          ((val - min) / range) * h
        ).toFixed(0)}`,
    )
    .join(" ");
  const isUp = trend >= 0;

  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      className="shrink-0"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`grad-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
        className={cn("origin-left", isUp ? "scale-x-100" : "scale-x-100")}
      />
    </svg>
  );
}

export function StatisticsCards() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6"
    >
      {statisticsCards.map((stat) => {
        const Icon = iconMap[stat.icon] || HeartPulse;
        const colors = colorMap[stat.color] || colorMap.cyan;
        const isUp = stat.trend >= 0;

        return (
          <motion.div
            key={stat.id}
            variants={staggerItem}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className={cn(
              "group relative overflow-hidden rounded-xl border border-slate-200/60 bg-white p-4 transition-shadow duration-200",
              "hover:shadow-lg hover:shadow-slate-900/5",
              "dark:border-slate-700/40 dark:bg-slate-900/60",
            )}
          >
            {/* Icon */}
            <div
              className={cn(
                "mb-3 flex h-8 w-8 items-center justify-center rounded-lg transition-transform duration-200 group-hover:scale-110",
                colors.bg,
              )}
            >
              <Icon className={cn("h-4 w-4", colors.text)} />
            </div>

            {/* Value */}
            <div className="flex items-baseline gap-1">
              {stat.prefix && (
                <span className="text-sm text-slate-400 dark:text-slate-500">
                  {stat.prefix}
                </span>
              )}
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                {stat.label === "Available Hours"
                  ? stat.value.toFixed(1)
                  : stat.value.toLocaleString()}
              </span>
              {stat.suffix && (
                <span className="text-sm text-slate-400 dark:text-slate-500">
                  {stat.suffix}
                </span>
              )}
            </div>

            {/* Label */}
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              {stat.label}
            </p>

            {/* Trend + Sparkline */}
            <div className="mt-2 flex items-center justify-between">
              <div
                className={cn(
                  "inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-medium",
                  isUp
                    ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400"
                    : "bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400",
                )}
              >
                {isUp ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                <span>
                  {isUp ? "+" : ""}
                  {stat.trend}%
                </span>
              </div>
              <MiniSparkline
                data={stat.sparkline}
                color={colors.spark}
                trend={stat.trend}
              />
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
