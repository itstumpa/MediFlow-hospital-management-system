"use client";

import {
  cardHover,
  staggerContainer,
  staggerItem,
} from "@/components/dashboard/staff/MotionVariants";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  colorMap,
  notificationStats,
  type NotificationStat,
} from "../_mock-data";

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

/* ─── Stat Card ─────────────────────────────── */

function StatCard({ stat }: { stat: NotificationStat }) {
  const Icon = stat.icon;

  return (
    <motion.div
      variants={staggerItem}
      {...cardHover}
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
          <AnimatedCounter value={stat.value} suffix={stat.suffix} />
        </span>
      </div>
      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
        {stat.label}
      </p>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════
   NotificationStats
   ══════════════════════════════════════════════ */

interface NotificationStatsProps {
  stats?: NotificationStat[];
}

export function NotificationStats({
  stats = notificationStats,
}: NotificationStatsProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6"
    >
      {stats.map((stat) => (
        <StatCard key={stat.id} stat={stat} />
      ))}
    </motion.div>
  );
}
