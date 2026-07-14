"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Download, Pill, Stethoscope } from "lucide-react";
import { staggerContainer, staggerItem } from "../MotionVariants";
import type { PatientProfile } from "./patient-profile-mock-data";

interface ProfilePrescriptionHistoryTabProps {
  patient: PatientProfile;
}

export function ProfilePrescriptionHistoryTab({
  patient,
}: ProfilePrescriptionHistoryTabProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-3"
    >
      {/* Header */}
      <div
        className={cn(
          "grid grid-cols-[2fr_1.5fr_1fr_1fr_1fr_auto] gap-3 rounded-lg bg-slate-50 px-4 py-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500",
          "dark:bg-slate-800/40 dark:text-slate-400",
        )}
      >
        <span>Medicine</span>
        <span>Dosage</span>
        <span>Duration</span>
        <span>Doctor</span>
        <span>Status</span>
        <span className="w-10" />
      </div>

      {patient.prescriptionHistory.map((rx, idx) => (
        <motion.div
          key={rx.id}
          variants={staggerItem}
          className={cn(
            "grid grid-cols-[2fr_1.5fr_1fr_1fr_1fr_auto] items-center gap-3 rounded-xl border border-slate-200/60 bg-white px-4 py-3 transition-all hover:shadow-sm",
            "dark:border-slate-700/40 dark:bg-slate-900/60",
          )}
        >
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-950/30">
              <Pill className="h-3.5 w-3.5 text-indigo-400" />
            </div>
            <span className="text-xs font-medium text-slate-900 dark:text-white">
              {rx.medicine}
            </span>
          </div>

          <span className="text-xs text-slate-600 dark:text-slate-300">
            {rx.dosage}
          </span>

          <span className="text-xs text-slate-500 dark:text-slate-400">
            {rx.duration}
          </span>

          <div className="flex items-center gap-1.5">
            <Stethoscope className="h-3 w-3 text-slate-400" />
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {rx.doctor}
            </span>
          </div>

          <PrescriptionStatusBadge status={rx.status} />

          <button className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-dash-primary dark:hover:bg-slate-800">
            <Download className="h-3.5 w-3.5" />
          </button>
        </motion.div>
      ))}
    </motion.div>
  );
}

function PrescriptionStatusBadge({
  status,
}: {
  status: "Active" | "Completed" | "Discontinued";
}) {
  const colors: Record<string, string> = {
    Active:
      "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400",
    Completed:
      "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
    Discontinued:
      "bg-rose-50 text-rose-600 dark:bg-rose-950/30 dark:text-rose-400",
  };
  return (
    <span
      className={cn(
        "inline-block w-fit rounded-full px-2 py-0.5 text-[10px] font-medium",
        colors[status],
      )}
    >
      {status}
    </span>
  );
}
