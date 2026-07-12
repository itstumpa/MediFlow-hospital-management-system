"use client";

import { motion } from "framer-motion";
import { Calendar, Edit3, Eye, MoreHorizontal } from "lucide-react";
import type { Appointment } from "./types";

interface AppointmentCardProps {
  appointment: Appointment;
  selected: boolean;
  onSelect: (id: string) => void;
  onView: (appointment: Appointment) => void;
  onEdit: (appointment: Appointment) => void;
  index: number;
}

const statusConfig: Record<string, { class: string; dot: string }> = {
  Confirmed: {
    class: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    dot: "bg-blue-500",
  },
  Pending: {
    class:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    dot: "bg-amber-500",
  },
  Completed: {
    class:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    dot: "bg-emerald-500",
  },
  Cancelled: {
    class: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
    dot: "bg-red-500",
  },
  "No Show": {
    class: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
    dot: "bg-slate-400",
  },
  Rescheduled: {
    class:
      "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
    dot: "bg-violet-500",
  },
  "Checked In": {
    class: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300",
    dot: "bg-cyan-500",
  },
  "In Progress": {
    class:
      "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300",
    dot: "bg-indigo-500",
  },
};

const paymentConfig: Record<string, { class: string }> = {
  Paid: {
    class:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  },
  Pending: {
    class:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  },
  Refunded: {
    class: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  },
  Waived: {
    class: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
  },
  Insurance: {
    class:
      "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
  },
};

const avatarColors = [
  "bg-blue-500",
  "bg-emerald-500",
  "bg-violet-500",
  "bg-amber-500",
  "bg-rose-500",
  "bg-cyan-500",
  "bg-orange-500",
  "bg-indigo-500",
];

const consultationIcons: Record<string, string> = {
  Video: "🎥",
  "In-Person": "🏥",
  Phone: "📞",
  Emergency: "🚨",
};

export function AppointmentCard({
  appointment,
  selected,
  onSelect,
  onView,
  onEdit,
  index,
}: AppointmentCardProps) {
  const colorIdx = appointment.patientName.length % avatarColors.length;
  const statusStyle = statusConfig[appointment.status] ?? statusConfig.Pending;
  const payStyle =
    paymentConfig[appointment.paymentStatus] ?? paymentConfig.Pending;

  const formatTime = (t: string) => {
    const [h, m] = t.split(":");
    const hour = parseInt(h);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${m} ${ampm}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04, ease: "easeOut" }}
      className={`dash-card relative overflow-hidden transition-all ${
        selected
          ? "ring-2 ring-blue-500 shadow-blue-500/10"
          : "hover:shadow-lg hover:-translate-y-0.5"
      }`}
    >
      {/* Selection checkbox */}
      <div className="absolute left-3 top-3 z-10">
        <input
          type="checkbox"
          checked={selected}
          onChange={() => onSelect(appointment.id)}
          className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 dark:border-slate-600"
          aria-label={`Select ${appointment.patientName}`}
        />
      </div>

      {/* Status badge */}
      <div className="absolute right-3 top-3 z-10">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyle.class}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${statusStyle.dot}`} />
          {appointment.status}
        </span>
      </div>

      <div className="p-5 pt-10">
        {/* Patient Avatar + Name */}
        <div className="flex flex-col items-center text-center">
          <div
            className={`flex h-16 w-16 items-center justify-center rounded-full text-xl font-bold text-white ${avatarColors[colorIdx]}`}
          >
            {appointment.patientInitials}
          </div>
          <h3 className="mt-3 text-sm font-bold text-slate-900 dark:text-white">
            {appointment.patientName}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {appointment.appointmentId}
          </p>
        </div>

        {/* Doctor + Department */}
        <div className="mt-4 space-y-2 rounded-xl bg-slate-50 p-3 dark:bg-slate-800/50">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 dark:text-slate-400">Doctor</span>
            <span className="font-medium text-slate-700 dark:text-slate-300">
              {appointment.doctorName}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 dark:text-slate-400">Dept</span>
            <span className="font-medium text-slate-700 dark:text-slate-300">
              {appointment.department}
            </span>
          </div>
        </div>

        {/* Date, Time, Duration */}
        <div className="mt-3 grid grid-cols-3 gap-2">
          <div className="rounded-lg bg-slate-50 p-2 text-center dark:bg-slate-800/50">
            <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400">
              Date
            </p>
            <p className="text-xs font-semibold text-slate-900 dark:text-white">
              {new Date(appointment.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
          <div className="rounded-lg bg-slate-50 p-2 text-center dark:bg-slate-800/50">
            <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400">
              Time
            </p>
            <p className="text-xs font-semibold text-slate-900 dark:text-white">
              {formatTime(appointment.time)}
            </p>
          </div>
          <div className="rounded-lg bg-slate-50 p-2 text-center dark:bg-slate-800/50">
            <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400">
              Duration
            </p>
            <p className="text-xs font-semibold text-slate-900 dark:text-white">
              {appointment.duration}m
            </p>
          </div>
        </div>

        {/* Consultation Type + Payment */}
        <div className="mt-3 flex items-center justify-between text-xs">
          <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
            {consultationIcons[appointment.consultationType] ?? "📋"}
            {appointment.consultationType}
          </span>
          <span
            className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold ${payStyle.class}`}
          >
            {appointment.paymentStatus}
          </span>
        </div>

        {/* Quick Actions */}
        <div className="mt-4 flex items-center justify-center gap-1 border-t border-slate-100 pt-3 dark:border-slate-700">
          <button
            onClick={() => onView(appointment)}
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-blue-600 dark:hover:bg-slate-700 dark:hover:text-blue-400"
            title="View appointment"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button
            onClick={() => onEdit(appointment)}
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-emerald-600 dark:hover:bg-slate-700 dark:hover:text-emerald-400"
            title="Edit"
          >
            <Edit3 className="h-4 w-4" />
          </button>
          <button
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-blue-600 dark:hover:bg-slate-700 dark:hover:text-blue-400"
            title="Reschedule"
          >
            <Calendar className="h-4 w-4" />
          </button>
          <div className="mx-1 h-5 w-px bg-slate-200 dark:bg-slate-700" />
          <button className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 dark:hover:bg-slate-700">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
