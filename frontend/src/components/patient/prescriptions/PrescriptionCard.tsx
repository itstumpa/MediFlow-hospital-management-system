"use client";

import { staggerItem } from "@/components/patient/MotionVariants";
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

interface PrescriptionCardProps {
  prescriptions: Prescription[];
  onViewDetails: (prescription: Prescription) => void;
  onDownload: (prescription: Prescription) => void;
  onRequestRefill: (prescription: Prescription) => void;
  className?: string;
}

/* ─── Component ─── */

export function PrescriptionCard({
  prescriptions,
  onViewDetails,
  onDownload,
  onRequestRefill,
  className,
}: PrescriptionCardProps) {
  if (prescriptions.length === 0) return null;

  return (
    <motion.div
      variants={staggerItem}
      className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-3", className)}
    >
      {prescriptions.map((rx, i) => {
        const cfg = statusConfig[rx.status];

        return (
          <motion.div
            key={rx.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              delay: i * 0.03,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            whileTap={{ y: 0, transition: { duration: 0.1 } }}
            className="dash-card group relative flex flex-col overflow-hidden p-5 transition-shadow hover:shadow-lg"
          >
            {/* Hover glow effect */}
            <div
              className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(14, 124, 123, 0.06), transparent 40%)",
              }}
            />

            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-primary)]/10 dark:bg-[var(--color-accent)]/10">
                  <Pill className="h-5 w-5 text-[var(--color-primary)] dark:text-[var(--color-accent)]" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate max-w-[160px]">
                    {rx.medicine}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                    {rx.genericName}
                  </p>
                </div>
              </div>
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-semibold shrink-0",
                  cfg.className,
                )}
              >
                <span className={cn("h-1.5 w-1.5 rounded-full", cfg.dot)} />
                {cfg.label}
              </span>
            </div>

            {/* Doctor & Department */}
            <div className="flex items-center gap-2 mb-2">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-primary)] to-emerald-500 text-[8px] font-bold text-white">
                {rx.doctor.initials}
              </div>
              <span className="text-xs font-medium text-slate-600 dark:text-slate-300 truncate">
                {rx.doctor.name}
              </span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 truncate">
                {rx.department}
              </span>
            </div>

            {/* Details grid */}
            <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
              <Detail label="Dosage" value={rx.dosage} />
              <Detail label="Frequency" value={rx.frequency} />
              <Detail label="Duration" value={rx.duration} />
              <Detail
                label="Refills"
                value={`${rx.refillsUsed}/${rx.refillsTotal}`}
              />
            </div>

            {/* Date */}
            <div className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500">
              <CalendarDays className="h-3 w-3" />
              Prescribed{" "}
              {new Date(rx.datePrescribed).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </div>

            {/* Actions */}
            <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-700/40">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => onDownload(rx)}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-[10px] font-medium text-slate-500 transition-all hover:border-slate-300 hover:text-slate-700 active:scale-[0.95] dark:border-slate-600 dark:text-slate-400 dark:hover:border-slate-500 dark:hover:text-slate-200"
                  aria-label="Download prescription"
                >
                  <Download className="h-3 w-3" />
                  Download
                </button>
                {rx.status === "active" && rx.refillsUsed < rx.refillsTotal && (
                  <button
                    type="button"
                    onClick={() => onRequestRefill(rx)}
                    className="inline-flex items-center gap-1 rounded-lg border border-emerald-200 px-2.5 py-1.5 text-[10px] font-medium text-emerald-600 transition-all hover:bg-emerald-50 active:scale-[0.95] dark:border-emerald-900/30 dark:text-emerald-400 dark:hover:bg-emerald-950/30"
                    aria-label="Request refill"
                  >
                    <RefreshCw className="h-3 w-3" />
                    Refill
                  </button>
                )}
              </div>
              <button
                type="button"
                onClick={() => onViewDetails(rx)}
                className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[10px] font-medium text-[var(--color-primary)] transition-all hover:bg-[var(--color-primary)]/5 active:scale-[0.95] dark:text-[var(--color-accent)] dark:hover:bg-[var(--color-accent)]/5"
                aria-label="View details"
              >
                Details
                <ChevronRight className="h-3 w-3" />
              </button>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

/* ─── Detail helper ─── */

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">
        {label}
      </p>
      <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-0.5">
        {value}
      </p>
    </div>
  );
}
