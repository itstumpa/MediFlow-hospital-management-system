"use client";

import { staggerItem } from "@/components/patient/MotionVariants";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  CalendarCheck,
  ClipboardList,
  Stethoscope,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import type { RecordDetailData } from "./types";
import { riskLevelConfig } from "./types";

/* ─── Summary card ─── */

function SummaryCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-white p-4 dark:border-slate-700/40 dark:bg-slate-800/60">
      <div
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
          color,
        )}
      >
        <Icon className="h-4.5 w-4.5" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
          {label}
        </p>
        <p className="mt-0.5 text-sm font-semibold text-slate-800 dark:text-slate-200">
          {value}
        </p>
      </div>
    </div>
  );
}

/* ─── Props ─── */

interface QuickSummaryProps {
  data: RecordDetailData;
  className?: string;
}

export function QuickSummary({ data, className }: QuickSummaryProps) {
  const { record, diagnosis } = data;
  const RiskIcon = riskLevelConfig[diagnosis.riskLevel].icon;

  return (
    <motion.div
      variants={staggerItem}
      className={cn(
        "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5",
        className,
      )}
    >
      <SummaryCard
        icon={ClipboardList}
        label="Diagnosis"
        value={record.diagnosis}
        color="bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400"
      />
      <SummaryCard
        icon={TrendingUp}
        label="Severity"
        value={diagnosis.severity}
        color="bg-violet-50 text-violet-600 dark:bg-violet-950/40 dark:text-violet-400"
      />
      <SummaryCard
        icon={RiskIcon}
        label="Risk Level"
        value={riskLevelConfig[diagnosis.riskLevel].label}
        color={cn(
          "bg-orange-50 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400",
          diagnosis.riskLevel === "low" &&
            "bg-dash-primary-light text-dash-primary dark:bg-teal-950/40 dark:text-[var(--color-accent)]",
          diagnosis.riskLevel === "high" &&
            "bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400",
          diagnosis.riskLevel === "critical" &&
            "bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400",
        )}
      />
      <SummaryCard
        icon={Stethoscope}
        label="Treatment Status"
        value={
          record.status === "completed"
            ? "Completed"
            : record.status === "ongoing"
              ? "In Progress"
              : record.status === "scheduled"
                ? "Scheduled"
                : "Referred"
        }
        color="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400"
      />
      <SummaryCard
        icon={CalendarCheck}
        label={
          diagnosis.followUpRequired ? "Follow-up Required" : "No Follow-up"
        }
        value={
          diagnosis.followUpDate
            ? `Due: ${diagnosis.followUpDate}`
            : "Not needed"
        }
        color={
          diagnosis.followUpRequired
            ? "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400"
            : "bg-slate-50 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
        }
      />
    </motion.div>
  );
}
