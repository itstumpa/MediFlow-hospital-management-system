"use client";

import {
  staggerTable,
  tableRowFade,
} from "@/components/patient/MotionVariants";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Building2, CalendarDays, ExternalLink, Paperclip } from "lucide-react";
import Link from "next/link";
import type { MedicalRecord } from "./types";
import {
  recordStatusConfig,
  recordTypeColors,
  recordTypeLabels,
} from "./types";

interface MedicalTableProps {
  records: MedicalRecord[];
  className?: string;
}

export function MedicalTable({ records, className }: MedicalTableProps) {
  if (records.length === 0) {
    return (
      <motion.div
        variants={tableRowFade}
        className={cn("dash-card p-12 text-center", className)}
      >
        <div className="flex flex-col items-center justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-50 dark:bg-slate-700/50">
            <CalendarDays className="h-6 w-6 text-slate-300 dark:text-slate-500" />
          </div>
          <p className="mt-4 text-sm font-medium text-slate-600 dark:text-slate-300">
            No records match your filters
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={staggerTable}
      initial="hidden"
      animate="visible"
      className={cn("dash-card overflow-hidden", className)}
    >
      <div className="overflow-x-auto dash-scrollbar">
        <table
          className="w-full text-left"
          role="table"
          aria-label="Medical records"
        >
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-700/50">
              <Th>Visit Date</Th>
              <Th>Doctor</Th>
              <Th>Department</Th>
              <Th>Diagnosis</Th>
              <Th>Treatment</Th>
              <Th>Status</Th>
              <Th className="text-center">Files</Th>
              <Th className="text-right">Actions</Th>
            </tr>
          </thead>
          <tbody>
            {records.map((record, i) => (
              <motion.tr
                key={record.id}
                variants={tableRowFade}
                className="group border-b border-slate-50 transition-colors hover:bg-slate-50/50 dark:border-slate-700/20 dark:hover:bg-slate-700/20"
              >
                <Td>
                  <span className="flex items-center gap-1.5 text-xs whitespace-nowrap">
                    <CalendarDays className="h-3 w-3 text-slate-400 shrink-0" />
                    {record.date}
                  </span>
                </Td>
                <Td>
                  <span className="flex items-center gap-2">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-primary)] to-emerald-500 text-[9px] font-bold text-white">
                      {record.doctor.initials}
                    </div>
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300 truncate max-w-[120px]">
                      {record.doctor.name}
                    </span>
                  </span>
                </Td>
                <Td>
                  <span className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                    <Building2 className="h-3 w-3 shrink-0" />
                    {record.department}
                  </span>
                </Td>
                <Td>
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 line-clamp-2 max-w-[180px]">
                    {record.diagnosis}
                  </span>
                  <span
                    className={cn(
                      "mt-0.5 inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[9px] font-semibold",
                      recordTypeColors[record.recordType].bg,
                      recordTypeColors[record.recordType].text,
                      recordTypeColors[record.recordType].darkBg,
                      recordTypeColors[record.recordType].darkText,
                    )}
                  >
                    <span
                      className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        recordTypeColors[record.recordType].dot,
                      )}
                    />
                    {recordTypeLabels[record.recordType]}
                  </span>
                </Td>
                <Td>
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 max-w-[200px] leading-relaxed">
                    {record.treatment}
                  </p>
                </Td>
                <Td>
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold",
                      recordStatusConfig[record.status].className,
                    )}
                  >
                    {recordStatusConfig[record.status].label}
                  </span>
                </Td>
                <Td className="text-center">
                  <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                    <Paperclip className="h-3 w-3" />
                    {record.attachments.length}
                  </span>
                </Td>
                <Td className="text-right">
                  <Link
                    href={`/medical-records/${record.id}`}
                    className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-[10px] font-medium text-slate-500 transition-all hover:border-slate-300 hover:text-slate-700 dark:border-slate-600 dark:text-slate-400 dark:hover:border-slate-500 dark:hover:text-slate-200"
                  >
                    View
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                </Td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

/* ─── Helpers ─── */

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
        "px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400",
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
  return <td className={cn("px-4 py-3", className)}>{children}</td>;
}
