"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Clock,
  RefreshCw,
  Stethoscope,
  XCircle,
  type LucideIcon,
} from "lucide-react";
import type { PrescriptionStats } from "./types";

/* ─── Stat item config ─── */

interface StatItem {
  label: string;
  value: number;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  darkBg: string;
}

/* ─── Stat card ─── */

function StatCard({ item, index }: { item: StatItem; index: number }) {
  const Icon = item.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        delay: index * 0.06,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="dash-card flex items-center gap-4 p-4"
    >
      <div
        className={cn(
          "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl",
          item.bgColor,
          item.darkBg,
        )}
      >
        <Icon className={cn("h-5 w-5", item.color)} />
      </div>
      <div>
        <p className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
          {item.value}
        </p>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
          {item.label}
        </p>
      </div>
    </motion.div>
  );
}

/* ─── Props ─── */

interface PrescriptionStatsProps {
  stats: PrescriptionStats;
  className?: string;
}

/* ─── Component ─── */

export function PrescriptionStats({
  stats,
  className,
}: PrescriptionStatsProps) {
  const items: StatItem[] = [
    {
      label: "Active Prescriptions",
      value: stats.active,
      icon: CheckCircle2,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      darkBg: "dark:bg-emerald-950/40",
    },
    {
      label: "Completed",
      value: stats.completed,
      icon: Clock,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      darkBg: "dark:bg-blue-950/40",
    },
    {
      label: "Expired",
      value: stats.expired,
      icon: XCircle,
      color: "text-red-500",
      bgColor: "bg-red-50",
      darkBg: "dark:bg-red-950/40",
    },
    {
      label: "Refills Remaining",
      value: stats.refillsRemaining,
      icon: RefreshCw,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      darkBg: "dark:bg-amber-950/40",
    },
    {
      label: "Doctors",
      value: stats.totalDoctors,
      icon: Stethoscope,
      color: "text-violet-600",
      bgColor: "bg-violet-50",
      darkBg: "dark:bg-violet-950/40",
    },
  ];

  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5",
        className,
      )}
    >
      {items.map((item, i) => (
        <StatCard key={item.label} item={item} index={i} />
      ))}
    </div>
  );
}
