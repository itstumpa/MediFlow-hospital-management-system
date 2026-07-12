"use client";

import { staggerContainer, staggerItem } from "@/lib/animations/stagger";
import type { AppointmentDetail } from "@/lib/data/appointment-detail";
import { appointmentStatusColors } from "@/lib/data/appointment-detail";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Calendar, ChevronRight, Clock, Edit, Stethoscope } from "lucide-react";

const statusLabels: Record<string, string> = {
  scheduled: "Scheduled",
  confirmed: "Confirmed",
  "in-progress": "In Progress",
  completed: "Completed",
  cancelled: "Cancelled",
  "no-show": "No Show",
};

interface AppointmentSidebarProps {
  appointment: AppointmentDetail;
}

export function AppointmentSidebar({ appointment }: AppointmentSidebarProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-5"
    >
      {/* Quick Summary */}
      <motion.div
        variants={staggerItem}
        className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800"
      >
        <h3 className="mb-4 text-sm font-semibold text-slate-900 dark:text-white">
          Quick Summary
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500 dark:text-slate-400">Status</span>
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-semibold",
                appointmentStatusColors[appointment.status],
              )}
            >
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full",
                  appointment.status === "scheduled" && "bg-blue-500",
                  appointment.status === "confirmed" && "bg-indigo-500",
                  appointment.status === "in-progress" && "bg-amber-500",
                  appointment.status === "completed" && "bg-emerald-500",
                  appointment.status === "cancelled" && "bg-red-500",
                  appointment.status === "no-show" && "bg-slate-500",
                )}
              />
              {statusLabels[appointment.status]}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500 dark:text-slate-400">Patient</span>
            <span className="font-medium text-slate-900 dark:text-white">
              {appointment.patient.name}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500 dark:text-slate-400">Doctor</span>
            <span className="font-medium text-slate-900 dark:text-white">
              {appointment.doctor.name}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500 dark:text-slate-400">
              Department
            </span>
            <span className="font-medium text-slate-900 dark:text-white">
              {appointment.department}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500 dark:text-slate-400">Type</span>
            <span className="font-medium text-slate-900 dark:text-white">
              {appointment.consultationType}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500 dark:text-slate-400">Duration</span>
            <span className="font-medium text-slate-900 dark:text-white">
              {appointment.duration} min
            </span>
          </div>
        </div>
      </motion.div>

      {/* Next Appointment */}
      {appointment.nextAppointment && (
        <motion.div
          variants={staggerItem}
          className="rounded-xl border border-slate-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-5 shadow-sm dark:border-slate-700 dark:from-blue-950/30 dark:to-indigo-950/30"
        >
          <h3 className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">
            Next Appointment
          </h3>
          <div className="space-y-2.5">
            <div className="flex items-center gap-2.5 text-sm">
              <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="text-slate-700 dark:text-slate-300">
                {new Date(appointment.nextAppointment.date).toLocaleDateString(
                  "en-US",
                  {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  },
                )}
              </span>
            </div>
            <div className="flex items-center gap-2.5 text-sm">
              <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="text-slate-700 dark:text-slate-300">
                {appointment.nextAppointment.time}
              </span>
            </div>
            <div className="flex items-center gap-2.5 text-sm">
              <Stethoscope className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="text-slate-700 dark:text-slate-300">
                {appointment.nextAppointment.doctor}
              </span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Quick Actions */}
      <motion.div
        variants={staggerItem}
        className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800"
      >
        <h3 className="mb-4 text-sm font-semibold text-slate-900 dark:text-white">
          Quick Actions
        </h3>
        <div className="space-y-2">
          {[
            {
              label: "Edit Appointment",
              icon: Edit,
              color:
                "text-blue-600 bg-blue-50 dark:bg-blue-500/10 dark:text-blue-400",
            },
            {
              label: "Print Details",
              icon: Clock,
              color:
                "text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 dark:text-emerald-400",
            },
            {
              label: "Reschedule",
              icon: Calendar,
              color:
                "text-amber-600 bg-amber-50 dark:bg-amber-500/10 dark:text-amber-400",
            },
            {
              label: "Cancel Appointment",
              icon: ChevronRight,
              color:
                "text-red-600 bg-red-50 dark:bg-red-500/10 dark:text-red-400",
            },
          ].map((action, i) => {
            const Icon = action.icon;
            return (
              <motion.button
                key={i}
                type="button"
                whileHover={{ x: 3 }}
                whileTap={{ scale: 0.98 }}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700/50"
              >
                <div
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-lg",
                    action.color,
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                </div>
                {action.label}
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
