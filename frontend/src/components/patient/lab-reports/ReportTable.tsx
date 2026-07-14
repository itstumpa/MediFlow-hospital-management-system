"use client";

import { tableRowFade } from "@/components/patient/MotionVariants";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Download, Eye } from "lucide-react";
import type { LabReport } from "./types";
import { reportStatusConfig } from "./types";

/* ─── Props ─── */

interface ReportTableProps {
  reports: LabReport[];
  onView: (report: LabReport) => void;
  onDownload: (report: LabReport) => void;
}

/* ─── Component ─── */

export function ReportTable({ reports, onView, onDownload }: ReportTableProps) {
  if (reports.length === 0) return null;

  return (
    <div className="dash-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full" role="table" aria-label="Lab reports table">
          {/* Table head */}
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-700/50">
              <Th>Test Name</Th>
              <Th>Lab ID</Th>
              <Th>Doctor</Th>
              <Th>Department</Th>
              <Th>Date</Th>
              <Th>Status</Th>
              <Th className="text-right">Actions</Th>
            </tr>
          </thead>
          {/* Table body */}
          <tbody>
            {reports.map((report, i) => {
              const statusCfg = reportStatusConfig[report.status];
              return (
                <motion.tr
                  key={report.id}
                  variants={tableRowFade}
                  initial="hidden"
                  animate="visible"
                  custom={i}
                  className="group border-b border-slate-50 transition-colors last:border-none hover:bg-slate-50/50 dark:border-slate-700/30 dark:hover:bg-slate-700/20"
                >
                  <Td className="font-medium text-slate-900 dark:text-white">
                    {report.testName}
                  </Td>
                  <Td className="text-xs text-slate-400 dark:text-slate-500 font-mono">
                    {report.labId}
                  </Td>
                  <Td className="text-slate-600 dark:text-slate-300">
                    {report.requestedBy}
                  </Td>
                  <Td className="text-slate-500 dark:text-slate-400">
                    {report.department}
                  </Td>
                  <Td className="text-slate-500 dark:text-slate-400 whitespace-nowrap">
                    {report.reportDate || report.collectionDate}
                  </Td>
                  <Td>
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold",
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
                  </Td>
                  <Td className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => onView(report)}
                        className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-300"
                        aria-label={`View ${report.testName}`}
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </button>
                      {report.status !== "pending" && (
                        <button
                          type="button"
                          onClick={() => onDownload(report)}
                          className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-300"
                          aria-label={`Download ${report.testName}`}
                        >
                          <Download className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  </Td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─── Table helpers ─── */

function Th({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <th
      className={cn(
        "whitespace-nowrap px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500",
        className,
      )}
    >
      {children}
    </th>
  );
}

function Td({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <td className={cn("whitespace-nowrap px-4 py-3 text-sm", className)}>
      {children}
    </td>
  );
}
