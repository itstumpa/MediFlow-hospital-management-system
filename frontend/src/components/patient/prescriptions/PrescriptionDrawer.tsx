"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  CalendarDays,
  Clock,
  Download,
  FileText,
  Info,
  Printer,
  Stethoscope,
  X,
} from "lucide-react";
import { MedicationSchedule } from "./MedicationSchedule";
import type { Prescription } from "./types";
import { statusConfig } from "./types";

/* ─── Props ─── */

interface PrescriptionDrawerProps {
  prescription: Prescription | null;
  onClose: () => void;
  onDownload: (prescription: Prescription) => void;
  onPrint: (prescription: Prescription) => void;
}

/* ─── Component ─── */

export function PrescriptionDrawer({
  prescription,
  onClose,
  onDownload,
  onPrint,
}: PrescriptionDrawerProps) {
  if (!prescription) return null;

  const cfg = statusConfig[prescription.status];

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="drawer-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm dark:bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <motion.div
        key="drawer-panel"
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: "100%", opacity: 0 }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 300,
        }}
        className="fixed inset-y-0 right-0 z-50 w-full max-w-lg bg-white shadow-2xl dark:bg-slate-900"
        role="dialog"
        aria-modal="true"
        aria-label={`Details for ${prescription.medicine}`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-700">
            <div className="min-w-0 flex-1">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white truncate">
                {prescription.medicine}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                {prescription.genericName}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-all hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-300"
              aria-label="Close drawer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto dash-scrollbar px-5 py-5 space-y-6">
            {/* Status badge + Dates */}
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold",
                  cfg.className,
                )}
              >
                <span className={cn("h-1.5 w-1.5 rounded-full", cfg.dot)} />
                {cfg.label}
              </span>
              {prescription.expiryDate && (
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                  <Clock className="h-3 w-3" />
                  Expires{" "}
                  {new Date(prescription.expiryDate).toLocaleDateString(
                    "en-US",
                    { month: "short", day: "numeric", year: "numeric" },
                  )}
                </span>
              )}
            </div>

            {/* Doctor & Department */}
            <div className="dash-card flex items-center gap-3 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-primary)] to-emerald-500 text-xs font-bold text-white">
                {prescription.doctor.initials}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {prescription.doctor.name}
                </p>
                <p className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                  <Stethoscope className="h-3 w-3" />
                  {prescription.department}
                </p>
              </div>
              <CalendarDays className="h-4 w-4 text-slate-400 shrink-0" />
              <span className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
                {new Date(prescription.datePrescribed).toLocaleDateString(
                  "en-US",
                  {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  },
                )}
              </span>
            </div>

            {/* Dosage info */}
            <div>
              <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Prescription Details
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <InfoCard label="Dosage" value={prescription.dosage} />
                <InfoCard label="Frequency" value={prescription.frequency} />
                <InfoCard label="Duration" value={prescription.duration} />
                <InfoCard
                  label="Refills"
                  value={`${prescription.refillsUsed}/${prescription.refillsTotal}`}
                />
              </div>
            </div>

            {/* Purpose */}
            <div>
              <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Info className="h-3 w-3" />
                Purpose
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {prescription.purpose}
              </p>
            </div>

            {/* Instructions */}
            <div>
              <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <FileText className="h-3 w-3" />
                Instructions
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {prescription.instructions}
              </p>
            </div>

            {/* Medication Schedule */}
            <div>
              <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Medication Schedule
              </h3>
              <MedicationSchedule schedule={prescription.schedule} />
            </div>

            {/* Side Effects */}
            {prescription.sideEffects.length > 0 && (
              <div>
                <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Possible Side Effects
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {prescription.sideEffects.map((effect, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-medium text-amber-700 dark:bg-amber-950/30 dark:text-amber-400"
                    >
                      {effect}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Warnings */}
            {prescription.warnings.length > 0 && (
              <div>
                <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-rose-500 dark:text-rose-400 flex items-center gap-1.5">
                  <AlertTriangle className="h-3 w-3" />
                  Warnings
                </h3>
                <ul className="space-y-1.5">
                  {prescription.warnings.map((warning, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400"
                    >
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-rose-400" />
                      {warning}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Notes */}
            {prescription.notes && (
              <div>
                <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Clinical Notes
                </h3>
                <div className="rounded-xl bg-slate-50 p-3.5 dark:bg-slate-800/50">
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {prescription.notes}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer actions */}
          <div className="flex items-center gap-2 border-t border-slate-200 px-5 py-4 dark:border-slate-700">
            <button
              type="button"
              onClick={() => onDownload(prescription)}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-[var(--color-primary-dark)] active:scale-[0.97] dark:bg-[var(--color-accent)] dark:text-slate-900 dark:hover:opacity-90"
            >
              <Download className="h-4 w-4" />
              Download PDF
            </button>
            <button
              type="button"
              onClick={() => onPrint(prescription)}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition-all hover:bg-slate-50 active:scale-[0.97] dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700/50"
            >
              <Printer className="h-4 w-4" />
              Print
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ─── Info card helper ─── */

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-3 dark:border-slate-700/50 dark:bg-slate-800/30">
      <p className="text-[10px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">
        {label}
      </p>
      <p className="mt-0.5 text-sm font-semibold text-slate-800 dark:text-slate-200">
        {value}
      </p>
    </div>
  );
}
