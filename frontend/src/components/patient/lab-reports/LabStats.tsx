"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Calendar,
  FileText,
  FlaskConical,
  type LucideIcon,
} from "lucide-react";
import type { LabStats as LabStatsType } from "./types";

/* ─── Stat card ─── */

interface StatItem {
  label: string;
  value: number;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  darkBg: string;
  description?: string;
}

function StatCard({ item, index }: { item: StatItem; index: number }) {
  const Icon = item.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.07,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="dash-card group relative overflow-hidden p-5 transition-shadow hover:shadow-md"
    >
      {/* Accent bar */}
      <div
        className={cn(
          "absolute inset-x-0 top-0 h-0.5",
          item.label === "Total Reports"
            ? "bg-[var(--color-primary)]"
            : item.label === "Pending"
              ? "bg-amber-400"
              : item.label === "Completed"
                ? "bg-emerald-400"
                : item.label === "Abnormal Results"
                  ? "bg-red-400"
                  : "bg-blue-400",
        )}
      />

      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
            {item.label}
          </p>
          <div className="flex items-baseline gap-1">
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.1 + index * 0.07,
              }}
              className="text-3xl font-bold text-slate-900 dark:text-white tabular-nums"
            >
              {item.value}
            </motion.span>
            {item.description && (
              <span className="text-xs text-slate-400 dark:text-slate-500">
                {item.description}
              </span>
            )}
          </div>
        </div>
        <div
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors",
            item.bgColor,
            item.darkBg,
            "group-hover:scale-110 transition-transform duration-300",
          )}
        >
          <Icon className={cn("h-5 w-5", item.color)} />
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Props ─── */

interface LabStatsProps {
  stats: LabStatsType;
  className?: string;
}

/* ─── Component ─── */

export function LabStats({ stats, className }: LabStatsProps) {
  const items: StatItem[] = [
    {
      label: "Total Reports",
      value: stats.totalReports,
      icon: FlaskConical,
      color: "text-[var(--color-primary)]",
      bgColor: "bg-[var(--color-primary)]/10",
      darkBg: "dark:bg-[var(--color-accent)]/10",
    },
    {
      label: "Pending",
      value: stats.pending,
      icon: FileText,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      darkBg: "dark:bg-amber-950/40",
    },
    {
      label: "Completed",
      value: stats.completed,
      icon: Calendar,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      darkBg: "dark:bg-emerald-950/40",
    },
    {
      label: "Abnormal Results",
      value: stats.abnormal,
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-50",
      darkBg: "dark:bg-red-950/40",
    },
  ];

  return (
    <div className={cn("grid grid-cols-2 gap-3 sm:grid-cols-4", className)}>
      {items.map((item, i) => (
        <StatCard key={item.label} item={item} index={i} />
      ))}
    </div>
  );
}
