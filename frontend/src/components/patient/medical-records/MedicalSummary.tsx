"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  FileText,
  Pill,
  Scissors,
  Stethoscope,
  Syringe,
  type LucideIcon,
} from "lucide-react";
import type { MedicalStats } from "./types";

/* ─── Stat card ─── */

interface StatItem {
  label: string;
  value: number;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  darkBg: string;
}

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

/* ─── Stats row ─── */

interface MedicalSummaryProps {
  stats: MedicalStats;
  className?: string;
}

export function MedicalSummary({ stats, className }: MedicalSummaryProps) {
  const items: StatItem[] = [
    {
      label: "Medical Records",
      value: stats.totalRecords,
      icon: FileText,
      color: "text-[var(--color-primary)]",
      bgColor: "bg-[var(--color-primary)]/10",
      darkBg: "dark:bg-[var(--color-accent)]/10",
    },
    {
      label: "Diagnoses",
      value: stats.diagnoses,
      icon: Stethoscope,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      darkBg: "dark:bg-blue-950/40",
    },
    {
      label: "Treatments",
      value: stats.treatments,
      icon: Pill,
      color: "text-dash-primary",
      bgColor: "bg-dash-primary-light",
      darkBg: "dark:bg-teal-950/40",
    },
    {
      label: "Surgeries",
      value: stats.surgeries,
      icon: Scissors,
      color: "text-rose-600",
      bgColor: "bg-rose-50",
      darkBg: "dark:bg-rose-950/40",
    },
    {
      label: "Vaccinations",
      value: stats.vaccinations,
      icon: Syringe,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      darkBg: "dark:bg-amber-950/40",
    },
    {
      label: "Allergies",
      value: stats.allergies,
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-50",
      darkBg: "dark:bg-red-950/40",
    },
  ];

  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6",
        className,
      )}
    >
      {items.map((item, i) => (
        <StatCard key={item.label} item={item} index={i} />
      ))}
    </div>
  );
}
