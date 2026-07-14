"use client";

import { fadeInBackdrop, scaleUp } from "@/components/patient/MotionVariants";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, Trash2, TriangleAlert, X } from "lucide-react";
import { useState } from "react";
import { CardWrapper } from "./CardWrapper";

/* ---------- Confirmation Modal ---------- */

function DeleteModal({
  open,
  onClose,
  onConfirm,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const [confirmText, setConfirmText] = useState("");
  const [deleting, setDeleting] = useState(false);

  const handleConfirm = () => {
    setDeleting(true);
    setTimeout(() => {
      onConfirm();
      setDeleting(false);
      setConfirmText("");
    }, 1500);
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            key="delete-backdrop"
            variants={fadeInBackdrop}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key="delete-modal"
            variants={scaleUp}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative z-10 w-full max-w-md rounded-2xl border border-red-200/60 bg-white p-6 shadow-2xl dark:border-red-900/40 dark:bg-slate-800"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-slate-400 transition-colors hover:text-slate-600 dark:hover:text-slate-300"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Icon */}
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 dark:bg-red-950/40">
              <TriangleAlert className="h-7 w-7 text-red-500" />
            </div>

            {/* Text */}
            <div className="mt-4 text-center">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Delete Account
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                This action is <strong>irreversible</strong>. All your personal
                data, medical records, prescriptions, and appointment history
                will be permanently deleted. You will not be able to recover any
                data after deletion.
              </p>
            </div>

            {/* Confirmation input */}
            <div className="mt-5">
              <label className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-400">
                Type <span className="font-bold text-red-500">DELETE</span> to
                confirm
              </label>
              <input
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder='Type "DELETE"'
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition-all focus:border-red-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 dark:border-slate-600 dark:bg-slate-800/40 dark:text-white dark:placeholder-slate-500 dark:focus:border-red-500 dark:focus:bg-slate-800 dark:focus:ring-red-500/20"
              />
            </div>

            {/* Actions */}
            <div className="mt-5 flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={confirmText !== "DELETE" || deleting}
                className="flex-1 rounded-xl bg-red-600 py-2.5 text-sm font-medium text-white transition-all hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {deleting ? (
                  <span className="inline-flex items-center gap-2">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: "linear",
                      }}
                      className="inline-block h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                    />
                    Deleting…
                  </span>
                ) : (
                  "Delete Account"
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/* ---------- Component ---------- */

export function DangerZone() {
  const [modalOpen, setModalOpen] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const handleConfirmDelete = () => {
    setModalOpen(false);
    setDeleted(true);
  };

  if (deleted) {
    return (
      <CardWrapper
        title="Delete Account"
        description="Permanently remove your account and data"
        icon={<Trash2 className="h-5 w-5" />}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-3 py-6 text-center"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50 dark:bg-red-950/40">
            <Trash2 className="h-7 w-7 text-red-500" />
          </div>
          <div>
            <p className="font-semibold text-slate-900 dark:text-white">
              Account Deletion Requested
            </p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Your request has been submitted. We will process it within 30
              days. You will receive a confirmation email shortly.
            </p>
          </div>
          <button
            onClick={() => setDeleted(false)}
            className="mt-2 text-sm font-medium text-[var(--color-primary)] hover:underline dark:text-emerald-400"
          >
            Undo this request
          </button>
        </motion.div>
      </CardWrapper>
    );
  }

  return (
    <>
      <CardWrapper
        title="Delete Account"
        description="Permanently remove your account and data"
        icon={<Trash2 className="h-5 w-5" />}
      >
        <div className="rounded-xl border border-red-200 bg-red-50/50 p-5 dark:border-red-900/40 dark:bg-red-950/20">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-red-800 dark:text-red-300">
                Danger Zone
              </p>
              <p className="mt-1 text-xs leading-relaxed text-red-600/80 dark:text-red-400/70">
                Once you delete your account, there is no going back. Please be
                certain. This will permanently erase all your personal data,
                medical history, prescriptions, and connected devices.
              </p>
            </div>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-red-700 sm:w-auto"
          >
            <Trash2 className="h-4 w-4" />
            Delete My Account
          </button>
        </div>
      </CardWrapper>

      <DeleteModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
