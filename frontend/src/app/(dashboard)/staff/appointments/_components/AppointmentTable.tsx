"use client";

import { Button } from "@/app/components/dashboard/Button";
import {
  staggerTable,
  tableRowFade,
} from "@/components/dashboard/staff/MotionVariants";
import { motion } from "framer-motion";
import { ChevronRight, Eye } from "lucide-react";
import {
  appointments,
  statusConfig,
  typeConfig,
  type Appointment,
} from "../_mock-data";

/* ─── Helpers ───────────────────────────────── */

function formatTime(time: string) {
  const [h, m] = time.split(":");
  const hour = parseInt(h);
  const ampm = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;
  return `${hour12}:${m} ${ampm}`;
}

function getInitialsColor(name: string) {
  const colors = [
    "bg-[var(--color-primary)]",
    "bg-emerald-500",
    "bg-violet-500",
    "bg-amber-500",
    "bg-rose-500",
    "bg-cyan-500",
  ];
  const idx = name.length % colors.length;
  return colors[idx];
}

/* ─── Desktop Row ───────────────────────────── */

function DesktopRow({
  appointment,
  onReschedule,
  onView,
  onCancel,
}: {
  appointment: Appointment;
  onReschedule?: (appt: Appointment) => void;
  onView?: (appt: Appointment) => void;
  onCancel?: (appt: Appointment) => void;
}) {
  const status = statusConfig[appointment.status];
  const type = typeConfig[appointment.type];

  return (
    <motion.tr
      variants={tableRowFade}
      className="group border-b border-slate-100 transition-colors hover:bg-slate-50/80 dark:border-slate-800 dark:hover:bg-slate-800/40"
    >
      <td className="py-3 pl-4 pr-3">
        <div className="flex items-center gap-3">
          <span
            className={`flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-semibold text-white ${getInitialsColor(appointment.patientName)}`}
          >
            {appointment.patientInitials}
          </span>
          <div>
            <p className="text-sm font-medium text-slate-900 dark:text-white">
              {appointment.patientName}
            </p>
            <p className="text-xs text-slate-400">{appointment.patientId}</p>
          </div>
        </div>
      </td>
      <td className="px-3 py-3 text-sm text-slate-700 dark:text-slate-300">
        {appointment.doctorName}
      </td>
      <td className="px-3 py-3 text-sm text-slate-500 dark:text-slate-400">
        {appointment.department}
      </td>
      <td className="px-3 py-3">
        <span className="text-sm text-slate-700 dark:text-slate-300">
          {appointment.date}
        </span>
        <span className="ml-2 text-xs text-slate-400">
          {formatTime(appointment.startTime)}
        </span>
      </td>
      <td className="px-3 py-3 text-sm text-slate-500 dark:text-slate-400">
        {type.label}
      </td>
      <td className="px-3 py-3">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${status.class}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
          {status.label}
        </span>
      </td>
      <td className="py-3 pl-3 pr-4">
        <div className="flex items-center gap-1">
          {onView && (
            <Button
              variant="ghost"
              size="xs"
              icon={Eye}
              onClick={() => onView(appointment)}
            >
              View
            </Button>
          )}
          {onReschedule && (
            <Button
              variant="ghost"
              size="xs"
              icon={ChevronRight}
              onClick={() => onReschedule(appointment)}
            >
              Reschedule
            </Button>
          )}
          {onCancel && (
            <Button
              variant="ghost"
              size="xs"
              icon={ChevronRight}
              onClick={() => onCancel(appointment)}
            >
              Cancel
            </Button>
          )}
        </div>
      </td>
    </motion.tr>
  );
}

/* ─── Mobile Card ───────────────────────────── */

function MobileCard({
  appointment,
  onReschedule,
  onView,
  onCancel,
}: {
  appointment: Appointment;
  onReschedule?: (appt: Appointment) => void;
  onView?: (appt: Appointment) => void;
  onCancel?: (appt: Appointment) => void;
}) {
  const status = statusConfig[appointment.status];
  const type = typeConfig[appointment.type];

  return (
    <motion.div
      variants={tableRowFade}
      className="flex items-center gap-4 rounded-xl border border-slate-100 bg-white/50 px-4 py-3 transition-colors hover:bg-slate-50 dark:border-slate-700/50 dark:bg-slate-800/30 dark:hover:bg-slate-800/60"
    >
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white ${getInitialsColor(appointment.patientName)}`}
      >
        {appointment.patientInitials}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-slate-900 dark:text-white">
          {appointment.patientName}
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {appointment.doctorName} · {formatTime(appointment.startTime)}
        </p>
        <p className="mt-0.5 text-xs text-slate-400">{type.label}</p>
      </div>
      <span
        className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${status.class}`}
      >
        {status.label}
      </span>
      <div className="flex items-center gap-1">
        {onView && (
          <Button
            variant="ghost"
            size="xs"
            icon={Eye}
            onClick={() => onView(appointment)}
          >
            View
          </Button>
        )}
        {onReschedule && (
          <Button
            variant="ghost"
            size="xs"
            icon={ChevronRight}
            onClick={() => onReschedule(appointment)}
          >
            Reschedule
          </Button>
        )}
        {onCancel && (
          <Button
            variant="ghost"
            size="xs"
            icon={ChevronRight}
            onClick={() => onCancel(appointment)}
          >
            Cancel
          </Button>
        )}
        <ChevronRight className="h-4 w-4 shrink-0 text-slate-300 dark:text-slate-600" />
      </div>
    </motion.div>
  );
}

/* ─── Empty State ───────────────────────────── */

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800">
        <Eye className="h-7 w-7 text-slate-400" />
      </div>
      <h3 className="text-base font-semibold text-slate-900 dark:text-white">
        No appointments found
      </h3>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Try adjusting your search or filter criteria.
      </p>
    </div>
  );
}

/* ─── Main Component ────────────────────────── */

interface AppointmentTableProps {
  searchQuery?: string;
  appointments?: Appointment[];
  onReschedule?: (appt: Appointment) => void;
  onView?: (appt: Appointment) => void;
  onCancel?: (appt: Appointment) => void;
}

export function AppointmentTable({
  searchQuery,
  appointments: externalAppointments,
  onReschedule,
  onView,
  onCancel,
}: AppointmentTableProps) {
  const appointmentsToUse = externalAppointments ?? appointments;
  let filtered = appointmentsToUse;

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (a) =>
        a.patientName.toLowerCase().includes(q) ||
        a.doctorName.toLowerCase().includes(q) ||
        a.department.toLowerCase().includes(q) ||
        a.id.toLowerCase().includes(q),
    );
  }

  if (filtered.length === 0) return <EmptyState />;

  return (
    <div className="dash-card overflow-hidden">
      {/* Desktop table */}
      <div className="hidden md:block">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="table-sticky-header">
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Patient
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Doctor
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Department
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Date / Time
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Type
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Status
                </th>
                <th className="px-3 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Actions
                </th>
              </tr>
            </thead>
            <motion.tbody
              variants={staggerTable}
              initial="hidden"
              animate="visible"
            >
              {filtered.map((appt) => (
                <DesktopRow
                  key={appt.id}
                  appointment={appt}
                  onReschedule={onReschedule}
                  onView={onView}
                  onCancel={onCancel}
                />
              ))}
            </motion.tbody>
          </table>
        </div>
      </div>

      {/* Mobile cards */}
      <div className="space-y-2 p-4 md:hidden">
        <motion.div
          variants={staggerTable}
          initial="hidden"
          animate="visible"
          className="space-y-2"
        >
          {filtered.map((appt) => (
            <MobileCard
              key={appt.id}
              appointment={appt}
              onReschedule={onReschedule}
              onView={onView}
              onCancel={onCancel}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
