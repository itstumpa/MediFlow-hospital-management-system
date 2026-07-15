"use client";

import { Button } from "@/app/components/dashboard/Button";
import {
  staggerContainer,
  staggerItem,
} from "@/components/dashboard/staff/MotionVariants";
import { motion } from "framer-motion";
import { Clock, Eye } from "lucide-react";
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

/* ─── Card ──────────────────────────────────── */

function AppointmentCard_({ appointment }: { appointment: Appointment }) {
  const status = statusConfig[appointment.status];
  const type = typeConfig[appointment.type];

  return (
    <motion.div
      variants={staggerItem}
      className="group dash-card-hover rounded-xl border border-slate-100 bg-white p-4 transition-colors hover:bg-slate-50/80 dark:border-slate-700/50 dark:bg-slate-800/30 dark:hover:bg-slate-800/50"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span
            className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-semibold text-white ${getInitialsColor(appointment.patientName)}`}
          >
            {appointment.patientInitials}
          </span>
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              {appointment.patientName}
            </p>
            <p className="text-xs text-slate-400">{appointment.patientId}</p>
          </div>
        </div>
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${status.class}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
          {status.label}
        </span>
      </div>

      <div className="mt-3 space-y-1.5">
        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <span className="font-medium text-slate-700 dark:text-slate-300">
            {appointment.doctorName}
          </span>
          <span className="text-slate-300">·</span>
          <span>{appointment.department}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <Clock className="h-3.5 w-3.5" />
          <span>
            {formatTime(appointment.startTime)} -{" "}
            {formatTime(appointment.endTime)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-400">
            {type.label}
          </span>
          {appointment.priority === "urgent" && (
            <span className="rounded-md bg-red-50 px-2 py-0.5 text-xs font-medium text-red-600 dark:bg-red-950/40 dark:text-red-400">
              Urgent
            </span>
          )}
          {appointment.priority === "high" && (
            <span className="rounded-md bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-600 dark:bg-amber-950/40 dark:text-amber-400">
              High
            </span>
          )}
        </div>
        {appointment.reason && (
          <p className="text-xs text-slate-400 italic line-clamp-1">
            {appointment.reason}
          </p>
        )}
      </div>

      <div className="mt-3 flex items-center gap-2 border-t border-slate-100 pt-3 dark:border-slate-700/50">
        <Button variant="outline" size="xs" icon={Eye}>
          View Details
        </Button>
        <span className="text-[11px] text-slate-400">{appointment.id}</span>
      </div>
    </motion.div>
  );
}

/* ─── Grid ──────────────────────────────────── */

interface AppointmentCardGridProps {
  searchQuery?: string;
}

export function AppointmentCardGrid({ searchQuery }: AppointmentCardGridProps) {
  let filtered = appointments;

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

  if (filtered.length === 0) {
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

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3"
    >
      {filtered.map((appt) => (
        <AppointmentCard_ key={appt.id} appointment={appt} />
      ))}
    </motion.div>
  );
}
