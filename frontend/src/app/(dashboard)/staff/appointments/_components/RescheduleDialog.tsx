"use client";

import { Button } from "@/app/components/dashboard/Button";
import {
  fadeInBackdrop,
  scaleUp,
} from "@/components/dashboard/staff/MotionVariants";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarCheck, Clock, X } from "lucide-react";
import { useState } from "react";
import { appointments, type Appointment } from "../_mock-data";

/* ─── Props ─────────────────────────────────── */

interface RescheduleDialogProps {
  appointment: Appointment | null;
  open: boolean;
  onClose: () => void;
  onConfirm?: (
    appointment: Appointment,
    newDate: string,
    newTime: string,
  ) => void;
}

/* ─── Time slots ────────────────────────────── */

const timeSlots = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
];

/* ─── Conflict check (mock) ─────────────────── */

function hasConflict(date: string, time: string, excludeId?: string) {
  return appointments.some(
    (a) =>
      a.id !== excludeId &&
      a.date === date &&
      a.startTime === time &&
      a.status !== "cancelled" &&
      a.status !== "no-show",
  );
}

/* ─── Component ─────────────────────────────── */

export function RescheduleDialog({
  appointment,
  open,
  onClose,
}: RescheduleDialogProps) {
  const today = new Date().toISOString().split("T")[0];
  const [newDate, setNewDate] = useState(appointment?.date ?? today);
  const [newTime, setNewTime] = useState(appointment?.startTime ?? "09:00");
  const [showConflicts, setShowConflicts] = useState(false);

  if (!appointment) return null;

  const conflict = hasConflict(newDate, newTime, appointment.id);

  const handleConfirm = () => {
    // In production, would call API
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            {...fadeInBackdrop}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Dialog */}
          <motion.div
            {...scaleUp}
            className="relative w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-800"
            role="dialog"
            aria-modal="true"
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-300"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-950/40 dark:text-violet-400">
                <CalendarCheck className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Reschedule Appointment
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {appointment.patientName} · {appointment.id}
                </p>
              </div>
            </div>

            {/* Current info */}
            <div className="mt-4 rounded-lg bg-slate-50 p-3 dark:bg-slate-800/60">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Current Schedule
              </p>
              <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
                {appointment.date} at {appointment.startTime} ·{" "}
                {appointment.doctorName}
              </p>
            </div>

            {/* New date */}
            <div className="mt-5">
              <label className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-400">
                New Date
              </label>
              <input
                type="date"
                value={newDate}
                min={today}
                onChange={(e) => {
                  setNewDate(e.target.value);
                  setShowConflicts(true);
                }}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 transition-colors hover:border-slate-300 focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-slate-600"
              />
            </div>

            {/* Time slots */}
            <div className="mt-4">
              <label className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-400">
                New Time Slot
              </label>
              <div className="grid grid-cols-6 gap-1.5">
                {timeSlots.map((slot) => {
                  const [h, m] = slot.split(":");
                  const hour = parseInt(h);
                  const ampm = hour >= 12 ? "PM" : "AM";
                  const hour12 = hour % 12 || 12;
                  const label = `${hour12}:${m} ${ampm}`;
                  const isSelected = newTime === slot;
                  const isConflict = hasConflict(newDate, slot, appointment.id);

                  return (
                    <button
                      key={slot}
                      onClick={() => {
                        setNewTime(slot);
                        setShowConflicts(true);
                      }}
                      disabled={isConflict}
                      title={isConflict ? "Time slot conflict" : label}
                      className={`rounded-lg px-2 py-1.5 text-xs font-medium transition-colors ${
                        isSelected
                          ? "bg-[var(--color-primary)] text-white"
                          : isConflict
                            ? "cursor-not-allowed bg-red-50 text-red-400 line-through dark:bg-red-950/30 dark:text-red-500"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Conflict warning */}
            {showConflicts && conflict && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 flex items-center gap-2 rounded-lg bg-amber-50 p-3 text-sm text-amber-700 dark:bg-amber-950/30 dark:text-amber-400"
              >
                <Clock className="h-4 w-4 shrink-0" />
                <span>
                  This time slot conflicts with an existing appointment. Please
                  choose a different time.
                </span>
              </motion.div>
            )}

            {/* Actions */}
            <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-4 dark:border-slate-700">
              <Button
                variant="primary"
                onClick={handleConfirm}
                disabled={conflict}
              >
                <CalendarCheck className="h-4 w-4" />
                Confirm Reschedule
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
