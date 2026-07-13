"use client";

import { staggerContainer, staggerItem } from "@/lib/animations/stagger";
import type { DoctorAppointment } from "@/lib/data/admin-doctors";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Clock,
  Eye,
  MoreHorizontal,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import { EmptyState } from "./EmptyState";

interface AppointmentsTabProps {
  appointments: DoctorAppointment[];
}

const statusStyles: Record<
  string,
  { label: string; class: string; dot: string }
> = {
  scheduled: {
    label: "Scheduled",
    class: "bg-dash-primary-light text-dash-primary dark:bg-teal-950/30 dark:text-accent",
    dot: "bg-dash-primary",
  },
  completed: {
    label: "Completed",
    class:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400",
    dot: "bg-emerald-500",
  },
  cancelled: {
    label: "Cancelled",
    class: "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400",
    dot: "bg-red-500",
  },
  "no-show": {
    label: "No Show",
    class:
      "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400",
    dot: "bg-amber-500",
  },
};

export function AppointmentsTab({ appointments }: AppointmentsTabProps) {
  if (appointments.length === 0) {
    return (
      <EmptyState
        icon={CalendarDays}
        title="No Appointments"
        description="This doctor has no appointments scheduled."
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
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-700">
              <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Patient
              </th>
              <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Date
              </th>
              <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Time
              </th>
              <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Status
              </th>
              <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
            {appointments.map((apt, i) => {
              const status = statusStyles[apt.status] ?? statusStyles.scheduled;
              return (
                <motion.tr
                  key={apt.id}
                  variants={staggerItem}
                  className="transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/30"
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full">
                        <Image
                          src={apt.patientAvatar}
                          alt={apt.patientName}
                          fill
                          className="object-cover"
                          sizes="32px"
                        />
                      </div>
                      <span className="font-medium text-slate-900 dark:text-white">
                        {apt.patientName}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {apt.date}
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                      <Clock className="h-3.5 w-3.5" />
                      {apt.time}
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
                        status.class,
                      )}
                    >
                      <span
                        className={cn("h-1.5 w-1.5 rounded-full", status.dot)}
                      />
                      {status.label}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-300"
                        aria-label="View appointment details"
                      >
                        <Eye className="h-4 w-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950/30"
                        aria-label="Cancel appointment"
                      >
                        <XCircle className="h-4 w-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-300"
                        aria-label="More options"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </motion.button>
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
