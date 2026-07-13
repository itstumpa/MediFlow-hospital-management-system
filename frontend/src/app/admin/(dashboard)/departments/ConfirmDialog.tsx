"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, Save, Trash2, X } from "lucide-react";
import { useEffect, useRef } from "react";

type DialogVariant = "discard" | "save-draft" | "delete";

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  variant: DialogVariant;
}

const dialogConfig: Record<
  DialogVariant,
  {
    icon: typeof AlertTriangle;
    title: string;
    description: string;
    confirmLabel: string;
    confirmClass: string;
  }
> = {
  discard: {
    icon: AlertTriangle,
    title: "Discard Changes",
    description:
      "You have unsaved changes. Are you sure you want to leave this page? All unsaved data will be lost.",
    confirmLabel: "Discard",
    confirmClass: "bg-red-500 hover:bg-red-600 focus-visible:outline-red-500",
  },
  "save-draft": {
    icon: Save,
    title: "Save as Draft",
    description:
      "Save the current form as a draft. You can continue editing later. The department will not be visible to patients until published.",
    confirmLabel: "Save Draft",
    confirmClass:
      "bg-dash-primary hover:bg-dash-primary-dark focus-visible:outline-dash-primary",
  },
  delete: {
    icon: Trash2,
    title: "Delete Department",
    description:
      "Are you sure you want to delete this department? This action cannot be undone. All associated data, doctors, appointments, and records will be permanently removed.",
    confirmLabel: "Delete",
    confirmClass: "bg-red-500 hover:bg-red-600 focus-visible:outline-red-500",
  },
};

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  variant,
}: ConfirmDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const config = dialogConfig[variant];
  const Icon = config.icon;

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

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
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Dialog */}
          <motion.div
            ref={dialogRef}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="dialog-title"
            className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-800"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-300"
              aria-label="Close dialog"
            >
              <X className="h-4 w-4" />
            </button>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 20,
                delay: 0.05,
              }}
              className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 dark:bg-red-500/10"
            >
              <Icon className="h-6 w-6 text-red-500" />
            </motion.div>

            <div className="mt-4 text-center">
              <h3
                id="dialog-title"
                className="text-lg font-semibold text-slate-900 dark:text-white"
              >
                {config.title}
              </h3>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                {config.description}
              </p>
            </div>

            <div className="mt-6 flex items-center justify-center gap-3">
              <motion.button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 transition-all hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Cancel
              </motion.button>
              <motion.button
                type="button"
                onClick={onConfirm}
                className={`rounded-xl px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all ${config.confirmClass}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {config.confirmLabel}
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
