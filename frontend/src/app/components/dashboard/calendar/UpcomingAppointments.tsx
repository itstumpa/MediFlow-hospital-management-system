"use client";

import { motion } from "framer-motion";
import { ChevronRight, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CalendarAppointment } from "@/lib/data/appointment-calendar";
import { statusDotMap, statusBgMap } from "@/lib/data/appointment-calendar";

interface UpcomingAppointmentsProps {
  appointments: CalendarAppointment[];
  max?: number;
  onAppointmentClick: (appointment: CalendarAppointment) => void;
}

export function UpcomingAppointments({
  appointments,
  max = 5,
  onAppointmentClick,
}: UpcomingAppointmentsProps) {
  const sorted = [...appointments]
    .filter(
      (a) =>
        a.status !== "Cancelled" &&
        a.status !== "Completed" &&
        a.status !== "No Show",
    )
    .sort((a, b) => {
      const dateA = new Date(a.date + "T" + a.time).getTime();
      const dateB = new Date(b.date + "T" + b.time).getTime();
      return dateA - dateB;
    })
    .slice(0, max);

  if (sorted.length === 0) {
    return (
      <div className="dash-card p-4">
        <h3 className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">
          Upcoming Appointments
        </h3>
        <div className="flex flex-col items-center justify-center py-6 text-slate-400 dark:text-slate-500">
          <Clock className="mb-2 h-8 w-8 opacity-40" />
          <p className="text-xs font-medium">No upcoming appointments</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dash-card p-4">
      <h3 className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">
        Upcoming Appointments
      </h3>
      <div className="space-y-2">
        {sorted.map((apt, idx) => (
          <motion.button
            key={apt.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.04 }}
            whileHover={{ x: 2 }}
            onClick={() => onAppointmentClick(apt)}
            className="flex w-full items-center gap-3 rounded-xl p-2.5 text-left transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dash-primary dark:hover:bg-slate-700/50"
          >
            {/* Status dot */}
            <span
              className={cn(
                "h-2 w-2 shrink-0 rounded-full",
                statusDotMap[apt.status],
              )}
            />

            {/* Info */}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                {apt.patientName}
              </p>
              <p className="truncate text-[11px] text-slate-500 dark:text-slate-400">
                {apt.doctorName} · {apt.department}
              </p>
            </div>

            {/* Time */}
            <div className="shrink-0 text-right">
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {apt.time}
              </p>
              <span
                className={cn(
                  "inline-block rounded-full px-1.5 py-0.5 text-[10px] font-medium",
                  statusBgMap[apt.status],
                )}
              >
                {apt.status}
              </span>
            </div>

            <ChevronRight className="h-4 w-4 shrink-0 text-slate-300 dark:text-slate-600" />
          </motion.button>
        ))}
      </div>
    </div>
  );
}
