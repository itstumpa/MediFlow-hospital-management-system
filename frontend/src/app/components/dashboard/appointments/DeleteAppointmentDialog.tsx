"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, Trash2, X } from "lucide-react";
import type { Appointment } from "./types";

interface DeleteAppointmentDialogProps {
  appointment: Appointment | null;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

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

const statusConfig: Record<string, { class: string }> = {
  Confirmed: {
    class: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  },
  Pending: {
    class:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  },
  Completed: {
    class:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  },
  Cancelled: {
    class: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
  },
  "No Show": {
    class: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
  },
  Rescheduled: {
    class:
      "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
  },
  "Checked In": {
    class: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300",
  },
  "In Progress": {
    class:
      "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300",
  },
};

export function DeleteAppointmentDialog({
  appointment,
  open,
  onClose,
  onConfirm,
}: DeleteAppointmentDialogProps) {
  if (!appointment) return null;

  const colorIdx = appointment.patientName.length % avatarColors.length;
  const statusStyle = statusConfig[appointment.status] ?? statusConfig.Pending;

  const formatTime = (t: string) => {
    const [h, m] = t.split(":");
    const hour = parseInt(h);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${m} ${ampm}`;
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-800"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-dialog-title"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 dark:hover:bg-slate-700"
              aria-label="Close dialog"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Icon */}
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 dark:bg-red-900/30">
              <AlertTriangle className="h-7 w-7 text-red-500" />
            </div>

            {/* Title */}
            <h2
              id="delete-dialog-title"
              className="mt-4 text-center text-lg font-semibold text-slate-900 dark:text-white"
            >
              Delete Appointment
            </h2>

            {/* Description */}
            <p className="mt-2 text-center text-sm text-slate-500 dark:text-slate-400">
              Are you sure you want to delete this appointment? This action
              cannot be undone.
            </p>

            {/* Appointment preview */}
            <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/50">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full text-base font-bold text-white ${avatarColors[colorIdx]}`}
                >
                  {appointment.patientInitials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {appointment.patientName}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {appointment.appointmentId} &middot;{" "}
                    {appointment.department}
                  </p>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-500 dark:text-slate-400">
                    Doctor:
                  </span>{" "}
                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    {appointment.doctorName}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400">
                    Date:
                  </span>{" "}
                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    {new Date(appointment.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400">
                    Time:
                  </span>{" "}
                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    {formatTime(appointment.time)}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400">
                    Status:
                  </span>{" "}
                  <span
                    className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusStyle.class}`}
                  >
                    {appointment.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-5 flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-red-700"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
