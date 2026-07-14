"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  staggerContainer,
  staggerItem,
} from "@/components/dashboard/staff/MotionVariants";
import { appointmentStats, type AppointmentStat } from "../_mock-data";

/* ─── Animated Counter ──────────────────────── */

function AnimatedCounter({
  value,
  formatter,
}: {
  value: number;
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

  return <>{formatter ? formatter(count) : count.toLocaleString()}</>;
}

/* ─── Stat Card ─────────────────────────────── */

const colorMap: Record<string, string> = {
  emerald: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400",
  blue: "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400",
  violet: "bg-violet-50 text-violet-600 dark:bg-violet-950/40 dark:text-violet-400",
  rose: "bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400",
  amber: "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400",
  cyan: "bg-cyan-50 text-cyan-600 dark:bg-cyan-950/40 dark:text-cyan-400",
};

function StatCard({ stat, index }: { stat: AppointmentStat; index: number }) {
  const Icon = stat.icon;

  return (
    <motion.div
      variants={staggerItem}
      className="dash-card dash-card-hover p-4 sm:p-5"
    >
      <div className="flex items-start justify-between">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${
            colorMap[stat.color] ?? colorMap.emerald
          }`}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-2xl font-bold text-slate-900 dark:text-white">
          <AnimatedCounter value={stat.value} />
        </span>
        <span
          className={`inline-flex items-center gap-0.5 text-xs font-medium ${
            stat.trend === "up"
              ? "text-emerald-600 dark:text-emerald-400"
              : stat.trend === "down"
                ? "text-red-500 dark:text-red-400"
                : "text-slate-400"
          }`}
        >
          {stat.trend === "up" && "↑"}
          {stat.trend === "down" && "↓"}
          {stat.trend === "neutral" && "–"}
          {Math.abs(stat.change)}%
        </span>
      </div>
      <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
        {stat.changeLabel}
      </p>
      <p className="mt-1 text-sm font-medium text-slate-700 dark:text-slate-300">
        {stat.label}
      </p>
    </motion.div>
  );
}

/* ─── Grid ──────────────────────────────────── */

export function AppointmentStats() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
    >
      {appointmentStats.map((stat, i) => (
        <StatCard key={stat.id} stat={stat} index={i} />
      ))}
    </motion.div>
  );
}
