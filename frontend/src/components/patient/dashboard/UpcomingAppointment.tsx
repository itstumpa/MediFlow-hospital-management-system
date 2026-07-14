"use client";

import { motion } from "framer-motion";
import {
  Building2,
  CalendarDays,
  ChevronRight,
  Clock,
  RotateCcw,
  Stethoscope,
} from "lucide-react";

const appointment = {
  doctor: "Dr. Sarah Chen",
  department: "Cardiology",
  date: "Tomorrow",
  time: "10:00 AM",
  clinic: "MediFlow Main Campus, Room 302",
};

function Countdown() {
  return (
    <div className="inline-flex items-center gap-2 rounded-xl bg-[var(--color-primary)]/10 px-4 py-2 dark:bg-teal-950/40">
      <Clock className="h-4 w-4 text-[var(--color-primary)] dark:text-[var(--color-accent)]" />
      <span className="text-sm font-semibold text-[var(--color-primary)] dark:text-[var(--color-accent)]">
        In 12 hours 30 minutes
      </span>
    </div>
  );
}

export function UpcomingAppointment() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1] as const,
        delay: 0.15,
      }}
      className="relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm dark:border-slate-700/40 dark:bg-slate-800/60"
    >
      {/* Decorative gradient blob */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br from-emerald-100/60 to-teal-100/40 blur-2xl dark:from-emerald-900/20 dark:to-teal-900/10" />

      <div className="relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-primary)]/10 text-[var(--color-primary)] dark:bg-teal-950/40 dark:text-[var(--color-accent)]">
              <CalendarDays className="h-4 w-4" />
            </span>
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">
              Next Appointment
            </h2>
          </div>
          <Countdown />
        </div>

        {/* Doctor info */}
        <div className="mt-5 flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-lg font-bold text-white shadow-md shadow-emerald-200/50 dark:shadow-emerald-900/30">
            SC
          </div>
          <div>
            <p className="text-lg font-bold text-slate-900 dark:text-white">
              {appointment.doctor}
            </p>
            <div className="mt-0.5 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <Stethoscope className="h-3.5 w-3.5" />
              {appointment.department}
            </div>
          </div>
        </div>

        {/* Details grid */}
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="flex items-center gap-2.5 rounded-xl bg-slate-50 p-3 dark:bg-slate-800/40">
            <CalendarDays className="h-4 w-4 shrink-0 text-slate-400" />
            <div>
              <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Date
              </p>
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                {appointment.date}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 rounded-xl bg-slate-50 p-3 dark:bg-slate-800/40">
            <Clock className="h-4 w-4 shrink-0 text-slate-400" />
            <div>
              <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Time
              </p>
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                {appointment.time}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 rounded-xl bg-slate-50 p-3 sm:col-span-1 dark:bg-slate-800/40">
            <Building2 className="h-4 w-4 shrink-0 text-slate-400" />
            <div>
              <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Clinic
              </p>
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                {appointment.clinic}
              </p>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-5 flex gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-1.5 rounded-xl bg-[var(--color-primary)] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--color-primary-dark)]"
          >
            View Details
            <ChevronRight className="h-4 w-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
          >
            <RotateCcw className="h-4 w-4" />
            Reschedule
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
