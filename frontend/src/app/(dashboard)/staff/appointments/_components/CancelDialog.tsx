"use client";

import { Button } from "@/app/components/dashboard/Button";
import {
  fadeInBackdrop,
  scaleUp,
} from "@/components/dashboard/staff/MotionVariants";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, CalendarX, X } from "lucide-react";
import { useState } from "react";
import { statusConfig, type Appointment } from "../_mock-data";

/* ─── Props ─────────────────────────────────── */

interface CancelDialogProps {
  appointment: Appointment | null;
  open: boolean;
  onClose: () => void;
  onConfirm?: (appointment: Appointment, reason: string) => void;
}

const cancelReasons = [
  "Patient requested cancellation",
  "Schedule conflict",
  "Insurance issue",
  "Medical reasons",
  "Duplicate appointment",
  "Weather / emergency",
  "Other",
];

/* ─── Component ─────────────────────────────── */

export function CancelDialog({
  appointment,
  open,
  onClose,
}: CancelDialogProps) {
  const [reason, setReason] = useState("");
  const [customReason, setCustomReason] = useState("");
  const [step, setStep] = useState<"confirm" | "done">("confirm");

  if (!appointment) return null;

  const finalReason = reason === "Other" ? customReason : reason;

  const handleConfirm = () => {
    if (step === "confirm" && finalReason) {
      setStep("done");
      return;
    }
    // In production, would call API
    onClose();
  };

  const handleClose = () => {
    setStep("confirm");
    setReason("");
    setCustomReason("");
    onClose();
  };

  const status = statusConfig[appointment.status];

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            {...fadeInBackdrop}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Dialog */}
          <motion.div
            {...scaleUp}
            className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-800"
            role="dialog"
            aria-modal="true"
          >
            {/* Close */}
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-300"
            >
              <X className="h-5 w-5" />
            </button>

            {step === "confirm" ? (
              <>
                {/* Header */}
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400">
                    <CalendarX className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                      Cancel Appointment
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      This action cannot be undone
                    </p>
                  </div>
                </div>

                {/* Appointment info */}
                <div className="mt-4 rounded-lg bg-slate-50 p-3 dark:bg-slate-800/60">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      {appointment.patientName}
                    </p>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${status.class}`}
                    >
                      {status.label}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    {appointment.doctorName} · {appointment.department}
                  </p>
                  <p className="text-xs text-slate-400">
                    {appointment.date} at {appointment.startTime}
                  </p>
                </div>

                {/* Reason */}
                <div className="mt-5">
                  <label className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-400">
                    Reason for Cancellation
                  </label>
                  <div className="space-y-2">
                    {cancelReasons.map((r) => (
                      <label
                        key={r}
                        className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors ${
                          reason === r
                            ? "border-red-300 bg-red-50/50 dark:border-red-700 dark:bg-red-950/20"
                            : "border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800/50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="cancel-reason"
                          value={r}
                          checked={reason === r}
                          onChange={(e) => setReason(e.target.value)}
                          className="h-4 w-4 text-red-500 focus:ring-red-400"
                        />
                        <span className="text-sm text-slate-700 dark:text-slate-300">
                          {r}
                        </span>
                      </label>
                    ))}
                  </div>

                  {reason === "Other" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-2"
                    >
                      <input
                        type="text"
                        placeholder="Specify reason..."
                        value={customReason}
                        onChange={(e) => setCustomReason(e.target.value)}
                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 transition-colors hover:border-slate-300 focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-400/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-slate-600"
                      />
                    </motion.div>
                  )}
                </div>

                {/* Warning */}
                <div className="mt-4 flex items-start gap-2 rounded-lg bg-amber-50 p-3 text-sm text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    Cancelling will notify the patient and free up the time
                    slot.
                  </span>
                </div>

                {/* Actions */}
                <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4 dark:border-slate-700">
                  <Button
                    variant="danger"
                    onClick={handleConfirm}
                    disabled={!finalReason}
                  >
                    <CalendarX className="h-4 w-4" />
                    Cancel Appointment
                  </Button>
                  <Button variant="ghost" onClick={handleClose}>
                    Keep Appointment
                  </Button>
                </div>
              </>
            ) : (
              /* Success step */
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-6 text-center"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
                  <CalendarX className="h-7 w-7" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
                  Appointment Cancelled
                </h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {appointment.patientName}&apos;s appointment has been
                  cancelled.
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Reason: {finalReason}
                </p>
                <div className="mt-6">
                  <Button variant="primary" onClick={handleClose}>
                    Done
                  </Button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
