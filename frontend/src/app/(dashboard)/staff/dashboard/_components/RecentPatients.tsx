"use client";

import {
  staggerTable,
  tableRowFade,
} from "@/components/dashboard/staff/MotionVariants";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { recentPatients, type RecentPatientStatus } from "../_mock-data";

/* ─── Status Config ─────────────────────────── */

const statusConfig: Record<
  RecentPatientStatus,
  { label: string; classes: string }
> = {
  registered: {
    label: "Registered",
    classes:
      "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
  },
  "checked-in": {
    label: "Checked In",
    classes: "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400",
  },
  "in-progress": {
    label: "In Progress",
    classes:
      "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
  },
  completed: {
    label: "Completed",
    classes:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
  },
};

/* ─── Recent Patients ───────────────────────── */

export function RecentPatients() {
  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
        Recent Patients
      </h2>
      <div className="dash-card overflow-hidden">
        <div className="hidden md:block">
          <table className="w-full text-left text-sm">
            <thead className="table-sticky-header">
              <tr className="border-b border-slate-100 dark:border-slate-700/50">
                <th className="px-5 py-3.5 font-semibold text-slate-700 dark:text-slate-300">
                  Patient
                </th>
                <th className="px-5 py-3.5 font-semibold text-slate-700 dark:text-slate-300">
                  Time
                </th>
                <th className="px-5 py-3.5 font-semibold text-slate-700 dark:text-slate-300">
                  Purpose
                </th>
                <th className="px-5 py-3.5 font-semibold text-slate-700 dark:text-slate-300">
                  Status
                </th>
              </tr>
            </thead>
            <motion.tbody
              variants={staggerTable}
              initial="hidden"
              animate="visible"
            >
              {recentPatients.map((patient) => (
                <motion.tr
                  key={patient.id}
                  variants={tableRowFade}
                  className="border-b border-slate-50 transition-colors hover:bg-slate-50/50 last:border-b-0 dark:border-slate-800/40 dark:hover:bg-slate-800/20"
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)] text-xs font-semibold text-white">
                        {patient.initials}
                      </span>
                      <span className="font-medium text-slate-900 dark:text-white">
                        {patient.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-slate-600 dark:text-slate-400">
                    {patient.registrationTime}
                  </td>
                  <td className="px-5 py-3.5 text-slate-600 dark:text-slate-400">
                    {patient.purpose}
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                        statusConfig[patient.status].classes,
                      )}
                    >
                      {statusConfig[patient.status].label}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="divide-y divide-slate-100 md:hidden dark:divide-slate-700/50">
          {recentPatients.map((patient) => (
            <div key={patient.id} className="flex items-center gap-3 px-4 py-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)] text-xs font-semibold text-white">
                {patient.initials}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-slate-900 dark:text-white">
                  {patient.name}
                </p>
                <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                  {patient.purpose} · {patient.registrationTime}
                </p>
              </div>
              <span
                className={cn(
                  "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium",
                  statusConfig[patient.status].classes,
                )}
              >
                {statusConfig[patient.status].label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
