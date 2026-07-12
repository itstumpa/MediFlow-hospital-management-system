"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle, Trash2 } from "lucide-react";
import type { Patient } from "./types";

interface DeletePatientDialogProps {
  patient: Patient | null;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const avatarColors = [
  "bg-blue-500", "bg-emerald-500", "bg-violet-500", "bg-amber-500",
  "bg-rose-500", "bg-cyan-500", "bg-orange-500", "bg-indigo-500",
];

export function DeletePatientDialog({
  patient,
  open,
  onClose,
  onConfirm,
}: DeletePatientDialogProps) {
  if (!patient) return null;

  const colorIdx = patient.name.length % avatarColors.length;

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
              Delete Patient
            </h2>

            {/* Description */}
            <p className="mt-2 text-center text-sm text-slate-500 dark:text-slate-400">
              Are you sure you want to delete this patient? This action cannot be undone.
            </p>

            {/* Patient preview */}
            <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/50">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full text-base font-bold text-white ${avatarColors[colorIdx]}`}
                >
                  {patient.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {patient.name}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {patient.patientId} &middot; {patient.department}
                  </p>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-500 dark:text-slate-400">Age:</span>{" "}
                  <span className="font-medium text-slate-700 dark:text-slate-300">{patient.age}</span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400">Gender:</span>{" "}
                  <span className="font-medium text-slate-700 dark:text-slate-300">{patient.gender}</span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400">Blood:</span>{" "}
                  <span className="font-medium text-slate-700 dark:text-slate-300">{patient.bloodGroup}</span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400">Status:</span>{" "}
                  <span className="font-medium text-slate-700 dark:text-slate-300">{patient.status}</span>
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
