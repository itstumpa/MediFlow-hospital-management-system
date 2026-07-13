"use client";

import type { AppointmentDetail } from "@/lib/data/appointment-detail";
import {
  appointmentStatusColors,
  consultationTypeIcons,
  paymentStatusColors,
} from "@/lib/data/appointment-detail";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Building2, Calendar, Clock, Stethoscope, User } from "lucide-react";

const statusLabels: Record<string, string> = {
  scheduled: "Scheduled",
  confirmed: "Confirmed",
  "in-progress": "In Progress",
  completed: "Completed",
  cancelled: "Cancelled",
  "no-show": "No Show",
};

const paymentLabels: Record<string, string> = {
  paid: "Paid",
  unpaid: "Unpaid",
  partial: "Partial",
  refunded: "Refunded",
};

interface AppointmentHeroProps {
  appointment: AppointmentDetail;
}

export function AppointmentHero({ appointment }: AppointmentHeroProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800"
    >
      {/* Top gradient bar */}
      <div className="h-1.5 bg-gradient-to-r from-dash-primary via-teal-600 to-teal-700" />

      <div className="p-6">
        {/* ID and status row */}
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Appointment ID
            </p>
            <h2 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
              #{appointment.appointmentId}
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
                appointmentStatusColors[appointment.status],
              )}
            >
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full",
                  appointment.status === "scheduled" && "bg-dash-primary",
                  appointment.status === "confirmed" && "bg-indigo-500",
                  appointment.status === "in-progress" && "bg-amber-500",
                  appointment.status === "completed" && "bg-emerald-500",
                  appointment.status === "cancelled" && "bg-red-500",
                  appointment.status === "no-show" && "bg-slate-500",
                )}
              />
              {statusLabels[appointment.status]}
            </span>
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
                paymentStatusColors[appointment.paymentStatus],
              )}
            >
              {paymentLabels[appointment.paymentStatus]}
            </span>
          </div>
        </div>

        {/* Main info grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Patient */}
          <motion.div
            whileHover={{ y: -2 }}
            className="flex items-start gap-3 rounded-xl bg-slate-50 p-4 transition-colors dark:bg-slate-700/50"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-dash-primary-light text-dash-primary dark:bg-teal-500/20 dark:text-accent">
              <User className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Patient
              </p>
              <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                {appointment.patient.name}
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                {appointment.patient.age} yrs Â· {appointment.patient.gender}
              </p>
            </div>
          </motion.div>

          {/* Doctor */}
          <motion.div
            whileHover={{ y: -2 }}
            className="flex items-start gap-3 rounded-xl bg-slate-50 p-4 transition-colors dark:bg-slate-700/50"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
              <Stethoscope className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Doctor
              </p>
              <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                {appointment.doctor.name}
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                {appointment.doctor.specialization}
              </p>
            </div>
          </motion.div>

          {/* Date & Time */}
          <motion.div
            whileHover={{ y: -2 }}
            className="flex items-start gap-3 rounded-xl bg-slate-50 p-4 transition-colors dark:bg-slate-700/50"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-violet-600 dark:bg-violet-500/20 dark:text-violet-400">
              <Calendar className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Date & Time
              </p>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                {new Date(appointment.date).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
              <p className="flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
                <Clock className="h-3 w-3" />
                {appointment.time} Â· {appointment.duration} min
              </p>
            </div>
          </motion.div>

          {/* Department & Type */}
          <motion.div
            whileHover={{ y: -2 }}
            className="flex items-start gap-3 rounded-xl bg-slate-50 p-4 transition-colors dark:bg-slate-700/50"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400">
              <Building2 className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Department
              </p>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                {appointment.department}
              </p>
              <p className="flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
                {consultationTypeIcons[appointment.consultationType]}{" "}
                {appointment.consultationType}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
