"use client";

import {
  staggerTable,
  tableRowFade,
} from "@/components/patient/MotionVariants";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  CalendarDays,
  ChevronRight,
  Download,
  Pill,
  RefreshCw,
} from "lucide-react";
import type { Prescription } from "./types";
import { statusConfig } from "./types";

/* ─── Props ─── */

interface PrescriptionTableProps {
  prescriptions: Prescription[];
  onViewDetails: (prescription: Prescription) => void;
  onDownload: (prescription: Prescription) => void;
  onRequestRefill: (prescription: Prescription) => void;
  className?: string;
}

/* ─── Component ─── */

export function PrescriptionTable({
  prescriptions,
  onViewDetails,
  onDownload,
  onRequestRefill,
  className,
}: PrescriptionTableProps) {
  if (prescriptions.length === 0) return null;

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
          aria-label="Prescriptions"
        >
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-700/50">
              <Th>Medicine</Th>
              <Th>Doctor</Th>
              <Th>Department</Th>
              <Th>Dosage</Th>
              <Th>Frequency</Th>
              <Th>Prescribed</Th>
              <Th>Refills</Th>
              <Th>Status</Th>
              <Th className="text-right">Actions</Th>
            </tr>
          </thead>
          <tbody>
            {prescriptions.map((rx, i) => {
              const cfg = statusConfig[rx.status];
              return (
                <motion.tr
                  key={rx.id}
                  variants={tableRowFade}
                  className="group border-b border-slate-50 transition-colors hover:bg-slate-50/50 dark:border-slate-700/20 dark:hover:bg-slate-700/20"
                >
                  <Td>
                    <span className="flex items-center gap-2">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--color-primary)]/10 dark:bg-[var(--color-accent)]/10">
                        <Pill className="h-4 w-4 text-[var(--color-primary)] dark:text-[var(--color-accent)]" />
                      </span>
                      <span className="flex flex-col">
                        <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[130px]">
                          {rx.medicine}
                        </span>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 truncate max-w-[130px]">
                          {rx.genericName}
                        </span>
                      </span>
                    </span>
                  </Td>
                  <Td>
                    <span className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-dash-primary to-dash-primary-dark text-[8px] font-bold text-white">
                        {rx.doctor.initials}
                      </div>
                      <span className="truncate max-w-[110px]">
                        {rx.doctor.name}
                      </span>
                    </span>
                  </Td>
                  <Td>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {rx.department}
                    </span>
                  </Td>
                  <Td>
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                      {rx.dosage}
                    </span>
                  </Td>
                  <Td>
                    <span className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[100px] block">
                      {rx.frequency}
                    </span>
                  </Td>
                  <Td>
                    <span className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
                      <CalendarDays className="h-3 w-3 shrink-0" />
                      {new Date(rx.datePrescribed).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </Td>
                  <Td>
                    <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                      {rx.refillsUsed}/{rx.refillsTotal}
                    </span>
                  </Td>
                  <Td>
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold",
                        cfg.className,
                      )}
                    >
                      <span
                        className={cn("h-1.5 w-1.5 rounded-full", cfg.dot)}
                      />
                      {cfg.label}
                    </span>
                  </Td>
                  <Td className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => onDownload(rx)}
                        className="rounded-lg p-1.5 text-slate-400 transition-all hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-300"
                        aria-label="Download prescription"
                      >
                        <Download className="h-3.5 w-3.5" />
                      </button>
                      {rx.status === "active" &&
                        rx.refillsUsed < rx.refillsTotal && (
                          <button
                            type="button"
                            onClick={() => onRequestRefill(rx)}
                            className="rounded-lg p-1.5 text-dash-primary transition-all hover:bg-dash-primary-light dark:hover:bg-teal-950/30"
                            aria-label="Request refill"
                          >
                            <RefreshCw className="h-3.5 w-3.5" />
                          </button>
                        )}
                      <button
                        type="button"
                        onClick={() => onViewDetails(rx)}
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-[10px] font-medium text-slate-500 transition-all hover:border-slate-300 hover:text-slate-700 dark:border-slate-600 dark:text-slate-400 dark:hover:border-slate-500 dark:hover:text-slate-200"
                      >
                        View
                        <ChevronRight className="h-3 w-3" />
                      </button>
                    </div>
                  </Td>
                </motion.tr>
              );
            })}
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
