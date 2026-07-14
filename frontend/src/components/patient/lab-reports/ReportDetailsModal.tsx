"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Download, FlaskConical, Printer, Share2, User, X } from "lucide-react";
import { useEffect, useRef } from "react";
import type { LabReport } from "./types";
import { reportStatusConfig, resultFlagConfig } from "./types";

/* ─── Props ─── */

interface ReportDetailsModalProps {
  report: LabReport | null;
  onClose: () => void;
  onDownload: (report: LabReport) => void;
  onPrint: (report: LabReport) => void;
  onShare: (report: LabReport) => void;
}

/* ─── Component ─── */

export function ReportDetailsModal({
  report,
  onClose,
  onDownload,
  onPrint,
  onShare,
}: ReportDetailsModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (report) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [report, onClose]);

  // Focus trap
  useEffect(() => {
    if (report) {
      dialogRef.current?.focus();
    }
  }, [report]);

  if (!report) return null;

  const statusCfg = reportStatusConfig[report.status];

  return (
    <AnimatePresence>
      {report && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Dialog */}
          <motion.div
            key="dialog"
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={`Report details for ${report.testName}`}
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl dark:bg-slate-800"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-slate-200 bg-white/80 px-6 py-4 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-800/80">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    {report.testName}
                  </h2>
                  <span
                    className={cn(
                      "inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold",
                      statusCfg.className,
                    )}
                  >
                    <span
                      className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        statusCfg.dotColor,
                      )}
                    />
                    {statusCfg.label}
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">
                  {report.labId}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-300"
                aria-label="Close modal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="px-6 py-5 space-y-6">
              {/* Patient info + Lab info grid */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="dash-card p-4 space-y-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Patient Information
                  </h4>
                  <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
                    <User className="h-4 w-4 text-slate-400" />
                    {report.patientInfo.name}
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                    <span>Age: {report.patientInfo.age}</span>
                    <span>Gender: {report.patientInfo.gender}</span>
                    <span>Blood Group: {report.patientInfo.bloodGroup}</span>
                  </div>
                </div>
                <div className="dash-card p-4 space-y-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Laboratory
                  </h4>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    {report.laboratory.name}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {report.laboratory.address}
                  </p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    {report.laboratory.accreditation}
                  </p>
                </div>
              </div>

              {/* Doctor & test info */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <User className="h-4 w-4 text-slate-400" />
                  <span className="font-medium">Requested by:</span>{" "}
                  {report.requestedBy}
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <FlaskConical className="h-4 w-4 text-slate-400" />
                  <span className="font-medium">Department:</span>{" "}
                  {report.department}
                </div>
              </div>

              {/* Test description */}
              <div>
                <h4 className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Test Description
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {report.description}
                </p>
              </div>

              {/* Results table */}
              {report.results.length > 0 && (
                <div>
                  <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Results
                  </h4>
                  <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
                    <table
                      className="w-full text-sm"
                      role="table"
                      aria-label="Test results"
                    >
                      <thead>
                        <tr className="bg-slate-50 dark:bg-slate-700/50">
                          <TableTh>Test</TableTh>
                          <TableTh>Result</TableTh>
                          <TableTh>Unit</TableTh>
                          <TableTh>Reference Range</TableTh>
                          <TableTh>Flag</TableTh>
                        </tr>
                      </thead>
                      <tbody>
                        {report.results.map((result, i) => {
                          const flagCfg = resultFlagConfig[result.flag];
                          return (
                            <tr
                              key={i}
                              className="border-t border-slate-100 dark:border-slate-700/50"
                            >
                              <TableTd className="font-medium text-slate-900 dark:text-white">
                                {result.test}
                              </TableTd>
                              <TableTd
                                className={cn(
                                  "font-semibold tabular-nums",
                                  flagCfg.className,
                                )}
                              >
                                {result.result}
                              </TableTd>
                              <TableTd className="text-slate-500 dark:text-slate-400">
                                {result.unit}
                              </TableTd>
                              <TableTd className="text-slate-500 dark:text-slate-400 font-mono text-xs">
                                {result.referenceRange}
                              </TableTd>
                              <TableTd>
                                <span
                                  className={cn(
                                    "inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-semibold",
                                    result.flag === "normal"
                                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
                                      : result.flag === "high"
                                        ? "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400"
                                        : result.flag === "low"
                                          ? "bg-orange-50 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400"
                                          : "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400",
                                  )}
                                >
                                  {flagCfg.label}
                                </span>
                              </TableTd>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Doctor comments */}
              {report.doctorComments && (
                <div>
                  <h4 className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Doctor&apos;s Comments
                  </h4>
                  <div className="rounded-xl border border-blue-100 bg-blue-50/50 px-4 py-3 text-sm text-slate-700 dark:border-blue-900/30 dark:bg-blue-950/20 dark:text-slate-300">
                    <p>{report.doctorComments}</p>
                  </div>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4 dark:border-slate-700/40">
                <button
                  type="button"
                  onClick={() => onDownload(report)}
                  className="inline-flex items-center gap-2 rounded-xl bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-[var(--color-primary-dark)] hover:shadow-md active:scale-[0.97] dark:bg-[var(--color-accent)] dark:text-slate-900 dark:hover:opacity-90"
                  aria-label="Download PDF"
                >
                  <Download className="h-4 w-4" />
                  PDF
                </button>
                <button
                  type="button"
                  onClick={() => onPrint(report)}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition-all hover:bg-slate-50 hover:shadow-sm active:scale-[0.97] dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700/50"
                  aria-label="Print report"
                >
                  <Printer className="h-4 w-4" />
                  Print
                </button>
                <button
                  type="button"
                  onClick={() => onShare(report)}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition-all hover:bg-slate-50 hover:shadow-sm active:scale-[0.97] dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700/50"
                  aria-label="Share report"
                >
                  <Share2 className="h-4 w-4" />
                  Share
                </button>
              </div>

              {/* Timeline at bottom */}
              <div>
                <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Report Timeline
                </h4>
                <div className="flex items-start justify-between">
                  {report.timeline.map((step, si) => (
                    <div
                      key={step.name}
                      className="flex flex-col items-center gap-1.5 text-center"
                    >
                      <div
                        className={cn(
                          "flex h-8 w-8 items-center justify-center rounded-lg",
                          step.completed
                            ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400"
                            : "bg-slate-50 text-slate-300 dark:bg-slate-700/50 dark:text-slate-600",
                        )}
                      >
                        <step.icon className="h-4 w-4" />
                      </div>
                      <span
                        className={cn(
                          "text-[10px] font-medium leading-tight max-w-[60px]",
                          step.completed
                            ? "text-slate-600 dark:text-slate-300"
                            : "text-slate-300 dark:text-slate-600",
                        )}
                      >
                        {step.label}
                      </span>
                      {step.date && (
                        <span className="text-[9px] text-slate-400 dark:text-slate-500">
                          {step.date}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/* ─── Table helpers ─── */

function TableTh({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <th
      className={cn(
        "whitespace-nowrap px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500",
        className,
      )}
    >
      {children}
    </th>
  );
}

function TableTd({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <td className={cn("whitespace-nowrap px-4 py-2.5 text-sm", className)}>
      {children}
    </td>
  );
}
