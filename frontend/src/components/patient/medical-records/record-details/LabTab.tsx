"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  AlertCircle,
  CalendarDays,
  CheckCircle2,
  Microscope,
  XCircle,
} from "lucide-react";
import type { LabResultData, RecordDetailData } from "./types";
import { labStatusConfig } from "./types";

/* ─── Lab result row ─── */

function LabResultRow({ lab, index }: { lab: LabResultData; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.25,
        delay: index * 0.03,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={cn(
        "rounded-xl border bg-white p-4 transition-all hover:border-slate-200 hover:shadow-sm dark:border-slate-700/40 dark:bg-slate-800/60 dark:hover:border-slate-600/50",
        lab.flagged
          ? "border-l-4 border-l-amber-400 dark:border-l-amber-500"
          : "border-l-4 border-l-emerald-400 dark:border-l-emerald-500",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              {lab.testName}
            </h4>
            {lab.flagged && (
              <AlertCircle
                className="h-3.5 w-3.5 shrink-0 text-amber-500"
                aria-label="Abnormal result"
              />
            )}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {lab.category}
          </p>
        </div>
        <span
          className={cn(
            "inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold",
            labStatusConfig[lab.status].className,
          )}
        >
          {lab.status === "completed" && (
            <CheckCircle2 className="mr-1 h-3 w-3" />
          )}
          {lab.status === "pending" && <AlertCircle className="mr-1 h-3 w-3" />}
          {lab.status === "cancelled" && <XCircle className="mr-1 h-3 w-3" />}
          {labStatusConfig[lab.status].label}
        </span>
      </div>

      {/* Result */}
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Result
          </p>
          <p
            className={cn(
              "text-sm font-semibold",
              lab.flagged
                ? "text-amber-700 dark:text-amber-400"
                : "text-slate-800 dark:text-slate-200",
            )}
          >
            {lab.result}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Reference Range
          </p>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
            {lab.referenceRange}
          </p>
        </div>
      </div>

      {/* Notes + Date */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        {lab.notes && (
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {lab.notes}
          </p>
        )}
        <span className="flex items-center gap-1 text-[11px] text-slate-400 dark:text-slate-500">
          <CalendarDays className="h-3 w-3" />
          {lab.date}
        </span>
      </div>
    </motion.div>
  );
}

/* ─── Empty state ─── */

function EmptyLabs() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-50 dark:bg-slate-700/50">
        <Microscope className="h-6 w-6 text-slate-300 dark:text-slate-500" />
      </div>
      <p className="mt-4 text-sm font-medium text-slate-600 dark:text-slate-300">
        No lab results
      </p>
      <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
        No laboratory tests were ordered for this visit.
      </p>
    </div>
  );
}

/* ─── Props ─── */

interface LabTabProps {
  data: RecordDetailData;
  className?: string;
}

export function LabTab({ data, className }: LabTabProps) {
  const { labResults } = data;

  if (labResults.length === 0) {
    return <EmptyLabs />;
  }

  return (
    <div className={cn("space-y-3", className)}>
      <div className="mb-1 flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
        <span>
          {labResults.length} test{labResults.length !== 1 ? "s" : ""}
        </span>
        <span className="flex items-center gap-1">
          <AlertCircle className="h-3 w-3 text-amber-500" />
          {labResults.filter((l) => l.flagged).length} flagged
        </span>
      </div>
      {labResults.map((lab, i) => (
        <LabResultRow key={lab.id} lab={lab} index={i} />
      ))}
    </div>
  );
}
