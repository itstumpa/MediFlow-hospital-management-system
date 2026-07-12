"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";
import type { Department } from "./types";

interface DeleteDepartmentDialogProps {
  department: Department | null;
  open: boolean;
  onClose: () => void;
  onConfirm: (department: Department) => void;
}

const iconMap: Record<string, React.ElementType> = {};

export function DeleteDepartmentDialog({
  department,
  open,
  onClose,
  onConfirm,
}: DeleteDepartmentDialogProps) {
  if (!department) return null;

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
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 dark:bg-red-900/40">
              <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>

            <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
              Delete Department
            </h3>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {department.name}
              </span>
              ? This action cannot be undone. All associated data, doctors,
              appointments, and records will be permanently removed.
            </p>

            <div className="mt-4 rounded-xl bg-slate-50 p-4 dark:bg-slate-700/50">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${department.iconBg}`}
                >
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {department.name}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {department.building} — {department.floor} ·{" "}
                    {department.doctors} doctors ·{" "}
                    {department.patients.toLocaleString()} patients
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={onClose}
                className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition-all hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={() => onConfirm(department)}
                className="flex-1 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-red-700 hover:shadow-lg"
              >
                Delete Department
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
