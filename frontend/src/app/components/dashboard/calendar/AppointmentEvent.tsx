"use client";

import type { CalendarAppointment } from "@/lib/data/appointment-calendar";
import {
  statusBgMap,
  statusDotMap,
  statusEventBgMap,
} from "@/lib/data/appointment-calendar";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface AppointmentEventProps {
  appointment: CalendarAppointment;
  view: "day" | "week" | "month";
  onClick: (appointment: CalendarAppointment) => void;
  compact?: boolean;
}

export function AppointmentEvent({
  appointment,
  view,
  onClick,
  compact = false,
}: AppointmentEventProps) {
  const status = appointment.status;

  if (compact) {
    // Month view — compact dot style
    return (
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.15, zIndex: 10 }}
        onClick={() => onClick(appointment)}
        className={cn(
          "flex w-full items-center gap-1 rounded px-1 py-0.5 text-[11px] font-medium leading-tight transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-1px] focus-visible:outline-dash-primary",
          statusEventBgMap[status],
        )}
        title={`${appointment.patientName} — ${appointment.doctorName} at ${appointment.time}`}
        aria-label={`${appointment.patientName}, ${appointment.doctorName}, ${appointment.time}, ${appointment.status}`}
      >
        <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full bg-white/70")} />
        <span className="truncate text-white">
          {appointment.time} {appointment.patientName.split(" ")[0]}
        </span>
      </motion.button>
    );
  }

  // Day/Week view — full event card
  return (
    <motion.button
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, zIndex: 20 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(appointment)}
      className={cn(
        "group relative w-full overflow-hidden rounded-lg border-l-[3px] p-2 text-left shadow-sm transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-[-1px] focus-visible:outline-dash-primary",
        statusBgMap[status],
        appointment.isEmergency && "ring-2 ring-red-400 dark:ring-red-500",
      )}
      style={{
        borderLeftColor: `var(--color-${status === "Confirmed" ? "emerald" : status === "Pending" ? "amber" : status === "Cancelled" ? "red" : status === "Completed" ? "blue" : status === "No Show" ? "slate" : status === "Rescheduled" ? "violet" : status === "Checked In" ? "cyan" : "indigo"}-500)`,
      }}
      aria-label={`${appointment.patientName}, ${appointment.doctorName}, ${appointment.time} - ${appointment.endTime}, ${appointment.status}`}
    >
      {/* Top row: time + status dot */}
      <div className="mb-0.5 flex items-center justify-between">
        <span className="text-[11px] font-semibold opacity-80">
          {appointment.time} — {appointment.endTime}
        </span>
        <span
          className={cn("h-1.5 w-1.5 rounded-full", statusDotMap[status])}
        />
      </div>

      {/* Patient name */}
      <p className="truncate text-sm font-semibold">
        {appointment.patientName}
      </p>

      {/* Doctor + Department */}
      <div className="mt-0.5 flex items-center gap-1.5 text-[11px] opacity-75">
        <span className="truncate">{appointment.doctorName}</span>
        <span className="shrink-0 rounded-full bg-white/20 px-1.5 py-0.5 text-[10px]">
          {appointment.department}
        </span>
      </div>

      {/* Consultation type badge */}
      {appointment.consultationType && (
        <div className="mt-1 flex items-center gap-1">
          <span className="rounded bg-white/20 px-1.5 py-0.5 text-[10px] font-medium">
            {appointment.consultationType}
          </span>
          {appointment.isEmergency && (
            <span className="rounded bg-red-500/30 px-1.5 py-0.5 text-[10px] font-bold text-white">
              EMERGENCY
            </span>
          )}
        </div>
      )}

      {/* Hover tooltip indicator */}
      <div className="absolute bottom-1 right-1 opacity-0 transition-opacity group-hover:opacity-100">
        <span className="text-[10px] underline opacity-60">View details</span>
      </div>
    </motion.button>
  );
}
