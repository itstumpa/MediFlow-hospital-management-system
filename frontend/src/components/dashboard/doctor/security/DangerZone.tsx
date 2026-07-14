"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, Trash2, UserX, X } from "lucide-react";
import { useState } from "react";
import { staggerContainer, staggerItem } from "../MotionVariants";

export function DangerZone() {
  const [showDeactivateDialog, setShowDeactivateDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      <motion.div
        variants={staggerItem}
        className="rounded-xl border border-red-200 bg-white p-5 dark:border-red-800/40 dark:bg-slate-900/60"
      >
        {/* Header */}
        <div className="mb-4 flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-50 dark:bg-red-950/30">
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-red-500">
            Danger Zone
          </span>
        </div>

        <div className="space-y-3">
          {/* Deactivate */}
          <div className="flex items-center justify-between rounded-lg border border-red-100 bg-red-50/30 px-3.5 py-3 dark:border-red-900/30 dark:bg-red-950/10">
            <div className="flex items-center gap-3">
              <UserX className="h-5 w-5 text-red-400" />
              <div>
                <p className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  Deactivate Account
                </p>
                <p className="text-[10px] text-slate-400">
                  Temporarily disable your account
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowDeactivateDialog(true)}
              className="rounded-lg border border-red-200 bg-white px-3 py-1.5 text-[10px] font-medium text-red-600 transition-all hover:bg-red-50 dark:border-red-800 dark:bg-slate-900 dark:text-red-400 dark:hover:bg-red-950/30"
            >
              Deactivate
            </button>
          </div>

          {/* Delete */}
          <div className="flex items-center justify-between rounded-lg border border-red-100 bg-red-50/30 px-3.5 py-3 dark:border-red-900/30 dark:bg-red-950/10">
            <div className="flex items-center gap-3">
              <Trash2 className="h-5 w-5 text-red-400" />
              <div>
                <p className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  Delete Account
                </p>
                <p className="text-[10px] text-slate-400">
                  Permanently delete your account and all data
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowDeleteDialog(true)}
              className="rounded-lg border border-red-200 bg-red-500 px-3 py-1.5 text-[10px] font-medium text-white transition-all hover:bg-red-600 dark:border-red-800"
            >
              Delete
            </button>
          </div>
        </div>
      </motion.div>

      {/* Deactivate Confirmation Dialog */}
      <AnimatePresence>
        {showDeactivateDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
            onClick={() => setShowDeactivateDialog(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-700 dark:bg-slate-900"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-50 dark:bg-amber-950/30">
                    <UserX className="h-5 w-5 text-amber-500" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-800 dark:text-white">
                      Deactivate Account
                    </h3>
                    <p className="text-xs text-slate-500">
                      This action can be reversed later.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowDeactivateDialog(false)}
                  className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="mb-4 rounded-lg bg-amber-50 px-3.5 py-2.5 dark:bg-amber-950/20">
                <p className="text-[11px] text-amber-700 dark:text-amber-300">
                  Your profile won't be visible to patients and you won't
                  receive appointment requests until you reactivate.
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setShowDeactivateDialog(false)}
                  className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
                >
                  Cancel
                </button>
                <button className="flex-1 rounded-lg bg-amber-500 px-3 py-2 text-xs font-medium text-white hover:bg-amber-600">
                  Deactivate
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Dialog */}
      <AnimatePresence>
        {showDeleteDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
            onClick={() => setShowDeleteDialog(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-700 dark:bg-slate-900"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 dark:bg-red-950/30">
                    <Trash2 className="h-5 w-5 text-red-500" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-800 dark:text-white">
                      Delete Account
                    </h3>
                    <p className="text-xs text-slate-500">
                      This action is permanent and irreversible.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowDeleteDialog(false)}
                  className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="mb-3 rounded-lg bg-red-50 px-3.5 py-2.5 dark:bg-red-950/20">
                <p className="text-[11px] text-red-700 dark:text-red-300">
                  All your data including profile, appointments, patient
                  records, and settings will be permanently deleted.
                </p>
              </div>

              <div className="mb-4">
                <label className="mb-1 block text-[10px] font-medium text-slate-500">
                  Type <strong className="text-red-500">DELETE</strong> to
                  confirm
                </label>
                <input
                  type="text"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  placeholder='Type "DELETE" to confirm'
                  className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-red-300 focus:ring-2 focus:ring-red-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setShowDeleteDialog(false);
                    setConfirmText("");
                  }}
                  className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
                >
                  Cancel
                </button>
                <button
                  disabled={confirmText !== "DELETE"}
                  className={cn(
                    "flex-1 rounded-lg px-3 py-2 text-xs font-medium text-white transition-all",
                    confirmText === "DELETE"
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-red-300 dark:bg-red-800",
                  )}
                >
                  Delete Account
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
