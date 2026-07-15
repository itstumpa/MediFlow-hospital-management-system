"use client";

import {
  staggerTable,
  tableRowFade,
} from "@/components/dashboard/staff/MotionVariants";
import { motion } from "framer-motion";
import { Eye, UserPlus } from "lucide-react";
import {
  appointmentStatusConfig,
  departmentColors,
  formatTime,
  getInitials,
  priorityConfig,
  type DoctorScheduleEntry,
  type ScheduleEvent,
} from "../_mock-data";
import { EmptyState } from "./EmptyState";

/* ─── Props ─────────────────────────────────── */

interface ScheduleTableProps {
  data: DoctorScheduleEntry[];
  searchQuery: string;
  onViewEvent?: (event: ScheduleEvent) => void;
  onAssignAppointment?: (doctorId: string) => void;
}

/* ══════════════════════════════════════════════
   Component
   ══════════════════════════════════════════════ */

export function ScheduleTable({
  data,
  searchQuery,
  onViewEvent,
  onAssignAppointment,
}: ScheduleTableProps) {
  // Flatten and filter events
  const events = data
    .flatMap((entry) =>
      entry.events.map((ev) => ({
        ...ev,
        doctorPhoto: entry.photoUrl,
        doctorDept: entry.department,
      })),
    )
    .filter((ev) => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        (ev.patientName ?? "").toLowerCase().includes(q) ||
        ev.doctorName.toLowerCase().includes(q) ||
        ev.reason.toLowerCase().includes(q) ||
        (ev.patientId ?? "").toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.startTime}`).getTime();
      const dateB = new Date(`${b.date}T${b.startTime}`).getTime();
      return dateA - dateB;
    });

  if (events.length === 0) {
    return (
      <EmptyState
        title="No schedules found"
        description="No appointments match your current search or filters."
      />
    );
  }

  return (
    <motion.div
      variants={staggerTable}
      initial="hidden"
      animate="visible"
      className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700"
    >
      <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
        {/* Head */}
        <thead className="table-sticky-header bg-slate-50 dark:bg-slate-800/50">
          <tr>
            {[
              "Time",
              "Patient",
              "Doctor",
              "Department",
              "Reason",
              "Priority",
              "Status",
            ].map((header) => (
              <th
                key={header}
                className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400"
              >
                {header}
              </th>
            ))}
            <th className="w-20 px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Actions
            </th>
          </tr>
        </thead>

        {/* Body */}
        <tbody className="divide-y divide-slate-100 bg-white dark:divide-slate-700 dark:bg-slate-900">
          {events.map((event) => {
            const statusCfg =
              appointmentStatusConfig[event.status] ??
              appointmentStatusConfig.scheduled;
            const prioCfg =
              priorityConfig[event.priority] ?? priorityConfig.routine;

            return (
              <motion.tr
                key={event.id}
                variants={tableRowFade}
                className="group transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
              >
                {/* Time */}
                <td className="whitespace-nowrap px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div
                      className="h-2 w-2 flex-shrink-0 rounded-full"
                      style={{ backgroundColor: event.color }}
                    />
                    <div>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {formatTime(event.startTime)}
                      </p>
                      <p className="text-xs text-slate-400">
                        {formatTime(event.endTime)}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Patient */}
                <td className="whitespace-nowrap px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-xs font-bold text-[var(--color-primary)]">
                      {event.patientName ? getInitials(event.patientName) : "—"}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {event.patientName ?? "—"}
                      </p>
                      {event.patientId && (
                        <p className="text-xs text-slate-400">
                          {event.patientId}
                        </p>
                      )}
                    </div>
                  </div>
                </td>

                {/* Doctor */}
                <td className="whitespace-nowrap px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      {event.doctorName}
                    </span>
                  </div>
                </td>

                {/* Department */}
                <td className="whitespace-nowrap px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <div
                      className="h-2 w-2 flex-shrink-0 rounded-full"
                      style={{
                        backgroundColor:
                          departmentColors[event.doctorDepartment] ?? "#94a3b8",
                      }}
                    />
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      {event.doctorDepartment}
                    </span>
                  </div>
                </td>

                {/* Reason */}
                <td className="max-w-[200px] truncate px-4 py-3 text-sm text-slate-600 dark:text-slate-400">
                  {event.reason || "—"}
                </td>

                {/* Priority */}
                <td className="whitespace-nowrap px-4 py-3">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${prioCfg.class}`}
                  >
                    {prioCfg.label}
                  </span>
                </td>

                {/* Status */}
                <td className="whitespace-nowrap px-4 py-3">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${statusCfg.class}`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${statusCfg.dot}`}
                    />
                    {statusCfg.label}
                  </span>
                </td>

                {/* Actions */}
                <td className="whitespace-nowrap px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <button
                      onClick={() => onViewEvent?.(event)}
                      className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-300"
                      title="View details"
                    >
                      <Eye className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => onAssignAppointment?.(event.doctorId)}
                      className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-[var(--color-primary)]/10 hover:text-[var(--color-primary)]"
                      title="Assign appointment"
                    >
                      <UserPlus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            );
          })}
        </tbody>
      </table>
    </motion.div>
  );
}
