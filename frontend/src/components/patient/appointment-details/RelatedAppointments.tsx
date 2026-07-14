"use client";

import { staggerItem } from "@/components/patient/MotionVariants";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarArrowUp,
  CalendarCheck,
  ChevronRight,
  Clock,
  Phone,
  User,
  Video,
} from "lucide-react";
import Link from "next/link";
import type { RelatedAppointment } from "./types";

/* ─── Status badge ─── */
function RelatedStatusBadge({ status }: { status: string }) {
  const config: Record<string, { label: string; className: string }> = {
    completed: {
      label: "Completed",
      className:
        "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
    },
    confirmed: {
      label: "Confirmed",
      className:
        "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400",
    },
    scheduled: {
      label: "Scheduled",
      className:
        "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400",
    },
    cancelled: {
      label: "Cancelled",
      className: "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400",
    },
    "no-show": {
      label: "No Show",
      className:
        "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400",
    },
  };
  const cfg = config[status] || config.completed;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold",
        cfg.className,
      )}
    >
      {cfg.label}
    </span>
  );
}

/* ─── Consult type icon ─── */
function ConsultTypeIcon({ type }: { type: string }) {
  if (type === "Video") return <Video className="h-3 w-3" />;
  if (type === "Phone") return <Phone className="h-3 w-3" />;
  return <User className="h-3 w-3" />;
}

/* ─── Appointment row ─── */
function AppointmentRow({ appointment }: { appointment: RelatedAppointment }) {
  return (
    <Link
      href={`/appointments/${appointment.id}`}
      className="group flex items-center gap-4 rounded-xl border border-slate-100 p-3.5 transition-all hover:border-slate-200 hover:shadow-sm dark:border-slate-700/30 dark:hover:border-slate-600/50"
    >
      {/* Initials */}
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-[11px] font-bold text-white shadow-sm">
        {appointment.doctorInitials}
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate group-hover:text-[var(--color-primary)] dark:group-hover:text-[var(--color-accent)] transition-colors">
          {appointment.doctorName}
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {appointment.doctorDepartment}
        </p>
      </div>

      <div className="hidden sm:block text-xs text-slate-500 dark:text-slate-400 text-right">
        <p className="flex items-center gap-1">
          <CalendarCheck className="h-3 w-3" />
          {appointment.date}
        </p>
        <p className="flex items-center gap-1 mt-0.5">
          <Clock className="h-3 w-3" />
          {appointment.time}
        </p>
      </div>

      <div className="hidden md:flex items-center gap-2">
        <span className="flex items-center gap-1 text-xs text-slate-400">
          <ConsultTypeIcon type={appointment.consultationType} />
          {appointment.consultationType}
        </span>
        <RelatedStatusBadge status={appointment.status} />
      </div>

      <ChevronRight className="h-4 w-4 text-slate-300 transition-colors group-hover:text-slate-500 dark:group-hover:text-slate-400 shrink-0" />
    </Link>
  );
}

/* ─── Main component ─── */
interface RelatedAppointmentsProps {
  previous: RelatedAppointment[];
  upcoming: RelatedAppointment[];
  className?: string;
}

export function RelatedAppointments({
  previous,
  upcoming,
  className,
}: RelatedAppointmentsProps) {
  return (
    <motion.div
      variants={staggerItem}
      className={cn(
        "rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm dark:border-slate-700/40 dark:bg-slate-800/60",
        className,
      )}
    >
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-5">
        Related Appointments
      </h3>

      <div className="space-y-6">
        {/* Previous visits */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <CalendarCheck className="h-4 w-4 text-slate-400" />
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Previous Visits
            </h4>
          </div>
          <AnimatePresence mode="wait">
            {previous.length > 0 ? (
              <div className="space-y-2">
                {previous.map((apt, i) => (
                  <motion.div
                    key={apt.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: i * 0.05,
                      duration: 0.3,
                      ease: [0.25, 0.1, 0.25, 1] as const,
                    }}
                  >
                    <AppointmentRow appointment={apt} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <EmptyRelated type="previous" />
            )}
          </AnimatePresence>
        </div>

        {/* Upcoming visits */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <CalendarArrowUp className="h-4 w-4 text-slate-400" />
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Upcoming Visits
            </h4>
          </div>
          <AnimatePresence mode="wait">
            {upcoming.length > 0 ? (
              <div className="space-y-2">
                {upcoming.map((apt, i) => (
                  <motion.div
                    key={apt.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: i * 0.05,
                      duration: 0.3,
                      ease: [0.25, 0.1, 0.25, 1] as const,
                    }}
                  >
                    <AppointmentRow appointment={apt} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <EmptyRelated type="upcoming" />
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Empty states ─── */
function EmptyRelated({ type }: { type: "previous" | "upcoming" }) {
  return (
    <div className="flex flex-col items-center justify-center py-6 text-center rounded-xl bg-slate-50 dark:bg-slate-700/20">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700/50">
        <CalendarCheck className="h-5 w-5 text-slate-300 dark:text-slate-500" />
      </div>
      <p className="mt-2 text-xs font-medium text-slate-500 dark:text-slate-400">
        {type === "previous"
          ? "No previous visits found"
          : "No upcoming visits scheduled"}
      </p>
      {type === "upcoming" && (
        <Link
          href="/appointments/book"
          className="mt-2 text-xs font-medium text-[var(--color-primary)] hover:underline dark:text-[var(--color-accent)]"
        >
          Book an appointment
        </Link>
      )}
    </div>
  );
}
