"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Plane, Plus, X } from "lucide-react";
import { useState } from "react";
import {
  fadeInBackdrop,
  scaleUp,
  staggerContainer,
  staggerItem,
} from "../MotionVariants";
import {
  vacationEntries,
  type VacationEntry,
  type VacationStatus,
  type VacationType,
} from "./schedule-mock-data";

interface VacationManagerProps {
  entries?: VacationEntry[];
}

const typeColors: Record<VacationType, string> = {
  vacation:
    "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/30 dark:text-indigo-400",
  holiday:
    "bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400",
  leave:
    "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400",
};

const statusColors: Record<VacationStatus, string> = {
  approved:
    "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400",
  pending:
    "bg-amber-100 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400",
  rejected: "bg-red-100 text-red-600 dark:bg-red-950/30 dark:text-red-400",
};

export function VacationManager({
  entries = vacationEntries,
}: VacationManagerProps) {
  const [showForm, setShowForm] = useState(false);
  const [newEntry, setNewEntry] = useState({
    startDate: "",
    endDate: "",
    type: "vacation" as VacationType,
    reason: "",
    isRecurring: false,
    recurringDay: "monday",
  });

  const handleAdd = () => {
    setShowForm(false);
    setNewEntry({
      startDate: "",
      endDate: "",
      type: "vacation",
      reason: "",
      isRecurring: false,
      recurringDay: "monday",
    });
  };

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="rounded-xl border border-slate-200/60 bg-white dark:border-slate-700/40 dark:bg-slate-900/60"
    >
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-slate-700">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
          <Plane className="h-4 w-4 text-slate-400" />
          Vacation & Leave
        </h3>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-1 rounded-lg bg-dash-primary px-2.5 py-1.5 text-[10px] font-medium text-white hover:bg-dash-primary-dark"
        >
          <Plus className="h-3 w-3" />
          Add
        </button>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {entries.map((entry) => (
          <motion.div
            key={entry.id}
            variants={staggerItem}
            className="flex items-center justify-between px-4 py-2.5"
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-lg",
                  typeColors[entry.type],
                )}
              >
                <Plane className="h-3.5 w-3.5" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {entry.reason}
                </p>
                <p className="text-[11px] text-slate-400">
                  {entry.startDate === entry.endDate
                    ? entry.startDate
                    : `${entry.startDate} → ${entry.endDate}`}
                  {entry.isRecurring && " (Recurring)"}
                </p>
              </div>
            </div>
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-[10px] font-medium capitalize",
                statusColors[entry.status],
              )}
            >
              {entry.status}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Add Form Modal */}
      <AnimatePresence>
        {showForm && (
          <>
            <motion.div
              variants={fadeInBackdrop}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 z-50 bg-black/40"
              onClick={() => setShowForm(false)}
            />
            <motion.div
              variants={scaleUp}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={cn(
                "fixed bottom-0 left-0 right-0 z-50 mx-auto max-h-[80vh] w-full max-w-md overflow-y-auto rounded-t-2xl bg-white p-5 shadow-2xl",
                "dark:bg-slate-900",
                "lg:bottom-auto lg:top-[20%] lg:rounded-2xl",
              )}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                  New Vacation / Leave
                </h3>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={newEntry.startDate}
                      onChange={(e) =>
                        setNewEntry({ ...newEntry, startDate: e.target.value })
                      }
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 outline-none focus:border-dash-primary focus:ring-2 focus:ring-dash-primary-light dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={newEntry.endDate}
                      onChange={(e) =>
                        setNewEntry({ ...newEntry, endDate: e.target.value })
                      }
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 outline-none focus:border-dash-primary focus:ring-2 focus:ring-dash-primary-light dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400">
                    Type
                  </label>
                  <select
                    value={newEntry.type}
                    onChange={(e) =>
                      setNewEntry({
                        ...newEntry,
                        type: e.target.value as VacationType,
                      })
                    }
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 outline-none focus:border-dash-primary focus:ring-2 focus:ring-dash-primary-light dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                  >
                    <option value="vacation">Vacation</option>
                    <option value="leave">Leave</option>
                    <option value="holiday">Holiday</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400">
                    Reason
                  </label>
                  <input
                    type="text"
                    value={newEntry.reason}
                    onChange={(e) =>
                      setNewEntry({ ...newEntry, reason: e.target.value })
                    }
                    placeholder="Enter reason..."
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 outline-none focus:border-dash-primary focus:ring-2 focus:ring-dash-primary-light placeholder:text-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                  />
                </div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={newEntry.isRecurring}
                    onChange={(e) =>
                      setNewEntry({
                        ...newEntry,
                        isRecurring: e.target.checked,
                      })
                    }
                    className="rounded border-slate-300 text-dash-primary"
                  />
                  <span className="text-xs text-slate-600 dark:text-slate-400">
                    Recurring
                  </span>
                </label>
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <button
                  onClick={() => setShowForm(false)}
                  className="rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAdd}
                  className="inline-flex items-center gap-1 rounded-lg bg-dash-primary px-3.5 py-2 text-xs font-medium text-white hover:bg-dash-primary-dark"
                >
                  <Check className="h-3.5 w-3.5" />
                  Submit
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
