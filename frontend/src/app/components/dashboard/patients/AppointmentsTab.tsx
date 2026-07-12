"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Video,
  MapPin,
  Eye,
  XCircle,
} from "lucide-react";
import type { Appointment } from "@/lib/data/patient-detail";
import { formatDate, formatTime } from "@/lib/utils";
import { staggerItem, staggerContainer } from "@/app/components/dashboard/MotionVariants";
import { EmptyState } from "@/app/components/ui/EmptyState";
import { cn } from "@/lib/utils";

interface AppointmentsTabProps {
  appointments: Appointment[];
}

const statusConfig = {
  scheduled: {
    label: "Scheduled",
    class:
      "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    dot: "bg-blue-500",
  },
  completed: {
    label: "Completed",
    class:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    dot: "bg-emerald-500",
  },
  cancelled: {
    label: "Cancelled",
    class: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    dot: "bg-red-500",
  },
  "no-show": {
    label: "No Show",
    class:
      "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
    dot: "bg-slate-400",
  },
};

export function AppointmentsTab({ appointments }: AppointmentsTabProps) {
  if (appointments.length === 0) {
    return (
      <EmptyState
        icon={Calendar}
        title="No Appointments"
        description="This patient has no appointment records."
      />
    );
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="dash-card overflow-hidden"
    >
      {/* Table — hidden on very small screens */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-dash-border dark:border-slate-700">
              <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Doctor
              </th>
              <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Department
              </th>
              <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Date
              </th>
              <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Time
              </th>
              <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Type
              </th>
              <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Status
              </th>
              <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dash-border dark:divide-slate-700">
            {appointments.map((apt, i) => {
              const status = statusConfig[apt.status];
              return (
                <motion.tr
                  key={apt.id}
                  variants={staggerItem}
                  className="group transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={apt.doctorAvatar}
                        alt={apt.doctor}
                        className="h-8 w-8 rounded-full object-cover ring-2 ring-slate-100 dark:ring-slate-700"
                      />
                      <span className="text-sm font-medium text-slate-900 dark:text-white">
                        {apt.doctor}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-400">
                    {apt.department}
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-slate-400" />
                      {formatDate(apt.date)}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-slate-400" />
                      {formatTime(apt.time)}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-400">
                    {apt.type}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
                        status.class,
                      )}
                    >
                      <span
                        className={cn("h-1.5 w-1.5 rounded-full", status.dot)}
                      />
                      {status.label}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1">
                      <button
                        className="rounded-lg p-1.5 text-slate-400 opacity-0 transition-all hover:bg-slate-100 hover:text-dash-primary group-hover:opacity-100 dark:hover:bg-slate-700"
                        aria-label={`View ${apt.doctor} appointment`}
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      {apt.status === "scheduled" && (
                        <button
                          className="rounded-lg p-1.5 text-slate-400 opacity-0 transition-all hover:bg-red-50 hover:text-red-500 group-hover:opacity-100 dark:hover:bg-red-900/20"
                          aria-label="Cancel appointment"
                        >
                          <XCircle className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
