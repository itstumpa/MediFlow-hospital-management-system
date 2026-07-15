"use client";

import { Button } from "@/app/components/dashboard/Button";
import {
  fadeInBackdrop,
  scaleUp,
  staggerContainer,
  staggerItem,
} from "@/components/dashboard/staff/MotionVariants";
import { AnimatePresence, motion } from "framer-motion";
import { ListPlus, Phone, UserPlus, X } from "lucide-react";
import { useState } from "react";
import { waitlist, type WaitlistEntry } from "../_mock-data";

/* ─── Priority badge ────────────────────────── */

const priorityColors: Record<string, string> = {
  low: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
  normal: "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400",
  high: "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400",
  urgent: "bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400",
};

/* ─── Add to Waitlist Modal ─────────────────── */

function AddToWaitlistModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    patientName: "",
    phone: "",
    doctor: "Dr. Sarah Chen",
    reason: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, would add to waitlist
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            {...fadeInBackdrop}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            {...scaleUp}
            className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-800"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400">
                <UserPlus className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Add to Waitlist
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Patient will be notified when a slot opens
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-400">
                  Patient Name
                </label>
                <input
                  type="text"
                  placeholder="Full name"
                  value={form.patientName}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, patientName: e.target.value }))
                  }
                  required
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 transition-colors hover:border-slate-300 focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-400">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={form.phone}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, phone: e.target.value }))
                  }
                  required
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 transition-colors hover:border-slate-300 focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-400">
                  Preferred Doctor
                </label>
                <select
                  value={form.doctor}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, doctor: e.target.value }))
                  }
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                >
                  <option>Dr. Sarah Chen</option>
                  <option>Dr. James Wilson</option>
                  <option>Dr. Emily Martinez</option>
                  <option>Dr. Robert Kim</option>
                  <option>Dr. David Park</option>
                  <option>Dr. Lisa Anderson</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-400">
                  Reason
                </label>
                <textarea
                  placeholder="Brief reason..."
                  value={form.reason}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, reason: e.target.value }))
                  }
                  rows={2}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 transition-colors hover:border-slate-300 focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                />
              </div>
              <div className="flex items-center gap-3 border-t border-slate-100 pt-4 dark:border-slate-700">
                <Button variant="primary" type="submit">
                  <ListPlus className="h-4 w-4" />
                  Add to Waitlist
                </Button>
                <Button variant="ghost" type="button" onClick={onClose}>
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/* ─── Waitlist Entry Row ────────────────────── */

function WaitlistRow({
  entry,
  index,
}: {
  entry: WaitlistEntry;
  index: number;
}) {
  return (
    <motion.div
      variants={staggerItem}
      className="flex items-center gap-3 rounded-lg border border-slate-100 bg-white/50 px-3 py-2.5 transition-colors hover:bg-slate-50 dark:border-slate-700/50 dark:bg-slate-800/30 dark:hover:bg-slate-800/50"
    >
      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-white ${
          entry.priority === "urgent"
            ? "bg-red-500"
            : entry.priority === "high"
              ? "bg-amber-500"
              : entry.priority === "normal"
                ? "bg-blue-500"
                : "bg-slate-400"
        }`}
      >
        {entry.patientInitials}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-slate-900 dark:text-white">
          {entry.patientName}
        </p>
        <p className="text-xs text-slate-400">{entry.requestedDoctor}</p>
      </div>
      <span
        className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${
          priorityColors[entry.priority] ?? priorityColors.normal
        }`}
      >
        {entry.priority.charAt(0).toUpperCase() + entry.priority.slice(1)}
      </span>
      <div className="flex shrink-0 items-center gap-1 text-xs text-slate-400">
        <Phone className="h-3 w-3" />
        {entry.phone}
      </div>
    </motion.div>
  );
}

/* ─── Main Component ────────────────────────── */

export function WaitlistCard() {
  const [showAdd, setShowAdd] = useState(false);
  const [entries] = useState(waitlist);

  return (
    <>
      <div className="dash-card">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400">
              <ListPlus className="h-4 w-4" />
            </div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Waitlist
            </h3>
            <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-100 px-1.5 text-[10px] font-semibold text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
              {entries.length}
            </span>
          </div>
          <Button variant="ghost" size="xs" onClick={() => setShowAdd(true)}>
            <UserPlus className="h-3.5 w-3.5" />
            Add
          </Button>
        </div>

        {/* List */}
        <div className="p-4">
          {entries.length === 0 ? (
            <div className="py-8 text-center">
              <ListPlus className="mx-auto h-8 w-8 text-slate-300 dark:text-slate-600" />
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Waitlist is empty
              </p>
            </div>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-2"
            >
              {entries.map((entry, i) => (
                <WaitlistRow key={entry.id} entry={entry} index={i} />
              ))}
            </motion.div>
          )}
        </div>
      </div>

      <AddToWaitlistModal open={showAdd} onClose={() => setShowAdd(false)} />
    </>
  );
}
