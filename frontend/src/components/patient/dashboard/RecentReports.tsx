"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Download, FlaskConical } from "lucide-react";

const reports = [
  {
    title: "Complete Blood Count (CBC)",
    doctor: "Dr. Michael Mitchell",
    date: "Jun 15, 2026",
    status: "available" as const,
  },
  {
    title: "Lipid Profile",
    doctor: "Dr. Michael Mitchell",
    date: "Jun 15, 2026",
    status: "available" as const,
  },
  {
    title: "Thyroid Function Test",
    doctor: "Dr. Sarah Chen",
    date: "May 28, 2026",
    status: "available" as const,
  },
  {
    title: "Urinalysis",
    doctor: "Dr. Emily Rodriguez",
    date: "May 20, 2026",
    status: "pending" as const,
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

export function RecentReports() {
  if (reports.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm dark:border-slate-700/40 dark:bg-slate-800/60">
        <h2 className="text-base font-semibold text-slate-900 dark:text-white">
          Recent Lab Reports
        </h2>
        <div className="mt-8 flex flex-col items-center gap-2 text-center">
          <FlaskConical className="h-8 w-8 text-slate-300 dark:text-slate-600" />
          <p className="text-sm text-slate-400 dark:text-slate-500">
            No lab reports yet
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm dark:border-slate-700/40 dark:bg-slate-800/60">
      <h2 className="text-base font-semibold text-slate-900 dark:text-white">
        Recent Lab Reports
      </h2>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Your latest test results
      </p>

      <div className="mt-4 space-y-1">
        {reports.map((report, i) => (
          <motion.div
            key={report.title}
            custom={i}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40"
          >
            <span
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                report.status === "available"
                  ? "bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400"
                  : "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400",
              )}
            >
              <FlaskConical className="h-4 w-4" strokeWidth={1.8} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                {report.title}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {report.doctor}
              </p>
            </div>
            <span className="text-xs text-slate-400 dark:text-slate-500">
              {report.date}
            </span>
            <span
              className={cn(
                "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold",
                report.status === "available"
                  ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
                  : "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
              )}
            >
              {report.status === "available" ? "Available" : "Pending"}
            </span>
            {report.status === "available" && (
              <button
                className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-300"
                aria-label={`Download ${report.title}`}
              >
                <Download className="h-3.5 w-3.5" />
              </button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
