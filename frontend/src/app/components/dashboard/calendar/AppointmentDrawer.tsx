"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ExternalLink,
  Edit3,
  Calendar,
  Clock,
  User,
  Stethoscope,
  Building2,
  FileText,
  AlertCircle,
  Phone,
  Video,
  MapPin,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { CalendarAppointment } from "@/lib/data/appointment-calendar";
import { statusBgMap, statusDotMap } from "@/lib/data/appointment-calendar";

interface AppointmentDrawerProps {
  appointment: CalendarAppointment | null;
  onClose: () => void;
}

export function AppointmentDrawer({
  appointment,
  onClose,
}: AppointmentDrawerProps) {
  return (
    <AnimatePresence>
      {appointment && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-md border-l border-dash-border bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-800"
            role="dialog"
            aria-modal="true"
            aria-label="Appointment details"
          >
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-dash-border px-5 py-4 dark:border-slate-700">
                <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                  Appointment Details
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dash-primary dark:hover:bg-slate-700 dark:hover:text-slate-300"
                  aria-label="Close drawer"
                >
                  <X className="h-4 w-4" />
                </motion.button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-5">
                {/* Status Badge */}
                <div className="mb-4 flex items-center gap-2">
                  <span
                    className={cn(
                      "h-2 w-2 rounded-full",
                      statusDotMap[appointment.status],
                    )}
                  />
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-0.5 text-xs font-semibold",
                      statusBgMap[appointment.status],
                    )}
                  >
                    {appointment.status}
                  </span>
                  {appointment.isEmergency && (
                    <span className="flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-bold text-red-700 dark:bg-red-900/40 dark:text-red-300">
                      <AlertCircle className="h-3 w-3" />
                      Emergency
                    </span>
                  )}
                </div>

                {/* Patient Info */}
                <Section title="Patient" icon={User}>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {appointment.patientName}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    ID: {appointment.patientId}
                  </p>
                </Section>

                {/* Doctor Info */}
                <Section title="Doctor" icon={Stethoscope}>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {appointment.doctorName}
                  </p>
                </Section>

                {/* Department */}
                <Section title="Department" icon={Building2}>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {appointment.department}
                  </p>
                </Section>

                {/* Date & Time */}
                <Section title="Date & Time" icon={Clock}>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {new Date(
                      appointment.date + "T" + appointment.time,
                    ).toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    {appointment.time} — {appointment.endTime} (
                    {appointment.duration} min)
                  </p>
                </Section>

                {/* Consultation Type */}
                <Section
                  title="Consultation Type"
                  icon={
                    appointment.consultationType === "Video"
                      ? Video
                      : appointment.consultationType === "Phone"
                        ? Phone
                        : MapPin
                  }
                >
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {appointment.consultationType}
                  </p>
                </Section>

                {/* Notes */}
                {appointment.notes && (
                  <Section title="Notes" icon={FileText}>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      {appointment.notes}
                    </p>
                  </Section>
                )}
              </div>

              {/* Quick Actions */}
              <div className="border-t border-dash-border p-5 dark:border-slate-700">
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Quick Actions
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  <ActionButton
                    icon={ExternalLink}
                    label="View"
                    variant="primary"
                  />
                  <ActionButton icon={Edit3} label="Edit" variant="default" />
                  <ActionButton
                    icon={Calendar}
                    label="Reschedule"
                    variant="default"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Sub-components ─────────────────────────────────────────

function Section({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4 rounded-xl border border-dash-border bg-slate-50 p-3.5 dark:border-slate-700 dark:bg-slate-800/50">
      <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        <Icon className="h-3.5 w-3.5" />
        {title}
      </div>
      {children}
    </div>
  );
}

function ActionButton({
  icon: Icon,
  label,
  variant = "default",
}: {
  icon: React.ElementType;
  label: string;
  variant: "primary" | "default";
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "flex flex-col items-center gap-1 rounded-xl px-3 py-2.5 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dash-primary",
        variant === "primary"
          ? "bg-dash-primary text-white hover:bg-dash-primary-dark shadow-sm"
          : "border border-dash-border bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600",
      )}
    >
      <Icon className="h-4 w-4" />
      {label}
    </motion.button>
  );
}
