"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Pill } from "lucide-react";

const prescriptions = [
  {
    medication: "Amoxicillin",
    dosage: "500mg",
    doctor: "Dr. Sarah Chen",
    date: "Jul 1, 2026",
    status: "active" as const,
  },
  {
    medication: "Lisinopril",
    dosage: "10mg",
    doctor: "Dr. Michael Mitchell",
    date: "Jun 20, 2026",
    status: "active" as const,
  },
  {
    medication: "Ibuprofen",
    dosage: "400mg",
    doctor: "Dr. James Wilson",
    date: "May 15, 2026",
    status: "active" as const,
  },
];

const itemVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      delay: 0.04 * i,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  }),
};

export function RecentPrescriptions() {
  if (prescriptions.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm dark:border-slate-700/40 dark:bg-slate-800/60">
        <h2 className="text-base font-semibold text-slate-900 dark:text-white">
          Recent Prescriptions
        </h2>
        <div className="mt-8 flex flex-col items-center gap-2 text-center">
          <Pill className="h-8 w-8 text-slate-300 dark:text-slate-600" />
          <p className="text-sm text-slate-400 dark:text-slate-500">
            No prescriptions yet
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm dark:border-slate-700/40 dark:bg-slate-800/60">
      <h2 className="text-base font-semibold text-slate-900 dark:text-white">
        Recent Prescriptions
      </h2>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Your current medications
      </p>

      <div className="mt-4 space-y-1">
        {prescriptions.map((rx, i) => (
          <motion.div
            key={rx.medication}
            custom={i}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-dash-primary-light text-dash-primary dark:bg-teal-950/40 dark:text-[var(--color-accent)]">
              <Pill className="h-4 w-4" strokeWidth={1.8} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                {rx.medication}
                <span className="ml-1 text-xs text-slate-400">
                  ({rx.dosage})
                </span>
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {rx.doctor}
              </p>
            </div>
            <span className="text-xs text-slate-400 dark:text-slate-500">
              {rx.date}
            </span>
            <span
              className={cn(
                "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold",
                rx.status === "active"
                  ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
                  : "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400",
              )}
            >
              {rx.status === "active" ? "Active" : "Expired"}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
