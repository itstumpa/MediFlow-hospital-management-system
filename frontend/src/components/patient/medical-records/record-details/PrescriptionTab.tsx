"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { CalendarDays, FileText, Pill, Repeat, User } from "lucide-react";
import type { PrescriptionData, RecordDetailData } from "./types";

/* ─── Prescription card ─── */

function PrescriptionCard({
  rx,
  index,
}: {
  rx: PrescriptionData;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: index * 0.05,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="rounded-xl border border-slate-100 bg-white p-5 transition-all hover:border-slate-200 hover:shadow-sm dark:border-slate-700/40 dark:bg-slate-800/60 dark:hover:border-slate-600/50"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0 flex-1">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 dark:bg-violet-950/40">
            <Pill className="h-5 w-5 text-violet-500 dark:text-violet-400" />
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              {rx.medicine}
            </h4>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
              {rx.dosage} &middot; {rx.frequency}
            </p>
          </div>
        </div>
        <span className="shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
          {rx.duration}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-slate-500 dark:text-slate-400">
        <span className="flex items-center gap-1">
          <User className="h-3 w-3" />
          Dr. {rx.prescribedBy}
        </span>
        <span className="flex items-center gap-1">
          <CalendarDays className="h-3 w-3" />
          {rx.date}
        </span>
        {rx.refills > 0 && (
          <span className="flex items-center gap-1">
            <Repeat className="h-3 w-3" />
            {rx.refills} refill{rx.refills !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* Instructions */}
      <div className="mt-3 rounded-lg border border-slate-100 bg-slate-50/50 px-3.5 py-2.5 dark:border-slate-700/30 dark:bg-slate-700/20">
        <p className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
          <FileText className="mt-0.5 h-3 w-3 shrink-0 text-slate-400" />
          <span>{rx.instructions}</span>
        </p>
      </div>
    </motion.div>
  );
}

/* ─── Empty state ─── */

function EmptyPrescriptions() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-50 dark:bg-slate-700/50">
        <Pill className="h-6 w-6 text-slate-300 dark:text-slate-500" />
      </div>
      <p className="mt-4 text-sm font-medium text-slate-600 dark:text-slate-300">
        No prescriptions issued
      </p>
      <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
        This visit did not require any new prescriptions.
      </p>
    </div>
  );
}

/* ─── Props ─── */

interface PrescriptionTabProps {
  data: RecordDetailData;
  className?: string;
}

export function PrescriptionTab({ data, className }: PrescriptionTabProps) {
  const { prescriptions } = data;

  if (prescriptions.length === 0) {
    return <EmptyPrescriptions />;
  }

  return (
    <div className={cn("space-y-3", className)}>
      <div className="mb-1">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {prescriptions.length} prescription
          {prescriptions.length !== 1 ? "s" : ""} issued
        </p>
      </div>
      {prescriptions.map((rx, i) => (
        <PrescriptionCard key={rx.id} rx={rx} index={i} />
      ))}
    </div>
  );
}
