"use client";

import { motion } from "framer-motion";
import { Edit3, Eye, MoreHorizontal } from "lucide-react";
import { staggerContainer, staggerItem } from "./MotionVariants";

interface Appointment {
  patient: string;
  doctor: string;
  department: string;
  time: string;
  status: "Confirmed" | "Pending" | "Cancelled" | "Completed";
}

const appointments: Appointment[] = [
  {
    patient: "Alice Thompson",
    doctor: "Dr. Sarah Johnson",
    department: "Cardiology",
    time: "09:00 AM",
    status: "Completed",
  },
  {
    patient: "Mark Rivera",
    doctor: "Dr. James Mitchell",
    department: "Neurology",
    time: "10:30 AM",
    status: "Confirmed",
  },
  {
    patient: "Emily Watson",
    doctor: "Dr. Lisa Park",
    department: "Pediatrics",
    time: "11:00 AM",
    status: "Pending",
  },
  {
    patient: "Robert Chen",
    doctor: "Dr. David Kim",
    department: "Orthopedics",
    time: "01:30 PM",
    status: "Confirmed",
  },
  {
    patient: "Sophia Lee",
    doctor: "Dr. Sarah Johnson",
    department: "Cardiology",
    time: "02:00 PM",
    status: "Pending",
  },
  {
    patient: "James Wilson",
    doctor: "Dr. Michael Torres",
    department: "Dermatology",
    time: "03:30 PM",
    status: "Cancelled",
  },
  {
    patient: "Olivia Brown",
    doctor: "Dr. Emily Watson",
    department: "Pediatrics",
    time: "04:00 PM",
    status: "Confirmed",
  },
];

const statusStyles: Record<string, string> = {
  Confirmed:
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400",
  Pending:
    "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400",
  Cancelled: "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400",
  Completed: "bg-dash-primary-light text-dash-primary dark:bg-teal-950/30 dark:text-accent",
};

export function AppointmentTable() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="dash-card overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 dark:border-slate-800/60">
        <div>
          <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
            Today&apos;s Appointments
          </h2>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            {appointments.length} appointments scheduled
          </p>
        </div>
        <button className="text-xs font-medium text-dash-primary hover:text-dash-primary dark:text-accent">
          View all
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm" role="table">
          <thead>
            <tr className="border-b border-slate-50 text-left text-xs font-medium text-slate-500 dark:border-slate-800/30 dark:text-slate-400">
              <th className="px-5 py-3" scope="col">
                Patient
              </th>
              <th className="px-5 py-3" scope="col">
                Doctor
              </th>
              <th className="px-5 py-3" scope="col">
                Department
              </th>
              <th className="px-5 py-3" scope="col">
                Time
              </th>
              <th className="px-5 py-3" scope="col">
                Status
              </th>
              <th className="px-5 py-3 text-right" scope="col">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((apt, i) => (
              <motion.tr
                key={i}
                variants={staggerItem}
                className="group border-b border-slate-50 transition-colors hover:bg-slate-50/50 last:border-0 dark:border-slate-800/30 dark:hover:bg-slate-800/20"
              >
                <td className="px-5 py-3.5 font-medium text-slate-900 dark:text-white">
                  {apt.patient}
                </td>
                <td className="px-5 py-3.5 text-slate-600 dark:text-slate-400">
                  {apt.doctor}
                </td>
                <td className="px-5 py-3.5 text-slate-600 dark:text-slate-400">
                  {apt.department}
                </td>
                <td className="px-5 py-3.5 text-slate-600 dark:text-slate-400">
                  {apt.time}
                </td>
                <td className="px-5 py-3.5">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[apt.status]}`}
                  >
                    {apt.status}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-right">
                  <div className="flex items-center justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <button
                      className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-300"
                      aria-label={`View ${apt.patient} appointment`}
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-300"
                      aria-label={`Edit ${apt.patient} appointment`}
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button
                      className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-300"
                      aria-label="More options"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty state (hidden when data present) */}
      {appointments.length === 0 && (
        <div className="flex flex-col items-center py-12 text-center">
          <CalendarCheck className="h-10 w-10 text-slate-300 dark:text-slate-600" />
          <p className="mt-3 text-sm font-medium text-slate-500 dark:text-slate-400">
            No appointments today
          </p>
          <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
            Appointments will appear here once scheduled.
          </p>
        </div>
      )}
    </motion.div>
  );
}

// Used in empty state
import { CalendarCheck } from "lucide-react";
