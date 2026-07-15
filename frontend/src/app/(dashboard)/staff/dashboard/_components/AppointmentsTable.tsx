"use client";

import { Button } from "@/app/components/dashboard/Button";
import {
  staggerTable,
  tableRowFade,
} from "@/components/dashboard/staff/MotionVariants";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { CalendarPlus, CalendarX, ChevronRight, Eye } from "lucide-react";
import { todayAppointments, type AppointmentStatus } from "../_mock-data";

/* ─── Status Badge ──────────────────────────── */

const statusConfig: Record<
  AppointmentStatus,
  { label: string; classes: string }
> = {
  confirmed: {
    label: "Confirmed",
    classes: "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400",
  },
  "checked-in": {
    label: "Checked In",
    classes:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
  },
  waiting: {
    label: "Waiting",
    classes:
      "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
  },
  completed: {
    label: "Completed",
    classes:
      "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
  },
  cancelled: {
    label: "Cancelled",
    classes: "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400",
  },
  "no-show": {
    label: "No Show",
    classes: "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400",
  },
};

function StatusBadge({ status }: { status: AppointmentStatus }) {
  const config = statusConfig[status];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        config.classes,
      )}
    >
      {config.label}
    </span>
  );
}

/* ─── Empty State ───────────────────────────── */

function EmptyTable() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800">
        <CalendarX className="h-7 w-7 text-slate-400" />
      </div>
      <h3 className="text-base font-semibold text-slate-900 dark:text-white">
        No appointments today
      </h3>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        It looks like there are no appointments scheduled.
      </p>
      <Button variant="primary" size="sm" className="mt-4" icon={CalendarPlus}>
        Schedule Appointment
      </Button>
    </div>
  );
}

/* ─── Appointments Table ────────────────────── */

export function AppointmentsTable() {
  if (todayAppointments.length === 0) return <EmptyTable />;

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Today&apos;s Appointments
        </h2>
        <Button
          variant="ghost"
          size="sm"
          icon={ChevronRight}
          iconPosition="right"
        >
          View All
        </Button>
      </div>

      <div className="dash-card overflow-hidden">
        {/* Table - desktop */}
        <div className="hidden md:block">
          <table className="w-full text-left text-sm">
            <thead className="table-sticky-header">
              <tr className="border-b border-slate-100 dark:border-slate-700/50">
                <th className="px-5 py-3.5 font-semibold text-slate-700 dark:text-slate-300">
                  Patient
                </th>
                <th className="px-5 py-3.5 font-semibold text-slate-700 dark:text-slate-300">
                  Doctor
                </th>
                <th className="px-5 py-3.5 font-semibold text-slate-700 dark:text-slate-300">
                  Department
                </th>
                <th className="px-5 py-3.5 font-semibold text-slate-700 dark:text-slate-300">
                  Time
                </th>
                <th className="px-5 py-3.5 font-semibold text-slate-700 dark:text-slate-300">
                  Status
                </th>
                <th className="px-5 py-3.5 text-right font-semibold text-slate-700 dark:text-slate-300">
                  Actions
                </th>
              </tr>
            </thead>
            <motion.tbody
              variants={staggerTable}
              initial="hidden"
              animate="visible"
            >
              {todayAppointments.map((apt) => (
                <motion.tr
                  key={apt.id}
                  variants={tableRowFade}
                  className="border-b border-slate-50 transition-colors hover:bg-slate-50/50 last:border-b-0 dark:border-slate-800/40 dark:hover:bg-slate-800/20"
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)] text-xs font-semibold text-white">
                        {apt.patientInitials}
                      </span>
                      <span className="font-medium text-slate-900 dark:text-white">
                        {apt.patientName}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-slate-600 dark:text-slate-400">
                    {apt.doctor}
                  </td>
                  <td className="px-5 py-3.5 text-slate-600 dark:text-slate-400">
                    {apt.department}
                  </td>
                  <td className="px-5 py-3.5 font-medium text-slate-700 dark:text-slate-300">
                    {apt.time}
                  </td>
                  <td className="px-5 py-3.5">
                    <StatusBadge status={apt.status} />
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 rounded-xl px-3 py-1.5 text-xs font-medium text-[var(--color-primary)] transition-colors hover:bg-[var(--color-primary)]/5"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      View
                    </button>
                  </td>
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
        </div>

        {/* Cards - mobile */}
        <div className="divide-y divide-slate-100 md:hidden dark:divide-slate-700/50">
          {todayAppointments.map((apt) => (
            <div key={apt.id} className="flex items-center gap-3 px-4 py-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)] text-xs font-semibold text-white">
                {apt.patientInitials}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-slate-900 dark:text-white">
                  {apt.patientName}
                </p>
                <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                  {apt.doctor} · {apt.time}
                </p>
              </div>
              <StatusBadge status={apt.status} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
