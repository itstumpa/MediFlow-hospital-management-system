"use client";

import {
  cardHover,
  staggerContainer,
  staggerItem,
} from "@/components/dashboard/staff/MotionVariants";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts";
import { dashboardStats, type StatData } from "../_mock-data";

/* ─── Animated Counter ──────────────────────── */

function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  formatter,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  formatter?: (v: number) => string;
}) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) {
      setCount(value);
      return;
    }
    hasAnimated.current = true;

    const duration = 1200;
    const start = performance.now();

    function animate(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }, [value]);

  const display = formatter
    ? formatter(count)
    : value >= 1000
      ? count.toLocaleString()
      : count.toString();

  return (
    <span>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

/* ─── Mini Sparkline ────────────────────────── */

function Sparkline({
  data,
  color,
}: {
  data: { value: number }[];
  color: string;
}) {
  const strokeMap: Record<string, string> = {
    emerald: "#10b981",
    blue: "#3b82f6",
    amber: "#f59e0b",
    violet: "#8b5cf6",
    rose: "#f43f5e",
    cyan: "#06b6d4",
  };

  const fillMap: Record<string, string> = {
    emerald: "rgba(16,185,129,0.08)",
    blue: "rgba(59,130,246,0.08)",
    amber: "rgba(245,158,11,0.08)",
    violet: "rgba(139,92,246,0.08)",
    rose: "rgba(244,63,94,0.08)",
    cyan: "rgba(6,182,212,0.08)",
  };

  const stroke = strokeMap[color] || strokeMap.emerald;
  const fill = fillMap[color] || fillMap.emerald;

  return (
    <div className="h-12 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient
              id={`sparkline-fill-${color}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor={fill} />
              <stop offset="100%" stopColor={fill} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Tooltip
            content={({ active, payload }) =>
              active && payload?.length ? (
                <div className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium shadow-sm dark:border-slate-700 dark:bg-slate-800">
                  {payload[0].value}
                </div>
              ) : null
            }
            cursor={false}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke={stroke}
            strokeWidth={2}
            fill={`url(#sparkline-fill-${color})`}
            dot={false}
            activeDot={{ r: 3, stroke, strokeWidth: 1, fill: "#fff" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ─── Stat Card ─────────────────────────────── */

function StatCard({ stat }: { stat: StatData }) {
  const colorMap: Record<string, string> = {
    emerald:
      "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400",
    blue: "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400",
    amber:
      "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400",
    violet:
      "bg-violet-50 text-violet-600 dark:bg-violet-950/40 dark:text-violet-400",
    rose: "bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400",
    cyan: "bg-cyan-50 text-cyan-600 dark:bg-cyan-950/40 dark:text-cyan-400",
  };

  const trendColorMap: Record<string, string> = {
    up: "text-emerald-600 dark:text-emerald-400",
    down: "text-red-600 dark:text-red-400",
    neutral: "text-slate-500 dark:text-slate-400",
  };

  const Icon = stat.icon;

  return (
    <motion.div
      variants={staggerItem}
      {...cardHover}
      className="dash-card dash-card-hover flex flex-col overflow-hidden"
    >
      <div className="flex items-start justify-between p-5 pb-0">
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-2xl",
            colorMap[stat.color],
          )}
        >
          <Icon className="h-5 w-5" strokeWidth={1.8} />
        </div>
        <span className={cn("text-xs font-medium", trendColorMap[stat.trend])}>
          {stat.trend === "up" ? "↑" : stat.trend === "down" ? "↓" : "–"}{" "}
          {stat.change}%
        </span>
      </div>

      <div className="px-5 pt-3">
        <div className="text-3xl font-bold text-slate-900 dark:text-white">
          <AnimatedCounter
            value={stat.value}
            prefix={stat.prefix}
            formatter={
              stat.id === "revenue" ? (v) => v.toLocaleString() : undefined
            }
          />
        </div>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          {stat.label}
        </p>
      </div>

      <div className="mt-auto px-2 pb-2">
        <Sparkline data={stat.chartData} color={stat.color} />
      </div>
    </motion.div>
  );
}

/* ─── Statistics Cards Grid ─────────────────── */

export function StatisticsCards() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
    >
      {dashboardStats.map((stat) => (
        <StatCard key={stat.id} stat={stat} />
      ))}
    </motion.div>
  );
}
