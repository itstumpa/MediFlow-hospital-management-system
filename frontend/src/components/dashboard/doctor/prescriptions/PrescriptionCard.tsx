"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Calendar,
  Edit3,
  Eye,
  FileText,
  Pill,
  RotateCcw,
  Trash2,
} from "lucide-react";
import { staggerContainer, staggerItem } from "../MotionVariants";
import type {
  PrescriptionRecord,
  PrescriptionStatus,
} from "./prescriptions-mock-data";

interface PrescriptionCardProps {
  prescriptions: PrescriptionRecord[];
  onSelect?: (prescription: PrescriptionRecord) => void;
  onEdit?: (prescription: PrescriptionRecord) => void;
  onDelete?: (prescription: PrescriptionRecord) => void;
}

const statusConfig: Record<
  PrescriptionStatus,
  { bg: string; text: string; dot: string }
> = {
  Active: {
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    text: "text-emerald-600 dark:text-emerald-400",
    dot: "bg-emerald-500",
  },
  Completed: {
    bg: "bg-blue-50 dark:bg-blue-950/30",
    text: "text-blue-600 dark:text-blue-400",
    dot: "bg-blue-500",
  },
  Discontinued: {
    bg: "bg-rose-50 dark:bg-rose-950/30",
    text: "text-rose-600 dark:text-rose-400",
    dot: "bg-rose-500",
  },
  Expired: {
    bg: "bg-slate-100 dark:bg-slate-800",
    text: "text-slate-500 dark:text-slate-400",
    dot: "bg-slate-400",
  },
  Pending: {
    bg: "bg-amber-50 dark:bg-amber-950/30",
    text: "text-amber-600 dark:text-amber-400",
    dot: "bg-amber-500",
  },
};

export function PrescriptionCard({
  prescriptions,
  onSelect,
  onEdit,
  onDelete,
}: PrescriptionCardProps) {
  if (prescriptions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-white/50 py-16 dark:border-slate-700 dark:bg-slate-900/30">
        <FileText className="mb-3 h-10 w-10 text-slate-300 dark:text-slate-600" />
        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
          No prescriptions found
        </p>
        <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
          Try adjusting your search or filter criteria.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
    >
      {prescriptions.map((rx) => {
        const statusStyle = statusConfig[rx.status];
        return (
          <motion.div
            key={rx.id}
            variants={staggerItem}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className={cn(
              "group relative overflow-hidden rounded-xl border border-slate-200/60 bg-white p-4 transition-all",
              "hover:shadow-lg hover:shadow-slate-900/5",
              "dark:border-slate-700/40 dark:bg-slate-900/60",
            )}
          >
            {/* Top row */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br text-xs font-bold text-white shadow-sm",
                    rx.patientAvatarGradient,
                  )}
                >
                  {rx.patientInitials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {rx.patientName}
                  </p>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500">
                    {rx.prescriptionId}
                  </p>
                </div>
              </div>
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-medium",
                  statusStyle.bg,
                  statusStyle.text,
                )}
              >
                <span
                  className={cn("h-1.5 w-1.5 rounded-full", statusStyle.dot)}
                />
                {rx.status}
              </span>
            </div>

            {/* Diagnosis */}
            <p className="mt-3 text-xs font-medium text-slate-700 dark:text-slate-300">
              {rx.diagnosis}
            </p>

            {/* Medicines */}
            <div className="mt-2.5 space-y-1.5">
              {rx.medicines.slice(0, 3).map((med) => (
                <div
                  key={med.id}
                  className="flex items-center gap-2 rounded-lg bg-slate-50 px-2.5 py-1.5 dark:bg-slate-800/50"
                >
                  <Pill className="h-3 w-3 shrink-0 text-slate-400" />
                  <span className="flex-1 text-[11px] font-medium text-slate-600 dark:text-slate-400">
                    {med.name} {med.strength}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {med.dosage} · {med.frequency}
                  </span>
                </div>
              ))}
              {rx.medicines.length > 3 && (
                <p className="text-[10px] text-slate-400">
                  +{rx.medicines.length - 3} more medicines
                </p>
              )}
            </div>

            {/* Footer */}
            <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-700/40">
              <div className="flex items-center gap-3 text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(rx.createdDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                {rx.refills > 0 && (
                  <span className="flex items-center gap-1">
                    <RotateCcw className="h-3 w-3" />
                    {rx.refillsUsed}/{rx.refills} refills
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onEdit?.(rx)}
                  className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
                >
                  <Edit3 className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => onSelect?.(rx)}
                  className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
                >
                  <Eye className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => onDelete?.(rx)}
                  className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-500 dark:hover:bg-rose-950/30 dark:hover:text-rose-400"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
