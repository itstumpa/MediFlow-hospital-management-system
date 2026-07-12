"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { AnimatedCounter } from "./AnimatedCounter";
import { Sparkline } from "./Sparkline";

export interface StatsCardData {
  icon: LucideIcon;
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  trend: number;
  trendLabel: string;
  sparkline: number[];
  colorClass: string;
  description: string;
}

interface StatsCardProps {
  data: StatsCardData;
  index?: number;
}

const colorMap: Record<string, { bg: string; text: string; glow: string }> = {
  blue: {
    bg: "bg-blue-50 dark:bg-blue-950/30",
    text: "text-blue-600 dark:text-blue-400",
    glow: "group-hover:shadow-blue-500/10",
  },
  emerald: {
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    text: "text-emerald-600 dark:text-emerald-400",
    glow: "group-hover:shadow-emerald-500/10",
  },
  violet: {
    bg: "bg-violet-50 dark:bg-violet-950/30",
    text: "text-violet-600 dark:text-violet-400",
    glow: "group-hover:shadow-violet-500/10",
  },
  amber: {
    bg: "bg-amber-50 dark:bg-amber-950/30",
    text: "text-amber-600 dark:text-amber-400",
    glow: "group-hover:shadow-amber-500/10",
  },
  rose: {
    bg: "bg-rose-50 dark:bg-rose-950/30",
    text: "text-rose-600 dark:text-rose-400",
    glow: "group-hover:shadow-rose-500/10",
  },
  cyan: {
    bg: "bg-cyan-50 dark:bg-cyan-950/30",
    text: "text-cyan-600 dark:text-cyan-400",
    glow: "group-hover:shadow-cyan-500/10",
  },
  orange: {
    bg: "bg-orange-50 dark:bg-orange-950/30",
    text: "text-orange-600 dark:text-orange-400",
    glow: "group-hover:shadow-orange-500/10",
  },
  indigo: {
    bg: "bg-indigo-50 dark:bg-indigo-950/30",
    text: "text-indigo-600 dark:text-indigo-400",
    glow: "group-hover:shadow-indigo-500/10",
  },
};

export function StatsCard({ data, index = 0 }: StatsCardProps) {
  const { icon: Icon, label, value, prefix = "", suffix = "", trend, trendLabel, sparkline, colorClass, description } = data;
  const colors = colorMap[colorClass] ?? colorMap.blue;
  const isPositive = trend >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900",
        "hover:shadow-lg",
      )}
    >
      {/* Glow effect on hover */}
      <div className={cn("pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100", colors.glow)} />

      <div className="relative">
        {/* Top row: icon + trend badge */}
        <div className="flex items-start justify-between">
          <span className={cn("flex h-10 w-10 items-center justify-center rounded-xl", colors.bg)}>
            <Icon className={cn("h-5 w-5", colors.text)} />
          </span>
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
              isPositive
                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400"
                : "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400",
            )}
          >
            <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path
                d={isPositive ? "M6 2.5v7M6 2.5L3 5.5M6 2.5L9 5.5" : "M6 9.5v-7M6 9.5L3 6.5M6 9.5L9 6.5"}
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {Math.abs(trend)}%
          </span>
        </div>

        {/* Value */}
        <div className="mt-3 flex items-baseline gap-1">
          <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {prefix}
            <AnimatedCounter to={value} duration={1.2} decimals={0} />
            {suffix}
          </span>
        </div>

        {/* Label + sparkline row */}
        <div className="mt-1 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
            <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">{trendLabel}</p>
          </div>
          <Sparkline data={sparkline} color={isPositive ? "#16a34a" : "#dc2626"} width={60} height={24} />
        </div>

        {/* Description */}
        {description && (
          <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">{description}</p>
        )}
      </div>
    </motion.div>
  );
}
