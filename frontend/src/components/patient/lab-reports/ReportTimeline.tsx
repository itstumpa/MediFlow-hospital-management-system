"use client";

import { staggerItem } from "@/components/patient/MotionVariants";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { CalendarDays, Download, Eye, FlaskConical, User } from "lucide-react";
import type { LabReport } from "./types";
import { reportStatusConfig } from "./types";

/* ─── Single timeline entry for one report ─── */

function ReportTimelineEntry({
  report,
  index,
  onView,
  onDownload,
}: {
  report: LabReport;
  index: number;
  onView: (report: LabReport) => void;
  onDownload: (report: LabReport) => void;
}) {
  const statusCfg = reportStatusConfig[report.status];

  return (
    <motion.div
      variants={staggerItem}
      custom={index}
      className="relative flex gap-5 pb-8 last:pb-0"
    >
      {/* Timeline line */}
      {index > 0 && (
        <div className="absolute left-[19px] top-0 bottom-full w-0.5 bg-slate-200 dark:bg-slate-700" />
      )}

      {/* Icon */}
      <div
        className={cn(
          "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
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

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              {report.testName}
            </h3>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
              {report.labId}
            </p>
          </div>
          <span
            className={cn(
              "inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-semibold self-start mt-0.5",
              statusCfg.className,
            )}
          >
            <span
              className={cn("h-1.5 w-1.5 rounded-full", statusCfg.dotColor)}
            />
            {statusCfg.label}
          </span>
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1">
            <User className="h-3 w-3" />
            {report.requestedBy}
          </span>
          <span className="flex items-center gap-1">
            <FlaskConical className="h-3 w-3" />
            {report.department}
          </span>
          <span className="flex items-center gap-1">
            <CalendarDays className="h-3 w-3" />
            {report.collectionDate}
          </span>
        </div>

        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
          {report.resultSummary}
        </p>

        {/* Mini timeline steps */}
        <div className="mt-3 flex items-center gap-2">
          {report.timeline.map((step, si) => (
            <div key={step.name} className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div
                  className={cn(
                    "h-2 w-2 rounded-full",
                    step.completed
                      ? "bg-emerald-400 dark:bg-emerald-500"
                      : "bg-slate-200 dark:bg-slate-600",
                  )}
                />
                <span
                  className={cn(
                    "text-[10px]",
                    step.completed
                      ? "text-slate-500 dark:text-slate-400"
                      : "text-slate-300 dark:text-slate-600",
                  )}
                >
                  {step.label}
                </span>
              </div>
              {si < report.timeline.length - 1 && (
                <div className="h-px w-3 bg-slate-200 dark:bg-slate-700" />
              )}
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-3 flex items-center gap-2">
          <button
            type="button"
            onClick={() => onView(report)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition-all hover:bg-slate-50 active:scale-[0.97] dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700/50"
            aria-label={`View ${report.testName} report`}
          >
            <Eye className="h-3.5 w-3.5" />
            View
          </button>
          {report.status !== "pending" && (
            <button
              type="button"
              onClick={() => onDownload(report)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition-all hover:bg-slate-50 active:scale-[0.97] dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700/50"
              aria-label={`Download ${report.testName} report`}
            >
              <Download className="h-3.5 w-3.5" />
              Download
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Props ─── */

interface ReportTimelineProps {
  reports: LabReport[];
  onView: (report: LabReport) => void;
  onDownload: (report: LabReport) => void;
}

/* ─── Component ─── */

export function ReportTimeline({
  reports,
  onView,
  onDownload,
}: ReportTimelineProps) {
  if (reports.length === 0) return null;

  return (
    <div className="dash-card p-5 md:p-6">
      <div className="relative">
        {reports.map((report, i) => (
          <ReportTimelineEntry
            key={report.id}
            report={report}
            index={i}
            onView={onView}
            onDownload={onDownload}
          />
        ))}
      </div>
    </div>
  );
}
