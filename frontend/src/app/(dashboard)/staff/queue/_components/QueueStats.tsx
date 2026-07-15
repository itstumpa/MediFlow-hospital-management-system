"use client";

import {
  cardHover,
  staggerContainer,
  staggerItem,
} from "@/components/dashboard/staff/MotionVariants";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { queueStats, type QueueStat } from "../_mock-data";

/* ─── Animated Counter ──────────────────────── */

function AnimatedCounter({
  value,
  suffix,
}: {
  value: number;
  suffix?: string;
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

  return (
    <>
      {count.toLocaleString()}
      {suffix ?? ""}
    </>
  );
}

/* ─── Color map ─────────────────────────────── */

const colorMap: Record<string, string> = {
  emerald:
    "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400",
  blue: "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400",
  violet:
    "bg-violet-50 text-violet-600 dark:bg-violet-950/40 dark:text-violet-400",
  rose: "bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400",
  amber: "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400",
  cyan: "bg-cyan-50 text-cyan-600 dark:bg-cyan-950/40 dark:text-cyan-400",
};

/* ─── Stat Card ─────────────────────────────── */

function StatCard({ stat, index }: { stat: QueueStat; index: number }) {
  const Icon = stat.icon;

  return (
    <motion.div
      variants={staggerItem}
      {...cardHover}
      className={cn(
        "dash-card dash-card-hover p-4 sm:p-5",
        index === 0 && "card-glow gradient-primary",
      )}
    >
      <div className="flex items-start justify-between">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${
            colorMap[stat.color] ?? colorMap.emerald
          }`}
        >
          <Icon className="h-5 w-5" />
        </div>
        <span
          className={`inline-flex items-center gap-0.5 text-xs font-medium ${
            stat.trend === "up"
              ? "text-emerald-600 dark:text-emerald-400"
              : stat.trend === "down"
                ? "text-red-600 dark:text-red-400"
                : "text-slate-400 dark:text-slate-500"
          }`}
        >
          {stat.trend === "up" ? "↑" : stat.trend === "down" ? "↓" : "→"}
          {Math.abs(stat.change)}%
        </span>
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          <AnimatedCounter
            value={stat.value}
            suffix={"suffix" in stat ? (stat as any).suffix : undefined}
          />
        </span>
      </div>
      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
        {stat.label}
      </p>
      <p className="mt-0.5 text-[10px] text-slate-400 dark:text-slate-500">
        {stat.changeLabel}
      </p>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════
   QueueStats
   ══════════════════════════════════════════════ */

interface QueueStatsProps {
  stats?: QueueStat[];
}

export function QueueStats({ stats }: QueueStatsProps) {
  const items = stats ?? queueStats;

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6"
    >
      {queueStats.map((stat, index) => (
        <StatCard key={stat.id} stat={stat} index={index} />
      ))}
    </motion.div>
  );
}
