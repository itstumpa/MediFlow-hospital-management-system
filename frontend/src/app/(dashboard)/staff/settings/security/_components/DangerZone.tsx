"use client";

import {
  staggerContainer,
  staggerItem,
} from "@/components/dashboard/staff/MotionVariants";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, Ban, Trash2, X } from "lucide-react";
import { useState } from "react";

type DangerAction = "deactivate" | "delete" | null;

export function DangerZone() {
  const [activeAction, setActiveAction] = useState<DangerAction>(null);
  const [confirmText, setConfirmText] = useState("");

  const openDialog = (action: DangerAction) => {
    setActiveAction(action);
    setConfirmText("");
  };

  const closeDialog = () => {
    setActiveAction(null);
    setConfirmText("");
  };

  const isDeactivate = activeAction === "deactivate";
  const requiredText = isDeactivate ? "DEACTIVATE" : "DELETE";
  const canConfirm = confirmText === requiredText;

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      <motion.div
        variants={staggerItem}
        className="dash-card border-red-200 dark:border-red-900"
      >
        <div className="mb-4 flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400">
            <AlertTriangle className="h-4 w-4" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-red-500 dark:text-red-400">
            Danger Zone
          </span>
        </div>

        <div className="space-y-3">
          {/* Deactivate Account */}
          <div className="flex items-center justify-between gap-3 rounded-lg border border-red-200 bg-red-50/50 p-3.5 dark:border-red-900 dark:bg-red-950/20">
            <div>
              <p className="text-xs font-medium text-slate-800 dark:text-slate-200">
                Deactivate Account
              </p>
              <p className="text-[10px] text-slate-500">
                Temporarily disable your account. You can reactivate later.
              </p>
            </div>
            <button
              type="button"
              onClick={() => openDialog("deactivate")}
              className="flex shrink-0 items-center gap-1.5 rounded-lg border border-red-300 bg-white px-3 py-1.5 text-[11px] font-medium text-red-600 transition-all hover:bg-red-50 dark:border-red-700 dark:bg-slate-800 dark:text-red-400 dark:hover:bg-red-950/30"
            >
              <Ban className="h-3.5 w-3.5" />
              Deactivate
            </button>
          </div>

          {/* Delete Account */}
          <div className="flex items-center justify-between gap-3 rounded-lg border border-red-200 bg-red-50/50 p-3.5 dark:border-red-900 dark:bg-red-950/20">
            <div>
              <p className="text-xs font-medium text-slate-800 dark:text-slate-200">
                Delete Account
              </p>
              <p className="text-[10px] text-slate-500">
                Permanently delete your account and all associated data.
              </p>
            </div>
            <button
              type="button"
              onClick={() => openDialog("delete")}
              className="flex shrink-0 items-center gap-1.5 rounded-lg border border-red-300 bg-red-600 px-3 py-1.5 text-[11px] font-medium text-white transition-all hover:bg-red-700 dark:border-red-700 dark:bg-red-700 dark:hover:bg-red-800"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Delete
            </button>
          </div>
        </div>
      </motion.div>

      {/* Confirmation Dialog */}
      <AnimatePresence>
        {activeAction && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDialog}
            />

            {/* Dialog */}
            <motion.div
              className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-900"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* Close button */}
              <button
                type="button"
                onClick={closeDialog}
                className="absolute right-4 top-4 rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                    {isDeactivate ? "Deactivate Account" : "Delete Account"}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {isDeactivate
                      ? "This will temporarily disable your account."
                      : "This action is permanent and cannot be undone."}
                  </p>
                </div>
              </div>

              <div className="mb-4 rounded-lg bg-red-50 p-3 dark:bg-red-950/20">
                <p className="text-xs text-red-700 dark:text-red-400">
                  {isDeactivate
                    ? "Your profile will be hidden, and you won't be able to log in until an admin reactivates your account."
                    : "All your data, including appointments, medical records, and account information will be permanently removed."}
                </p>
              </div>

              <label className="mb-1.5 block text-xs font-medium text-slate-700 dark:text-slate-300">
                Type{" "}
                <span className="font-bold text-red-500">{requiredText}</span>{" "}
                to confirm:
              </label>
              <input
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder={`Type ${requiredText} to confirm`}
                className="mb-4 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 transition-all focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
              />

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={closeDialog}
                  className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-medium text-slate-700 transition-all hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={!canConfirm}
                  className={`flex-1 rounded-lg px-4 py-2 text-xs font-medium text-white transition-all ${
                    canConfirm
                      ? isDeactivate
                        ? "bg-amber-500 hover:bg-amber-600"
                        : "bg-red-600 hover:bg-red-700"
                      : "bg-slate-300 dark:bg-slate-700 cursor-not-allowed"
                  }`}
                >
                  {isDeactivate ? "Deactivate Account" : "Delete Account"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
