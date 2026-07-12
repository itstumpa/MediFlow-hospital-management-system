"use client";

import { motion } from "framer-motion";
import { FlaskRoundIcon as Flask, Calendar, User, Download } from "lucide-react";
import type { LabReport } from "@/lib/data/patient-detail";
import { formatDate } from "@/lib/utils";
import { staggerItem, staggerContainer } from "@/app/components/dashboard/MotionVariants";
import { EmptyState } from "@/app/components/ui/EmptyState";
import { cn } from "@/lib/utils";

interface LabReportsTabProps {
  reports: LabReport[];
}

const statusConfig = {
  completed: {
    label: "Completed",
    class:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    dot: "bg-emerald-500",
  },
  pending: {
    label: "Pending",
    class: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    dot: "bg-amber-500",
  },
  cancelled: {
    label: "Cancelled",
    class: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    dot: "bg-red-500",
  },
};

export function LabReportsTab({ reports }: LabReportsTabProps) {
  if (reports.length === 0) {
    return (
      <EmptyState
        icon={Flask}
        title="No Lab Reports"
        description="This patient has no lab reports."
      />
    );
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="dash-card overflow-hidden"
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-dash-border dark:border-slate-700">
              <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Report Name
              </th>
              <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Category
              </th>
              <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Date
              </th>
              <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Doctor
              </th>
              <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Status
              </th>
              <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <span className="sr-only">Download</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dash-border dark:divide-slate-700">
            {reports.map((report, i) => {
              const status = statusConfig[report.status];
              return (
                <motion.tr
                  key={report.id}
                  variants={staggerItem}
                  className="group transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-900/30">
                        <Flask className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                      </div>
                      <span className="text-sm font-medium text-slate-900 dark:text-white">
                        {report.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-400">
                    {report.category}
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-slate-400" />
                      {formatDate(report.date)}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5 text-slate-400" />
                      {report.doctor}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
                        status.class,
                      )}
                    >
                      <span
                        className={cn("h-1.5 w-1.5 rounded-full", status.dot)}
                      />
                      {status.label}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={report.status !== "completed"}
                      className={cn(
                        "rounded-lg p-2 transition-colors",
                        report.status === "completed"
                          ? "text-slate-400 hover:bg-slate-100 hover:text-dash-primary dark:hover:bg-slate-700"
                          : "cursor-not-allowed text-slate-300 dark:text-slate-600",
                      )}
                      aria-label={`Download ${report.name}`}
                    >
                      <Download className="h-4 w-4" />
                    </motion.button>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
