"use client";

import { staggerItem } from "@/components/patient/MotionVariants";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { CalendarDays, Download, Eye, FlaskConical, User } from "lucide-react";
import type { LabReport } from "./types";
import { reportStatusConfig } from "./types";

/* ─── Props ─── */

interface ReportCardProps {
  report: LabReport;
  onView: (report: LabReport) => void;
  onDownload: (report: LabReport) => void;
  index?: number;
}

/* ─── Component ─── */

export function ReportCard({
  report,
  onView,
  onDownload,
  index = 0,
}: ReportCardProps) {
  const statusCfg = reportStatusConfig[report.status];

  return (
    <motion.div
      variants={staggerItem}
      custom={index}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="dash-card group relative overflow-hidden p-5 transition-all duration-300 hover:shadow-lg"
    >
      {/* Status glow indicator */}
      <div
        className={cn(
          "absolute right-0 top-0 h-16 w-16 translate-x-6 -translate-y-6 rounded-full opacity-20 blur-2xl transition-opacity group-hover:opacity-30",
          report.status === "completed"
            ? "bg-emerald-400"
            : report.status === "abnormal"
              ? "bg-red-400"
              : report.status === "processing"
                ? "bg-blue-400"
                : "bg-amber-400",
        )}
      />

      <div className="relative">
        {/* Top row: Icon + Status */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
                report.status === "completed"
                  ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400"
                  : report.status === "abnormal"
                    ? "bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400"
                    : report.status === "processing"
                      ? "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400"
                      : "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400",
              )}
            >
              <FlaskConical className="h-5 w-5" strokeWidth={1.8} />
            </div>
            <div className="min-w-0">
              <h3 className="text-base font-semibold text-slate-900 dark:text-white truncate max-w-[200px] sm:max-w-[300px]">
                {report.testName}
              </h3>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                {report.labId}
              </p>
            </div>
          </div>
          <span
            className={cn(
              "inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-semibold",
              statusCfg.className,
            )}
          >
            <span
              className={cn("h-1.5 w-1.5 rounded-full", statusCfg.dotColor)}
            />
            {statusCfg.label}
          </span>
        </div>

        {/* Info grid */}
        <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
            <User className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{report.requestedBy}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
            <FlaskConical className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{report.department}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
            <CalendarDays className="h-3.5 w-3.5 shrink-0" />
            <span>{report.collectionDate}</span>
          </div>
          {report.reportDate && (
            <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
              <CalendarDays className="h-3.5 w-3.5 shrink-0" />
              <span>{report.reportDate}</span>
            </div>
          )}
        </div>

        {/* Result summary */}
        <p className="mt-3 text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
          {report.resultSummary}
        </p>

        {/* Actions */}
        <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-4 dark:border-slate-700/40">
          <button
            type="button"
            onClick={() => onView(report)}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition-all hover:bg-slate-50 hover:shadow-sm active:scale-[0.97] dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700/50"
            aria-label={`View ${report.testName} report`}
          >
            <Eye className="h-3.5 w-3.5" />
            View Report
          </button>
          {report.status !== "pending" && (
            <button
              type="button"
              onClick={() => onDownload(report)}
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition-all hover:bg-slate-50 hover:shadow-sm active:scale-[0.97] dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700/50"
              aria-label={`Download ${report.testName} report`}
            >
              <Download className="h-3.5 w-3.5" />
              Download PDF
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
