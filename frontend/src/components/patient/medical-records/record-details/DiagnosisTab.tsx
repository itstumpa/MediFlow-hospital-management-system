"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  CalendarCheck,
  ClipboardList,
  Code,
  Stethoscope,
  ThumbsUp,
} from "lucide-react";
import type { RecordDetailData } from "./types";
import { riskLevelConfig } from "./types";

/* ─── Info row ─── */

function InfoRow({
  icon,
  label,
  value,
  className,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-xl border border-slate-100 bg-white p-4 dark:border-slate-700/40 dark:bg-slate-800/60",
        className,
      )}
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-50 dark:bg-slate-700">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
          {label}
        </p>
        <div className="mt-0.5 text-sm font-semibold text-slate-800 dark:text-slate-200">
          {value}
        </div>
      </div>
    </div>
  );
}

/* ─── Props ─── */

interface DiagnosisTabProps {
  data: RecordDetailData;
  className?: string;
}

export function DiagnosisTab({ data, className }: DiagnosisTabProps) {
  const { diagnosis } = data;
  const RiskIcon = riskLevelConfig[diagnosis.riskLevel].icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={cn("space-y-4", className)}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <InfoRow
          icon={<ClipboardList className="h-4 w-4 text-blue-500" />}
          label="Primary Diagnosis"
          value={diagnosis.primaryDiagnosis}
        />
        <InfoRow
          icon={<Stethoscope className="h-4 w-4 text-violet-500" />}
          label="Severity"
          value={diagnosis.severity}
        />
      </div>

      {diagnosis.secondaryDiagnosis && (
        <InfoRow
          icon={<ClipboardList className="h-4 w-4 text-amber-500" />}
          label="Secondary Diagnosis"
          value={diagnosis.secondaryDiagnosis}
        />
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <InfoRow
          icon={<Code className="h-4 w-4 text-emerald-500" />}
          label="ICD-10 Code"
          value={
            <span className="font-mono tracking-wider">
              {diagnosis.icdCode}
            </span>
          }
        />
        <InfoRow
          icon={
            <RiskIcon
              className={cn(
                "h-4 w-4",
                riskLevelConfig[diagnosis.riskLevel].icon === AlertTriangle
                  ? "text-red-500"
                  : "text-emerald-500",
              )}
            />
          }
          label="Risk Level"
          value={
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold",
                riskLevelConfig[diagnosis.riskLevel].className,
              )}
            >
              <RiskIcon className="h-3 w-3" />
              {riskLevelConfig[diagnosis.riskLevel].label}
            </span>
          }
        />
        <InfoRow
          icon={<CalendarCheck className="h-4 w-4 text-indigo-500" />}
          label="Follow-up Required"
          value={
            diagnosis.followUpRequired
              ? diagnosis.followUpDate
                ? `Yes — ${diagnosis.followUpDate}`
                : "Yes"
              : "No"
          }
        />
      </div>

      {/* Recommendation */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        className="rounded-xl border border-blue-100 bg-blue-50/50 p-5 dark:border-blue-900/30 dark:bg-blue-950/20"
      >
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/40">
            <ThumbsUp className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-sm font-bold text-blue-800 dark:text-blue-300">
              Doctor&apos;s Recommendation
            </p>
            <p className="mt-1 text-sm leading-relaxed text-blue-700 dark:text-blue-200">
              {diagnosis.doctorRecommendation}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
