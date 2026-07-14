"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";
import { useCallback, useEffect } from "react";

interface ConfirmModalProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel?: string;
  variant?: "danger" | "warning" | "default";
  onConfirm: () => void;
  onCancel: () => void;
}

const variants = {
  danger: {
    icon: AlertTriangle,
    iconColor: "text-red-500",
    iconBg: "bg-red-100 dark:bg-red-950/40",
    buttonBg:
      "bg-red-600 hover:bg-red-700 focus:ring-red-500/30 dark:bg-red-700 dark:hover:bg-red-600",
  },
  warning: {
    icon: AlertTriangle,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-100 dark:bg-amber-950/40",
    buttonBg:
      "bg-amber-600 hover:bg-amber-700 focus:ring-amber-500/30 dark:bg-amber-700 dark:hover:bg-amber-600",
  },
  default: {
    icon: AlertTriangle,
    iconColor: "text-[var(--color-primary)]",
    iconBg: "bg-[var(--color-primary)]/10 dark:bg-teal-950/40",
    buttonBg:
      "bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] focus:ring-[var(--color-primary)]/30",
  },
};

export function ConfirmModal({
  open,
  title,
  message,
  confirmLabel,
  cancelLabel = "Cancel",
  variant = "default",
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  const v = variants[variant];
  const Icon = v.icon;

  /* Close on Escape */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    },
    [onCancel],
  );

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, handleKeyDown]);

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
            onClick={onCancel}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] as const }}
            className="relative z-10 w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-700 dark:bg-slate-800"
          >
            {/* Close button */}
            <button
              type="button"
              onClick={onCancel}
              className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-300"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Icon */}
            <div
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-xl",
                v.iconBg,
              )}
            >
              <Icon className={cn("h-6 w-6", v.iconColor)} />
            </div>

            {/* Title */}
            <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
              {title}
            </h3>

            {/* Message */}
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              {message}
            </p>

            {/* Buttons */}
            <div className="mt-6 flex items-center gap-3">
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                {cancelLabel}
              </button>
              <button
                type="button"
                onClick={onConfirm}
                className={cn(
                  "flex-1 rounded-xl px-4 py-2.5 text-sm font-medium text-white transition-colors focus:outline-none focus:ring-2",
                  v.buttonBg,
                )}
              >
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
